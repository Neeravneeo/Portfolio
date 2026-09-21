import React, { useState } from 'react';
import { journeyMilestones } from '../../data/journeyData';
import { usePerspective } from '../../context/PerspectiveContext';
import { Sparkles, Compass, CheckCircle2, ArrowRight, Lightbulb, Rocket, Milestone } from 'lucide-react';

export const JourneySection: React.FC = () => {
  const { isDesigner } = usePerspective();
  const [selectedYear, setSelectedYear] = useState<string>('2025');

  const activeMilestone =
    journeyMilestones.find((m) => m.year === selectedYear) || journeyMilestones[journeyMilestones.length - 1];

  return (
    <section id="journey" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-white/10 text-xs font-mono">
          <Milestone className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-400">03. BUILDER EVOLUTION</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          My Journey Through Cyberspace
        </h2>

        <p className="text-slate-400 max-w-2xl text-base sm:text-lg leading-relaxed">
          Not a static resume timeline. This is my <span className="text-white font-medium">evolution as a builder</span>—how
          foundations in code and design catalyzed into autonomous intelligent systems.
        </p>
      </div>

      {/* COSMIC ORBITAL TIMELINE TRACK */}
      <div className="relative py-8">
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 bg-space-950/80 shadow-2xl overflow-x-auto">
          {/* Orbital timeline axis */}
          <div className="relative flex items-center justify-between min-w-[760px] px-4">
            {/* Background connecting beam */}
            <div className="absolute top-5 left-8 right-8 h-1 bg-gradient-to-r from-violet-600/30 via-cyan-500/30 to-emerald-500/30 -z-0 rounded-full" />

            {journeyMilestones.map((m) => {
              const isSelected = m.year === selectedYear;
              return (
                <button
                  key={m.year}
                  onClick={() => setSelectedYear(m.year)}
                  className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
                >
                  {/* Cosmic Orbital Node */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-all duration-300 border ${
                      isSelected
                        ? isDesigner
                          ? 'bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white border-violet-400 shadow-glow-designer scale-125'
                          : 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white border-emerald-400 shadow-glow-engineer scale-125'
                        : 'bg-space-900 text-slate-400 border-white/15 hover:border-white/40 hover:text-white'
                    }`}
                  >
                    {m.year === '2026' ? 'NOW' : m.year}
                  </div>

                  {/* Year & Theme Sub-labels */}
                  <div className="mt-3 text-center">
                    <span
                      className={`text-xs font-mono font-bold block transition-colors ${
                        isSelected ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {m.year}
                    </span>
                    <span
                      className={`text-[11px] font-mono tracking-wider uppercase block mt-0.5 ${
                        isSelected
                          ? isDesigner ? 'text-violet-300' : 'text-emerald-300'
                          : 'text-slate-500'
                      }`}
                    >
                      {m.theme}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* EXPANDED YEAR CARD */}
      <div className="rounded-3xl glass-panel border border-white/15 p-6 sm:p-10 bg-space-950/90 shadow-2xl relative overflow-hidden animate-fadeIn">
        {/* Ambient background accent aura */}
        <div
          className={`absolute -top-32 -right-32 w-80 h-80 rounded-full filter blur-[120px] opacity-25 pointer-events-none ${
            isDesigner ? 'bg-violet-600' : 'bg-emerald-600'
          }`}
        />

        <div className="space-y-8 relative z-10">
          {/* Header info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span
                  className={`px-3 py-1 rounded-full border ${
                    isDesigner
                      ? 'bg-violet-500/20 text-violet-300 border-violet-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  }`}
                >
                  CHAPTER: {activeMilestone.year} • {activeMilestone.theme.toUpperCase()}
                </span>
                {activeMilestone.stats && (
                  <span className="text-slate-400">{activeMilestone.stats}</span>
                )}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 tracking-tight">
                {activeMilestone.title}
              </h3>
            </div>

            <div className="p-3.5 rounded-xl bg-space-900/80 border border-white/10 text-xs font-mono text-slate-300 shrink-0">
              <span className="text-slate-400 block text-[10px]">KEY ARTIFACT:</span>
              <span className="font-bold text-white mt-0.5 block">{activeMilestone.keyArtifact}</span>
            </div>
          </div>

          {/* Tri-Column Deep Dive: What I Learned, What I Built, What Changed */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* What I learned */}
            <div className="p-6 rounded-2xl bg-space-900/70 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
                <Lightbulb className="w-4 h-4" />
                <span>WHAT I LEARNED</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                {activeMilestone.learned.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What I built */}
            <div className="p-6 rounded-2xl bg-space-900/70 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-violet-400 font-bold">
                <Rocket className="w-4 h-4" />
                <span>WHAT I BUILT</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                {activeMilestone.built.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-violet-400 mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What changed */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-space-900 to-space-850 border border-white/15 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>THE MENTAL SHIFT</span>
                </div>
                <p className="text-sm font-medium text-white italic mt-3 leading-relaxed">
                  "{activeMilestone.changed}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Evolutionary Vector</span>
                <span className="text-emerald-400">Continuous Mastery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
