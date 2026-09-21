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

### Phase 9 — About and Contact (Next)

### Phase 9 — About and Contact
- About.
- Resume.
- Skills/focus.
- Contact.
- Message validation.
- Success/error states.

### Phase 10 — Admin Authentication
- *Implement before the admin CRUD.*
- Configure Supabase Auth.
- Create owner profile.
- Add owner role.
- Protect `/admin`.
- Add middleware/server-side session checks.
- Add unauthorized and forbidden screens.
- Add logout.
- Add secure session handling.
- Verify that public users cannot query private admin data.

### Phase 11 — Admin Dashboard
- Build: `/admin`
- **Dashboard widgets:**
  - Visitors.
  - Sessions.
  - Project views.
  - Top project.
  - Messages.
  - Published projects.
  - Draft projects.
  - Recent activity.
- *Keep this page functional, not 3D-heavy.*

### Phase 12 — Project Management
- Build: `/admin/projects`, `/admin/projects/new`, `/admin/projects/[id]`
- **CRUD:** Create, Read, Update, Delete, Duplicate, Publish, Unpublish, Archive, Reorder, Preview.
- **Project editor sections:** General, Hero, Designer, Engineer, Roles, Screens, Media, Links, SEO, Publish.

### Phase 13 — Media Library
- Build: Upload, Search, Filter, Preview, Replace, Delete unused asset, Alt text, Metadata, Storage integration.

### Phase 14 — Timeline, Lab and Settings
- Admin pages: `/admin/timeline`, `/admin/lab`, `/admin/settings`
- *Allow the owner to update these without source-code changes.*

### Phase 15 — Visitor Analytics
- **Event tracking:** `page_view`, `project_open`, `project_section_view`, `role_switch`, `designer_engineer_switch`, `demo_click`, `github_click`, `figma_click`, `resume_click`, `contact_submit`, `timeline_open`, `lab_open`.
- **Admin analytics:** Date range, Visitors, Sessions, Page views, Project views, Top projects, CTA clicks, Device breakdown, Referrer/source where privacy-safe.
- *Do not store unnecessary personal data.*

### Phase 16 — Messages
- Admin can: View messages, Mark read/unread, Archive, Filter, Search.
- *Never expose messages publicly.*

### Phase 17 — Activity Log
- Log: Project created, Project updated, Project deleted, Project published, Project archived, Media uploaded, Site setting changed.

### Phase 18 — Notion + n8n
- *Optional after the core admin system works.*
- `Notion → n8n → Validation → Portfolio database → Publish`
- *Do not make this the source of truth until the basic CMS is stable.*

### Phase 19 — Quality
- Typecheck.
- Lint.
- Unit tests for critical logic.
- Admin authorization tests.
- CRUD tests.
- RLS tests.
- Mobile testing.
- Keyboard testing.
- Reduced-motion testing.
- WebGL fallback testing.
- Performance testing.
- Broken-link testing.

### Phase 20 — Deployment
- Vercel.
- Supabase production.
- Environment variables.
- Domain.
- HTTPS.
- Metadata.
- Sitemap.
- Robots.
- OG images.
- Analytics verification.
- Production smoke test.

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
