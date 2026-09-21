import React, { useState } from 'react';
import { Project } from '../../../types';
import { usePerspective } from '../../../context/PerspectiveContext';
import {
  ArrowLeft,
  Mic,
  Monitor,
  Clock,
  Sparkles,
  Bot,
  Layers,
  Zap,
  Activity,
  Compass,
} from 'lucide-react';

interface InnerOSExperienceProps {
  project: Project;
  onBack: () => void;
}

type InputModalType = 'voice' | 'screen' | 'context' | 'intent';

export const InnerOSExperience: React.FC<InnerOSExperienceProps> = ({ project, onBack }) => {
  const { isDesigner } = usePerspective();
  const [activeInput, setActiveInput] = useState<InputModalType>('voice');
  const [isProcessing, setIsProcessing] = useState(false);
  const [executionState, setExecutionState] = useState<'idle' | 'deciding' | 'active'>('active');

  const inputScenarios: Record<
    InputModalType,
    { title: string; prompt: string; sensorData: string; aiDecision: string; action: string }
  > = {
    voice: {
      title: 'VOICE INTENT STREAM',
      prompt: '"Summarize the paper I am reading and export findings to Notion"',
      sensorData: 'Whisper Wasm • Local Speech-to-Text • Latency 120ms',
      aiDecision: 'Cross-reference active PDF tab via Chrome CDP → Extract abstract & methodology → Format structured markdown',
      action: 'Created page "Transformer Memory Compression" in Notion Research DB with 4 key charts attached.',
    },
    screen: {
      title: 'SPATIAL SCREEN CONTEXT',
      prompt: 'Visual bounding box around Figma design frame detected',
      sensorData: 'WebGPU Frame Buffer • 60 FPS Perceptual Differencing',
      aiDecision: 'Identify UI components in frame → Map to Tailwind CSS classes → Check accessibility color contrast',
      action: 'Highlighted 2 contrast warnings on button tokens (WCAG AA violation). Suggested hex #8b5cf6 for 4.8:1 ratio.',
    },
    context: {
      title: 'TEMPORAL AMBIENT CONTEXT',
      prompt: 'Calendar shows "Client Demo in 15 mins" • Notification volume high',
      sensorData: 'System Event Bridge • Focus Mode State Machine',
      aiDecision: 'Detect high-stakes temporal transition → Suppress non-urgent Slack badges → Pre-warm presentation tabs',
      action: 'Activated "Focus Sphere" mode. Pre-loaded staging environment and opened speaker notes silently.',
    },
    intent: {
      title: 'MULTI-MODAL PROACTIVE INTENT',
      prompt: 'User repeatedly switches between spreadsheet and Stripe dashboard',
      sensorData: 'Semantic Activity Graph • Frequency > 5 switches / min',
      aiDecision: 'Infer reconciliation friction → Offer inline automated formula matching transaction IDs',
      action: 'Generated floating HUD widget: "Auto-reconcile 42 pending Stripe charges to Excel?" [One-Click Reconcile]',
    },
  };

  const current = inputScenarios[activeInput];

  const handleTriggerInput = (type: InputModalType) => {
    setActiveInput(type);
    setIsProcessing(true);
    setExecutionState('deciding');
    setTimeout(() => {
      setIsProcessing(false);
      setExecutionState('active');
    }, 600);
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
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">
            INNEROS FUTURISTIC AMBIENT OS SIMULATOR
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-300">
          <Compass className="w-3.5 h-3.5" />
          <span>POST-GUI AMBIENT COMPUTING</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          InnerOS: Spatial Intent Architecture
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          {project.tagline} Experience computing free from the confines of static desktop windows—where
          voice, screen perception, and proactive AI converge into frictionless action.
        </p>
      </div>

      {/* 3D COSMIC HUD SIMULATOR */}
      <div className="rounded-3xl glass-panel border border-purple-500/20 p-6 sm:p-8 bg-space-950/85 shadow-2xl relative overflow-hidden space-y-8">
        {/* Subtle cosmic aura */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-purple-600/10 filter blur-[100px] pointer-events-none" />

        {/* Multi-Modal Input Selector */}
        <div className="space-y-3">
          <span className="text-xs font-mono text-purple-300 uppercase tracking-wider">
            1. MULTIMODAL SENSORY INPUT MATRIX (SELECT TO SIMULATE)
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'voice' as InputModalType, label: 'VOICE INTENT', icon: Mic },
              { id: 'screen' as InputModalType, label: 'SCREEN CONTEXT', icon: Monitor },
              { id: 'context' as InputModalType, label: 'TEMPORAL CONTEXT', icon: Clock },
              { id: 'intent' as InputModalType, label: 'PROACTIVE INTENT', icon: Sparkles },
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = activeInput === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTriggerInput(item.id)}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    isSelected
                      ? 'bg-purple-600/30 border-purple-400 text-white shadow-glow-designer'
                      : 'bg-space-900/60 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 mb-2 text-purple-400" />
                  <span className="text-xs font-mono font-bold block">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* INPUT STREAM VISUALIZATION */}
        <div className="p-5 rounded-2xl bg-space-900/80 border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-purple-300 font-bold">{current.title}</span>
            <span className="text-slate-400">{current.sensorData}</span>
          </div>
          <p className="text-sm font-semibold text-white font-mono">"{current.prompt}"</p>
        </div>

        {/* THE COGNITIVE REASONING STACK */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-space-900/60 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <Bot className="w-3.5 h-3.5" />
              <span>AI COGNITIVE CORE</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              {isProcessing ? 'Analyzing multimodal tokens in local Wasm...' : current.aiDecision}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-space-900/60 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
              <Layers className="w-3.5 h-3.5" />
              <span>DECISION MATRIX</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              Confidence: 98.4% • Privacy: On-Device Verified • Autonomy Level: Proactive
            </p>
          </div>

          <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <Zap className="w-3.5 h-3.5" />
              <span>AUTONOMOUS ACTION</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-mono">
              {current.action}
            </p>
          </div>
        </div>
      </div>

      {/* Case Study Deep Dive */}
      <div className="pt-8 space-y-6">
        <h2 className="text-2xl font-bold text-white pb-4 border-b border-white/10">
          InnerOS System Architecture & Research
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <span className="text-xs font-mono text-[#8052ff]">THE POST-GUI PARADIGM</span>
            <p className="text-sm text-[#bdbdbd] font-extralight leading-relaxed">{project.designer?.problem}</p>
            <ul className="space-y-1.5 text-xs text-[#9a9a9a] font-extralight">
              {(project.designer?.researchInsights ?? []).map((r, i) => (
                <li key={i}>• {r}</li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-[#8052ff]/30 space-y-3">
            <span className="text-xs font-mono text-[#8052ff]">LOCAL WEBGPU RUNTIME</span>
            <p className="text-sm text-[#bdbdbd] font-extralight leading-relaxed">{project.engineer?.architectureSummary}</p>
            <ul className="space-y-1.5 text-xs text-[#bdbdbd] font-extralight">
              {(project.engineer?.performanceGains ?? []).map((p, i) => (
                <li key={i}>✓ {p}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
