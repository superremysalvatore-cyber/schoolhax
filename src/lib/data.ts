export type Difficulty = 'easy' | 'medium' | 'hard' | 'elite';
export type ExploitStatus = 'published' | 'draft' | 'featured' | 'archived';
export type CategorySlug = 'bookmarklets' | 'unblocked-sites' | 'browser-hacks' | 'games' | 'bypass-tools' | 'fun-stuff';

export interface Exploit {
  id: string;
  title: string;
  description: string;
  category: CategorySlug;
  tags: string[];
  difficulty: Difficulty;
  status: ExploitStatus;
  views: number;
  code?: string;
  url?: string;
  instructions: string;
  addedBy: string;
  createdAt: string;
  updatedAt: string;
  featured: boolean;
  works_on: string[];
}

export interface Category {
  id: string;
  slug: CategorySlug;
  label: string;
  description: string;
  icon: string;
  count: number;
  color: string;
}

export const CATEGORIES: Category[] = [
{ id: 'cat-001', slug: 'bookmarklets', label: 'Bookmarklets', description: 'Drag-and-drop JS hacks that run in your browser bar', icon: 'Bookmark', count: 1, color: '#00ff41' },
{ id: 'cat-002', slug: 'unblocked-sites', label: 'Unblocked Sites', description: 'Sites that still work on school WiFi', icon: 'Globe', count: 0, color: '#00ffff' },
{ id: 'cat-003', slug: 'browser-hacks', label: 'Browser Hacks', description: 'DevTools tricks, console exploits, and URL tricks', icon: 'Code2', count: 0, color: '#ff6b35' },
{ id: 'cat-004', slug: 'games', label: 'Games', description: 'Playable games that bypass school filters', icon: 'Gamepad2', count: 0, color: '#a855f7' },
{ id: 'cat-005', slug: 'bypass-tools', label: 'Bypass Tools', description: 'Proxies, mirrors, and filter-dodging methods', icon: 'Shield', count: 0, color: '#f59e0b' },
{ id: 'cat-006', slug: 'fun-stuff', label: 'Fun Stuff', description: 'Easter eggs, weird sites, and digital chaos', icon: 'Zap', count: 0, color: '#ec4899' }];


export const EXPLOITS: Exploit[] = [
{
  id: 'exploit-001',
  title: 'Tab Cloaker',
  description: 'Makes your tab look like Google Drive',
  category: 'bookmarklets',
  tags: ['tab', 'cloaker', 'google drive', 'disguise'],
  difficulty: 'easy',
  status: 'published',
  views: 0,
  code: "https://img.rocket.new/generatedImages/rocket_gen_img_1d08163a2-1772938235055.png",
  instructions: 'Drag this bookmarklet to your bookmarks bar, then click it on any tab to make it look like Google Drive.',
  addedBy: 'admin',
  createdAt: '2026-04-28',
  updatedAt: '2026-04-28',
  featured: false,
  works_on: ['Chrome', 'Firefox', 'Edge']
}];


export const ALL_TAGS = Array.from(new Set(EXPLOITS.flatMap((e) => e.tags))).sort();

export const ADMIN_CREDENTIALS = {
  email: 'root@schoolhax.dev',
  password: 'h4x0r$2026'
};