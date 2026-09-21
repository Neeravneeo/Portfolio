import React, { useState } from 'react';
import { Project } from '../../../types';
import { usePerspective } from '../../../context/PerspectiveContext';
import {
  ArrowLeft,
  GitBranch,
  GitCommit,
  GitPullRequest,
  GitMerge,
  FileCode,
  FolderGit2,
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  Terminal,
} from 'lucide-react';

interface GitDriveExperienceProps {
  project: Project;
  onBack: () => void;
}

type PipelineStageId = 'files' | 'repository' | 'branch' | 'commit' | 'push' | 'pr' | 'merge';

export const GitDriveExperience: React.FC<GitDriveExperienceProps> = ({ project, onBack }) => {
  const { isDesigner } = usePerspective();
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [caseStudyPerspective, setCaseStudyPerspective] = useState<'designer' | 'engineer'>('engineer');

  interface PipelineStage {
    id: PipelineStageId;
    title: string;
    icon: any;
    cliCommand: string;
    description: string;
    visualPreview: React.ReactNode;
  }

  const pipelineStages: PipelineStage[] = [
    {
      id: 'files',
      title: '1. FILES',
      icon: FileCode,
      cliCommand: 'git status -s',
      description: 'Local workspace file modifications tracked in real-time across text and binary assets.',
      visualPreview: (
        <div className="space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-white/10">
            <span>WORKING DIRECTORY CHANGES (3 FILES)</span>
            <span className="text-amber-400">UNSTAGED</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between p-2 rounded bg-space-900 border border-white/5">
              <span className="text-emerald-400">M src/components/Header.tsx (+24, -4)</span>
              <span className="text-slate-500">Modified</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-space-900 border border-white/5">
              <span className="text-emerald-400">A assets/brand-vector.svg (New Binary)</span>
              <span className="text-slate-500">Added</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-space-900 border border-white/5">
              <span className="text-rose-400">D legacy/old-utils.ts (-140)</span>
              <span className="text-slate-500">Deleted</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'repository',
      title: '2. REPOSITORY',
      icon: FolderGit2,
      cliCommand: 'git remote -v',
      description: 'Cloud-synchronized content-addressable repository connecting local storage to remote object store.',
      visualPreview: (
        <div className="space-y-3 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-space-900 border border-white/10 space-y-2">
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-400">ORIGIN:</span>
              <span className="text-cyan-300">https://gitdrive.cloud/org/neerav-core.git</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-400">STORAGE BACKEND:</span>
              <span className="text-white">Cloudflare R2 + Content Hash Deduplication</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-400">REPO HEALTH:</span>
              <span className="text-emerald-400">Clean • 0 dangling loose objects</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'branch',
      title: '3. BRANCH',
      icon: GitBranch,
      cliCommand: 'git checkout -b feat/spatial-nav',
      description: 'Creating an isolated branch track to experiment without impacting main production branches.',
      visualPreview: (
        <div className="space-y-3 font-mono text-xs">
          <div className="p-4 rounded-xl bg-space-900 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-slate-300">main (production)</span>
            </div>
            <div className="ml-1.5 my-2 border-l-2 border-dashed border-cyan-400 h-6 pl-4 flex items-center">
              <span className="text-[11px] text-cyan-400 font-bold">Branch point created at commit 8f9a2e</span>
            </div>
            <div className="flex items-center gap-3 pl-3">
              <div className="w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-cyan-400/20" />
              <span className="text-cyan-300 font-bold">feat/spatial-nav (CURRENT HEAD)</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'commit',
      title: '4. COMMIT',
      icon: GitCommit,
      cliCommand: 'git commit -m "feat(nav): add 2D spatial gesture matrix"',
      description: 'Generating an immutable snapshot hash bundling staged delta trees and metadata.',
      visualPreview: (
        <div className="space-y-3 font-mono text-xs">
          <div className="p-4 rounded-xl bg-space-900 border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between text-emerald-400 font-bold">
              <span>COMMIT CREATED: [feat/spatial-nav 8c4a10f]</span>
              <span>SHA-256</span>
            </div>
            <p className="text-white font-sans text-sm mt-1">
              "feat(nav): add 2D spatial gesture matrix and role switching telemetry"
            </p>
            <div className="text-[11px] text-slate-400 pt-2 border-t border-white/5 flex justify-between">
              <span>Author: Neerav &lt;neerav@portfolio.os&gt;</span>
              <span>Parent: 8f9a2e</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'push',
      title: '5. PUSH',
      icon: UploadCloud,
      cliCommand: 'git push origin feat/spatial-nav',
      description: 'Multiplexing chunked delta payloads to remote storage over high-speed HTTP/2 gRPC streams.',
      visualPreview: (
        <div className="space-y-3 font-mono text-xs">
          <div className="p-4 rounded-xl bg-space-900 border border-white/10 space-y-3">
            <div className="flex justify-between items-center text-slate-300">
              <span>UPLOADING CHUNKS (45 MB/s):</span>
              <span className="text-emerald-400 font-bold">100% COMPLETE</span>
            </div>
            <div className="w-full h-2 rounded-full bg-space-950 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-emerald-400" />
            </div>
            <div className="text-[11px] text-slate-400 flex justify-between">
              <span>Total: 8 objects, 1 delta compressed</span>
              <span>Latency: 48ms</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'pr',
      title: '6. PULL REQUEST',
      icon: GitPullRequest,
      cliCommand: 'gh pr create --base main --head feat/spatial-nav',
      description: 'Opening a peer review discussion with automated CI build passes, visual regression checks, and security scans.',
      visualPreview: (
        <div className="space-y-3 font-mono text-xs">
          <div className="p-4 rounded-xl bg-space-900 border border-violet-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-violet-400 font-bold">PR #104: feat/spatial-nav → main</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/20 text-[10px]">
                CI CHECKS: PASSED
              </span>
            </div>
            <p className="text-slate-300 font-sans text-xs">
              Reviewers approved (2/2): No conflicting changes detected. Build deployed to preview URL.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'merge',
      title: '7. MERGE',
      icon: GitMerge,
      cliCommand: 'git checkout main && git merge feat/spatial-nav --no-ff',
      description: 'Unifying divergence back into main branch with zero-conflict fast-forward or merge commit.',
      visualPreview: (
        <div className="space-y-3 font-mono text-xs">
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-2 text-center py-6">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="text-sm font-bold text-white mt-2">PULL REQUEST SUCCESSFULLY MERGED</h4>
            <p className="text-xs text-slate-300 font-sans">
              Branch <code className="text-cyan-300">feat/spatial-nav</code> merged into <code className="text-emerald-300">main</code>. Production release pipeline triggered.
            </p>
          </div>
        </div>
      ),
    },
  ];

  const currentStage = pipelineStages[currentStageIdx];

  const stagesList = [
    { title: 'FILES', icon: FileCode },
    { title: 'REPOSITORY', icon: FolderGit2 },
    { title: 'BRANCH', icon: GitBranch },
    { title: 'COMMIT', icon: GitCommit },
    { title: 'PUSH', icon: UploadCloud },
    { title: 'PULL REQUEST', icon: GitPullRequest },
    { title: 'MERGE', icon: GitMerge },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 animate-fadeIn">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO WORK UNIVERSE</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">
            GITDRIVE VISUAL PIPELINE SIMULATOR
          </span>
        </div>
      </div>

      {/* Hero Brief */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-mono text-blue-300">
          <GitBranch className="w-3.5 h-3.5" />
          <span>DEVELOPER WORKFLOW ENGINE</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          GitDrive: 7-Stage Visual Git Pipeline
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          {project.tagline} Step through the visual pipeline to see how GitDrive abstracts complex version control into intuitive spatial transitions.
        </p>
      </div>

      {/* PIPELINE NAVIGATION BAR */}
      <div className="p-4 rounded-2xl glass-panel border border-white/10 bg-space-950/80 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[720px] gap-2">
          {stagesList.map((st, idx) => {
            const Icon = st.icon;
            const isCurrent = idx === currentStageIdx;
            const isCompleted = idx < currentStageIdx;
            return (
              <React.Fragment key={st.title}>
                <button
                  onClick={() => setCurrentStageIdx(idx)}
                  className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-200 ${
                    isCurrent
                      ? 'bg-blue-600/30 border border-blue-400/60 text-white'
                      : isCompleted
                      ? 'text-emerald-400 hover:bg-white/5'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isCurrent
                        ? 'bg-blue-500 text-white'
                        : isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-white/5 text-slate-500'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-tight">{st.title}</span>
                </button>
                {idx < stagesList.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 transition-colors ${
                      idx < currentStageIdx ? 'bg-emerald-500' : 'bg-white/10'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ACTIVE STAGE SIMULATOR CARD */}
      <div className="rounded-3xl glass-panel border border-white/15 p-6 sm:p-8 bg-space-950/80 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">
              STAGE 0{currentStageIdx + 1} OF 07
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">{currentStage.title}</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStageIdx((p) => Math.max(0, p - 1))}
              disabled={currentStageIdx === 0}
              className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 disabled:opacity-30"
            >
              PREVIOUS
            </button>
            <button
              onClick={() => setCurrentStageIdx((p) => Math.min(stagesList.length - 1, p + 1))}
              disabled={currentStageIdx === stagesList.length - 1}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-500 text-white hover:bg-blue-400 text-xs font-mono font-bold disabled:opacity-30"
            >
              <span>NEXT STAGE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <p className="text-sm text-slate-300">{currentStage.description}</p>

        {/* CLI Terminal snippet */}
        <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 flex items-center gap-3 font-mono text-xs text-slate-300">
          <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-slate-500">$</span>
          <span className="text-emerald-300 font-semibold">{currentStage.cliCommand}</span>
        </div>

        {/* Live Visual Preview */}
        <div className="p-6 rounded-2xl bg-space-900/80 border border-white/10">
          {currentStage.visualPreview}
        </div>
      </div>

      {/* Case Study Section */}
      <div className="pt-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">GitDrive Deep-Dive Case Study</h2>
          <div className="flex items-center p-1 rounded-xl bg-space-900 border border-white/10">
            <button
              onClick={() => setCaseStudyPerspective('designer')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono ${
                caseStudyPerspective === 'designer' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'
              }`}
            >
              DESIGNER
            </button>
            <button
              onClick={() => setCaseStudyPerspective('engineer')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono ${
                caseStudyPerspective === 'engineer' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400'
              }`}
            >
              ENGINEER
            </button>
          </div>
        </div>

        {caseStudyPerspective === 'designer' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <span className="text-xs font-mono text-[#8052ff]">DEMOCRATIZING VERSION CONTROL</span>
              <p className="text-sm text-[#bdbdbd] font-extralight leading-relaxed">{project.designer?.problem}</p>
              <ul className="space-y-1.5 text-xs text-[#9a9a9a] font-extralight">
                {(project.designer?.researchInsights ?? []).map((r, i) => (
                  <li key={i}>• {r}</li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <span className="text-xs font-mono text-[#8052ff]">OUTCOMES & ACCESSIBILITY</span>
              <ul className="space-y-2 text-xs text-[#bdbdbd] font-extralight">
                {(project.designer?.designSystemHighlights ?? []).map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#8052ff]">✓</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <div className="p-3 rounded-xl bg-[#8052ff]/10 border border-[#8052ff]/20 text-xs font-mono text-[#8052ff]">
                {project.designer?.outcome}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-[#15846e]/30 space-y-3">
              <span className="text-xs font-mono text-[#15846e]">CHUNKED DEDUPLICATION ENGINE</span>
              <p className="text-sm text-[#bdbdbd] font-extralight leading-relaxed">{project.engineer?.architectureSummary}</p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {(project.engineer?.techStack ?? []).map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-full bg-[#15846e]/10 text-[#15846e] text-xs font-mono border border-[#15846e]/25">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-[#15846e]/30 space-y-3">
              <span className="text-xs font-mono text-[#15846e]">PERFORMANCE & STORAGE REDUCTION</span>
              <ul className="space-y-2 text-xs text-[#bdbdbd] font-extralight">
                {(project.engineer?.performanceGains ?? []).map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#15846e]">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
