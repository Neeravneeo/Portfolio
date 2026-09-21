import React, { useState } from 'react';
import { projectsData } from '../../data/projectsData';
import { ProjectCard } from './ProjectCard';
import { ProjectCategory } from '../../types';
import { usePerspective } from '../../context/PerspectiveContext';
import { Sparkles, Compass } from 'lucide-react';

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

  const filteredProjects =
    selectedFilter === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category.includes(selectedFilter));

  return (
    <section id="work" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-white/10 text-xs font-mono">
          <Compass className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-400">02. WORK UNIVERSE</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Things I've Designed & Built.
        </h2>

        <p className="text-slate-400 max-w-2xl text-base sm:text-lg leading-relaxed">
          Not a static showcase. Each project is an{' '}
          <span className="text-white font-medium">interactive system</span> engineered to match the
          authentic nature of the product.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {categories.map((category) => {
            const isSelected = selectedFilter === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedFilter(category)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 border ${
                  isSelected
                    ? isDesigner
                      ? 'bg-violet-600 text-white border-violet-400 shadow-glow-designer'
                      : 'bg-emerald-600 text-white border-emerald-400 shadow-glow-engineer'
                    : 'bg-space-900/60 text-slate-400 border-white/10 hover:text-slate-200 hover:border-white/20'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenExperience={onOpenExperience}
          />
        ))}
      </div>

      {/* Subtle universe hint */}
      <div className="mt-12 text-center text-xs font-mono text-slate-500 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-slate-500" />
        <span>Click any card to launch its custom spatial simulator & dual-lens case study</span>
      </div>
    </section>
  );
};
