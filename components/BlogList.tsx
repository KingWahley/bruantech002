"use client";

import Image from 'next/image';
import Link from 'next/link';
import { bruantechBlogs } from '@/constants';
import { getBlogPosts } from '@/lib/actions/blog';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function BlogList() {
  const [blogs, setBlogs] = useState<any[]>(bruantechBlogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);

  const POSTS_PER_PAGE = 6;

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getBlogPosts({ status: 'published' });
        if (data && data.length > 0) {
          setBlogs(data);
        } else {
          setBlogs(bruantechBlogs);
        }
      } catch (err) {
        console.error('Failed to load blog posts:', err);
        setBlogs(bruantechBlogs);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const totalPages = Math.max(1, Math.ceil(blogs.length / POSTS_PER_PAGE));

  const currentBlogs = blogs.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const changePage = (newPage: number) => {
    const validPage = Math.max(1, Math.min(totalPages, newPage));
    setCurrentPage(validPage);
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="w-full bg-[#F8F9FA] pb-20">
      <div className="w-full flex flex-col items-center">
        
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

        {/* Scroll Target Anchor */}
        <div ref={gridRef} className="w-full scroll-mt-6" />

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mb-4 px-6 md:px-14 py-8 md:py-16">
          {loading ? (
            Array.from({ length: POSTS_PER_PAGE }).map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col bg-white border border-gray-100 rounded-lg overflow-hidden shadow-lg h-96 animate-pulse"
              >
                <div className="w-full aspect-16/11 bg-gray-200" />
                <div className="p-8 flex flex-col gap-4 grow">
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))
          ) : currentBlogs.length > 0 ? (
            currentBlogs.map((blog, index) => (
              <motion.div 
                key={blog.id || blog.slug || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/blog/${blog.slug}`}
                  className="flex flex-col h-full bg-white border border-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  {/* Image & Badge */}
                  <div className="relative w-full aspect-16/11 bg-gray-50 overflow-hidden">
                    <Image 
                      src={blog.image || '/images/default.jpg'}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-[#1F2937B2] backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded">
                      {blog.category || 'ARTICLE'}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8 flex flex-col grow">
                    <h3 className="text-lg md:text-xl font-bold text-[#1A1A1A] mb-4 line-clamp-3 group-hover:text-[#5EB3C3] transition-colors leading-snug">
                      {blog.title}
                    </h3>
                    <p className="text-[#6B7280] text-sm leading-relaxed mb-8 line-clamp-3">
                      {blog.excerpt}
                    </p>
                    <span className="mt-auto text-xs font-bold uppercase tracking-widest text-[#111111] group-hover:text-[#5EB3C3] transition-colors">
                      READ MORE »
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-gray-500">
              No blog posts found.
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center gap-4 text-[#4B5563] font-medium mb-8">
            <div className="flex items-center gap-2">
              <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-semibold"
              >
                « Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => changePage(i + 1)}
                  className={`w-10 h-10 flex items-center justify-center transition-colors font-bold text-sm ${
                    currentPage === i + 1
                      ? "border border-gray-300 rounded-lg text-black bg-white shadow-md"
                      : "hover:bg-gray-200 rounded-lg text-gray-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-semibold"
              >
                Next »
              </button>
            </div>

            <span className="text-xs text-gray-500">
              Page {currentPage} of {totalPages} 
            </span>
          </div>
        )}

      </div>
    </section>
  );
}