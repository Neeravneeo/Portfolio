import React, { useState } from 'react';
import { authService, AdminSession } from '../../lib/auth';
import { Lock, ArrowLeft, ShieldAlert, Key, Eye, EyeOff } from 'lucide-react';
import { Button } from '../common/Button';

interface AdminLoginProps {
  onLoginSuccess: (session: AdminSession) => void;
  onBackToPublic: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToPublic }) => {
  const [email, setEmail] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const res = await authService.login(email, passphrase, rememberMe);
      if (res.success && res.session) {
        onLoginSuccess(res.session);
      } else {
        setErrorMessage(res.error || 'Authentication rejected.');
      }
    } catch {
      setErrorMessage('Network or authorization timeout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between p-6 sm:p-12 font-mono relative overflow-hidden select-none">
      {/* Background ambient security beacon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#8052ff]/10 blur-[160px] pointer-events-none" />

      {/* Header */}
      <header className="flex items-center justify-between z-10 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#8052ff] flex items-center justify-center font-bold text-xs text-white">
            N
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-wider">NEERAV.OS</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                RESTRICTED
              </span>
            </div>
            <span className="text-[10px] text-[#9a9a9a]">
              PORTFOLIO ADMIN GATEWAY
            </span>
          </div>
        </div>

        <button
          onClick={onBackToPublic}
          className="flex items-center gap-2 text-xs text-[#9a9a9a] hover:text-white transition-colors px-3.5 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Public Portfolio</span>
        </button>
      </header>

      {/* Login Card Stage */}
      <main className="relative z-10 max-w-md w-full mx-auto my-auto py-8">
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#8052ff]/10 border border-[#8052ff]/30 flex items-center justify-center text-[#8052ff] mb-2 shadow-lg shadow-[#8052ff]/20">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-normal tracking-tight text-white font-sans">
              Owner Sign-In
            </h1>
            <p className="text-xs text-[#bdbdbd] font-sans font-extralight max-w-xs">
              Authenticate with your owner credentials or local master passphrase.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-start gap-2 animate-fadeIn">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono text-[#9a9a9a] mb-1.5 uppercase">
                Owner Email / Identifier
              </label>
              <input
                type="text"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="neerav@neerav.os or admin"
                className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-[#8052ff] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#9a9a9a] mb-1.5 uppercase">
                Passphrase / Master Key
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/60 border border-white/10 rounded-xl pl-4 pr-10 py-2.5 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-[#8052ff] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9a9a9a] hover:text-white"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-[#bdbdbd]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-[#8052ff] rounded"
                />
                <span className="text-[11px]">Remember for 7 days</span>
              </label>
              <span className="text-[10px] text-[#ffb829] font-mono">
                Hint: admin123
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-full text-xs font-mono font-semibold bg-[#8052ff] hover:bg-[#7040f5] text-white shadow-lg shadow-[#8052ff]/25 transition-all disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
            >
              <Key className="w-3.5 h-3.5" />
              <span>{isLoading ? 'VERIFYING CREDENTIALS...' : 'AUTHENTICATE & UNLOCK'}</span>
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="z-10 text-center text-[10px] text-[#9a9a9a] border-t border-white/5 pt-4">
        NEERAV.OS KERNEL • PHASE 10 AUTH GATE • CONFIDENTIAL
      </footer>
    </div>
  );
};
