"use client";

import images from '@/constants/images';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-white py-10 md:py-20 overflow-hidden">
      <div className="max-w-[95%] md:max-w-5xl mx-auto w-full flex flex-col items-center text-center">
        
      <h2 className="text-3xl md:text-[56px] font-bold font-mono text-black tracking-tight text-center leading-tight">
        <span className="relative">
          <svg className="absolute inset-0 w-full h-full z-0" width="141" height="48" viewBox="0 0 141 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="140.74" height="47.5931" rx="23.7966" fill="#D7EEDD"/>
          </svg>


          <span className="relative px-4 z-10">Why</span>
        </span>

        {" "}You Should{" "}
        <br />

        <span className="relative">

          <svg className="absolute inset-0 w-full h-full z-0" width="253" height="23" viewBox="0 0 253 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30.6189 1.0199H228.719L0.0439453 10.8105H252.288L124.467 21.417" stroke="#FFC250" strokeWidth={2.03971}/>
          </svg>
          <span className="relative z-10">Choose Us</span>

        </span>
      </h2>

        {/* Central Quote Area */}
        <div className="relative w-full max-w-2xl mx-auto mt-4 md:mt-0">
          {/* Large Quotes */}
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#D7EEDD4D] rounded-3xl p-10 md:p-14 relative z-10"
          >
            <span className="absolute top-6 left-6 md:left-10 text-[80px] md:text-[120px] text-[#C5CAC6] font-serif leading-none">“</span>
            <span className="absolute -bottom-6 md:-bottom-14 right-10 md:right-40 text-[90px] md:text-[120px] text-[#C5CAC6] font-serif leading-none">”</span>

            <p className="text-sm md:text-xl text-black leading-relaxed">
              At Bruantech, we are committed to delivering reliable, results-driven technology solutions tailored to your business goals. We take a client-first approach, working as an independent technology partner that provides honest advice and practical solutions
            </p>
          </motion.div>

          {/* Floating Avatars (Absolute positioned around the box) */}
          <div className="hidden lg:block">
            <div className="absolute -top-24 -left-32 w-16 h-16 rounded-full bg-gray-300 overflow-hidden">
              <Image 
                src={images.choose6}
                alt='Avatar'
                fill
                className='object-cover object-top'
              />
            </div>
            <div className="absolute top-[-15%] -left-50 w-8 h-8 rounded-full bg-gray-500 overflow-hidden">
              <Image 
                src={images.choose2}
                alt='Avatar'
                fill
                className='object-cover object-right'
              />
            </div>
            <div className="absolute top-[40%] -left-36 w-32 h-32 rounded-full bg-gray-400 overflow-hidden -translate-y-1/2">
             <Image 
                src={images.choose1}
                alt='Avatar'
                fill
                className='object-cover object-top'
              />
            </div>
            <div className="absolute bottom-10 -left-44 w-12 h-12 rounded-full bg-gray-500 overflow-hidden">
              <Image 
                src={images.choose7}
                alt='Avatar'
                fill
                className='object-cover object-top'
              />
            </div>
            
            <div className="absolute -top-28 -right-39 w-18 h-18 rounded-full bg-gray-300 overflow-hidden">
              <Image 
                src={images.choose8}
                alt='Avatar'
                fill
                className='object-cover object-top'
              />
            </div>
            <div className="absolute -top-10 -right-19 w-12 h-12 rounded-full bg-gray-400 overflow-hidden">
              <Image 
                src={images.choose4}
                alt='Avatar'
                fill
                className='object-cover object-top'
              />
            </div>
            <div className="absolute top-10 -right-28 w-14 h-14 rounded-full bg-gray-400 overflow-hidden">
              <Image 
                src={images.choose5}
                alt='Avatar'
                fill
                className='object-cover object-top'
              />
            </div>
            <div className="absolute bottom-0 -right-52 w-34 h-34 rounded-full bg-gray-500 overflow-hidden">
              <Image 
                src={images.choose3}
                alt='Avatar'
                fill
                className='object-cover object-top'
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}