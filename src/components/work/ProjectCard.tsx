import React, { useState, useRef } from 'react';
import { Project } from '../../types';
import { usePerspective } from '../../context/PerspectiveContext';
import { ArrowUpRight, Cpu, Layers, Sparkles, Activity } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onOpenExperience: (projectId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenExperience }) => {
  const { isDesigner } = usePerspective();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setRotX(rotateX);
    setRotY(rotateY);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotX(0);
    setRotY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenExperience(project.id)}
      style={{
        transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${
          isHovered ? 1.02 : 1
        }, ${isHovered ? 1.02 : 1}, 1)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
      className={`group relative rounded-2xl glass-panel p-6 sm:p-7 flex flex-col justify-between cursor-pointer border transition-all duration-300 overflow-hidden ${
        isHovered
          ? isDesigner
            ? 'border-violet-500/50 shadow-glow-designer bg-space-850/90'
            : 'border-emerald-500/50 shadow-glow-engineer bg-space-850/90'
          : 'border-white/10 hover:border-white/20'
      }`}
    >
      {/* Dynamic top gradient aura */}
      <div
        className={`absolute -top-24 -right-24 w-48 h-48 rounded-full filter blur-3xl opacity-20 transition-opacity duration-300 group-hover:opacity-40 pointer-events-none ${
          isDesigner ? 'bg-violet-500' : 'bg-emerald-500'
        }`}
      />

      {/* Top Header info */}
      <div className="space-y-3 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wider uppercase font-semibold ${
                isDesigner
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}
            >
              {project.status}
            </span>
            <span className="text-xs font-mono text-slate-500">{project.year}</span>
          </div>

          <button
            type="button"
            className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-white/10 flex items-center justify-center text-slate-400 group-hover:text-white transition-all duration-200"
            aria-label={`Open ${project.title}`}
          >
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <p
            className={`text-xs font-mono tracking-wide mt-0.5 ${
              isDesigner ? 'text-violet-300' : 'text-emerald-300'
            }`}
          >
            {project.subtitle}
          </p>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed line-clamp-2">
          {project.tagline}
        </p>
      </div>

      {/* Center Interactive Perspective Preview Snippet */}
      <div className="my-5 p-3.5 rounded-xl bg-space-950/60 border border-white/5 space-y-2 z-10">
        {isDesigner ? (
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-violet-300 mb-1">
              <Layers className="w-3 h-3" />
              <span>DESIGN LENS</span>
            </div>
            <p className="text-xs text-slate-300 line-clamp-2 font-sans italic">
              "{project.designer.headline}"
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-300 mb-1">
              <Cpu className="w-3 h-3" />
              <span>ENGINEER LENS</span>
            </div>
            <p className="text-xs text-slate-300 line-clamp-2 font-mono">
              {project.engineer.headline}
            </p>
          </div>
        )}

        {/* Metrics Bar */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
          {project.metrics.slice(0, 2).map((m, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tight">
                {m.label}
              </span>
              <span className="text-sm font-mono font-bold text-white">
                {m.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer: Tags & Experience Launch trigger */}
      <div className="space-y-3 z-10">
        <div className="flex flex-wrap gap-1.5">
          {isDesigner
            ? project.category.map((cat) => (
                <span
                  key={cat}
                  className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-white/5"
                >
                  {cat}
                </span>
              ))
            : project.engineer.techStack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400/80 bg-emerald-950/30 border border-emerald-500/20"
                >
                  {tech}
                </span>
              ))}
        </div>

        <div className="pt-2 flex items-center justify-between text-xs font-mono">
          <span
            className={`flex items-center gap-1.5 font-medium ${
              isDesigner ? 'text-violet-400' : 'text-emerald-400'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Open Experience</span>
          </span>
          <span className="text-slate-500 group-hover:text-slate-300 transition-colors">
            Interactive Space →
          </span>
        </div>
      </div>
    </div>
  );
};
