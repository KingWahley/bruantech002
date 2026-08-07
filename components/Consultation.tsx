"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import images from '@/constants/images';

export default function Consultation() {
  return (
    <section className="w-full bg-white pb-10 md:pb-10">
      <div className="w-full bg-black px-6 py-16 md:p-16 lg:py-26 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-14">
        
        {/* Left Form Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-[40%] flex flex-col text-white"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-mono tracking-tight leading-[1.1] mb-3">
            Schedule A Free <br /> Consultation
          </h2>
          <p className="text-[#959595] text-base md:text-lg mb-6 max-w-md">
            We're here to respond to your questions and guide you in selecting the services that best align with your needs.
          </p>
          
          <form className="flex flex-col gap-3 md:gap-5 w-full max-w-md">
            <input 
              type="text" 
              placeholder="Enter your name" 
              required
              className="w-full bg-transparent border border-white rounded-full px-6 py-4 text-white placeholder-white focus:outline-none focus:border-primary transition-colors"
            />
            <input 
              type="email" 
              placeholder="Enter your work email" 
              required
              className="w-full bg-transparent border border-white rounded-full px-6 py-4 text-white placeholder-white focus:outline-none focus:border-primary transition-colors"
            />
            <button 
              type="submit"
              className="w-full bg-primary text-white rounded-full px-6 py-4 font-medium hover:bg-[#4ea2b2] transition-colors flex items-center justify-center gap-2 mt-2"
            >
              Submit 
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </form>
        </motion.div>

        {/* Right UI Graphic */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-[60%] relative h-100 lg:h-125 rounded-2xl"
        >
          <div className="w-full h-full relative">
            <Image 
              src={images.consultimg}
              alt="Booking Calendar Interface"
              fill
              className="object-cover rounded-2xl"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}