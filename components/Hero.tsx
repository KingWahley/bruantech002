"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import images from '@/constants/images';

export default function Hero() {
  return (
    <section className="w-full bg-white pt-10 pb-20 md:pt-10 md:pb-16 overflow-hidden">
      <div className="max-w-[95%] md:max-w-[90%] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4 md:gap-6 max-w-2xl"
        >
          <span className="text-xs font-bold text-[#1D22B2] tracking-widest uppercase">
            Smart Solutions. Stronger Businesses.
          </span>
          <h1 className="text-4xl md:text-[63px] font-bold font-mono text-black md:leading-[63.25px] tracking-[-1px]">
            We handle your technology so you can focus on what matters
          </h1>
          <p className="text-base md:text-lg text-[#6B7280] leading-relaxed max-w-lg md:mt-2">
            From IT support to digital transformation, we deliver reliable solutions that keep your business moving forward.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <Link 
              href="/contact"
              className="flex items-center gap-2 bg-primary text-white px-6 py-4 rounded font-medium hover:bg-[#4ea2b2] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.66667 5.83333V2.5M13.3333 5.83333V2.5M5.83333 9.16667H14.1667M4.16667 17.5H15.8333C16.7538 17.5 17.5 16.7538 17.5 15.8333V5.83333C17.5 4.91286 16.7538 4.16667 15.8333 4.16667H4.16667C3.24619 4.16667 2.5 4.91286 2.5 5.83333V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5L6.66667 5.83333" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Work With Us
            </Link>
            <Link 
              href="/services"
              className="flex items-center gap-2 bg-[#F0F2FF] text-primary px-8 py-4 rounded font-medium hover:bg-[#e2f1f3] transition-colors"
            >
              Explore Services
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.33333 3.3335L14 8.00016M14 8.00016L9.33333 12.6668M14 8.00016H2" stroke="#6ABBC7" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

            </Link>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-square md:aspect-4/3 lg:aspect-auto lg:h-120"
        >
          {/* Using a custom clip-path or heavy border radius to mimic the shape */}
          <div
            className="relative w-full h-full overflow-hidden shadow-2xl"
            style={{
              clipPath: "polygon(30% 0, 100% 0, 100% 81%, 81% 100%, 30% 100%, 0% 50%)",
            }}
          >
            <Image 
              src={images.heroimg}
              alt="Professional tech team"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}