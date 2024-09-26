/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['placehold.co'],
  },
  typescript: {
    ignoreBuildErrors: true, // You might want to remove this once all type errors are fixed
  },
}

module.exports = nextConfig
