export type Perspective = 'designer' | 'engineer';

export type ProjectCategory = 'All' | 'Design' | 'Engineering' | 'AI' | 'Automation' | 'Research';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: ProjectCategory[];
  heroImage?: string;
  accentColor: string;
  status: 'Production' | 'Live Demo' | 'Prototype' | 'Case Study';
  year: string;
  metrics: { label: string; value: string }[];
  overview: string;
  
  // Lens-specific views
  designer: {
    headline: string;
    problem: string;
    researchInsights: string[];
    personas: { role: string; focus: string; painPoint: string }[];
    designSystemHighlights: string[];
    userJourney: { step: string; action: string; emotion: string }[];
    outcome: string;
  };
  
  engineer: {
    headline: string;
    architectureSummary: string;
    techStack: string[];
    systemFlow: { stage: string; component: string; throughputOrDetail: string }[];
    keyChallenges: string[];
    performanceGains: string[];
  };

  interactiveType: 'alzo-matrix' | 'peerclub-modes' | 'gitdrive-pipeline' | 'email-automation' | 'inneros-context' | 'gobuilder-canvas';
}

export interface JourneyMilestone {
  year: string;
  title: string;
  theme: string;
  learned: string[];
  built: string[];
  changed: string;
  keyArtifact: string;
  stats?: string;
}

export interface LabExperiment {
  id: string;
  title: string;
  category: 'AI' | 'UX' | '3D' | 'Automation' | 'Frontend' | 'Research';
  description: string;
  status: 'Experimental' | 'Functional' | 'Prototype';
  interactiveType: 'ux-analyzer' | 'particle-physics' | 'webhook-runner' | 'prompt-classifier' | 'haptic-toggle';
  tags: string[];
}
