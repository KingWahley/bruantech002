'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Mail,
  Activity,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Plus,
  List,
} from 'lucide-react';
import { logout } from '@/lib/actions/auth';
import ConfirmModal from '../ui/ConfirmModal';

interface SidebarProps {
  unreadMessagesCount?: number;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface SubMenuItem {
  name: string;
  href: string;
  icon?: React.ElementType;
}

interface NavItem {
  id: string;
  name: string;
  href: string;
  icon: React.ElementType;
  exact?: boolean;
  badge?: number;
  subItems?: SubMenuItem[];
}

export default function Sidebar({
  unreadMessagesCount = 0,
  collapsed: externalCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const pathname = usePathname();
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const collapsed = externalCollapsed !== undefined ? externalCollapsed : internalCollapsed;

  const handleToggleCollapse = () => {
    if (onToggleCollapse) {
      onToggleCollapse();
    } else {
      setInternalCollapsed(!internalCollapsed);
    }
  };

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Track expanded state for submenus (projects & blog)
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    projects: pathname.startsWith('/dashboard/projects'),
    blog: pathname.startsWith('/dashboard/blog'),
  });

  // Auto-expand active submenus on path change
  useEffect(() => {
    if (pathname.startsWith('/dashboard/projects')) {
      setExpandedMenus((prev) => ({ ...prev, projects: true }));
    }
    if (pathname.startsWith('/dashboard/blog')) {
      setExpandedMenus((prev) => ({ ...prev, blog: true }));
    }
  }, [pathname]);

  const toggleSubmenu = (id: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const navItems: NavItem[] = [
    {
      id: 'overview',
      name: 'Overview',
      href: '/dashboard',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      id: 'projects',
      name: 'Projects',
      href: '/dashboard/projects',
      icon: FolderKanban,
      subItems: [
        { name: 'Project List', href: '/dashboard/projects', icon: List },
        { name: 'New Project', href: '/dashboard/projects/new', icon: Plus },
      ],
    },
    {
      id: 'blog',
      name: 'Blog CMS',
      href: '/dashboard/blog',
      icon: FileText,
      subItems: [
        { name: 'Blog Posts', href: '/dashboard/blog', icon: List },
        { name: 'Write a Blog', href: '/dashboard/blog/new', icon: Plus },
      ],
    },
    {
      id: 'messages',
      name: 'Messages',
      href: '/dashboard/messages',
      icon: Mail,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined,
    },
    {
      id: 'activity',
      name: 'Activity Logs',
      href: '/dashboard/activity',
      icon: Activity,
    },
    {
      id: 'settings',
      name: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
    },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
  };

  return (
    <>
      <aside
        className={`fixed left-0 top-0 bottom-0 z-40 bg-zinc-950 border-r border-zinc-800 flex flex-col transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-zinc-800/80">
          <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
              <span className="font-mono font-bold text-teal-400 text-sm">BT</span>
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-zinc-100 font-mono tracking-tight">
                  Bruantech
                </span>
                <span className="text-[10px] text-teal-400 font-medium tracking-wider uppercase">
                  Admin CMS
                </span>
              </div>
            )}
          </Link>
          <button
            onClick={handleToggleCollapse}
            className="text-zinc-400 hover:text-zinc-200 p-1.5 rounded-lg hover:bg-zinc-900 transition-colors"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-4 px-3 flex flex-col gap-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            const Icon = item.icon;
            const hasSubmenu = Boolean(item.subItems && item.subItems.length > 0);
            const isExpanded = expandedMenus[item.id];

            return (
              <div key={item.id} className="flex flex-col">
                {hasSubmenu ? (
                  <button
                    onClick={() => {
                      if (collapsed) handleToggleCollapse();
                      toggleSubmenu(item.id);
                    }}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all group relative w-full text-left ${
                      isActive
                        ? 'bg-zinc-900/90 text-white font-semibold'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                    }`}
                    title={collapsed ? item.name : undefined}
                  >
                    <Icon
                      className={`w-5 h-5 shrink-0 transition-colors ${
                        isActive ? 'text-teal-400' : 'text-zinc-400 group-hover:text-zinc-200'
                      }`}
                    />
                    {!collapsed && (
                      <>
                        <span className="flex-1">{item.name}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300" />
                        )}
                      </>
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all group relative ${
                      isActive
                        ? 'bg-zinc-800 text-white font-semibold shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/80'
                    }`}
                    title={collapsed ? item.name : undefined}
                  >
                    <Icon
                      className={`w-5 h-5 shrink-0 transition-colors ${
                        isActive ? 'text-teal-400' : 'text-zinc-400 group-hover:text-zinc-200'
                      }`}
                    />
                    {!collapsed && <span className="flex-1">{item.name}</span>}

                    {/* Unread badge */}
                    {item.badge !== undefined && (
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          collapsed ? 'absolute -top-1 -right-1 px-1.5 text-[10px]' : ''
                        } bg-rose-500 text-white shadow-sm`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )}

                {/* Render Submenu items */}
                {hasSubmenu && !collapsed && isExpanded && (
                  <div className="ml-5 pl-3 border-l border-zinc-800/80 flex flex-col gap-1 my-1 animate-in fade-in slide-in-from-top-1 duration-150">
                    {item.subItems!.map((sub) => {
                      const isSubActive = pathname === sub.href;
                      const SubIcon = sub.icon;
                      return (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                            isSubActive
                              ? 'bg-teal-500/10 text-teal-400 font-semibold border border-teal-500/20'
                              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
                          }`}
                        >
                          {SubIcon && <SubIcon className="w-3.5 h-3.5 shrink-0 opacity-70" />}
                          <span>{sub.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-zinc-800/80 flex flex-col gap-1">
          {/* Public Website Preview Link */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
            title={collapsed ? 'View Public Site' : undefined}
          >
            <ExternalLink className="w-4 h-4 text-zinc-400 shrink-0" />
            {!collapsed && <span>View Public Site</span>}
          </Link>

          {/* Logout Button */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors w-full text-left"
            title={collapsed ? 'Logout' : undefined}
          >
            <LogOut className="w-4 h-4 text-rose-400 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Logout Confirmation"
        description="Are you sure you want to end your current admin session? You will be redirected to the login page."
        confirmText="Logout"
        variant="warning"
        isLoading={isLoggingOut}
      />
    </>
  );
}
