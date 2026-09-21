import React, { useState, useRef, useEffect } from 'react';
import { labExperiments } from '../../data/labData';
import { usePerspective } from '../../context/PerspectiveContext';
import { FlaskConical, Play, Sparkles, Sliders, CheckCircle2, RotateCcw } from 'lucide-react';

export const LabSection: React.FC = () => {
  const { isDesigner } = usePerspective();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Widget 1: UX Analyzer State
  const [targetSize, setTargetSize] = useState(48); // px
  const [contrastRatio, setContrastRatio] = useState(7.5); // :1

  // Widget 2: Webhook Dispatcher State
  const [webhookLog, setWebhookLog] = useState<string[]>([]);
  const [isEmitting, setIsEmitting] = useState(false);

  const handleEmitWebhook = () => {
    setIsEmitting(true);
    setWebhookLog(['[0ms] INGEST: POST /v1/webhook/event { event: "user.intent" }']);
    setTimeout(() => {
      setWebhookLog((p) => [...p, '[42ms] VALIDATE: Schema sha256_hmac verified']);
    }, 150);
    setTimeout(() => {
      setWebhookLog((p) => [...p, '[88ms] ROUTE: Dispatched to worker node eu-central-1']);
    }, 300);
    setTimeout(() => {
      setWebhookLog((p) => [...p, '[120ms] SUCCESS: HTTP 200 OK (Idempotent key stored)']);
      setIsEmitting(false);
    }, 450);
  };

  // Widget 3: AI Prompt Classifier State
  const [classifierQuery, setClassifierQuery] = useState('Cancel my subscription and export data');
  const [classificationResult, setClassificationResult] = useState<any>({
    agent: 'Billing & Retention Agent',
    confidence: '98.4%',
    subIntent: 'Account Offboarding + Data Archive',
  });

  const samplePrompts = [
    'Cancel my subscription and export data',
    'Why is the edge socket failing on iOS 18?',
    'Book a table for 4 near Central Park tomorrow 8pm',
  ];

  const handleClassify = (prompt: string) => {
    setClassifierQuery(prompt);
    if (prompt.includes('socket') || prompt.includes('iOS')) {
      setClassificationResult({
        agent: 'Systems Telemetry & Debug Agent',
        confidence: '99.1%',
        subIntent: 'WebSocket Connection Fallback',
      });
    } else if (prompt.includes('Book') || prompt.includes('table')) {
      setClassificationResult({
        agent: 'Personal Concierge & Calendar Agent',
        confidence: '97.8%',
        subIntent: 'Reservation Booking API',
      });
    } else {
      setClassificationResult({
        agent: 'Billing & Retention Agent',
        confidence: '98.4%',
        subIntent: 'Account Offboarding + Data Archive',
      });
    }
  };

  // Widget 4: Canvas Particle Attractor
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = 320);
    const height = (canvas.height = 180);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      size: Math.random() * 2 + 1,
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', onMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Attract softly to mouse
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 5 && dist < 120) {
          p.vx += (dx / dist) * 0.08;
          p.vy += (dy / dist) * 0.08;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = isDesigner ? '#c084fc' : '#34d399';
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      canvas.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [isDesigner]);

  const categories = ['All', 'AI', 'UX', '3D', 'Automation', 'Frontend', 'Research'];

  const filteredExperiments =
    selectedCategory === 'All'
      ? labExperiments
      : labExperiments.filter((exp) => exp.category === selectedCategory);

  return (
    <section id="lab" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-white/10 text-xs font-mono">
          <FlaskConical className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-400">04. EXPERIMENTAL PLAYGROUND</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          The Lab
        </h2>

        <div className="font-mono text-xs sm:text-sm tracking-widest text-slate-400 uppercase">
          Build • Test • Break • Learn • Repeat
        </div>

        <p className="text-slate-400 max-w-2xl text-base sm:text-lg leading-relaxed">
          Unfinished ideas, kinetic physics widgets, ML classifiers, and micro-interactions.
          Nothing is hidden; every experiment is live and tactile.
        </p>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all border ${
                selectedCategory === cat
                  ? isDesigner
                    ? 'bg-violet-600 text-white border-violet-400'
                    : 'bg-emerald-600 text-white border-emerald-400'
                  : 'bg-space-900/60 text-slate-400 border-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* EXPERIMENTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* EXP 1: UX Cognitive Load Scanner */}
        <div className="rounded-3xl glass-panel border border-white/15 p-6 sm:p-7 bg-space-950/80 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-[10px] font-mono text-violet-400 uppercase font-bold">UX RESEARCH • LIVE HEURISTIC SCANNER</span>
              <h3 className="text-lg font-bold text-white">Cognitive Load & Fitts' Law Calculator</h3>
            </div>
            <span className="px-2.5 py-1 rounded bg-violet-500/20 text-violet-300 text-xs font-mono">
              INTERACTIVE
            </span>
          </div>

          <p className="text-xs text-slate-300">
            Adjust target size and contrast ratio to calculate accessibility ergonomics in real time.
          </p>

          <div className="space-y-4 text-xs font-mono">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Tap Target Size: {targetSize}px</span>
                <span className={targetSize >= 48 ? 'text-emerald-400' : 'text-amber-400'}>
                  {targetSize >= 48 ? 'Complies with AAA' : 'Below 48px standard'}
                </span>
              </div>
              <input
                type="range"
                min="24"
                max="72"
                value={targetSize}
                onChange={(e) => setTargetSize(Number(e.target.value))}
                className="w-full accent-violet-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Contrast Ratio: {contrastRatio}:1</span>
                <span className={contrastRatio >= 7.0 ? 'text-emerald-400' : 'text-amber-400'}>
                  {contrastRatio >= 7.0 ? 'WCAG AAA Enhanced' : 'WCAG AA Standard'}
                </span>
              </div>
              <input
                type="range"
                min="3.0"
                max="12.0"
                step="0.5"
                value={contrastRatio}
                onChange={(e) => setContrastRatio(Number(e.target.value))}
                className="w-full accent-violet-500"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-space-900 border border-white/10 flex items-center justify-between font-mono text-xs">
            <div>
              <span className="text-slate-400 text-[10px] uppercase">ESTIMATED COGNITIVE FRICTION:</span>
              <div className="text-base font-bold text-emerald-400">
                {targetSize >= 48 && contrastRatio >= 7 ? '0.12 (Ultra Low Friction)' : '0.48 (Elevated Burden)'}
              </div>
            </div>
            <div
              style={{ width: `${targetSize}px`, height: `${targetSize}px` }}
              className="rounded-xl bg-violet-600/30 border border-violet-400 flex items-center justify-center text-[10px] text-white shrink-0"
            >
              Target
            </div>
          </div>
        </div>

        {/* EXP 2: Kinetic 2D Particle Attractor */}
        <div className="rounded-3xl glass-panel border border-white/15 p-6 sm:p-7 bg-space-950/80 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">3D / GRAPHICS • CANVAS 2D PHYSICS</span>
              <h3 className="text-lg font-bold text-white">Kinetic Gravity Particle Attractor</h3>
            </div>
            <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 text-xs font-mono">
              60 FPS CANVAS
            </span>
          </div>

          <p className="text-xs text-slate-300">
            Hover your pointer across the viewport below. 45 gravitational particles calculate Newtonian vector attraction.
          </p>

          <div className="rounded-xl bg-black border border-white/10 overflow-hidden flex items-center justify-center relative cursor-crosshair">
            <canvas ref={canvasRef} className="w-full h-[180px]" />
            <span className="absolute bottom-2 right-2 text-[10px] font-mono text-slate-500 bg-black/60 px-2 py-0.5 rounded">
              HOVER TO ATTRACT
            </span>
          </div>
        </div>

        {/* EXP 3: Micro-Automation Webhook Dispatcher */}
        <div className="rounded-3xl glass-panel border border-white/15 p-6 sm:p-7 bg-space-950/80 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">AUTOMATION • N8N ENGINE RUNNER</span>
              <h3 className="text-lg font-bold text-white">Idempotent Webhook Dispatcher</h3>
            </div>
            <button
              onClick={handleEmitWebhook}
              disabled={isEmitting}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-mono font-bold text-xs hover:bg-emerald-400 disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isEmitting ? 'DISPATCHING...' : 'EMIT EVENT'}</span>
            </button>
          </div>

          <p className="text-xs text-slate-300">
            Click "Emit Event" to trigger a mock micro-agent execution chain with payload hashing and receipt verification.
          </p>

          <div className="p-4 rounded-xl bg-black/70 border border-white/10 min-h-[140px] font-mono text-xs text-slate-300 space-y-1.5 overflow-x-auto">
            {webhookLog.length === 0 ? (
              <span className="text-slate-600">Ready for dispatch. Click 'EMIT EVENT' to start...</span>
            ) : (
              webhookLog.map((line, idx) => (
                <div key={idx} className="text-emerald-300 leading-relaxed">
                  {line}
                </div>
              ))
            )}
          </div>
        </div>

        {/* EXP 4: Zero-Shot Multi-Intent Classifier */}
        <div className="rounded-3xl glass-panel border border-white/15 p-6 sm:p-7 bg-space-950/80 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">AI SYSTEMS • INTENT ROUTER</span>
              <h3 className="text-lg font-bold text-white">Zero-Shot Intent Classifier</h3>
            </div>
            <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 text-xs font-mono">
              LATENCY &lt; 35MS
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleClassify(p)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border transition-all ${
                  classifierQuery === p
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400'
                    : 'bg-space-900 text-slate-400 border-white/10 hover:text-white'
                }`}
              >
                Sample #{idx + 1}
              </button>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-space-900 border border-white/10 space-y-2 text-xs font-mono">
            <div className="flex justify-between text-slate-400">
              <span>ROUTED AGENT:</span>
              <span className="text-amber-300 font-bold">{classificationResult.agent}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>CONFIDENCE SCORE:</span>
              <span className="text-emerald-400 font-bold">{classificationResult.confidence}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>SUB-INTENT:</span>
              <span className="text-white">{classificationResult.subIntent}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
