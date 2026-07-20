import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project so Next doesn't pick up the
  // stray package-lock.json in the parent home directory.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
