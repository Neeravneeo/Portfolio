import React from 'react';
import { Project } from '../../types';
import { usePerspective } from '../../context/PerspectiveContext';
import { TiltCard } from '../common/TiltCard';
import { ArrowUpRight, Cpu, Layers } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onOpenExperience: (projectId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenExperience }) => {
  const { isDesigner } = usePerspective();

  // Resilience Fix 4: Defensive fallbacks for nested lens objects
  const designerHeadline = project.designer?.headline ?? 'System architecture and experience mapping';
  const engineerHeadline = project.engineer?.headline ?? 'Technical pipeline and performance metrics';
  const techStack = project.engineer?.techStack ?? [];
  const categories = project.category ?? [];
  const metrics = project.metrics ?? [];

  return (
    <TiltCard
      onClick={() => onOpenExperience(project.id)}
      maxTilt={10}
      scale={1.02}
      className="p-6 sm:p-7 flex flex-col justify-between bg-black/40 border border-white/10 hover:border-white/25 transition-all duration-300 group"
    >
      {/* Dynamic top gradient aura */}
      <div
        className={`absolute -top-24 -right-24 w-48 h-48 rounded-full filter blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-40 pointer-events-none ${
          isDesigner ? 'bg-[#8052ff]' : 'bg-[#15846e]'
        }`}
      />

      {/* Top Header info */}
      <div className="space-y-3 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold ${
                isDesigner
                  ? 'bg-[#8052ff]/15 text-[#8052ff] border border-[#8052ff]/30'
                  : 'bg-[#15846e]/15 text-[#15846e] border border-[#15846e]/30'
              }`}
            >
              {project.status || 'Active'}
            </span>
            <span className="text-xs font-mono text-[#9a9a9a]">{project.year}</span>
          </div>

          <button
            type="button"
            className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-white/10 flex items-center justify-center text-[#9a9a9a] group-hover:text-white transition-all duration-200"
            aria-label={`Open ${project.title}`}
          >
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#8052ff]" />
          </button>
        </div>

        <div>
          <h3 className="text-2xl font-normal tracking-tight text-white group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <p
            className={`text-xs font-mono tracking-wide mt-0.5 ${
              isDesigner ? 'text-[#8052ff]' : 'text-[#15846e]'
            }`}
          >
            {project.subtitle}
          </p>
        </div>

        <p className="text-sm text-[#bdbdbd] font-extralight leading-relaxed line-clamp-2">
          {project.tagline}
        </p>
      </div>

      {/* Center Interactive Perspective Preview Snippet */}
      <div className="my-5 p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5 z-10">
        {isDesigner ? (
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-[#8052ff] uppercase mb-1">
              <Layers className="w-3 h-3" />
              <span>DESIGN LENS</span>
            </div>
            <p className="text-xs text-[#bdbdbd] line-clamp-2 font-sans italic font-light">
              "{designerHeadline}"
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-[#15846e] uppercase mb-1">
              <Cpu className="w-3 h-3" />
              <span>ENGINEER LENS</span>
            </div>
            <p className="text-xs text-[#bdbdbd] line-clamp-2 font-mono">
              {engineerHeadline}
            </p>
          </div>
        )}

        {/* Metrics Bar */}
        {metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-white/5">
            {metrics.slice(0, 2).map((m, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[10px] font-mono text-[#9a9a9a] uppercase tracking-wider">
                  {m.label}
                </span>
                <span className="text-sm font-mono font-medium text-white">
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Footer: Tags & Experience Launch trigger */}
      <div className="space-y-3 z-10">
        <div className="flex flex-wrap gap-1.5">
          {isDesigner
            ? categories.map((cat) => (
                <span
                  key={cat}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-[#9a9a9a] bg-white/[0.04] border border-white/5"
                >
                  {cat}
                </span>
              ))
            : techStack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-[#15846e] bg-[#15846e]/10 border border-[#15846e]/20"
                >
                  {tech}
                </span>
              ))}
        </div>

        <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#9a9a9a] group-hover:text-white transition-colors">
          <span className="text-[11px] tracking-wider uppercase">Open Interactive Study</span>
          <span className={isDesigner ? 'text-[#8052ff] font-semibold' : 'text-[#15846e] font-semibold'}>
            →
          </span>
        </div>
      </div>
    </TiltCard>
  );
};
