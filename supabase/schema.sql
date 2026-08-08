-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Function to handle updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--------------------------------------------------
-- 1. PROFILES TABLE
--------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Automatically create profile on auth signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Admin'),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
    'admin'
  )
  ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Profiles RLS
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

--------------------------------------------------
-- 2. PROJECTS TABLE
--------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'Web Design',
  client TEXT,
  location TEXT,
  deliverables JSONB DEFAULT '[]'::jsonb,
  process JSONB DEFAULT '[]'::jsonb,
  image TEXT,
  gallery JSONB DEFAULT '[]'::jsonb,
  tech_stack JSONB DEFAULT '[]'::jsonb,
  featured BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  meta_title TEXT,
  meta_description TEXT,
  og_image TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_deleted_at ON public.projects(deleted_at);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Projects RLS Policies
CREATE POLICY "Public can view published active projects"
  ON public.projects FOR SELECT
  USING (status = 'published' AND deleted_at IS NULL);

CREATE POLICY "Authenticated users have full access to projects"
  ON public.projects FOR ALL
  USING (auth.role() = 'authenticated');

--------------------------------------------------
-- 3. BLOG CATEGORIES & TAGS TABLES
--------------------------------------------------
CREATE TABLE IF NOT EXISTS public.blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view categories"
  ON public.blog_categories FOR SELECT USING (true);

CREATE POLICY "Authenticated can manage categories"
  ON public.blog_categories FOR ALL USING (auth.role() = 'authenticated');

CREATE TABLE IF NOT EXISTS public.blog_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.blog_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view tags"
  ON public.blog_tags FOR SELECT USING (true);

CREATE POLICY "Authenticated can manage tags"
  ON public.blog_tags FOR ALL USING (auth.role() = 'authenticated');

--------------------------------------------------
-- 4. BLOG POSTS TABLE
--------------------------------------------------
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  image TEXT,
  category TEXT NOT NULL DEFAULT 'GENERAL',
  author JSONB NOT NULL DEFAULT '{"name": "ADMIN", "role": "Design Director", "avatar": ""}'::jsonb,
  read_time TEXT DEFAULT '5 min read',
  content JSONB DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled', 'archived')),
  published_at TIMESTAMPTZ DEFAULT NOW(),
  featured BOOLEAN NOT NULL DEFAULT false,
  meta_title TEXT,
  meta_description TEXT,
  og_image TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_deleted_at ON public.blog_posts(deleted_at);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Blog Posts RLS Policies
CREATE POLICY "Public can view published active blog posts"
  ON public.blog_posts FOR SELECT
  USING (status = 'published' AND deleted_at IS NULL AND (published_at IS NULL OR published_at <= NOW()));

CREATE POLICY "Authenticated users have full access to blog posts"
  ON public.blog_posts FOR ALL
  USING (auth.role() = 'authenticated');

--------------------------------------------------
-- 5. MESSAGES TABLE (Contact Form)
--------------------------------------------------
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  subject TEXT NOT NULL DEFAULT 'General Inquiry',
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_messages_status ON public.messages(status);
CREATE INDEX IF NOT EXISTS idx_messages_email ON public.messages(email);
CREATE INDEX IF NOT EXISTS idx_messages_deleted_at ON public.messages(deleted_at);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_messages_updated_at
BEFORE UPDATE ON public.messages
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Messages RLS Policies
CREATE POLICY "Anyone can submit contact messages"
  ON public.messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated admins can view and manage messages"
  ON public.messages FOR ALL
  USING (auth.role() = 'authenticated');

--------------------------------------------------
-- 6. ACTIVITY LOGS TABLE
--------------------------------------------------
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  user_email TEXT,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON public.activity_logs(created_at DESC);

ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated admins can view activity logs"
  ON public.activity_logs FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated admins can insert activity logs"
  ON public.activity_logs FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

--------------------------------------------------
-- 7. SETTINGS TABLE
--------------------------------------------------
CREATE TABLE IF NOT EXISTS public.settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_settings_updated_at
BEFORE UPDATE ON public.settings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE POLICY "Public can view settings"
  ON public.settings FOR SELECT USING (true);

CREATE POLICY "Authenticated admins can update settings"
  ON public.settings FOR ALL USING (auth.role() = 'authenticated');

--------------------------------------------------
-- 8. STORAGE BUCKETS SETUP
--------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('projects', 'projects', true),
  ('blog', 'blog', true),
  ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Public Access for Projects Storage"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'projects');

CREATE POLICY "Authenticated Access for Projects Storage"
  ON storage.objects FOR ALL
  USING (bucket_id = 'projects' AND auth.role() = 'authenticated');

CREATE POLICY "Public Access for Blog Storage"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog');

CREATE POLICY "Authenticated Access for Blog Storage"
  ON storage.objects FOR ALL
  USING (bucket_id = 'blog' AND auth.role() = 'authenticated');

CREATE POLICY "Public Access for Avatars Storage"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Authenticated Access for Avatars Storage"
  ON storage.objects FOR ALL
  USING (bucket_id = 'avatars' AND auth.role() = 'authenticated');
