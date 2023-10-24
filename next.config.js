/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    experimental: {
      serverActions: true,
    },
    images: {
      domains: ['i.scdn.co'],
      
    },
  }
