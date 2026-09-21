import React, { useState } from 'react';
import { profileData } from '../../data/profileData';
import { usePerspective } from '../../context/PerspectiveContext';
import {
  Mail,
  FileText,
  Send,
  Radio,
  CheckCircle2,
  Terminal,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  onOpenResume?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResume }) => {
  const { isDesigner } = usePerspective();
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [transmissionStatus, setTransmissionStatus] = useState<'idle' | 'sending' | 'transmitted'>('idle');

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderEmail || !senderMessage) return;

    setTransmissionStatus('sending');

    setTimeout(() => {
      setTransmissionStatus('transmitted');
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.8 },
        colors: isDesigner ? ['#8b5cf6', '#ec4899', '#3b82f6'] : ['#10b981', '#06b6d4', '#f59e0b'],
      });
    }, 1000);
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
      {/* Background ambient beacon glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full filter blur-[150px] opacity-20 pointer-events-none ${
          isDesigner ? 'bg-violet-600' : 'bg-emerald-600'
        }`}
      />

      {/* Main Signal Heading */}
      <div className="flex flex-col items-center text-center space-y-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-white/10 text-xs font-mono">
          <Radio className="w-3.5 h-3.5 text-slate-400 animate-pulse" />
          <span className="text-slate-400">06. COMMUNICATION BEACON</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.05]">
          LET'S BUILD
          <br />
          <span
            className={`bg-clip-text text-transparent bg-gradient-to-r ${
              isDesigner
                ? 'from-violet-400 via-fuchsia-300 to-pink-500'
                : 'from-emerald-400 via-teal-300 to-cyan-400'
            }`}
          >
            SOMETHING AMAZING.
          </span>
        </h2>

        <p className="text-slate-300 text-base sm:text-lg max-w-xl">
          Open for product design leadership, distributed systems architecture, and transformative AI collaborations.
        </p>
      </div>

      {/* THE 3D GLOWING COMMUNICATION CORE & RADIATING MATRIX */}
      <div className="relative flex flex-col items-center justify-center py-6 z-10">
        {/* Glowing Central Orb */}
        <div className="relative group cursor-pointer">
          <div
            className={`w-28 h-28 sm:w-36 sm:h-36 rounded-full flex items-center justify-center border transition-all duration-700 ${
              isDesigner
                ? 'bg-gradient-to-tr from-violet-600/30 to-fuchsia-600/40 border-violet-400/60 shadow-glow-designer'
                : 'bg-gradient-to-tr from-emerald-600/30 to-teal-600/40 border-emerald-400/60 shadow-glow-engineer'
            }`}
          >
            {/* Pulsing Core */}
            <div
              className={`w-14 h-14 rounded-full animate-ping opacity-40 ${
                isDesigner ? 'bg-violet-400' : 'bg-emerald-400'
              }`}
            />
            <div
              className={`absolute w-12 h-12 rounded-full flex items-center justify-center text-white font-mono font-bold text-xs ${
                isDesigner ? 'bg-violet-600' : 'bg-emerald-600'
              }`}
            >
              SIGNAL
            </div>
          </div>
        </div>

        {/* Radiating Links Node Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl mt-10">
          <a
            href={profileData.socialLinks.email}
            className="p-4 rounded-2xl glass-panel border border-white/10 hover:border-white/30 flex flex-col items-center justify-center text-center group transition-all"
          >
            <Mail className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            <span className="text-xs font-mono font-semibold text-white mt-2">Email</span>
            <span className="text-[10px] font-mono text-slate-500">Direct Inquiries</span>
          </a>

          <a
            href={profileData.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl glass-panel border border-white/10 hover:border-white/30 flex flex-col items-center justify-center text-center group transition-all"
          >
            <svg className="w-5 h-5 fill-slate-400 group-hover:fill-white transition-colors" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28" />
            </svg>
            <span className="text-xs font-mono font-semibold text-white mt-2">LinkedIn</span>
            <span className="text-[10px] font-mono text-slate-500">Professional Sync</span>
          </a>

          <a
            href={profileData.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl glass-panel border border-white/10 hover:border-white/30 flex flex-col items-center justify-center text-center group transition-all"
          >
            <svg className="w-5 h-5 fill-slate-400 group-hover:fill-white transition-colors" viewBox="0 0 24 24">
              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2" />
            </svg>
            <span className="text-xs font-mono font-semibold text-white mt-2">GitHub</span>
            <span className="text-[10px] font-mono text-slate-500">Repositories</span>
          </a>

          <button
            onClick={onOpenResume}
            className="p-4 rounded-2xl glass-panel border border-white/10 hover:border-white/30 flex flex-col items-center justify-center text-center group transition-all"
          >
            <FileText className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            <span className="text-xs font-mono font-semibold text-white mt-2">Resume</span>
            <span className="text-[10px] font-mono text-slate-500">Curriculum Vitae</span>
          </button>
        </div>
      </div>

      {/* INTERACTIVE SIGNAL TRANSMISSION CONSOLE */}
      <div className="rounded-3xl glass-panel border border-white/15 p-6 sm:p-10 bg-space-950/85 shadow-2xl relative z-10 max-w-2xl mx-auto">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono">
          <span className="flex items-center gap-2 text-slate-300">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>DIRECT MESSAGE TRANSMISSION CONSOLE</span>
          </span>
          <span className="text-emerald-400">ENCRYPTION: AES-256</span>
        </div>

        {transmissionStatus === 'transmitted' ? (
          <div className="py-10 text-center space-y-3 animate-fadeIn">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-xl font-bold text-white">TRANSMISSION RECEIVED</h3>
            <p className="text-xs font-mono text-slate-300">
              Packet successfully relayed to Neerav's autonomous inbox agent. Response expected within 24 hours.
            </p>
            <button
              onClick={() => {
                setTransmissionStatus('idle');
                setSenderMessage('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono text-slate-200"
            >
              TRANSMIT ANOTHER MESSAGE
            </button>
          </div>
        ) : (
          <form onSubmit={handleTransmit} className="space-y-4 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">YOUR NAME</label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Ada Lovelace"
                  className="w-full bg-space-900/80 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-violet-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">YOUR EMAIL</label>
                <input
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="ada@computing.org"
                  className="w-full bg-space-900/80 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-violet-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">MESSAGE TRANSMISSION</label>
              <textarea
                rows={4}
                required
                value={senderMessage}
                onChange={(e) => setSenderMessage(e.target.value)}
                placeholder="Let's build a spatial product together..."
                className="w-full bg-space-900/80 border border-white/10 rounded-xl p-4 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-violet-400 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={transmissionStatus === 'sending'}
              className={`w-full py-3.5 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 text-slate-950 transition-all shadow-lg ${
                isDesigner
                  ? 'bg-gradient-to-r from-violet-400 to-fuchsia-400 hover:opacity-90'
                  : 'bg-gradient-to-r from-emerald-400 to-teal-400 hover:opacity-90'
              } disabled:opacity-50`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{transmissionStatus === 'sending' ? 'TRANSMITTING PACKET...' : 'SEND MESSAGE'}</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
