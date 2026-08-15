'use server';

import { createClient, createPublicClient } from '@/lib/supabase/server';
import { caseStudiesData } from '@/constants';
import { revalidatePath } from 'next/cache';
import { logActivity } from './activity';
import { ProjectFormValues } from '../validations/project';

/** Ensures every project always has a `categories` string[] regardless of
 *  whether the DB row was saved before multi-category support was added. */
function normaliseProject(p: any) {
  const cats: string[] =
    Array.isArray(p.categories) && p.categories.length > 0
      ? p.categories
      : p.category
        ? [p.category]
        : [];
  return { ...p, categories: cats };
}

export async function getProjects(options?: { status?: string; includeDeleted?: boolean }) {
  try {
    let supabase;
    try {
      supabase = await createClient();
    } catch {
      supabase = createPublicClient();
    }

    let query = supabase.from('projects').select('*').order('created_at', { ascending: false });

    if (!options?.includeDeleted) {
      query = query.is('deleted_at', null);
    }

    if (options?.status && options.status !== 'all') {
      query = query.eq('status', options.status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Database query error in getProjects:', error);
      return [];
    }

    return data ? data.map(normaliseProject) : [];
  } catch (err) {
    console.error('Error fetching projects:', err);
    return [];
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    let supabase;
    try {
      supabase = await createClient();
    } catch {
      supabase = createPublicClient();
    }

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .is('deleted_at', null)
      .single();

    if (error || !data) {
      const mock = caseStudiesData.find((p) => p.slug === slug);
      if (!mock) return null;
      return {
        id: `mock-${mock.slug}`,
        title: mock.title,
        slug: mock.slug,
        description: mock.description || '',
        category: mock.category || 'Web Design',
        client: mock.client || 'Deola Sagoe',
        location: mock.location || 'Nigeria',
        deliverables: mock.deliverables || ['Web Design', 'Web Development'],
        process: mock.process || [],
        image: typeof mock.image === 'string' ? mock.image : mock.image?.src || '',
        gallery: mock.gallery || [],
        tech_stack: mock.techStack || [],
        featured: !!mock.featured,
        status: 'published',
      };
    }

    return data;
  } catch (err) {
    const mock = caseStudiesData.find((p) => p.slug === slug);
    if (!mock) return null;
    return {
      id: `mock-${mock.slug}`,
      title: mock.title,
      slug: mock.slug,
      description: mock.description || '',
      category: mock.category || 'Web Design',
      client: mock.client || 'Deola Sagoe',
      location: mock.location || 'Nigeria',
      deliverables: mock.deliverables || ['Web Design'],
      process: mock.process || [],
      image: typeof mock.image === 'string' ? mock.image : mock.image?.src || '',
      gallery: mock.gallery || [],
      tech_stack: mock.techStack || [],
      featured: !!mock.featured,
      status: 'published',
    };
  }
}

export async function getProjectById(id: string) {
  if (id.startsWith('mock-project-')) {
    const idxStr = id.replace('mock-project-', '');
    const idx = parseInt(idxStr, 10);
    const mock = caseStudiesData[idx];
    if (mock) {
      return {
        id,
        title: mock.title,
        slug: mock.slug,
        description: mock.description || '',
        category: mock.category || 'Web Design',
        client: mock.client || 'Client',
        location: mock.location || 'Nigeria',
        deliverables: mock.deliverables || ['Web Design', 'Development'],
        process: mock.process || [],
        image: typeof mock.image === 'string' ? mock.image : mock.image?.src || '',
        gallery: mock.gallery || [],
        tech_stack: mock.techStack || [],
        featured: !!mock.featured,
        status: 'published',
      };
    }
  }

  if (id.startsWith('mock-')) {
    const slug = id.replace('mock-', '');
    const mock = caseStudiesData.find((p) => p.slug === slug);
    if (mock) {
      return {
        id,
        title: mock.title,
        slug: mock.slug,
        description: mock.description || '',
        category: mock.category || 'Web Design',
        client: mock.client || 'Client',
        location: mock.location || 'Nigeria',
        deliverables: mock.deliverables || ['Web Design', 'Development'],
        process: mock.process || [],
        image: typeof mock.image === 'string' ? mock.image : mock.image?.src || '',
        gallery: mock.gallery || [],
        tech_stack: mock.techStack || [],
        featured: !!mock.featured,
        status: 'published',
      };
    }
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

export async function createProject(values: ProjectFormValues) {
  const supabase = await createClient();

  const payload = {
    title: values.title,
    slug: values.slug,
    categories: values.categories?.length ? values.categories : (values.category ? [values.category] : ['Web Design']),
    category: values.categories?.[0] || values.category || 'Web Design',
    client: values.client || '',
    location: values.location || '',
    description: values.description || '',
    tagline: values.tagline || '',
    deliverables: values.deliverables || [],
    process: values.process || [],
    image: values.image || '',
    gallery: values.gallery || [],
    tech_stack: values.techStack || [],
    featured: values.featured || false,
    status: values.status || 'draft',
    meta_title: values.meta_title || values.title,
    meta_description: values.meta_description || values.description || '',
  };

  const { data, error } = await supabase.from('projects').insert([payload]).select().single();

  if (error) {
    return { error: error.message };
  }

  await logActivity({
    action: 'PROJECT_CREATED',
    entityType: 'project',
    entityId: data.id,
    details: { title: data.title, slug: data.slug },
  });

  revalidatePath('/');
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/projects');
  revalidatePath('/case-studies');
  revalidatePath(`/case-studies/${values.slug}`);
  return { success: true, data };
}

export async function updateProject(id: string, values: ProjectFormValues) {
  const supabase = await createClient();

  const payload = {
    title: values.title,
    slug: values.slug,
    categories: values.categories?.length ? values.categories : (values.category ? [values.category] : ['Web Design']),
    category: values.categories?.[0] || values.category || 'Web Design',
    client: values.client || '',
    location: values.location || '',
    description: values.description || '',
    tagline: values.tagline || '',
    deliverables: values.deliverables || [],
    process: values.process || [],
    image: values.image || '',
    gallery: values.gallery || [],
    tech_stack: values.techStack || [],
    featured: values.featured || false,
    status: values.status || 'draft',
    meta_title: values.meta_title || values.title,
    meta_description: values.meta_description || values.description || '',
  };

  const { data, error } = await supabase
    .from('projects')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  await logActivity({
    action: 'PROJECT_UPDATED',
    entityType: 'project',
    entityId: id,
    details: { title: values.title, status: values.status },
  });

  revalidatePath('/');
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/projects');
  revalidatePath(`/dashboard/projects/${id}`);
  revalidatePath('/case-studies');
  revalidatePath(`/case-studies/${values.slug}`);
  return { success: true, data };
}

export async function deleteProject(id: string, permanent = false) {
  const supabase = await createClient();

  if (permanent) {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase
      .from('projects')
      .update({ deleted_at: new Date().toISOString(), status: 'archived' })
      .eq('id', id);
    if (error) return { error: error.message };
  }

  await logActivity({
    action: permanent ? 'PROJECT_PERMANENT_DELETED' : 'PROJECT_DELETED',
    entityType: 'project',
    entityId: id,
  });

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/projects');
  revalidatePath('/case-studies');
  return { success: true };
}

export async function toggleFeaturedProject(id: string, currentFeatured: boolean) {
  const supabase = await createClient();

  const newFeaturedState = !currentFeatured;

  // If we're featuring this project, unfeature all others first (only one featured at a time)
  if (newFeaturedState) {
    const { error: clearError } = await supabase
      .from('projects')
      .update({ featured: false })
      .neq('id', id);

    if (clearError) return { error: clearError.message };
  }

  // Now set the target project's featured state
  const { error } = await supabase
    .from('projects')
    .update({ featured: newFeaturedState })
    .eq('id', id);

  if (error) return { error: error.message };

  await logActivity({
    action: newFeaturedState ? 'PROJECT_FEATURED' : 'PROJECT_UNFEATURED',
    entityType: 'project',
    entityId: id,
  });

  revalidatePath('/');
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/projects');
  revalidatePath('/case-studies');
  return { success: true };
}

/** Returns every distinct category that exists in the DB, merged with the
 *  built-in defaults, deduplicated and sorted alphabetically. */
export async function getProjectCategories(): Promise<string[]> {
  const DEFAULTS = ['Web Design', 'App Design', 'E-Commerce', 'Cloud Engineering'];
  try {
    let supabase;
    try {
      supabase = await createClient();
    } catch {
      supabase = createPublicClient();
    }
    const { data } = await supabase
      .from('projects')
      .select('category, categories')
      .is('deleted_at', null);

    const fromDb: string[] = (data ?? []).flatMap((r: { category?: string; categories?: string[] }) => {
      if (Array.isArray(r.categories) && r.categories.length > 0) return r.categories;
      return r.category ? [r.category] : [];
    }).filter(Boolean);

    const merged = Array.from(new Set([...DEFAULTS, ...fromDb])).sort();
    return merged;
  } catch {
    return DEFAULTS;
  }
}

export async function bulkUpdateProjects(ids: string[], action: 'publish' | 'draft' | 'delete') {
  if (!ids || ids.length === 0) return { success: true };
  const supabase = await createClient();

  if (action === 'delete') {
    const { error } = await supabase
      .from('projects')
      .update({ deleted_at: new Date().toISOString(), status: 'archived' })
      .in('id', ids);

    if (error) return { error: error.message };

    await logActivity({
      action: 'PROJECT_BULK_DELETED',
      entityType: 'project',
      details: { count: ids.length, ids },
    });
  } else {
    const status = action === 'publish' ? 'published' : 'draft';
    const { error } = await supabase
      .from('projects')
      .update({ status })
      .in('id', ids);

    if (error) return { error: error.message };

    await logActivity({
      action: action === 'publish' ? 'PROJECT_BULK_PUBLISHED' : 'PROJECT_BULK_DRAFTED',
      entityType: 'project',
      details: { count: ids.length, ids, status },
    });
  }

  revalidatePath('/');
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/projects');
  revalidatePath('/case-studies');
  return { success: true };
}

