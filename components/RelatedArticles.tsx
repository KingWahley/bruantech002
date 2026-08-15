"use client";

import Image from 'next/image';
import Link from 'next/link';
import { bruantechBlogs } from '@/constants';

export default function RelatedArticles({ currentSlug }: { currentSlug: string }) {
  // Grab 3 posts that are NOT the one currently being read
  const relatedPosts = bruantechBlogs.filter(p => p.slug !== currentSlug).slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="w-full bg-[#F9FAFB] py-10 md:py-20">
      <div className="max-w-[90%] mx-auto w-full flex flex-col">
        
        <div className="flex flex-col gap-2 mb-10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF]">
            MORE FROM OUR BLOG
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#111827] tracking-tight">
            Related Articles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {relatedPosts.map((blog, index) => (
            <Link
              key={index}
              href={`/blog/${blog.slug}`}
              className="flex flex-col bg-white border border-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="relative w-full aspect-16/11 bg-gray-50 overflow-hidden">
                <Image 
                  src={blog.image || '/images/default.jpg'}
                  alt={blog.title || 'Related Article'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-[#1F2937B2] backdrop-blur-sm text-white text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded">
                  {blog.category}
                </div>
              </div>
              
              <div className="p-8 flex flex-col grow">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-4 line-clamp-3 group-hover:text-[#5EB3C3] transition-colors leading-snug">
                  {blog.title}
                </h3>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-8 line-clamp-3">
                  {blog.excerpt}
                </p>
                <span className="mt-auto text-xs font-bold uppercase tracking-widest text-[#111827] group-hover:text-[#5EB3C3] transition-colors">
                  READ MORE »
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}