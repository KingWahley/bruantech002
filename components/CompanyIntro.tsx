"use client";

import { motion } from 'framer-motion';

export default function CompanyIntro() {
  return (
    <section className="w-full bg-white pt-24 pb-16 md:pt-44 md:pb-24">
      <div className="max-w-[95%] md:max-w-[90%] mx-auto w-full text-left">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-2xl text-[#4B5563] font-light leading-8 px-4"
        >
          Unlock endless opportunities with Bruantech, your trusted partner for modern software development, cloud solutions, and forward-thinking IT services. We bring together deep technical expertise, innovation, and a strong commitment to delivering results that help your business thrive. By leveraging the latest technologies and best practices, we empower you to stay competitive and succeed in today's rapidly evolving digital world.
        </motion.p>
      </div>
    </section>
  );
}