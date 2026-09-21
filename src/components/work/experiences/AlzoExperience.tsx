import React, { useState } from 'react';
import { Project } from '../../../types';
import { usePerspective } from '../../../context/PerspectiveContext';
import {
  ArrowLeft,
  Activity,
  Heart,
  UserCheck,
  ShieldAlert,
  Bell,
  FileText,
  MessageSquare,
  Clock,
  Compass,
  Layers,
  Cpu,
  Smartphone,
  Server,
  Database,
  Lock,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Pill,
} from 'lucide-react';

interface AlzoExperienceProps {
  project: Project;
  onBack: () => void;
}

type RoleType = 'doctor' | 'caregiver' | 'patient';
type VerticalStage = 'dashboard' | 'monitoring' | 'medication' | 'alerts' | 'reports' | 'communication';

export const AlzoExperience: React.FC<AlzoExperienceProps> = ({ project, onBack }) => {
  const { isDesigner } = usePerspective();
  const [activeRole, setActiveRole] = useState<RoleType>('caregiver');
  const [activeStage, setActiveStage] = useState<VerticalStage>('dashboard');
  const [caseStudyPerspective, setCaseStudyPerspective] = useState<'designer' | 'engineer'>('designer');

  const roles: { id: RoleType; label: string; icon: any; tagline: string }[] = [
    { id: 'doctor', label: 'DOCTOR', icon: Activity, tagline: 'Clinical telemetry & longitudinal decline curves' },
    { id: 'caregiver', label: 'CAREGIVER', icon: Heart, tagline: 'Real-time safety, adherence & ambient peace of mind' },
    { id: 'patient', label: 'PATIENT', icon: UserCheck, tagline: 'Zero cognitive friction, familiar voice anchors & dignity' },
  ];

  const stages: { id: VerticalStage; label: string; icon: any }[] = [
    { id: 'dashboard', label: '1. Dashboard', icon: Layers },
    { id: 'monitoring', label: '2. Monitoring', icon: MapPin },
    { id: 'medication', label: '3. Medication', icon: Pill },
    { id: 'alerts', label: '4. Alerts', icon: ShieldAlert },
    { id: 'reports', label: '5. Reports', icon: FileText },
    { id: 'communication', label: '6. Communication', icon: MessageSquare },
  ];

  // Role x Stage interactive preview simulator content
  const getStageContent = () => {
    switch (activeStage) {
      case 'dashboard':
        return activeRole === 'patient' ? (
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center">
              <span className="text-3xl font-bold text-amber-200">Good Morning, Arthur</span>
              <p className="text-sm text-slate-300 mt-2">Today is Monday, sunny and pleasant. Your daughter Elena visited yesterday.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-space-900/80 border border-white/10 text-center">
                <span className="text-xs font-mono text-slate-400">NEXT MEAL</span>
                <p className="text-lg font-bold text-white mt-1">Lunch at 12:30 PM</p>
              </div>
              <div className="p-4 rounded-xl bg-space-900/80 border border-white/10 text-center">
                <span className="text-xs font-mono text-slate-400">FAMILY CALL</span>
                <p className="text-lg font-bold text-emerald-400 mt-1">Elena at 4:00 PM</p>
              </div>
            </div>
          </div>
        ) : activeRole === 'doctor' ? (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-space-900/80 border border-white/10">
                <span className="text-xs font-mono text-slate-400">30-DAY MMSE TREND</span>
                <p className="text-xl font-bold text-emerald-400 mt-1">Stable (-0.2 pts)</p>
                <span className="text-[10px] text-slate-400 font-mono">Cognitive baseline maintained</span>
              </div>
              <div className="p-4 rounded-xl bg-space-900/80 border border-white/10">
                <span className="text-xs font-mono text-slate-400">MED COMPLIANCE</span>
                <p className="text-xl font-bold text-violet-400 mt-1">98.2%</p>
                <span className="text-[10px] text-slate-400 font-mono">Donepezil 10mg titrated</span>
              </div>
              <div className="p-4 rounded-xl bg-space-900/80 border border-white/10">
                <span className="text-xs font-mono text-slate-400">SLEEP FRAGMENTATION</span>
                <p className="text-xl font-bold text-amber-400 mt-1">1.4 wakeups/night</p>
                <span className="text-[10px] text-slate-400 font-mono">Normal variance</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-space-950/70 border border-white/10 font-mono text-xs text-slate-300">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-slate-400">CLINICAL COHORT ID: #ALZ-8942</span>
                <span className="text-emerald-400">MONITORING ACTIVE</span>
              </div>
              <p className="mt-2 text-slate-400">Last neuro-consult: 14 days ago. Next scheduled: in 46 days. Anomaly triggers: 0 active.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Arthur is Safe & Resting at Home</h4>
                  <p className="text-xs text-slate-400">Living Room Geofence • Last motion detected 4 mins ago</p>
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-500/20">
                PEACE OF MIND: 100%
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-space-900/70 border border-white/10">
                <span className="text-xs font-mono text-slate-400">TODAY'S SCHEDULE</span>
                <div className="mt-2 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>08:00 AM — Donepezil</span>
                    <span className="text-emerald-400">Taken</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>12:30 PM — Lunch & Hydration</span>
                    <span className="text-amber-400">Upcoming</span>
                  </div>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-space-900/70 border border-white/10">
                <span className="text-xs font-mono text-slate-400">GEOFENCE STATUS</span>
                <div className="mt-2 space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span>Safe Perimeter:</span>
                    <span className="text-white">Home & Garden (80m)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Battery Level:</span>
                    <span className="text-emerald-400">92% (Beacon Active)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'monitoring':
        return (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-space-950/80 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-slate-400">SPATIAL GEOFENCE TELEMETRY</span>
                <p className="text-sm font-semibold text-white mt-0.5">Circular Safe Haven • Radius: 85 meters</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/20">
                GPS ACCURACY: ± 1.8m
              </span>
            </div>
            <div className="relative h-44 rounded-xl bg-space-900 border border-white/10 overflow-hidden flex items-center justify-center cosmic-grid-pattern">
              <div className="absolute w-32 h-32 rounded-full border border-violet-500/40 bg-violet-500/10 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-emerald-500/50 bg-emerald-500/20 animate-pulse flex items-center justify-center">
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
              </div>
              <div className="absolute bottom-3 left-4 text-[11px] font-mono text-slate-400 bg-black/60 px-2.5 py-1 rounded backdrop-blur">
                Current Location: 42 Maple Ave (Home Sanctuary)
              </div>
            </div>
          </div>
        );

      case 'medication':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-space-900/80 border border-white/10">
                <div className="flex items-center gap-2 text-violet-400 text-xs font-mono mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>MORNING DOSE</span>
                </div>
                <p className="text-sm font-bold text-white">Donepezil 10mg</p>
                <p className="text-xs text-slate-400 mt-1">Verified via Smart NFC Pillbox at 08:04 AM</p>
              </div>
              <div className="p-4 rounded-xl bg-space-900/80 border border-white/10">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono mb-2">
                  <Clock className="w-4 h-4" />
                  <span>EVENING DOSE</span>
                </div>
                <p className="text-sm font-bold text-white">Memantine 5mg</p>
                <p className="text-xs text-slate-400 mt-1">Scheduled for 08:00 PM (Voice prompt active)</p>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-space-950/60 border border-white/10 text-xs font-mono text-slate-300">
              <span className="text-slate-400">SMART ADHERENCE TELEMETRY:</span> 28/28 doses taken on schedule this month (100% adherence streak).
            </div>
          </div>
        );

      case 'alerts':
        return (
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-space-900/80 border border-white/10 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-mono font-semibold text-white">Routine Daily Check-in Passed</h5>
                <p className="text-xs text-slate-400 mt-0.5">Morning cognitive greeting voice response verified positive.</p>
                <span className="text-[10px] font-mono text-slate-500">Today • 08:15 AM</span>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-space-900/80 border border-white/10 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-mono font-semibold text-white">Soft Boundary Warning (Resolved)</h5>
                <p className="text-xs text-slate-400 mt-0.5">Patient stepped onto porch garden; returned inside within 90 seconds.</p>
                <span className="text-[10px] font-mono text-slate-500">Yesterday • 04:32 PM</span>
              </div>
            </div>
          </div>
        );

      case 'reports':
        return (
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-space-900/80 border border-white/10 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-white">Bi-Weekly Neurological Synthesis</h4>
                <p className="text-xs text-slate-400 mt-0.5">Cognitive stability, motor agility, and medication variance chart</p>
              </div>
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg bg-violet-600/30 text-violet-300 border border-violet-500/30 text-xs font-mono hover:bg-violet-600/50"
              >
                EXPORT PDF
              </button>
            </div>
            <div className="p-3.5 rounded-xl bg-space-950/70 border border-white/10 font-mono text-xs space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>COGNITIVE DECLINE VELOCITY:</span>
                <span className="text-emerald-400">DORMANT (0.01/mo)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>GAIT VELOCITY DEVIATION:</span>
                <span className="text-white">-2.1% (Nominal)</span>
              </div>
            </div>
          </div>
        );

      case 'communication':
        return (
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-space-900/80 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-violet-500/20 text-violet-300 flex items-center justify-center font-bold text-xs">
                  DR
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-white">Dr. Marcus Vance (Neurology)</h5>
                  <p className="text-[11px] text-slate-400">"Telemetry looks exceptional. Continue current dosage."</p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-500">2d ago</span>
            </div>
            <div className="p-3.5 rounded-xl bg-space-900/80 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs">
                  EL
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-white">Elena Rostova (Caregiver)</h5>
                  <p className="text-[11px] text-slate-400">"Dad was in high spirits during our walk today."</p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-500">4h ago</span>
            </div>
          </div>
        );
    }
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
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">
            ALZO FLAGSHIP INTERACTIVE EXPERIENCE
          </span>
        </div>
      </div>

      {/* Hero Presentation */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-mono text-violet-300">
          <Activity className="w-3.5 h-3.5" />
          <span>2D SPATIAL EXPLORATION SYSTEM</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          ALZO: Alzheimer's Healthcare Ecosystem
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          {project.tagline} Rather than static mockups, experience how ALZO coordinates
          between three distinct stakeholders horizontally, and deep operational capabilities vertically.
        </p>
      </div>

      {/* 2D SPATIAL EXPLORATION SYSTEM */}
      <div className="rounded-3xl glass-panel border border-white/15 p-6 sm:p-8 space-y-8 bg-space-950/80 shadow-2xl">
        {/* Horizontal Role Selector */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span>← DRAG / SELECT ROLE HORIZONTALLY →</span>
            </span>
            <span className="text-violet-400 font-semibold">ACTIVE: {activeRole.toUpperCase()}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {roles.map((role) => {
              const Icon = role.icon;
              const isActive = activeRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setActiveRole(role.id)}
                  className={`p-4 rounded-2xl text-left transition-all duration-300 border relative overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-br from-violet-900/60 to-space-900 border-violet-400/60 shadow-glow-designer'
                      : 'bg-space-900/50 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          isActive ? 'bg-violet-500 text-white' : 'bg-white/5 text-slate-400'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-mono font-bold text-sm text-white">{role.label}</span>
                    </div>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-2.5 line-clamp-1">{role.tagline}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Vertical Operational Stack & Live Stage Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-white/10">
          {/* Vertical Stack Column */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
              ↓ VERTICAL CAPABILITY STACK
            </span>
            <div className="space-y-1.5">
              {stages.map((stage) => {
                const Icon = stage.icon;
                const isCurrent = activeStage === stage.id;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setActiveStage(stage.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all text-left border ${
                      isCurrent
                        ? 'bg-violet-600/30 text-white border-violet-400/50 font-bold'
                        : 'bg-space-900/40 text-slate-400 border-white/5 hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{stage.label}</span>
                    </div>
                    {isCurrent && <span className="text-[10px] text-violet-300">ACTIVE</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Live Screen Sandbox */}
          <div className="lg:col-span-8 bg-space-900/70 rounded-2xl border border-white/10 p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-violet-400" />
                  <span className="text-xs font-mono text-slate-300 uppercase">
                    VIEWPORT: {activeRole.toUpperCase()} × {activeStage.toUpperCase()}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400">
                  REAL-TIME SYNC • 15MS LATENCY
                </span>
              </div>

              {/* Dynamic Content */}
              {getStageContent()}
            </div>

            <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Patient: Arthur Rostova (74)</span>
              <span>Encrypted via HIPAA Vector Bus</span>
            </div>
          </div>
        </div>
      </div>

      {/* DUAL-LENS CASE STUDY SECTION */}
      <div className="pt-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              ALZO Deep-Dive Case Study
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Switch perspective to review either the human-centered UX design process or the resilient edge engineering architecture.
            </p>
          </div>

          {/* Dual Perspective Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-space-900 border border-white/10 shrink-0">
            <button
              type="button"
              onClick={() => setCaseStudyPerspective('designer')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all ${
                caseStudyPerspective === 'designer'
                  ? 'bg-violet-600 text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>DESIGNER LENS</span>
            </button>
            <button
              type="button"
              onClick={() => setCaseStudyPerspective('engineer')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all ${
                caseStudyPerspective === 'engineer'
                  ? 'bg-emerald-600 text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>ENGINEER LENS</span>
            </button>
          </div>
        </div>

        {/* DESIGNER PERSPECTIVE VIEW */}
        {caseStudyPerspective === 'designer' ? (
          <div className="space-y-8 animate-fadeIn">
            {/* Problem & Research */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-3">
                <span className="text-xs font-mono text-violet-400 uppercase tracking-wider">
                  01. The Problem Space
                </span>
                <h3 className="text-xl font-bold text-white">
                  Degenerative Memory & Alert Fatigue
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.designer.problem}
                </p>
              </div>

              <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-3">
                <span className="text-xs font-mono text-violet-400 uppercase tracking-wider">
                  02. Clinical Research Insights
                </span>
                <ul className="space-y-2 text-sm text-slate-300">
                  {project.designer.researchInsights.map((insight, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-violet-400 mt-1">•</span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Persona Matrix */}
            <div className="space-y-4">
              <span className="text-xs font-mono text-violet-400 uppercase tracking-wider">
                03. Three-Stakeholder Persona Matrix
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {project.designer.personas.map((persona, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-space-900/80 border border-white/10 space-y-3">
                    <h4 className="text-base font-bold text-white">{persona.role}</h4>
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-slate-400 font-mono">PRIMARY FOCUS:</span>
                        <p className="text-slate-200 mt-0.5">{persona.focus}</p>
                      </div>
                      <div>
                        <span className="text-amber-400 font-mono">CORE PAIN POINT:</span>
                        <p className="text-slate-300 mt-0.5">{persona.painPoint}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* User Journey Flow */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
              <span className="text-xs font-mono text-violet-400 uppercase tracking-wider">
                04. Patient & Caregiver Symbiotic Journey
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {project.designer.userJourney.map((j, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-space-950/60 border border-white/5 space-y-2">
                    <span className="text-xs font-mono font-bold text-violet-300">STAGE {idx + 1}: {j.step}</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{j.action}</p>
                    <div className="pt-2 text-[11px] font-mono text-emerald-400">
                      Feel: {j.emotion}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Design System & Outcome */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-3">
                <span className="text-xs font-mono text-violet-400 uppercase tracking-wider">
                  05. Neuro-Accessible Design System
                </span>
                <ul className="space-y-2 text-sm text-slate-300">
                  {project.designer.designSystemHighlights.map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-violet-400 mt-1">✓</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-950/40 to-space-900 border border-violet-500/30 p-6 space-y-3">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                  06. Clinical Trial Outcome
                </span>
                <h4 className="text-lg font-bold text-white">Measurable Impact</h4>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {project.designer.outcome}
                </p>
                <div className="pt-2 grid grid-cols-2 gap-3">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-black/40 border border-white/10">
                      <span className="text-[10px] font-mono text-slate-400">{m.label}</span>
                      <p className="text-base font-mono font-bold text-violet-300">{m.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ENGINEER PERSPECTIVE VIEW */
          <div className="space-y-8 animate-fadeIn">
            {/* Architecture Overview */}
            <div className="p-6 rounded-2xl glass-panel border border-emerald-500/20 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <Server className="w-4 h-4" />
                <span>01. SYSTEM ARCHITECTURE & EDGE SENSING TOPOLOGY</span>
              </div>
              <h3 className="text-xl font-bold text-white">{project.engineer.headline}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.engineer.architectureSummary}
              </p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {project.engineer.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-md text-xs font-mono text-emerald-300 bg-emerald-950/40 border border-emerald-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* End-to-End System Pipeline */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                02. Real-Time Telemetry Flow (Edge to Alert Dispatch)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {project.engineer.systemFlow.map((sf, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-space-950/70 border border-white/10 space-y-2">
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">
                      STAGE 0{idx + 1}
                    </span>
                    <h5 className="text-xs font-bold text-white">{sf.stage}</h5>
                    <p className="text-xs text-slate-300">{sf.component}</p>
                    <div className="pt-1 text-[11px] font-mono text-slate-400 border-t border-white/5">
                      {sf.throughputOrDetail}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hard Engineering Challenges & Performance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-3">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                  03. Critical Engineering Challenges
                </span>
                <ul className="space-y-2 text-sm text-slate-300">
                  {project.engineer.keyChallenges.map((kc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 mt-1">!</span>
                      <span>{kc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-space-900 border border-emerald-500/30 p-6 space-y-3">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                  04. Validated Performance Benchmarks
                </span>
                <ul className="space-y-2 text-sm text-slate-200">
                  {project.engineer.performanceGains.map((pg, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">✓</span>
                      <span>{pg}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
