/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['m.media-amazon.com'], // ✅ allow external images from Amazon
  },
};

export default nextConfig;
