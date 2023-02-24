/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  exportPathMap: async function (
    defaultPathMap, {dev, dir, outDir, distDir, buildId}
  ) {
    return {
      "/": {page: "/"},
      "/signin": {page: "/signin"},
      "/password-change": {page: "/password-change"},
      "/password-forget": {page: "/password-forget"},
    }
  }
}

module.exports = nextConfig
