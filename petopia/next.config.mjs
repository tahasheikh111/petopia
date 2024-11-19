/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['rhqjltsozkibckinjyqt.supabase.co'], // Add Supabase domain here
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rhqjltsozkibckinjyqt.supabase.co',
        
      },
    ],
  },
};

export default nextConfig;
