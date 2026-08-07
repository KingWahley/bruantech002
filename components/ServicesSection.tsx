"use client";

import { featuresData } from '@/constants';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function ServicesSection() {
  return (
    <section className="w-full bg-black pt-14 md:pt-24 pb-2 md:pb-6 overflow-hidden">
      <div className="max-w-[95%] md:max-w-[90%] mx-auto w-full">
        
        {/* --- PART 1: What We Do --- */}
        <div className="mb-16">
          <span className="text-secondary text-sm font-semibold font-mono tracking-wider block mb-4">
            What we Do
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-mono text-white md:mb-8 tracking-tight">
            Your Technology Partner <br /> For A Complex World
          </h2>
          
          {/* Features Horizontal Scroll/Grid */}
          <div className="flex overflow-x-auto gap-4 no-scrollbar snap-x snap-mandatory pt-6">
            {featuresData.map((feature, index) => (
              <motion.div 
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`shrink-0 w-[80%] md:w-[50%] lg:w-[31%] snap-start rounded-2xl p-4 md:p-8 flex flex-col items-center text-center ${feature.bgColor} ${feature.textColor || "text-black"}`}
              >
                <div className="relative w-full h-40 mb-0 md:mb-4 flex items-center justify-center">
                  <Image 
                    src={feature.icon}
                    alt={feature.title}
                    fill
                    className='object-contain'
                  />
                </div>
                <h3 className="text-xl font-bold font-mono mb-2 mt-4">{feature.title}</h3>
                <p className="text-sm leading-relaxed opacity-90">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}