import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'https://ch4ts3c-auth.ret-to.win/api/auth/:path*',
      }
    ]
  },
};

export default nextConfig;
