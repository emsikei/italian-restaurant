/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    images: {
        domains: ['corso.md', 'res.cloudinary.com'],
    },
    i18n: {
        locales: ['ro'],
        defaultLocale: 'ro',
        localeDetection: false,
    },
};

module.exports = withBundleAnalyzer({ ...nextConfig });
