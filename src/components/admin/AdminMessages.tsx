import React, { useState, useEffect } from 'react';
import {
  Mail,
  Search,
  Check,
  Trash2,
  Reply,
  RefreshCw,
  Archive,
  Inbox,
  Clock,
  User,
  CheckCircle2,
} from 'lucide-react';
import { auditService } from '../../lib/audit';

interface StoredMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

const STORAGE_KEY_MESSAGES = 'portfolio_messages_v1';

export const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<StoredMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'unread' | 'read'>('all');
  const [selectedMessage, setSelectedMessage] = useState<StoredMessage | null>(null);

  const loadMessages = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_MESSAGES);
      if (stored) {
        setMessages(JSON.parse(stored));
      } else {
        // Seed default sample message for immediate demonstration
        const sample: StoredMessage[] = [
          {
            id: 'msg-sample-1',
            name: 'Sarah Lin',
            email: 'sarah.lin@venture.ai',
            message:
              'Hi Neerav, we reviewed your ALZO spatial design and edge telemetry architecture. We are scaling our intelligent healthcare robotics lab and would love to discuss a Staff Product Designer / Systems Engineer role.',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
            isRead: false,
          },
          {
            id: 'msg-sample-2',
            name: 'Marcus Vance',
            email: 'marcus@hypergrowth.tech',
            message:
              'Incredible work on the GitDrive chunk deduplication algorithm. Would you be open to an advisory chat on decentralized sync systems next week?',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
            isRead: true,
          },
        ];
        setMessages(sample);
        localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(sample));
      }
    } catch {
      setMessages([]);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const persistMessages = (updated: StoredMessage[]) => {
    setMessages(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(updated));
    }
  };

  const handleToggleRead = (id: string, currentRead: boolean) => {
    const updated = messages.map((m) => (m.id === id ? { ...m, isRead: !currentRead } : m));
    persistMessages(updated);
  };

  const handleDelete = (id: string) => {
    const updated = messages.filter((m) => m.id !== id);
    persistMessages(updated);
    auditService.log('message_deleted', id, `Deleted inbound inquiry ID ${id}`);
    if (selectedMessage?.id === id) setSelectedMessage(null);
  };

  const filteredMessages = messages.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterMode === 'all' ? true : filterMode === 'unread' ? !m.isRead : m.isRead;
    return matchesSearch && matchesFilter;
  });

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <h2 className="text-xl font-normal text-white tracking-tight flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#8052ff]" />
            <span>Inbound Communications Vault</span>
            {unreadCount > 0 && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#8052ff] text-white">
                {unreadCount} Unread
              </span>
            )}
          </h2>
          <p className="text-xs text-[#9a9a9a] font-extralight mt-1">
            Private communications relayed from public portfolio contact beacon. Never exposed publicly.
          </p>
        </div>

        <button
          onClick={loadMessages}
          className="flex items-center gap-1.5 text-xs text-[#9a9a9a] hover:text-white px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-colors shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Vault</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9a9a9a]" />
          <input
            type="text"
            placeholder="Search inquiries by sender or text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white/[0.02] border border-white/10 text-xs text-white placeholder-[#9a9a9a] focus:outline-none focus:border-[#8052ff]"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {(['all', 'unread', 'read'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterMode(mode)}
              className={`px-3 py-1 rounded-full text-xs font-mono capitalize transition-all border ${
                filterMode === mode
                  ? 'bg-white/10 text-white border-white/20'
                  : 'bg-white/[0.02] text-[#9a9a9a] border-white/5 hover:text-white'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Feed */}
      <div className="space-y-3">
        {filteredMessages.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#9a9a9a] border border-dashed border-white/10 rounded-3xl">
            No inquiries match your current filter criteria.
          </div>
        ) : (
          filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className={`p-5 rounded-3xl border transition-all space-y-3 ${
                !msg.isRead
                  ? 'bg-white/[0.04] border-[#8052ff]/40 shadow-lg shadow-[#8052ff]/5'
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      !msg.isRead ? 'bg-[#8052ff] animate-pulse' : 'bg-transparent'
                    }`}
                  />
                  <span className="text-sm font-medium text-white">{msg.name}</span>
                  <span className="text-xs font-mono text-[#8052ff]">&lt;{msg.email}&gt;</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-[#9a9a9a]">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(msg.timestamp).toLocaleString()}</span>
                </div>
              </div>

              <p className="text-xs text-[#bdbdbd] font-extralight leading-relaxed pl-4 border-l-2 border-white/10">
                {msg.message}
              </p>

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${msg.email}?subject=${encodeURIComponent(
                      'Re: Inbound Portfolio Communication — Neerav'
                    )}`}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8052ff]/20 text-[#8052ff] hover:bg-[#8052ff]/30 font-mono text-[11px] transition-colors"
                  >
                    <Reply className="w-3 h-3" />
                    <span>Reply via Email</span>
                  </a>

                  <button
                    onClick={() => handleToggleRead(msg.id, msg.isRead)}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/[0.03] hover:bg-white/[0.08] text-[#9a9a9a] hover:text-white text-[11px] font-mono transition-colors"
                  >
                    <Check className="w-3 h-3" />
                    <span>{msg.isRead ? 'Mark as Unread' : 'Mark as Read'}</span>
                  </button>
                </div>

                <button
                  onClick={() => handleDelete(msg.id)}
                  className="p-1.5 rounded-lg text-[#9a9a9a] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Purge message"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
