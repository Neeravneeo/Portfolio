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
        return <Palette className="w-5 h-5 text-[#8052ff]" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-[#15846e]" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#8052ff]" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-[#ffb829]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#9a9a9a]" />;
    }
  };

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-16">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#9a9a9a]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ffb829] shadow-[0_0_6px_#ffb829] animate-pulse" />
          <span>05. THE BUILDER BEHIND THE OS</span>
          <span>•</span>
          <span className="text-[#bdbdbd]">PHILOSOPHY & CRAFT</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal text-white tracking-[-0.035em] leading-[1.08]">
          About Me
        </h2>

        <p className="text-[#bdbdbd] font-extralight text-lg sm:text-xl leading-[1.65] max-w-2xl">
          Who is Neerav outside the project cards? A builder operating seamlessly across
          product intuition, design systems, and distributed system engineering.
        </p>
      </div>

      {/* 1. SHORT INTRODUCTION & THE FOUR PILLARS */}
      <div className="space-y-6">
        <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-2xl space-y-4">
          <h3 className="text-2xl sm:text-3xl font-normal text-white tracking-tight">
            Designer at Heart. Engineer by Craft.
          </h3>
          <p className="text-[#bdbdbd] font-extralight text-base sm:text-lg leading-relaxed max-w-4xl">
            {profileData.bio}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {profileData.pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center">
                {getPillarIcon(pillar.icon)}
              </div>
              <h4 className="text-base font-normal text-white">{pillar.title}</h4>
              <p className="text-xs text-[#bdbdbd] font-extralight leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. WHAT I CARE ABOUT */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9a9a9a]">
          <span>↓ WHAT I CARE ABOUT</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profileData.whatICareAbout.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-2">
              <h4 className="text-lg font-normal text-white flex items-center gap-2">
                <span className="text-xs font-mono text-[#8052ff]">0{idx + 1}.</span>
                <span>{item.title}</span>
              </h4>
              <p className="text-xs sm:text-sm text-[#bdbdbd] font-extralight leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. WHAT I WORK WITH (TECH MATRIX) */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9a9a9a]">
          <span>↓ WHAT I WORK WITH</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Design */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <span className="text-xs font-mono text-[#8052ff] uppercase tracking-wider">Design & Systems</span>
            <ul className="space-y-1.5 text-xs font-mono text-[#bdbdbd]">
              {profileData.techStack.design.map((t) => (
                <li key={t}>• {t}</li>
              ))}
            </ul>
          </div>

          {/* Frontend */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <span className="text-xs font-mono text-[#8052ff] uppercase tracking-wider">Frontend Architecture</span>
            <ul className="space-y-1.5 text-xs font-mono text-[#bdbdbd]">
              {profileData.techStack.frontend.map((t) => (
                <li key={t}>• {t}</li>
              ))}
            </ul>
          </div>

          {/* Backend */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <span className="text-xs font-mono text-[#15846e] uppercase tracking-wider">Backend & Cloud</span>
            <ul className="space-y-1.5 text-xs font-mono text-[#bdbdbd]">
              {profileData.techStack.backend.map((t) => (
                <li key={t}>• {t}</li>
              ))}
            </ul>
          </div>

          {/* AI & Automation */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <span className="text-xs font-mono text-[#ffb829] uppercase tracking-wider">AI & Automation</span>
            <ul className="space-y-1.5 text-xs font-mono text-[#bdbdbd]">
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
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9a9a9a]">
            <Briefcase className="w-4 h-4" />
            <span>EXPERIENCE</span>
          </div>

          <div className="space-y-4">
            {profileData.experience.map((exp, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="text-base font-normal text-white">{exp.role}</h4>
                  <span className="text-xs font-mono text-[#9a9a9a]">{exp.period}</span>
                </div>
                <span className="text-xs font-mono text-[#8052ff] block">{exp.company}</span>
                <p className="text-xs text-[#bdbdbd] font-extralight leading-relaxed pt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Resume Action */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9a9a9a]">
            <GraduationCap className="w-4 h-4" />
            <span>EDUCATION</span>
          </div>

          {profileData.education.map((edu, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
              <h4 className="text-sm font-normal text-white">{edu.degree}</h4>
              <p className="text-xs text-[#9a9a9a]">{edu.institution}</p>
              <div className="text-[11px] font-mono text-[#15846e] pt-1">{edu.focus}</div>
              <span className="text-[10px] font-mono text-[#9a9a9a] block">{edu.period}</span>
            </div>
          ))}

          {/* Resume Card */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/15 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#8052ff]/20 text-[#8052ff] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-normal text-white">Full Curriculum Vitae</h4>
                <p className="text-[11px] text-[#9a9a9a] font-mono">Updated for 2025/2026</p>
              </div>
            </div>

            <button
              onClick={onOpenResume}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-mono font-medium border border-white/15 transition-all"
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
