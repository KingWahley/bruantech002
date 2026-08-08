"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Images } from 'lucide-react';
import GalleryModal from '@/components/GalleryModal';

export default function ProjectDetails({ project }: { project: any }) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const galleryImages: string[] = Array.isArray(project.gallery)
    ? project.gallery.filter((img: any) => typeof img === 'string' && img.length > 0)
    : [];

  const allImages = project.image
    ? [project.image, ...galleryImages]
    : galleryImages;

  const openGallery = (index: number = 0) => {
    if (allImages.length === 0) return;
    setGalleryIndex(index);
    setGalleryOpen(true);
  };

  const processParagraphs: string[] = Array.isArray(project.process)
    ? project.process.filter((p: any) => typeof p === 'string' && p.trim().length > 0)
    : [];

  const techStack: any[] = project.techStack || project.tech_stack || [];

  return (
    <>
      <GalleryModal
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        images={allImages}
        initialIndex={galleryIndex}
        title={project.title ? `${project.title} — Gallery` : 'Project Gallery'}
      />

      <section className="w-full bg-white pt-8 md:pt-14 pb-10">
        <div className="max-w-[95%] md:max-w-[90%] mx-auto w-full flex flex-col gap-8">

          {/* Title & Gallery Button */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium font-mono text-black tracking-tight">
              {project.title}
            </h1>
            {allImages.length > 0 && (
              <button
                onClick={() => openGallery(0)}
                className="flex items-center gap-2 bg-black text-white px-6 py-4 rounded-xl font-bold text-base md:text-lg hover:bg-gray-800 transition-colors shrink-0"
              >
                <Images className="w-5 h-5" />
                Project Gallery
                {allImages.length > 1 && (
                  <span className="ml-1 text-xs bg-white/20 rounded-full px-2 py-0.5">
                    {allImages.length}
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Hero Image — clickable */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full h-70 md:h-140 rounded-3xl overflow-hidden shadow-lg bg-gray-100 cursor-pointer group"
            onClick={() => openGallery(0)}
          >
            {project.image ? (
              <>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  priority
                />
                {allImages.length > 1 && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                      <Images className="w-4 h-4" />
                      View all {allImages.length} images
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Image Not Found
              </div>
            )}
          </motion.div>

          {/* Description */}
          {project.description && (
            <div className="w-full">
              <p className="text-[#0D0D0D] text-base md:text-xl leading-relaxed font-light">
                {project.description}
              </p>
            </div>
          )}

          {/* Process Text */}
          {processParagraphs.length > 0 && (
            <div className="flex flex-col gap-4 max-w-7xl mt-2">
              <h3 className="text-xl font-bold text-[#0D0D0D]">The Process</h3>
              {processParagraphs.map((para: string, idx: number) => (
                <p key={idx} className="text-[#0D0D0D] text-base md:text-xl leading-relaxed font-light">
                  {para}
                </p>
              ))}
            </div>
          )}

          {/* Gallery Thumbnails Grid */}
          {galleryImages.length > 0 && (
            <div className="flex flex-col gap-4 mt-2">
              <h3 className="text-xl font-bold text-[#0D0D0D]">Project Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {galleryImages.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => openGallery(idx + (project.image ? 1 : 0))}
                    className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 hover:ring-2 hover:ring-black transition-all duration-200 group"
                  >
                    <Image
                      src={img}
                      alt={`${project.title} gallery ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Split Info Panels */}
          <div className={`grid grid-cols-1 gap-8 mt-2 md:mt-6 ${techStack.length > 0 ? 'lg:grid-cols-[1.5fr_1fr]' : ''}`}>

            {/* Left: Tech Stack Panel — hidden when empty */}
            {techStack.length > 0 && (
              <div className="bg-[#2D2323] rounded-2xl flex flex-col gap-2 overflow-hidden text-white">
                <div className="flex flex-col gap-2 p-6 md:p-10">
                  <h3 className="text-2xl font-bold">Technology Used</h3>
                  <p className="text-white text-sm md:text-base w-full md:w-[65%]">
                    A Combination of Professional, Industry standard tools to get the work done
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-black p-4 md:px-6 md:py-10">
                  {techStack.map((tech: any, idx: number) => (
                    <div key={idx} className="bg-[#2D2323] rounded-xl p-4 flex items-center gap-2">
                      <div className="relative w-8 h-8 rounded shrink-0">
                        {tech.icon ? (
                          <Image
                            src={tech.icon}
                            alt={tech.name}
                            fill
                            className="object-contain"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                            {(tech.name || '').substring(0, 2)}
                          </div>
                        )}
                      </div>
                      <span className="text-xs font-medium">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Right: Client Info Panel */}
            <div className="bg-[#5974FF] rounded-2xl p-8 md:px-10 md:pt-10 md:pb-18 flex flex-col gap-8 text-white relative overflow-hidden shadow-xl">
              {/* Decorative watermark */}
              <div className="absolute bottom-2 right-1">
                <div className="relative w-35 md:w-50 h-35 md:h-50 bg-white p-2 rounded-full opacity-10">
                  <Image
                    src="/bruantechlogo.png"
                    alt="BruanTech logo"
                    fill
                    className=""
                  />
                </div>
              </div>
              <div className="relative z-10 flex flex-col gap-1">
                <h3 className="text-2xl font-bold">Client</h3>
                <p className="text-white/90 text-lg">{project.client || '—'}</p>
              </div>
              <div className="relative z-10 flex flex-col gap-1">
                <h3 className="text-2xl font-bold">Location</h3>
                <p className="text-white/90 text-lg">{project.location || '—'}</p>
              </div>
              <div className="relative z-10 flex flex-col gap-1">
                <h3 className="text-2xl font-bold">Deliverables</h3>
                <p className="text-white/90 text-lg leading-relaxed">
                  {Array.isArray(project.deliverables) ? project.deliverables.join(', ') : project.deliverables || '—'}
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}