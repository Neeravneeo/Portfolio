import React, { useState } from 'react';
import { profileData } from '../../data/profileData';
import { usePerspective } from '../../context/PerspectiveContext';
import {
  User,
  Palette,
  Cpu,
  Compass,
  Zap,
  FileText,
  Download,
  GraduationCap,
  Briefcase,
  ExternalLink,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface AboutSectionProps {
  onOpenResume?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenResume }) => {
  const { isDesigner } = usePerspective();

  const getPillarIcon = (icon: string) => {
    switch (icon) {
      case 'Palette':
        return <Palette className="w-5 h-5 text-violet-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-emerald-400" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-cyan-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-white/10 text-xs font-mono">
          <User className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-400">05. THE BUILDER BEHIND THE OS</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          About Me
        </h2>

        <p className="text-slate-400 max-w-2xl text-base sm:text-lg leading-relaxed">
          Who is Neerav outside the project cards? A craftsman operating seamlessly across
          product intuition, design systems, and distributed system engineering.
        </p>
      </div>

      {/* 1. SHORT INTRODUCTION & THE FOUR PILLARS */}
      <div className="space-y-6">
        <div className="p-8 rounded-3xl glass-panel border border-white/15 bg-space-950/80 shadow-2xl space-y-4">
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Designer at Heart. Engineer by Craft.
          </h3>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-4xl">
            {profileData.bio}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {profileData.pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="p-6 rounded-2xl glass-panel border border-white/10 bg-space-900/60 hover:border-white/20 transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                {getPillarIcon(pillar.icon)}
              </div>
              <h4 className="text-base font-bold text-white">{pillar.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. WHAT I CARE ABOUT */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
          <span>↓ WHAT I CARE ABOUT</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profileData.whatICareAbout.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl glass-panel border border-white/10 space-y-2">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-xs font-mono text-violet-400">0{idx + 1}.</span>
                <span>{item.title}</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. WHAT I WORK WITH (TECH MATRIX) */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
          <span>↓ WHAT I WORK WITH</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Design */}
          <div className="p-6 rounded-2xl bg-space-900/80 border border-white/10 space-y-3">
            <span className="text-xs font-mono text-violet-400 font-bold uppercase">Design & Systems</span>
            <ul className="space-y-1.5 text-xs font-mono text-slate-300">
              {profileData.techStack.design.map((t) => (
                <li key={t}>• {t}</li>
              ))}
            </ul>
          </div>

          {/* Frontend */}
          <div className="p-6 rounded-2xl bg-space-900/80 border border-white/10 space-y-3">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Frontend Architecture</span>
            <ul className="space-y-1.5 text-xs font-mono text-slate-300">
              {profileData.techStack.frontend.map((t) => (
                <li key={t}>• {t}</li>
              ))}
            </ul>
          </div>

          {/* Backend */}
          <div className="p-6 rounded-2xl bg-space-900/80 border border-white/10 space-y-3">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Backend & Cloud</span>
            <ul className="space-y-1.5 text-xs font-mono text-slate-300">
              {profileData.techStack.backend.map((t) => (
                <li key={t}>• {t}</li>
              ))}
            </ul>
          </div>

          {/* AI & Automation */}
          <div className="p-6 rounded-2xl bg-space-900/80 border border-white/10 space-y-3">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase">AI & Automation</span>
            <ul className="space-y-1.5 text-xs font-mono text-slate-300">
              {profileData.techStack.aiAndAutomation.map((t) => (
                <li key={t}>• {t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 4. EXPERIENCE & EDUCATION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Experience */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
            <Briefcase className="w-4 h-4" />
            <span>EXPERIENCE</span>
          </div>

          <div className="space-y-4">
            {profileData.experience.map((exp, idx) => (
              <div key={idx} className="p-6 rounded-2xl glass-panel border border-white/10 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="text-base font-bold text-white">{exp.role}</h4>
                  <span className="text-xs font-mono text-slate-400">{exp.period}</span>
                </div>
                <span className="text-xs font-mono text-violet-400 block">{exp.company}</span>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Resume Action */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
            <GraduationCap className="w-4 h-4" />
            <span>EDUCATION</span>
          </div>

          {profileData.education.map((edu, idx) => (
            <div key={idx} className="p-6 rounded-2xl glass-panel border border-white/10 space-y-2">
              <h4 className="text-sm font-bold text-white">{edu.degree}</h4>
              <p className="text-xs text-slate-400">{edu.institution}</p>
              <div className="text-[11px] font-mono text-emerald-400 pt-1">{edu.focus}</div>
              <span className="text-[10px] font-mono text-slate-500 block">{edu.period}</span>
            </div>
          ))}

          {/* Resume Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-space-900 to-space-850 border border-white/15 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Full Curriculum Vitae</h4>
                <p className="text-[11px] text-slate-400">Updated for 2025/2026</p>
              </div>
            </div>

            <button
              onClick={onOpenResume}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono font-semibold border border-white/15 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>VIEW COMPLETE RESUME</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
