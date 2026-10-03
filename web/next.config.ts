import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // three ships untranspiled ESM; needed by the story landing (branch `story`)
  transpilePackages: ["three"],
};

export default nextConfig;
