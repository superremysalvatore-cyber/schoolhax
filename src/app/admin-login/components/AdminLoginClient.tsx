'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Terminal, Lock, AlertTriangle, Copy, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { ADMIN_CREDENTIALS } from '@/lib/data';
import { setAuthSession } from '@/lib/auth';
import AppLogo from '@/components/ui/AppLogo';

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

export default function AdminLoginClient() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [booting, setBooting] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginForm>({
    defaultValues: { email: '', password: '', remember: false },
  });

  const copyCredential = async (field: 'email' | 'password') => {
    const val = field === 'email' ? ADMIN_CREDENTIALS.email : ADMIN_CREDENTIALS.password;
    try {
      await navigator.clipboard.writeText(val);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      toast.error('Copy failed');
    }
  };

  const autofillCredentials = () => {
    setValue('email', ADMIN_CREDENTIALS.email);
    setValue('password', ADMIN_CREDENTIALS.password);
    toast.success('Credentials autofilled');
  };

  const onSubmit = async (data: LoginForm) => {
    setLoginError('');
    setIsLoading(true);

    await new Promise(r => setTimeout(r, 900));

    // Backend integration: POST /api/auth/admin-login
    if (data.email === ADMIN_CREDENTIALS.email && data.password === ADMIN_CREDENTIALS.password) {
      setAuthSession(data.remember);
      setBooting(true);
      const lines = [
        '> Authenticating root@schoolhax.dev...',
        '> Verifying admin privileges... [OK]',
        '> Loading content database... [OK]',
        '> Mounting admin filesystem... [OK]',
        '> Welcome back, root.',
      ];
      for (let i = 0; i < lines.length; i++) {
        await new Promise(r => setTimeout(r, 300));
        setBootLines(prev => [...prev, lines[i]]);
      }
      await new Promise(r => setTimeout(r, 400));
      router.push('/admin-content-management');
    } else {
      setIsLoading(false);
      setLoginError('Invalid credentials — use the demo accounts below to sign in');
    }
  };

  return (
    <div className="relative z-10 flex w-full">
      {/* Left panel — terminal art */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 flex-col justify-between p-12 border-r border-[#003d15] bg-[#0a0a0a]">
        <div className="flex items-center gap-2">
          <AppLogo size={28} />
          <span className="font-mono text-sm font-bold text-[#00ff41]">SchoolHax</span>
          <span className="font-mono text-xs text-[#00802a]">Admin Shell</span>
        </div>

        <div className="space-y-6">
          {/* ASCII art terminal */}
          <div className="bg-[#0f0f0f] border border-[#003d15] rounded p-6">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#003d15]">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="font-mono text-xs text-[#1a4d2e] ml-2">schoolhax — admin@bash — 80×24</span>
            </div>
            <pre className="font-mono text-xs text-[#00ff41] leading-relaxed">
{`  ____       _     _   _     _   _
 / ___|  ___| |__ | | | | __| | | |__   __ ___  __
 \\___ \\ / __| '_ \\| | | |/ _\` | | '_ \\ / _\` \\ \\/ /
  ___) | (__| | | | |_| | (_| | | | | | (_| |>  <
 |____/ \\___|_| |_|\\___/ \\__,_| |_| |_|\\__,_/_/\\_\\`}
            </pre>
            <div className="mt-4 font-mono text-xs text-[#00802a] space-y-1">
              <div><span className="text-[#1a4d2e]">root@schoolhax:~$</span> whoami</div>
              <div className="text-[#00ff41]">admin</div>
              <div><span className="text-[#1a4d2e]">root@schoolhax:~$</span> uptime</div>
              <div className="text-[#00ff41]">SchoolHax v2.4.1 — 847 days running</div>
              <div><span className="text-[#1a4d2e]">root@schoolhax:~$</span> ls exploits/</div>
              <div className="text-[#00ff41]">bookmarklets/ browser-hacks/ bypass-tools/ games/ fun-stuff/ unblocked-sites/</div>
              <div className="flex items-center gap-1">
                <span className="text-[#1a4d2e]">root@schoolhax:~$</span>
                <span className="cursor-blink text-[#00ff41]">█</span>
              </div>
            </div>
          </div>

          {/* Feature list */}
          <div className="space-y-3">
            {[
              { icon: <Database />, title: 'Content Management', desc: 'Create, edit, publish, and archive all exploits' },
              { icon: <Tag />, title: 'Tag & Category Control', desc: 'Organize content with custom tags and categories' },
              { icon: <BarChart />, title: 'View Analytics', desc: 'Track which exploits are most popular' },
            ].map((item, i) => (
              <div key={`feat-${i}`} className="flex items-start gap-3">
                <span className="text-[#00802a] mt-0.5">{item.icon}</span>
                <div>
                  <div className="font-mono text-xs font-bold text-[#00ff41]">{item.title}</div>
                  <div className="font-mono text-xs text-[#00802a]">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="font-mono text-xs text-[#1a4d2e]">
          © 2026 SchoolHax — Unauthorized access is prohibited and monitored.
        </div>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <AppLogo size={28} />
            <span className="font-mono text-base font-bold text-[#00ff41]">SchoolHax</span>
          </div>

          {/* Form header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={16} className="text-[#ff6b35]" />
              <span className="font-mono text-xs text-[#ff6b35] font-bold uppercase tracking-wider">Admin Access</span>
            </div>
            <h1 className="font-mono text-xl font-bold text-[#00ff41]">root login</h1>
            <p className="font-mono text-xs text-[#00802a] mt-1">Restricted area — authorized personnel only</p>
          </div>

          {/* Boot sequence overlay */}
          {booting && (
            <div className="bg-[#0f0f0f] border border-[#003d15] rounded p-4 mb-6 animate-fade-in-up">
              <div className="space-y-1">
                {bootLines.map((line, i) => (
                  <div key={`boot-${i}`} className="font-mono text-xs text-[#00ff41]">{line}</div>
                ))}
                {bootLines.length < 5 && (
                  <div className="flex items-center gap-1">
                    <span className="font-mono text-xs text-[#00ff41]">{'>'}</span>
                    <span className="cursor-blink text-[#00ff41]">█</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Error */}
          {loginError && !booting && (
            <div className="flex items-start gap-2 bg-[#1a0800] border border-[#3d1500] rounded p-3 mb-5 animate-fade-in-up">
              <AlertTriangle size={14} className="text-[#ff6b35] flex-shrink-0 mt-0.5" />
              <span className="font-mono text-xs text-[#ff6b35]">{loginError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="font-mono text-xs font-bold text-[#00802a] block mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-[#00802a]">$</span>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                  })}
                  placeholder="admin@domain.dev"
                  className="w-full bg-[#0f0f0f] border border-[#003d15] rounded font-mono text-sm text-[#00ff41] placeholder-[#1a4d2e] pl-7 pr-3 py-2.5 focus:outline-none focus:border-[#00ff41] focus:shadow-terminal transition-all duration-200"
                />
              </div>
              {errors.email && (
                <p className="font-mono text-xs text-[#ff6b35] mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="font-mono text-xs font-bold text-[#00802a] block mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00802a]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
                  placeholder="••••••••••"
                  className="w-full bg-[#0f0f0f] border border-[#003d15] rounded font-mono text-sm text-[#00ff41] placeholder-[#1a4d2e] pl-9 pr-10 py-2.5 focus:outline-none focus:border-[#00ff41] focus:shadow-terminal transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00802a] hover:text-[#00ff41] transition-colors"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {errors.password && (
                <p className="font-mono text-xs text-[#ff6b35] mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('remember')}
                id="remember"
                className="w-3.5 h-3.5 rounded border border-[#003d15] bg-[#0f0f0f] accent-[#00ff41] cursor-pointer"
              />
              <label htmlFor="remember" className="font-mono text-xs text-[#00802a] cursor-pointer">
                Keep session active
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || booting}
              className="w-full flex items-center justify-center gap-2 bg-[#001a08] border border-[#00ff41] text-[#00ff41] font-mono text-sm font-bold py-2.5 rounded hover:bg-[#003d15] hover:shadow-terminal-strong transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading || booting ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-[#00ff41] border-t-transparent rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Terminal size={14} />
                  $ sudo login
                </>
              )}
            </button>
          </form>

          <div className="mt-4 text-center">
            <a href="/content-browser" className="font-mono text-xs text-[#1a4d2e] hover:text-[#00802a] transition-colors">
              ← Back to public site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Inline icon components to avoid import issues
function Database() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>; }
function Tag() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>; }
function BarChart() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>; }