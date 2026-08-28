import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Allow phone / tunnel access during `next dev`.
   * Without this, Next.js blocks HMR chunks from non-localhost origins → ChunkLoadError.
   * @see https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins
   */
  allowedDevOrigins: [
    "192.168.1.69",
    "localhost",
    "127.0.0.1",
    "*.loca.lt",
  ],
};

export default nextConfig;
