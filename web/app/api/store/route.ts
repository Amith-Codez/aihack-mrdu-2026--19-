// POST /api/store: the cloud backend of lib/store.ts. 503 when the cloud store is not configured or unreachable,
// and the browser then keeps working on its own copy.
import { StoreRequest, cloudConfig, handleStore } from "@/lib/store-server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const parsed = StoreRequest.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Bad request", issues: parsed.error.issues.slice(0, 3) }, { status: 400 });
  if (parsed.data.op !== "health" && !cloudConfig()) return Response.json({ error: "cloud store is not configured" }, { status: 503 });
  try {
    return Response.json(await handleStore(parsed.data));
  } catch (err) {
    return Response.json({ error: (err as Error).message?.slice(0, 200) || "cloud store failed" }, { status: 503 });
  }
}
