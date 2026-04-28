'use client';
import React, { useState, useMemo } from 'react';
import { EXPLOITS as INITIAL_EXPLOITS, CATEGORIES, type Exploit, type CategorySlug, type ExploitStatus } from '@/lib/data';
import AdminStatsBar from './AdminStatsBar';
import ExploitTable from './ExploitTable';
import ExploitFormModal from './ExploitFormModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import CategoryPanel from './CategoryPanel';
import { toast } from 'sonner';

export type AdminTab = 'content' | 'categories';

export default function AdminContentClient() {
  const [exploits, setExploits] = useState<Exploit[]>(INITIAL_EXPLOITS);
  const [activeTab, setActiveTab] = useState<AdminTab>('content');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategorySlug | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<ExploitStatus | 'all'>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [sortCol, setSortCol] = useState<string>('views');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [editingExploit, setEditingExploit] = useState<Exploit | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);

  const filteredExploits = useMemo(() => {
    let results = [...exploits];
    if (categoryFilter !== 'all') results = results.filter(e => e.category === categoryFilter);
    if (statusFilter !== 'all') results = results.filter(e => e.status === statusFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.id.includes(q) ||
        e.tags.some(t => t.includes(q))
      );
    }
    results.sort((a, b) => {
      let av: string | number = '';
      let bv: string | number = '';
      if (sortCol === 'views') { av = a.views; bv = b.views; }
      else if (sortCol === 'title') { av = a.title; bv = b.title; }
      else if (sortCol === 'createdAt') { av = a.createdAt; bv = b.createdAt; }
      else if (sortCol === 'updatedAt') { av = a.updatedAt; bv = b.updatedAt; }
      else if (sortCol === 'difficulty') { av = a.difficulty; bv = b.difficulty; }
      if (typeof av === 'number' && typeof bv === 'number') {
        return sortDir === 'asc' ? av - bv : bv - av;
      }
      return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
    return results;
  }, [exploits, categoryFilter, statusFilter, searchQuery, sortCol, sortDir]);

  const handleSort = (col: string) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('desc'); }
  };

  const handleStatusChange = (id: string, status: ExploitStatus) => {
    setExploits(prev => prev.map(e => e.id === id ? { ...e, status, updatedAt: new Date().toISOString().split('T')[0] } : e));
    toast.success(`Status updated to ${status}`);
    // Backend: PATCH /api/exploits/:id { status }
  };

  const handleToggleFeatured = (id: string) => {
    setExploits(prev => prev.map(e => e.id === id ? { ...e, featured: !e.featured } : e));
    const exploit = exploits.find(e => e.id === id);
    toast.success(exploit?.featured ? 'Removed from featured' : 'Added to featured');
    // Backend: PATCH /api/exploits/:id { featured }
  };

  const handleSave = (data: Partial<Exploit>) => {
    if (editingExploit) {
      setExploits(prev => prev.map(e => e.id === editingExploit.id ? { ...e, ...data, updatedAt: new Date().toISOString().split('T')[0] } : e));
      toast.success('Exploit updated successfully');
      // Backend: PUT /api/exploits/:id { ...data }
    } else {
      const newExploit: Exploit = {
        id: `exploit-${String(Date.now()).slice(-6)}`,
        title: data.title || '',
        description: data.description || '',
        category: data.category || 'browser-hacks',
        tags: data.tags || [],
        difficulty: data.difficulty || 'easy',
        status: data.status || 'draft',
        views: 0,
        code: data.code,
        url: data.url,
        instructions: data.instructions || '',
        addedBy: 'admin',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        featured: false,
        works_on: data.works_on || ['Chrome'],
      };
      setExploits(prev => [newExploit, ...prev]);
      toast.success('New exploit created');
      // Backend: POST /api/exploits { ...data }
    }
    setEditingExploit(null);
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    setExploits(prev => prev.filter(e => e.id !== id));
    setDeletingId(null);
    toast.success('Exploit deleted');
    // Backend: DELETE /api/exploits/:id
  };

  const handleBulkDelete = () => {
    setExploits(prev => prev.filter(e => !selectedIds.has(e.id)));
    toast.success(`${selectedIds.size} exploits deleted`);
    setSelectedIds(new Set());
    setBulkDeleteConfirm(false);
    // Backend: DELETE /api/exploits/bulk { ids: [...selectedIds] }
  };

  const handleBulkStatusChange = (status: ExploitStatus) => {
    setExploits(prev => prev.map(e => selectedIds.has(e.id) ? { ...e, status } : e));
    toast.success(`${selectedIds.size} exploits set to ${status}`);
    setSelectedIds(new Set());
    // Backend: PATCH /api/exploits/bulk { ids: [...selectedIds], status }
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredExploits.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredExploits.map(e => e.id)));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-mono text-xl font-bold text-[#00ff41]">Content Management</h1>
          <p className="font-mono text-xs text-[#00802a] mt-0.5">
            Manage all exploits, bookmarklets, and site listings
          </p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 font-mono text-xs font-bold px-4 py-2 bg-[#001a08] border border-[#00ff41] text-[#00ff41] rounded hover:bg-[#003d15] hover:shadow-terminal transition-all duration-150 active:scale-95"
        >
          <span className="text-base leading-none">+</span>
          New Exploit
        </button>
      </div>

      {/* Stats bar */}
      <AdminStatsBar exploits={exploits} />

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[#003d15] pb-0">
        {(['content', 'categories'] as AdminTab[]).map(tab => (
          <button
            key={`tab-${tab}`}
            onClick={() => setActiveTab(tab)}
            className={`font-mono text-xs font-medium px-4 py-2 rounded-t border border-b-0 transition-all duration-150
              ${activeTab === tab
                ? 'bg-[#0f0f0f] border-[#003d15] text-[#00ff41] border-b-[#0f0f0f]'
                : 'border-transparent text-[#00802a] hover:text-[#00ff41]'
              }`}
          >
            {tab === 'content' ? `Exploits (${exploits.length})` : 'Categories'}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'content' ? (
        <ExploitTable
          exploits={filteredExploits}
          allExploits={exploits}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          selectedIds={selectedIds}
          onToggleSelect={toggleSelect}
          onToggleSelectAll={toggleSelectAll}
          sortCol={sortCol}
          sortDir={sortDir}
          onSort={handleSort}
          onEdit={setEditingExploit}
          onDelete={setDeletingId}
          onStatusChange={handleStatusChange}
          onToggleFeatured={handleToggleFeatured}
          onBulkDelete={() => setBulkDeleteConfirm(true)}
          onBulkStatusChange={handleBulkStatusChange}
        />
      ) : (
        <CategoryPanel categories={CATEGORIES} exploits={exploits} />
      )}

      {/* Modals */}
      {(isCreating || editingExploit) && (
        <ExploitFormModal
          exploit={editingExploit}
          onSave={handleSave}
          onClose={() => { setIsCreating(false); setEditingExploit(null); }}
        />
      )}

      {deletingId && (
        <DeleteConfirmModal
          title={exploits.find(e => e.id === deletingId)?.title || ''}
          onConfirm={() => handleDelete(deletingId)}
          onCancel={() => setDeletingId(null)}
        />
      )}

      {bulkDeleteConfirm && (
        <DeleteConfirmModal
          title={`${selectedIds.size} selected exploits`}
          onConfirm={handleBulkDelete}
          onCancel={() => setBulkDeleteConfirm(false)}
          isBulk
        />
      )}
    </div>
  );
}