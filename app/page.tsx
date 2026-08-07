import Hero from '@/components/Hero';
import TrustedBy from '@/components/TrustedBy';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import ThreeSteps from '@/components/ThreeSteps';
import Consultation from '@/components/Consultation';
import EndToEnd from '@/components/EndToEnd';

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-white">
      <Hero />
      <TrustedBy />
      <ServicesSection />
      <EndToEnd />
      <WhyChooseUs />
      <ThreeSteps />
      <Consultation />
    </main>
  );
}