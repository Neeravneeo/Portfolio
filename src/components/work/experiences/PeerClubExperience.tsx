import React, { useState, useEffect } from 'react';
import { Project } from '../../../types';
import { usePerspective } from '../../../context/PerspectiveContext';
import {
  ArrowLeft,
  Users,
  Code2,
  BrainCircuit,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Terminal,
  Layers,
  Cpu,
  HelpCircle,
  BarChart3,
  Bot,
} from 'lucide-react';

interface PeerClubExperienceProps {
  project: Project;
  onBack: () => void;
}

type ModeType = 'study' | 'coding' | 'interview';

export const PeerClubExperience: React.FC<PeerClubExperienceProps> = ({ project, onBack }) => {
  const { isDesigner } = usePerspective();
  const [activeMode, setActiveMode] = useState<ModeType>('study');
  const [caseStudyPerspective, setCaseStudyPerspective] = useState<'designer' | 'engineer'>('designer');

  // Study Mode State (Pomodoro & Flashcard)
  const [pomodoroSeconds, setPomodoroSeconds] = useState(1500); // 25:00
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);
  const [quizAnswerSelected, setQuizAnswerSelected] = useState<number | null>(null);

  useEffect(() => {
    let interval: any = null;
    if (pomodoroActive && pomodoroSeconds > 0) {
      interval = setInterval(() => setPomodoroSeconds((s) => s - 1), 1000);
    } else if (pomodoroSeconds === 0) {
      setPomodoroActive(false);
    }
    return () => clearInterval(interval);
  }, [pomodoroActive, pomodoroSeconds]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Coding Mode State
  const [userCode, setUserCode] = useState(
    `function maxSubArray(nums: number[]): number {\n  let currentMax = nums[0];\n  let globalMax = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    currentMax = Math.max(nums[i], currentMax + nums[i]);\n    globalMax = Math.max(globalMax, currentMax);\n  }\n  return globalMax;\n}`
  );
  const [isEvaluatingCode, setIsEvaluatingCode] = useState(false);
  const [codeJudgementResult, setCodeJudgementResult] = useState<any | null>(null);

  const handleRunCode = () => {
    setIsEvaluatingCode(true);
    setCodeJudgementResult(null);
    setTimeout(() => {
      setIsEvaluatingCode(false);
      setCodeJudgementResult({
        status: 'Accepted',
        runtime: '58 ms (Beats 96.4%)',
        memory: '51.2 MB (Beats 88.1%)',
        timeComplexity: 'O(n) Linear Time - Kadane’s Algorithm',
        spaceComplexity: 'O(1) Constant Space',
        judgeFeedback: 'Optimal implementation. Clean variable naming and boundary condition handling.'
      });
    }, 900);
  };

  // Interview Mode State
  const [interviewQuestionIndex, setInterviewQuestionIndex] = useState(0);
  const [userInterviewAnswer, setUserInterviewAnswer] = useState('');
  const [isEvaluatingInterview, setIsEvaluatingInterview] = useState(false);
  const [interviewFeedback, setInterviewFeedback] = useState<any | null>(null);

  const interviewQuestions = [
    {
      q: 'How would you design a rate limiter for a distributed API handling 100,000 requests/sec?',
      focus: 'Distributed Systems & Redis Token Bucket',
    },
    {
      q: 'Explain the difference between Operational Transformation (OT) and CRDTs in real-time collaborative editing.',
      focus: 'Distributed State & Conflict Resolution',
    }
  ];

  const handleEvaluateInterview = () => {
    if (!userInterviewAnswer.trim()) return;
    setIsEvaluatingInterview(true);
    setInterviewFeedback(null);
    setTimeout(() => {
      setIsEvaluatingInterview(false);
      setInterviewFeedback({
        score: '92 / 100',
        strengths: ['Identified sliding window token bucket accurately', 'Addressed Redis cluster partitioning and race conditions'],
        growthAreas: ['Could elaborate on client-side retry headers (Retry-After, exponential jitter)'],
        aiSummary: 'Strong architectural depth. Demonstrates clear production-level familiarity with rate limiting.'
      });
    }, 1100);
  };

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
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">
            PEER CLUB INTERACTIVE SIMULATOR
          </span>
        </div>
      </div>

      {/* Header Info */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <Users className="w-3.5 h-3.5" />
          <span>COLLABORATIVE LEARNING ENVIRONMENT</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Peer Club: Three Interactive Modes
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          {project.tagline} Choose between synchronous <strong>Study</strong>, collaborative{' '}
          <strong>Coding</strong> with an AI judge, or real-time <strong>Interview</strong> prep.
        </p>
      </div>

      {/* Three Modes Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { id: 'study' as ModeType, title: 'MODE 1: STUDY', desc: 'Sync Rooms • Pomodoro • Quizzes • Flashcards', icon: Users },
          { id: 'coding' as ModeType, title: 'MODE 2: CODING', desc: 'Realtime Editor • Kadane Alg • AI Judge', icon: Code2 },
          { id: 'interview' as ModeType, title: 'MODE 3: INTERVIEW', desc: 'System Design • AI Evaluation & Scoring', icon: BrainCircuit },
        ].map((m) => {
          const Icon = m.icon;
          const isSelected = activeMode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setActiveMode(m.id)}
              className={`p-5 rounded-2xl text-left border transition-all duration-300 ${
                isSelected
                  ? 'bg-cyan-950/40 border-cyan-400 shadow-glow-engineer'
                  : 'bg-space-900/50 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-white/5 text-slate-400'
                  }`}
                >
                  <Icon className="w-4 h-4 font-bold" />
                </div>
                <span className="font-mono font-bold text-sm text-white">{m.title}</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">{m.desc}</p>
            </button>
          );
        })}
      </div>

      {/* INTERACTIVE MODE WORKSPACE */}
      <div className="rounded-3xl glass-panel border border-white/15 p-6 sm:p-8 bg-space-950/80 shadow-2xl">
        {/* MODE 1: STUDY WORKSPACE */}
        {activeMode === 'study' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono">
              <span className="text-cyan-300 font-semibold">STUDY ROOM #402 — ALGORITHMS & DISTRIBUTED SYSTEMS</span>
              <span className="text-emerald-400">4 PEERS SYNCHRONIZED</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Pomodoro Timer Widget */}
              <div className="lg:col-span-4 p-6 rounded-2xl bg-space-900/80 border border-white/10 flex flex-col items-center justify-center text-center space-y-4">
                <span className="text-xs font-mono text-slate-400">SHARED POMODORO SPRINT</span>
                <div className="text-5xl font-mono font-bold text-white tracking-wider">
                  {formatTime(pomodoroSeconds)}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPomodoroActive(!pomodoroActive)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-mono font-bold text-xs hover:bg-cyan-400 transition-colors"
                  >
                    {pomodoroActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{pomodoroActive ? 'PAUSE' : 'START SPRINT'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPomodoroActive(false);
                      setPomodoroSeconds(1500);
                    }}
                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-[11px] font-mono text-slate-500">
                  {pomodoroActive ? 'All 4 peers in flow state' : 'Click start to synchronize sprint'}
                </span>
              </div>

              {/* Flashcard & Quiz Widget */}
              <div className="lg:col-span-8 space-y-4">
                {/* Flashcard */}
                <div
                  onClick={() => setFlashcardFlipped(!flashcardFlipped)}
                  className="p-6 rounded-2xl bg-space-900/80 border border-white/10 cursor-pointer hover:border-cyan-500/40 transition-all min-h-[140px] flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>AI FLASHCARD (CLICK TO REVEAL ANSWER)</span>
                    <span className="text-cyan-400">{flashcardFlipped ? 'BACK' : 'FRONT'}</span>
                  </div>
                  <div className="py-2">
                    {!flashcardFlipped ? (
                      <p className="text-base font-semibold text-white">
                        What problem do conflict-free replicated data types (CRDTs) solve over traditional Operational Transformation (OT)?
                      </p>
                    ) : (
                      <p className="text-base font-semibold text-emerald-300">
                        CRDTs guarantee eventual consistency without requiring a central coordination server, enabling true P2P offline-tolerant collaboration.
                      </p>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">Tap to flip card</span>
                </div>

                {/* Peer Quiz Snippet */}
                <div className="p-5 rounded-2xl bg-space-900/60 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300">RAPID PEER QUIZ: Time complexity of lookup in a balanced BST?</span>
                    <span className="text-slate-500">Question 1/5</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'].map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => setQuizAnswerSelected(idx)}
                        className={`py-2 px-3 rounded-lg text-xs font-mono border transition-all ${
                          quizAnswerSelected === idx
                            ? idx === 1
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                              : 'bg-rose-500/20 text-rose-300 border-rose-400'
                            : 'bg-space-950/60 text-slate-300 border-white/5 hover:border-white/20'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: CODING WORKSPACE */}
        {activeMode === 'coding' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono">
              <span className="text-cyan-300 font-semibold">PAIR CODING ROOM #12 • MAXIMUM SUBARRAY PROBLEM</span>
              <span className="text-slate-400">Language: TypeScript • gVisor Sandbox</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Problem Brief */}
              <div className="lg:col-span-4 p-5 rounded-2xl bg-space-900/80 border border-white/10 space-y-3 text-xs">
                <span className="font-mono text-cyan-400 font-bold uppercase">Problem Statement</span>
                <p className="text-slate-300 leading-relaxed">
                  Given an integer array <code className="text-white font-mono">nums</code>, find the subarray with the largest sum, and return its sum.
                </p>
                <div className="p-3 rounded-lg bg-black/50 font-mono text-[11px] text-slate-300 space-y-1">
                  <div>Input: nums = [-2,1,-3,4,-1,2,1,-5,4]</div>
                  <div className="text-emerald-400">Output: 6</div>
                  <div className="text-slate-500">Explanation: [4,-1,2,1] has the largest sum = 6.</div>
                </div>
                <div className="pt-2 text-[11px] font-mono text-slate-400">
                  Collaborator: <span className="text-cyan-400">@alex_dev</span> is currently viewing Line 4
                </div>
              </div>

              {/* Code Editor & AI Judge */}
              <div className="lg:col-span-8 space-y-4">
                <div className="rounded-xl bg-space-950 border border-white/10 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 bg-space-900/80 border-b border-white/10 text-xs font-mono text-slate-400">
                    <span>solution.ts</span>
                    <button
                      type="button"
                      onClick={handleRunCode}
                      disabled={isEvaluatingCode}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 disabled:opacity-50"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{isEvaluatingCode ? 'RUNNING AI JUDGE...' : 'RUN WITH AI JUDGE'}</span>
                    </button>
                  </div>
                  <textarea
                    rows={8}
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    className="w-full bg-transparent p-4 font-mono text-xs text-slate-200 resize-none focus:outline-none focus:ring-0 leading-relaxed"
                  />
                </div>

                {/* AI Judge Feedback Output */}
                {codeJudgementResult && (
                  <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-2 text-xs font-mono animate-fadeIn">
                    <div className="flex items-center justify-between text-emerald-400 font-bold">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>STATUS: {codeJudgementResult.status}</span>
                      </span>
                      <span>{codeJudgementResult.runtime}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-slate-300">
                      <div>Time: {codeJudgementResult.timeComplexity}</div>
                      <div>Space: {codeJudgementResult.spaceComplexity}</div>
                    </div>
                    <p className="text-slate-400 pt-1 border-t border-emerald-500/20 font-sans italic">
                      "{codeJudgementResult.judgeFeedback}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* MODE 3: INTERVIEW WORKSPACE */}
        {activeMode === 'interview' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono">
              <span className="text-cyan-300 font-semibold">AI SYSTEM DESIGN MOCK INTERVIEW</span>
              <span className="text-slate-400">Scoring: Depth, Trade-offs & Communication</span>
            </div>

            <div className="p-5 rounded-2xl bg-space-900/80 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <Bot className="w-4 h-4" />
                <span>INTERVIEW PROMPT #{interviewQuestionIndex + 1}</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                {interviewQuestions[interviewQuestionIndex].q}
              </h3>
              <span className="text-xs font-mono text-slate-400">
                Evaluation target: {interviewQuestions[interviewQuestionIndex].focus}
              </span>
            </div>

            {/* Answer Input */}
            <div className="space-y-3">
              <textarea
                rows={4}
                value={userInterviewAnswer}
                onChange={(e) => setUserInterviewAnswer(e.target.value)}
                placeholder="Type your architectural response (e.g., Use Redis Token Bucket with Lua scripts for atomic increments, sliding window counter with millisecond precision, and fallback to local in-memory token buffers if Redis partitions)..."
                className="w-full bg-space-900/60 p-4 rounded-xl border border-white/10 font-mono text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleEvaluateInterview}
                  disabled={isEvaluatingInterview || !userInterviewAnswer.trim()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-mono font-bold text-xs hover:bg-cyan-400 disabled:opacity-40 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isEvaluatingInterview ? 'EVALUATING VIA CLAUDE...' : 'EVALUATE RESPONSE'}</span>
                </button>
              </div>
            </div>

            {/* Simulated Evaluation Card */}
            {interviewFeedback && (
              <div className="p-5 rounded-2xl bg-space-900/80 border border-cyan-500/30 space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-mono text-slate-300 font-bold">AI EVALUATION REPORT</span>
                  <span className="text-sm font-mono font-extrabold text-cyan-400">
                    OVERALL SCORE: {interviewFeedback.score}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-mono text-emerald-400 font-bold">KEY STRENGTHS:</span>
                    <ul className="mt-1 space-y-1 text-slate-300">
                      {interviewFeedback.strengths.map((s: string, idx: number) => (
                        <li key={idx}>✓ {s}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-mono text-amber-400 font-bold">GROWTH AREAS:</span>
                    <ul className="mt-1 space-y-1 text-slate-300">
                      {interviewFeedback.growthAreas.map((g: string, idx: number) => (
                        <li key={idx}>• {g}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-slate-300 font-mono pt-2 border-t border-white/5">
                  Summary: {interviewFeedback.aiSummary}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Case Study Section */}
      <div className="pt-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">Peer Club Deep-Dive Case Study</h2>
          <div className="flex items-center p-1 rounded-xl bg-space-900 border border-white/10">
            <button
              onClick={() => setCaseStudyPerspective('designer')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono ${
                caseStudyPerspective === 'designer' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400'
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
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-3">
              <span className="text-xs font-mono text-cyan-400">DESIGNING FOR SOCIAL FLOW</span>
              <p className="text-sm text-slate-300 leading-relaxed">{project.designer.problem}</p>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {project.designer.researchInsights.map((r, i) => (
                  <li key={i}>• {r}</li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-3">
              <span className="text-xs font-mono text-cyan-400">DESIGN SYSTEM HIGHLIGHTS</span>
              <ul className="space-y-2 text-xs text-slate-300">
                {project.designer.designSystemHighlights.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-cyan-400">✓</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-xs font-mono text-cyan-200">
                {project.designer.outcome}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl glass-panel border border-emerald-500/20 space-y-3">
              <span className="text-xs font-mono text-emerald-400">CRDT & WEBRTC PIPELINE</span>
              <p className="text-sm text-slate-300 leading-relaxed">{project.engineer.architectureSummary}</p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.engineer.techStack.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded bg-emerald-950/40 text-emerald-300 text-xs font-mono border border-emerald-500/20">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-2xl glass-panel border border-emerald-500/20 space-y-3">
              <span className="text-xs font-mono text-emerald-400">PERFORMANCE & RUNTIME</span>
              <ul className="space-y-2 text-xs text-slate-300">
                {project.engineer.performanceGains.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400">✓</span>
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
