# NEERAV.OS Portfolio — Implementation Plan

Version: 1.1

---

## Build Rule

**Build phase by phase. Never ask the coding agent to generate the complete application in one prompt.**

---

## Phase Roadmap

### Phase 0 — Foundation
- Next.js + TypeScript (or React 19 + TypeScript + Vite).
- Git repository.
- Tailwind.
- ESLint/formatting.
- Environment variables.
- Folder structure.
- README containing the six product documents.

### Phase 1 — Design System
- Cosmic color tokens.
- Typography.
- Buttons.
- Cards.
- Toggle.
- Navigation.
- Chips.
- Modals.
- Motion primitives.
- Reduced-motion behavior.

### Phase 2 — Application Shell
- **Routes:** `/`, `/work`, `/journey`, `/lab`, `/about`, `/contact`, `/admin`
- Global navigation.
- Designer/Engineer state.
- Public page transitions.
- Mobile navigation.
- Admin route boundary.

### Phase 3 — Home
- Cosmic hero.
- One high-quality 3D scene.
- Featured project.
- Resume CTA.
- Work CTA.
- WebGL fallback.

### Phase 4 — Work
- Typed project schema.
- Filters.
- Project cards.
- Project preview.
- Lazy media loading.

### Phase 5 — ALZO
- Three-role orbital selector.
- Doctor/Caregiver/Patient switching.
- Vertical journeys.
- Role-specific screens.
- Progress indicators.
- Touch and keyboard controls.

### Phase 6 — ALZO Case Study
- Overview.
- Problem.
- Research.
- User flows.
- Wireframes.
- Design system.
- Designer view.
- Engineer view.
- Architecture.
- Links.

### Phase 7 — Other Projects
- Peer Club.
- GitDrive.
- AI Email Agent.
- InnerOS.
- GoBuilder.
- *Each gets an interaction model based on the product concept.*

### Phase 8 — Journey and Lab
- Orbital timeline.
- Milestone expansion.
- Lab filters.
- Experiment cards.

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
