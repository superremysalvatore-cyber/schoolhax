'use client';
import React from 'react';
import { Bookmark, Globe, Code2, Gamepad2, Shield, Zap, BarChart2 } from 'lucide-react';
import type { Category, Exploit } from '@/lib/data';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const ICONS: Record<string, React.ReactNode> = {
  Bookmark: <Bookmark size={16} />,
  Globe: <Globe size={16} />,
  Code2: <Code2 size={16} />,
  Gamepad2: <Gamepad2 size={16} />,
  Shield: <Shield size={16} />,
  Zap: <Zap size={16} />,
};

interface CategoryPanelProps {
  categories: Category[];
  exploits: Exploit[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; name: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-[#141414] border border-[#003d15] rounded px-3 py-2 shadow-terminal">
      <div className="font-mono text-[10px] text-[#00802a] mb-1">{label}</div>
      <div className="font-mono text-sm font-bold text-[#00ff41]">{payload[0].value} exploits</div>
    </div>
  );
}

export default function CategoryPanel({ categories, exploits }: CategoryPanelProps) {
  const chartData = categories.map(cat => ({
    name: cat.label.replace(' ', '\n'),
    shortName: cat.label.split(' ')[0],
    count: exploits.filter(e => e.category === cat.slug && e.status !== 'archived').length,
    color: cat.color,
  }));

  const totalViews = (cat: Category) =>
    exploits.filter(e => e.category === cat.slug).reduce((s, e) => s + e.views, 0);

  return (
    <div className="space-y-6">
      {/* Chart */}
      <div className="border border-[#003d15] rounded bg-[#0f0f0f] p-5">
        <div className="flex items-center gap-2 mb-4">
          <BarChart2 size={14} className="text-[#00802a]" />
          <span className="font-mono text-xs font-bold text-[#00802a] uppercase tracking-wider">Exploits per Category</span>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="hsl(120, 100%, 8%)" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="shortName"
              tick={{ fontFamily: 'JetBrains Mono', fontSize: 10, fill: '#00802a' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontFamily: 'JetBrains Mono', fontSize: 10, fill: '#00802a' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 255, 65, 0.05)' }} />
            <Bar dataKey="count" radius={[3, 3, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {categories.map(cat => {
          const catExploits = exploits.filter(e => e.category === cat.slug);
          const published = catExploits.filter(e => e.status === 'published' || e.status === 'featured').length;
          const draft = catExploits.filter(e => e.status === 'draft').length;
          const views = totalViews(cat);

          return (
            <div
              key={cat.id}
              className="border border-[#003d15] rounded bg-[#0f0f0f] p-4 hover:border-[#00ff41] transition-all duration-200 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span style={{ color: cat.color }}>{ICONS[cat.icon]}</span>
                  <span className="font-mono text-sm font-bold text-[#00ff41]">{cat.label}</span>
                </div>
                <span
                  className="font-mono text-lg font-bold text-tabular"
                  style={{ color: cat.color }}
                >
                  {catExploits.length}
                </span>
              </div>
              <p className="font-mono text-[10px] text-[#00802a] mb-3 leading-relaxed">{cat.description}</p>
              <div className="grid grid-cols-3 gap-2 border-t border-[#003d15] pt-3">
                <div>
                  <div className="font-mono text-[10px] text-[#1a4d2e]">Published</div>
                  <div className="font-mono text-xs font-bold text-[#00ff41] text-tabular">{published}</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-[#1a4d2e]">Draft</div>
                  <div className="font-mono text-xs font-bold text-[#f59e0b] text-tabular">{draft}</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-[#1a4d2e]">Views</div>
                  <div className="font-mono text-xs font-bold text-[#00ffff] text-tabular">{(views / 1000).toFixed(0)}k</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}