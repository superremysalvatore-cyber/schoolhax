import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';
import { Toaster } from 'sonner';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'SchoolHax — The Underground Student Exploit Hub',
  description: 'Bookmarklets, unblocked sites, browser hacks, and school exploits curated for students. Browse free, no login required.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-[#00ff41] font-sans antialiased">
        {children}
        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              background: '#0f0f0f',
              border: '1px solid #003d15',
              color: '#00ff41',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '13px',
            },
          }}
          position="bottom-right"
        />

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fschoolhax7268back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.18" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" /></body>
    </html>
  );
}