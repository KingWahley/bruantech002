"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ProjectDetails({ project }: { project: any }) {
  return (
    <section className="w-full bg-white pt-8 md:pt-14 pb-10">
      <div className="max-w-[95%] md:max-w-[90%] mx-auto w-full flex flex-col gap-8">
        
        {/* Title & Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium font-mono text-black tracking-tight">
            {project.title}
          </h1>
          <button className="bg-black text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors">
            Project Gallery
          </button>
        </div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full h-70 md:h-140 rounded-3xl overflow-hidden shadow-lg bg-gray-100"
        >
          {project.image ? (
            <Image 
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Image Not Found
            </div>
          )}
        </motion.div>

        {/* Process Text */}
        {project.process && (
          <div className="flex flex-col gap-6 max-w-7xl mt-4">
            <h3 className="text-xl font-bold text-[#0D0D0D]">The Process</h3>
            <p className="text-[#0D0D0D] text-base md:text-xl leading-relaxed font-light">
              {project.process[0]}
            </p>
            <p className="text-[#0D0D0D] text-base md:text-xl leading-relaxed font-light">
              {/* {project.process[1]} */}
            </p>
          </div>
        )}

        {/* Split Info Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 mt-2 md:mt-10">
          
          {/* Left: Tech Stack Panel (Dark) */}
          <div className="bg-[#2D2323] rounded-2xl flex flex-col gap-2 overflow-hidden text-white">
            <div className="flex flex-col gap-2 p-6 md:p-10">
              <h3 className="text-2xl font-bold">Technology Used</h3>
              <p className="text-white text-sm md:text-base w-full md:w-[65%]">A Combination of Professional, Industry standard tool to get the work done</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-black p-4 md:px-6 md:py-10">
              {project.techStack?.map((tech: any, idx: number) => (
                <div key={idx} className="bg-[#2D2323] rounded-xl p-4 flex items-center gap-2">
                  <div className='relative w-8 h-8 rounded'>
                    {tech.icon ? (
                      <Image 
                        src={tech.icon} 
                        alt={tech.name} 
                        fill 
                        className="object-contain" 
                      />
                    ) : (
                      <span>{tech.name.substring(0,2)}</span>
                    )}
                  </div>
                  <span className="text-xs font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Client Info Panel (Blue) */}
          <div className="bg-[#5974FF] rounded-2xl p-8 md:px-10 md:pt-10 md:pb-18 flex flex-col gap-8 text-white relative overflow-hidden shadow-xl">
            {/* Decorative watermark circle */}
            <div className="absolute bottom-2 right-1">
              <div className='relative w-35 md:w-50 h-35 md:h-50 bg-white p-2 rounded-full opacity-10'>
                <Image 
                  src='/bruantechlogo.png'
                  alt='BruanTech logo'
                  fill
                  className=''
                />
              </div>
            </div>

            <div className="relative z-10 flex flex-col gap-1">
              <h3 className="text-2xl font-bold">Client</h3>
              <p className="text-white/90 text-lg">{project.client}</p>
            </div>
            <div className="relative z-10 flex flex-col gap-1">
              <h3 className="text-2xl font-bold">Location</h3>
              <p className="text-white/90 text-lg">{project.location}</p>
            </div>
            <div className="relative z-10 flex flex-col gap-1">
              <h3 className="text-2xl font-bold">Deliverables</h3>
              <p className="text-white/90 text-lg leading-relaxed">
                {project.deliverables?.join(', ')}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}