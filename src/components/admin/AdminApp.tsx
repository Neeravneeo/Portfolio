import React, { useState, useEffect } from 'react';
import { authService, AdminSession } from '../../lib/auth';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';
import { AdminProjects } from './AdminProjects';
import { AdminStorage } from './AdminStorage';
import { AdminMessages } from './AdminMessages';
import { AdminContentSettings } from './AdminContentSettings';
import { AdminAuditLog } from './AdminAuditLog';
import { AdminIntegrations } from './AdminIntegrations';
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
  Activity,
  Network,
} from 'lucide-react';

interface AdminAppProps {
  onBackToPublic: () => void;
  onPreviewProject?: (projectId: string) => void;
}

export type AdminTab =
  | 'dashboard'
  | 'projects'
  | 'storage'
  | 'messages'
  | 'content'
  | 'audit'
  | 'integrations';

export const AdminApp: React.FC<AdminAppProps> = ({ onBackToPublic, onPreviewProject }) => {
  const [session, setSession] = useState<AdminSession | null>(authService.getSession);
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [inboundCount, setInboundCount] = useState<number>(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('portfolio_messages_v1');
      if (stored) {
        const msgs = JSON.parse(stored);
        setInboundCount(msgs.length);
      }
    } catch {
      // ignore
    }
  }, [activeTab]);

  const handleLogout = () => {
    authService.logout();
    setSession(null);
  };

  // If not authenticated, enforce login gate
  if (!session) {
    return (
      <AdminLogin
        onLoginSuccess={(newSession: AdminSession) => setSession(newSession)}
        onBackToPublic={onBackToPublic}
      />
    );
  }

  const tabs: { id: AdminTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard & Telemetry', icon: BarChart3 },
    { id: 'projects', label: 'Projects & Case Studies', icon: Layers },
    { id: 'storage', label: 'Cloudflare R2 Storage', icon: HardDrive },
    { id: 'messages', label: `Inbound Vault (${inboundCount})`, icon: Mail },
    { id: 'content', label: 'Timeline & Settings', icon: Settings },
    { id: 'audit', label: 'Audit Log', icon: Activity },
    { id: 'integrations', label: 'Notion + n8n Pipeline', icon: Network },
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-[#ffffff] flex flex-col justify-between p-4 sm:p-8 font-sans selection:bg-[#8052ff] selection:text-white relative overflow-hidden">
      {/* Background Subtle Gradient Aura */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#8052ff]/10 via-[#15846e]/5 to-transparent blur-3xl pointer-events-none" />

      {/* Admin Studio Top Header */}
      <header className="relative z-10 max-w-7xl w-full mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#8052ff] to-[#15846e] flex items-center justify-center shadow-lg shadow-[#8052ff]/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-semibold tracking-wider text-white">NEERAV.OS KERNEL</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#15846e]/20 text-[#15846e] border border-[#15846e]/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                OWNER SESSION
              </span>
            </div>
            <p className="text-xs text-[#9a9a9a] font-extralight">
              Authenticated as <span className="text-[#8052ff] font-mono">{session.user.email}</span>
            </p>
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
      <main className="relative z-10 max-w-7xl w-full mx-auto my-6 space-y-6 flex-1">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 pb-2 border-b border-white/5 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono transition-all border whitespace-nowrap shrink-0 ${
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

        {/* TAB 1: DASHBOARD & TELEMETRY */}
        {activeTab === 'dashboard' && (
          <AdminDashboard
            onNavigateTab={(tab) => setActiveTab(tab as AdminTab)}
            onOpenProject={onPreviewProject}
          />
        )}

        {/* TAB 2: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <AdminProjects onPreviewProject={onPreviewProject} />
        )}

        {/* TAB 3: CLOUDFLARE R2 STORAGE */}
        {activeTab === 'storage' && <AdminStorage />}

        {/* TAB 4: INBOUND MESSAGES INBOX */}
        {activeTab === 'messages' && <AdminMessages />}

        {/* TAB 5: TIMELINE, LAB & SYSTEM SETTINGS */}
        {activeTab === 'content' && <AdminContentSettings />}

        {/* TAB 6: AUDIT LOG */}
        {activeTab === 'audit' && <AdminAuditLog />}

        {/* TAB 7: NOTION + N8N INTEGRATIONS */}
        {activeTab === 'integrations' && <AdminIntegrations />}
      </main>

      {/* Footer bar */}
      <footer className="z-10 text-center text-[10px] text-[#9a9a9a] border-t border-white/5 pt-4">
        NEERAV.OS KERNEL • OWNER AUTHENTICATED STUDIO • SECURE LOCAL / CLOUDFLARE INTEGRATION
      </footer>
    </div>
  );
};

export default AdminApp;
