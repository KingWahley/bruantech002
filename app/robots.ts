import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Disallow any private routes here if needed in the future
      // disallow: '/api/', 
    },
    sitemap: 'https://bruantech.com/sitemap.xml',
  };
}