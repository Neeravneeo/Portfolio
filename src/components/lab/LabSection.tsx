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
    let isVisible = !document.hidden;

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

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
      if (isVisible) {
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
          ctx.fillStyle = isDesigner ? '#8052ff' : '#15846e';
          ctx.fill();
        });
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      canvas.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animId);
    };
  }, [isDesigner]);

  const categories = ['All', 'AI', 'UX', '3D', 'Automation', 'Frontend', 'Research'];

  const filteredExperiments =
    selectedCategory === 'All'
      ? labExperiments
      : labExperiments.filter((exp) => exp.category === selectedCategory);

  return (
    <section id="lab" className="relative py-28 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#9a9a9a]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ffb829] shadow-[0_0_6px_#ffb829] animate-pulse" />
          <span>04. EXPERIMENTAL PLAYGROUND</span>
          <span>•</span>
          <span className="text-[#bdbdbd]">INTERACTIVE WIDGETS</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal text-white tracking-[-0.035em] leading-[1.08]">
          The Lab
        </h2>

        <div className="font-mono text-xs sm:text-sm tracking-widest text-[#9a9a9a] uppercase">
          Build • Test • Break • Learn • Repeat
        </div>

        <p className="text-[#bdbdbd] font-extralight text-lg sm:text-xl leading-[1.65] max-w-2xl">
          Kinetic physics widgets, ML classifiers, telemetry dispatchers, and micro-interactions.
          Nothing is hidden; every experiment is live, inspectable, and tactile.
        </p>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all border ${
                selectedCategory === cat
                  ? isDesigner
                    ? 'bg-[#8052ff] text-white border-[#8052ff] shadow-lg shadow-[#8052ff]/25'
                    : 'bg-[#15846e] text-white border-[#15846e] shadow-lg shadow-[#15846e]/25'
                  : 'bg-white/[0.03] text-[#9a9a9a] border-white/10 hover:text-white hover:border-white/20'
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
        <div className="rounded-3xl border border-white/10 p-6 sm:p-7 bg-white/[0.02] backdrop-blur-xl shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-[10px] font-mono text-[#8052ff] uppercase font-bold tracking-wider">UX RESEARCH • LIVE HEURISTIC SCANNER</span>
              <h3 className="text-lg font-normal text-white">Cognitive Load & Fitts' Law Calculator</h3>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#8052ff]/15 text-[#8052ff] border border-[#8052ff]/30 text-xs font-mono">
              INTERACTIVE
            </span>
          </div>

          <p className="text-xs text-[#bdbdbd] font-extralight">
            Adjust target size and contrast ratio to calculate accessibility ergonomics in real time.
          </p>

          <div className="space-y-4 text-xs font-mono">
            <div>
              <div className="flex justify-between text-[#bdbdbd] mb-1">
                <span>Tap Target Size: {targetSize}px</span>
                <span className={targetSize >= 48 ? 'text-[#15846e]' : 'text-[#ffb829]'}>
                  {targetSize >= 48 ? 'Complies with AAA' : 'Below 48px standard'}
                </span>
              </div>
              <input
                type="range"
                min="24"
                max="72"
                value={targetSize}
                onChange={(e) => setTargetSize(Number(e.target.value))}
                className="w-full accent-[#8052ff]"
              />
            </div>

            <div>
              <div className="flex justify-between text-[#bdbdbd] mb-1">
                <span>Contrast Ratio: {contrastRatio}:1</span>
                <span className={contrastRatio >= 7.0 ? 'text-[#15846e]' : 'text-[#ffb829]'}>
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
                className="w-full accent-[#8052ff]"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between font-mono text-xs">
            <div>
              <span className="text-[#9a9a9a] text-[10px] uppercase tracking-wider">ESTIMATED COGNITIVE FRICTION:</span>
              <div className="text-base font-normal text-[#15846e]">
                {targetSize >= 48 && contrastRatio >= 7 ? '0.12 (Ultra Low Friction)' : '0.48 (Elevated Burden)'}
              </div>
            </div>
            <div
              style={{ width: `${targetSize}px`, height: `${targetSize}px` }}
              className="rounded-xl bg-[#8052ff]/20 border border-[#8052ff]/50 flex items-center justify-center text-[10px] text-white shrink-0 font-mono"
            >
              Target
            </div>
          </div>
        </div>

        {/* EXP 2: Kinetic 2D Particle Attractor */}
        <div className="rounded-3xl border border-white/10 p-6 sm:p-7 bg-white/[0.02] backdrop-blur-xl shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-[10px] font-mono text-[#8052ff] uppercase font-bold tracking-wider">3D / GRAPHICS • CANVAS 2D PHYSICS</span>
              <h3 className="text-lg font-normal text-white">Kinetic Gravity Particle Attractor</h3>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#8052ff]/15 text-[#8052ff] border border-[#8052ff]/30 text-xs font-mono">
              60 FPS CANVAS
            </span>
          </div>

          <p className="text-xs text-[#bdbdbd] font-extralight">
            Hover your pointer across the viewport below. 45 gravitational particles calculate Newtonian vector attraction.
          </p>

          <div className="rounded-2xl bg-black border border-white/10 overflow-hidden flex items-center justify-center relative cursor-crosshair">
            <canvas ref={canvasRef} className="w-full h-[180px]" />
            <span className="absolute bottom-2 right-2 text-[10px] font-mono text-[#9a9a9a] bg-black/80 border border-white/10 px-2 py-0.5 rounded-full">
              HOVER TO ATTRACT
            </span>
          </div>
        </div>

        {/* EXP 3: Micro-Automation Webhook Dispatcher */}
        <div className="rounded-3xl border border-white/10 p-6 sm:p-7 bg-white/[0.02] backdrop-blur-xl shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-[10px] font-mono text-[#15846e] uppercase font-bold tracking-wider">AUTOMATION • N8N ENGINE RUNNER</span>
              <h3 className="text-lg font-normal text-white">Idempotent Webhook Dispatcher</h3>
            </div>
            <button
              onClick={handleEmitWebhook}
              disabled={isEmitting}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#15846e] text-white font-mono font-medium text-xs hover:bg-[#116e5c] disabled:opacity-50 transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isEmitting ? 'DISPATCHING...' : 'EMIT EVENT'}</span>
            </button>
          </div>

          <p className="text-xs text-[#bdbdbd] font-extralight">
            Click "Emit Event" to trigger a mock micro-agent execution chain with payload hashing and receipt verification.
          </p>

          <div className="p-4 rounded-2xl bg-black border border-white/10 min-h-[140px] font-mono text-xs text-[#bdbdbd] space-y-1.5 overflow-x-auto">
            {webhookLog.length === 0 ? (
              <span className="text-[#9a9a9a]">Ready for dispatch. Click 'EMIT EVENT' to start...</span>
            ) : (
              webhookLog.map((line, idx) => (
                <div key={idx} className="text-[#15846e] leading-relaxed">
                  {line}
                </div>
              ))
            )}
          </div>
        </div>

        {/* EXP 4: Zero-Shot Multi-Intent Classifier */}
        <div className="rounded-3xl border border-white/10 p-6 sm:p-7 bg-white/[0.02] backdrop-blur-xl shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-[10px] font-mono text-[#ffb829] uppercase font-bold tracking-wider">AI SYSTEMS • INTENT ROUTER</span>
              <h3 className="text-lg font-normal text-white">Zero-Shot Intent Classifier</h3>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#ffb829]/15 text-[#ffb829] border border-[#ffb829]/30 text-xs font-mono">
              LATENCY &lt; 35MS
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleClassify(p)}
                className={`px-3 py-1 rounded-full text-[11px] font-mono border transition-all ${
                  classifierQuery === p
                    ? 'bg-[#ffb829]/20 text-[#ffb829] border-[#ffb829]/40'
                    : 'bg-white/[0.02] text-[#9a9a9a] border-white/10 hover:text-white'
                }`}
              >
                Sample #{idx + 1}
              </button>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 text-xs font-mono">
            <div className="flex justify-between text-[#9a9a9a]">
              <span>ROUTED AGENT:</span>
              <span className="text-[#ffb829] font-medium">{classificationResult.agent}</span>
            </div>
            <div className="flex justify-between text-[#9a9a9a]">
              <span>CONFIDENCE SCORE:</span>
              <span className="text-[#15846e] font-medium">{classificationResult.confidence}</span>
            </div>
            <div className="flex justify-between text-[#9a9a9a]">
              <span>SUB-INTENT:</span>
              <span className="text-white font-extralight">{classificationResult.subIntent}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
