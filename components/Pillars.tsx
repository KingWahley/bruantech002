"use client";

import Image from 'next/image';
import { pillarsData } from '@/constants';
import { motion } from 'framer-motion';
import images from '@/constants/images';

export default function Pillars() {
  return (
    <section className="w-full bg-white pb-24 md:pb-32">
      <div className="max-w-[95%] md:max-w-[90%] mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {pillarsData.map((pillar, index) => (
          <motion.div 
            key={pillar.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="border-3 border-black rounded-3xl pt-8 flex flex-col justify-between overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-xl hover:border-black/50 transition-all duration-300 group bg-white min-h-80 md:min-h-120"
          >
            {/* Upper Content */}
            <div className="px-6 flex flex-col">
              <div className="w-8 h-8 flex items-center justify-center text-xl text-[#5EB3C3] group-hover:scale-110 transition-transform duration-300">
                <Image 
                  src={pillar.icon}
                  alt={`${pillar.title} Icon`}
                  className='object-cover'
                />
              </div>
              <h3 className="text-2xl font-extrabold font-mono text-black mt-4">{pillar.title}</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed mt-2">
                {pillar.description}
              </p>
            </div>

            {/* Bottom Graphic Illustration */}
            <div className="relative w-full aspect-video mt-6 md:mt-10 bg-gray-50 border-t border-gray-100">
              <Image 
                src={pillar.image}
                alt={`${pillar.title} graphic`}
                fill
                className="object-cover object-center"
              />
            </div>

          </motion.div>
        ))}

      </div>
    </section>
  );
}