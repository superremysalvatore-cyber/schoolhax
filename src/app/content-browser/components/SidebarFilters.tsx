'use client';
import React from 'react';
import { Filter, X } from 'lucide-react';
import type { CategorySlug, Category } from '@/lib/data';
import type { DifficultyFilter } from './ContentBrowserClient';

const DIFFICULTIES: { value: DifficultyFilter; label: string; color: string }[] = [
  { value: 'all', label: 'All', color: '#00802a' },
  { value: 'easy', label: 'Easy', color: '#00ff41' },
  { value: 'medium', label: 'Medium', color: '#f59e0b' },
  { value: 'hard', label: 'Hard', color: '#ff6b35' },
  { value: 'elite', label: 'Elite', color: '#a855f7' },
];

interface SidebarFiltersProps {
  difficultyFilter: DifficultyFilter;
  onDifficultyChange: (d: DifficultyFilter) => void;
  activeTags: string[];
  onTagToggle: (t: string) => void;
  allTags: string[];
  categories: Category[];
  activeCategory: CategorySlug | 'all';
  onCategoryChange: (c: CategorySlug | 'all') => void;
  onClearAll: () => void;
  hasActiveFilters: boolean;
}

export default function SidebarFilters({
  difficultyFilter,
  onDifficultyChange,
  activeTags,
  onTagToggle,
  allTags,
  categories,
  activeCategory,
  onCategoryChange,
  onClearAll,
  hasActiveFilters,
}: SidebarFiltersProps) {
  return (
    <div className="space-y-4 sticky top-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Filter size={13} className="text-[#00802a]" />
          <span className="font-mono text-xs font-bold text-[#00802a] uppercase tracking-wider">Filters</span>
        </div>
        {hasActiveFilters && (
          <button onClick={onClearAll} className="font-mono text-[10px] text-[#ff6b35] hover:text-white transition-colors flex items-center gap-1">
            <X size={10} /> clear
          </button>
        )}
      </div>

      {/* Difficulty */}
      <div className="border border-[#003d15] rounded bg-[#0f0f0f] p-3">
        <span className="font-mono text-[10px] text-[#00802a] uppercase tracking-wider font-bold mb-2 block">Difficulty</span>
        <div className="space-y-1">
          {DIFFICULTIES.map(d => (
            <button
              key={`diff-${d.value}`}
              onClick={() => onDifficultyChange(d.value)}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded transition-all duration-150 font-mono text-xs
                ${difficultyFilter === d.value
                  ? 'bg-[#001a08] border border-[#003d15]'
                  : 'hover:bg-[#0a0a0a] border border-transparent'
                }`}
            >
              <span style={{ color: difficultyFilter === d.value ? d.color : '#00802a' }}>{d.label}</span>
              {difficultyFilter === d.value && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d.color }} />}
            </button>
          ))}
        </div>
      </div>

      {/* Category quick-select */}
      <div className="border border-[#003d15] rounded bg-[#0f0f0f] p-3">
        <span className="font-mono text-[10px] text-[#00802a] uppercase tracking-wider font-bold mb-2 block">Category</span>
        <div className="space-y-1">
          <button
            onClick={() => onCategoryChange('all')}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded transition-all duration-150 font-mono text-xs
              ${activeCategory === 'all' ? 'bg-[#001a08] border border-[#003d15] text-[#00ff41]' : 'text-[#00802a] hover:bg-[#0a0a0a] border border-transparent'}`}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.slug)}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded transition-all duration-150 font-mono text-xs
                ${activeCategory === cat.slug ? 'bg-[#001a08] border border-[#003d15]' : 'hover:bg-[#0a0a0a] border border-transparent'}`}
            >
              <span style={{ color: activeCategory === cat.slug ? cat.color : '#00802a' }}>{cat.label}</span>
              <span className="font-mono text-[10px] text-[#1a4d2e] text-tabular">{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="border border-[#003d15] rounded bg-[#0f0f0f] p-3">
        <span className="font-mono text-[10px] text-[#00802a] uppercase tracking-wider font-bold mb-2 block">Tags</span>
        <div className="flex flex-wrap gap-1">
          {allTags.slice(0, 30).map(tag => (
            <button
              key={`stag-${tag}`}
              onClick={() => onTagToggle(tag)}
              className={`font-mono text-[10px] px-1.5 py-0.5 rounded border transition-all duration-150
                ${activeTags.includes(tag)
                  ? 'bg-[#001a08] border-[#00ff41] text-[#00ff41]'
                  : 'border-[#003d15] text-[#1a4d2e] hover:border-[#00802a] hover:text-[#00802a] bg-[#0a0a0a]'
                }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}