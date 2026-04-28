import React from 'react';
import { EXPLOITS, CATEGORIES } from '@/lib/data';

interface BrowserStatsProps {
  totalCount: number;
}

export default function BrowserStats({ totalCount }: BrowserStatsProps) {
  const featuredCount = EXPLOITS.filter(e => e.featured).length;
  const totalViews = EXPLOITS.reduce((sum, e) => sum + e.views, 0);
  const bookmarkletCount = EXPLOITS.filter(e => e.category === 'bookmarklets').length;

  return (
    <div className="mb-6">
      <div className="flex items-end gap-3 mb-1">
        <h1 className="font-mono text-2xl font-bold text-[#00ff41] glitch-text" data-text="SchoolHax">
          SchoolHax
        </h1>
        <span className="font-mono text-xs text-[#00802a] mb-1 pb-0.5">— the underground exploit hub</span>
      </div>
      <div className="flex flex-wrap gap-4 mt-3">
        {[
          { label: 'total exploits', value: totalCount, suffix: '' },
          { label: 'featured picks', value: featuredCount, suffix: '' },
          { label: 'total views', value: (totalViews / 1000).toFixed(0) + 'k', suffix: '' },
          { label: 'categories', value: CATEGORIES.length, suffix: '' },
        ].map((stat) => (
          <div key={`stat-${stat.label}`} className="flex items-baseline gap-1.5">
            <span className="font-mono text-xl font-bold text-[#00ff41] text-tabular">{stat.value}</span>
            <span className="font-mono text-xs text-[#00802a]">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}