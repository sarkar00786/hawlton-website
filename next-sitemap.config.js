/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://hawlton.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/auth/*',
    '/dashboard/*',
    '/admin/*',
    '/api/*',
    '/test-*',
    '/partner-portal',
    '/offline'
  ],
  transform: async (config, path) => {
    // Custom priority and changefreq for different page types
    const customConfig = {
      '/': {
        priority: 1.0,
        changefreq: 'weekly',
      },
      '/about': {
        priority: 0.9,
        changefreq: 'monthly',
      },
      '/partner': {
        priority: 0.9,
        changefreq: 'weekly',
      },
      '/solutions': {
        priority: 0.8,
        changefreq: 'monthly',
      },
      '/contact': {
        priority: 0.8,
        changefreq: 'monthly',
      },
      '/careers': {
        priority: 0.7,
        changefreq: 'weekly',
      },
      '/careers/apply': {
        priority: 0.6,
        changefreq: 'monthly',
      },
      '/privacy': {
        priority: 0.3,
        changefreq: 'yearly',
      },
      '/terms': {
        priority: 0.3,
        changefreq: 'yearly',
      },
    }

    const customSettings = customConfig[path] || {}

    return {
      loc: path,
      lastmod: new Date().toISOString(),
      priority: customSettings.priority || 0.7,
      changefreq: customSettings.changefreq || 'monthly',
    }
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/auth/',
          '/dashboard/',
          '/admin/',
          '/api/',
          '/test-tailwind/',
          '/partner-portal',
          '/offline'
        ],
      },
      // Block specific bots
      {
        userAgent: 'AhrefsBot',
        disallow: '/',
      },
      {
        userAgent: 'MJ12bot',
        disallow: '/',
      },
      {
        userAgent: 'DotBot',
        disallow: '/',
      },
    ],
    additionalSitemaps: [],
  },
}
