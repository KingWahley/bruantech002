"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
  title?: string;
}

export default function GalleryModal({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  title = 'Project Gallery',
}: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  const handleNext = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || !images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-xl"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 md:px-8 py-4 z-10 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/20">
              <Maximize2 className="w-4 h-4 text-teal-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold font-mono text-white tracking-wide">{title}</h2>
              <span className="text-xs text-zinc-400">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all hover:scale-105"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Image Area */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden px-16 md:px-24 py-4">
          {/* Prev Button */}
          {images.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-3 md:left-6 z-20 p-3 rounded-full bg-zinc-900/90 border border-zinc-800 text-white hover:bg-teal-500 hover:border-teal-400 hover:text-black transition-all duration-200 shadow-xl hover:scale-110"
              title="Previous (← Arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Image */}
          <div className="relative w-full h-full max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.2 }}
                className="relative w-full h-full"
              >
                <Image
                  src={currentImage}
                  alt={`${title} — ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Button */}
          {images.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-3 md:right-6 z-20 p-3 rounded-full bg-zinc-900/90 border border-zinc-800 text-white hover:bg-teal-500 hover:border-teal-400 hover:text-black transition-all duration-200 shadow-xl hover:scale-110"
              title="Next (→ Arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="border-t border-white/10 px-4 md:px-8 py-4">
            <div className="flex items-center justify-center gap-2 overflow-x-auto max-w-4xl mx-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    idx === currentIndex
                      ? 'w-20 h-14 md:w-24 md:h-16 border-teal-400 scale-105 shadow-lg shadow-teal-500/20 opacity-100'
                      : 'w-16 h-11 md:w-20 md:h-14 border-zinc-800 opacity-50 hover:opacity-80 hover:border-zinc-600'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
            <p className="text-center text-xs text-zinc-600 mt-3 font-mono">
              ← → keys to navigate • Esc to close
            </p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
