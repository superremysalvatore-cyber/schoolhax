'use client';

const AUTH_KEY = 'schoolhax_admin_auth';

export function setAuthSession(remember: boolean): void {
  if (typeof window === 'undefined') return;
  const payload = JSON.stringify({ authed: true, ts: Date.now() });
  if (remember) {
    localStorage.setItem(AUTH_KEY, payload);
  }
  sessionStorage.setItem(AUTH_KEY, payload);
  // Also set a cookie so middleware can read it
  const maxAge = remember ? 60 * 60 * 24 * 7 : 0; // 7 days or session
  document.cookie = `${AUTH_KEY}=1; path=/; SameSite=Strict${remember ? `; max-age=${maxAge}` : ''}`;
}

export function clearAuthSession(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(AUTH_KEY);
  document.cookie = `${AUTH_KEY}=; path=/; max-age=0`;
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return !!(sessionStorage.getItem(AUTH_KEY) || localStorage.getItem(AUTH_KEY));
}
