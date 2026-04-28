import React from 'react';
import AdminLoginClient from './components/AdminLoginClient';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Scanline overlay */}
      <div className="fixed inset-0 scanline pointer-events-none z-0" />
      <AdminLoginClient />
    </div>
  );
}