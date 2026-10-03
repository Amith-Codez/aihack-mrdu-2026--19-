import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // three ships untranspiled ESM; needed by the story landing (branch `story`)
  transpilePackages: ["three"],
  // The product and the demo start at /app. The story landing owns "/" only when NEXT_PUBLIC_STORY=1.
  async redirects() {
    if (process.env.NEXT_PUBLIC_STORY === "1") return [];
    return [{ source: "/", destination: "/app", permanent: false }];
  },
};

export default nextConfig;
