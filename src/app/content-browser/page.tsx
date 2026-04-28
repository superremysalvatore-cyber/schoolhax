import React from 'react';
import PublicTopbar from '@/components/PublicTopbar';
import ContentBrowserClient from './components/ContentBrowserClient';

export default function ContentBrowserPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] terminal-flicker">
      {/* Scanline overlay */}
      <div className="fixed inset-0 scanline pointer-events-none z-0" />
      <PublicTopbar />
      <ContentBrowserClient />
    </div>
  );
}