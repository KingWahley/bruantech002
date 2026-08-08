import { getProjects, getProjectBySlug } from '@/lib/actions/projects';
import { caseStudiesData } from '@/constants';
import { notFound } from 'next/navigation';
import ProjectDetails from '@/components/ProjectDetails';
import BruantechBlog from '@/components/BruantechBlog';
import Consultation from '@/components/Consultation';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const projects = await getProjects({ status: 'published' });
  if (projects && projects.length > 0) {
    return projects.map((project: any) => ({
      slug: project.slug,
    }));
  }

  return caseStudiesData.map((post) => ({
    slug: post.slug,
  }));
}

export default async function CaseStudyDetailsPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return notFound();
  }

  return (
    <main className="w-full bg-white">
      <ProjectDetails project={project} />
      <BruantechBlog />
      <Consultation />
    </main>
  );
}