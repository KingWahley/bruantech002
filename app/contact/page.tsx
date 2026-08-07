import type { Metadata } from 'next';
import ContactHero from '@/components/ContactHero';
import WhyChooseUs from '@/components/WhyChooseUs';
import Consultation from '@/components/Consultation';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Ready to bring your vision to life? Get in touch with our team to discuss how our strategic IT and digital expertise can elevate your next project.',
};

export default function ContactPage() {
  return (
    <main className="w-full bg-white">
      <ContactHero />
      <WhyChooseUs />
      <Consultation />
    </main>
  );
}