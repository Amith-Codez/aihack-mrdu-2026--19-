// Part 1 tests for lib/store.ts. No network: the cloud is an in-memory fake Redis behind the real handleStore().
// Run: (cd web && npx tsx scripts/store-test.mts)
import { BrowserStore, CloudStore, ResilientStore, kv, pickStore } from "../lib/store";
import { StoreRequest, handleStore } from "../lib/store-server";
import { emptyRun, normaliseCode, schemeKey, type Paper, type Workspace } from "../lib/store-types";

let pass = 0;
let fail = 0;
function ok(name: string, cond: boolean, extra = "") {
  if (cond) pass++;
  else fail++;
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${extra ? ` · ${extra}` : ""}`);
}

const now = () => new Date().toISOString();
const ws = (code: string): Workspace => ({ code, createdAt: now(), updatedAt: now(), papers: [], tips: {} });
const paper = (code: string, id: string, title: string): Paper => ({
  id,
  code,
  title,
  createdAt: now(),
  updatedAt: now(),
  students: [{ id: "S01", label: "Roll 01" }],
  sixStudentIds: ["S01"],
  questions: [
    {
      id: "Q1",
      n: 1,
      text: "What is a stack?",
      maxMarks: 5,
      scheme: [{ id: "c1", text: "Last in, first out", points: 5 }],
      schemeKey: schemeKey("What is a stack?", [{ text: "Last in, first out", points: 5 }]),
      tips: null,
      answers: [{ studentId: "S01", text: "LIFO list", inPdf: true }],
      teacherMarks: { S01: 5 },
    },
  ],
});

// ── browser backend ──
const mapStorage = () => {
  const m = new Map<string, string>();
  return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v), size: () => m.size };
};
{
  const store = new BrowserStore(kv(mapStorage()));
  const code = normaliseCode("cse-ds rani");
  ok("code is normalised", code === "CSE-DS-RANI", code);
  const w = ws(code);
  w.papers.push({ id: "P1", title: "Mid-term 1", createdAt: now(), updatedAt: now(), questions: 1, students: 1, marked: 0, total: 1 });
  await store.saveWorkspace(w);
  await store.savePaper(paper(code, "P1", "Mid-term 1"));
  const run = emptyRun("Q1");
  run.edits.S01 = { mark: 4, at: now() };
  run.usage.learning = { calls: 2, inputTokens: 100, outputTokens: 50 };
  await store.saveMarks(code, "P1", run);
  ok("browser: workspace round trip", (await store.getWorkspace("CSE-DS-RANI"))?.papers[0]?.title === "Mid-term 1");
  ok("browser: listPapers", (await store.listPapers(code)).length === 1);
  ok("browser: paper round trip", (await store.getPaper(code, "P1"))?.questions[0].teacherMarks.S01 === 5);
  const runs = await store.getRuns(code, "P1", ["Q1", "Q2"]);
  ok("browser: marks round trip (edit + usage)", runs.Q1?.edits.S01.mark === 4 && runs.Q1?.usage.learning.calls === 2 && !runs.Q2);

  // T4: another code sees nothing
  ok("T4 browser: other code sees no workspace", (await store.getWorkspace("CSE-OS-KUMAR")) === null);
  ok("T4 browser: other code sees no paper", (await store.getPaper("CSE-OS-KUMAR", "P1")) === null);
  ok("T4 browser: other code sees no marks", Object.keys(await store.getRuns("CSE-OS-KUMAR", "P1", ["Q1"])).length === 0);
}

// ── T6: storage blocked → memory, no crash ──
{
  const broken = { getItem: () => { throw new Error("blocked"); }, setItem: () => { throw new Error("blocked"); } };
  const store = new BrowserStore(kv(broken));
  let crashed = false;
  try {
    await store.saveWorkspace(ws("CSE-DS-RANI"));
    ok("T6 blocked storage: save and read in memory", (await store.getWorkspace("CSE-DS-RANI"))?.code === "CSE-DS-RANI");
  } catch {
    crashed = true;
  }
  ok("T6 blocked storage: no crash", !crashed);
  const noWindow = new BrowserStore(kv());
  await noWindow.saveWorkspace(ws("ABC"));
  ok("T6 no localStorage at all (server/tests): memory works", (await noWindow.getWorkspace("ABC"))?.code === "ABC");
}

// ── cloud backend: real handleStore + /api/store contract, fake Redis ──
process.env.KV_REST_API_URL = "https://fake-redis.test";
process.env.KV_REST_API_TOKEN = "test-token-not-real";
const redisData = new Map<string, string>();
let redisUp = true;
let redisCalls = 0;
const fakeRedis: typeof fetch = async (_url, init) => {
  redisCalls++;
  if (!redisUp) throw new Error("network down");
  const [cmd, k, v] = JSON.parse(String(init?.body)) as string[];
  if (cmd === "SET") redisData.set(k, v);
  return new Response(JSON.stringify({ result: cmd === "GET" ? (redisData.get(k) ?? null) : "OK" }));
};
// what the browser's fetch("/api/store") reaches: validate exactly like the route, then handleStore
const fakeApi: typeof fetch = async (_url, init) => {
  const parsed = StoreRequest.safeParse(JSON.parse(String(init?.body)));
  if (!parsed.success) return new Response(JSON.stringify({ error: "Bad request" }), { status: 400 });
  try {
    return new Response(JSON.stringify(await handleStore(parsed.data, fakeRedis)));
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 503 });
  }
};
{
  const cloud = new CloudStore(fakeApi);
  await cloud.saveWorkspace(ws("CSE-DS-RANI"));
  await cloud.savePaper(paper("CSE-DS-RANI", "P1", "Mid-term 1"));
  await cloud.saveMarks("CSE-DS-RANI", "P1", emptyRun("Q1"));
  ok("cloud: workspace round trip", (await cloud.getWorkspace("CSE-DS-RANI"))?.code === "CSE-DS-RANI");
  ok("cloud: paper round trip", (await cloud.getPaper("CSE-DS-RANI", "P1"))?.title === "Mid-term 1");
  ok("cloud: marks round trip", !!(await cloud.getRuns("CSE-DS-RANI", "P1", ["Q1"])).Q1);
  ok("cloud: keys are namespaced by code", [...redisData.keys()].every((x) => x.includes(":CSE-DS-RANI")), [...redisData.keys()].join(", "));
  ok("T4 cloud: other code sees nothing", (await cloud.getWorkspace("CSE-OS-KUMAR")) === null && (await cloud.getPaper("CSE-OS-KUMAR", "P1")) === null);
  const bad = await fakeApi("/api/store", { method: "POST", body: JSON.stringify({ op: "getWorkspace", code: "../etc" }) });
  ok("cloud: a malformed code is refused (400)", bad.status === 400);
  ok("pickStore: cloud configured → cloud backend", (await pickStore(fakeApi)).backend === "cloud");
}

// ── internet drop: cloud fails, nothing is lost ──
{
  const local = new BrowserStore(kv(mapStorage()));
  const store = new ResilientStore(new CloudStore(fakeApi), local);
  await store.saveWorkspace(ws("OFFLINE-TEST"));
  redisUp = false;
  const p = paper("OFFLINE-TEST", "P9", "Saved while offline");
  let crashed = false;
  try {
    await store.savePaper(p);
  } catch {
    crashed = true;
  }
  ok("offline: save does not crash", !crashed);
  ok("offline: store reports degraded", store.degraded);
  ok("offline: read falls back to the browser copy", (await store.getPaper("OFFLINE-TEST", "P9"))?.title === "Saved while offline");
  redisUp = true;
  const newer = { ...p, title: "Edited after coming back", updatedAt: new Date(Date.now() + 1000).toISOString() };
  await local.savePaper(newer); // the browser has a newer copy than the cloud
  ok("back online: the newer copy wins", (await store.getPaper("OFFLINE-TEST", "P9"))?.title === "Edited after coming back");
}

// ── T6 again: no server at all → browser backend ──
{
  const down: typeof fetch = async () => {
    throw new Error("no server");
  };
  ok("T6 pickStore: server unreachable → browser backend", (await pickStore(down)).backend === "browser");
  const notConfigured: typeof fetch = async () => new Response(JSON.stringify({ cloud: false }));
  ok("pickStore: cloud not configured → browser backend", (await pickStore(notConfigured)).backend === "browser");
}

ok("scheme fingerprint: same question + scheme → same key, whitespace ignored", schemeKey("What is a stack?", [{ text: "LIFO", points: 5 }]) === schemeKey("what is  a stack?", [{ text: "lifo", points: 5 }]));
ok("scheme fingerprint: different points → different key", schemeKey("Q", [{ text: "LIFO", points: 5 }]) !== schemeKey("Q", [{ text: "LIFO", points: 4 }]));

console.log(`\n${pass} passed, ${fail} failed · fake Redis calls: ${redisCalls}`);
process.exit(fail ? 1 : 0);
