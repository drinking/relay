/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**.vintage.love",
            },
        ],
    },
};

export default nextConfig;
