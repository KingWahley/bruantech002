import { z } from 'zod';

export const blogPostSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  slug: z.string().min(2, 'Slug is required'),
  excerpt: z.string().optional(),
  image: z.string().optional(),
  category: z.string().optional(),
  authorName: z.string().optional(),
  authorRole: z.string().optional(),
  authorAvatar: z.string().optional(),
  readTime: z.string().optional(),
  content: z.union([z.array(z.any()), z.string()]).optional(),
  status: z.enum(['draft', 'published']).optional(),
  featured: z.boolean().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
});

export type BlogPostFormValues = z.infer<typeof blogPostSchema>;
