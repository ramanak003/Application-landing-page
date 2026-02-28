/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true"

const nextConfig = {
  output: "export",
  basePath: isGithubActions ? "/Application-landing-page" : "",
  assetPrefix: isGithubActions ? "/Application-landing-page" : "",
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
