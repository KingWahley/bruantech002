import React from 'react';
import ProjectForm from '@/components/dashboard/forms/ProjectForm';

export const metadata = {
  title: 'Create New Project | Admin Dashboard',
};

export default function NewProjectPage() {
  return <ProjectForm isEditing={false} />;
}
