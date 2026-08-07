'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function ProjectGallery({ images }: { images: string[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const IMAGES_PER_PAGE = 3;

  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);

  const currentImages = images.slice(
    (currentPage - 1) * IMAGES_PER_PAGE,
    currentPage * IMAGES_PER_PAGE
  );

  if (!images || images.length === 0) return null;

  return (
    <section className="w-full bg-white pb-20">
      <div className="max-w-[95%] md:max-w-[90%] mx-auto w-full flex flex-col gap-4">
        
        {/* Full width top image */}
        {currentImages[0] && (
          <div className="relative w-full aspect-21/9 rounded-xl overflow-hidden shadow-lg">
            <Image 
              src={currentImages[0]} 
              alt="Gallery image 1"
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Two column bottom images */}
        {currentImages.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentImages.slice(1).map((img, idx) => (
              <div key={idx} className="relative w-full aspect-4/3 rounded-xl overflow-hidden shadow-lg">
                <Image 
                  src={img} 
                  alt={`Gallery image ${idx + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Mini Pagination arrows */}
        <div className="flex items-center justify-between w-full max-w-[80%] mx-auto mt-16 text-gray-500 font-bold">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-6">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`transition-colors ${
                  currentPage === i + 1
                    ? "text-black"
                    : "hover:text-black"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}