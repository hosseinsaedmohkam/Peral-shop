/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '69316c5111a8738467cebd0a.mockapi.io',
        port: '', // اگر پورت خاصی نداری خالی باشه
        pathname: '/**', // همه مسیرها مجاز
      },
    ],
  },
};

export default nextConfig;
