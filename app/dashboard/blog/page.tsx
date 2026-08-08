'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { Plus, Edit, Trash2, Eye, ExternalLink, Clock } from 'lucide-react';
import DataTable from '@/components/dashboard/tables/DataTable';
import Badge from '@/components/dashboard/ui/Badge';
import ConfirmModal from '@/components/dashboard/ui/ConfirmModal';
import { getBlogPosts, deleteBlogPost } from '@/lib/actions/blog';
import toast from 'react-hot-toast';
import { formatDate } from '@/lib/utils';

export default function BlogCMSPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; postId?: string; title?: string }>({
    isOpen: false,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchBlogPosts = async () => {
    setLoading(true);
    const data = await getBlogPosts({ status: activeTab });
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogPosts();
  }, [activeTab]);

  const handleDeleteConfirm = async () => {
    if (!deleteModal.postId) return;
    setIsDeleting(true);
    const res = await deleteBlogPost(deleteModal.postId, true);
    setIsDeleting(false);

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success('Blog post deleted successfully');
      setDeleteModal({ isOpen: false });
      fetchBlogPosts();
    }
  };

  const columns: ColumnDef<any>[] = [
    {
      id: 'image',
      header: 'Cover',
      cell: ({ row }) => (
        <div className="w-12 h-10 rounded-lg bg-zinc-800 border border-zinc-800 overflow-hidden relative">
          {row.original.image ? (
            <img src={row.original.image} alt={row.original.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-500">
              No Img
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'title',
      header: 'Article Title',
      cell: ({ row }) => (
        <div className="flex flex-col max-w-sm">
          <Link
            href={`/dashboard/blog/${row.original.id}`}
            className="font-semibold text-zinc-100 hover:text-purple-400 text-xs transition-colors line-clamp-1"
          >
            {row.original.title}
          </Link>
          <span className="text-[10px] text-zinc-500 font-mono truncate">{row.original.slug}</span>
        </div>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => (
        <span className="text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold">
          {row.original.category}
        </span>
      ),
    },
    {
      accessorKey: 'author',
      header: 'Author',
      cell: ({ row }) => (
        <span className="text-zinc-300 text-xs">{row.original.author?.name || 'ADMIN'}</span>
      ),
    },
    {
      accessorKey: 'read_time',
      header: 'Read Time',
      cell: ({ row }) => (
        <span className="text-zinc-400 text-xs flex items-center gap-1">
          <Clock className="w-3 h-3 text-zinc-500" />
          {row.original.read_time || '5 min read'}
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <Badge variant={row.original.status}>{row.original.status}</Badge>,
    },
    {
      accessorKey: 'created_at',
      header: 'Date',
      cell: ({ row }) => (
        <span className="text-zinc-500 text-[11px]">{formatDate(row.original.created_at)}</span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/blog/${row.original.slug}`}
            target="_blank"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-purple-400 hover:bg-zinc-800 transition-colors"
            title="Preview Article on Public Site"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
          <Link
            href={`/dashboard/blog/${row.original.id}`}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
            title="Edit Article"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={() =>
              setDeleteModal({ isOpen: true, postId: row.original.id, title: row.original.title })
            }
            className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 transition-colors"
            title="Delete Article"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-mono text-zinc-100 tracking-tight">Blog CMS</h1>
          <p className="text-xs text-zinc-400 mt-1">Manage articles, guides, and published posts</p>
        </div>

        <Link
          href="/dashboard/blog/new"
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-purple-500/20"
        >
          <Plus className="w-4 h-4" />
          Write New Post
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
        {['all', 'published', 'draft', 'scheduled', 'archived'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
              activeTab === tab
                ? 'bg-zinc-800 text-purple-400 border border-zinc-700'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={posts}
        searchPlaceholder="Search blog posts by title..."
        isLoading={loading}
        emptyStateTitle="No blog posts found"
        emptyStateDescription="Write and publish your first blog post for the website."
        emptyStateAction={
          <Link
            href="/dashboard/blog/new"
            className="px-4 py-2 bg-purple-600 text-white font-bold text-xs rounded-xl"
          >
            Write Post
          </Link>
        }
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false })}
        onConfirm={handleDeleteConfirm}
        title="Delete Blog Post?"
        description={`Are you sure you want to delete "${deleteModal.title}"? The article will be moved to archived trash.`}
        confirmText="Delete Post"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
