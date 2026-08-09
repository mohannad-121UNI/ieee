-- ⚡ NextAura AI Competition War Room — Supabase Database Schema
-- Execute this SQL script in your Supabase SQL Editor to initialize all tables & realtime sync.

-- 1. COMPETITION METADATA
CREATE TABLE IF NOT EXISTS public.competitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  metric TEXT NOT NULL,
  metric_direction TEXT DEFAULT 'higher',
  submission_limit INT DEFAULT 10,
  current_objective TEXT,
  next_action TEXT,
  start_time TIMESTAMPTZ DEFAULT NOW(),
  end_time TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TEAM MEMBERS & STATIONS
CREATE TABLE IF NOT EXISTS public.team_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  station TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TASKS
CREATE TABLE IF NOT EXISTS public.tasks (
  id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL,
  title TEXT NOT NULL,
  explanation TEXT,
  subtasks JSONB DEFAULT '[]'::jsonb,
  priority TEXT DEFAULT 'MEDIUM',
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  notes TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. EXPERIMENTS
CREATE TABLE IF NOT EXISTS public.experiments (
  id TEXT PRIMARY KEY,
  owner TEXT NOT NULL,
  model TEXT NOT NULL,
  name TEXT NOT NULL,
  changes TEXT,
  cv_score FLOAT NOT NULL,
  cv_std FLOAT,
  lb_score FLOAT,
  runtime TEXT,
  status TEXT DEFAULT 'KEEP',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. SUBMISSIONS
CREATE TABLE IF NOT EXISTS public.submissions (
  id TEXT PRIMARY KEY,
  submission_number INT NOT NULL,
  experiment_id TEXT,
  cv_score FLOAT,
  lb_score FLOAT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. BLOCKERS
CREATE TABLE IF NOT EXISTS public.blockers (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  owner TEXT NOT NULL,
  severity TEXT DEFAULT 'MEDIUM',
  resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TEAM NOTES
CREATE TABLE IF NOT EXISTS public.team_notes (
  id TEXT PRIMARY KEY,
  member TEXT NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. REPORTS (Data Reports / Red Team Risk Reports)
CREATE TABLE IF NOT EXISTS public.reports (
  id TEXT PRIMARY KEY,
  member TEXT NOT NULL,
  type TEXT NOT NULL, -- 'DATA_REPORT' or 'RED_TEAM_REPORT'
  content JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ACTIVITY FEED
CREATE TABLE IF NOT EXISTS public.activity_feed (
  id TEXT PRIMARY KEY,
  member TEXT NOT NULL,
  action TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE REALTIME PUBLICATION ON ALL TABLES
ALTER PUBLICATION supabase_realtime ADD TABLE public.competitions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.tasks;
ALTER PUBLICATION supabase_realtime ADD TABLE public.experiments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.submissions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.blockers;
ALTER PUBLICATION supabase_realtime ADD TABLE public.team_notes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.reports;
ALTER PUBLICATION supabase_realtime ADD TABLE public.activity_feed;

-- Enable Row Level Security (RLS) policies allowing public access for the competition team
ALTER TABLE public.competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blockers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_feed ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read/write competitions" ON public.competitions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write tasks" ON public.tasks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write experiments" ON public.experiments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write submissions" ON public.submissions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write blockers" ON public.blockers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write team_notes" ON public.team_notes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write reports" ON public.reports FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write activity_feed" ON public.activity_feed FOR ALL USING (true) WITH CHECK (true);
