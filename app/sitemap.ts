import { MetadataRoute } from 'next';
import { solutionsData, caseStudiesData, bruantechBlogs } from '@/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bruantech.com';

  // Map all top-level static routes
  const staticRoutes = ['', '/company', '/solutions', '/case-studies', '/blog', '/contact'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    })
  );

  // Map dynamic Solution pages
  const solutionRoutes = solutionsData.map((solution) => ({
    url: `${baseUrl}/solutions/${solution.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Map dynamic Case Study pages
  const caseStudyRoutes = caseStudiesData.map((cs) => ({
    url: `${baseUrl}/case-studies/${cs.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Map dynamic Blog Post pages
  const blogRoutes = bruantechBlogs.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Combine and return the complete sitemap
  return [...staticRoutes, ...solutionRoutes, ...caseStudyRoutes, ...blogRoutes];
}