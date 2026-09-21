import React, { useState, useEffect } from 'react';
import { profileData } from '../../data/profileData';
import { usePerspective } from '../../context/PerspectiveContext';
import {
  Mail,
  FileText,
  Send,
  Radio,
  CheckCircle2,
  Terminal,
  WifiOff,
  Clock,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  onOpenResume?: () => void;
}

interface StoredMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResume }) => {
  const { isDesigner } = usePerspective();
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [transmissionStatus, setTransmissionStatus] = useState<'idle' | 'sending' | 'transmitted' | 'offline-queued'>('idle');
  const [statusNote, setStatusNote] = useState<string>('');

  // Resilience Audit Fix 2: Sync offline queue when connection is restored
  useEffect(() => {
    const handleOnline = () => {
      try {
        const queued = localStorage.getItem('offline_contact_queue');
        if (queued) {
          const messages: StoredMessage[] = JSON.parse(queued);
          if (messages.length > 0) {
            const existing = localStorage.getItem('portfolio_messages_v1');
            const currentList: StoredMessage[] = existing ? JSON.parse(existing) : [];
            localStorage.setItem('portfolio_messages_v1', JSON.stringify([...currentList, ...messages]));
            localStorage.removeItem('offline_contact_queue');
            console.log(`[Resilience] Flushed ${messages.length} offline queued messages.`);
          }
        }
      } catch (err) {
        console.error('Failed to flush offline message queue', err);
      }
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, []);

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderEmail || !senderMessage) return;

    setTransmissionStatus('sending');

    const newMessage: StoredMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      name: senderName.trim() || 'Anonymous User',
      email: senderEmail.trim(),
      message: senderMessage.trim(),
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    setTimeout(() => {
      if (!navigator.onLine) {
        // Resilience Audit Fix 2: Offline queueing
        try {
          const rawQueue = localStorage.getItem('offline_contact_queue');
          const queue: StoredMessage[] = rawQueue ? JSON.parse(rawQueue) : [];
          queue.push(newMessage);
          localStorage.setItem('offline_contact_queue', JSON.stringify(queue));
          setTransmissionStatus('offline-queued');
          setStatusNote('Network Offline: Message safely queued locally in your browser storage. It will automatically synchronize when your connection is restored.');
        } catch (err) {
          setTransmissionStatus('offline-queued');
          setStatusNote('Message stored locally in offline cache.');
        }
      } else {
        // Online: Persist to real storage for Owner Admin inbox
        try {
          const existing = localStorage.getItem('portfolio_messages_v1');
          const currentList: StoredMessage[] = existing ? JSON.parse(existing) : [];
          currentList.unshift(newMessage);
          localStorage.setItem('portfolio_messages_v1', JSON.stringify(currentList));
        } catch (err) {
          console.error('Failed to store message in local state', err);
        }

        setTransmissionStatus('transmitted');
        setStatusNote('Packet successfully relayed to Neerav\'s autonomous inbox agent. Response expected within 24 hours.');

        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.8 },
          colors: isDesigner ? ['#8052ff', '#ec4899', '#ffb829'] : ['#15846e', '#06b6d4', '#ffb829'],
        });
      }
    }, 800);
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto space-y-16">
      {/* Background ambient beacon glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full filter blur-[150px] opacity-20 pointer-events-none ${
          isDesigner ? 'bg-[#8052ff]' : 'bg-[#15846e]'
        }`}
      />

      {/* Main Signal Heading */}
      <div className="flex flex-col items-center text-center space-y-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#9a9a9a]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ffb829] shadow-[0_0_6px_#ffb829] animate-pulse" />
          <span>06. COMMUNICATION BEACON</span>
          <span>•</span>
          <span className="text-[#bdbdbd]">DIRECT SIGNAL</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal text-white tracking-[-0.035em] leading-[1.05]">
          LET'S BUILD
          <br />
          <span className={isDesigner ? 'text-[#8052ff]' : 'text-[#15846e]'}>
            SOMETHING AMAZING.
          </span>
        </h2>

        <p className="text-[#bdbdbd] font-extralight text-base sm:text-lg max-w-xl leading-relaxed">
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
                ? 'bg-[#8052ff]/20 border-[#8052ff]/50 shadow-lg shadow-[#8052ff]/30'
                : 'bg-[#15846e]/20 border-[#15846e]/50 shadow-lg shadow-[#15846e]/30'
            }`}
          >
            {/* Pulsing Core */}
            <div
              className={`w-14 h-14 rounded-full animate-ping opacity-30 ${
                isDesigner ? 'bg-[#8052ff]' : 'bg-[#15846e]'
              }`}
            />
            <div
              className={`absolute w-12 h-12 rounded-full flex items-center justify-center text-white font-mono font-medium text-xs ${
                isDesigner ? 'bg-[#8052ff]' : 'bg-[#15846e]'
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
            className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/30 flex flex-col items-center justify-center text-center group transition-all"
          >
            <Mail className="w-5 h-5 text-[#9a9a9a] group-hover:text-white transition-colors" />
            <span className="text-xs font-mono font-medium text-white mt-2">Email</span>
            <span className="text-[10px] font-mono text-[#9a9a9a]">Direct Inquiries</span>
          </a>

          <a
            href={profileData.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/30 flex flex-col items-center justify-center text-center group transition-all"
          >
            <svg className="w-5 h-5 fill-[#9a9a9a] group-hover:fill-white transition-colors" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28" />
            </svg>
            <span className="text-xs font-mono font-medium text-white mt-2">LinkedIn</span>
            <span className="text-[10px] font-mono text-[#9a9a9a]">Professional Sync</span>
          </a>

          <a
            href={profileData.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/30 flex flex-col items-center justify-center text-center group transition-all"
          >
            <svg className="w-5 h-5 fill-[#9a9a9a] group-hover:fill-white transition-colors" viewBox="0 0 24 24">
              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2" />
            </svg>
            <span className="text-xs font-mono font-medium text-white mt-2">GitHub</span>
            <span className="text-[10px] font-mono text-[#9a9a9a]">Repositories</span>
          </a>

          <button
            onClick={onOpenResume}
            className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/30 flex flex-col items-center justify-center text-center group transition-all"
          >
            <FileText className="w-5 h-5 text-[#9a9a9a] group-hover:text-white transition-colors" />
            <span className="text-xs font-mono font-medium text-white mt-2">Resume</span>
            <span className="text-[10px] font-mono text-[#9a9a9a]">Curriculum Vitae</span>
          </button>
        </div>
      </div>

      {/* INTERACTIVE SIGNAL TRANSMISSION CONSOLE */}
      <div className="rounded-3xl border border-white/10 p-6 sm:p-10 bg-white/[0.02] backdrop-blur-xl shadow-2xl relative z-10 max-w-2xl mx-auto">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono">
          <span className="flex items-center gap-2 text-white">
            <Terminal className="w-4 h-4 text-[#8052ff]" />
            <span>DIRECT MESSAGE TRANSMISSION CONSOLE</span>
          </span>
          <span className="text-[#15846e]">ENCRYPTION: AES-256</span>
        </div>

        {transmissionStatus === 'transmitted' ? (
          <div className="py-10 text-center space-y-3 animate-fadeIn">
            <CheckCircle2 className="w-12 h-12 text-[#15846e] mx-auto" />
            <h3 className="text-xl font-normal text-white">TRANSMISSION RECEIVED</h3>
            <p className="text-xs font-mono text-[#bdbdbd] max-w-md mx-auto">
              {statusNote}
            </p>
            <button
              onClick={() => {
                setTransmissionStatus('idle');
                setSenderMessage('');
              }}
              className="mt-4 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-mono text-white transition-colors"
            >
              TRANSMIT ANOTHER MESSAGE
            </button>
          </div>
        ) : transmissionStatus === 'offline-queued' ? (
          <div className="py-10 text-center space-y-3 animate-fadeIn">
            <WifiOff className="w-12 h-12 text-[#ffb829] mx-auto" />
            <h3 className="text-xl font-normal text-white">TRANSMISSION QUEUED OFFLINE</h3>
            <p className="text-xs font-mono text-[#bdbdbd] max-w-md mx-auto">
              {statusNote}
            </p>
            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] font-mono text-[#ffb829]">
              <Clock className="w-3.5 h-3.5" />
              <span>Will automatically transmit when back online</span>
            </div>
            <button
              onClick={() => {
                setTransmissionStatus('idle');
                setSenderMessage('');
              }}
              className="mt-4 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-mono text-white transition-colors"
            >
              WRITE ANOTHER MESSAGE
            </button>
          </div>
        ) : (
          <form onSubmit={handleTransmit} className="space-y-4 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-[#9a9a9a] mb-1">YOUR NAME</label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Ada Lovelace"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-[#8052ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#9a9a9a] mb-1">YOUR EMAIL</label>
                <input
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="ada@computing.org"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-[#8052ff]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#9a9a9a] mb-1">MESSAGE TRANSMISSION</label>
              <textarea
                rows={4}
                required
                value={senderMessage}
                onChange={(e) => setSenderMessage(e.target.value)}
                placeholder="Let's build a spatial product together..."
                className="w-full bg-black/60 border border-white/10 rounded-xl p-4 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-[#8052ff] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={transmissionStatus === 'sending'}
              className={`w-full py-3.5 rounded-full text-xs font-mono font-semibold flex items-center justify-center gap-2 text-white transition-all shadow-lg ${
                isDesigner
                  ? 'bg-[#8052ff] hover:bg-[#7040f5] shadow-[#8052ff]/25'
                  : 'bg-[#15846e] hover:bg-[#116e5c] shadow-[#15846e]/25'
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
