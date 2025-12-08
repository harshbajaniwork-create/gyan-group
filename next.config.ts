import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/blogs",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gyangroup.in",
      },
      {
        protocol: "https",
        hostname: "ei8ivscqnfmgh5rr.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "gyan-group.vercel.app/blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "gyan-group-alpha.vercel.app/blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
