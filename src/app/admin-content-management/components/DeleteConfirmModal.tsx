'use client';
import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  isBulk?: boolean;
}

export default function DeleteConfirmModal({ title, onConfirm, onCancel, isBulk }: DeleteConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative z-10 w-full max-w-sm bg-[#0f0f0f] border border-[#3d1500] rounded shadow-orange animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#3d1500]">
          <div className="flex items-center gap-2">
            <AlertTriangle size={14} className="text-[#ff6b35]" />
            <span className="font-mono text-sm font-bold text-[#ff6b35]">Confirm Delete</span>
          </div>
          <button onClick={onCancel} className="text-[#00802a] hover:text-[#ff6b35] transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-5">
          <p className="font-mono text-xs text-[#00802a] leading-relaxed">
            You are about to permanently delete:
          </p>
          <div className="mt-2 bg-[#1a0800] border border-[#3d1500] rounded px-3 py-2">
            <span className="font-mono text-xs text-[#ff6b35] font-bold">{title}</span>
          </div>
          <p className="font-mono text-xs text-[#1a4d2e] mt-3">
            This action cannot be undone. The exploit will be permanently removed from the database.
          </p>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-5 py-4 border-t border-[#3d1500]">
          <button
            onClick={onCancel}
            className="flex-1 font-mono text-xs py-2 border border-[#003d15] text-[#00802a] rounded hover:border-[#00ff41] hover:text-[#00ff41] transition-all duration-150 active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 flex items-center justify-center gap-2 font-mono text-xs py-2 bg-[#1a0800] border border-[#ff6b35] text-[#ff6b35] rounded hover:bg-[#3d1500] transition-all duration-150 active:scale-95"
          >
            <Trash2 size={13} />
            {isBulk ? 'Delete All' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}