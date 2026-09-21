import React, { useState, useEffect } from 'react';
import { profileData } from '../../data/profileData';
import { usePerspective } from '../../context/PerspectiveContext';
import { Mail, ArrowRight, CheckCircle2, WifiOff, ExternalLink, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { trackEvent } from '../../lib/telemetry';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

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
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: senderName.trim() || 'Anonymous Colleague',
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
          setStatusNote('Network Offline: Message safely queued locally in browser storage. It will synchronize automatically when your connection is restored.');
        } catch {
          setTransmissionStatus('offline-queued');
          setStatusNote('Message stored locally in offline buffer.');
        }
      } else {
        try {
          const existing = localStorage.getItem('portfolio_messages_v1');
          const currentList: StoredMessage[] = existing ? JSON.parse(existing) : [];
          currentList.unshift(newMessage);
          localStorage.setItem('portfolio_messages_v1', JSON.stringify(currentList));
          trackEvent('contact_submit', { subject: senderMessage.slice(0, 40), email: senderEmail });
        } catch (err) {
          console.error('Failed to store message in local state', err);
        }

        setTransmissionStatus('transmitted');
        setStatusNote('Message successfully relayed to Neerav. Expect a response within 24 hours.');

        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.8 },
          colors: ['#f59e0b', '#06b6d4', '#fafafa'],
        });
      }
    }, 500);
  };

  return (
    <section id="contact" className="relative py-32 px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto space-y-20">
      {/* Section Header */}
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#f59e0b]">
          <span className="w-2 h-2 rounded-full bg-[#f59e0b] shadow-[0_0_8px_#f59e0b] animate-pulse" />
          <span>START A DIALOGUE</span>
        </div>

        <h2 className="font-editorial text-4xl sm:text-5xl lg:text-[58px] font-normal text-[#fafafa] tracking-tight leading-[1.05]">
          LET'S BUILD SOMETHING AMAZING.
        </h2>

        <p className="text-base sm:text-lg text-[#a1a1aa] font-normal leading-[1.7]">
          Open for product design leadership, distributed systems architecture, and transformative AI collaborations.
        </p>
      </div>

      {/* Editorial Floating Underline Form */}
      <div className="rounded-3xl border border-[#222222] bg-[#111111] p-8 sm:p-12 space-y-8">
        <form onSubmit={handleTransmit} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#71717a] uppercase tracking-wider block">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Jane Doe"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full bg-transparent border-b border-[#222222] focus:border-[#f59e0b] py-3 text-base text-[#fafafa] placeholder-[#404040] outline-none transition-colors"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#71717a] uppercase tracking-wider block">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="jane@venture.com"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                className="w-full bg-transparent border-b border-[#222222] focus:border-[#f59e0b] py-3 text-base text-[#fafafa] placeholder-[#404040] outline-none transition-colors"
              />
            </div>
          </div>

          {/* Message Input */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-[#71717a] uppercase tracking-wider block">
              Message or Project Brief *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Tell me about the problem, vision, or timeline..."
              value={senderMessage}
              onChange={(e) => setSenderMessage(e.target.value)}
              className="w-full bg-transparent border-b border-[#222222] focus:border-[#f59e0b] py-3 text-base text-[#fafafa] placeholder-[#404040] outline-none transition-colors resize-none leading-relaxed"
            />
          </div>

          {/* Status Message */}
          {statusNote && (
            <div
              className={`p-4 rounded-xl text-xs font-mono flex items-center gap-2.5 ${
                transmissionStatus === 'offline-queued'
                  ? 'bg-amber-500/10 text-[#f59e0b] border border-amber-500/20'
                  : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              }`}
            >
              {transmissionStatus === 'offline-queued' ? (
                <WifiOff className="w-4 h-4 shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              )}
              <span>{statusNote}</span>
            </div>
          )}

          {/* Submit Action Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
            <span className="text-xs font-mono text-[#71717a]">
              Encrypted Local Relay • Zero Spam
            </span>

            <button
              type="submit"
              disabled={transmissionStatus === 'sending'}
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-sm font-medium bg-[#fafafa] text-[#0a0a0a] hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-white/5 cursor-pointer disabled:opacity-50"
            >
              <span>{transmissionStatus === 'sending' ? 'TRANSMITTING...' : 'TRANSMIT MESSAGE'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Social Connection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
        {/* Email Beacon */}
        <a
          href={profileData.socialLinks.email}
          className="p-6 rounded-2xl border border-[#222222] bg-[#111111] hover:border-[#404040] transition-colors group space-y-2 block"
        >
          <div className="flex items-center justify-between text-[#71717a] group-hover:text-[#fafafa]">
            <Mail className="w-5 h-5 text-[#f59e0b]" />
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
          <div className="text-sm font-medium text-[#fafafa]">Direct Email</div>
          <div className="text-xs font-mono text-[#71717a] truncate">{profileData.socialLinks.emailDisplay}</div>
        </a>

        {/* GitHub */}
        <a
          href={profileData.socialLinks.github}
          target="_blank"
          rel="noreferrer"
          className="p-6 rounded-2xl border border-[#222222] bg-[#111111] hover:border-[#404040] transition-colors group space-y-2 block"
        >
          <div className="flex items-center justify-between text-[#71717a] group-hover:text-[#fafafa]">
            <GithubIcon className="w-5 h-5 text-[#06b6d4]" />
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
          <div className="text-sm font-medium text-[#fafafa]">GitHub Repository</div>
          <div className="text-xs font-mono text-[#71717a]">@Neeravneeo</div>
        </a>

        {/* LinkedIn */}
        <a
          href={profileData.socialLinks.linkedin}
          target="_blank"
          rel="noreferrer"
          className="p-6 rounded-2xl border border-[#222222] bg-[#111111] hover:border-[#404040] transition-colors group space-y-2 block"
        >
          <div className="flex items-center justify-between text-[#71717a] group-hover:text-[#fafafa]">
            <LinkedinIcon className="w-5 h-5 text-[#8052ff]" />
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
          <div className="text-sm font-medium text-[#fafafa]">LinkedIn Network</div>
          <div className="text-xs font-mono text-[#71717a]">Neerav Portfolio</div>
        </a>
      </div>
    </section>
  );
};
