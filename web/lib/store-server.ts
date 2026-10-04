// Server side of the cloud backend: a hosted Redis (Upstash, added through the Vercel Marketplace), spoken to over
// its REST API with plain fetch (no extra package). Used only when its env vars exist. Keys never reach the browser.
import { z } from "zod";
import { Paper, QuestionRun, Workspace, WorkspaceCode } from "./store-types";

const MAX_VALUE_BYTES = 900_000; // stay under the free plan's request size

export function cloudConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

async function redis(cmd: (string | number)[], fetchImpl: typeof fetch = fetch) {
  const cfg = cloudConfig();
  if (!cfg) throw new Error("cloud store is not configured");
  const res = await fetchImpl(cfg.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmd),
    signal: AbortSignal.timeout(8_000),
  });
  const data = (await res.json().catch(() => ({}))) as { result?: unknown; error?: string };
  if (!res.ok || data.error) throw new Error(`cloud store: ${data.error ?? res.status}`);
  return data.result;
}

const key = {
  ws: (code: string) => `mm:ws:${code}`,
  paper: (code: string, id: string) => `mm:paper:${code}:${id}`,
  run: (code: string, paperId: string, qid: string) => `mm:run:${code}:${paperId}:${qid}`,
};

async function getJson<T>(k: string, schema: z.ZodType<T>, f?: typeof fetch): Promise<T | null> {
  const raw = await redis(["GET", k], f);
  if (typeof raw !== "string") return null;
  const parsed = schema.safeParse(JSON.parse(raw));
  return parsed.success ? parsed.data : null;
}
async function setJson(k: string, value: unknown, f?: typeof fetch) {
  const s = JSON.stringify(value);
  if (s.length > MAX_VALUE_BYTES) throw new Error("too large to save in the cloud store");
  await redis(["SET", k, s], f);
}

const Id = z.string().regex(/^[A-Za-z0-9_-]{1,64}$/);

export const StoreRequest = z.discriminatedUnion("op", [
  z.object({ op: z.literal("health") }),
  z.object({ op: z.literal("getWorkspace"), code: WorkspaceCode }),
  z.object({ op: z.literal("saveWorkspace"), workspace: Workspace }),
  z.object({ op: z.literal("getPaper"), code: WorkspaceCode, id: Id }),
  z.object({ op: z.literal("savePaper"), paper: Paper }),
  z.object({ op: z.literal("getRuns"), code: WorkspaceCode, paperId: Id, questionIds: z.array(Id).max(30) }),
  z.object({ op: z.literal("saveMarks"), code: WorkspaceCode, paperId: Id, run: QuestionRun }),
]);
export type StoreRequest = z.infer<typeof StoreRequest>;

/** One store operation. Every key is prefixed with the workspace code, so two codes never share data. */
export async function handleStore(req: StoreRequest, f?: typeof fetch): Promise<unknown> {
  switch (req.op) {
    case "health":
      return { cloud: cloudConfig() !== null };
    case "getWorkspace":
      return getJson(key.ws(req.code), Workspace, f);
    case "saveWorkspace":
      await setJson(key.ws(req.workspace.code), req.workspace, f);
      return { ok: true };
    case "getPaper":
      return getJson(key.paper(req.code, req.id), Paper, f);
    case "savePaper":
      await setJson(key.paper(req.paper.code, req.paper.id), req.paper, f);
      return { ok: true };
    case "getRuns": {
      const out: Record<string, QuestionRun> = {};
      for (const q of req.questionIds) {
        const r = await getJson(key.run(req.code, req.paperId, q), QuestionRun, f);
        if (r) out[q] = r;
      }
      return out;
    }
    case "saveMarks":
      await setJson(key.run(req.code, req.paperId, req.run.questionId), req.run, f);
      return { ok: true };
  }
}
