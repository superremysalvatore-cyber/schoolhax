'use client';
import React from 'react';
import { Bookmark, Globe, Code2, Gamepad2, Shield, Zap, LayoutGrid } from 'lucide-react';
import type { Category, CategorySlug } from '@/lib/data';

const ICONS: Record<string, React.ReactNode> = {
  Bookmark: <Bookmark size={14} />,
  Globe: <Globe size={14} />,
  Code2: <Code2 size={14} />,
  Gamepad2: <Gamepad2 size={14} />,
  Shield: <Shield size={14} />,
  Zap: <Zap size={14} />,
};

interface CategoryTabsProps {
  active: CategorySlug | 'all';
  onChange: (slug: CategorySlug | 'all') => void;
  categories: Category[];
}

export default function CategoryTabs({ active, onChange, categories }: CategoryTabsProps) {
  return (
    <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
      <button
        onClick={() => onChange('all')}
        className={`flex items-center gap-1.5 px-3 py-2 rounded font-mono text-xs font-medium whitespace-nowrap transition-all duration-150 flex-shrink-0 border
          ${active === 'all' ?'bg-[#001a08] border-[#00ff41] text-[#00ff41] shadow-terminal' :'border-[#003d15] text-[#00802a] hover:border-[#00ff41] hover:text-[#00ff41] bg-[#0f0f0f]'
          }`}
      >
        <LayoutGrid size={14} />
        <span>All</span>
        <span className={`text-[10px] px-1 py-0.5 rounded font-bold ${active === 'all' ? 'bg-[#003d15] text-[#00ff41]' : 'bg-[#0a0a0a] text-[#00802a]'}`}>
          {categories.reduce((s, c) => s + c.count, 0)}
        </span>
      </button>

      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.slug)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded font-mono text-xs font-medium whitespace-nowrap transition-all duration-150 flex-shrink-0 border
            ${active === cat.slug
              ? 'bg-[#001a08] border-[#00ff41] text-[#00ff41] shadow-terminal'
              : 'border-[#003d15] text-[#00802a] hover:border-[#00ff41] hover:text-[#00ff41] bg-[#0f0f0f]'
            }`}
          style={active === cat.slug ? {} : {}}
        >
          <span style={{ color: active === cat.slug ? '#00ff41' : cat.color }}>
            {ICONS[cat.icon]}
          </span>
          <span>{cat.label}</span>
          <span className={`text-[10px] px-1 py-0.5 rounded font-bold ${active === cat.slug ? 'bg-[#003d15] text-[#00ff41]' : 'bg-[#0a0a0a] text-[#00802a]'}`}>
            {cat.count}
          </span>
        </button>
      ))}
    </div>
  );
}