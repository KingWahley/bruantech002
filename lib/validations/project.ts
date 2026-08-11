import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  slug: z.string().min(2, 'Slug is required'),
  category: z.string().optional(),
  categories: z.array(z.string()).optional(),
  client: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  tagline: z.string().optional(),

  deliverables: z.array(z.string()).optional(),
  process: z.array(z.string()).optional(),
  image: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  techStack: z.array(
    z.object({
      name: z.string(),
      icon: z.string().optional(),
    })
  ).optional(),
  featured: z.boolean().optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
