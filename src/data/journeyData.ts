import { JourneyMilestone } from '../types';

export const journeyMilestones: JourneyMilestone[] = [
  {
    year: '2021',
    title: 'The Spark: Foundations & Code Craft',
    theme: 'Start',
    learned: [
      'HTML/CSS semantics, JavaScript ES6+ execution models, DOM manipulation',
      'Fundamental algorithms, computational thinking, and data structures',
      'The raw joy of creating something interactive out of blank text files'
    ],
    built: [
      'Interactive JavaScript browser games & physics simulations',
      'Early design portfolios with raw CSS animations and responsive layouts',
      'Algorithmic visualizers for sorting and graph traversals'
    ],
    changed: 'Realized that software is the most malleable creative medium on Earth.',
    keyArtifact: 'First interactive canvas physics engine',
    stats: '150+ Git commits • 12 mini-prototypes'
  },
  {
    year: '2022',
    title: 'Component Architectures & Modern Frontend',
    theme: 'Learn',
    learned: [
      'React component lifecycles, unidirectional data flow, custom hooks',
      'TypeScript type systems, generics, and strict type safety',
      'Modern CSS: Tailwind, CSS Modules, atomic design principles',
      'REST APIs, client-side caching, and async state management'
    ],
    built: [
      'Multi-page fullstack web applications with authentication',
      'Dynamic dashboard analytics with charting libraries and live filters',
      'Custom reusable UI component libraries with Figma-to-code parity'
    ],
    changed: 'Moved from writing isolated scripts to architecting scalable, maintainable component systems.',
    keyArtifact: 'Fullstack dashboard with real-time analytics',
    stats: '8 client projects • 50+ reusable components'
  },
  {
    year: '2023',
    title: 'Distributed Systems, Backend & Cloud Workflows',
    theme: 'Build',
    learned: [
      'Node.js & Go concurrency, Goroutines, channels, and microservice topologies',
      'Relational and NoSQL databases: PostgreSQL indexing, Redis caching, schema migrations',
      'Docker containerization, CI/CD GitHub Actions pipelines, Linux server administration',
      'Git internals: directed acyclic graphs, content-addressable storage, blob trees'
    ],
    built: [
      'GitDrive: visual version control and cloud-synced repository engine',
      'High-throughput WebSocket messaging clusters with sub-20ms roundtrips',
      'Distributed task queues with idempotency guarantees and dead-letter retry logic'
    ],
    changed: 'Understood that great user interfaces are only as reliable as the distributed systems beneath them.',
    keyArtifact: 'GitDrive custom Git plumbing & chunking engine',
    stats: '99.9% uptime architectures • 3 microservice clusters'
  },
  {
    year: '2024',
    title: 'AI Engineering, Autonomous Agents & Automation',
    theme: 'Explore',
    learned: [
      'Large Language Model prompting, structured JSON schema outputs, function calling',
      'Retrieval-Augmented Generation (RAG), vector embeddings, semantic search index tuning',
      'Enterprise workflow automation with n8n, Webhooks, OAuth integrations, and human-in-the-loop gates',
      'Multiplayer collaborative state sync: Yjs CRDTs and WebRTC data channels'
    ],
    built: [
      'Peer Club: synchronous multiplayer study and AI technical interview platform',
      'AI Email Agent: autonomous ingestion, intent classification, and calendar execution pipeline',
      'GoBuilder: natural language prompt-to-AST visual component generator'
    ],
    changed: 'Shifted from writing deterministic code to orchestrating intelligent agentic workflows.',
    keyArtifact: 'Self-orchestrating n8n AI email pipeline',
    stats: '50k+ automated executions • 3 AI applications shipped'
  },
  {
    year: '2025',
    title: 'Healthcare Systems & Deep Cognitive Product Design',
    theme: 'Scale',
    learned: [
      'Designing for degenerative cognitive impairment: zero-cognitive-overload UI heuristics',
      'HIPAA compliance, real-time edge telemetry, geofence anomaly detection with TensorFlow Lite',
      'Cross-stakeholder product architecture bridging doctors, stressed caregivers, and vulnerable patients',
      'Spatial UX, WebGL/Three.js depth rendering, and ambient computing interfaces'
    ],
    built: [
      'ALZO: Flagship Alzheimer’s Care Ecosystem (Clinical trial validated)',
      'InnerOS: Spatial ambient computing intent engine with local WebAssembly Whisper perception'
    ],
    changed: 'Realized true product excellence lives at the exact intersection of deep human empathy and rigorous technical engineering.',
    keyArtifact: 'ALZO 3-way multi-role clinical platform',
    stats: 'Clinical cohort validation • 42% anxiety reduction'
  },
  {
    year: '2026',
    title: 'Spatial Operating Environments & Beyond',
    theme: 'Design & Future',
    learned: [
      'Spatial computing paradigms, gesture ergonomics, ambient intelligence without screens',
      'Agent-to-agent negotiation protocols, local edge neural networks, self-healing software systems'
    ],
    built: [
      'NEERAV.OS: The unified spatial interactive portfolio operating system',
      'Next-generation ambient companion prototypes and autonomous tool-using agents'
    ],
    changed: 'Designing the future where technology fades into the background, leaving only human agency and creativity.',
    keyArtifact: 'NEERAV.OS Spatial System',
    stats: 'Next frontier'
  }
];
