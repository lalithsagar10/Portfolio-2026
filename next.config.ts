import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Emit a static site with `index.html` at `out/index.html` — upload the `out` folder to classic static hosts. */
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
