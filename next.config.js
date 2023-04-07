/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'cdn.cdnlogo.com',
      'platform-lookaside.fbsbx.com',
      'mosaic.scdn.co',
      'i.scdn.co',
    ]
  }
}

module.exports = nextConfig
