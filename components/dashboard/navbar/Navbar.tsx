'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Bell, User, ChevronRight, Home } from 'lucide-react';

interface NavbarProps {
  userEmail?: string;
  userFullName?: string;
  userAvatar?: string;
}

export default function Navbar({
  userEmail = 'admin@bruantech.com',
  userFullName = 'Admin User',
  userAvatar = '',
}: NavbarProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');

  // Generate breadcrumb items
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    return { href, label };
  });

  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between gap-4">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-medium text-zinc-400 overflow-x-auto">
        <Link href="/dashboard" className="flex items-center gap-1 hover:text-zinc-200 transition-colors">
          <Home className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </Link>

        {breadcrumbs.slice(1).map((crumb, idx) => (
          <React.Fragment key={crumb.href}>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
            <Link
              href={crumb.href}
              className={`hover:text-zinc-200 transition-colors ${
                idx === breadcrumbs.length - 2 ? 'text-zinc-100 font-semibold' : ''
              }`}
            >
              {crumb.label}
            </Link>
          </React.Fragment>
        ))}
      </nav>

      {/* Right Controls: Search, Notifications, User Badge */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block w-64">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Quick search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-teal-500 transition-colors"
          />
        </div>

        {/* Notifications Icon */}
        <button
          className="relative p-2 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
        </button>

        {/* User Badge */}
        <div className="flex items-center gap-3 pl-2 border-l border-zinc-800">
          <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold text-xs">
            {userAvatar ? (
              <img src={userAvatar} alt={userFullName} className="w-full h-full rounded-full object-cover" />
            ) : (
              <User className="w-4 h-4" />
            )}
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-semibold text-zinc-200 leading-none">{userFullName}</span>
            <span className="text-[10px] text-zinc-400 leading-tight mt-0.5">{userEmail}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
