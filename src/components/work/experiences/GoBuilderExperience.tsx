import React, { useState } from 'react';
import { Project } from '../../../types';
import { usePerspective } from '../../../context/PerspectiveContext';
import {
  ArrowLeft,
  Layout,
  Code2,
  Sparkles,
  Play,
  Copy,
  Check,
  Smartphone,
  Laptop,
  Maximize2,
} from 'lucide-react';

interface GoBuilderExperienceProps {
  project: Project;
  onBack: () => void;
}

export const GoBuilderExperience: React.FC<GoBuilderExperienceProps> = ({ project, onBack }) => {
  const { isDesigner } = usePerspective();
  const [activePrompt, setActivePrompt] = useState('pricing-cards');
  const [copied, setCopied] = useState(false);
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');

  const templates: Record<
    string,
    { title: string; prompt: string; code: string; preview: React.ReactNode }
  > = {
    'pricing-cards': {
      title: 'SaaS Tiered Pricing Cards',
      prompt: 'Generate modern responsive pricing cards with annual toggle and glowing feature badges',
      code: `<div className="grid grid-cols-1 md:grid-cols-2 gap-4">\n  <div className="p-6 rounded-2xl bg-space-900 border border-white/10">\n    <span className="text-xs font-mono text-slate-400">STARTER</span>\n    <div className="text-3xl font-bold text-white mt-2">$29/mo</div>\n    <p className="text-xs text-slate-400 mt-1">For independent builders</p>\n    <button className="w-full mt-4 py-2 rounded-xl bg-white/10 text-white font-mono text-xs">Deploy</button>\n  </div>\n  <div className="p-6 rounded-2xl bg-amber-950/40 border border-amber-500/40 shadow-glow">\n    <span className="text-xs font-mono text-amber-400">PRO UNLIMITED</span>\n    <div className="text-3xl font-bold text-white mt-2">$99/mo</div>\n    <p className="text-xs text-slate-400 mt-1">Autonomous Agent cluster</p>\n    <button className="w-full mt-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-mono font-bold text-xs">Launch Pro</button>\n  </div>\n</div>`,
      preview: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-space-900 border border-white/10 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase">Starter Tier</span>
              <div className="text-3xl font-extrabold text-white mt-2">$29<span className="text-xs text-slate-400 font-normal">/mo</span></div>
              <p className="text-xs text-slate-400 mt-1">Ideal for solo engineers prototyping agents.</p>
            </div>
            <button className="w-full mt-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors">
              Deploy Sandbox
            </button>
          </div>
          <div className="p-6 rounded-2xl bg-amber-950/40 border border-amber-500/40 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase">Pro Unlimited</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono">POPULAR</span>
              </div>
              <div className="text-3xl font-extrabold text-white mt-2">$99<span className="text-xs text-slate-400 font-normal">/mo</span></div>
              <p className="text-xs text-slate-300 mt-1">Infinite parallel n8n agent workers + priority GPU.</p>
            </div>
            <button className="w-full mt-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs transition-colors">
              Launch Pro Cluster
            </button>
          </div>
        </div>
      )
    },
    'metric-dashboard': {
      title: 'Real-time Telemetry Metrics',
      prompt: 'Build high-density edge analytics telemetry with live sparklines and status badges',
      code: `<div className="grid grid-cols-3 gap-3">\n  <div className="p-4 rounded-xl bg-space-900 border border-white/10">\n    <span className="text-xs text-slate-400">LATENCY</span>\n    <div className="text-2xl font-bold text-emerald-400">14.2ms</div>\n  </div>\n</div>`,
      preview: (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-space-900/80 border border-white/10">
            <span className="text-[11px] font-mono text-slate-400">API P99 LATENCY</span>
            <div className="text-2xl font-mono font-bold text-emerald-400 mt-1">14.2 ms</div>
            <span className="text-[10px] text-emerald-500 font-mono">↓ 2.4ms vs last week</span>
          </div>
          <div className="p-4 rounded-xl bg-space-900/80 border border-white/10">
            <span className="text-[11px] font-mono text-slate-400">INFERENCE THROUGHPUT</span>
            <div className="text-2xl font-mono font-bold text-amber-400 mt-1">1,840 req/s</div>
            <span className="text-[10px] text-slate-400 font-mono">Across 4 regions</span>
          </div>
          <div className="p-4 rounded-xl bg-space-900/80 border border-white/10">
            <span className="text-[11px] font-mono text-slate-400">MEMORY ALLOCATION</span>
            <div className="text-2xl font-mono font-bold text-violet-400 mt-1">42.8%</div>
            <span className="text-[10px] text-slate-400 font-mono">1.2 GB / 2.8 GB</span>
          </div>
        </div>
      )
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(templates[activePrompt].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 animate-fadeIn">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO WORK UNIVERSE</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">
            GOBUILDER INTERACTIVE AST CANVAS
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-300">
          <Layout className="w-3.5 h-3.5" />
          <span>NATURAL LANGUAGE TO REACT AST</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          GoBuilder: AI Application Canvas
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          {project.tagline} Bidirectional compilation translates natural language prompts directly
          into parsed Abstract Syntax Trees, rendering clean, editable React + Tailwind code in real time.
        </p>
      </div>

      {/* INTERACTIVE CANVAS WORKSPACE */}
      <div className="rounded-3xl glass-panel border border-amber-500/20 p-6 sm:p-8 bg-space-950/85 shadow-2xl space-y-6">
        {/* Prompt Selector Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono text-slate-300">SELECT INTENT TEMPLATE:</span>
            {Object.keys(templates).map((key) => (
              <button
                key={key}
                onClick={() => setActivePrompt(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activePrompt === key
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-space-900 text-slate-400 border border-white/10 hover:text-white'
                }`}
              >
                {templates[key].title}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDeviceView('desktop')}
              className={`p-1.5 rounded-lg border ${
                deviceView === 'desktop' ? 'bg-white/10 text-white border-white/20' : 'text-slate-500 border-transparent'
              }`}
            >
              <Laptop className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceView('mobile')}
              className={`p-1.5 rounded-lg border ${
                deviceView === 'mobile' ? 'bg-white/10 text-white border-white/20' : 'text-slate-500 border-transparent'
              }`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Canvas Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Visual Preview */}
          <div
            className={`lg:col-span-7 rounded-2xl bg-space-900/90 border border-white/10 p-6 flex flex-col justify-center min-h-[300px] transition-all ${
              deviceView === 'mobile' ? 'max-w-sm mx-auto' : 'w-full'
            }`}
          >
            <div className="text-[11px] font-mono text-slate-500 mb-4 pb-2 border-b border-white/5 flex justify-between">
              <span>LIVE VIRTUAL DOM PREVIEW</span>
              <span className="text-emerald-400">AST SYNCED (60 FPS)</span>
            </div>
            {templates[activePrompt].preview}
          </div>

          {/* Clean Code Output */}
          <div className="lg:col-span-5 rounded-2xl bg-black/60 border border-white/10 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono text-amber-400">COMPILED REACT CODE</span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
              <pre className="mt-3 font-mono text-xs text-slate-300 overflow-x-auto p-2 leading-relaxed">
                {templates[activePrompt].code}
              </pre>
            </div>
            <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-slate-500">
              Zero-bloat TypeScript export • Native Tailwind CSS utility classes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
