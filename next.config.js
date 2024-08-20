/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com'
      },
      {
        protocol: 'https',
        hostname: 'hb.afl.rakuten.co.jp'
      },
      {
        protocol: 'https',
        hostname: 'www.amazon.co.jp'
      },
      {
        protocol: 'https',
        hostname: 'thumbnail.image.rakuten.co.jp'
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com'
      }
    ]
  },
};

module.exports = nextConfig;
