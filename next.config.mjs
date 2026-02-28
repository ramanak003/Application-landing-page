/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/Application-landing-page",
  assetPrefix: "/Application-landing-page",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
