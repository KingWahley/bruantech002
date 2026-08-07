import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon: LucideIcon;
  accentColor?: string;
  trend?: string;
}

export default function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  accentColor = 'teal',
  trend,
}: MetricCardProps) {
  const getColorClasses = () => {
    switch (accentColor) {
      case 'emerald':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'purple':
        return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      case 'rose':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'amber':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'teal':
      default:
        return 'text-teal-400 bg-teal-500/10 border-teal-500/20';
    }
  };

  return (
    <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between shadow-md hover:border-zinc-700 transition-all">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-400 tracking-wide uppercase">{title}</span>
        <div className={`p-2.5 rounded-xl border ${getColorClasses()}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="text-3xl font-bold text-zinc-100 font-mono tracking-tight">{value}</h3>
        {trend && <span className="text-xs font-medium text-teal-400">{trend}</span>}
      </div>
      {description && <p className="text-xs text-zinc-500 mt-1">{description}</p>}
    </div>
  );
}
