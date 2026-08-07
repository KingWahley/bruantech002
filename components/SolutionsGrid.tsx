"use client";

import Image from 'next/image';
import Link from 'next/link';
import { solutionsData } from '@/constants';
import { motion } from 'framer-motion';

export default function SolutionsGrid() {
  return (
    <section className="w-full bg-white py-16 md:py-24 mt-80 md:mt-30">
      <div className="max-w-[95%] md:max-w-[90%] mx-auto w-full flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-14 flex flex-col items-center md:gap-2">
          <h2 className="text-3xl md:text-5xl lg:text-[56px] font-bold font-mono text-[#1A1A1A] tracking-tight">
            End-to-end IT solutions designed
          </h2>
          {/* Cursive Accent Text */}
          <span className="text-2xl md:text-6xl text-[#009387] font-medium md:tracking-[-3.5px] md:mt-2" style={{ fontFamily: 'cursive, "Comic Sans MS", sans-serif' }}>
            to support and scale business
          </span>
        </div>

        {/* 3x3 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
          {solutionsData.map((solution, index) => (
            <motion.div 
              key={solution.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                href={`/solutions/${solution.slug}`}
                className={`flex flex-col items-center text-center p-6 md:p-10 rounded-2xl h-full group transition-transform hover:-translate-y-2 hover:shadow-xl ${solution.bgColor}`}
              >
                <div className="relative w-48 h-48 md:mb-8">
                  <Image 
                    src={solution.image}
                    alt={solution.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#0D0D0D] mb-4 group-hover:text-[#5EB3C3] transition-colors">
                  {solution.title}
                </h3>
                <p className="text-[#58595D] text-sm leading-relaxed font-light">
                  {solution.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}