import React, { useState } from 'react';
import { journeyMilestones } from '../../data/journeyData';
import { usePerspective } from '../../context/PerspectiveContext';
import { Sparkles, Milestone, CheckCircle2, ArrowRight } from 'lucide-react';

export const JourneySection: React.FC = () => {
  const { isDesigner } = usePerspective();
  const [selectedYear, setSelectedYear] = useState<string>('2025');

  const activeMilestone =
    journeyMilestones.find((m) => m.year === selectedYear) || journeyMilestones[journeyMilestones.length - 1];

  return (
    <section id="journey" className="relative py-28 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#9a9a9a]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ffb829] shadow-[0_0_6px_#ffb829] animate-pulse" />
          <span>03. BUILDER EVOLUTION</span>
          <span>•</span>
          <span className="text-[#bdbdbd]">CHRONOLOGICAL MATRIX</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal text-white tracking-[-0.035em] leading-[1.08]">
          My Journey Through Cyberspace
        </h2>

        <p className="text-[#bdbdbd] font-extralight text-lg sm:text-xl leading-[1.65] max-w-2xl">
          Not a static resume timeline. This is my <span className="font-normal text-white">evolution as a builder</span>—how
          foundations in design and engineering catalyzed into autonomous, human-centered intelligent systems.
        </p>
      </div>

      {/* COSMIC ORBITAL TIMELINE TRACK */}
      <div className="relative py-6">
        <div className="rounded-3xl p-6 sm:p-8 border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-2xl overflow-x-auto">
          {/* Orbital timeline axis */}
          <div className="relative flex items-center justify-between min-w-[760px] px-4">
            {/* Background connecting beam */}
            <div className="absolute top-5 left-8 right-8 h-1 bg-gradient-to-r from-[#8052ff]/30 via-[#15846e]/30 to-[#ffb829]/30 -z-0 rounded-full" />

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
                          ? 'bg-[#8052ff] text-white border-[#8052ff] shadow-lg shadow-[#8052ff]/40 scale-125'
                          : 'bg-[#15846e] text-white border-[#15846e] shadow-lg shadow-[#15846e]/40 scale-125'
                        : 'bg-black text-[#9a9a9a] border-white/15 hover:border-white/40 hover:text-white'
                    }`}
                  >
                    {m.year === '2026' ? 'NOW' : m.year}
                  </div>

                  {/* Year & Theme Sub-labels */}
                  <div className="mt-3 text-center">
                    <span
                      className={`text-xs font-mono font-medium block transition-colors ${
                        isSelected ? 'text-white' : 'text-[#9a9a9a] group-hover:text-white'
                      }`}
                    >
                      {m.year}
                    </span>
                    <span
                      className={`text-[11px] font-mono tracking-wider uppercase block mt-0.5 ${
                        isSelected
                          ? isDesigner ? 'text-[#8052ff]' : 'text-[#15846e]'
                          : 'text-[#9a9a9a]'
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
      <div className="rounded-3xl border border-white/10 p-6 sm:p-10 bg-white/[0.02] backdrop-blur-xl shadow-2xl relative overflow-hidden animate-fadeIn">
        {/* Ambient background accent aura */}
        <div
          className={`absolute -top-32 -right-32 w-80 h-80 rounded-full filter blur-[120px] opacity-20 pointer-events-none ${
            isDesigner ? 'bg-[#8052ff]' : 'bg-[#15846e]'
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
                      ? 'bg-[#8052ff]/15 text-[#8052ff] border-[#8052ff]/30'
                      : 'bg-[#15846e]/15 text-[#15846e] border-[#15846e]/30'
                  }`}
                >
                  CHAPTER: {activeMilestone.year} • {activeMilestone.theme.toUpperCase()}
                </span>
                {activeMilestone.stats && (
                  <span className="text-[#9a9a9a]">{activeMilestone.stats}</span>
                )}
              </div>
              <h3 className="text-2xl sm:text-3xl font-normal text-white mt-2 tracking-tight">
                {activeMilestone.title}
              </h3>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-mono text-[#bdbdbd] shrink-0">
              <span className="text-[#9a9a9a] block text-[10px]">KEY ARTIFACT:</span>
              <span className="font-medium text-white mt-0.5 block">{activeMilestone.keyArtifact}</span>
            </div>
          </div>

          {/* Tri-Column Deep Dive: What I Learned, What I Built, What Changed */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* What I learned */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <span className="text-xs font-mono text-[#ffb829] font-medium block">
                WHAT I MASTERED & DISCOVERED
              </span>
              <ul className="space-y-2 text-xs text-[#bdbdbd] font-extralight leading-relaxed">
                {(activeMilestone.learned ?? []).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#ffb829] mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What I built */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <span className="text-xs font-mono text-[#8052ff] font-medium block">
                WHAT I SHIPPED & ARCHITECTED
              </span>
              <ul className="space-y-2 text-xs text-[#bdbdbd] font-extralight leading-relaxed">
                {(activeMilestone.built ?? []).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#8052ff] mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What changed */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-[#15846e] font-medium block">
                  THE MENTAL SHIFT
                </span>
                <p className="text-sm text-white font-extralight italic mt-3 leading-relaxed">
                  "{activeMilestone.changed}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 text-[11px] font-mono text-[#9a9a9a] flex items-center justify-between">
                <span>Evolutionary Vector</span>
                <span className="text-[#15846e]">Continuous Mastery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
