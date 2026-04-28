'use client';
import React, { useRef } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import type { SortOption } from './ContentBrowserClient';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  resultCount: number;
  sortBy: SortOption;
  onSortChange: (s: SortOption) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'views', label: 'Most Viewed' },
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'title', label: 'Alphabetical' },
];

export default function SearchBar({ value, onChange, resultCount, sortBy, onSortChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex gap-3 items-center">
      <div className="flex-1 relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
          <span className="font-mono text-xs text-[#00802a]">$</span>
          <Search size={14} className="text-[#00802a]" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="search exploits, tags, categories..."
          className="w-full bg-[#0f0f0f] border border-[#003d15] rounded font-mono text-sm text-[#00ff41] placeholder-[#1a4d2e] pl-14 pr-10 py-2.5 focus:outline-none focus:border-[#00ff41] focus:shadow-terminal transition-all duration-200"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00802a] hover:text-[#ff6b35] transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <SlidersHorizontal size={14} className="text-[#00802a]" />
        <select
          value={sortBy}
          onChange={e => onSortChange(e.target.value as SortOption)}
          className="bg-[#0f0f0f] border border-[#003d15] rounded font-mono text-xs text-[#00ff41] px-2 py-2.5 focus:outline-none focus:border-[#00ff41] transition-all duration-200 cursor-pointer"
        >
          {SORT_OPTIONS.map(opt => (
            <option key={`sort-${opt.value}`} value={opt.value} className="bg-[#0f0f0f]">
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}