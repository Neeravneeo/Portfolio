-- ==============================================================================
-- NEERAV.OS Portfolio — Backend Database Schema & Security Definition
-- Version: 1.1
-- Stack: PostgreSQL + Supabase Auth + Supabase Storage + Row Level Security (RLS)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. CORE TABLES
-- ==============================================================================

-- 1.1 PROFILES (References auth.users, strictly separates owner role)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'visitor' CHECK (role IN ('owner', 'admin', 'visitor')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 1.2 PROJECTS
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    short_description TEXT NOT NULL,
    long_description TEXT NOT NULL,
    category TEXT NOT NULL,
    year INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    featured BOOLEAN NOT NULL DEFAULT false,
    sort_order INTEGER NOT NULL DEFAULT 0,
    designer_enabled BOOLEAN NOT NULL DEFAULT true,
    engineer_enabled BOOLEAN NOT NULL DEFAULT true,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 1.3 PROJECT ROLES (e.g. Doctor, Caregiver, Patient in ALZO)
CREATE TABLE IF NOT EXISTS public.project_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    slug TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    accent TEXT NOT NULL DEFAULT '#8b5cf6',
    sort_order INTEGER NOT NULL DEFAULT 0
);

-- 1.4 ROLE SCREENS (Screens/States across vertical product journeys)
CREATE TABLE IF NOT EXISTS public.role_screens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_id UUID NOT NULL REFERENCES public.project_roles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT NOT NULL,
    media_asset_id UUID,
    journey_index INTEGER NOT NULL DEFAULT 0,
    interaction_type TEXT NOT NULL DEFAULT 'screen-view',
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- 1.5 PROJECT SECTIONS (Shared, Designer, or Engineer lens case studies)
CREATE TABLE IF NOT EXISTS public.project_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    perspective TEXT NOT NULL CHECK (perspective IN ('shared', 'designer', 'engineer')),
    section_type TEXT NOT NULL,
    title TEXT NOT NULL,
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    sort_order INTEGER NOT NULL DEFAULT 0
);

-- 1.6 MEDIA ASSETS (Images, diagrams, videos, 3D assets)
CREATE TABLE IF NOT EXISTS public.media_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    type TEXT NOT NULL CHECK (type IN ('image', 'video', 'model3d', 'document')),
    url TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    alt_text TEXT NOT NULL,
    width INTEGER,
    height INTEGER,
    poster_url TEXT,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Add foreign key reference to role_screens after media_assets is created
ALTER TABLE public.role_screens
    ADD CONSTRAINT fk_role_screens_media
    FOREIGN KEY (media_asset_id)
    REFERENCES public.media_assets(id)
    ON DELETE SET NULL;

-- 1.7 PROJECT LINKS (GitHub, Figma, Demo, Live)
CREATE TABLE IF NOT EXISTS public.project_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('github', 'figma', 'demo', 'live', 'external')),
    label TEXT NOT NULL,
    url TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0
);

-- 1.8 TIMELINE ENTRIES (Journey milestones)
CREATE TABLE IF NOT EXISTS public.timeline_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    year_label TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    featured BOOLEAN NOT NULL DEFAULT false
);

-- 1.9 LAB EXPERIMENTS
CREATE TABLE IF NOT EXISTS public.lab_experiments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Experimental' CHECK (status IN ('Experimental', 'Functional', 'Prototype')),
    description TEXT NOT NULL,
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    featured BOOLEAN NOT NULL DEFAULT false,
    sort_order INTEGER NOT NULL DEFAULT 0
);

-- 1.10 CONTACT MESSAGES (Inbox for contact form transmissions)
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    source TEXT NOT NULL DEFAULT 'portfolio-beacon',
    status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 1.11 ANALYTICS EVENTS (Privacy-conscious telemetry, no raw IPs)
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id TEXT NOT NULL,
    event_name TEXT NOT NULL,
    page_path TEXT NOT NULL,
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 1.12 ADMIN ACTIVITY (Audit trail for administrative operations)
CREATE TABLE IF NOT EXISTS public.admin_activity (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 1.13 SITE SETTINGS (Key-value store for site configuration)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL
);

-- ==============================================================================
-- 2. INDEXES (Per Section 17 of Backend Schema Document)
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_sort_order ON public.projects(sort_order);
CREATE INDEX IF NOT EXISTS idx_project_roles_project ON public.project_roles(project_id);
CREATE INDEX IF NOT EXISTS idx_role_screens_journey ON public.role_screens(role_id, journey_index);
CREATE INDEX IF NOT EXISTS idx_project_sections_lookup ON public.project_sections(project_id, perspective, sort_order);
CREATE INDEX IF NOT EXISTS idx_analytics_created ON public.analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_project ON public.analytics_events(project_id);
CREATE INDEX IF NOT EXISTS idx_admin_activity_created ON public.admin_activity(created_at);

-- ==============================================================================
-- 3. STORAGE BUCKETS (Per Section 8 of Technical Requirements)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_screens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timeline_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lab_experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Helper Function: Check if the current authenticated user is an Owner
CREATE OR REPLACE FUNCTION public.is_owner()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'owner'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4.1 Public SELECT Policies (Published content only)
CREATE POLICY "Public can view published projects" ON public.projects
    FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view published project roles" ON public.project_roles
    FOR SELECT USING (
        project_id IN (SELECT id FROM public.projects WHERE status = 'published')
    );

CREATE POLICY "Public can view published role screens" ON public.role_screens
    FOR SELECT USING (
        role_id IN (
            SELECT pr.id FROM public.project_roles pr
            JOIN public.projects p ON p.id = pr.project_id
            WHERE p.status = 'published'
        )
    );

CREATE POLICY "Public can view published project sections" ON public.project_sections
    FOR SELECT USING (
        project_id IN (SELECT id FROM public.projects WHERE status = 'published')
    );

CREATE POLICY "Public can view media assets" ON public.media_assets
    FOR SELECT USING (true);

CREATE POLICY "Public can view published project links" ON public.project_links
    FOR SELECT USING (
        project_id IN (SELECT id FROM public.projects WHERE status = 'published')
    );

CREATE POLICY "Public can view timeline entries" ON public.timeline_entries
    FOR SELECT USING (true);

CREATE POLICY "Public can view lab experiments" ON public.lab_experiments
    FOR SELECT USING (true);

CREATE POLICY "Public can view site settings" ON public.site_settings
    FOR SELECT USING (true);

-- 4.2 Public INSERT Policies (Contact transmissions & Analytics telemetry)
CREATE POLICY "Public can send contact messages" ON public.contact_messages
    FOR INSERT WITH CHECK (
        length(email) > 3 AND length(message) > 5
    );

CREATE POLICY "Public can submit analytics events" ON public.analytics_events
    FOR INSERT WITH CHECK (
        session_id IS NOT NULL AND event_name IS NOT NULL
    );

-- 4.3 Owner Full CRUD Policies (Protected Admin Studio)
CREATE POLICY "Owner has full access to profiles" ON public.profiles
    FOR ALL USING (public.is_owner());

CREATE POLICY "Owner has full access to projects" ON public.projects
    FOR ALL USING (public.is_owner());

CREATE POLICY "Owner has full access to project_roles" ON public.project_roles
    FOR ALL USING (public.is_owner());

CREATE POLICY "Owner has full access to role_screens" ON public.role_screens
    FOR ALL USING (public.is_owner());

CREATE POLICY "Owner has full access to project_sections" ON public.project_sections
    FOR ALL USING (public.is_owner());

CREATE POLICY "Owner has full access to media_assets" ON public.media_assets
    FOR ALL USING (public.is_owner());

CREATE POLICY "Owner has full access to project_links" ON public.project_links
    FOR ALL USING (public.is_owner());

CREATE POLICY "Owner has full access to timeline_entries" ON public.timeline_entries
    FOR ALL USING (public.is_owner());

CREATE POLICY "Owner has full access to lab_experiments" ON public.lab_experiments
    FOR ALL USING (public.is_owner());

CREATE POLICY "Owner has full access to contact_messages" ON public.contact_messages
    FOR ALL USING (public.is_owner());

CREATE POLICY "Owner has full access to analytics_events" ON public.analytics_events
    FOR ALL USING (public.is_owner());

CREATE POLICY "Owner has full access to admin_activity" ON public.admin_activity
    FOR ALL USING (public.is_owner());

CREATE POLICY "Owner has full access to site_settings" ON public.site_settings
    FOR ALL USING (public.is_owner());

-- 4.4 Storage Policies
CREATE POLICY "Public Access to Portfolio Assets"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'portfolio-assets');

CREATE POLICY "Owner Manage Portfolio Assets"
    ON storage.objects FOR ALL
    USING (bucket_id = 'portfolio-assets' AND public.is_owner());
