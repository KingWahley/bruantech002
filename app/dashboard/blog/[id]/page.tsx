import React from 'react';
import { notFound } from 'next/navigation';
import BlogForm from '@/components/dashboard/forms/BlogForm';
import { getBlogPostById } from '@/lib/actions/blog';

export const metadata = {
  title: 'Edit Blog Post | Admin Dashboard',
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({ params }: Props) {
  const { id } = await params;
  const post = await getBlogPostById(id);

  if (!post) {
    return notFound();
  }

  return <BlogForm initialData={post} isEditing={true} />;
}
