import { notFound } from 'next/navigation';
import { solutionsData } from '@/constants';
import SolutionDetailsHero from '@/components/SolutionDetailsHero';
import ServiceOfferings from '@/components/ServiceOfferings';
import TechPartnerApproach from '@/components/TechPartnerApproach';
import TechStackGrid from '@/components/TechStackGrid';
import WhyChooseUs from '@/components/WhyChooseUs';
import ThreeSteps from '@/components/ThreeSteps';
import Consultation from '@/components/Consultation';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = solutionsData.find((s) => s.slug === slug);
  
  if (!solution) return { title: 'Solution Not Found' };
  
  return {
    title: `${solution.title} | Bruantech Solutions`,
    description: solution.detailsDescription || solution.description,
  };
}

export default async function SolutionDetailsPage({ params }: Props) {
  const { slug } = await params;
  const solution = solutionsData.find((s) => s.slug === slug);

  if (!solution) {
    return notFound();
  }

  return (
    <main className="w-full bg-white">
      <SolutionDetailsHero solution={solution} />
      <ServiceOfferings solution={solution} />
      <TechPartnerApproach solution={solution} />
      <TechStackGrid solution={solution} />
      <WhyChooseUs />
      <ThreeSteps />
      <Consultation />
    </main>
  );
}