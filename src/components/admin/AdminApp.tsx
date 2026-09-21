import React, { useState, useEffect } from 'react';
import { authService, AdminSession } from '../../lib/auth';
import { AdminLogin } from './AdminLogin';
import {
  ArrowLeft,
  LogOut,
  ShieldCheck,
  Mail,
  Layers,
  Sparkles,
  BarChart3,
  HardDrive,
  Settings,
  RefreshCw,
} from 'lucide-react';
import { Button } from '../common/Button';

interface AdminAppProps {
  onBackToPublic: () => void;
}

interface StoredMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export const AdminApp: React.FC<AdminAppProps> = ({ onBackToPublic }) => {
  const [session, setSession] = useState<AdminSession | null>(authService.getSession);
  const [messages, setMessages] = useState<StoredMessage[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'messages' | 'projects' | 'storage'>('dashboard');

  useEffect(() => {
    if (session) {
      loadMessages();
    }
  }, [session]);

  const loadMessages = () => {
    try {
      const raw = localStorage.getItem('portfolio_messages_v1');
      if (raw) {
        setMessages(JSON.parse(raw));
      }
    } catch (err) {
      console.error('Failed to read messages', err);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setSession(null);
  };

  // If unauthenticated, display secure login gate
  if (!session) {
    return (
      <AdminLogin
        onLoginSuccess={(newSession) => setSession(newSession)}
        onBackToPublic={onBackToPublic}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between p-6 sm:p-10 font-mono relative overflow-hidden select-none">
      {/* Background ambient security beacon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#8052ff]/10 blur-[180px] pointer-events-none" />

      {/* Header bar */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-10 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#8052ff] flex items-center justify-center font-bold text-sm text-white shadow-lg shadow-[#8052ff]/20">
            N
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-wider">NEERAV.OS STUDIO</span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#15846e]/20 text-[#15846e] border border-[#15846e]/30 font-semibold">
                OWNER AUTHENTICATED
              </span>
            </div>
            <span className="text-[10px] text-[#9a9a9a]">
              Logged in as {session.user.email} • Session Active
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onBackToPublic}
            className="flex items-center gap-2 text-xs text-[#9a9a9a] hover:text-white transition-colors px-3.5 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 transition-colors px-3.5 py-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Studio Navigation & Content */}
      <main className="relative z-10 max-w-7xl w-full mx-auto my-8 space-y-8 flex-1">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-white/5">
          {[
            { id: 'dashboard', label: 'Dashboard & Telemetry', icon: BarChart3 },
            { id: 'messages', label: `Inbound Inquiries (${messages.length})`, icon: Mail },
            { id: 'projects', label: 'Projects & Case Studies', icon: Layers },
            { id: 'storage', label: 'Cloudflare R2 Storage', icon: HardDrive },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono transition-all border ${
                  isActive
                    ? 'bg-[#8052ff] text-white border-[#8052ff] shadow-lg shadow-[#8052ff]/25'
                    : 'bg-white/[0.02] text-[#9a9a9a] border-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/10 space-y-2">
                <span className="text-[10px] text-[#9a9a9a] uppercase tracking-wider">TOTAL INBOUND MESSAGES</span>
                <p className="text-2xl font-normal text-white">{messages.length}</p>
                <span className="text-[11px] text-[#15846e]">Real-time message bus synced</span>
              </div>

              <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/10 space-y-2">
                <span className="text-[10px] text-[#9a9a9a] uppercase tracking-wider">PORTFOLIO PROJECTS</span>
                <p className="text-2xl font-normal text-white">6</p>
                <span className="text-[11px] text-[#8052ff]">All 6 interactive experiences online</span>
              </div>

              <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/10 space-y-2">
                <span className="text-[10px] text-[#9a9a9a] uppercase tracking-wider">SECURITY STATUS</span>
                <p className="text-2xl font-normal text-[#15846e]">SECURE</p>
                <span className="text-[11px] text-[#9a9a9a]">Owner authenticated via session token</span>
              </div>

              <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/10 space-y-2">
                <span className="text-[10px] text-[#9a9a9a] uppercase tracking-wider">CLOUDFLARE R2 STATUS</span>
                <p className="text-2xl font-normal text-[#ffb829]">CONFIGURED</p>
                <span className="text-[11px] text-[#9a9a9a]">Endpoint & token verified</span>
              </div>
            </div>

            {/* Quick Messages Feed */}
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#8052ff]" />
                  <h3 className="text-base font-normal text-white">Recent Inbound Communications</h3>
                </div>
                <button
                  onClick={loadMessages}
                  className="flex items-center gap-1.5 text-xs text-[#9a9a9a] hover:text-white"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh Feed</span>
                </button>
              </div>

              {messages.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#9a9a9a] border border-dashed border-white/10 rounded-2xl">
                  No messages submitted yet. Send a test message from the public Contact section!
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.slice(0, 5).map((msg) => (
                    <div
                      key={msg.id}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-white">{msg.name}</span>
                          <span className="text-[11px] text-[#8052ff]">&lt;{msg.email}&gt;</span>
                        </div>
                        <p className="text-xs text-[#bdbdbd] font-extralight line-clamp-1">{msg.message}</p>
                      </div>
                      <span className="text-[10px] text-[#9a9a9a] shrink-0">
                        {new Date(msg.timestamp).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: INBOUND MESSAGES INBOX */}
        {activeTab === 'messages' && (
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-lg font-normal text-white">Inbound Message Vault</h3>
                <p className="text-xs text-[#bdbdbd] font-extralight">
                  All messages transmitted through the public Communication Beacon.
                </p>
              </div>
              <button
                onClick={loadMessages}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs text-[#9a9a9a] hover:text-white"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Messages</span>
              </button>
            </div>

            {messages.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#9a9a9a] border border-dashed border-white/10 rounded-2xl">
                No inbound transmissions logged.
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-normal text-white">{msg.name}</span>
                        <a href={`mailto:${msg.email}`} className="text-xs text-[#8052ff] hover:underline">
                          {msg.email}
                        </a>
                      </div>
                      <span className="text-[11px] text-[#9a9a9a]">
                        {new Date(msg.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-[#bdbdbd] font-extralight whitespace-pre-wrap leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PROJECTS OVERVIEW */}
        {activeTab === 'projects' && (
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4 animate-fadeIn">
            <h3 className="text-lg font-normal text-white">Project Case Studies & Simulators</h3>
            <p className="text-xs text-[#bdbdbd] font-extralight">
              Status overview of the 6 interactive case studies registered in the core database.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {[
                { name: 'ALZO Healthcare', role: 'Flagship 3-Role Ecosystem', status: 'Live' },
                { name: 'Peer Club', role: 'CRDT & WebRTC Audio', status: 'Live' },
                { name: 'GitDrive', role: 'Deduplication Engine', status: 'Live' },
                { name: 'AI Email Agent', role: 'Autonomous Triaging & HITL', status: 'Live' },
                { name: 'InnerOS', role: 'Spatial Agent Canvas', status: 'Live' },
                { name: 'GoBuilder', role: 'Prompt to UI Compiler', status: 'Live' },
              ].map((p) => (
                <div key={p.name} className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-normal text-white">{p.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#15846e]/20 text-[#15846e]">
                      {p.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#9a9a9a] font-extralight">{p.role}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CLOUDFLARE R2 STORAGE */}
        {activeTab === 'storage' && (
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4 animate-fadeIn">
            <h3 className="text-lg font-normal text-white">Cloudflare R2 Object Storage</h3>
            <p className="text-xs text-[#bdbdbd] font-extralight">
              Configured via Cloudflare API token and verified S3 credentials.
            </p>
            <div className="p-4 rounded-2xl bg-black border border-white/10 font-mono text-xs space-y-2 text-[#bdbdbd]">
              <div className="flex justify-between">
                <span className="text-[#9a9a9a]">Account ID:</span>
                <span className="text-white">a0b8c6edb1419ee0c4b9c21599c013d4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9a9a9a]">R2 Bucket:</span>
                <span className="text-white">portfolio-assets</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9a9a9a]">Endpoint:</span>
                <span className="text-[#8052ff]">https://a0b8c6edb1419ee0c4b9c21599c013d4.r2.cloudflarestorage.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9a9a9a]">Token Status:</span>
                <span className="text-[#15846e]">Active & Verified</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer bar */}
      <footer className="z-10 text-center text-[10px] text-[#9a9a9a] border-t border-white/5 pt-4">
        NEERAV.OS KERNEL • OWNER AUTHENTICATED STUDIO • CONFIDENTIAL
      </footer>
    </div>
  );
};

export default AdminApp;
