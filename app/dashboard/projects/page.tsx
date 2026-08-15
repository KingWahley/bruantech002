'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { Plus, Edit, Trash2, Star, Eye, ExternalLink } from 'lucide-react';
import DataTable from '@/components/dashboard/tables/DataTable';
import Badge from '@/components/dashboard/ui/Badge';
import ConfirmModal from '@/components/dashboard/ui/ConfirmModal';
import { getProjects, deleteProject, toggleFeaturedProject, bulkUpdateProjects } from '@/lib/actions/projects';
import toast from 'react-hot-toast';
import { formatDate } from '@/lib/utils';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  // Confirmation Modal state
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; projectId?: string; title?: string }>({
    isOpen: false,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchProjectsData = async () => {
    setLoading(true);
    const data = await getProjects({ status: activeTab });
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjectsData();
  }, [activeTab]);

  const handleDeleteConfirm = async () => {
    if (!deleteModal.projectId) return;
    setIsDeleting(true);
    const res = await deleteProject(deleteModal.projectId, true);
    setIsDeleting(false);

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success('Project deleted successfully');
      setDeleteModal({ isOpen: false });
      fetchProjectsData();
    }
  };

  const handleToggleFeatured = async (id: string, current: boolean) => {
    const res = await toggleFeaturedProject(id, current);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success(current ? 'Removed from featured' : 'Marked as featured project');
      fetchProjectsData();
    }
  };

  const columns: ColumnDef<any>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
          className="w-4 h-4 accent-teal-500 rounded cursor-pointer"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          className="w-4 h-4 accent-teal-500 rounded cursor-pointer"
        />
      ),
    },
    {
      id: 'image',
      header: 'Image',
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
      header: 'Project Title',
      cell: ({ row }) => (
        <div className="flex flex-col">
          <Link
            href={`/dashboard/projects/${row.original.id}`}
            className="font-semibold text-zinc-100 hover:text-teal-400 text-xs transition-colors"
          >
            {row.original.title}
          </Link>
          <span className="text-[10px] text-zinc-500 font-mono">{row.original.slug}</span>
        </div>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => <span className="text-zinc-300 text-xs">{row.original.category}</span>,
    },
    {
      accessorKey: 'client',
      header: 'Client',
      cell: ({ row }) => <span className="text-zinc-400 text-xs">{row.original.client || '—'}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <Badge variant={row.original.status}>{row.original.status}</Badge>,
    },
    {
      accessorKey: 'featured',
      header: 'Featured',
      cell: ({ row }) => (
        <button
          onClick={() => handleToggleFeatured(row.original.id, row.original.featured)}
          className={`p-1.5 rounded-lg border transition-colors ${
            row.original.featured
              ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
              : 'bg-zinc-900 border-zinc-800 text-zinc-600 hover:text-zinc-400'
          }`}
          title={row.original.featured ? 'Unfeature' : 'Mark as Featured'}
        >
          <Star className="w-4 h-4 fill-current" />
        </button>
      ),
    },
    {
      accessorKey: 'created_at',
      header: 'Created',
      cell: ({ row }) => <span className="text-zinc-500 text-[11px]">{formatDate(row.original.created_at)}</span>,
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/case-studies/${row.original.slug}`}
            target="_blank"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-teal-400 hover:bg-zinc-800 transition-colors"
            title="Preview on Public Website"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
          <Link
            href={`/dashboard/projects/${row.original.id}`}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
            title="Edit Project"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={() =>
              setDeleteModal({ isOpen: true, projectId: row.original.id, title: row.original.title })
            }
            className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 transition-colors"
            title="Delete Project"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const getEmptyStateDetails = () => {
    switch (activeTab) {
      case 'draft':
        return {
          title: 'No draft projects found',
          description: 'You currently have no portfolio projects saved as draft.',
        };
      case 'published':
        return {
          title: 'No published projects found',
          description: 'No published projects match your current view.',
        };
      case 'archived':
        return {
          title: 'No archived projects found',
          description: 'Your project archive and trash are empty.',
        };
      default:
        return {
          title: 'No projects found',
          description: 'Get started by creating your first portfolio project.',
        };
    }
  };
  const emptyState = getEmptyStateDetails();

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-mono text-zinc-100 tracking-tight">Projects CMS</h1>
          <p className="text-xs text-zinc-400 mt-1">Manage case studies and portfolio projects</p>
        </div>

        <Link
          href="/dashboard/projects/new"
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-400 text-zinc-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-teal-500/10"
        >
          <Plus className="w-4 h-4" />
          Create New Project
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
        {['all', 'published', 'draft', 'archived'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
              activeTab === tab
                ? 'bg-zinc-800 text-teal-400 border border-zinc-700'
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
        data={projects}
        searchPlaceholder="Search projects by title..."
        isLoading={loading}
        bulkActions={(selectedRows) => (
          <div className="flex items-center gap-2">
            <button
              onClick={async () => {
                const ids = selectedRows.map((r: any) => r.id);
                const res = await bulkUpdateProjects(ids, 'publish');
                if (res?.error) toast.error(res.error);
                else {
                  toast.success(`Published ${ids.length} projects`);
                  fetchProjectsData();
                }
              }}
              className="px-2.5 py-1 bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-lg text-xs font-medium hover:bg-teal-500/30 transition-colors"
            >
              Publish
            </button>
            <button
              onClick={async () => {
                const ids = selectedRows.map((r: any) => r.id);
                const res = await bulkUpdateProjects(ids, 'draft');
                if (res?.error) toast.error(res.error);
                else {
                  toast.success(`Moved ${ids.length} projects to Draft`);
                  fetchProjectsData();
                }
              }}
              className="px-2.5 py-1 bg-zinc-800 text-zinc-200 rounded-lg text-xs font-medium hover:bg-zinc-700 transition-colors"
            >
              Set Draft
            </button>
            <button
              onClick={async () => {
                const ids = selectedRows.map((r: any) => r.id);
                const res = await bulkUpdateProjects(ids, 'delete');
                if (res?.error) toast.error(res.error);
                else {
                  toast.success(`Archived ${ids.length} projects`);
                  fetchProjectsData();
                }
              }}
              className="px-2.5 py-1 bg-rose-600/20 text-rose-400 border border-rose-500/20 rounded-lg text-xs font-medium hover:bg-rose-600/30 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
        emptyStateTitle={emptyState.title}
        emptyStateDescription={emptyState.description}
        emptyStateAction={
          <Link
            href="/dashboard/projects/new"
            className="px-4 py-2 bg-teal-500 text-zinc-950 font-bold text-xs rounded-xl"
          >
            New Project
          </Link>
        }
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false })}
        onConfirm={handleDeleteConfirm}
        title="Delete Project?"
        description={`Are you sure you want to delete "${deleteModal.title}"? The project will be moved to archived trash.`}
        confirmText="Delete Project"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
