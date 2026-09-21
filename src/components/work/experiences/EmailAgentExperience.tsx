import React, { useState } from 'react';
import { Project } from '../../../types';
import { usePerspective } from '../../../context/PerspectiveContext';
import {
  ArrowLeft,
  Mail,
  Zap,
  Bot,
  Layers,
  Send,
  Calendar,
  ShieldCheck,
  Play,
  CheckCircle2,
  Cpu,
  ArrowDown,
} from 'lucide-react';

interface EmailAgentExperienceProps {
  project: Project;
  onBack: () => void;
}

type ScenarioType = 'urgent-bug' | 'meeting' | 'billing';

export const EmailAgentExperience: React.FC<EmailAgentExperienceProps> = ({ project, onBack }) => {
  const { isDesigner } = usePerspective();
  const [selectedScenario, setSelectedScenario] = useState<ScenarioType>('urgent-bug');
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(4);
  const [caseStudyPerspective, setCaseStudyPerspective] = useState<'designer' | 'engineer'>('engineer');

  const scenarios = {
    'urgent-bug': {
      label: 'Critical Production Bug Alert',
      from: 'monitoring@cloudprovider.com',
      subject: 'P0 Incident: Redis Cluster memory threshold exceeded 92%',
      body: 'Alert triggered on node eu-west-1a. Cluster latency increased to 120ms. Immediate action required.',
      classification: 'P0 Critical Incident',
      route: 'FORWARD & ESCALATE',
      actionOutcome: 'Escalated to PagerDuty On-Call Lead + Pushed incident channel in Slack + Drafted preliminary acknowledgement.'
    },
    'meeting': {
      label: 'Executive Partnership Sync',
      from: 'sarah.v@venturepartners.io',
      subject: 'Follow-up: Series A Architecture Due Diligence',
      body: 'Hi Neerav, loved the ALZO overview. Are you free this Thursday at 2:30 PM EST for a 30-min deep dive on the real-time telemetry stack?',
      classification: 'Calendar Scheduling Intent',
      route: 'REPLY & SCHEDULE',
      actionOutcome: 'Cross-referenced Google Calendar (open slot verified) → Drafted personalized confirmation → Created provisional Google Meet invite.'
    },
    'billing': {
      label: 'Enterprise Invoice Query',
      from: 'finance@acmecorp.com',
      subject: 'Invoice #8492 PO Reference update',
      body: 'Could you please regenerate our Q2 invoice to include PO reference #PO-9821-ACME before end of week?',
      classification: 'Billing / Account Administration',
      route: 'CLASSIFY & REPLY',
      actionOutcome: 'Queried Stripe / Quickbooks API → Updated PO metadata on invoice #8492 → Generated updated PDF draft awaiting user 1-click send.'
    }
  };

  const handleRunSimulation = () => {
    setIsExecuting(true);
    setActiveStep(0);

    const stepInterval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= 4) {
          clearInterval(stepInterval);
          setIsExecuting(false);
          return 4;
        }
        return prev + 1;
      });
    }, 600);
  };

  const currentData = scenarios[selectedScenario];

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
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">
            AI EMAIL AGENT & N8N ORCHESTRATION PIPELINE
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300">
          <Zap className="w-3.5 h-3.5" />
          <span>AUTONOMOUS AGENTIC PIPELINE</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          AI Email Agent: n8n Automation Flow
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          {project.tagline} Watch incoming communications automatically route through webhook triggers, LLM classification, intelligent decision branching, and concrete API actions.
        </p>
      </div>

      {/* INTERACTIVE PIPELINE SIMULATOR */}
      <div className="rounded-3xl glass-panel border border-white/15 p-6 sm:p-8 bg-space-950/80 shadow-2xl space-y-8">
        {/* Scenario Selector & Run Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-400 mr-2">SELECT INBOUND SCENARIO:</span>
            {(['urgent-bug', 'meeting', 'billing'] as ScenarioType[]).map((scKey) => (
              <button
                key={scKey}
                onClick={() => {
                  setSelectedScenario(scKey);
                  setActiveStep(4);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                  selectedScenario === scKey
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-glow-engineer'
                    : 'bg-space-900 text-slate-400 border border-white/10 hover:text-slate-200'
                }`}
              >
                {scenarios[scKey].label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleRunSimulation}
            disabled={isExecuting}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-mono font-bold text-xs hover:opacity-90 disabled:opacity-50 transition-all shadow-md"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isExecuting ? 'EXECUTING N8N GRAPH...' : 'RE-RUN PIPELINE'}</span>
          </button>
        </div>

        {/* INCOMING EMAIL CARD */}
        <div className="p-5 rounded-2xl bg-space-900/80 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/5 pb-2">
            <span>FROM: {currentData.from}</span>
            <span className="text-emerald-400">INBOUND WEBHOOK TRIGGERED</span>
          </div>
          <h4 className="text-sm font-bold text-white font-sans">{currentData.subject}</h4>
          <p className="text-xs text-slate-300 font-mono leading-relaxed">{currentData.body}</p>
        </div>

        {/* PIPELINE ARCHITECTURE FLOW GRAPH */}
        <div className="relative py-4 space-y-4">
          <div className="text-xs font-mono text-center text-slate-400 uppercase tracking-wider">
            AUTOMATION PIPELINE EXECUTION GRAPH
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Step 1: Email Ingest */}
            <div
              className={`p-4 rounded-xl border transition-all text-center space-y-2 ${
                activeStep >= 0
                  ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-glow-engineer'
                  : 'bg-space-900/40 border-white/5 text-slate-500'
              }`}
            >
              <Mail className="w-5 h-5 mx-auto text-emerald-400" />
              <div className="text-xs font-mono font-bold">1. INBOUND EMAIL</div>
              <p className="text-[11px] text-slate-400">Webhook Listener (Gmail/Outlook Push)</p>
            </div>

            {/* Step 2: Trigger */}
            <div
              className={`p-4 rounded-xl border transition-all text-center space-y-2 ${
                activeStep >= 1
                  ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-glow-engineer'
                  : 'bg-space-900/40 border-white/5 text-slate-500'
              }`}
            >
              <Zap className="w-5 h-5 mx-auto text-emerald-400" />
              <div className="text-xs font-mono font-bold">2. n8n TRIGGER</div>
              <p className="text-[11px] text-slate-400">Event Signature Verified & Sanitized</p>
            </div>

            {/* Step 3: AI Agent */}
            <div
              className={`p-4 rounded-xl border transition-all text-center space-y-2 ${
                activeStep >= 2
                  ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-glow-engineer'
                  : 'bg-space-900/40 border-white/5 text-slate-500'
              }`}
            >
              <Bot className="w-5 h-5 mx-auto text-emerald-400" />
              <div className="text-xs font-mono font-bold">3. AI AGENT</div>
              <p className="text-[11px] text-slate-400">Function Calling & Intent Extraction</p>
            </div>

            {/* Step 4: Decision Route */}
            <div
              className={`p-4 rounded-xl border transition-all text-center space-y-2 ${
                activeStep >= 3
                  ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-glow-engineer'
                  : 'bg-space-900/40 border-white/5 text-slate-500'
              }`}
            >
              <Layers className="w-5 h-5 mx-auto text-emerald-400" />
              <div className="text-xs font-mono font-bold">4. CLASSIFY & ROUTE</div>
              <p className="text-[11px] text-emerald-300 font-mono font-semibold">
                {currentData.route}
              </p>
            </div>

            {/* Step 5: Action */}
            <div
              className={`p-4 rounded-xl border transition-all text-center space-y-2 ${
                activeStep >= 4
                  ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-glow-engineer'
                  : 'bg-space-900/40 border-white/5 text-slate-500'
              }`}
            >
              <CheckCircle2 className="w-5 h-5 mx-auto text-emerald-400" />
              <div className="text-xs font-mono font-bold">5. ACTION EXECUTION</div>
              <p className="text-[11px] text-slate-400">CRM / Calendar / API Dispatched</p>
            </div>
          </div>

          {/* Action Result Box */}
          {activeStep >= 4 && (
            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400 font-bold">
                <span>EXECUTION COMPLETED IN 1.8s (STATUS: 200 OK)</span>
                <span>CONFIDENCE: 99.1%</span>
              </div>
              <p className="text-xs text-slate-200 font-mono leading-relaxed">
                Result: {currentData.actionOutcome}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Case Study Deep-Dive */}
      <div className="pt-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">AI Email Agent Case Study</h2>
          <div className="flex items-center p-1 rounded-xl bg-space-900 border border-white/10">
            <button
              onClick={() => setCaseStudyPerspective('designer')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono ${
                caseStudyPerspective === 'designer' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400'
              }`}
            >
              DESIGNER
            </button>
            <button
              onClick={() => setCaseStudyPerspective('engineer')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono ${
                caseStudyPerspective === 'engineer' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400'
              }`}
            >
              ENGINEER
            </button>
          </div>
        </div>

        {caseStudyPerspective === 'designer' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <span className="text-xs font-mono text-[#8052ff]">HUMAN-IN-THE-LOOP SAFETY</span>
              <p className="text-sm text-[#bdbdbd] font-extralight leading-relaxed">{project.designer?.problem}</p>
              <ul className="space-y-1.5 text-xs text-[#9a9a9a] font-extralight">
                {(project.designer?.researchInsights ?? []).map((r, i) => (
                  <li key={i}>• {r}</li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <span className="text-xs font-mono text-[#8052ff]">CONFIDENCE THRESHOLD UX</span>
              <ul className="space-y-2 text-xs text-[#bdbdbd] font-extralight">
                {(project.designer?.designSystemHighlights ?? []).map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#8052ff]">✓</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <div className="p-3 rounded-xl bg-[#8052ff]/10 border border-[#8052ff]/20 text-xs font-mono text-[#8052ff]">
                {project.designer?.outcome}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-[#15846e]/30 space-y-3">
              <span className="text-xs font-mono text-[#15846e]">N8N ORCHESTRATION & RAG</span>
              <p className="text-sm text-[#bdbdbd] font-extralight leading-relaxed">{project.engineer?.architectureSummary}</p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {(project.engineer?.techStack ?? []).map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-full bg-[#15846e]/10 text-[#15846e] text-xs font-mono border border-[#15846e]/25">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-[#15846e]/30 space-y-3">
              <span className="text-xs font-mono text-[#15846e]">GUARDRAILS & LATENCY GAINS</span>
              <ul className="space-y-2 text-xs text-[#bdbdbd] font-extralight">
                {(project.engineer?.performanceGains ?? []).map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#15846e]">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
