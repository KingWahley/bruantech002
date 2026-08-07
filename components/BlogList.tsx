"use client";

import Image from 'next/image';
import Link from 'next/link';
import { bruantechBlogs } from '@/constants';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function BlogList() {
  const [currentPage, setCurrentPage] = useState(1);

  const POSTS_PER_PAGE = 6;
  const totalPages = Math.ceil(bruantechBlogs.length / POSTS_PER_PAGE);

  const currentBlogs = bruantechBlogs.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <section className="w-full bg-[#F8F9FA] pb-20">
      <div className=" w-full flex flex-col items-center">
        
        {/* Header */}
        <div className="bg-white pt-10 flex flex-col items-center text-center pb-6 md:pb-12 w-full">
          <span className="px-4 py-1.5 bg-[#F3F4F6] text-[#6B7280] text-[9px] md:text-xs font-bold uppercase tracking-widest mb-2 md:mb-6">
            BLOG
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-mono text-[#1A1A1A] tracking-tight mb-4">
            The Bruantech Blog
          </h1>
          <p className="text-[#6B7280] text-lg md:text-xl">
            Our official blog with news, engineering articles, and business cases.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mb-4 px-6 md:px-14 py-8 md:py-16">
          {currentBlogs.map((blog, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col bg-white border border-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              {/* Image & Badge */}
              <div className="relative w-full aspect-16/11 bg-gray-50 overflow-hidden">
                <Image 
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-[#1F2937B2] backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded">
                  {blog.category}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-8 flex flex-col grow">
                <Link href={`/blog/${blog.slug}`}>
                  <h3 className="text-lg md:text-xl font-bold text-[#1A1A1A] mb-4 line-clamp-3 group-hover:text-[#5EB3C3] transition-colors leading-snug">
                    {blog.title}
                  </h3>
                </Link>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-8 line-clamp-3">
                  {blog.excerpt}
                </p>
                <Link 
                  href={`/blog/${blog.slug}`} 
                  className="mt-auto text-xs font-bold uppercase tracking-widest text-[#111111] hover:text-[#5EB3C3] transition-colors"
                >
                  READ MORE »
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center gap-4 text-[#4B5563] font-medium">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="hover:text-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            « Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 flex items-center justify-center transition-colors ${
                currentPage === i + 1
                  ? "border border-gray-200 rounded text-black bg-white shadow-sm"
                  : "hover:text-black"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(totalPages, p + 1))
            }
            disabled={currentPage === totalPages}
            className="hover:text-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next »
          </button>
        </div>

      </div>
    </section>
  );
}