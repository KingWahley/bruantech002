import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'published' | 'draft' | 'archived' | 'unread' | 'read' | 'featured' | 'info' | 'scheduled';
  className?: string;
}

export default function Badge({ children, variant = 'info', className }: BadgeProps) {
  const getStyles = () => {
    switch (variant) {
      case 'published':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'draft':
        return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
      case 'scheduled':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'archived':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'unread':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'read':
        return 'bg-zinc-800 text-zinc-400 border-zinc-700';
      case 'featured':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'info':
      default:
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize tracking-wide',
        getStyles(),
        className
      )}
    >
      {children}
    </span>
  );
}
