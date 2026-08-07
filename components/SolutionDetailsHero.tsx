"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function SolutionDetailsHero({ solution }: { solution: any }) {
  return (
    <section className="w-full bg-[#E0F8F2] pt-8 md:pt-12 pb-16 md:pb-20 overflow-hidden">
      <div className="max-w-[95%] md:max-w-[90%] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-2 md:gap-6 md:pb-24">
          <h1 className="text-4xl md:text-[72px] font-medium font-mono text-black leading-[1.05] tracking-tight">
            {solution.title}
          </h1>
          <p className="text-black text-base leading-relaxed max-w-md mt-2">
            {solution.detailsDescription || solution.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mt-2 md:mt-6">
            <Link href="/contact" className="flex items-center gap-2 bg-primary text-white px-4 md:px-8 py-4 rounded-2xl font-bold hover:bg-[#4ea2b2] transition-colors shadow-xl">
              Schedule a Free Consultation <ArrowRight size={20}/>
            </Link>
            <Link href="/solutions" className="flex items-center gap-2 bg-[#E1E8FD] text-black px-4 md:px-8 py-4 font-bold rounded-2xl hover:bg-[#d0e5e6] transition-colors">
              Explore Our Services
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="relative w-full aspect-square md:aspect-4/3 lg:aspect-auto lg:h-140 mt-auto">
          <Image 
            src={solution.heroImage || solution.image} 
            alt={solution.title}
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>

      </div>
    </section>
  );
}