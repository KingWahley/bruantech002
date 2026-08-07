import React from 'react';
import Sidebar from '@/components/dashboard/sidebar/Sidebar';
import Navbar from '@/components/dashboard/navbar/Navbar';
import ToastProvider from '@/components/dashboard/ui/ToastProvider';
import { getMessages } from '@/lib/actions/messages';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin Dashboard | Bruantech',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  let unreadCount = 0;
  let userEmail = 'admin@bruantech.com';

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.email) {
      userEmail = user.email;
    }

    const messages = await getMessages({ status: 'unread' });
    unreadCount = messages.length;
  } catch (err) {
    console.error('Error loading dashboard layout data:', err);
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex">
      <ToastProvider />
      
      {/* Sidebar */}
      <Sidebar unreadMessagesCount={unreadCount} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pl-20 lg:pl-64 transition-all duration-300">
        <Navbar userEmail={userEmail} userFullName="Admin" />
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
