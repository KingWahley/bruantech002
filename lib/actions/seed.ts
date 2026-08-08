'use server';

import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { caseStudiesData, bruantechBlogs } from '@/constants';
import { revalidatePath } from 'next/cache';

export async function seedDatabase() {
  try {
    let supabase = await createClient();
    
    // Check if user is authenticated, otherwise use admin client
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      supabase = createAdminClient() as any;
    }

    let seededProjectsCount = 0;
    let projectErrors: string[] = [];

    // 1. Seed Projects
    for (const project of caseStudiesData) {
      const payload = {
        title: project.title,
        slug: project.slug,
        description: project.description || '',
        category: project.category || 'General',
        client: project.client || 'Client',
        location: project.location || 'Global',
        deliverables: project.deliverables || ['Web Design', 'Web Development'],
        process: project.process || [],
        tech_stack: project.techStack || [],
        image: typeof project.image === 'string' ? project.image : project.image?.src || '',
        gallery: (project.gallery || []).map((img: any) => typeof img === 'string' ? img : img?.src || ''),
        featured: Boolean(project.featured),
        status: 'published',
        meta_title: project.title,
        meta_description: project.description || '',
      };

      // Check if project already exists by slug
      const { data: existing } = await supabase
        .from('projects')
        .select('id')
        .eq('slug', project.slug)
        .maybeSingle();

      let res;
      if (existing) {
        res = await supabase.from('projects').update(payload).eq('slug', project.slug);
      } else {
        res = await supabase.from('projects').insert([payload]);
      }

      if (res.error) {
        projectErrors.push(`[${project.slug}]: ${res.error.message}`);
      } else {
        seededProjectsCount++;
      }
    }

    // 2. Seed Blog Posts
    let seededBlogCount = 0;
    let blogErrors: string[] = [];

    for (const post of bruantechBlogs) {
      const payload = {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || '',
        content: post.content || [],
        category: post.category || 'GENERAL',
        author: {
          name: post.author?.name || 'ADMIN',
          role: post.author?.role || 'Design Director',
          avatar: typeof post.author?.avatar === 'string' ? post.author.avatar : post.author?.avatar?.src || '',
        },
        image: typeof post.image === 'string' ? post.image : post.image?.src || '',
        read_time: post.readTime || '5 min read',
        status: 'published',
        published_at: new Date().toISOString(),
        meta_title: post.title,
        meta_description: post.excerpt || '',
      };

      const { data: existingBlog } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', post.slug)
        .maybeSingle();

      let res;
      if (existingBlog) {
        res = await supabase.from('blog_posts').update(payload).eq('slug', post.slug);
      } else {
        res = await supabase.from('blog_posts').insert([payload]);
      }

      if (res.error) {
        blogErrors.push(`[${post.slug}]: ${res.error.message}`);
      } else {
        seededBlogCount++;
      }
    }

    // 3. Seed Site Settings
    const defaultSettings = {
      siteTitle: 'Bruantech - Technology & Digital Agency',
      siteDescription: 'Transforming ideas into high-performing digital experiences.',
      contactEmail: 'Brume@gmail.com',
      phoneNumber: '+123456780',
      address: '132 address lagos Nigeria',
      twitterUrl: '#',
      instagramUrl: '#',
      discordUrl: '#',
      linkedinUrl: '#',
      footerText: '© 2026 BruanTech. All rights reserved.',
      googleAnalyticsId: '',
    };

    const { data: existingSettings } = await supabase
      .from('settings')
      .select('id')
      .eq('key', 'site_general')
      .maybeSingle();

    if (existingSettings) {
      await supabase
        .from('settings')
        .update({ value: defaultSettings, updated_at: new Date().toISOString() })
        .eq('key', 'site_general');
    } else {
      await supabase
        .from('settings')
        .insert([{ key: 'site_general', value: defaultSettings, updated_at: new Date().toISOString() }]);
    }

    revalidatePath('/dashboard');
    revalidatePath('/dashboard/projects');
    revalidatePath('/dashboard/blog');
    revalidatePath('/dashboard/settings');

    if (projectErrors.length > 0 || blogErrors.length > 0) {
      const firstError = projectErrors[0] || blogErrors[0];
      return {
        error: `Seeding issue: ${firstError} (Seeded ${seededProjectsCount} projects, ${seededBlogCount} blogs)`,
      };
    }

    return {
      success: true,
      message: `Database populated successfully! Seeded ${seededProjectsCount} projects and ${seededBlogCount} blog posts.`,
    };
  } catch (err: any) {
    console.error('Seed error:', err);
    return { error: err.message || 'Failed to seed database' };
  }
}
