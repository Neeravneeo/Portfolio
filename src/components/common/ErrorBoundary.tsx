import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('NEERAV.OS Kernel caught runtime error:', error, errorInfo);
  }

  private handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 select-none relative overflow-hidden font-sans">
          {/* Subtle ambient red/violet beacon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 max-w-md w-full bg-[#06080f] border border-white/10 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
            {/* Warning Icon */}
            <div className="w-14 h-14 mx-auto rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono tracking-widest uppercase text-red-400">
                SYSTEM EXCEPTION DETECTED
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Cosmic Kernel Safe Recovery
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                An isolated client-side runtime exception occurred. The system has prevented an unhandled crash.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-black/60 rounded-xl border border-white/5 text-left font-mono text-[10px] text-slate-400 overflow-x-auto max-h-24">
                {this.state.error.message}
              </div>
            )}

            <button
              onClick={this.handleReload}
              className="w-full py-3 px-4 rounded-full bg-[#8052ff] hover:bg-[#7040f5] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#8052ff]/20"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Re-Initialize Portfolio Universe</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
