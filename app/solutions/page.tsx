import SolutionsHero from '@/components/SolutionsHero';
import SolutionsGrid from '@/components/SolutionsGrid';
import WhyChooseUs from '@/components/WhyChooseUs';
import ThreeSteps from '@/components/ThreeSteps';
import Consultation from '@/components/Consultation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services & Solutions',
  description: 'Unlock the full potential of your business with our wide range of solutions.',
};

export default function SolutionsPage() {
  return (
    <main className="w-full bg-white">
      <SolutionsHero />
      <SolutionsGrid />
      <WhyChooseUs />
      <ThreeSteps />
      <Consultation />
    </main>
  );
}