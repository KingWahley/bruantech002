import FeaturedCaseStudy from '@/components/FeaturedCaseStudy';
import CaseStudiesGrid from '@/components/CaseStudiesGrid';
import WhyChooseUs from '@/components/WhyChooseUs';
import ThreeSteps from '@/components/ThreeSteps';
import Consultation from '@/components/Consultation';
import { getProjects } from '@/lib/actions/projects';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Explore our featured technology and design projects.',
};

export const dynamic = 'force-dynamic';

export default async function CaseStudiesPage() {
  const projects = await getProjects({ status: 'published' });
  const featuredProject = projects.find((p: any) => p.featured) || projects[0];

  return (
    <main className="w-full bg-white">
      <FeaturedCaseStudy project={featuredProject} />
      <CaseStudiesGrid projects={projects} />
      <WhyChooseUs />
      <ThreeSteps />
      <Consultation />
    </main>
  );
}