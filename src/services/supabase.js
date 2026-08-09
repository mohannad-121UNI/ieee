import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://xdkotswhqmelovhbiwwg.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhka290c3docW1lbG92aGJpd3dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyOTAxMzYsImV4cCI6MjEwMTg2NjEzNn0.hzPTkbUMQ-WEGHWoTNBdcXbHaAYHZgUPZpr7Uj3qNbk";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Cross-tab & Multi-window BroadcastChannel fallback for instant sync
export const warRoomChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window
  ? new BroadcastChannel('nextaura_warroom_channel')
  : null;
