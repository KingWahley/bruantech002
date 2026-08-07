"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function TechStackGrid({ solution }: { solution: any }) {
  // If the tech stack data doesn't exist for this solution, hide the section
  if (!solution.techStack || solution.techStack.length === 0) return null;

  return (
    <section className="w-full bg-[#2D2323]">
      <div className="w-full flex flex-col">
        
        <div className='max-w-[90%] mx-auto item-start text-left w-full py-8 md:pt-16'>
          <h2 className="text-3xl md:text-5xl font-medium font-mono text-white tracking-tight mb-4">
            Technologies We Work With
          </h2>
          <p className="text-white text-lg md:text-xl font-light md:mb-6">
            A Combination of Professional, Industry standard tool <br className="hidden md:block" />
            to get the work done
          </p>
        </div>

        <div className="px-6 py-10 md:p-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full bg-black">
          {solution.techStack.map((tech: any, idx: number) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-[#3D3435] hover:bg-[#524b48] transition-colors rounded-2xl p-3 md:p-6 flex items-center justify-center gap-4 text-white"
            >
              <div className='relative w-10 md:w-14 h-10 md:h-14'>
                {/* Safety check: Only render Image if tech.icon exists and is valid */}
                {tech.icon && (
                  <Image 
                    src={tech.icon}
                    alt={tech.name}
                    fill
                    className="object-contain"
                  />
                )}
              </div>
              <span className="text-base md:text-lg font-medium">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}