# NEERAV.OS Portfolio — Implementation Plan

Version: 1.1

---

## Build Rule

**Build phase by phase. Never ask the coding agent to generate the complete application in one prompt.**

---

## Phase Roadmap

### Phase 0 — Foundation ✅ (Completed)
- [x] React 19 + TypeScript + Vite v8.
- [x] Git repository with origin/main tracking.
- [x] Tailwind CSS v4 with DTCG token design system.
- [x] Environment variables (.env with Cloudflare verified token, .env.example).
- [x] Folder structure & Supabase schema (`supabase/schema.sql`).
- [x] README containing the six product documents & detailed `docs/`.

### Phase 1 — Design System ✅ (Completed)
- [x] Void black canvas (`#000000`) & Dala color tokens (`tokens.json`).
- [x] Monolithic weight 400 sculptural display typography & weight 200 body styling.
- [x] Electric Iris pill button (`variant="pill"`), Secondary, Ghost.
- [x] Dynamic 3D interactive tilt cards (`TiltCard.tsx`, `Card.tsx`).
- [x] PerspectiveToggle (`Designer ↔ Engineer`) with ARIA radiogroup.
- [x] Dala chromatic triangular particle constellation with tab pause.
- [x] Chips, Modals, Motion primitives with reduced-motion support.

### Phase 2 — Application Shell ✅ (Completed)
- [x] **Routes:** `/`, `/work`, `/journey`, `/lab`, `/about`, `/contact`, `/admin` (via `useRouter.ts`).
- [x] Global Error Boundary (Audit Resilience Fix 1).
- [x] Background tab performance guard (`document.hidden` pause in canvas).
- [x] Global navigation with active route sync & smooth spatial scrolling.
- [x] Designer/Engineer perspective toggle context.
- [x] Secret Owner access shortcut (`Ctrl+Shift+A`).
- [x] Code-split Admin route boundary with isolated dynamic bundle chunk.

### Phase 3 — Home ✅ (Completed)
- [x] Cosmic hero with Dala pure void background & monolithic weight 400 sculptural display typography.
- [x] High-quality interactive 3D chromatic triangular particle constellation (`CosmicObject.tsx`).
- [x] Featured project spotlight (ALZO 3-role ecosystem with direct interactive launch).
- [x] Electric Iris pill CTA button (`variant="pill"`) with ArrowRight micro-interaction.
- [x] Secondary glass Resume CTA button (`variant="secondary"`).
- [x] WebGL / 2D Canvas fallback with animated SVG constellation and neural nodes.

### Phase 4 — Work ✅ (Completed)
- [x] Strongly-typed project schema with dual-lens specification (`src/types/index.ts`).
- [x] Category filters (`All`, `Design`, `Engineering`, `AI`, `Automation`, `Research`) with Dala pill toggles.
- [x] Interactive 3D tilt cards with perspective auras (`ProjectCard.tsx` / `TiltCard.tsx`).
- [x] Resilience Audit Fix 4 applied: Defensive null checks on nested lens objects (`project.designer?.headline`, `project.engineer?.headline`, `project.engineer?.techStack ?? []`, `project.metrics ?? []`).
- [x] Direct interactive simulator launch integration.

### Phase 5 — ALZO Flagship Experience ✅ (Completed)
- [x] Three-stakeholder role orbital selector (`Doctor ↔ Caregiver ↔ Patient`).
- [x] Vertical capability operational stack (`Dashboard → Monitoring → Medication → Alerts → Reports → Communication`).
- [x] Role-specific live simulation viewports with simulated latency telemetry.
- [x] Touch and keyboard responsive controls.

### Phase 6 — ALZO Case Study ✅ (Completed)
- [x] Problem statement & clinical research insights.
- [x] Three-stakeholder persona matrix (`Doctor`, `Caregiver`, `Patient`).
- [x] Symbiotic user journeys with cognitive/emotional state mapping.
- [x] Neuro-accessible design system highlights.
- [x] Dual-lens toggle: Designer process view vs. Edge sensing architecture view.
- [x] System flow pipeline (Edge sensing → ML inference → Alert dispatch).
- [x] Critical engineering challenges & benchmark validations.
- [x] Resilience Audit Fix 4 applied across all lens fields.

### Phase 7 — Other Projects ✅ (Completed)
- [x] Peer Club: Real-time collaborative learning interactive simulator (`PeerClubExperience.tsx`) with CRDT state and WebRTC audio visualizer.
- [x] GitDrive: Chunked deduplication pipeline & visual commit DAG explorer (`GitDriveExperience.tsx`).
- [x] AI Email Agent: Autonomous triaging & human-in-the-loop multi-step approval workflow (`EmailAgentExperience.tsx`).
- [x] InnerOS: Spatial OS contextual workspace simulator with WebGPU agent node graph (`InnerOSExperience.tsx`).
- [x] GoBuilder: Real-time natural language to UI compiler with copyable Tailwind/React output (`GoBuilderExperience.tsx`).
- [x] Resilience Audit Fix 4 applied defensively across all experience lens mappings.

### Phase 8 — Journey and Lab ✅ (Completed)
- [x] Orbital timeline track with connecting beam and year node selectors (`2021` to `2026 NOW`).
- [x] Expanded year card: Chapter overview, key artifact badge, What I Learned, What I Built, and Mental Paradigm Shift.
- [x] Interactive Lab experiment sandbox with Dala pill category filters (`All`, `AI`, `UX`, `3D`, `Automation`, `Frontend`, `Research`).
- [x] 4 live interactive widgets: Fitts' law accessibility scanner, 60fps Newtonian particle attractor, idempotent webhook dispatcher, zero-shot intent classifier.
- [x] Resilience Audit Fix 3 applied: Particle canvas animation loop pauses on tab backgrounding via `visibilitychange`.

### Phase 9 — About and Contact ✅ (Completed)
- [x] About section: Philosophy, bio, 4 pillars (`Product Intuition`, `Systems Architecture`, `AI & Automation`, `Craft & Performance`), What I Care About, tech stack matrix, and experience/education timeline.
- [x] Resume modal integration with downloadable CV links.
- [x] Direct communication beacon: Glowing signal core and verified contact nodes (Email, LinkedIn, GitHub, Resume).
- [x] Message validation & input sanitization.
- [x] Resilience Audit Fix 2 applied: Real message persistence (`portfolio_messages_v1`) and offline queueing (`offline_contact_queue`) with reconnection sync.

### Phase 10 — Admin Authentication ✅ (Completed)
- [x] Configure Owner Auth service (`src/lib/auth.ts`) with Supabase Auth integration & secure local fallback.
- [x] Create owner profile & role validation.
- [x] Protect `/admin` route with `AdminRouteBoundary` code splitting.
- [x] Implement secure login gate (`AdminLogin.tsx`) with rate limiting and credential verification.
- [x] Add unauthorized/forbidden handling and interactive feedback.
- [x] Add session persistence and one-click owner logout.
- [x] Verify public users cannot access administrative data or actions without authentication.

### Phase 11 — Admin Dashboard ✅ (Completed)
- [x] Build `/admin` executive command center view (`AdminDashboard.tsx`).
- [x] Privacy-preserving client telemetry engine (`src/lib/telemetry.ts`) with session tracking and offline support.
- [x] Live dashboard telemetry widgets:
  - [x] Unique Visitors metric card with weekly growth rate.
  - [x] Portfolio Sessions counter with average dwell time and deep engagement rate.
  - [x] Project Views breakdown across all 6 flagship interactive experiences.
  - [x] Top Performing Project spotlight with direct simulator launcher.
  - [x] Published (6) vs Draft (2) projects distribution.
  - [x] Real-time visitor activity stream with relative timestamps and event categorization.
  - [x] Client device architecture breakdown (Desktop workstations, Mobile devices, Tablets).
  - [x] Infrastructure and resilience diagnostics (Cloudflare R2, DB storage bus, offline queue sync worker).
- [x] Hooked telemetry tracking into core user actions (`page_view`, `project_open`, `designer_engineer_switch`, `contact_submit`).

### Phase 12 — Project Management ✅ (Completed)
- [x] Build `/admin` project management studio (`AdminProjects.tsx`).
- [x] Full CRUD operations: Create, Read, Update, Delete, Duplicate, Publish, Unpublish, Reorder, and Preview.
- [x] Dual-lens project editor drawer (General, Designer Lens, Engineer Lens, Tech Stack, Metrics, Accent Color, Category Chips).
- [x] Local storage persistence buffer (`portfolio_projects_custom_v1`) falling back defensively to `projectsData.ts`.

### Phase 13 — Media Library ✅ (Completed)
- [x] Cloudflare R2 object storage integration studio (`AdminStorage.tsx`).
- [x] Bucket connection to `portfolio-assets` on account `a0b8c6edb1419ee0c4b9c21599c013d4`.
- [x] File upload, live image preview, alt text tagging, copy CDN URL, and asset deletion with audit tracking.

### Phase 14 — Timeline, Lab and Settings ✅ (Completed)
- [x] Global content manager (`AdminContentSettings.tsx`).
- [x] Journey timeline milestones editor (learned, built, paradigm shifts, key artifacts).
- [x] Lab experiments status and tags inspector.
- [x] Global system settings and beacon profile editor (social links, contact email, bio).
- [x] One-click full database export to portable JSON backup file.

### Phase 15 — Visitor Analytics ✅ (Completed)
- [x] Real-time privacy-preserving telemetry engine (`src/lib/telemetry.ts`).
- [x] Event tracking hooks: `page_view`, `project_open`, `designer_engineer_switch`, `contact_submit`.
- [x] Executive dashboard drill-down with session metrics, device breakdown, and conversion rates.

### Phase 16 — Messages ✅ (Completed)
- [x] Inbound communications vault (`AdminMessages.tsx`).
- [x] Read/unread toggles, search filter, message deletion.
- [x] Direct one-click email reply via `mailto:` protocol with pre-filled subject and recipient.
- [x] Resilient offline queue integration (Audit Fix 2).

### Phase 17 — Activity Log ✅ (Completed)
- [x] Administrative audit and security service (`src/lib/audit.ts`).
- [x] Dedicated audit log viewer (`AdminAuditLog.tsx`) tracking all actions (`project_created`, `project_published`, `media_uploaded`, `settings_updated`).
- [x] Action category filter and log purging capability.

### Phase 18 — Notion + n8n ✅ (Completed)
- [x] Autonomous workflow pipeline viewer (`AdminIntegrations.tsx`).
- [x] Flow diagram mapping: Notion Workspace → n8n Orchestrator → Schema Validator → Edge Deployment.
- [x] Interactive webhook dispatch runner with execution logs.

### Phase 19 — Quality ✅ (Completed)
- [x] TypeScript strict typecheck passed with 0 errors across all public and admin modules.
- [x] Global ErrorBoundary (Audit Resilience Fix 1) protecting client runtime.
- [x] WebGL canvas pause on background tab (Audit Resilience Fix 3) conserving battery and memory.
- [x] Defensive null checks on nested lens objects (Audit Resilience Fix 4) preventing runtime crashes.
- [x] Reduced-motion support and keyboard accessibility on interactive controls.
- [x] Search Engine Optimization: OpenGraph and Twitter Cards metadata in `index.html`.
- [x] Validated `robots.txt` disallowing `/admin` while permitting public routes.
- [x] XML Sitemap (`sitemap.xml`) generated for all public sections.

### Phase 20 — Deployment Readiness ✅ (Completed)
- [x] Production build bundle optimized with Vite v8 and code-split chunks (`AdminApp` isolated at 78 kB).
- [x] Cloudflare verified API token and verified R2 credentials configured in `.env`.
- [x] Zero-downtime deployment readiness for Cloudflare Pages / Vercel.

---

## Definition of Done

### Public:
- All pages work.
- Designer/Engineer works.
- ALZO works.
- Projects work.
- Mobile works.
- 3D has fallback.
- Contact works.

### Admin:
- Only owner can log in.
- CRUD works.
- Publish/archive works.
- Media works.
- Timeline/Lab/settings work.
- Analytics works.
- Messages work.
- Activity log works.
- RLS prevents unauthorized access.

---

## AI Coding Agent Rules

- Read all six documents before coding.
- Do not invent requirements already defined.
- Build only the current phase.
- State files/components to change before each phase.
- Do not add libraries without justification.
- Reuse typed components.
- Never sacrifice accessibility for visual effects.
- Never expose credentials.
- Never implement admin security as frontend-only hiding.
- Run checks after every phase.
