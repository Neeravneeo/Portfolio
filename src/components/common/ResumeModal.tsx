import React from 'react';
import { X, Download, FileText, CheckCircle2, ExternalLink } from 'lucide-react';
import { profileData } from '../../data/profileData';
import { usePerspective } from '../../context/PerspectiveContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { isDesigner } = usePerspective();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl glass-panel border border-white/20 bg-space-950 p-6 sm:p-8 flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                isDesigner ? 'bg-violet-600/20 text-violet-300' : 'bg-emerald-600/20 text-emerald-300'
              }`}
            >
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">NEERAV — CURRICULUM VITAE</h3>
              <p className="text-xs font-mono text-slate-400">Designer × Engineer × AI × Automation</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-mono text-white border border-white/10"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PRINT / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white bg-white/5 hover:bg-white/10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Body Content */}
        <div className="overflow-y-auto space-y-6 pt-4 pr-2 text-xs leading-relaxed">
          {/* Summary */}
          <div className="p-4 rounded-xl bg-space-900 border border-white/5 space-y-2">
            <span className="font-mono text-[11px] font-bold text-slate-400 uppercase">EXECUTIVE SUMMARY</span>
            <p className="text-slate-200">
              {profileData.bio} Specialized in building cognitive health systems (ALZO), multiplayer
              CRDT collaboration environments (Peer Club), and autonomous n8n agentic workflows.
            </p>
          </div>

          {/* Core Competencies */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-space-900 border border-white/5 space-y-2">
              <span className="font-mono text-[11px] font-bold text-violet-400 uppercase">DESIGN & PRODUCT</span>
              <ul className="space-y-1 text-slate-300 font-mono text-[11px]">
                <li>• Neuro-accessible Design (WCAG AAA)</li>
                <li>• Design Systems (Figma Tokens to React Code)</li>
                <li>• Clinical User Research & Journey Mapping</li>
                <li>• Spatial UI & Ambient Computing</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-space-900 border border-white/5 space-y-2">
              <span className="font-mono text-[11px] font-bold text-emerald-400 uppercase">ENGINEERING & ARCHITECTURE</span>
              <ul className="space-y-1 text-slate-300 font-mono text-[11px]">
                <li>• React / Next.js / TypeScript / Go</li>
                <li>• Real-time Edge Telemetry (WebSockets, Kafka)</li>
                <li>• Yjs CRDTs & WebRTC Multiplayer State</li>
                <li>• Autonomous Agent Pipelines (n8n, LLM Function Calling)</li>
              </ul>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-3">
            <span className="font-mono text-[11px] font-bold text-slate-400 uppercase">SELECTED EXPERIENCE</span>
            {profileData.experience.map((exp, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-space-900/60 border border-white/5 space-y-1.5">
                <div className="flex justify-between font-bold text-white text-sm">
                  <span>{exp.role}</span>
                  <span className="text-slate-400 font-mono text-xs">{exp.period}</span>
                </div>
                <div className="text-violet-400 font-mono text-xs">{exp.company}</div>
                <p className="text-slate-300 text-xs">{exp.description}</p>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-2">
            <span className="font-mono text-[11px] font-bold text-slate-400 uppercase">EDUCATION</span>
            {profileData.education.map((edu, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-space-900/60 border border-white/5">
                <div className="font-bold text-white text-sm">{edu.degree}</div>
                <div className="text-slate-400 font-mono">{edu.institution} ({edu.period})</div>
                <div className="text-emerald-400 font-mono text-[11px] mt-1">{edu.focus}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between shrink-0 text-xs font-mono text-slate-400">
          <span>Contact: neerav@example.com</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
