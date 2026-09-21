import React from 'react';
import { usePerspective } from '../../context/PerspectiveContext';
import { CosmicObject } from '../3d/CosmicObject';
import { ArrowRight, FileText, Sparkles, Terminal, Compass } from 'lucide-react';

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
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background ambient radial glow */}
      <div
        className={`absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full filter blur-[140px] pointer-events-none transition-colors duration-700 ${
          isDesigner ? 'bg-violet-600/15' : 'bg-emerald-600/15'
        }`}
      />
      <div
        className={`absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full filter blur-[140px] pointer-events-none transition-colors duration-700 ${
          isDesigner ? 'bg-fuchsia-600/10' : 'bg-cyan-600/10'
        }`}
      />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        {/* Left Column: Typography, Identity & Core Actions */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          {/* Identity Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-white/10 text-xs font-mono tracking-wide shadow-sm">
            <span
              className={`w-2 h-2 rounded-full animate-ping ${
                isDesigner ? 'bg-violet-400' : 'bg-emerald-400'
              }`}
            />
            <span className="text-slate-300 font-medium">NEERAV.OS v2.6</span>
            <span className="text-slate-600">•</span>
            <span className={isDesigner ? 'text-violet-300' : 'text-emerald-300'}>
              {isDesigner ? 'DESIGNER PERSPECTIVE' : 'ENGINEER PERSPECTIVE'}
            </span>
          </div>

          {/* Salutation & Hero Statement */}
          <div className="space-y-3">
            <h2 className="text-sm sm:text-base font-mono uppercase tracking-[0.25em] text-slate-400">
              HELLO, I'M NEERAV
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              I DESIGN FUTURES.
              <br />
              <span
                className={`bg-clip-text text-transparent bg-gradient-to-r ${
                  isDesigner
                    ? 'from-violet-400 via-fuchsia-300 to-pink-500'
                    : 'from-emerald-400 via-teal-300 to-cyan-400'
                }`}
              >
                I BUILD SOLUTIONS.
              </span>
            </h1>
          </div>

          {/* Subtitle / Philosophy */}
          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
            <span className="font-semibold text-white">Designer at heart. Engineer by craft.</span>{' '}
            I turn ambitious ideas into meaningful, high-performance digital products across AI,
            automation, and human-centered systems.
          </p>

          {/* Core Quad Pill Tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {['Designer', 'Engineer', 'AI Systems', 'Automation'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-md text-xs font-mono text-slate-300 bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={onExploreWork}
              className={`group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-medium text-sm text-white shadow-lg transition-all duration-300 overflow-hidden ${
                isDesigner
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:shadow-violet-500/25 hover:scale-[1.02]'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-emerald-500/25 hover:scale-[1.02]'
              }`}
            >
              <span>Explore Work</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium text-sm text-slate-200 bg-white/5 hover:bg-white/10 border border-white/15 backdrop-blur-md transition-all duration-200 hover:text-white"
              >
                <FileText className="w-4 h-4 text-slate-400" />
                <span>View Resume</span>
              </button>
            )}
          </div>

          {/* Current Focus Pod (Peer Club) */}
          <div className="pt-6 w-full max-w-md">
            <button
              type="button"
              onClick={() => onSelectProject && onSelectProject('peerclub')}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl glass-panel border border-white/10 hover:border-white/20 transition-all duration-300 group text-left"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    isDesigner ? 'bg-violet-600/20 text-violet-300' : 'bg-emerald-600/20 text-emerald-300'
                  }`}
                >
                  <Sparkles className="w-4 h-4 animate-spin-slow" />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Currently Exploring
                  </p>
                  <p className="text-sm font-semibold text-white flex items-center gap-1.5">
                    PEER CLUB
                    <span className="text-xs font-normal text-slate-400 font-mono">— Collaborative Learning</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-mono text-slate-400 group-hover:text-white transition-colors">
                <span>OPEN</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          </div>
        </div>

        {/* Right Column: 3D Cosmic Object */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div className="relative w-full flex items-center justify-center">
            <CosmicObject />
          </div>

          {/* Interactive hints and telemetry tags */}
          <div className="mt-4 flex items-center gap-6 text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-slate-500" />
              <span>3D SPATIAL GESTURE</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-slate-500" />
              <span>60 FPS KERNEL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
