import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Development configuration for better hot reloading
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: /node_modules/,
      }
    }
    return config
  },
  
  // Advanced image optimization for performance
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 86400, // 24 hours
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Bundle optimization for faster loading
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  
  // Comprehensive security and performance headers
  async headers() {
    const securityHeaders = [
      {
        key: 'Content-Security-Policy',
        value: `
          default-src 'self';
          script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.googletagmanager.com https://*.google-analytics.com https://*.googleadservices.com https://*.tawk.to https://vercel.live https://www.google.com https://www.gstatic.com;
          style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com;
          img-src 'self' data: blob: https://*.sanity.io https://*.googletagmanager.com https://*.google-analytics.com https://*.googleadservices.com https: https://*.gstatic.com;
          font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com data:;
          connect-src 'self' https://*.google-analytics.com https://*.googletagmanager.com https://*.googleadservices.com https://*.sanity.io https://fonts.googleapis.com https://fonts.gstatic.com https://vercel.live wss://ws-us3.pusher.com https://api.hawlton.com data: blob:;
          frame-src 'self' https://*.tawk.to https://vercel.live https://www.google.com;
          worker-src 'self' blob:;
          child-src 'self' blob:;
          object-src 'none';
          base-uri 'self';
          form-action 'self';
          frame-ancestors 'self';
          upgrade-insecure-requests;
        `.replace(/\s{2,}/g, ' ').trim()
      },
      {
        key: 'X-DNS-Prefetch-Control',
        value: 'on'
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload'
      },
      {
        key: 'X-Frame-Options',
        value: 'DENY'
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff'
      },
      {
        key: 'Referrer-Policy',
        value: 'origin-when-cross-origin'
      },
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block'
      },
      {
        key: 'Permissions-Policy',
        value: 'geolocation=(self), microphone=(), camera=()'
      }
    ]

    return [
      {
        source: '/(.*)',
        headers: securityHeaders
      },
      // Cache static assets aggressively
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      // Service Worker caching
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate'
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/'
          }
        ]
      }
    ];
  },
  
  // Basic redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index',
        destination: '/',
        permanent: true,
      }
    ]
  },
};

export default nextConfig;
