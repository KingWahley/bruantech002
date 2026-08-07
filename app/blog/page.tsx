import BlogList from '@/components/BlogList';
import Consultation from '@/components/Consultation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Our official blog with news, engineering articles, and business cases.',
};

export default function BlogPage() {
  return (
    <main className="w-full bg-[#F8F9FA]">
      <BlogList />
      <Consultation />
    </main>
  );
}