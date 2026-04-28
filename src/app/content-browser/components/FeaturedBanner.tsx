'use client';
import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import type { Exploit } from '@/lib/data';
import { DIFFICULTY_CONFIG, CATEGORY_COLORS } from './ExploitCard';

interface FeaturedBannerProps {
  exploits: Exploit[];
}

export default function FeaturedBanner({ exploits }: FeaturedBannerProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (exploits.length === 0) return null;

  const current = exploits[activeIdx];

  return (
    <div className="border border-[#003d15] rounded bg-[#0f0f0f] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#003d15] bg-[#0a0a0a]">
        <div className="flex items-center gap-2">
          <Star size={12} className="text-[#ff6b35] fill-[#ff6b35]" />
          <span className="font-mono text-xs font-bold text-[#ff6b35]">FEATURED EXPLOITS</span>
        </div>
        <div className="flex items-center gap-1">
          {exploits.map((_, i) => (
            <button
              key={`dot-${i}`}
              onClick={() => setActiveIdx(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-150 ${i === activeIdx ? 'bg-[#00ff41]' : 'bg-[#003d15] hover:bg-[#00802a]'}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border"
              style={{ color: CATEGORY_COLORS[current.category], borderColor: CATEGORY_COLORS[current.category] + '40', backgroundColor: CATEGORY_COLORS[current.category] + '15' }}
            >
              {current.category.replace('-', ' ').toUpperCase()}
            </span>
            <span className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${DIFFICULTY_CONFIG[current.difficulty].cls}`}>
              {current.difficulty.toUpperCase()}
            </span>
          </div>
          <h2 className="font-mono text-base font-bold text-[#00ff41] mb-1">{current.title}</h2>
          <p className="font-mono text-xs text-[#00802a] line-clamp-2 mb-3">{current.description}</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-mono text-xs text-[#1a4d2e]">
              <Eye size={11} />
              <span className="text-tabular">{current.views.toLocaleString()}</span>
            </span>
            <div className="flex flex-wrap gap-1">
              {current.tags.slice(0, 3).map(tag => (
                <span key={`ftag-${current.id}-${tag}`} className="font-mono text-[10px] text-[#1a4d2e] bg-[#0a0a0a] border border-[#003d15] px-1.5 py-0.5 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Nav arrows */}
        <div className="flex gap-1 flex-shrink-0">
          <button
            onClick={() => setActiveIdx(i => (i - 1 + exploits.length) % exploits.length)}
            className="p-1.5 border border-[#003d15] rounded text-[#00802a] hover:text-[#00ff41] hover:border-[#00ff41] transition-all duration-150"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => setActiveIdx(i => (i + 1) % exploits.length)}
            className="p-1.5 border border-[#003d15] rounded text-[#00802a] hover:text-[#00ff41] hover:border-[#00ff41] transition-all duration-150"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}