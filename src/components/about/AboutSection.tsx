import React from 'react';
import { profileData } from '../../data/profileData';
import { usePerspective } from '../../context/PerspectiveContext';
import { Palette, Cpu, Compass, Zap, FileText, ArrowRight } from 'lucide-react';

import { SkillsConstellation3D } from '../3d/SkillsConstellation3D';

interface AboutSectionProps {
  onOpenResume?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenResume }) => {
  const { isDesigner } = usePerspective();

  const getPillarIcon = (icon: string) => {
    switch (icon) {
      case 'Palette':
        return <Palette className="w-5 h-5 text-[#f59e0b]" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-[#06b6d4]" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#8052ff]" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-[#ffb829]" />;
      default:
        return <Zap className="w-5 h-5 text-[#f59e0b]" />;
    }
  };

  return (
    <section id="about" className="relative py-32 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto space-y-28">
      {/* Section Header */}
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#f59e0b]">
          <span className="w-2 h-2 rounded-full bg-[#f59e0b] shadow-[0_0_8px_#f59e0b] animate-pulse" />
          <span>ABOUT ME</span>
        </div>

        <h2 className="font-editorial text-4xl sm:text-5xl lg:text-[54px] font-normal text-[#fafafa] tracking-tight leading-[1.08]">
          WHO IS NEERAV?
        </h2>

        <p className="text-base sm:text-lg text-[#a1a1aa] font-normal leading-[1.7]">
          Who is Neerav outside the project cards? A builder operating seamlessly across
          product intuition, design systems, and distributed system engineering.
        </p>
      </div>

      {/* 1. EDITORIAL STATEMENT & FOUR ROLE CARDS */}
      <div className="space-y-12">
        <div className="space-y-4 max-w-3xl">
          <h3 className="font-editorial text-3xl sm:text-4xl font-normal text-[#fafafa]">
            Designer at Heart. Engineer by Craft.
          </h3>
          <p className="text-base sm:text-lg text-[#a1a1aa] leading-[1.8]">
            {profileData.bio}
          </p>
        </div>

        {/* 4 Role Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {profileData.pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="p-6 rounded-2xl border border-[#222222] bg-[#111111] hover:bg-[#161616] hover:border-[#404040] transition-all duration-300 space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#262626] flex items-center justify-center">
                {getPillarIcon(pillar.icon)}
              </div>
              <h4 className="text-base font-semibold text-[#fafafa]">{pillar.title}</h4>
              <p className="text-xs text-[#71717a] leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. "WHAT I CARE ABOUT" (Numbered Vertical List) */}
      <div className="space-y-8 max-w-4xl">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#f59e0b]">
            PHILOSOPHY & PRINCIPLES
          </span>
          <h3 className="font-editorial text-3xl sm:text-4xl font-normal text-[#fafafa]">
            WHAT I CARE ABOUT
          </h3>
        </div>

        <div className="divide-y divide-[#222222] border-y border-[#222222]">
          {profileData.whatICareAbout.map((item, idx) => (
            <div key={item.title} className="py-8 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
              <span className="font-mono text-sm text-[#f59e0b] font-medium shrink-0 pt-0.5">
                0{idx + 1}.
              </span>
              <div className="space-y-2 flex-1">
                <h4 className="text-lg font-medium text-[#fafafa]">{item.title}</h4>
                <p className="text-sm sm:text-base text-[#71717a] leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. "WHAT I WORK WITH" (2-Column Tech Matrix) */}
      <div className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#06b6d4]">
            TECHNICAL CAPABILITIES
          </span>
          <h3 className="font-editorial text-3xl sm:text-4xl font-normal text-[#fafafa]">
            WHAT I WORK WITH
          </h3>
        </div>

        {/* 3D Interactive Skills Constellation Knowledge Graph */}
        <SkillsConstellation3D />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: 'DESIGN & SYSTEMS', skills: profileData.techStack.design, color: '#f59e0b' },
            { title: 'FRONTEND ARCHITECTURE', skills: profileData.techStack.frontend, color: '#06b6d4' },
            { title: 'BACKEND & DISTRIBUTED SYSTEMS', skills: profileData.techStack.backend, color: '#8052ff' },
            { title: 'AI & AUTONOMOUS AGENTS', skills: profileData.techStack.aiAndAutomation, color: '#10b981' },
          ].map((cat) => (
            <div
              key={cat.title}
              className="p-8 rounded-2xl border border-[#222222] bg-[#111111] space-y-4"
            >
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#a1a1aa]">
                {cat.title}
              </h4>
              <ul className="space-y-2">
                {cat.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-3 text-sm text-[#fafafa] font-normal">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 4. EXPERIENCE & EDUCATION */}
      <div className="space-y-8 max-w-4xl">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#71717a]">
            TRACK RECORD
          </span>
          <h3 className="font-editorial text-3xl sm:text-4xl font-normal text-[#fafafa]">
            EXPERIENCE & EDUCATION
          </h3>
        </div>

        <div className="space-y-8">
          {profileData.experience.map((exp) => (
            <div
              key={exp.role}
              className="p-8 rounded-2xl border border-[#222222] bg-[#111111] space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h4 className="text-lg font-semibold text-[#fafafa]">{exp.role}</h4>
                  <span className="text-sm font-mono text-[#f59e0b]">{exp.company}</span>
                </div>
                <span className="text-xs font-mono text-[#71717a]">{exp.period}</span>
              </div>
              <p className="text-sm text-[#71717a] leading-relaxed">{exp.description}</p>
            </div>
          ))}

          {profileData.education.map((edu) => (
            <div
              key={edu.degree}
              className="p-8 rounded-2xl border border-[#222222] bg-[#111111] space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h4 className="text-base font-semibold text-[#fafafa]">{edu.degree}</h4>
                <span className="text-xs font-mono text-[#71717a]">{edu.period}</span>
              </div>
              <div className="text-xs font-mono text-[#06b6d4]">{edu.institution}</div>
              <p className="text-xs text-[#71717a]">{edu.focus}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
