"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { caseStudiesData } from '@/constants';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface CaseStudiesGridProps {
  projects?: any[];
}

export default function CaseStudiesGrid({ projects }: CaseStudiesGridProps) {
  const allProjects = projects && projects.length > 0 ? projects : caseStudiesData;
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 6;

  // Build category list from actual project data — reads the categories array,
  // falls back to category string for rows saved before multi-category support.
  const categories = [
    'All',
    ...Array.from(
      new Set(
        allProjects.flatMap((p: any) =>
          Array.isArray(p.categories) && p.categories.length > 0
            ? p.categories
            : p.category ? [p.category] : []
        )
      )
    ).sort() as string[],
  ];

  const filteredProjects =
    activeCategory === 'All'
    ? allProjects
    : allProjects.filter((project: any) => {
        const cats: string[] =
          Array.isArray(project.categories) && project.categories.length > 0
            ? project.categories
            : project.category ? [project.category] : [];
        return cats.includes(activeCategory);
      });

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE) || 1;

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="w-full bg-white py-10 md:py-10">
      <div className="max-w-[95%] mx-auto w-full flex flex-col gap-6 md:gap-10">
        
        {/* Filters */}
        <div className="flex flex-col gap-4">
          {/* Main Category Tabs */}
          <div className="overflow-x-auto md:overflow-x-visible no-scrollbar">
            <div className="inline-flex border border-black rounded-lg overflow-hidden whitespace-nowrap">
              {categories.map((cat, idx) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`shrink-0 px-6 py-3 font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-gray-100"
                  } ${idx !== 0 ? "border-l border-black" : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          {/* Active Filter Chips — only visible when a filter is applied */}
          {activeCategory !== 'All' && (
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-1.5 bg-white">
              {activeCategory}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => {
                  setActiveCategory("All");
                  setCurrentPage(1);
                }}
              />
            </span>
            <span 
              onClick={() => {
                setActiveCategory("All");
                setCurrentPage(1);
              }} 
              className="flex items-center gap-2 cursor-pointer hover:text-black"
            >
              <X className="w-4 h-4 bg-black text-white rounded-full p-0.5" />
              Remove filters
            </span>
          </div>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedProjects.map((project, index) => {
            const imgSrc = typeof project.image === 'string'
              ? project.image || '/images/default.jpg'
              : project.image?.src || '/images/default.jpg';

            const maxChar = 120;
            const cardText = project.tagline || project.description || '';
            const truncatedDescription = cardText.length > maxChar
              ? `${cardText.slice(0, maxChar).trim()}...`
              : cardText;

            return (
              <motion.div
                key={project.id || project.slug || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <Link 
                  href={`/case-studies/${project.slug}`}
                  className="flex flex-col justify-between border-3 border-black rounded-3xl overflow-hidden h-full group hover:shadow-xl transition-all duration-300"
                >
                  {/* Text Content */}
                  <div className="p-6 flex flex-col gap-2 grow bg-white min-h-[130px]">
                    <h3 className="text-xl md:text-2xl font-extrabold font-mono text-black group-hover:text-[#5EB3C3] transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-black text-sm md:text-base leading-relaxed line-clamp-3">
                      {truncatedDescription}
                    </p>
                  </div>
                  {/* Bottom Image */}
                  <div className="relative w-full h-52 bg-gray-100 shrink-0">
                    <Image 
                      src={imgSrc}
                      alt={project.title || 'Case Study'}
                      fill
                      className="object-cover group-hover:scale-102 duration-300"
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="inline-flex items-center border-2 border-black rounded-lg overflow-hidden">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-6 py-3 bg-black text-white disabled:opacity-40"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-5 py-3 border-l border-black ${
                    currentPage === i + 1
                      ? "bg-[#5EB3C3] text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-6 py-3 bg-black text-white disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}