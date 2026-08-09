// Real-time Supabase & Browser Notification System

import { supabase, warRoomChannel } from './supabase';
import { playSound } from './audioFeedback';

export async function requestBrowserPermission() {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return false;
  }
  if (Notification.permission === 'granted') {
    return true;
  }
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
}

export function sendDesktopNotification(title, body, icon = '/assets/NEXTAURA.png') {
  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body,
        icon,
        badge: icon,
        vibrate: [200, 100, 200]
      });
    } catch (err) {
      console.warn('Desktop notification error:', err);
    }
  }
}

// Save notification directly into Supabase PostgreSQL database
export async function pushSupabaseNotification(title, message, type = 'info', sender = 'System') {
  const notifObj = {
    id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    title,
    message,
    type,
    sender,
    created_at: new Date().toISOString()
  };

  // 1. Broadcast via local tab channel
  if (warRoomChannel) {
    warRoomChannel.postMessage({ type: 'NEW_NOTIFICATION', notification: notifObj });
  }

  // 2. Save into Supabase Database for cross-laptop realtime broadcast
  if (supabase) {
    try {
      await supabase.from('notifications').insert([notifObj]);
    } catch (err) {
      console.warn('Supabase DB notification insert warning:', err);
    }
  }

  return notifObj;
}
