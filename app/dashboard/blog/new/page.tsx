import React from 'react';
import BlogForm from '@/components/dashboard/forms/BlogForm';

export const metadata = {
  title: 'Write New Post | Admin Dashboard',
};

export default function NewBlogPostPage() {
  return <BlogForm isEditing={false} />;
}
