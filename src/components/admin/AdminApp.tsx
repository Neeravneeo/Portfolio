import React from 'react';
import { ArrowLeft, Lock, Terminal, ShieldAlert } from 'lucide-react';
import { Button } from '../common/Button';

interface AdminAppProps {
  onBackToPublic: () => void;
}

export const AdminApp: React.FC<AdminAppProps> = ({ onBackToPublic }) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between p-6 sm:p-12 font-mono relative overflow-hidden select-none">
      {/* Background ambient security beacon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#8052ff]/10 blur-[150px] pointer-events-none" />

      {/* Header bar */}
      <header className="flex items-center justify-between z-10 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#8052ff] flex items-center justify-center font-bold text-xs text-white">
            N
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-wider">NEERAV.OS</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                ADMIN BOUNDARY
              </span>
            </div>
            <span className="text-[10px] text-slate-500">
              OWNER RESTRICTED • SECURE KERNEL
            </span>
          </div>
        </div>

        <button
          onClick={onBackToPublic}
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Public Portfolio</span>
        </button>
      </header>

      {/* Main Admin Boundary Welcome Stage */}
      <main className="relative z-10 max-w-xl mx-auto text-center space-y-6 my-auto py-12">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-[#8052ff]/10 border border-[#8052ff]/30 flex items-center justify-center text-[#8052ff] shadow-glow-designer">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-3">
          <span className="text-xs text-[#ffb829] tracking-widest uppercase font-semibold">
            PHASE 2 BOUNDARY ACTIVE
          </span>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-white font-sans">
            Private Admin Studio
          </h1>
          <p className="text-xs sm:text-sm text-[#bdbdbd] font-sans font-extralight leading-relaxed max-w-md mx-auto">
            The admin route boundary is established. Full Supabase Owner authentication, CRUD management, telemetry, and media library unlock in Phase 10–17.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-left space-y-2 text-xs">
          <div className="flex items-center gap-2 text-slate-300 font-bold">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>SECURITY SPECIFICATION (TRD §4)</span>
          </div>
          <ul className="text-slate-400 text-[11px] space-y-1 list-disc list-inside">
            <li>Zero exposure in public navigation bar or footer links.</li>
            <li>Direct route protection at <code className="text-violet-300">/admin</code>.</li>
            <li>Owner shortcut: <code className="text-amber-300">Ctrl+Shift+A</code>.</li>
            <li>Lazy-loaded code chunk excluded from public visitor bundle.</li>
          </ul>
        </div>

        <div className="flex items-center justify-center gap-4 pt-2">
          <Button variant="pill" size="md" onClick={onBackToPublic}>
            Return to Public Portfolio
          </Button>
        </div>
      </main>

      {/* Footer bar */}
      <footer className="z-10 text-center text-[10px] text-slate-600 border-t border-white/5 pt-4">
        NEERAV.OS KERNEL • ROUTE BOUNDARY ACTIVE • CONFIDENTIAL
      </footer>
    </div>
  );
};

export default AdminApp;
