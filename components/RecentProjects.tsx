"use client";

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { caseStudiesData } from '@/constants';
import { ArrowRight } from 'lucide-react';

interface RecentProjectsProps {
  projects?: any[];
  videoSrc?: string;
  videoPoster?: string;
}

export default function RecentProjects({
  projects,
  videoSrc,
  videoPoster,
}: RecentProjectsProps) {
  const allProjects = projects && projects.length > 0 ? projects : caseStudiesData;
  const displayedProjects = allProjects.slice(0, 3);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [videoSrc]);

  return (
    <section id="projects" className="w-full bg-white py-14 md:py-20 overflow-hidden">
      <div className="max-w-[95%] md:max-w-[90%] mx-auto w-full flex flex-col gap-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-xs font-bold text-[#1D22B2] tracking-widest uppercase block mb-2">Our Work</span>
            <h2 className="text-3xl md:text-5xl font-bold font-mono text-black tracking-tight leading-tight">Recent Projects</h2>
          </div>
          <Link href="/case-studies" className="flex items-center gap-2 border border-black px-5 py-3 rounded-xl font-medium text-sm hover:bg-black hover:text-white transition-colors shrink-0">
            View All Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-8 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative rounded-3xl overflow-hidden bg-black min-h-[320px] md:min-h-[460px]"
          >
            {videoSrc ? (
              <video ref={videoRef} src={videoSrc} poster={videoPoster} muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
            ) : videoPoster ? (
              <Image src={videoPoster} alt="Project showreel" fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#0d0d0d] to-[#1a1a2e]">
                <svg className="w-16 h-16 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}>
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
                </svg>
                <p className="text-white/40 text-sm font-mono tracking-wider uppercase text-center px-6">Add your showreel via the videoSrc prop</p>
              </div>
            )}
            <div className="absolute bottom-0 inset-x-0 h-1/4 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 z-10">
              <span className="bg-white/10 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20">● Live Showreel</span>
            </div>
          </motion.div>

          <div className="lg:col-span-3 flex flex-col gap-4">
            {displayedProjects.map((project: any, index: number) => {
              const imgSrc = typeof project.image === 'string' ? project.image || '/images/default.jpg' : project.image?.src || '/images/default.jpg';
              return (
                <motion.div key={project.id || project.slug || index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
                  <Link href={"/case-studies/" + project.slug} className="flex items-center gap-4 border border-gray-200 rounded-2xl p-4 group hover:border-black hover:shadow-md transition-all duration-300 bg-white">
                    <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                      <Image src={imgSrc} alt={project.title || 'Project'} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0 flex-1">
                      <span className="text-[10px] font-bold text-[#5EB3C3] uppercase tracking-widest">{project.category || (Array.isArray(project.categories) ? project.categories[0] : '')}</span>
                      <h3 className="font-bold font-mono text-black text-sm md:text-base leading-tight line-clamp-1 group-hover:text-[#5EB3C3] transition-colors">{project.title}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{project.tagline || project.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all duration-200 shrink-0" />
                  </Link>
                </motion.div>
              );
            })}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.35, duration: 0.55 }}>
              <Link href="/case-studies" className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-2xl p-4 text-sm font-medium text-gray-500 hover:border-black hover:text-black hover:bg-gray-50 transition-all duration-300 group">
                <span>See all case studies</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
