import React, { useState } from 'react';
import { journeyMilestones } from '../../data/journeyData';
import { usePerspective } from '../../context/PerspectiveContext';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const JourneySection: React.FC = () => {
  const { isDesigner } = usePerspective();
  const [activeYear, setActiveYear] = useState<string>('2025');

  return (
    <section id="journey" className="relative py-32 px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto space-y-20">
      {/* Editorial Section Header */}
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#f59e0b]">
          <span className="w-2 h-2 rounded-full bg-[#f59e0b] shadow-[0_0_8px_#f59e0b] animate-pulse" />
          <span>EVOLUTION TIMELINE</span>
        </div>

        <h2 className="font-editorial text-4xl sm:text-5xl lg:text-[54px] font-normal text-[#fafafa] tracking-tight leading-[1.08]">
          MY JOURNEY THROUGH CYBERSPACE
        </h2>

        <p className="text-base sm:text-lg text-[#a1a1aa] font-normal leading-[1.7]">
          Not a static resume timeline. This is my <strong className="text-[#fafafa] font-medium">evolution as a builder</strong>—how
          foundations in design and engineering catalyzed into autonomous, human-centered intelligent systems.
        </p>
      </div>

      {/* Vertical Editorial Timeline */}
      <div className="relative pl-6 sm:pl-10 space-y-16 border-l border-[#22222a]">
        {journeyMilestones.map((m) => {
          const isActive = m.year === activeYear;
          return (
            <div
              key={m.year}
              onClick={() => setActiveYear(m.year)}
              className="relative group cursor-pointer"
            >
              {/* Glowing Node on Timeline Line */}
              <div
                className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  isActive
                    ? 'bg-[#f59e0b] border-[#f59e0b] shadow-[0_0_20px_rgba(245,158,11,0.6)] scale-125'
                    : 'bg-[#111111] border-[#222222] group-hover:border-[#f59e0b]/50'
                }`}
              />

              {/* Entry Content Card */}
              <div
                className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 space-y-5 ${
                  isActive
                    ? 'bg-[#141414] border-[#383838] shadow-2xl shadow-black/80'
                    : 'bg-[#111111]/80 border-[#222222] hover:border-[#303030]'
                }`}
              >
                {/* Year Header & Theme */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-[#1a1a1a] text-[#f59e0b] border border-white/5">
                      {m.year === '2026' ? '2026 NOW' : m.year}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-sans font-semibold text-[#fafafa]">
                      {m.title}
                    </h3>
                  </div>

                  <span className="text-xs font-mono uppercase tracking-wider text-[#71717a]">
                    CHAPTER: {m.theme}
                  </span>
                </div>

                {/* Subtitle / Key Artifact */}
                <div className="flex items-center gap-2 text-xs font-mono text-[#a1a1aa]">
                  <span>KEY ARTIFACT:</span>
                  <span className="text-[#fafafa]">{m.keyArtifact}</span>
                  {m.stats && (
                    <>
                      <span>•</span>
                      <span className="text-[#71717a]">{m.stats}</span>
                    </>
                  )}
                </div>

                {/* Two-Column Deep Dive: What I Mastered & What I Built */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Column 1: What I Mastered */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#f59e0b] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>WHAT I MASTERED & DISCOVERED</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-[#71717a] leading-relaxed">
                      {m.learned.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#f59e0b] mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 2: What I Built */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#06b6d4] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>WHAT I BUILT & ARCHITECTED</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-[#71717a] leading-relaxed">
                      {m.built.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#06b6d4] mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Editorial Quote: Paradigm Shift */}
                <div className="pt-3 border-t border-[#222222]">
                  <blockquote className="font-editorial text-base sm:text-lg italic text-[#fafafa] border-l-2 border-[#f59e0b] pl-4 py-0.5 leading-snug">
                    "{m.changed}"
                  </blockquote>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
