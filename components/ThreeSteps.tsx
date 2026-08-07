"use client";

import Image from 'next/image';
import { stepsData } from '@/constants';
import { motion } from 'framer-motion';

export default function ThreeSteps() {
  return (
    <section className="w-full bg-white py-10 lg:pt-14 lg:pb-26 overflow-hidden">
      <div className="w-full flex flex-col items-center">
        
        <h2 className="mx-6 lg:mx-0 text-4xl md:text-[56px] font-bold font-mono text-black tracking-tight mb-12 text-center">
          You Are All Set In Three Steps
        </h2>

        <div className="relative w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 lg:gap-20 px-10 md:px-6 lg:px-20">
          
          {/* Background Wavy Line (Desktop only) */}
          <svg className='absolute top-60 md:top-0 inset-0 rotate-90 md:rotate-none translate-x-[-35%] md:translate-none' width="1044" height="454" viewBox="0 0 1044 454" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_59_33)">
              <path d="M1033.46 93.3503C1004.29 15.529 733.053 -62.0195 668.54 83.9041C580.256 283.593 539.6 276.951 481.577 275.801C423.554 274.651 212.995 156.417 125.762 234.625C28.7119 321.634 100.423 454.347 8.78508 429.536" stroke="#FF6D6D" strokeWidth="3.47112"/>
            </g>
            <defs>
              <filter id="filter0_d_59_33" x="0.000355721" y="0" width="1043.42" height="453.749" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="11.1076"/>
                <feGaussianBlur stdDeviation="4.16535"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_59_33"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_59_33" result="shape"/>
              </filter>
            </defs>
          </svg>


          {stepsData.map((step, index) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center text-center bg-white z-20 rounded-2xl shadow-xl"
            >
              <div className="w-full lg:w-78 aspect-4/3 md:h-57 relative rounded-2xl overflow-hidden shadow-lg mb-6 border border-gray-100">
                <Image 
                  src={step.image} 
                  alt={step.title}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-lg font-medium font-mono text-[#242627] max-w-62 pb-14">
                {step.title}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}