// Real-time Supabase & Browser Notification System

import { supabase, warRoomChannel } from './supabase';
import { playSound } from './audioFeedback';

// Request Browser Desktop Notification Permission politely
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

// Send Desktop Browser Notification (even when tab is minimized)
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

// Broadcast Realtime Handoff Event across tabs and laptops via Supabase & BroadcastChannel
export function broadcastHandoffEvent(eventData) {
  // 1. Broadcast via local BroadcastChannel (instant same-browser cross-tab)
  if (warRoomChannel) {
    warRoomChannel.postMessage(eventData);
  }

  // 2. Broadcast via Supabase Realtime Channel (cross-laptop worldwide)
  if (supabase) {
    const channel = supabase.channel('nextaura_warroom_realtime');
    channel.send({
      type: 'broadcast',
      event: 'handoff_event',
      payload: eventData
    });
  }
}
