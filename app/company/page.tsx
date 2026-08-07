import CompanyHero from '@/components/CompanyHero';
import CompanyIntro from '@/components/CompanyIntro';
import Pillars from '@/components/Pillars';
import ServicesSection from '@/components/ServicesSection';
import HowWeDoIt from '@/components/HowWeDoIt';
import Consultation from '@/components/Consultation'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Company',
  description: 'Your Trusted Partner For Seamless Business Solutions.',
};

export default function CompanyPage() {
  return (
    <main className="w-full bg-white">
      <CompanyHero />
      <CompanyIntro />
      <Pillars />
      <ServicesSection />
      <HowWeDoIt />
      <Consultation />
    </main>
  );
}