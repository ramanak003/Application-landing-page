/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true"

const nextConfig = {
  output: "export",
  basePath: isGithubActions ? "/praxis-app-landing-webpage" : "",
  assetPrefix: isGithubActions ? "/praxis-app-landing-webpage" : "",
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
