'use client';
import React from 'react';
import type { Exploit } from '@/lib/data';

interface AdminStatsBarProps {
  exploits: Exploit[];
}

export default function AdminStatsBar({ exploits }: AdminStatsBarProps) {
  const published = exploits.filter(e => e.status === 'published').length;
  const featured = exploits.filter(e => e.featured).length;
  const draft = exploits.filter(e => e.status === 'draft').length;
  const archived = exploits.filter(e => e.status === 'archived').length;
  const totalViews = exploits.reduce((s, e) => s + e.views, 0);

  const stats = [
    { label: 'Total Exploits', value: exploits.length, color: '#00ff41', sub: 'all entries' },
    { label: 'Published', value: published, color: '#00ff41', sub: `${Math.round((published / exploits.length) * 100)}% of total` },
    { label: 'Featured', value: featured, color: '#ff6b35', sub: 'admin picks' },
    { label: 'Drafts', value: draft, color: '#f59e0b', sub: 'pending review' },
    { label: 'Archived', value: archived, color: '#1a4d2e', sub: 'hidden from public' },
    { label: 'Total Views', value: (totalViews / 1000).toFixed(0) + 'k', color: '#00ffff', sub: 'all time' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
      {stats.map((stat) => (
        <div
          key={`admin-stat-${stat.label}`}
          className="bg-[#0f0f0f] border border-[#003d15] rounded p-3 hover:border-[#00ff41] transition-all duration-200"
        >
          <div className="font-mono text-[10px] text-[#00802a] uppercase tracking-wider mb-1">{stat.label}</div>
          <div className="font-mono text-2xl font-bold text-tabular" style={{ color: stat.color }}>{stat.value}</div>
          <div className="font-mono text-[10px] text-[#1a4d2e] mt-0.5">{stat.sub}</div>
        </div>
      ))}
    </div>
  );
}