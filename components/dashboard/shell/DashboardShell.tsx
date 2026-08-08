'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/sidebar/Sidebar';
import Navbar from '@/components/dashboard/navbar/Navbar';
import ToastProvider from '@/components/dashboard/ui/ToastProvider';

interface DashboardShellProps {
  userEmail: string;
  unreadCount: number;
  children: React.ReactNode;
}

export default function DashboardShell({ userEmail, unreadCount, children }: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex">
      <ToastProvider />
      
      {/* Sidebar */}
      <Sidebar
        unreadMessagesCount={unreadCount}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />

      {/* Main Content Area - dynamically expands when sidebar is collapsed */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          collapsed ? 'pl-20' : 'pl-20 lg:pl-64'
        }`}
      >
        <Navbar userEmail={userEmail} userFullName="Admin" />
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
