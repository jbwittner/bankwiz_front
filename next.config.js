/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination: 'http://localhost:8000/api/:slug*', // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig;
