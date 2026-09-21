# NEERAV.OS Portfolio — App Flow Document

Version: 1.1

---

## 1. Public Flow

```
Home
 ↓
Work
 ↓
Project Experience
 ↓
Case Study
 ↓
Demo / GitHub / Figma
```

### Alternative paths:
- `Home → Journey`
- `Home → Lab`
- `Home → About`
- `Home → Contact`

---

## 2. Designer / Engineer Flow

### Designer
```
Designer
  ↓
Problem
  ↓
Research
  ↓
User Journey
  ↓
Wireframes
  ↓
Design System
  ↓
Prototype
  ↓
Final UI
```

### Engineer
```
Engineer
  ↓
Architecture
  ↓
Frontend
  ↓
Backend
  ↓
Database
  ↓
API
  ↓
AI
  ↓
Automation
  ↓
Deployment
```

---

## 3. ALZO Flow

```
ALZO
 ↓
Role Selection
 ├── Doctor
 ├── Caregiver
 └── Patient
```

### Horizontal role switching:
`Doctor ←→ Caregiver ←→ Patient`

### Vertical journey:
```
Dashboard
 ↓
Monitoring
 ↓
Reminders
 ↓
Medication
 ↓
Alerts
 ↓
Reports
 ↓
Communication
```

---

## 4. Admin Login Flow

```
/admin
  ↓
Authentication
  ↓
Session Validation
  ↓
Owner Role Check
  ├── Valid → Admin Dashboard
  └── Invalid → Login / Access Denied
```

*Never expose admin functionality simply by hiding navigation.*

---

## 5. Admin Dashboard Flow

```
Admin Dashboard
 ├── Projects
 │    ├── All Projects
 │    ├── Add Project
 │    ├── Edit
 │    ├── Duplicate
 │    ├── Preview
 │    ├── Publish
 │    ├── Archive
 │    └── Delete
 │
 ├── Media
 ├── Timeline
 ├── Lab
 ├── Messages
 ├── Analytics
 ├── Settings
 └── Activity Log
```

---

## 6. Add Project Flow

```
Add Project
 ↓
Basic Information
 ↓
Designer Content
 ↓
Engineer Content
 ↓
Roles / Screens
 ↓
Media
 ↓
Links
 ↓
SEO
 ↓
Save Draft
 ↓
Preview
 ↓
Publish
```

---

## 7. Delete Project Flow

```
Delete
 ↓
Confirmation
 ↓
Show project title + warning
 ↓
Confirm
 ↓
Delete related content/assets safely
 ↓
Activity Log
 ↓
Success
```

*Recommended: use Archive instead of permanent delete for normal workflow.*

---

## 8. Analytics Flow

```
Visitor
 ↓
Page / Project Interaction
 ↓
Event
 ↓
Validation
 ↓
Analytics Store
 ↓
Admin Dashboard
```

### Admin filters:
- Date
- Page
- Project
- Device
- Referrer/source
- Event

---

## 9. Required States

1. `Loading`
2. `Empty`
3. `Error`
4. `Success`
5. `Unauthorized`
6. `Forbidden`
7. `Draft`
8. `Published`
9. `Archived`
10. `WebGL unavailable`
11. `Reduced motion`
