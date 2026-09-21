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
    <section id="work" className="relative py-28 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#9a9a9a]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ffb829] shadow-[0_0_6px_#ffb829] animate-pulse" />
          <span>02. WORK UNIVERSE</span>
          <span>•</span>
          <span className="text-[#bdbdbd]">INTERACTIVE SYSTEMS</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal text-white tracking-[-0.035em] leading-[1.08]">
          Things I've Designed & Built.
        </h2>

        <p className="text-[#bdbdbd] font-extralight text-lg sm:text-xl leading-[1.65] max-w-2xl">
          Not a static mockup reel. Every project is an{' '}
          <span className="font-normal text-white">interactive simulation</span> engineered to expose
          the product's real architecture, design trade-offs, and state flows.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {categories.map((category) => {
            const isSelected = selectedFilter === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedFilter(category)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 border ${
                  isSelected
                    ? isDesigner
                      ? 'bg-[#8052ff] text-white border-[#8052ff] shadow-lg shadow-[#8052ff]/25'
                      : 'bg-[#15846e] text-white border-[#15846e] shadow-lg shadow-[#15846e]/25'
                    : 'bg-white/[0.03] text-[#9a9a9a] border-white/10 hover:text-white hover:border-white/20 hover:bg-white/[0.06]'
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
      <div className="mt-14 text-center text-xs font-mono text-[#9a9a9a] flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#ffb829]" />
        <span>Select any project to launch its custom spatial simulator & dual-lens case study</span>
      </div>
    </section>
  );
};
