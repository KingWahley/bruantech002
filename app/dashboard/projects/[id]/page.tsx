import React from 'react';
import { notFound } from 'next/navigation';
import ProjectForm from '@/components/dashboard/forms/ProjectForm';
import { getProjectById } from '@/lib/actions/projects';

export const metadata = {
  title: 'Edit Project | Admin Dashboard',
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return notFound();
  }

  return <ProjectForm initialData={project} isEditing={true} />;
}
