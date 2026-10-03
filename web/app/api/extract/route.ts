// POST /api/extract (multipart, field "file") → the class found in the PDF, as JSON.
import { MAX_PDF_BYTES, extractClass } from "@/lib/extract";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return Response.json({ error: "Attach a PDF." }, { status: 400 });
  if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) return Response.json({ error: "That is not a PDF." }, { status: 400 });
  if (file.size > MAX_PDF_BYTES) return Response.json({ error: "The PDF is larger than 4 MB." }, { status: 413 });
  try {
    const r = await extractClass(new Uint8Array(await file.arrayBuffer()), req.signal);
    return Response.json(r);
  } catch (err) {
    return Response.json({ error: (err as Error).message || "Could not read this PDF." }, { status: 422 });
  }
}
