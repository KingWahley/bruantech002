"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import images from '@/constants/images';

export default function FeaturedCaseStudy() {
  return (
    <section className="w-full bg-white pt-6 md:pt-18 pb-10">
      <div className="max-w-[95%] md:max-w-[90%] mx-auto w-full flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-[56px] font-medium font-mono text-black tracking-tight"
          >
            Featured Case Studies
          </motion.h1>
          <Link 
            href="/case-studies/never-go-alone"
            className="bg-black text-white px-6 py-4 rounded-xl font-bold text-base md:text-2xl hover:bg-gray-800 transition-colors"
          >
            Explore Project
          </Link>
        </div>

        {/* Featured Image */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative w-full h-80 md:h-136 rounded-2xl overflow-hidden shadow-lg"
        >
          <Image 
            src={images.featuredimg}
            alt="Never Go Alone Featured Project"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* The Process Text */}
        <div className="max-w-7xl flex flex-col gap-4 mt-6">
          <h3 className="text-xl font-bold text-[#0D0D0D]">The Process</h3>
          <p className="text-[#0D0D0D] text-base md:text-xl leading-relaxed font-light">
            At Arc & Aura, we don't just design visuals we build brands with direction, clarity, and lasting impact. Every project is rooted in strategy, shaped by design, and refined with precision. We work with founders, startups, and growing businesses that are ready to move beyond generic visuals and step into a brand identity that actually reflects their value.
          </p>
          <p className="text-[#0D0D0D] text-base md:text-xl leading-relaxed font-light mt-2">
            Our approach combines thoughtful strategy with modern design execution, ensuring every brand we create feels intentional, consistent, and built for real-world growth. From foundational identity systems to full brand transformations, we focus on creating work that doesn't just look good but performs in the market.
          </p>
        </div>

      </div>
    </section>
  );
}