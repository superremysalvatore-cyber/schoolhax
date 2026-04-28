import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import AdminContentClient from './components/AdminContentClient';

export default function AdminContentManagementPage() {
  return (
    <AdminLayout>
      <AdminContentClient />
    </AdminLayout>
  );
}