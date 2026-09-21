# NEERAV.OS Portfolio — Technical Requirements Document

Version: 1.1

---

## 1. Recommended Stack

- **Next.js + TypeScript** (or React 19 + TypeScript + Vite)
- **Tailwind CSS**
- **Framer Motion**
- **React Three Fiber + Three.js**
- **MDX / typed content**
- **Supabase**
  - Supabase Auth
  - Supabase Storage
- **Cloudflare** (DNS, Pages, R2 Storage)
- **n8n**
- **Vercel**

---

## 2. Architecture

```
Browser
  │
  ├── Public Portfolio
  │     ├── Home
  │     ├── Work
  │     ├── Projects
  │     ├── Journey
  │     ├── Lab
  │     ├── About
  │     └── Contact
  │
  └── Protected Admin
        ├── Dashboard
        ├── Projects CRUD
        ├── Media
        ├── Timeline
        ├── Lab
        ├── Messages
        ├── Analytics
        ├── Settings
        └── Activity Log
               │
               ▼
          Supabase Auth
               │
               ▼
        Supabase Database
               │
               ├── Storage
               └── Analytics

Optional:
Notion → n8n → Validation → Database
```

---

## 3. Frontend

Use server rendering/static generation for content-heavy public pages. Use client components only for interactions, 3D and stateful admin interfaces.

---

## 4. Admin Authentication

Use Supabase Auth.

### Requirements:
- Email/password or magic-link owner authentication.
- Optional MFA if supported.
- Admin route protection using middleware/server checks.
- Server-side role verification.
- Secure session cookies.
- Logout.
- Session expiry/revalidation.
- No client-only authorization.

### Recommended authorization model:
```
users
  ↓
profiles
  ↓
role = owner
  ↓
admin access
```

There should initially be exactly one owner account.

---

## 5. Admin Routes

- `/admin`
- `/admin/projects`
- `/admin/projects/new`
- `/admin/projects/[id]`
- `/admin/projects/[id]/preview`
- `/admin/media`
- `/admin/timeline`
- `/admin/lab`
- `/admin/messages`
- `/admin/analytics`
- `/admin/settings`
- `/admin/activity`

---

## 6. Admin Dashboard

### Dashboard cards:
- Total visitors
- Unique visitors
- Sessions
- Projects viewed
- Most viewed project
- Contact messages
- Recent activity
- Published projects
- Draft projects

### Charts:
- Visitors over time
- Page views
- Project views
- Device breakdown
- Referrer/source breakdown
- Country/region only if privacy-safe and genuinely needed

---

## 7. Project CRUD

### Admin can:
- CREATE
- READ
- UPDATE
- DELETE
- DUPLICATE
- PUBLISH
- UNPUBLISH
- ARCHIVE
- REORDER
- PREVIEW

### Project editor should support:
- Title
- Slug
- Short description
- Category
- Year
- Status
- Featured flag
- Hero media
- Designer content
- Engineer content
- Roles
- Role screens
- Case-study sections
- Tech stack
- Links
- Images
- Videos
- 3D assets
- SEO metadata

---

## 8. Media

Use Supabase Storage (and Cloudflare R2).

### Requirements:
- Upload image/video/model.
- Generate optimized image variants.
- Store metadata.
- Alt text required for meaningful images.
- Delete unused assets.
- Prevent unsafe file types.
- Use signed URLs where private assets are required.

---

## 9. Analytics

Track only useful portfolio events.

### Suggested events:
- `page_view`
- `project_open`
- `project_section_view`
- `project_role_switch`
- `designer_engineer_switch`
- `demo_click`
- `github_click`
- `figma_click`
- `resume_click`
- `contact_submit`
- `timeline_open`
- `lab_experiment_open`

Do not collect passwords, message contents as analytics metadata, or unnecessary personal data.

Visitor analytics should be privacy-conscious. Avoid storing raw IP addresses unless there is a clearly justified security requirement and an appropriate retention policy.

---

## 10. Performance

- Lazy-load 3D.
- Pause inactive scenes.
- Use WebGL fallback.
- Optimize media.
- Avoid loading all project assets on Work.
- Keep Admin Studio out of the public bundle where practical.
- Use pagination or aggregation for analytics.
- Cache public content.

---

## 11. Security

- RLS on all Supabase tables.
- Owner-only admin writes.
- Server-side validation.
- Rate-limit contact submissions.
- CSRF protections where applicable.
- Secure headers.
- Content sanitization.
- No service-role key in client code.
- Audit destructive operations.
- Confirmation for delete operations.

---

## 12. Deployment

- GitHub
- Vercel
- Neon / Supabase database
- Cloudflare DNS / R2
- n8n hosted separately
- Use separate development and production environments.

---

## 13. Technical Rule

**The admin system must be treated as an actual authenticated application, not as a hidden frontend page.**
