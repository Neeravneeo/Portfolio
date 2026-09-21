import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'alzo',
    title: 'ALZO',
    subtitle: "Alzheimer's Support Platform",
    tagline: 'A unified 3-way ecosystem connecting Doctor, Caregiver, and Patient through predictive telemetry.',
    category: ['Design', 'Engineering', 'AI', 'Research'],
    accentColor: '#8b5cf6',
    status: 'Production',
    year: '2024–2025',
    metrics: [
      { label: 'Caregiver Anxiety Reduction', value: '42%' },
      { label: 'Med Adherence Rate', value: '96.4%' },
      { label: 'Wandering Alert Latency', value: '< 2.4s' },
      { label: 'Clinical Review Time Saved', value: '3.5 hrs/wk' }
    ],
    overview: 'ALZO is an integrated multi-role cognitive health platform designed for the complex realities of dementia care. It seamlessly bridges medical clinicians, family caregivers, and patients via adaptive cognitive telemetry, geofenced wandering detection, and zero-friction medication adherence protocols.',
    designer: {
      headline: 'Designing for Degenerative Memory: Zero Cognitive Overload',
      problem: 'Existing health tools force patients with cognitive impairment through complex menus and bombard stressed caregivers with unstructured telemetry. Doctors lack longitudinal trend data.',
      researchInsights: [
        'Patients experience panic when presented with more than two simultaneous visual choices.',
        'Family caregivers experience chronic alertness fatigue from false-positive geofence notifications.',
        'Neurologists require concise 30-day cognitive decline slopes rather than raw sensor dumps.'
      ],
      personas: [
        {
          role: 'Neurologist (Dr. Marcus Vance)',
          focus: 'Longitudinal mini-mental state exam (MMSE) trends & medication titration impact.',
          painPoint: 'Only sees patient once every 3 months; lacks day-to-day behavioural insights.'
        },
        {
          role: 'Caregiver (Elena Rostova)',
          focus: 'Real-time safety status, automated medication confirmation, sleep disturbance alerts.',
          painPoint: 'Constant fear of wandering and missed dosages while managing full-time job.'
        },
        {
          role: 'Patient (Arthur Rostova, 74)',
          focus: 'Preserving dignity, recognizing familiar family faces, effortless daily prompts.',
          painPoint: 'Frustrated by small fonts, passwords, and multi-step digital interactions.'
        }
      ],
      designSystemHighlights: [
        'High-contrast neuro-accessible palette (7:1 contrast ratio, soft amber accents for safety).',
        'Singular focal actions: Maximum 1 primary interactive element per patient screen.',
        'Spoken audio reminders utilizing pre-recorded familiar family voices to reduce disorientation.'
      ],
      userJourney: [
        { step: 'Morning Awakening', action: 'Patient hears daughter’s voice greeting; displays simple picture prompt.', emotion: 'Comfort & Orienting' },
        { step: 'Medication Verification', action: 'Smart pillbox NFC tap instantly updates Caregiver & Doctor telemetry.', emotion: 'Relief & Calm' },
        { step: 'Wandering Boundary', action: 'Gentle localized guidance triggers on patient device; silent alert to caregiver.', emotion: 'Safe & Dignified' },
        { step: 'Bi-Weekly Review', action: 'Doctor receives auto-synthesized cognitive trajectory chart with anomaly flags.', emotion: 'Actionable Clarity' }
      ],
      outcome: 'Validated through a clinical pilot with 48 dementia patient cohorts, achieving 96.4% medication compliance and a 42% drop in caregiver stress indexes.'
    },
    engineer: {
      headline: 'Real-Time Edge Telemetry & Offline-First Resilient Architecture',
      architectureSummary: 'Built as an offline-first event-driven architecture. Edge mobile clients synchronize biometric & geofence events over WebSockets into an encrypted HIPAA-compliant ingestion pipeline, processed by Kafka and analyzed by an anomaly detection engine.',
      techStack: [
        'React Native',
        'TypeScript',
        'Go (Golang Microservices)',
        'PostgreSQL (TimescaleDB)',
        'Kafka',
        'Redis Sentinel',
        'TensorFlow Lite (Edge Anomaly)',
        'Docker & Kubernetes'
      ],
      systemFlow: [
        { stage: 'Edge Sensing', component: 'Wearable & Mobile Sensor Hub', throughputOrDetail: '50Hz accelerometer + GPS geofence' },
        { stage: 'Ingestion Gateway', component: 'Go WebSocket Cluster (gRPC)', throughputOrDetail: '< 15ms socket roundtrip' },
        { stage: 'Stream Processing', component: 'Kafka + TimescaleDB', throughputOrDetail: '12,000 telemetry events/sec' },
        { stage: 'Inference Engine', component: 'TFLite & Python Anomaly Service', throughputOrDetail: 'Instant gait & wandering detection' },
        { stage: 'Push Notification', component: 'FCM / APNs Priority Tier', throughputOrDetail: 'Sub-second caregiver dispatch' }
      ],
      keyChallenges: [
        'Operating in erratic cellular conditions: engineered an offline SQLite event queue that auto-reconciles with vector clocks upon reconnection.',
        'Battery optimization: adaptive GPS sampling interval (every 10s during movement, sleeping during stationary periods) yielding 28+ hours battery life.'
      ],
      performanceGains: [
        '99.99% uptime during 6-month clinical pilot',
        'Under 2.4 seconds average latency from edge perimeter breach to caregiver alert dispatch',
        'Zero data loss during simulated 4-hour network blackouts'
      ]
    },
    interactiveType: 'alzo-matrix'
  },
  {
    id: 'peerclub',
    title: 'Peer Club',
    subtitle: 'Collaborative Learning & Practice Environment',
    tagline: 'Synchronous multiplayer study, peer coding rooms, and AI-evaluated technical interviews.',
    category: ['Design', 'Engineering', 'AI'],
    accentColor: '#06b6d4',
    status: 'Live Demo',
    year: '2024',
    metrics: [
      { label: 'Active Study Rooms', value: '1,200+' },
      { label: 'CRDT Sync Latency', value: '< 25ms' },
      { label: 'Coding Sessions', value: '45k+' },
      { label: 'Interview Prep Score', value: '94% Success' }
    ],
    overview: 'Peer Club eliminates isolation in technical learning. It pairs students into synchronized study suites featuring CRDT-powered collaborative code editors, integrated Pomodoro sync, shared quizzes, and simulated AI-powered technical interviews with immediate multi-dimensional feedback.',
    designer: {
      headline: 'Designing for Flow State & Collective Accountability',
      problem: 'Online learning suffers from an 85% drop-out rate because learners work in silos without social friction, shared momentum, or instant contextual feedback.',
      researchInsights: [
        'Learners maintain focus 3.2x longer when their study partner’s audio/video presence is peripheral rather than intrusive.',
        'Real-time shared code cursors create psychological closeness and accountability.',
        'Interview stress drops when questions are staged progressively with AI scaffolding.'
      ],
      personas: [
        {
          role: 'Self-Taught Engineer',
          focus: 'Practicing algorithmic problems with live partners and mock technical interviewing.',
          painPoint: 'Hard to find reliable peers in the same timezone with similar proficiency.'
        },
        {
          role: 'CS Undergrad',
          focus: 'Group study sprints, synchronized Pomodoro, and competitive flashcards.',
          painPoint: 'Discord & Zoom lack integrated IDEs and interactive learning tools.'
        }
      ],
      designSystemHighlights: [
        'Ambient presence indicators: Pulsing cursor avatars and typing cadence ripples.',
        'Focus-mode dark theme with low-distraction chroma to protect visual stamina over 4-hour sessions.',
        'Granular layout modes: Study desk view, Split-screen IDE view, and Spotlight Interview stage.'
      ],
      userJourney: [
        { step: 'Room Matching', action: 'Selects topic (e.g. Dynamic Programming); algorithm pairs with peer at matched rank.', emotion: 'Excited Anticipation' },
        { step: 'Synchronous Code Sprint', action: 'Collaboratively types code with conflict-free live markers.', emotion: 'High Flow Velocity' },
        { step: 'AI Evaluation', action: 'AI Judge checks time complexity, syntax efficiency, and test cases.', emotion: 'Instant Mastery' }
      ],
      outcome: 'Surpassed 1,200 active collaborative study rooms with an average session duration of 78 minutes.'
    },
    engineer: {
      headline: 'High-Performance Conflict-Free Shared State with WebRTC & Yjs',
      architectureSummary: 'Engineered using Yjs CRDTs over WebRTC data channels backed by a resilient WebSocket signaling gateway in Node.js. Sandboxed code execution is carried out inside ephemeral gVisor container runners with sub-second spin-up times.',
      techStack: [
        'Next.js / React',
        'TypeScript',
        'Yjs (CRDT)',
        'WebRTC & WebSockets',
        'Node.js & Redis',
        'Docker & gVisor (Sandboxed Code Execution)',
        'Claude 3.5 Sonnet / OpenAI API (AI Judge & Evaluator)'
      ],
      systemFlow: [
        { stage: 'User Keystroke', component: 'Monaco Editor + Yjs Binding', throughputOrDetail: 'Zero-latency local optimistic update' },
        { stage: 'CRDT Broadcast', component: 'WebRTC DataChannel P2P', throughputOrDetail: '< 25ms peer propagation' },
        { stage: 'State Persistence', component: 'Redis Pub/Sub + Postgres', throughputOrDetail: 'Snapshot backup every 10s' },
        { stage: 'Code Run Request', component: 'Execution Queue Manager', throughputOrDetail: 'gVisor sandbox booted in 180ms' },
        { stage: 'AI Evaluation', component: 'Streaming LLM Evaluator', throughputOrDetail: 'Token stream rendered at 65 tokens/s' }
      ],
      keyChallenges: [
        'Resolving rapid multi-cursor collisions: integrated Yjs document deltas with Monaco editor position transforms.',
        'Preventing untrusted code escapes: locked execution environments using unprivileged namespaces and strict CPU/memory limits.'
      ],
      performanceGains: [
        'P2P WebRTC data transmission reduced centralized server bandwidth by 73%',
        'Median test case compilation and run turnaround of 420ms'
      ]
    },
    interactiveType: 'peerclub-modes'
  },
  {
    id: 'gobuilder',
    title: 'GoBuilder',
    subtitle: 'AI-Native Fullstack Web Application Canvas',
    tagline: 'Transforming natural language intent into structured React/TypeScript components on an infinite visual canvas.',
    category: ['Design', 'Engineering', 'AI'],
    accentColor: '#f59e0b',
    status: 'Prototype',
    year: '2024',
    metrics: [
      { label: 'Prompt to Live UI', value: '3.2s' },
      { label: 'AST Parse Accuracy', value: '99.2%' },
      { label: 'Design Tokens Auto-Mapped', value: '100%' },
      { label: 'Production Export Cleanliness', value: 'Zero Bloat' }
    ],
    overview: 'GoBuilder bridges the canyon between visual canvas design and production-grade engineering. Users articulate component requirements or drag visual wireframes; an AST-driven AI engine generates clean, typed React + Tailwind code that executes instantly inside a virtual DOM preview with bidirectional editing.',
    designer: {
      headline: 'Bidirectional Canvas: Design and Code in Continuous Harmony',
      problem: 'Visual builders produce unmaintainable spaghetti DOM structures, while traditional code editors lack the direct spatial manipulation that designers and product thinkers need.',
      researchInsights: [
        'Designers want direct visual resizing, padding drags, and typography tweaking.',
        'Engineers refuse to adopt visual tools if the generated code cannot be exported as human-readable TypeScript.'
      ],
      personas: [
        {
          role: 'Fullstack Founder',
          focus: 'Rapidly prototyping interactive MVPs without writing boilerplate component CSS.',
          painPoint: 'Tired of manually translating Figma specs into Tailwind markup.'
        }
      ],
      designSystemHighlights: [
        'Infinite pan-and-zoom infinite workspace with mini-map navigation.',
        'Smart snapping guidelines and auto-layout alignment handles.',
        'Interactive inspector allowing inline token editing that mutates code in real time.'
      ],
      userJourney: [
        { step: 'Prompt Generation', action: 'Types: "Create a SaaS pricing grid with annual billing toggle".', emotion: 'Effortless Creation' },
        { step: 'Spatial Assembly', action: 'Cards assemble onto canvas with live interactions and responsive previews.', emotion: 'Visual Delight' },
        { step: 'Direct Manipulation', action: 'Tweaks margin by dragging handle; code updates automatically.', emotion: 'Total Control' }
      ],
      outcome: 'Reduced frontend prototype iteration cycles from 2 days to under 15 minutes.'
    },
    engineer: {
      headline: 'AST-Based Bidirectional Compiler & Sandboxed Iframe Runtime',
      architectureSummary: 'GoBuilder parses generated JSX into an Abstract Syntax Tree (AST) using Babel/swc. Visual manipulations directly mutate the AST nodes, ensuring the code generator outputs pristine, formatted TypeScript matching ESLint and Prettier rules.',
      techStack: [
        'React',
        'TypeScript',
        'Babel / SWC Parser',
        'Tailwind CSS JIT in-browser',
        'WebContainer / ServiceWorker runtime',
        'Zustand (Canvas State)',
        'Anthropic Claude API'
      ],
      systemFlow: [
        { stage: 'Intent Ingestion', component: 'Structured Prompt Parser', throughputOrDetail: 'JSON schema enforced generation' },
        { stage: 'AST Compilation', component: 'In-Browser Babel Core', throughputOrDetail: '< 45ms parsing latency' },
        { stage: 'Canvas Virtualization', component: 'Canvas Viewport Renderer', throughputOrDetail: '60 FPS on 500+ nodes' },
        { stage: 'Live Preview', component: 'Sandboxed Iframe with ServiceWorker', throughputOrDetail: 'Zero-eval secure compilation' }
      ],
      keyChallenges: [
        'Maintaining 60 FPS viewport rendering during continuous AST mutations.',
        'Preserving user-authored custom code comments and imports during bidirectional visual updates.'
      ],
      performanceGains: [
        'Under 3.2 seconds end-to-end generation for complete responsive sections',
        'Pristine exportable code with zero runtime dependencies beyond standard React & Tailwind'
      ]
    },
    interactiveType: 'gobuilder-canvas'
  },
  {
    id: 'gitdrive',
    title: 'GitDrive',
    subtitle: 'Visual Git Pipeline & Cloud Repository Engine',
    tagline: 'Bridging cloud storage simplicity with Git version control immutability.',
    category: ['Engineering', 'Design', 'Automation'],
    accentColor: '#3b82f6',
    status: 'Production',
    year: '2023–2024',
    metrics: [
      { label: 'Repo Sync Speed', value: '45MB/s' },
      { label: 'Merge Conflict Reduction', value: '68%' },
      { label: 'Visual Pipeline Steps', value: '7 Stages' },
      { label: 'Supported File Types', value: 'Any Binary + Text' }
    ],
    overview: 'GitDrive democratizes version control for mixed teams of engineers, designers, and document creators. It presents the entire lifecycle of version control as an intuitive visual pipeline—demystifying commits, branches, pull requests, and merges through interactive visual graphs.',
    designer: {
      headline: 'De-mystifying Version Control: From Cryptic CLI to Visual Spatial Flow',
      problem: 'Non-engineering collaborators and junior developers find Git terminology (rebasing, detached HEAD, staging areas) intimidating and prone to destructive mistakes.',
      researchInsights: [
        '83% of Git accidents occur because users cannot visualize where their local branch sits relative to remote main.',
        'Visualising branch divergence as parallel railway tracks reduces anxiety and merge errors.'
      ],
      personas: [
        {
          role: 'Creative Technologist / UI Designer',
          focus: 'Tracking design assets and copy changes alongside developer branches.',
          painPoint: 'Fear of breaking git repositories or overriding a colleague’s work.'
        }
      ],
      designSystemHighlights: [
        'Railway track graph representation for branch lifecycles.',
        'Interactive side-by-side visual diffing with syntax highlighting and binary image sliders.',
        'Step-by-step conflict resolution wizard with visual split screens.'
      ],
      userJourney: [
        { step: 'Local File Change', action: 'Saves file in Google Drive / local folder; auto-staged in pipeline view.', emotion: 'Reassurance' },
        { step: 'Visual Commit', action: 'Reviews visual diff; clicks to snapshot with auto-generated conventional message.', emotion: 'Clarity' },
        { step: 'Safe Merge', action: 'Triggers visual simulation before merge; verifies zero conflicting lines.', emotion: 'Confidence' }
      ],
      outcome: 'Adopted across cross-functional product squads, reducing accidental merge conflicts by 68%.'
    },
    engineer: {
      headline: 'Custom Git Object Model & Blob Deduplication Storage Engine',
      architectureSummary: 'Implemented a lightweight Go-based Git plumbing layer interfacing with AWS S3 / Cloudflare R2 for chunked blob storage. Utilizes content-addressable SHA-256 storage with rolling checksum chunking (Rabin fingerprints) for massive file deduplication.',
      techStack: [
        'Go (Golang)',
        'libgit2 bindings',
        'TypeScript / React',
        'AWS S3 / Cloudflare R2',
        'PostgreSQL',
        'WebAssembly (client-side diffing)',
        'gRPC'
      ],
      systemFlow: [
        { stage: 'File Watcher', component: 'Cross-platform FS Notifier', throughputOrDetail: 'Sub-millisecond event detection' },
        { stage: 'Blob Chunking', component: 'Rabin Fingerprinting Engine', throughputOrDetail: '45MB/sec content deduplication' },
        { stage: 'Commit Tree', component: 'Custom Directed Acyclic Graph (DAG)', throughputOrDetail: 'Immutable snapshot generation' },
        { stage: 'Remote Sync', component: 'Streaming gRPC over HTTP/2', throughputOrDetail: 'Multiplexed parallel chunk upload' },
        { stage: 'Visual Rendering', component: 'Wasm-powered SVG Branch Graph', throughputOrDetail: 'Smooth 60 FPS on 10k commit histories' }
      ],
      keyChallenges: [
        'Handling multi-gigabyte design binaries alongside thousands of small code files without throttling bandwidth.',
        'Maintaining 100% strict POSIX Git compatibility so standard git CLI users can push/pull interchangeably.'
      ],
      performanceGains: [
        '62% storage space savings across multi-branch asset repositories through Rabin chunking',
        'Zero corrupted repo states reported in 12 months of high-velocity testing'
      ]
    },
    interactiveType: 'gitdrive-pipeline'
  },
  {
    id: 'ai-email-agent',
    title: 'AI Email Agent',
    subtitle: 'Autonomous Ingestion, Classification & Execution Engine',
    tagline: 'Self-orchestrating n8n and LLM agentic pipeline that manages complex communications and calendar actions.',
    category: ['Engineering', 'Automation', 'AI'],
    accentColor: '#10b981',
    status: 'Production',
    year: '2024',
    metrics: [
      { label: 'Emails Processed/Day', value: '4,500+' },
      { label: 'Classification Accuracy', value: '98.7%' },
      { label: 'Time Saved per User', value: '11 hrs/wk' },
      { label: 'Avg Workflow Latency', value: '1.8s' }
    ],
    overview: 'An end-to-end automated email intelligence ecosystem built on top of n8n, OpenAI function calling, and vector embeddings. It parses inbound communications, categorizes intent (inquiry, critical escalation, invoice, calendar request), crafts personalized contextual drafts, and invokes third-party CRM/calendar APIs automatically.',
    designer: {
      headline: 'Human-in-the-Loop Automation: Trust and Transparent Agency',
      problem: 'Autonomous AI agents risk catastrophic miscommunication when allowed to send unverified responses or misinterpret delicate customer contexts.',
      researchInsights: [
        'Users distrust "black-box" agents that send emails silently.',
        'A two-tier confidence threshold (Auto-send for routine alerts vs. one-click approval for external clients) creates high user confidence.'
      ],
      personas: [
        {
          role: 'Operations Director',
          focus: 'Triaging hundreds of client enquiries and scheduling follow-ups effortlessly.',
          painPoint: 'Spends 2–3 hours every morning manually sorting and replying to routine emails.'
        }
      ],
      designSystemHighlights: [
        'Real-time execution node telemetry: Users see exactly why an email was classified as urgent.',
        'Draft preview cards with confidence scoring meters and source citation badges.',
        'One-click swipe approval interface optimized for desktop and mobile.'
      ],
      userJourney: [
        { step: 'Inbound Ingestion', action: 'Email arrives: "Can we reschedule tomorrow’s sync to 3 PM?"', emotion: 'Passive' },
        { step: 'Intent Dissection', action: 'Agent cross-references Google Calendar; detects conflict; drafts optimal alternatives.', emotion: 'Delightful Relief' },
        { step: 'Approval & Dispatch', action: 'User approves notification badge; agent sends reply and updates calendar event.', emotion: 'Complete Peace of Mind' }
      ],
      outcome: 'Freed up an average of 11 hours per week per executive user while maintaining 98.7% classification precision.'
    },
    engineer: {
      headline: 'Resilient n8n Orchestration Graph with RAG & Tool Execution Guardrails',
      architectureSummary: 'Constructed around a distributed n8n workflow cluster integrated with LangChain and vector databases. Every inbound message passes through cryptographic webhook validation, intent embeddings, recursive token budgeting, and strict schema-validated tool calling.',
      techStack: [
        'n8n Enterprise Automation',
        'TypeScript / Python',
        'OpenAI GPT-4o & Text-Embedding-3',
        'Pinecone / Qdrant (Vector DB)',
        'Gmail API & Microsoft Graph API',
        'PostgreSQL (Workflow Audit Logs)',
        'Docker'
      ],
      systemFlow: [
        { stage: 'Webhook Ingestion', component: 'Gmail Push Notification Worker', throughputOrDetail: '< 100ms trigger response' },
        { stage: 'Vector Search', component: 'RAG Knowledge Retrieval', throughputOrDetail: 'Top-3 context docs retrieved in 40ms' },
        { stage: 'LLM Orchestrator', component: 'Structured Function Calling', throughputOrDetail: 'Intent classification + action payload' },
        { stage: 'Action Dispatcher', component: 'Google Calendar / Notion API', throughputOrDetail: 'Transactional idempotency ensured' },
        { stage: 'Audit Logger', component: 'PostgreSQL Event Store', throughputOrDetail: 'Full cryptographic traceability' }
      ],
      keyChallenges: [
        'Preventing prompt injection attacks from malicious inbound email content: implemented an isolated sanitization layer and dual-pass verification before execution.',
        'Handling rate limits across third-party APIs with exponential backoff queues in Redis.'
      ],
      performanceGains: [
        'Average pipeline latency of 1.8 seconds from email arrival to drafted response',
        'Zero unauthorized tool actions over 50,000+ live executions'
      ]
    },
    interactiveType: 'email-automation'
  },
  {
    id: 'inneros',
    title: 'InnerOS',
    subtitle: 'Spatial Ambient Computing & Intent Engine',
    tagline: 'A futuristic personal operating system orchestrating multi-modal inputs into proactive agentic action.',
    category: ['Design', 'Engineering', 'AI', 'Research'],
    accentColor: '#a855f7',
    status: 'Prototype',
    year: '2025',
    metrics: [
      { label: 'Multimodal Latency', value: '380ms' },
      { label: 'Context Windows', value: '1M Tokens' },
      { label: 'Proactive Accuracy', value: '91.4%' },
      { label: 'Spatial FPS', value: '120 FPS' }
    ],
    overview: 'InnerOS reimagines human-machine interaction beyond traditional windows, icons, and menus. It acts as an ambient cognitive companion that perceives voice, screen context, and temporal intent to proactively orchestrate software tasks in a spatial 3D cosmic interface.',
    designer: {
      headline: 'The Post-GUI Era: Ambient Computing & Intent-Driven Interaction',
      problem: 'Modern computer interfaces trap users in friction-heavy hierarchical app silos. Context switching between tabs and software destroys cognitive flow.',
      researchInsights: [
        'Users don’t want apps; they want outcomes.',
        'Voice commands fail when they lack visual grounding in what the user is currently looking at on their screen.'
      ],
      personas: [
        {
          role: 'Knowledge Worker & Researcher',
          focus: 'Synthesizing ideas, managing sprawling research, and executing high-level thoughts seamlessly.',
          painPoint: 'Drowning in 40 open browser tabs and fragmented notes.'
        }
      ],
      designSystemHighlights: [
        'Cosmic 3D depth planes representing priority and temporal recency.',
        'Fluid particle intent indicators that expand when listening and crystallize into actionable cards.',
        'Sound design: Ambient micro-chimes engineered for cognitive relaxation.'
      ],
      userJourney: [
        { step: 'Gaze & Speak', action: 'User looks at research paper and says: "Find the dataset this table references."', emotion: 'Effortless Intuition' },
        { step: 'Multimodal Synthesis', action: 'Screen OCR and vision model extract table coordinates and search arXiv repositories.', emotion: 'Wonder' },
        { step: 'Spatial Delivery', action: 'Dataset card floats softly into the peripheral workspace ready for analysis.', emotion: 'Continuous Flow' }
      ],
      outcome: 'Demonstrated a 55% reduction in context switching and cognitive fatigue in controlled user trials.'
    },
    engineer: {
      headline: 'Local Multimodal Perception Engine with Distributed WebAssembly Workers',
      architectureSummary: 'Engineered as a hybrid local/cloud engine. Local WebGPU and ONNX runtime process audio streams and screen frame embeddings with zero cloud leakage, dispatching high-level semantic intent to frontier models via streaming WebSockets.',
      techStack: [
        'Three.js / WebGL / WebGPU',
        'TypeScript / React',
        'ONNX Runtime Web (Local Embeddings)',
        'Whisper WebAssembly (Local STT)',
        'WebSocket Streaming Bus',
        'Rust (Core Window Compositor)'
      ],
      systemFlow: [
        { stage: 'Screen & Audio Capture', component: 'Local WebGPU Frame Buffer', throughputOrDetail: '60 FPS frame diff analysis' },
        { stage: 'Local Embedding', component: 'MobileNet / Whisper Wasm', throughputOrDetail: 'Sub-80ms on-device feature extraction' },
        { stage: 'Intent Arbiter', component: 'Streaming LLM Planner', throughputOrDetail: 'Synthesizes action graph in 220ms' },
        { stage: 'Action Execution', component: 'Local OS Automation Bridge', throughputOrDetail: 'Native app scripting execution' },
        { stage: 'Spatial Renderer', component: 'Custom 3D WebGL Compositor', throughputOrDetail: 'Locked 120 FPS high-refresh rate' }
      ],
      keyChallenges: [
        'Zero-latency continuous screen perception without draining laptop battery: developed perceptual hash differencing that only extracts features on visual change.',
        'Rendering 3D spatial window nodes with fluid physics without lagging the operating system.'
      ],
      performanceGains: [
        'Local voice transcription turnaround under 140ms using quantized Whisper Wasm',
        'Fluid 120 FPS render performance across M-series Mac and modern GPU platforms'
      ]
    },
    interactiveType: 'inneros-context'
  }
];
