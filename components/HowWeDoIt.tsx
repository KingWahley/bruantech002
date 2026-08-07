"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import images from '@/constants/images';

export default function HowWeDoIt() {
  const customEase = [0.16, 1, 0.3, 1] as any;

  return (
    <section className="w-full bg-[#FFD5D5] py-10 md:py-16 overflow-hidden">
      <div className="max-w-[95%] md:max-w-[90%] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-16 lg:gap-8 items-center">
        
        {/* Left: UI Workflow Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: customEase }}
          className="relative w-full aspect-square max-w-125 mx-auto lg:mx-0"
        >
          {/* Back */}
          <Image
            src={images.companylayer1}
            alt="Workflow 1"
            fill
            className="object-contain z-0 scale-80 -rotate-6 translate-x-8 -translate-y-6"
          />

          {/* Middle */}
          <div className='absolute inset-0 -top-5'>
            <Image
              src={images.companylayer2}
              alt="Workflow 2"
              fill
              className="object-contain z-10 scale-78 rotate-4"
            />
          </div>

          {/* Front */}
          <Image
            src={images.companylayer3}
            alt="Workflow 3"
            fill
            className="object-contain z-20 scale-115"
          />
        </motion.div>

        {/* Right: Text Copy & Navigation */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: customEase }}
          className="flex flex-col gap-4 md:gap-6 max-w-xl px-6 md:px-0"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-black tracking-tight">
            How We Do It
          </h2>
          <p className="text-[#4B5563] text-base md:text-lg leading-relaxed md:mt-6">
            At Bruantech, we believe simplicity drives success in a fast-moving digital world. Our team of skilled engineers and developers specializes in turning complex technical requirements into clean, intuitive, and user-friendly applications.
          </p>
          <div className="md:mt-2">
            <Link 
              href="/services"
              className="inline-flex items-center justify-center border-2 border-black rounded-2xl px-8 py-4 font-medium text-sm hover:bg-black/5 transition-colors text-black"
            >
              Explore Services
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}