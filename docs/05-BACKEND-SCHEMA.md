# NEERAV.OS Portfolio — Backend Schema Document

Version: 1.1

---

## 1. Core Tables

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

## 2. profiles

| Column | Type | Rule |
|---|---|---|
| `id` | uuid | PK, references auth.users |
| `display_name` | text | required |
| `role` | text | owner/admin |
| `avatar_url` | text | nullable |
| `created_at` | timestamptz | default now() |

*Only the owner role can access Admin Studio.*

---

## 3. projects

| Column | Type |
|---|---|
| `id` | uuid PK |
| `slug` | text UNIQUE |
| `title` | text |
| `short_description` | text |
| `long_description` | text |
| `category` | text |
| `year` | integer |
| `status` | text |
| `featured` | boolean |
| `sort_order` | integer |
| `designer_enabled` | boolean |
| `engineer_enabled` | boolean |
| `seo_title` | text |
| `seo_description` | text |
| `created_at` | timestamptz |
| `updated_at` | timestamptz |

### Status:
- `draft`
- `published`
- `archived`

---

## 4. project_roles

- `id`
- `project_id` FK
- `slug`
- `name`
- `description`
- `accent`
- `sort_order`

---

## 5. role_screens

- `id`
- `role_id` FK
- `title`
- `slug`
- `description`
- `media_asset_id` FK
- `journey_index`
- `interaction_type`
- `metadata` jsonb

---

## 6. project_sections

- `id`
- `project_id` FK
- `perspective`
- `section_type`
- `title`
- `content` jsonb
- `sort_order`

### Perspective:
- `shared`
- `designer`
- `engineer`

---

## 7. media_assets

- `id`
- `project_id` FK nullable
- `type`
- `url`
- `storage_path`
- `alt_text`
- `width`
- `height`
- `poster_url`
- `metadata` jsonb
- `created_at`

---

## 8. project_links

- `id`
- `project_id` FK
- `type`
- `label`
- `url`
- `sort_order`

---

## 9. timeline_entries

- `id`
- `year_label`
- `title`
- `description`
- `project_id` FK nullable
- `sort_order`
- `featured`

---

## 10. lab_experiments

- `id`
- `slug` UNIQUE
- `title`
- `category`
- `status`
- `description`
- `content` jsonb
- `featured`
- `sort_order`

---

## 11. contact_messages

- `id`
- `name`
- `email`
- `message`
- `source`
- `status`
- `created_at`

*Do not expose contact message contents to analytics.*

---

## 12. analytics_events

- `id`
- `session_id`
- `event_name`
- `page_path`
- `project_id` FK nullable
- `metadata` jsonb
- `created_at`

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

*Avoid raw IP storage unless specifically required for security. Prefer aggregated or privacy-preserving visitor metrics.*

---

## 13. admin_activity

- `id`
- `admin_user_id` FK
- `action`
- `entity_type`
- `entity_id`
- `metadata` jsonb
- `created_at`

### Examples:
- `project_created`
- `project_updated`
- `project_deleted`
- `project_published`
- `project_archived`
- `media_uploaded`
- `site_setting_updated`

---

## 14. site_settings

- `id`
- `key` UNIQUE
- `value` jsonb
- `updated_at`
- `updated_by` FK

### Possible settings:
- Hero content
- Resume URL
- Social links
- Contact email
- Featured project IDs
- Theme configuration
- Analytics configuration

---

## 15. Relationships

```
profiles
   │
   └── admin_activity

projects
 ├── project_roles
 │    └── role_screens
 ├── project_sections
 ├── media_assets
 └── project_links

projects ── timeline_entries
projects ── analytics_events

lab_experiments ── media_assets

site_settings ── profiles
```

---

## 16. Row Level Security (RLS)

### Public:
- Read published projects.
- Read public timeline/lab/site content.
- Insert contact messages.
- Insert validated analytics events.

### Owner:
- Full CRUD on portfolio content.
- Read contact messages.
- Read analytics.
- Read/write site settings.
- Read activity logs.

*No anonymous user can access Admin Studio data.*

---

## 17. Indexes

- `projects.slug` UNIQUE
- `projects.status`
- `projects.featured`
- `projects.sort_order`
- `project_roles.project_id`
- `role_screens.role_id + journey_index`
- `project_sections.project_id + perspective + sort_order`
- `analytics_events.created_at`
- `analytics_events.project_id`
- `admin_activity.created_at`
