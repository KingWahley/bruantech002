import { getBlogPostBySlug } from '@/lib/actions/blog';
import { bruantechBlogs } from '@/constants';
import { notFound } from 'next/navigation';
import ArticleContent from '@/components/ArticleContent';
import RelatedArticles from '@/components/RelatedArticles';
import Consultation from '@/components/Consultation';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) return { title: 'Post Not Found' };
  
  return {
    title: `${post.title} | Bruantech Blog`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  return bruantechBlogs.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  return (
    <main className="w-full bg-white">
      <ArticleContent post={post} />
      <RelatedArticles currentSlug={post.slug} />
      <Consultation />
    </main>
  );
}