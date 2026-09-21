import React, { useState, useRef } from 'react';
import { projectsData } from '../../data/projectsData';
import { ProjectCard } from './ProjectCard';
import { ProjectCategory } from '../../types';
import { usePerspective } from '../../context/PerspectiveContext';
import { ArrowRight, Sparkles, Layers, Activity, ShieldCheck, Heart } from 'lucide-react';

import { AlzoShowcase3D } from '../3d/AlzoShowcase3D';

interface WorkSectionProps {
  onOpenExperience: (projectId: string) => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ onOpenExperience }) => {
  const { isDesigner } = usePerspective();
  const [selectedFilter, setSelectedFilter] = useState<ProjectCategory>('All');

  const categories: ProjectCategory[] = [
    'All',
    'Design',
    'Engineering',
    'AI',
    'Automation',
    'Research',
  ];

  // Separate ALZO from other archive projects
  const alzoProject = projectsData.find((p) => p.id === 'alzo') || projectsData[0];
  const archiveProjects = projectsData.filter((p) => p.id !== 'alzo');

  const filteredArchive =
    selectedFilter === 'All'
      ? archiveProjects
      : archiveProjects.filter((p) => p.category.includes(selectedFilter));

  return (
    <section id="work" className="relative py-32 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto space-y-32">
      {/* 1. FEATURED PROJECT SPOTLIGHT: ALZO (60/40 Asymmetric Editorial Grid) */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#111111] to-[#0d0d0d] border border-[#222222] p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#f59e0b]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (60% equivalent: 7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Amber Monospace Label */}
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#f59e0b]">
              <span className="w-2 h-2 rounded-full bg-[#f59e0b] shadow-[0_0_8px_#f59e0b] animate-pulse" />
              <span>FEATURED PROJECT</span>
            </div>

            {/* Editorial Title & Subtitle */}
            <div className="space-y-2">
              <h2 className="font-editorial text-5xl sm:text-6xl lg:text-[68px] font-normal text-[#fafafa] tracking-tight leading-[1.02]">
                ALZO
              </h2>
              <p className="text-xl sm:text-2xl text-[#a1a1aa] font-normal">
                AI-Assisted Healthcare Ecosystem
              </p>
            </div>

            {/* Narrative Description */}
            <p className="text-base text-[#71717a] leading-relaxed max-w-lg">
              A unified 3-way symbiotic ecosystem connecting{' '}
              <strong className="text-[#fafafa] font-medium">Doctor, Caregiver, and Patient</strong>{' '}
              through predictive edge telemetry, continuous vital monitoring, and neuro-accessible spatial interaction.
            </p>

            {/* 3 Roles Badge Matrix */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {[
                { label: 'Doctor Hub', icon: Activity, color: '#06b6d4' },
                { label: 'Caregiver Console', icon: Heart, color: '#f59e0b' },
                { label: 'Patient Surface', icon: ShieldCheck, color: '#10b981' },
              ].map((role) => {
                const Icon = role.icon;
                return (
                  <span
                    key={role.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-[#1a1a1a] text-[#a1a1aa] border border-[#262626]"
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: role.color }} />
                    <span>{role.label}</span>
                  </span>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={() => onOpenExperience('alzo')}
                className="inline-flex items-center gap-2.5 text-sm font-mono tracking-wider text-[#fafafa] hover:text-[#f59e0b] group transition-colors cursor-pointer"
              >
                <span>LAUNCH CASE STUDY & 3-ROLE SIMULATOR</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 text-[#f59e0b]" />
              </button>
            </div>
          </div>

          {/* Right Column (40% equivalent: 5 cols): Interactive 3D WebGL Showcase */}
          <div className="lg:col-span-5 flex items-center justify-center w-full">
            <AlzoShowcase3D onOpenExperience={() => onOpenExperience('alzo')} />
          </div>
        </div>
      </div>

      {/* 2. SELECTED WORK ARCHIVE (Vertical Stack with 64px Spacing) */}
      <div className="space-y-12">
        {/* Section Title */}
        <div className="space-y-4 max-w-2xl">
          <h3 className="font-editorial text-4xl sm:text-5xl font-normal text-[#fafafa] tracking-tight">
            SELECTED WORK
          </h3>
          <p className="text-base text-[#a1a1aa] leading-relaxed">
            Not a static mockup reel. Every project is an{' '}
            <strong className="text-[#fafafa] font-medium">interactive simulation</strong> engineered to expose
            the product's real architecture, design trade-offs, and state flows.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {categories.map((category) => {
              const isSelected = selectedFilter === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedFilter(category)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 border cursor-pointer ${
                    isSelected
                      ? 'bg-[#fafafa] text-[#0a0a0a] border-[#fafafa] font-medium'
                      : 'bg-[#111111] text-[#a1a1aa] border-[#222222] hover:text-[#fafafa] hover:border-[#383838]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Vertical Stack with 64px Spacing */}
        <div className="space-y-16">
          {filteredArchive.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenExperience={onOpenExperience}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
