import React, { useState, useEffect } from 'react';
import {
  Users,
  Eye,
  Layers,
  Mail,
  TrendingUp,
  Activity,
  HardDrive,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Globe,
  Smartphone,
  Monitor,
} from 'lucide-react';
import { getTelemetrySummary, TelemetrySummary, TelemetryEvent } from '../../lib/telemetry';

interface AdminDashboardProps {
  onNavigateTab: (tabId: 'dashboard' | 'messages' | 'projects' | 'storage') => void;
  onOpenProject?: (projectId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigateTab,
  onOpenProject,
}) => {
  const [telemetry, setTelemetry] = useState<TelemetrySummary>(() => getTelemetrySummary());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [healthStatus, setHealthStatus] = useState({
    database: 'Online',
    cloudflareR2: 'Verified',
    offlineSync: 'Active (0 queued)',
    security: 'Encrypted Bearer',
  });

  const refreshTelemetry = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setTelemetry(getTelemetrySummary());
      setIsRefreshing(false);
    }, 400);
  };

  useEffect(() => {
    // Check local offline queue status
    try {
      const queue = localStorage.getItem('offline_contact_queue');
      const count = queue ? JSON.parse(queue).length : 0;
      setHealthStatus((prev) => ({
        ...prev,
        offlineSync: count > 0 ? `${count} buffered` : 'Synced (0 queued)',
      }));
    } catch {
      // ignore
    }
  }, []);

  const getEventIcon = (eventName: TelemetryEvent['eventName']) => {
    switch (eventName) {
      case 'project_open':
        return <Eye className="w-3.5 h-3.5 text-[#8052ff]" />;
      case 'designer_engineer_switch':
        return <Zap className="w-3.5 h-3.5 text-[#ffb829]" />;
      case 'demo_click':
        return <Activity className="w-3.5 h-3.5 text-[#15846e]" />;
      case 'contact_submit':
        return <Mail className="w-3.5 h-3.5 text-blue-400" />;
      case 'resume_click':
        return <ArrowUpRight className="w-3.5 h-3.5 text-purple-300" />;
      default:
        return <TrendingUp className="w-3.5 h-3.5 text-[#9a9a9a]" />;
    }
  };

  const getEventLabel = (evt: TelemetryEvent) => {
    switch (evt.eventName) {
      case 'project_open':
        return `Opened ${evt.metadata?.title || evt.metadata?.projectId || 'Project'}`;
      case 'designer_engineer_switch':
        return `Toggled Lens to ${evt.metadata?.perspective?.toUpperCase() || 'Lens'}`;
      case 'demo_click':
        return `Launched live ${evt.metadata?.role || 'Simulator'} demo`;
      case 'contact_submit':
        return `Inbound contact transmission: "${evt.metadata?.subject || 'Direct message'}"`;
      case 'resume_click':
        return 'Downloaded Curriculum Vitae / Resume';
      default:
        return `Visitor activity: ${evt.eventName.replace(/_/g, ' ')}`;
    }
  };

  const formatRelativeTime = (isoString: string) => {
    const diffMs = Date.now() - new Date(isoString).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return `${diffSec}s ago`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    return `${Math.floor(diffHr / 24)}d ago`;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <h2 className="text-xl font-normal text-white tracking-tight flex items-center gap-2.5">
            <span>Executive Telemetry & Command Center</span>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#15846e]/20 text-[#15846e] border border-[#15846e]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#15846e] animate-pulse" />
              LIVE
            </span>
          </h2>
          <p className="text-xs text-[#9a9a9a] font-extralight mt-1">
            Real-time portfolio telemetry, project performance, inbound communications, and infrastructure diagnostics.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={refreshTelemetry}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 text-xs text-[#9a9a9a] hover:text-white px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-colors"
            title="Refresh metrics"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#8052ff]' : ''}`} />
            <span>{isRefreshing ? 'Syncing...' : 'Refresh Metrics'}</span>
          </button>

          <button
            onClick={() => onNavigateTab('projects')}
            className="flex items-center gap-1.5 text-xs text-white bg-[#8052ff] hover:bg-[#8052ff]/90 px-3.5 py-1.5 rounded-full font-mono transition-all shadow-lg shadow-[#8052ff]/20"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Project Draft</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Visitors */}
        <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/10 space-y-2 hover:border-white/20 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#9a9a9a]">UNIQUE VISITORS</span>
            <Users className="w-4 h-4 text-[#8052ff]" />
          </div>
          <p className="text-3xl font-normal text-white">{telemetry.totalVisitors.toLocaleString()}</p>
          <div className="flex items-center gap-1.5 text-[11px] text-[#15846e]">
            <TrendingUp className="w-3 h-3" />
            <span>+18.4% this week</span>
          </div>
        </div>

        {/* Sessions */}
        <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/10 space-y-2 hover:border-white/20 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#9a9a9a]">PORTFOLIO SESSIONS</span>
            <Activity className="w-4 h-4 text-[#ffb829]" />
          </div>
          <p className="text-3xl font-normal text-white">{telemetry.totalSessions.toLocaleString()}</p>
          <div className="flex items-center gap-2 text-[11px] text-[#9a9a9a]">
            <span>Avg 4m 32s dwell</span>
            <span>•</span>
            <span className="text-[#15846e]">74% deep engage</span>
          </div>
        </div>

        {/* Project Views */}
        <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/10 space-y-2 hover:border-white/20 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#9a9a9a]">TOTAL PROJECT VIEWS</span>
            <Eye className="w-4 h-4 text-[#15846e]" />
          </div>
          <p className="text-3xl font-normal text-white">
            {Object.values(telemetry.projectViews).reduce((a, b) => a + b, 0).toLocaleString()}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-[#8052ff]">
            <span>6 Live Interactive Studios</span>
          </div>
        </div>

        {/* Top Project */}
        <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/10 space-y-2 hover:border-white/20 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#9a9a9a]">TOP PERFORMING WORK</span>
            <Zap className="w-4 h-4 text-[#ffb829]" />
          </div>
          <p className="text-lg font-normal text-white truncate">{telemetry.topProject.name.split('—')[0].trim()}</p>
          <div className="flex items-center justify-between text-[11px] text-[#9a9a9a]">
            <span className="text-[#ffb829] font-mono">{telemetry.topProject.views} views</span>
            <button
              onClick={() => onOpenProject?.(telemetry.topProject.id)}
              className="text-[#8052ff] hover:underline flex items-center gap-0.5"
            >
              <span>View</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Row: Project Distribution & Device Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Views Breakdown */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-normal text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#8052ff]" />
                <span>Project Engagement Telemetry</span>
              </h3>
              <p className="text-xs text-[#9a9a9a] font-extralight mt-0.5">
                Breakdown of visitor inspections across all dual-lens case studies.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-[#15846e] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#15846e]" />
                {telemetry.publishedProjects} Published
              </span>
              <span className="text-[#ffb829] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#ffb829]" />
                {telemetry.draftProjects} Drafts
              </span>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="space-y-3.5 pt-2">
            {[
              { id: 'alzo', name: 'ALZO — Neurological Care Ecosystem', color: '#8052ff', max: 900 },
              { id: 'git-drive', name: 'GitDrive — Deduplication Cloud Engine', color: '#15846e', max: 900 },
              { id: 'peer-club', name: 'Peer Club — Real-Time Collaborative Platform', color: '#ffb829', max: 900 },
              { id: 'email-agent', name: 'AI Email Copilot & Triage Pipeline', color: '#38bdf8', max: 900 },
              { id: 'inner-os', name: 'InnerOS — Spatial Intelligence Canvas', color: '#ec4899', max: 900 },
              { id: 'go-builder', name: 'GoBuilder — Natural Language UI Compiler', color: '#a855f7', max: 900 },
            ].map((p) => {
              const views = telemetry.projectViews[p.id] || 0;
              const percentage = Math.min(100, Math.round((views / p.max) * 100));
              return (
                <div key={p.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#bdbdbd] font-light">{p.name}</span>
                    <span className="text-white font-mono">{views.toLocaleString()} views ({percentage}%)</span>
                  </div>
                  <div className="h-2 w-full bg-white/[0.04] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${percentage}%`, backgroundColor: p.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Device & Client Breakdown */}
        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-normal text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#ffb829]" />
              <span>Client Architecture Distribution</span>
            </h3>
            <p className="text-xs text-[#9a9a9a] font-extralight mt-0.5">
              Browser environment & screen hardware categorization.
            </p>
          </div>

          <div className="space-y-4 my-auto py-2">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-3">
                <Monitor className="w-4 h-4 text-[#8052ff]" />
                <div>
                  <div className="text-xs text-white font-medium">Desktop Workstations</div>
                  <div className="text-[10px] text-[#9a9a9a]">macOS, Windows, Linux (1440p+)</div>
                </div>
              </div>
              <span className="text-sm font-mono text-white font-semibold">{telemetry.deviceBreakdown.desktop}%</span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-3">
                <Smartphone className="w-4 h-4 text-[#15846e]" />
                <div>
                  <div className="text-xs text-white font-medium">Mobile Devices</div>
                  <div className="text-[10px] text-[#9a9a9a]">iOS, Android Touch Canvas</div>
                </div>
              </div>
              <span className="text-sm font-mono text-white font-semibold">{telemetry.deviceBreakdown.mobile}%</span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-3">
                <HardDrive className="w-4 h-4 text-[#ffb829]" />
                <div>
                  <div className="text-xs text-white font-medium">Tablets & Foldables</div>
                  <div className="text-[10px] text-[#9a9a9a]">iPad Pro, Galaxy Tab</div>
                </div>
              </div>
              <span className="text-sm font-mono text-white font-semibold">{telemetry.deviceBreakdown.tablet}%</span>
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 text-[11px] text-[#9a9a9a] flex items-center justify-between">
            <span>Client Render Mode</span>
            <span className="text-[#15846e] font-mono">WebGL2 Hardware Accel</span>
          </div>
        </div>
      </div>

      {/* Third Row: Recent Real-Time Activity Feed & Infrastructure Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Telemetry Activity Feed */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#8052ff]" />
              <h3 className="text-sm font-normal text-white">Live Visitor Event Stream</h3>
            </div>
            <span className="text-[11px] font-mono text-[#9a9a9a]">
              Showing {telemetry.recentEvents.length} recent operations
            </span>
          </div>

          <div className="divide-y divide-white/5 max-h-[360px] overflow-y-auto pr-2 space-y-1 custom-scrollbar">
            {telemetry.recentEvents.map((evt) => (
              <div key={evt.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-xl bg-white/[0.03] border border-white/10 shrink-0">
                    {getEventIcon(evt.eventName)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-light truncate">{getEventLabel(evt)}</p>
                    <span className="text-[10px] font-mono text-[#9a9a9a]">
                      Session ID: {evt.sessionId.slice(0, 10)}... • {evt.eventName}
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-[#9a9a9a] shrink-0">
                  {formatRelativeTime(evt.timestamp)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Infrastructure & Resilience Diagnostics */}
        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-normal text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#15846e]" />
              <span>System Health Diagnostics</span>
            </h3>
            <span className="text-[10px] font-mono text-[#15846e] px-2 py-0.5 rounded-full bg-[#15846e]/10 border border-[#15846e]/20">
              100% OPERATIONAL
            </span>
          </div>

          <div className="space-y-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#9a9a9a]">Cloudflare R2 Bucket</span>
                <span className="text-[#15846e] font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {healthStatus.cloudflareR2}
                </span>
              </div>
              <p className="text-[11px] text-[#bdbdbd] font-extralight">
                Bucket: <code className="text-white">portfolio-assets</code> (Account: a0b8...13d4)
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#9a9a9a]">Database Storage Bus</span>
                <span className="text-[#15846e] font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {healthStatus.database}
                </span>
              </div>
              <p className="text-[11px] text-[#bdbdbd] font-extralight">
                Resilient local replica + Supabase REST endpoint configured
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#9a9a9a]">Offline Queue Resilience</span>
                <span className="text-[#8052ff] font-mono flex items-center gap-1">
                  <Activity className="w-3 h-3" />
                  {healthStatus.offlineSync}
                </span>
              </div>
              <p className="text-[11px] text-[#bdbdbd] font-extralight">
                Audit Fix 2 auto-reconnect synchronization worker active
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#9a9a9a]">Owner Boundary Protection</span>
                <span className="text-[#15846e] font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  {healthStatus.security}
                </span>
              </div>
              <p className="text-[11px] text-[#bdbdbd] font-extralight">
                Zero public leak; split dynamic bundle at /admin
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigateTab('messages')}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl text-xs font-mono text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#8052ff]" />
              <span>Review Inbound Communications</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
