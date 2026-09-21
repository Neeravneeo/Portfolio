import React from 'react';
import { usePerspective } from '../../context/PerspectiveContext';
import { CosmicObject } from '../3d/CosmicObject';
import { ArrowRight, FileText, ChevronDown, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onExploreWork: () => void;
  onOpenResume?: () => void;
  onSelectProject?: (projectId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreWork,
  onOpenResume,
  onSelectProject,
}) => {
  const { isDesigner } = usePerspective();

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 sm:px-10 lg:px-16 overflow-hidden bg-[#0a0a0a]"
    >
      {/* Subtle organic ambient glow */}
      <div
        className={`absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full filter blur-[180px] pointer-events-none transition-colors duration-1000 opacity-25 ${
          isDesigner ? 'bg-[#f59e0b]' : 'bg-[#06b6d4]'
        }`}
      />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full filter blur-[180px] pointer-events-none opacity-15 bg-[#8052ff]" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10 my-auto">
        {/* Left Column: Monolithic Editorial Typography */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-8">
          {/* Subtle Monospace Category Beacon */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1 rounded-full bg-[#111111] border border-[#222222] text-xs font-mono tracking-widest text-[#a1a1aa]">
            <span
              className={`w-2 h-2 rounded-full animate-pulse ${
                isDesigner ? 'bg-[#f59e0b] shadow-[0_0_10px_#f59e0b]' : 'bg-[#06b6d4] shadow-[0_0_10px_#06b6d4]'
              }`}
            />
            <span className="text-[#fafafa]">NEERAV</span>
            <span className="text-[#71717a]">•</span>
            <span className={isDesigner ? 'text-[#f59e0b]' : 'text-[#06b6d4]'}>
              {isDesigner ? 'DESIGNER' : 'ENGINEER'} PERSPECTIVE
            </span>
          </div>

          {/* Monolithic Editorial Serif Headline */}
          <div className="space-y-1">
            <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-[84px] xl:text-[96px] font-normal tracking-[-0.03em] text-[#fafafa] leading-[0.98]">
              DESIGN FUTURES.
              <br />
              <span
                className={`transition-colors duration-500 italic ${
                  isDesigner ? 'text-[#f59e0b]' : 'text-[#06b6d4]'
                }`}
              >
                I BUILD SYSTEMS.
              </span>
            </h1>
          </div>

          {/* Subtitle with Editorial Line Height & Zinc Typography */}
          <p className="text-base sm:text-lg md:text-[18px] text-[#a1a1aa] font-normal leading-[1.7] max-w-xl">
            <strong className="font-medium text-[#fafafa]">Designer at heart. Engineer by craft.</strong>{' '}
            Translating complex human friction into scalable, high-performance digital ecosystems
            across AI agents, healthcare systems, and spatial interfaces.
          </p>

          {/* Editorial CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExploreWork}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-medium bg-[#fafafa] text-[#0a0a0a] hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-white/5 cursor-pointer"
            >
              <span>EXPLORE WORK</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium bg-transparent text-[#fafafa] border border-[#222222] hover:border-[#fafafa] hover:bg-white/[0.03] transition-all duration-300 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#71717a]" />
                <span>VIEW RESUME</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Dala Constellation */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div className="relative w-full flex items-center justify-center">
            <CosmicObject />
          </div>

          <div className="mt-2 flex items-center gap-6 text-xs font-mono text-[#71717a]">
            <span>SPATIAL CONSTELLATION</span>
            <span>•</span>
            <span className="text-[#fafafa]">LIVE WEBGL2 ENGINE</span>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="flex flex-col items-center justify-center z-10 pt-8 animate-bounce">
        <button
          onClick={onExploreWork}
          className="flex flex-col items-center gap-1.5 text-xs font-mono text-[#71717a] hover:text-[#fafafa] transition-colors cursor-pointer"
          aria-label="Scroll to work"
        >
          <span>SCROLL TO DISCOVER</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
