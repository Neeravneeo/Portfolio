import React, { useState } from 'react';
import { Project } from '../../types';
import { usePerspective } from '../../context/PerspectiveContext';
import { ChevronRight, ArrowRight, ExternalLink, Activity, Code, Palette, Zap } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onOpenExperience: (projectId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenExperience }) => {
  const { isDesigner } = usePerspective();
  const [isExpanded, setIsExpanded] = useState(false);

  // Resilience Fix 4: Defensive null checks on nested lens objects
  const designerHeadline = project.designer?.headline ?? 'Human-centered cognitive and interaction design';
  const engineerHeadline = project.engineer?.headline ?? 'Low-latency distributed systems architecture';
  const techStack = project.engineer?.techStack ?? [];
  const metrics = project.metrics ?? [];
  const overview = project.overview ?? project.tagline ?? '';

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 ${
        isExpanded
          ? 'bg-[#141414] border-[#404040] shadow-2xl shadow-black/80'
          : 'bg-[#111111] border-[#222222] hover:border-[#383838] hover:scale-[1.008]'
      }`}
    >
      {/* Main Visible Card Header & Summary (Click to expand/collapse) */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-8 sm:p-10 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 select-none"
      >
        <div className="space-y-3 min-w-0 flex-1">
          {/* Top Row: Year Pill & Category Chips */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#1a1a1a] text-[#71717a] border border-white/5">
              {project.year}
            </span>
            <span
              className={`text-xs font-mono px-2.5 py-0.5 rounded-full ${
                project.status === 'Production'
                  ? 'text-[#10b981] bg-[#10b981]/10'
                  : 'text-[#f59e0b] bg-[#f59e0b]/10'
              }`}
            >
              {project.status}
            </span>
            {project.category?.map((c) => (
              <span key={c} className="text-[11px] font-mono text-[#71717a]">
                #{c}
              </span>
            ))}
          </div>

          {/* Project Title: Editorial Serif */}
          <h3 className="font-editorial text-2xl sm:text-3xl lg:text-[34px] font-normal text-[#fafafa] tracking-[-0.02em] leading-tight">
            {project.title}
          </h3>

          {/* One-Line Subtitle */}
          <p className="text-base text-[#a1a1aa] font-normal leading-relaxed">
            {project.subtitle}
          </p>

          {/* Dual-Lens Highlight Snippet */}
          <div className="flex items-center gap-2 text-xs font-mono pt-1">
            {isDesigner ? (
              <span className="text-[#f59e0b] flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" />
                {designerHeadline}
              </span>
            ) : (
              <span className="text-[#06b6d4] flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5" />
                {engineerHeadline}
              </span>
            )}
          </div>
        </div>

        {/* Right CTA & Expand Toggle */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenExperience(project.id);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-medium bg-white/[0.04] hover:bg-white/[0.08] text-[#fafafa] border border-white/10 hover:border-white/20 transition-all cursor-pointer"
          >
            <span>LAUNCH</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#f59e0b]" />
          </button>

          <div
            className={`w-9 h-9 rounded-full bg-[#1a1a1a] border border-[#262626] flex items-center justify-center text-[#a1a1aa] transition-transform duration-300 ${
              isExpanded ? 'rotate-90 text-[#fafafa] bg-white/10' : ''
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Expanded Content Accordion (Smooth slide down) */}
      {isExpanded && (
        <div className="px-8 sm:px-10 pb-8 pt-2 border-t border-[#222222] space-y-6 animate-fadeIn">
          {/* Detailed Narrative */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#71717a]">
              Product Overview & Architecture
            </h4>
            <p className="text-sm sm:text-base text-[#a1a1aa] font-normal leading-[1.7] max-w-4xl">
              {overview}
            </p>
          </div>

          {/* Metrics Row in Emerald */}
          {metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 border-y border-[#222222]">
              {metrics.map((m) => (
                <div key={m.label} className="space-y-0.5">
                  <div className="text-xs font-mono text-[#71717a]">{m.label}</div>
                  <div className="text-lg sm:text-xl font-mono text-[#10b981] font-medium">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tech Stack Pills */}
          {techStack.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#71717a]">ENGINEERING STACK</span>
              <div className="flex flex-wrap gap-2 pt-1">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-md text-xs font-mono bg-[#1a1a1a] text-[#a1a1aa] border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Direct Launch Action */}
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs font-mono text-[#71717a]">
              Interactive Simulation • Zero Mockups
            </span>
            <button
              onClick={() => onOpenExperience(project.id)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-medium bg-[#fafafa] text-[#0a0a0a] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-white/5 cursor-pointer"
            >
              <span>EXPERIENCE LIVE SIMULATOR</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
