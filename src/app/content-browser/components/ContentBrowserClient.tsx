'use client';
import React, { useState, useMemo, useCallback } from 'react';
import { EXPLOITS, CATEGORIES, ALL_TAGS, type CategorySlug, type Exploit } from '@/lib/data';
import SearchBar from './SearchBar';
import CategoryTabs from './CategoryTabs';
import ExploitCard from './ExploitCard';
import SidebarFilters from './SidebarFilters';
import FeaturedBanner from './FeaturedBanner';
import BrowserStats from './BrowserStats';

export type DifficultyFilter = 'all' | 'easy' | 'medium' | 'hard' | 'elite';
export type SortOption = 'views' | 'newest' | 'oldest' | 'title';

export default function ContentBrowserClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategorySlug | 'all'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('views');

  const filteredExploits = useMemo(() => {
    let results = EXPLOITS.filter(e => e.status !== 'archived');

    if (activeCategory !== 'all') {
      results = results.filter(e => e.category === activeCategory);
    }
    if (difficultyFilter !== 'all') {
      results = results.filter(e => e.difficulty === difficultyFilter);
    }
    if (activeTags.length > 0) {
      results = results.filter(e => activeTags.some(t => e.tags.includes(t)));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.tags.some(t => t.includes(q)) ||
        e.category.includes(q)
      );
    }

    results = [...results].sort((a, b) => {
      switch (sortBy) {
        case 'views': return b.views - a.views;
        case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest': return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'title': return a.title.localeCompare(b.title);
        default: return 0;
      }
    });

    return results;
  }, [searchQuery, activeCategory, difficultyFilter, activeTags, sortBy]);

  const featuredExploits = useMemo(() => EXPLOITS.filter(e => e.featured), []);

  const toggleTag = useCallback((tag: string) => {
    setActiveTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setActiveCategory('all');
    setDifficultyFilter('all');
    setActiveTags([]);
    setSortBy('views');
  }, []);

  const hasActiveFilters = searchQuery || activeCategory !== 'all' || difficultyFilter !== 'all' || activeTags.length > 0;

  return (
    <div className="relative z-10 max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16 py-6">
      {/* Hero stats */}
      <BrowserStats totalCount={EXPLOITS.filter(e => e.status !== 'archived').length} />

      {/* Featured banner */}
      <FeaturedBanner exploits={featuredExploits} />

      {/* Search bar */}
      <div className="mt-6">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          resultCount={filteredExploits.length}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      {/* Category tabs */}
      <div className="mt-4">
        <CategoryTabs
          active={activeCategory}
          onChange={setActiveCategory}
          categories={CATEGORIES}
        />
      </div>

      {/* Main content + sidebar */}
      <div className="mt-6 flex gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0">
          <SidebarFilters
            difficultyFilter={difficultyFilter}
            onDifficultyChange={setDifficultyFilter}
            activeTags={activeTags}
            onTagToggle={toggleTag}
            allTags={ALL_TAGS}
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            onClearAll={clearFilters}
            hasActiveFilters={!!hasActiveFilters}
          />
        </aside>

        {/* Cards grid */}
        <div className="flex-1 min-w-0">
          {/* Active filter chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-4">
              {searchQuery && (
                <span className="font-mono text-xs bg-[#001a08] border border-[#003d15] text-[#00ff41] px-2 py-1 rounded flex items-center gap-1">
                  search: &quot;{searchQuery}&quot;
                  <button onClick={() => setSearchQuery('')} className="ml-1 text-[#00802a] hover:text-[#ff6b35]">×</button>
                </span>
              )}
              {activeCategory !== 'all' && (
                <span className="font-mono text-xs bg-[#001a08] border border-[#003d15] text-[#00ff41] px-2 py-1 rounded flex items-center gap-1">
                  cat: {activeCategory}
                  <button onClick={() => setActiveCategory('all')} className="ml-1 text-[#00802a] hover:text-[#ff6b35]">×</button>
                </span>
              )}
              {difficultyFilter !== 'all' && (
                <span className="font-mono text-xs bg-[#001a08] border border-[#003d15] text-[#00ff41] px-2 py-1 rounded flex items-center gap-1">
                  diff: {difficultyFilter}
                  <button onClick={() => setDifficultyFilter('all')} className="ml-1 text-[#00802a] hover:text-[#ff6b35]">×</button>
                </span>
              )}
              {activeTags.map(tag => (
                <span key={`chip-${tag}`} className="font-mono text-xs bg-[#001a08] border border-[#003d15] text-[#00ffff] px-2 py-1 rounded flex items-center gap-1">
                  #{tag}
                  <button onClick={() => toggleTag(tag)} className="ml-1 text-[#00802a] hover:text-[#ff6b35]">×</button>
                </span>
              ))}
              <button
                onClick={clearFilters}
                className="font-mono text-xs text-[#ff6b35] hover:text-white transition-colors px-2 py-1"
              >
                clear all
              </button>
            </div>
          )}

          {/* Result count */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-[#00802a]">
              <span className="text-[#00ff41] font-bold text-tabular">{filteredExploits.length}</span>
              {' '}exploits found
            </span>
          </div>

          {filteredExploits.length === 0 ? (
            <EmptyState onClear={clearFilters} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
              {filteredExploits.map((exploit, idx) => (
                <ExploitCard key={exploit.id} exploit={exploit} index={idx} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="font-mono text-5xl mb-4 text-[#003d15]">[NULL]</div>
      <h3 className="font-mono text-lg font-bold text-[#00802a] mb-2">No exploits found</h3>
      <p className="font-mono text-xs text-[#1a4d2e] max-w-xs mb-6">
        Your filters returned zero results. Try broadening your search or clearing active filters.
      </p>
      <button
        onClick={onClear}
        className="font-mono text-xs bg-[#001a08] border border-[#003d15] text-[#00ff41] hover:border-[#00ff41] hover:shadow-terminal px-4 py-2 rounded transition-all duration-150 active:scale-95"
      >
        $ clear --filters
      </button>
    </div>
  );
}