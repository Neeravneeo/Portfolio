# NEERAV.OS Portfolio — Product Requirements Document

Version: 1.1  
Product: NEERAV.OS Dynamic Designer × Engineer Portfolio

---

## 1. Product Overview

NEERAV.OS is a dynamic personal portfolio presenting Neerav as a hybrid Designer × Engineer. It is designed as an interactive product experience rather than a conventional portfolio.

Visitors explore work through two perspectives:
- **Designer:** research, UX, flows, wireframes, design systems, prototypes and visual design.
- **Engineer:** architecture, frontend, backend, AI, APIs, automation, deployment and technical decisions.

The portfolio also contains a private Admin Studio accessible only to the portfolio owner. The Admin Studio allows the owner to manage projects, content, media, timeline entries, lab experiments, site settings and visitor analytics.

---

## 2. Product Goals

- Communicate Designer × Engineer positioning within 30 seconds.
- Demonstrate UI/UX, product thinking, frontend engineering, AI and automation.
- Turn project screenshots into interactive product stories.
- Make the portfolio itself evidence of interaction design and engineering skill.
- Allow the owner to manage portfolio content without editing source code.
- Provide useful visitor analytics while respecting privacy.
- Keep public pages fast even when the portfolio contains heavy visual assets.

---

## 3. Target Users

| User | Goal |
|---|---|
| **Recruiter** | Quickly understand role, projects, skills and credibility |
| **Founder / Product Manager** | Evaluate product thinking and execution |
| **Designer** | Evaluate UX, visual design and systems |
| **Engineer** | Evaluate architecture and implementation |
| **Portfolio Owner** | Privately manage content and analytics |

---

## 4. Public Information Architecture

- Home
- Work
- Project Experience
- Journey
- Lab
- About
- Contact

---

## 5. Private Information Architecture

`/admin`
- Dashboard
- Projects
  - Add Project
  - Edit Project
  - Project Preview
- Media Library
- Timeline
- Lab
- Messages
- Visitors / Analytics
- Site Settings
- Profile
- Activity Log
- Account / Security

---

## 6. Admin Studio

The Admin Studio is a first-class product feature, but it must never be visible as a public navigation item.

### Admin capabilities
- Create projects.
- Edit projects.
- Delete projects.
- Duplicate projects.
- Draft and publish projects.
- Archive projects.
- Reorder featured projects.
- Edit Designer content.
- Edit Engineer content.
- Add/remove project roles.
- Add role-specific screens.
- Upload and manage project images/videos/3D assets.
- Add GitHub, Figma, live demo and external links.
- Manage Journey timeline entries.
- Manage Lab experiments.
- Update About content.
- Update Contact/social links.
- View contact messages.
- View visitor analytics.
- Filter analytics by date, page and project.
- View project engagement.
- View recent admin activity.
- Preview unpublished changes before publishing.

### Security
- Only the owner account can access Admin Studio.
- Use Supabase Auth.
- Enable Row Level Security.
- Use an explicit admin/owner role.
- Do not rely on hiding the /admin URL.
- Never expose service-role keys in the browser.
- Protect destructive actions with confirmation.
- Record important admin actions in an activity log.
- Support secure logout and session expiration.

---

## 7. Project Ecosystem

| Project | Interaction Model |
|---|---|
| **ALZO** | Doctor ↔ Caregiver ↔ Patient horizontally, product journey vertically |
| **Peer Club** | Study ↔ Coding ↔ Interview |
| **GitDrive** | Files → Repository → Commit → Push → Pull Request |
| **AI Email Agent** | Inbox → AI → Classification → Action → Automation |
| **InnerOS** | Voice/Screen/Context → Intent → AI → Action |
| **GoBuilder** | Idea → Builder → Components → Preview → Publish |

---

## 8. ALZO Flagship Experience

The ALZO showcase begins with three user roles.
- **Horizontal axis:** Doctor ↔ Caregiver ↔ Patient
- **Vertical axis:** Dashboard → Monitoring → Reminders → Medication → Alerts → Reports → Communication

The visitor explores the product before entering the detailed case study.

---

## 9. User Stories

### Public
- As a recruiter, I can understand who Neerav is quickly.
- As a visitor, I can switch between Designer and Engineer perspectives.
- As a designer, I can inspect UX process and final UI.
- As an engineer, I can inspect architecture and implementation.
- As a visitor, I can explore ALZO by role and journey.

### Admin
- As the owner, I can add a project without changing code.
- As the owner, I can edit or delete any project.
- As the owner, I can publish or unpublish projects.
- As the owner, I can manage project images and links.
- As the owner, I can see visitor traffic and project engagement.
- As the owner, I can update site content from one private dashboard.

---

## 10. Success Metrics

- Project exploration rate.
- Case-study completion rate.
- Demo/GitHub/Figma click-through.
- Resume clicks.
- Contact submissions.
- Project-level engagement.
- Returning visitor rate.
- Admin content update frequency.
- Portfolio performance on mobile and desktop.

---

## 11. MVP

### Public
- Home
- Work
- ALZO experience
- ALZO case study
- Peer Club
- Journey
- Lab
- About
- Contact
- Responsive design
- Designer/Engineer switch

### Admin
- Owner authentication
- Admin dashboard
- CRUD for projects
- Draft/publish workflow
- Media management
- Timeline management
- Lab management
- Contact messages
- Basic visitor analytics
- Activity log

---

## 12. V1 Exclusions

- Visitor accounts
- Public CMS
- E-commerce
- Complex visitor personalization
- AI chatbot
- Excessive WebGL
- Selling portfolio assets

---

## 13. Product Principles

- Interaction must explain the work.
- 3D must have a purpose.
- Content beats visual spectacle.
- Admin management must not require coding.
- Public visitors must never access private management routes.
- Analytics should collect only what is useful.
