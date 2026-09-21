import React, { useState } from 'react';
import {
  Settings,
  Clock,
  FlaskConical,
  Save,
  Download,
  Check,
  Globe,
} from 'lucide-react';
import { journeyMilestones } from '../../data/journeyData';
import { labExperiments } from '../../data/labData';
import { profileData } from '../../data/profileData';
import { JourneyMilestone, LabExperiment } from '../../types';
import { auditService } from '../../lib/audit';

export const AdminContentSettings: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'timeline' | 'lab' | 'settings'>('settings');
  const [profile, setProfile] = useState(profileData);
  const [milestones, setMilestones] = useState<JourneyMilestone[]>(journeyMilestones);
  const [experiments, setExperiments] = useState<LabExperiment[]>(labExperiments);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_profile_custom_v1', JSON.stringify(profile));
    }
    auditService.log('settings_updated', 'profile', 'Updated public contact and profile meta');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const exportFullBackupJSON = () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      profile,
      milestones,
      experiments,
      customProjects: localStorage.getItem('portfolio_projects_custom_v1'),
      messages: localStorage.getItem('portfolio_messages_v1'),
      telemetry: localStorage.getItem('portfolio_telemetry_events_v1'),
      auditLogs: auditService.getLogs(),
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `neerav-portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    auditService.log('settings_updated', 'backup', 'Downloaded full portfolio JSON backup');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <h2 className="text-xl font-normal text-white tracking-tight flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#ffb829]" />
            <span>Timeline, Lab & System Settings</span>
          </h2>
          <p className="text-xs text-[#9a9a9a] font-extralight mt-1">
            Configure public journey timeline, interactive lab prototypes, and global profile metadata without code changes.
          </p>
        </div>

        <button
          onClick={exportFullBackupJSON}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors shrink-0"
        >
          <Download className="w-3.5 h-3.5 text-[#8052ff]" />
          <span>Export Database JSON</span>
        </button>
      </div>

      {/* Sub-tabs */}
      <div className="flex items-center gap-2">
        {[
          { id: 'settings', label: 'Global Profile & Beacon', icon: Globe },
          { id: 'timeline', label: 'Timeline Milestones', icon: Clock },
          { id: 'lab', label: 'Lab Experiments', icon: FlaskConical },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono transition-all border ${
                isActive
                  ? 'bg-white/10 text-white border-white/20'
                  : 'bg-white/[0.02] text-[#9a9a9a] border-white/5 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-2xl bg-[#15846e]/10 border border-[#15846e]/30 flex items-center gap-2 text-xs text-[#15846e] animate-fadeIn">
          <Check className="w-4 h-4 shrink-0" />
          <span>Settings saved and applied successfully.</span>
        </div>
      )}

      {/* SECTION 1: GLOBAL PROFILE */}
      {activeSection === 'settings' && (
        <form onSubmit={handleSaveSettings} className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-mono text-[#9a9a9a]">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-white focus:border-[#8052ff] outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-[#9a9a9a]">Primary Beacon Email</label>
              <input
                type="email"
                value={profile.socialLinks.emailDisplay}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socialLinks: { ...profile.socialLinks, emailDisplay: e.target.value },
                  })
                }
                className="w-full mt-1 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-white focus:border-[#8052ff] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-mono text-[#9a9a9a]">Role & Identity Tagline</label>
            <input
              type="text"
              value={profile.role}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-white focus:border-[#8052ff] outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-mono text-[#9a9a9a]">GitHub Profile URL</label>
              <input
                type="text"
                value={profile.socialLinks.github}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socialLinks: { ...profile.socialLinks, github: e.target.value },
                  })
                }
                className="w-full mt-1 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-white focus:border-[#8052ff] outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-[#9a9a9a]">LinkedIn Profile URL</label>
              <input
                type="text"
                value={profile.socialLinks.linkedin}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socialLinks: { ...profile.socialLinks, linkedin: e.target.value },
                  })
                }
                className="w-full mt-1 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-white focus:border-[#8052ff] outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono text-white bg-[#8052ff] hover:bg-[#8052ff]/90 transition-all shadow-lg shadow-[#8052ff]/25"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save System Settings</span>
            </button>
          </div>
        </form>
      )}

      {/* SECTION 2: TIMELINE MILESTONES */}
      {activeSection === 'timeline' && (
        <div className="space-y-4">
          {milestones.map((m: JourneyMilestone) => (
            <div
              key={m.year}
              className="p-5 rounded-3xl bg-white/[0.02] border border-white/10 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#8052ff]/20 text-[#8052ff] border border-[#8052ff]/30">
                    {m.year}
                  </span>
                  <span className="text-sm font-medium text-white">{m.title}</span>
                </div>
                <span className="text-[11px] font-mono text-[#ffb829]">{m.theme}</span>
              </div>
              <p className="text-xs text-[#bdbdbd] font-extralight">
                Artifact: <span className="text-white font-mono">{m.keyArtifact}</span> • Paradigm Shift: "{m.changed}"
              </p>
            </div>
          ))}
        </div>
      )}

      {/* SECTION 3: LAB EXPERIMENTS */}
      {activeSection === 'lab' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {experiments.map((exp: LabExperiment) => (
            <div
              key={exp.id}
              className="p-5 rounded-3xl bg-white/[0.02] border border-white/10 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">{exp.title}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#15846e]/20 text-[#15846e]">
                  {exp.status}
                </span>
              </div>
              <p className="text-xs text-[#9a9a9a] font-extralight line-clamp-2">{exp.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {exp.tags.map((t) => (
                  <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-white/[0.03] text-[#bdbdbd]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
