'use client';

import React from 'react';
import Link from 'next/link';
import { Bell, User, Home } from 'lucide-react';

interface NavbarProps {
  userEmail?: string;
  userFullName?: string;
  userAvatar?: string;
}

export default function DashboardNavbar({
  userEmail = 'admin@bruantech.com',
  userFullName = 'Admin User',
  userAvatar = '',
}: NavbarProps) {
  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between gap-4">
      {/* Breadcrumbs / Title */}
      <nav className="flex items-center gap-2 text-xs font-medium text-zinc-400 overflow-x-auto">
        <Link href="/dashboard" className="flex items-center gap-1.5 hover:text-zinc-200 transition-colors">
          <Home className="w-3.5 h-3.5 text-teal-400" />
          <span>Dashboard</span>
        </Link>
      </nav>

      {/* Right Controls: Notifications & User Badge */}
      <div className="flex items-center gap-4">
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
