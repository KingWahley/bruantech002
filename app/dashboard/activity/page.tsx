import React from 'react';
import { getActivityLogs } from '@/lib/actions/activity';
import { formatDate } from '@/lib/utils';
import { Activity, User, Clock, ShieldCheck } from 'lucide-react';
import Badge from '@/components/dashboard/ui/Badge';

export const metadata = {
  title: 'Activity Logs | Admin Dashboard',
};

export default async function ActivityPage() {
  const logs = await getActivityLogs(50);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-mono text-zinc-100 tracking-tight">Audit Activity Logs</h1>
        <p className="text-xs text-zinc-400 mt-1">Real-time record of all administrative actions and logins</p>
      </div>

      {/* Log Feed Table */}
      <div className="border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-900/60 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950/60 text-xs font-bold text-zinc-400 uppercase tracking-wider">
                <th className="px-4 py-3.5">Timestamp</th>
                <th className="px-4 py-3.5">User</th>
                <th className="px-4 py-3.5">Action Event</th>
                <th className="px-4 py-3.5">Entity</th>
                <th className="px-4 py-3.5">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-xs text-zinc-300">
              {logs.length > 0 ? (
                logs.map((log: any) => (
                  <tr key={log.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="px-4 py-3.5 font-mono text-[11px] text-zinc-400">
                      {formatDate(log.created_at)}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5 font-semibold text-zinc-200">
                        <User className="w-3.5 h-3.5 text-teal-400" />
                        {log.user_email}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-mono font-bold text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded text-[11px]">
                        {log.action}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 capitalize font-medium text-zinc-300">
                      {log.entity_type}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[11px] text-zinc-400 truncate max-w-xs">
                      {JSON.stringify(log.details || {})}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-xs text-zinc-500">
                    No activity logs recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
