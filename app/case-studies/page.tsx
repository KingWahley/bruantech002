import FeaturedCaseStudy from '@/components/FeaturedCaseStudy';
import CaseStudiesGrid from '@/components/CaseStudiesGrid';
import WhyChooseUs from '@/components/WhyChooseUs';
import ThreeSteps from '@/components/ThreeSteps';
import Consultation from '@/components/Consultation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Explore our featured technology and design projects.',
};

export default function CaseStudiesPage() {
  return (
    <main className="w-full bg-white">
      <FeaturedCaseStudy />
      <CaseStudiesGrid />
      <WhyChooseUs />
      <ThreeSteps />
      <Consultation />
    </main>
  );
}