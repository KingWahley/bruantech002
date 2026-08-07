import React from 'react';
import Link from 'next/link';
import {
  FolderKanban,
  FileText,
  Mail,
  Plus,
  ArrowRight,
  Clock,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import MetricCard from '@/components/dashboard/cards/MetricCard';
import Badge from '@/components/dashboard/ui/Badge';
import { getProjects } from '@/lib/actions/projects';
import { getBlogPosts } from '@/lib/actions/blog';
import { getMessages } from '@/lib/actions/messages';
import { getActivityLogs } from '@/lib/actions/activity';
import { formatDate } from '@/lib/utils';

export default async function DashboardHomePage() {
  const projects = await getProjects({ includeDeleted: false });
  const blogs = await getBlogPosts({ includeDeleted: false });
  const messages = await getMessages();
  const activityLogs = await getActivityLogs(8);

  const totalProjects = projects.length;
  const publishedBlogs = blogs.filter((b: any) => b.status === 'published').length;
  const draftBlogs = blogs.filter((b: any) => b.status === 'draft').length;
  const unreadMessages = messages.filter((m: any) => m.status === 'unread').length;

  const recentProjects = projects.slice(0, 4);
  const recentBlogs = blogs.slice(0, 4);
  const recentMessages = messages.slice(0, 4);

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-mono text-zinc-100 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Welcome back! Here's a snapshot of your website content and contact activities.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/projects/new"
            className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-400 text-zinc-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-teal-500/10"
          >
            <Plus className="w-4 h-4" />
            New Project
          </Link>
          <Link
            href="/dashboard/blog/new"
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs rounded-xl transition-colors"
          >
            <FileText className="w-4 h-4 text-purple-400" />
            Write Post
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Projects"
          value={totalProjects}
          icon={FolderKanban}
          accentColor="teal"
          trend="Active portfolio"
        />
        <MetricCard
          title="Published Blogs"
          value={publishedBlogs}
          icon={FileText}
          accentColor="purple"
          trend="Live on site"
        />
        <MetricCard
          title="Draft Posts"
          value={draftBlogs}
          icon={Clock}
          accentColor="amber"
          trend="In progress"
        />
        <MetricCard
          title="Unread Messages"
          value={unreadMessages}
          icon={Mail}
          accentColor="rose"
          trend="Action required"
        />
      </div>

      {/* 2-Column Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Latest Content Lists */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Latest Projects */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderKanban className="w-5 h-5 text-teal-400" />
                <h2 className="text-base font-bold text-zinc-100 font-mono">Recent Projects</h2>
              </div>
              <Link
                href="/dashboard/projects"
                className="text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1"
              >
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="flex flex-col divide-y divide-zinc-800/80">
              {recentProjects.map((project: any) => (
                <div key={project.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 overflow-hidden shrink-0 relative border border-zinc-800">
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-500 font-mono">
                          N/A
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <Link
                        href={`/dashboard/projects/${project.id}`}
                        className="text-xs font-semibold text-zinc-200 hover:text-teal-400 truncate"
                      >
                        {project.title}
                      </Link>
                      <span className="text-[11px] text-zinc-500">{project.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Badge variant={project.status}>{project.status}</Badge>
                    <Link
                      href={`/dashboard/projects/${project.id}`}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Blog Posts */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
                <h2 className="text-base font-bold text-zinc-100 font-mono">Latest Blog Posts</h2>
              </div>
              <Link
                href="/dashboard/blog"
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
              >
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="flex flex-col divide-y divide-zinc-800/80">
              {recentBlogs.map((blog: any) => (
                <div key={blog.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex flex-col min-w-0">
                    <Link
                      href={`/dashboard/blog/${blog.id}`}
                      className="text-xs font-semibold text-zinc-200 hover:text-purple-400 truncate"
                    >
                      {blog.title}
                    </Link>
                    <span className="text-[11px] text-zinc-500">
                      {blog.category} • {formatDate(blog.created_at)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Badge variant={blog.status}>{blog.status}</Badge>
                    <Link
                      href={`/dashboard/blog/${blog.id}`}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Recent Activity Logs & Messages */}
        <div className="flex flex-col gap-8">
          
          {/* Unread Contact Messages */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-rose-400" />
                <h2 className="text-base font-bold text-zinc-100 font-mono">Recent Messages</h2>
              </div>
              <Link
                href="/dashboard/messages"
                className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1"
              >
                Inbox <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentMessages.length > 0 ? (
              <div className="flex flex-col divide-y divide-zinc-800/80">
                {recentMessages.map((msg: any) => (
                  <div key={msg.id} className="py-3 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-200">
                        {msg.first_name} {msg.last_name}
                      </span>
                      <Badge variant={msg.status}>{msg.status}</Badge>
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-1">{msg.subject}</p>
                    <span className="text-[10px] text-zinc-500">{formatDate(msg.created_at)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-500 py-4 text-center">No contact messages yet.</p>
            )}
          </div>

          {/* Activity Log Feed */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-zinc-100 font-mono">Recent Activity</h2>
              <Link href="/dashboard/activity" className="text-xs text-zinc-400 hover:text-zinc-200">
                View log
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {activityLogs.map((log: any) => (
                <div key={log.id} className="flex items-start gap-3 text-xs">
                  <div className="p-1.5 rounded-lg bg-zinc-800 text-teal-400 mt-0.5 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="font-semibold text-zinc-300">{log.action}</span>
                    <span className="text-[11px] text-zinc-500 mt-0.5">
                      {log.user_email} • {formatDate(log.created_at)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
