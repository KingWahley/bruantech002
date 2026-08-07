"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function TechPartnerApproach({ solution }: { solution: any }) {
  // If this solution doesn't have these details, don't render the section
  if (!solution.partnerFeatures || !solution.approach) return null;

  return (
    <section className="w-full bg-white flex flex-col">
      
      {/* PART 1: The Technology Partner */}
      <div className="w-full py-20 md:py-32 max-w-[95%] md:max-w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
        
        {/* Left List */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 flex flex-col gap-4 relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-full rounded-4xl bg-[#F0F1F5]" />
          {solution.partnerFeatures.map((feature: any, idx: number) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm flex flex-col gap-2 relative z-10">
              <div className="py-3 px-4 flex items-center justify-between border-b border-black/10">
                <h4 className="font-bold text-black">{feature.title}</h4>
                <div className="w-5 h-5 rounded-full border-2 border-black/65 bg-[#a8dfeb] shadow-xl" />
              </div>
              <p className="py-2 px-4 text-[#434655] text-sm md:text-base leading-normal">{feature.description}</p>
            </div>
          ))}
          
        </motion.div>

        {/* Right Content */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4 md:gap-8 lg:pl-10 px-2 md:px-0"
        >
          {/* Decorative Icon */}
          <div className="relative w-12 md:w-16 h-12 md:h-16">
            <Image src='/techcaticon.png' alt='tech icon' fill className='object-cover'/>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-mono text-[#20294C] tracking-tight leading-tighter">
            The Technology Partner Your Business Needs
          </h2>
          <div className="flex flex-wrap gap-4">
            <span className="px-6 py-2 border border-gray-300 text-[#0A2D67] font-semibold rounded-full text-sm">
              Fast Delivery
            </span>
            <span className="px-6 py-2 border border-gray-300 text-[#0A2D67] font-semibold rounded-full text-sm">
              Guaranteed Quality
            </span>
          </div>
          <p className="text-[#20294C] text-lg md:text-xl leading-relaxed font-light">
            We work closely with businesses to understand their goals, challenges, and requirements, delivering tailored software solutions that improve efficiency, support growth, and address their unique needs.
          </p>
        </motion.div>
      </div>

      {/* PART 2: Our Software Development Approach */}
      <div className="w-full bg-[#F4F5F9] py-10 md:py-18">
        <div className="max-w-[95%] md:max-w-[90%] mx-auto w-full flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-medium font-mono text-[#141B2B] tracking-tight mb-6 md:mb-12 text-center">
            Our Software Development Approach
          </h2>

          {/* Stepper Timeline */}
          <div className="relative w-full flex flex-col md:flex-row justify-between gap-6 md:gap-4">
            {/* Horizontal Line behind circles */}
            <div className="hidden md:block absolute top-6 -left-4 w-full h-0.5 bg-gray-300 z-0" />

            {solution.approach.map((step: any, idx: number) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center md:items-start text-center md:text-left relative z-10 w-[65%] mx-auto md:w-1/5"
              >
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mb-3 md:mb-6 shadow-md border-4 border-[#F4F5F9]">
                  {step.step}
                </div>
                <h4 className="font-bold text-[#111111] mb-1 md:mb-3">{step.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed px-0">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}