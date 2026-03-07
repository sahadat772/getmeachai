import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  generateBuildId: async () => {
    return Date.now().toString();
  },
  turbopack: {
    root: __dirname,
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
    formats: ['image/avif', 'image/webp'],
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },


  serverExternalPackages: ['mongoose', 'bcryptjs'],
  compress: true,
  poweredByHeader: false,
};


export default nextConfig;