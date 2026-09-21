import { LabExperiment } from '../types';

export const labExperiments: LabExperiment[] = [
  {
    id: 'exp-ux-analyzer',
    title: 'Cognitive Load & UX Heuristic Scanner',
    category: 'UX',
    description: 'An interactive heuristic diagnostic tool evaluating UI layouts for cognitive load, Fitts’ Law target sizing, and WCAG contrast compliance.',
    status: 'Functional',
    interactiveType: 'ux-analyzer',
    tags: ['Heuristics', 'WCAG AAA', 'Fitts Law', 'Neuro-UX']
  },
  {
    id: 'exp-particle-physics',
    title: 'Cosmic Kinetic Particle Attractor',
    category: '3D',
    description: 'Real-time Canvas 2D/WebGL gravity simulator where hundreds of luminous celestial particles orbit and react dynamically to cursor gestures.',
    status: 'Functional',
    interactiveType: 'particle-physics',
    tags: ['Canvas 2D', 'Vector Physics', 'Orbital Mechanics']
  },
  {
    id: 'exp-webhook-runner',
    title: 'Micro-Automation Webhook Dispatcher',
    category: 'Automation',
    description: 'Interactive execution sandbox demonstrating n8n-style asynchronous payload transformations, condition branching, and state receipt.',
    status: 'Functional',
    interactiveType: 'webhook-runner',
    tags: ['n8n', 'Event Bus', 'Idempotency', 'JSON Schema']
  },
  {
    id: 'exp-prompt-classifier',
    title: 'Zero-Shot Multi-Intent Classifier',
    category: 'AI',
    description: 'Simulated edge intent classification testing latency, confidence scoring thresholds, and semantic routing across micro-agents.',
    status: 'Functional',
    interactiveType: 'prompt-classifier',
    tags: ['Edge LLM', 'Semantic Routing', 'Intent Parsing']
  },
  {
    id: 'exp-haptic-toggle',
    title: 'Spatial Magnetic Spring Controller',
    category: 'Frontend',
    description: 'Spring-damped physics control exploring tactile resistance, magnetic snapping, and cursor velocity interpolation.',
    status: 'Functional',
    interactiveType: 'haptic-toggle',
    tags: ['Framer Motion', 'Spring Physics', 'Micro-interactions']
  }
];
