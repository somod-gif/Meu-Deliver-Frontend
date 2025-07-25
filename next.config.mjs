/** @type {import('next').NextConfig} */
const nextConfig = {};

// next.config.mjs
export default {
  reactStrictMode: true,
  experimental: {
    disableOptimizedLoading: true,
  },
  // Optional: Add this if you're still seeing extension issues
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
      pure: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "thumbs.dreamstime.com",
        port: "",
        pathname: "/b/**",
      },
    ],
  },
}

