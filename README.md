# NEERAV.OS — Dynamic Designer × Engineer Portfolio

> **Version:** 1.1  
> **Positioning:** Hybrid Designer × Engineer Interactive Product Experience  
> **Repository:** [https://github.com/Neeravneeo/Portfolio](https://github.com/Neeravneeo/Portfolio)

---

## 1. Product Requirements Document (PRD v1.1)

### Overview
NEERAV.OS is a dynamic personal portfolio presenting Neerav as a hybrid Designer × Engineer. It is designed as an interactive product experience rather than a conventional portfolio.

Visitors explore work through two perspectives:
- **Designer:** research, UX, flows, wireframes, design systems, prototypes, and visual design.
- **Engineer:** architecture, frontend, backend, AI, APIs, automation, deployment, and technical decisions.

The portfolio also contains a private **Admin Studio** accessible only to the portfolio owner. The Admin Studio allows the owner to manage projects, content, media, timeline entries, lab experiments, site settings, and visitor analytics.

### Information Architecture
- **Public:** Home, Work, Project Experience, Journey, Lab, About, Contact
- **Private (`/admin`):** Dashboard, Projects (Add/Edit/Preview/Reorder/Publish/Archive/Delete), Media Library, Timeline, Lab, Messages, Analytics, Settings, Activity Log, Security

---

## 2. Technical Requirements Document (TRD v1.1)

### Recommended Stack
- **Core:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS + Custom Design System
- **Animation & 3D:** Framer Motion + Canvas Particles / WebGL fallback
- **Backend & Auth:** Supabase (Auth, Postgres, Storage, RLS)
- **Deployment:** Vercel / GitHub

### Security
- Admin route protection with server/session verification (`profiles.role = 'owner'`).
- Row Level Security (RLS) on all Supabase tables.
- Zero service-role keys in browser client code.
- Audit logging for all destructive operations.

---

## 3. App Flow Document (AFD v1.1)

### Public Flow
`Home → Work → Project Experience → Case Study → Demo / GitHub / Figma`

### Designer / Engineer Flow
- **Designer:** Problem → Research → User Journey → Wireframes → Design System → Prototype → Final UI
- **Engineer:** Architecture → Frontend → Backend → Database → API → AI → Automation → Deployment

### ALZO Experience Flow
- **Horizontal:** Doctor ↔ Caregiver ↔ Patient
- **Vertical Journey:** Dashboard → Monitoring → Reminders → Medication → Alerts → Reports → Communication

### Admin Flow
`/admin → Authentication → Session Validation → Owner Role Check → Admin Dashboard`

---

## 4. UI/UX Design Brief (UIDB v1.1)

- **Public Site:** Cinematic, cosmic, minimal, futuristic, editorial, precise, premium. Electric violet primary, cyan/blue secondary, controlled teal/green accent on deep space dark background (`#05070d`).
- **Admin Studio:** Functional, dense, practical command interface. Data tables, multi-tab forms, status badges, filterable charts, and confirmation dialogs.

---

## 5. Backend Schema Document (BSD v1.1)

Implemented in `supabase/schema.sql`:
1. `profiles`
2. `projects`
3. `project_roles`
4. `role_screens`
5. `project_sections`
6. `media_assets`
7. `project_links`
8. `timeline_entries`
9. `lab_experiments`
10. `contact_messages`
11. `analytics_events`
12. `admin_activity`
13. `site_settings`

---

## 6. Implementation Plan (IP v1.1)

### Build Rule
Build phase by phase:
- **Phase 0 — Foundation** (Git init, env, structure, schema, README)
- **Phase 1 — Design System** (Tokens, typography, buttons, cards, toggle, motion)
- **Phase 2 — Application Shell** (Routes, navigation, perspective state, admin boundary)
- **Phase 3 — Home** (Cosmic hero, 3D/canvas, featured project, CTAs)
- **Phase 4 — Work** (Typed project schema, filters, project cards, preview)
- **Phase 5 — ALZO** (Three-role orbital selector, horizontal/vertical matrix)
- **Phase 6 — ALZO Case Study** (Dual-lens deep dive)
- **Phase 7 — Other Projects** (Peer Club, GitDrive, AI Email Agent, InnerOS, GoBuilder)
- **Phase 8 — Journey & Lab** (Orbital timeline, experiment cards)
- **Phase 9 — About & Contact** (Bio, resume modal, validated contact beacon)
- **Phase 10 — Admin Authentication** (Supabase Auth, owner role, session guard)
- **Phase 11 — Admin Dashboard** (KPIs, visitor chart, activity stream)
- **Phase 12 — Project Management** (10-section editor, CRUD, draft/publish/archive)
- **Phase 13 — Media Library** (Supabase Storage, alt text, project tags)
- **Phase 14 — Timeline, Lab & Settings** (Dynamic CMS for milestones & experiments)
- **Phase 15 — Visitor Analytics** (12 privacy-safe telemetry events & charts)
- **Phase 16 — Messages** (Inbox triage & mailto reply)
- **Phase 17 — Activity Log** (Audit trail)
- **Phase 18 — Notion + n8n** (Automated sync integration)
- **Phase 19 — Quality** (Typecheck, lint, test suite, accessibility)
- **Phase 20 — Deployment** (Production build, Vercel, Supabase, domain)

---

## Getting Started

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Run production build
npm run build
```
