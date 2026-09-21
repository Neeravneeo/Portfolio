import React, { useState } from 'react';
import { ShieldCheck, Clock, User, Filter, RefreshCw, Trash2, Activity } from 'lucide-react';
import { auditService, AuditLogEntry } from '../../lib/audit';

export const AdminAuditLog: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogEntry[]>(() => auditService.getLogs());
  const [filterAction, setFilterAction] = useState<string>('all');

  const refreshLogs = () => {
    setLogs(auditService.getLogs());
  };

  const handleClearLogs = () => {
    auditService.clearLogs();
    setLogs([]);
  };

  const filteredLogs = logs.filter((log) => {
    if (filterAction === 'all') return true;
    return log.action.includes(filterAction);
  });

  const getActionBadgeColor = (action: string) => {
    if (action.includes('created') || action.includes('published')) {
      return 'bg-[#15846e]/20 text-[#15846e] border-[#15846e]/30';
    }
    if (action.includes('deleted') || action.includes('archived')) {
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
    if (action.includes('media')) {
      return 'bg-[#ffb829]/20 text-[#ffb829] border-[#ffb829]/30';
    }
    return 'bg-[#8052ff]/20 text-[#8052ff] border-[#8052ff]/30';
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <h2 className="text-xl font-normal text-white tracking-tight flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#15846e]" />
            <span>Administrative Audit & Security Log</span>
          </h2>
          <p className="text-xs text-[#9a9a9a] font-extralight mt-1">
            Immutable trace of owner actions, content modifications, and asset operations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={refreshLogs}
            className="flex items-center gap-1.5 text-xs text-[#9a9a9a] hover:text-white px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleClearLogs}
            className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Purge Logs</span>
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['all', 'project', 'media', 'settings', 'message'].map((act) => (
          <button
            key={act}
            onClick={() => setFilterAction(act)}
            className={`px-3 py-1 rounded-full text-xs font-mono capitalize transition-all border ${
              filterAction === act
                ? 'bg-white/10 text-white border-white/20'
                : 'bg-white/[0.02] text-[#9a9a9a] border-white/5 hover:text-white'
            }`}
          >
            {act}
          </button>
        ))}
      </div>

      {/* Log Feed */}
      <div className="space-y-2.5">
        {filteredLogs.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#9a9a9a] border border-dashed border-white/10 rounded-3xl">
            No audit records matching filter.
          </div>
        ) : (
          filteredLogs.map((entry) => (
            <div
              key={entry.id}
              className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${getActionBadgeColor(
                      entry.action
                    )}`}
                  >
                    {entry.action.toUpperCase()}
                  </span>
                  <span className="text-white font-medium">{entry.entity}</span>
                </div>
                <p className="text-[#bdbdbd] font-extralight text-[11px]">{entry.details}</p>
              </div>

              <div className="flex items-center gap-3 text-[10px] font-mono text-[#9a9a9a] shrink-0">
                <span>{entry.actor}</span>
                <span>•</span>
                <span>{new Date(entry.timestamp).toLocaleString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
