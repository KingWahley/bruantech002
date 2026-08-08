import React from 'react';
import DashboardShell from '@/components/dashboard/shell/DashboardShell';
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
    <DashboardShell userEmail={userEmail} unreadCount={unreadCount}>
      {children}
    </DashboardShell>
  );
}
