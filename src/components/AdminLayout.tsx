'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import { clearAuthSession } from '@/lib/auth';
import {
  LayoutDashboard,
  Database,
  Tag,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Globe,
  Shield,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'nav-dashboard', label: 'Dashboard', href: '/admin-content-management', icon: <LayoutDashboard size={18} /> },
  { id: 'nav-content', label: 'Content', href: '/admin-content-management', icon: <Database size={18} />, badge: 3 },
  { id: 'nav-tags', label: 'Tags', href: '/admin-content-management', icon: <Tag size={18} /> },
  { id: 'nav-settings', label: 'Settings', href: '/admin-content-management', icon: <Settings size={18} /> },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [lastSync, setLastSync] = useState<string>('');
  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    setLastSync(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
  }, []);

  const handleLogout = () => {
    clearAuthSession();
    router.push('/admin-login');
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`
          flex flex-col border-r border-[#003d15] bg-[#0a0a0a] transition-all duration-300 ease-in-out flex-shrink-0
          ${collapsed ? 'w-16' : 'w-56'}
        `}
      >
        {/* Logo */}
        <div className={`flex items-center border-b border-[#003d15] h-14 px-3 ${collapsed ? 'justify-center' : 'gap-2'}`}>
          <Link href="/content-browser" className="flex items-center gap-2">
            <AppLogo size={24} />
            {!collapsed && (
              <span className="font-mono text-sm font-bold text-[#00ff41] truncate">SchoolHax</span>
            )}
          </Link>
        </div>

        {/* Admin badge */}
        {!collapsed && (
          <div className="mx-3 mt-3 px-2 py-1.5 bg-[#0f0f0f] border border-[#003d15] rounded">
            <div className="flex items-center gap-1.5">
              <Terminal size={11} className="text-[#ff6b35]" />
              <span className="font-mono text-[10px] text-[#ff6b35] font-medium">ADMIN SHELL</span>
            </div>
            <div className="font-mono text-[10px] text-[#00802a] mt-0.5 truncate">root@schoolhax.dev</div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={`
                  flex items-center rounded transition-all duration-150 group relative
                  ${collapsed ? 'justify-center px-0 py-2.5' : 'gap-2.5 px-2.5 py-2'}
                  ${isActive
                    ? 'bg-[#001a08] text-[#00ff41] border border-[#003d15]'
                    : 'text-[#00802a] hover:bg-[#0f0f0f] hover:text-[#00ff41] border border-transparent'
                  }
                `}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && (
                  <span className="font-mono text-xs font-medium flex-1">{item.label}</span>
                )}
                {!collapsed && item.badge && (
                  <span className="font-mono text-[10px] bg-[#ff6b35] text-black px-1.5 py-0.5 rounded font-bold">
                    {item.badge}
                  </span>
                )}
                {collapsed && item.badge && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#ff6b35]" />
                )}
                {collapsed && (
                  <span className="absolute left-full ml-2 px-2 py-1 bg-[#141414] border border-[#003d15] rounded font-mono text-xs text-[#00ff41] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-[#003d15] p-2 space-y-1">
          <Link
            href="/content-browser"
            className={`flex items-center rounded text-[#00802a] hover:text-[#00ff41] hover:bg-[#0f0f0f] transition-all duration-150 group
              ${collapsed ? 'justify-center py-2' : 'gap-2.5 px-2.5 py-2'}
            `}
            title={collapsed ? 'View Site' : undefined}
          >
            <Globe size={16} />
            {!collapsed && <span className="font-mono text-xs">View Site</span>}
          </Link>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center rounded text-[#1a4d2e] hover:text-[#ff6b35] hover:bg-[#0f0f0f] transition-all duration-150 group
              ${collapsed ? 'justify-center py-2' : 'gap-2.5 px-2.5 py-2'}
            `}
            title={collapsed ? 'Logout' : undefined}
          >
            <LogOut size={16} />
            {!collapsed && <span className="font-mono text-xs">Logout</span>}
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`w-full flex items-center rounded text-[#1a4d2e] hover:text-[#00ff41] hover:bg-[#0f0f0f] transition-all duration-150
              ${collapsed ? 'justify-center py-2' : 'gap-2.5 px-2.5 py-2'}
            `}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            {!collapsed && <span className="font-mono text-xs">Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Admin topbar */}
        <div className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#003d15] h-14 flex items-center px-6 gap-4">
          <div className="flex items-center gap-2">
            <Shield size={14} className="text-[#ff6b35]" />
            <span className="font-mono text-xs text-[#ff6b35] font-medium">ADMIN PANEL</span>
            <span className="font-mono text-xs text-[#1a4d2e]">/ content-management</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="font-mono text-xs text-[#00802a]">
              Last sync: {lastSync}
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00ff41] animate-pulse-green"></span>
          </div>
        </div>
        <div className="p-6 xl:p-8 2xl:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}