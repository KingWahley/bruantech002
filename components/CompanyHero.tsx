"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import images from '@/constants/images';

export default function CompanyHero() {
  const customEase = [0.16, 1, 0.3, 1] as any;

  return (
    <section className="w-full bg-[#5EB3C3] pt-14 pb-28 md:pt-20 md:pb-24 relative h-86 md:h-100 lg:h-150">
      
      {/* Content Container */}
      <div className="max-w-[95%] md:max-w-[90%] mx-auto w-full flex flex-col gap-12 relative z-10 text-white">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: customEase }}
          className="text-3xl md:text-4xl lg:text-5xl font-medium font-mono tracking-tight max-w-4xl leading-[1.1]"
        >
          Your Trusted Partner For <br /> Seamless Business Solutions
        </motion.h1>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 w-[90%] max-w-6xl mx-auto mt-10 aspect-16/8 md:h-122 z-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 45 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: customEase }}
          className="w-full h-full relative shadow-2xl bg-white"
        >
          <Image 
            src={images.companyheroimg}
            alt="Bruantech team discussion"
            fill
            className="object-cover"
            priority
          />
          {/* Floating circular brand accent */}
          <div className="absolute -top-5 right-20 p-0.5 bg-primary rounded-full hidden md:flex items-center justify-center shadow-lg">
            <Image 
              src='/bruantechlogo.png'
              alt='BruanTech Logo'
              width={44}
              height={44}
              className='bg-white p-2 rounded-full'
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}