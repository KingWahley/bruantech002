'use server';

import { createClient, createPublicClient } from '@/lib/supabase/server';
import { bruantechBlogs } from '@/constants';
import { revalidatePath } from 'next/cache';
import { logActivity } from './activity';
import { BlogPostFormValues } from '../validations/blog';

export async function getBlogPosts(options?: { status?: string; includeDeleted?: boolean }) {
  try {
    const supabase = createPublicClient();
    let query = supabase.from('blog_posts').select('*').order('created_at', { ascending: false });

    if (!options?.includeDeleted) {
      query = query.is('deleted_at', null);
    }

    if (options?.status && options.status !== 'all') {
      query = query.eq('status', options.status);
    }

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      return bruantechBlogs.map((post: any, idx: number) => ({
        id: `mock-blog-${idx}`,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || '',
        image: post.image || '',
        category: post.category || 'GOOGLE',
        author: post.author || { name: 'ADMIN', role: 'Design Director', avatar: '' },
        read_time: post.readTime || '5 min read',
        content: post.content || [],
        status: 'published',
        published_at: post.date || new Date().toISOString(),
        featured: idx === 0,
        created_at: new Date().toISOString(),
      }));
    }

    return data;
  } catch (err) {
    console.error('Error fetching blog posts:', err);
    return bruantechBlogs.map((post: any, idx: number) => ({
      id: `mock-blog-${idx}`,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      image: post.image || '',
      category: post.category || 'GOOGLE',
      author: post.author || { name: 'ADMIN', role: 'Design Director', avatar: '' },
      read_time: post.readTime || '5 min read',
      content: post.content || [],
      status: 'published',
      published_at: post.date || new Date().toISOString(),
      featured: idx === 0,
      created_at: new Date().toISOString(),
    }));
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .is('deleted_at', null)
      .single();

    if (error || !data) {
      const mock = bruantechBlogs.find((b) => b.slug === slug);
      if (!mock) return null;
      return {
        id: `mock-${mock.slug}`,
        title: mock.title,
        slug: mock.slug,
        excerpt: mock.excerpt || '',
        image: mock.image || '',
        category: mock.category || 'GOOGLE',
        author: mock.author || { name: 'ADMIN', role: 'Design Director', avatar: '' },
        read_time: mock.readTime || '5 min read',
        content: mock.content || [],
        status: 'published',
        date: mock.date || 'Oct 24, 2026',
      };
    }

    return data;
  } catch (err) {
    const mock = bruantechBlogs.find((b) => b.slug === slug);
    if (!mock) return null;
    return {
      id: `mock-${mock.slug}`,
      title: mock.title,
      slug: mock.slug,
      excerpt: mock.excerpt || '',
      image: mock.image || '',
      category: mock.category || 'GOOGLE',
      author: mock.author || { name: 'ADMIN', role: 'Design Director', avatar: '' },
      read_time: mock.readTime || '5 min read',
      content: mock.content || [],
      status: 'published',
      date: mock.date || 'Oct 24, 2026',
    };
  }
}

export async function getBlogPostById(id: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('blog_posts').select('*').eq('id', id).single();
    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

export async function createBlogPost(values: BlogPostFormValues) {
  const supabase = await createClient();

  const payload = {
    title: values.title,
    slug: values.slug,
    excerpt: values.excerpt || '',
    image: values.image || '',
    category: values.category || 'GENERAL',
    author: {
      name: values.authorName || 'ADMIN',
      role: values.authorRole || 'Design Director',
      avatar: values.authorAvatar || '',
    },
    read_time: values.readTime || '5 min read',
    content: values.content || [],
    status: values.status || 'draft',
    featured: values.featured || false,
    published_at: values.status === 'published' ? new Date().toISOString() : null,
    meta_title: values.meta_title || values.title,
    meta_description: values.meta_description || values.excerpt || '',
  };

  const { data, error } = await supabase.from('blog_posts').insert([payload]).select().single();

  if (error) {
    return { error: error.message };
  }

  await logActivity({
    action: values.status === 'published' ? 'BLOG_PUBLISHED' : 'BLOG_CREATED',
    entityType: 'blog',
    entityId: data.id,
    details: { title: data.title, slug: data.slug },
  });

  revalidatePath('/dashboard/blog');
  revalidatePath('/blog');
  return { success: true, data };
}

export async function updateBlogPost(id: string, values: BlogPostFormValues) {
  const supabase = await createClient();

  const payload = {
    title: values.title,
    slug: values.slug,
    excerpt: values.excerpt || '',
    image: values.image || '',
    category: values.category || 'GENERAL',
    author: {
      name: values.authorName || 'ADMIN',
      role: values.authorRole || 'Design Director',
      avatar: values.authorAvatar || '',
    },
    read_time: values.readTime || '5 min read',
    content: values.content || [],
    status: values.status || 'draft',
    featured: values.featured || false,
    meta_title: values.meta_title || values.title,
    meta_description: values.meta_description || values.excerpt || '',
  };

  const { data, error } = await supabase
    .from('blog_posts')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  await logActivity({
    action: values.status === 'published' ? 'BLOG_PUBLISHED' : 'BLOG_UPDATED',
    entityType: 'blog',
    entityId: id,
    details: { title: values.title, status: values.status },
  });

  revalidatePath('/dashboard/blog');
  revalidatePath(`/dashboard/blog/${id}`);
  revalidatePath('/blog');
  revalidatePath(`/blog/${values.slug}`);
  return { success: true, data };
}

export async function deleteBlogPost(id: string, permanent = false) {
  const supabase = await createClient();

  if (permanent) {
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase
      .from('blog_posts')
      .update({ deleted_at: new Date().toISOString(), status: 'archived' })
      .eq('id', id);
    if (error) return { error: error.message };
  }

  await logActivity({
    action: permanent ? 'BLOG_PERMANENT_DELETED' : 'BLOG_DELETED',
    entityType: 'blog',
    entityId: id,
  });

  revalidatePath('/dashboard/blog');
  revalidatePath('/blog');
  return { success: true };
}
