"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { solutionsData } from "@/constants";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Company", href: "/company" },
    { name: "Solutions", href: "/solutions", hasDropdown: true },
    { name: "Case studies", href: "/case-studies" },
    { name: "Blog", href: "/blog" },
  ];

  // Helper to determine if a link is active
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Animation variants
  const menuVariants = {
    closed: { x: "100%", transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as any } },
    open: { x: "0%", transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any } },
  };

  const linkVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" as any } },
  };

  return (
    <>
      <header 
        className="sticky top-0 z-50  bg-white border-b border-gray-100"
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <div className="w-full px-6 md:px-12 py-5 flex items-center justify-between">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 z-50" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="relative w-8 h-8">
              <Image 
                src="/bruantechlogo.png"
                alt="Bruantech Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-base md:text-2xl font-bold tracking-wide text-primary">
              BRUANTECH
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center h-full">
            {navLinks.map((link) => (
              <div 
                key={link.name}
                className="px-4 py-2 h-full flex items-center"
                onMouseEnter={() => link.hasDropdown ? setActiveDropdown(link.name) : setActiveDropdown(null)}
              >
                <Link 
                  href={link.href}
                  className={`flex items-center gap-1 text-base font-medium transition-colors ${
                    isActive(link.href) || activeDropdown === link.name
                      ? "text-primary" 
                      : "text-[#242627] hover:text-primary"
                  }`}
                >
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown className={`w-4 h-4 mt-0.5 transition-transform duration-300 ${activeDropdown === link.name ? "rotate-180 text-[#5EB3C3]" : "text-gray-500"}`} />
                  )}
                </Link>
              </div>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block">
            <Link 
              href="/contact"
              className="bg-primary text-white px-7 py-3 rounded text-base font-medium hover:bg-[#4ea2b2] transition-colors duration-300"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 text-gray-700 z-50"
            aria-label="Open Menu"
          >
            <Menu className="w-7 h-7" />
          </button>

        </div>

        {/* Desktop Mega Menu Dropdown */}
        <AnimatePresence>
          {activeDropdown === "Solutions" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-40"
              onMouseEnter={() => setActiveDropdown("Solutions")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="max-w-[95%] md:max-w-[90%] mx-auto w-full py-12">
                <div className="grid grid-cols-4 gap-x-8 gap-y-12">
                  {/* Slicing to 8 to maintain a clean 4-column grid (2 rows) */}
                  {solutionsData.slice(0, 8).map((solution, index) => (
                    <Link 
                      key={solution.slug}
                      href={`/solutions/${solution.slug}`}
                      onClick={() => setActiveDropdown(null)}
                      className="group flex flex-col items-center text-center gap-4"
                    >
                      <div className={`relative w-full aspect-video rounded-2xl ${solution.bgColor} p-6 transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-lg`}>
                        {solution.image && (
                          <Image 
                            src={solution.image} 
                            alt={solution.title} 
                            fill 
                            className="object-contain p-4"
                          />
                        )}
                      </div>
                      <span className="font-bold text-[#111111] group-hover:text-[#5EB3C3] transition-colors">
                        {solution.title}
                      </span>
                    </Link>
                  ))}
                </div>
                
                {/* View All Bar */}
                <div className="w-full flex justify-center mt-12 pt-6 border-t border-gray-100">
                  <Link 
                    href="/solutions"
                    onClick={() => setActiveDropdown(null)}
                    className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-[#5EB3C3] transition-colors flex items-center gap-2"
                  >
                    View All Solutions <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu Portal */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 lg:hidden"
            />

            {/* Slide-in Drawer */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-[80vw] max-w-87.5 bg-white z-70 shadow-2xl flex flex-col lg:hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100">
                <span className="text-xl font-bold text-[#5EB3C3]">Menu</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex-1 overflow-y-auto py-8 px-6">
                <motion.div 
                  initial="closed"
                  animate="open"
                  variants={{
                    open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
                  }}
                  className="flex flex-col gap-6"
                >
                  {navLinks.map((link) => (
                    <motion.div key={link.name} variants={linkVariants}>
                      <Link 
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-between text-2xl font-medium tracking-tight transition-colors ${
                          isActive(link.href) ? "text-primary" : "text-[#242627]"
                        }`}
                      >
                        {link.name}
                        {/* The ChevronDown has been intentionally removed here for mobile */}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Drawer Footer CTA */}
              <div className="p-6 border-t border-gray-100">
                <Link 
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full bg-[#5EB3C3] text-white px-6 py-4 rounded text-lg font-medium hover:bg-[#4ea2b2] active:scale-95 transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}