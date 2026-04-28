import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

export default function PublicTopbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#003d15]">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 flex items-center justify-between h-14">
        <Link href="/content-browser" className="flex items-center gap-2 group">
          <AppLogo size={28} />
          <span className="font-mono text-base font-bold text-[#00ff41] group-hover:text-white transition-colors">
            SchoolHax
          </span>
          <span className="hidden sm:inline font-mono text-xs text-[#00802a] ml-1">
            v2.4.1
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="hidden md:flex items-center gap-1.5 font-mono text-xs text-[#00802a]">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00ff41] animate-pulse-green"></span>
            {new Date()?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })} — ONLINE
          </span>
          <Link
            href="/admin-login"
            className="font-mono text-xs text-[#1a4d2e] hover:text-[#00ff41] transition-colors px-2 py-1 border border-transparent hover:border-[#003d15] rounded"
          >
            [admin]
          </Link>
        </div>
      </div>
    </header>
  );
}