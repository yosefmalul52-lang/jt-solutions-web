import type { NextConfig } from "next";
import { getLegacyServiceRedirects } from "@/lib/seo/legacy-redirects";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 80],
  },
  async redirects() {
    return getLegacyServiceRedirects();
  },
};

export default nextConfig;
