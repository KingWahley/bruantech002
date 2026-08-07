'use client';

import React, { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Mail, Trash2, CheckCircle2, Archive, Download, Eye, Phone, User, Calendar, MessageSquare } from 'lucide-react';
import DataTable from '@/components/dashboard/tables/DataTable';
import Badge from '@/components/dashboard/ui/Badge';
import Drawer from '@/components/dashboard/ui/Drawer';
import ConfirmModal from '@/components/dashboard/ui/ConfirmModal';
import { getMessages, updateMessageStatus, deleteMessage, bulkUpdateMessages } from '@/lib/actions/messages';
import { exportToCsv, formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  // Selected message for detail drawer
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Delete modal
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; messageId?: string }>({
    isOpen: false,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchMessagesData = async () => {
    setLoading(true);
    const data = await getMessages({ status: activeTab });
    setMessages(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessagesData();
  }, [activeTab]);

  const handleOpenDetail = async (msg: any) => {
    setSelectedMessage(msg);
    setDrawerOpen(true);

    if (msg.status === 'unread') {
      await updateMessageStatus(msg.id, 'read');
      fetchMessagesData();
    }
  };

  const handleToggleStatus = async (id: string, newStatus: 'read' | 'unread' | 'archived') => {
    const res = await updateMessageStatus(id, newStatus);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success(`Message marked as ${newStatus}`);
      fetchMessagesData();
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, status: newStatus });
      }
    }
  };

  const handleDeleteSingle = async () => {
    if (!deleteModal.messageId) return;
    setIsDeleting(true);
    const res = await deleteMessage(deleteModal.messageId);
    setIsDeleting(false);

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success('Message deleted');
      setDeleteModal({ isOpen: false });
      setDrawerOpen(false);
      fetchMessagesData();
    }
  };

  const handleExportCSV = () => {
    if (!messages.length) {
      toast.error('No messages to export');
      return;
    }
    const exportRows = messages.map((m) => ({
      ID: m.id,
      FirstName: m.first_name,
      LastName: m.last_name,
      Email: m.email,
      Phone: m.phone_number,
      Subject: m.subject,
      Message: m.message,
      Status: m.status,
      Date: formatDate(m.created_at),
    }));
    exportToCsv('contact_messages_export', exportRows);
    toast.success('Messages exported to CSV');
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
      accessorKey: 'name',
      header: 'Sender Name',
      cell: ({ row }) => (
        <div className="flex flex-col">
          <button
            onClick={() => handleOpenDetail(row.original)}
            className="font-semibold text-zinc-100 hover:text-teal-400 text-xs text-left transition-colors"
          >
            {row.original.first_name} {row.original.last_name}
          </button>
          <span className="text-[10px] text-zinc-500">{row.original.email}</span>
        </div>
      ),
    },
    {
      accessorKey: 'subject',
      header: 'Subject',
      cell: ({ row }) => (
        <div className="flex flex-col max-w-xs">
          <span className="text-zinc-200 font-medium text-xs truncate">{row.original.subject}</span>
          <span className="text-[11px] text-zinc-500 truncate">{row.original.message}</span>
        </div>
      ),
    },
    {
      accessorKey: 'phone_number',
      header: 'Phone',
      cell: ({ row }) => <span className="text-zinc-400 text-xs">{row.original.phone_number || '—'}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <Badge variant={row.original.status}>{row.original.status}</Badge>,
    },
    {
      accessorKey: 'created_at',
      header: 'Received Date',
      cell: ({ row }) => (
        <span className="text-zinc-500 text-[11px]">{formatDate(row.original.created_at)}</span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenDetail(row.original)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-teal-400 hover:bg-zinc-800 transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          {row.original.status === 'unread' ? (
            <button
              onClick={() => handleToggleStatus(row.original.id, 'read')}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 transition-colors"
              title="Mark as Read"
            >
              <CheckCircle2 className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => handleToggleStatus(row.original.id, 'unread')}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-amber-400 hover:bg-zinc-800 transition-colors"
              title="Mark as Unread"
            >
              <Mail className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setDeleteModal({ isOpen: true, messageId: row.original.id })}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 transition-colors"
            title="Delete Message"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-mono text-zinc-100 tracking-tight">Contact Messages</h1>
          <p className="text-xs text-zinc-400 mt-1">Inbound form submissions from your website visitors</p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs rounded-xl transition-colors"
        >
          <Download className="w-4 h-4 text-teal-400" />
          Export to CSV
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
        {['all', 'unread', 'read', 'archived'].map((tab) => (
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
        data={messages}
        searchPlaceholder="Search messages by name, email, or subject..."
        isLoading={loading}
        bulkActions={(selectedRows) => (
          <div className="flex items-center gap-2">
            <button
              onClick={async () => {
                const ids = selectedRows.map((r: any) => r.id);
                await bulkUpdateMessages(ids, 'read');
                toast.success(`Marked ${ids.length} messages as read`);
                fetchMessagesData();
              }}
              className="px-2.5 py-1 bg-zinc-800 text-zinc-200 rounded-lg text-xs font-medium hover:bg-zinc-700"
            >
              Mark Read
            </button>
            <button
              onClick={async () => {
                const ids = selectedRows.map((r: any) => r.id);
                await bulkUpdateMessages(ids, 'archive');
                toast.success(`Archived ${ids.length} messages`);
                fetchMessagesData();
              }}
              className="px-2.5 py-1 bg-zinc-800 text-zinc-200 rounded-lg text-xs font-medium hover:bg-zinc-700"
            >
              Archive
            </button>
            <button
              onClick={async () => {
                const ids = selectedRows.map((r: any) => r.id);
                await bulkUpdateMessages(ids, 'delete');
                toast.success(`Deleted ${ids.length} messages`);
                fetchMessagesData();
              }}
              className="px-2.5 py-1 bg-rose-600/20 text-rose-400 border border-rose-500/20 rounded-lg text-xs font-medium hover:bg-rose-600/30"
            >
              Delete
            </button>
          </div>
        )}
        emptyStateTitle="No messages found"
        emptyStateDescription="You currently have no contact message inquiries."
      />

      {/* Message Detail Drawer */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Message Inbound Details"
      >
        {selectedMessage && (
          <div className="flex flex-col gap-6 text-zinc-200">
            {/* Status & Date */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <Badge variant={selectedMessage.status}>{selectedMessage.status}</Badge>
              <span className="text-xs text-zinc-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                {formatDate(selectedMessage.created_at)}
              </span>
            </div>

            {/* Sender Info */}
            <div className="flex flex-col gap-3 bg-zinc-950 p-4 rounded-xl border border-zinc-800">
              <div className="flex items-center gap-2 text-sm font-bold text-zinc-100">
                <User className="w-4 h-4 text-teal-400" />
                {selectedMessage.first_name} {selectedMessage.last_name}
              </div>
              <div className="flex flex-col gap-1 text-xs text-zinc-400 pl-6">
                <a href={`mailto:${selectedMessage.email}`} className="hover:text-teal-400 transition-colors">
                  {selectedMessage.email}
                </a>
                <a href={`tel:${selectedMessage.phone_number}`} className="hover:text-teal-400 transition-colors flex items-center gap-1">
                  <Phone className="w-3 h-3" /> {selectedMessage.phone_number}
                </a>
              </div>
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Subject</span>
              <h4 className="text-sm font-semibold text-zinc-100">{selectedMessage.subject}</h4>
            </div>

            {/* Message Body */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-teal-400" /> Message Text
              </span>
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-xs leading-relaxed text-zinc-300 whitespace-pre-wrap">
                {selectedMessage.message}
              </div>
            </div>

            {/* Actions in Drawer */}
            <div className="flex items-center justify-between pt-6 border-t border-zinc-800 mt-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleStatus(selectedMessage.id, selectedMessage.status === 'unread' ? 'read' : 'unread')}
                  className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold rounded-lg text-zinc-200"
                >
                  Mark as {selectedMessage.status === 'unread' ? 'Read' : 'Unread'}
                </button>
                <button
                  onClick={() => handleToggleStatus(selectedMessage.id, 'archived')}
                  className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold rounded-lg text-zinc-200"
                >
                  Archive
                </button>
              </div>

              <button
                onClick={() => setDeleteModal({ isOpen: true, messageId: selectedMessage.id })}
                className="px-3 py-1.5 bg-rose-600/20 text-rose-400 hover:bg-rose-600/30 text-xs font-semibold rounded-lg border border-rose-500/20"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </Drawer>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false })}
        onConfirm={handleDeleteSingle}
        title="Delete Message?"
        description="Are you sure you want to delete this contact message? This action cannot be undone."
        confirmText="Delete Message"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
