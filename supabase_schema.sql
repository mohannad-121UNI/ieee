-- ========================================================
-- ⚡ NextAura AI Competition War Room — Supabase Database Schema
-- Run this script inside Supabase SQL Editor:
-- https://supabase.com/dashboard/project/xdkotswhqmelovhbiwwg/sql/new
-- ========================================================

-- 1. Competitions Table
CREATE TABLE IF NOT EXISTS public.competitions (
  id TEXT PRIMARY KEY DEFAULT 'comp_default',
  name TEXT NOT NULL DEFAULT 'IEEE Machine Learning Challenge 2026',
  metric TEXT NOT NULL DEFAULT 'Macro F1-Score',
  metric_direction TEXT NOT NULL DEFAULT 'higher',
  submission_limit INT NOT NULL DEFAULT 10,
  current_objective TEXT DEFAULT 'Establish robust local validation CV scheme.',
  next_action TEXT DEFAULT 'Mohannad: Complete metric verification; Moayad: Load train/test data.',
  timer_started BOOLEAN DEFAULT false,
  end_time TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tasks Table
CREATE TABLE IF NOT EXISTS public.tasks (
  id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL,
  title TEXT NOT NULL,
  explanation TEXT,
  priority TEXT DEFAULT 'HIGH',
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  subtasks JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Experiments Table
CREATE TABLE IF NOT EXISTS public.experiments (
  id TEXT PRIMARY KEY,
  owner TEXT NOT NULL,
  model TEXT NOT NULL,
  name TEXT NOT NULL,
  changes TEXT,
  cv_score NUMERIC NOT NULL,
  lb_score NUMERIC,
  runtime TEXT DEFAULT '2m',
  status TEXT DEFAULT 'KEEP',
  notes TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Submissions Table
CREATE TABLE IF NOT EXISTS public.submissions (
  id TEXT PRIMARY KEY,
  sub_number INT NOT NULL,
  model_name TEXT NOT NULL,
  cv_score NUMERIC NOT NULL,
  public_lb NUMERIC,
  submitted_by TEXT NOT NULL,
  qa_status TEXT DEFAULT 'APPROVED',
  file_name TEXT,
  notes TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Blockers Table
CREATE TABLE IF NOT EXISTS public.blockers (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  owner TEXT NOT NULL,
  severity TEXT DEFAULT 'HIGH',
  resolved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Team Notes Table
CREATE TABLE IF NOT EXISTS public.team_notes (
  id TEXT PRIMARY KEY,
  author TEXT NOT NULL,
  text TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Reports Table
CREATE TABLE IF NOT EXISTS public.reports (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  author TEXT NOT NULL,
  title TEXT NOT NULL,
  content JSONB NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Activity Feed Table
CREATE TABLE IF NOT EXISTS public.activity_feed (
  id TEXT PRIMARY KEY,
  user_name TEXT NOT NULL,
  action TEXT NOT NULL,
  details TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Guided Pipeline Steps Table (38 Master Steps)
CREATE TABLE IF NOT EXISTS public.guided_steps (
  id INT PRIMARY KEY,
  phase TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  owner TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT DEFAULT 'LOCKED',
  completed_at TIMESTAMP WITH TIME ZONE,
  blocked_reason TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. REALTIME NOTIFICATIONS TABLE (Synchronized across all 3 laptops)
CREATE TABLE IF NOT EXISTS public.notifications (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info',
  sender TEXT DEFAULT 'System',
  recipient TEXT DEFAULT 'all',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================================
-- ENABLE ROW LEVEL SECURITY (RLS) & PUBLIC ACCESS POLICIES
-- ========================================================
ALTER TABLE public.competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blockers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_feed ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guided_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Allow anonymous public read/write access for real-time collaboration
CREATE POLICY "Allow public read/write competitions" ON public.competitions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write tasks" ON public.tasks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write experiments" ON public.experiments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write submissions" ON public.submissions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write blockers" ON public.blockers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write team_notes" ON public.team_notes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write reports" ON public.reports FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write activity_feed" ON public.activity_feed FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write guided_steps" ON public.guided_steps FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write notifications" ON public.notifications FOR ALL USING (true) WITH CHECK (true);

-- ========================================================
-- ENABLE SUPABASE REALTIME REPLICATION (CRITICAL FOR CROSS-LAPTOP SYNC)
-- ========================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.competitions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.tasks;
ALTER PUBLICATION supabase_realtime ADD TABLE public.experiments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.submissions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.blockers;
ALTER PUBLICATION supabase_realtime ADD TABLE public.team_notes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.reports;
ALTER PUBLICATION supabase_realtime ADD TABLE public.activity_feed;
ALTER PUBLICATION supabase_realtime ADD TABLE public.guided_steps;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
