// One boolean per shown feature (00 §6). Env sets the default; `?flags=match:0,eval:1` overrides it in the browser.
export type Flags = { match: boolean; evalPanel: boolean; story: boolean };

const on = (v: string | undefined, fallback: boolean) => (v === undefined || v === "" ? fallback : v === "1");

export const defaultFlags: Flags = {
  match: on(process.env.NEXT_PUBLIC_MATCH_ENABLED, true),
  evalPanel: on(process.env.NEXT_PUBLIC_EVAL_PANEL, true),
  story: on(process.env.NEXT_PUBLIC_STORY, false),
};

const KEYS: Record<string, keyof Flags> = { match: "match", eval: "evalPanel", story: "story" };

export function readFlags(search?: string | URLSearchParams): Flags {
  const flags = { ...defaultFlags };
  const raw = typeof search === "string" ? new URLSearchParams(search).get("flags") : search?.get("flags");
  if (!raw) return flags;
  for (const pair of raw.split(",")) {
    const [k, v] = pair.split(":");
    const key = KEYS[k?.trim() ?? ""];
    if (key) flags[key] = v?.trim() === "1";
  }
  return flags;
}
