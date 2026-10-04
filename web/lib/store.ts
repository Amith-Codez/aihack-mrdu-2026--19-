// The memory of MarkMatch (MVP, no login). One interface, two backends:
//   cloud   — a hosted Redis through /api/store, used when the server has its env vars;
//   browser — localStorage in this browser (falls back to memory if localStorage is blocked).
// pickStore() chooses. With the cloud on, every save also goes to the browser first, so a refresh or an
// internet drop loses nothing; reads fall back to the browser copy when the cloud cannot be reached.
import { Paper, PaperSummary, QuestionRun, Workspace, normaliseCode } from "./store-types";

export interface Store {
  /** "cloud" or "browser": shown on screen as a true line about where marks are kept */
  readonly backend: "cloud" | "browser";
  getWorkspace(code: string): Promise<Workspace | null>;
  saveWorkspace(ws: Workspace): Promise<void>;
  listPapers(code: string): Promise<PaperSummary[]>;
  getPaper(code: string, id: string): Promise<Paper | null>;
  savePaper(paper: Paper): Promise<void>;
  getRuns(code: string, paperId: string, questionIds: string[]): Promise<Record<string, QuestionRun>>;
  saveMarks(code: string, paperId: string, run: QuestionRun): Promise<void>;
}

export const BACKEND_LINE: Record<Store["backend"], string> = {
  cloud: "Saved online in this workspace. No login yet: anyone with this code can open it.",
  browser: "Saved in this browser only. Another computer will not see it. No login yet: anyone using this browser with this code can open it.",
};

const k = {
  ws: (code: string) => `mm:ws:${code}`,
  paper: (code: string, id: string) => `mm:paper:${code}:${id}`,
  run: (code: string, paperId: string, qid: string) => `mm:run:${code}:${paperId}:${qid}`,
};

/** localStorage, or an in-memory map when localStorage is missing or throws (private mode, blocked storage). */
export function kv(storage?: Pick<Storage, "getItem" | "setItem">) {
  const mem = new Map<string, string>();
  let s: Pick<Storage, "getItem" | "setItem"> | null = storage ?? null;
  if (!s) {
    try {
      s = typeof window !== "undefined" ? window.localStorage : null;
      s?.setItem("mm:probe", "1");
    } catch {
      s = null;
    }
  }
  return {
    get(key: string): string | null {
      try {
        return s ? s.getItem(key) : (mem.get(key) ?? null);
      } catch {
        return mem.get(key) ?? null;
      }
    },
    set(key: string, value: string) {
      mem.set(key, value);
      try {
        s?.setItem(key, value);
      } catch {
        // quota full or blocked: the memory copy keeps this session working
      }
    },
  };
}

function parse<T>(raw: string | null, schema: { safeParse: (x: unknown) => { success: boolean; data?: T } }): T | null {
  if (!raw) return null;
  try {
    const r = schema.safeParse(JSON.parse(raw));
    return r.success ? (r.data as T) : null;
  } catch {
    return null;
  }
}

export class BrowserStore implements Store {
  readonly backend = "browser" as const;
  constructor(private readonly db = kv()) {}
  async getWorkspace(code: string) {
    return parse(this.db.get(k.ws(normaliseCode(code))), Workspace);
  }
  async saveWorkspace(ws: Workspace) {
    this.db.set(k.ws(ws.code), JSON.stringify(ws));
  }
  async listPapers(code: string) {
    return (await this.getWorkspace(code))?.papers ?? [];
  }
  async getPaper(code: string, id: string) {
    return parse(this.db.get(k.paper(normaliseCode(code), id)), Paper);
  }
  async savePaper(paper: Paper) {
    this.db.set(k.paper(paper.code, paper.id), JSON.stringify(paper));
  }
  async getRuns(code: string, paperId: string, questionIds: string[]) {
    const out: Record<string, QuestionRun> = {};
    for (const q of questionIds) {
      const r = parse(this.db.get(k.run(normaliseCode(code), paperId, q)), QuestionRun);
      if (r) out[q] = r;
    }
    return out;
  }
  async saveMarks(code: string, paperId: string, run: QuestionRun) {
    this.db.set(k.run(normaliseCode(code), paperId, run.questionId), JSON.stringify(run));
  }
}

type Fetch = typeof fetch;

async function call<T>(f: Fetch, body: unknown): Promise<T> {
  const res = await f("/api/store", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json().catch(() => ({ error: `status ${res.status}` }));
  if (!res.ok) throw new Error(data.error || `store answered ${res.status}`);
  return data as T;
}

/** Talks to /api/store. Throws when the cloud cannot be reached; ResilientStore catches that. */
export class CloudStore implements Store {
  readonly backend = "cloud" as const;
  constructor(private readonly f: Fetch = (...a) => fetch(...a)) {}
  getWorkspace(code: string) {
    return call<Workspace | null>(this.f, { op: "getWorkspace", code: normaliseCode(code) });
  }
  async saveWorkspace(workspace: Workspace) {
    await call(this.f, { op: "saveWorkspace", workspace });
  }
  async listPapers(code: string) {
    return (await this.getWorkspace(code))?.papers ?? [];
  }
  getPaper(code: string, id: string) {
    return call<Paper | null>(this.f, { op: "getPaper", code: normaliseCode(code), id });
  }
  async savePaper(paper: Paper) {
    await call(this.f, { op: "savePaper", paper });
  }
  getRuns(code: string, paperId: string, questionIds: string[]) {
    return call<Record<string, QuestionRun>>(this.f, { op: "getRuns", code: normaliseCode(code), paperId, questionIds });
  }
  async saveMarks(code: string, paperId: string, run: QuestionRun) {
    await call(this.f, { op: "saveMarks", code: normaliseCode(code), paperId, run });
  }
}

/**
 * Cloud with a browser copy. Saves: browser first (never lost), then cloud. Reads: cloud, else the browser copy.
 * When the browser copy is newer than the cloud (the cloud missed saves while offline), the newer one wins.
 */
export class ResilientStore implements Store {
  readonly backend = "cloud" as const;
  /** true after a cloud call failed; the screen can say "offline: saved in this browser" */
  degraded = false;
  constructor(
    private readonly cloud: Store,
    private readonly local: Store,
  ) {}
  private async both(save: (s: Store) => Promise<void>) {
    await save(this.local);
    try {
      await save(this.cloud);
      this.degraded = false;
    } catch {
      this.degraded = true;
    }
  }
  private async read<T extends { updatedAt: string } | null>(get: (s: Store) => Promise<T>): Promise<T> {
    const local = await get(this.local);
    try {
      const remote = await get(this.cloud);
      this.degraded = false;
      if (!remote) return local;
      if (local && local.updatedAt > remote.updatedAt) return local;
      return remote;
    } catch {
      this.degraded = true;
      return local;
    }
  }
  getWorkspace(code: string) {
    return this.read((s) => s.getWorkspace(code));
  }
  saveWorkspace(ws: Workspace) {
    return this.both((s) => s.saveWorkspace(ws));
  }
  async listPapers(code: string) {
    return (await this.getWorkspace(code))?.papers ?? [];
  }
  getPaper(code: string, id: string) {
    return this.read((s) => s.getPaper(code, id));
  }
  savePaper(paper: Paper) {
    return this.both((s) => s.savePaper(paper));
  }
  async getRuns(code: string, paperId: string, questionIds: string[]) {
    const local = await this.local.getRuns(code, paperId, questionIds);
    let remote: Record<string, QuestionRun> = {};
    try {
      remote = await this.cloud.getRuns(code, paperId, questionIds);
      this.degraded = false;
    } catch {
      this.degraded = true;
    }
    const out: Record<string, QuestionRun> = {};
    for (const q of questionIds) {
      const a = local[q];
      const b = remote[q];
      const pick = a && b ? (a.updatedAt > b.updatedAt ? a : b) : (a ?? b);
      if (pick) out[q] = pick;
    }
    return out;
  }
  saveMarks(code: string, paperId: string, run: QuestionRun) {
    return this.both((s) => s.saveMarks(code, paperId, run));
  }
}

/** Ask the server whether the cloud store is configured; fall back to the browser on any failure. */
export async function pickStore(f: Fetch = (...a) => fetch(...a)): Promise<Store> {
  const local = new BrowserStore();
  try {
    const res = await f("/api/store", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ op: "health" }) });
    const h = (await res.json()) as { cloud?: boolean };
    if (res.ok && h.cloud) return new ResilientStore(new CloudStore(f), local);
  } catch {
    // no server or no network: the browser backend
  }
  return local;
}
