import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  outputFileTracingRoot: path.join(process.cwd()),
};

export default nextConfig;
