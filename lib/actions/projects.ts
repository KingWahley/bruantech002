'use server';

import { createClient, createPublicClient } from '@/lib/supabase/server';
import { caseStudiesData } from '@/constants';
import { revalidatePath } from 'next/cache';
import { logActivity } from './activity';
import { ProjectFormValues } from '../validations/project';

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
      // Fallback to constants ONLY if there is a real database query error
      return caseStudiesData.map((item: any, idx: number) => ({
        id: `mock-project-${idx}`,
        title: item.title,
        slug: item.slug,
        description: item.description || '',
        category: item.category || 'Web Design',
        client: item.client || 'Client',
        location: item.location || 'Nigeria',
        deliverables: item.deliverables || ['Web Design', 'Development'],
        process: item.process || [],
        image: typeof item.image === 'string' ? item.image : item.image?.src || '/images/default.jpg',
        gallery: item.gallery || [],
        tech_stack: item.techStack || [],
        featured: !!item.featured,
        status: 'published',
        created_at: new Date().toISOString(),
      }));
    }

    return data || [];
  } catch (err) {
    console.error('Error fetching projects:', err);
    return caseStudiesData.map((item: any, idx: number) => ({
      id: `mock-project-${idx}`,
      title: item.title,
      slug: item.slug,
      description: item.description || '',
      category: item.category || 'Web Design',
      client: item.client || 'Client',
      location: item.location || 'Nigeria',
      deliverables: item.deliverables || ['Web Design'],
      process: item.process || [],
      image: typeof item.image === 'string' ? item.image : item.image?.src || '/images/default.jpg',
      gallery: item.gallery || [],
      tech_stack: item.techStack || [],
      featured: !!item.featured,
      status: 'published',
      created_at: new Date().toISOString(),
    }));
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
    category: values.category,
    client: values.client || '',
    location: values.location || '',
    description: values.description || '',
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
    category: values.category,
    client: values.client || '',
    location: values.location || '',
    description: values.description || '',
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

