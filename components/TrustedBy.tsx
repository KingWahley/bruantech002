"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import images from '@/constants/images';

const brands = [
  images.brand1,
  images.brand2,
  images.brand3,
  images.brand4,
  images.brand5,
  images.brand6,
];

export default function TrustedBy() {
  return (
    <section className="w-full relative py-10 md:py-12 bg-white overflow-hidden">
      {/* Background Map Graphic Placeholder */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      <div className="max-w-[95%] mx-auto w-full text-center flex flex-col items-center relative z-10">
        
        <div className="flex flex-col items-center gap-2 mb-4 md:mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">
            Trusted Worldwide
          </span>
          <div className="w-8 h-0.5 bg-secondary" />
        </div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl lg:text-[56px] font-bold font-mono text-[#111827] leading-tighter tracking-tight mb-6  md:max-w-4xl mx-auto"
        >
          Businesses in Europe, Africa, Canada, and the U.S. <br className="hidden lg:block"/>
          <span className="text-secondary">rely on our solutions to</span> grow.
        </motion.h2>

        <p className="text-[#6B7280] text-lg mb-6 max-w-xl">
          We're proud to empower organizations across industries to achieve their goals and make an impact.
        </p>

        <div className='flex items-center gap-1 mb-10'>
          <div className='bg-[#D1D5DB] h-0.5 w-7' />
          <div className='bg-secondary rounded-full h-2 w-2' />
          <div className='bg-[#D1D5DB] h-0.5 w-7' />
        </div>

        {/* Clients Box */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full max-w-[95%] mx-auto bg-white rounded-2xl shadow-[0_8px_20px_rgb(0,0,0,0.08)] p-10 mt-6"
        >
          {/* Pill Badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-4 rounded-full">
            Our Valued Clients
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="w-28 md:w-36 h-18 md:h-20 flex items-center justify-center md:border-r border-[#B9B9B9] pr-8 last:border-none"
              >
                <Image
                  src={brand}
                  alt={`Brand ${index + 1}`}
                  className="max-w-full max-h-full object-contain transition duration-300"
                />
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}