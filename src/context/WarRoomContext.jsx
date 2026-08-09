import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_COMPETITION, INITIAL_TASKS, INITIAL_EXPERIMENTS, INITIAL_SUBMISSIONS, INITIAL_BLOCKERS, INITIAL_NOTES } from '../config/initialData';
import { INITIAL_GUIDED_STEPS, PIPELINE_PHASES } from '../config/guidedPipelineData';
import { TRANSLATIONS } from '../config/translations';
import { playSound } from '../services/audioFeedback';
import { sendDesktopNotification, requestBrowserPermission } from '../services/realtimeSync';
import { supabase, warRoomChannel } from '../services/supabase';

const WarRoomContext = createContext();

export function WarRoomProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('nextaura_lang') || 'en');
  const [soundEnabled, setSoundEnabled] = useState(() => localStorage.getItem('nextaura_sound') !== 'false');

  const [activeStation, setActiveStation] = useState('station_select');

  // Core telemetry state
  const [competition, setCompetition] = useState(INITIAL_COMPETITION);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [experiments, setExperiments] = useState(INITIAL_EXPERIMENTS);
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);
  const [blockers, setBlockers] = useState(INITIAL_BLOCKERS);
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [reports, setReports] = useState([]);
  const [activityFeed, setActivityFeed] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Guided Competition Mode State (38 Steps)
  const [guidedSteps, setGuidedSteps] = useState(INITIAL_GUIDED_STEPS);
  const [bestCvModal, setBestCvModal] = useState(null);

  // Sync Document Direction for RTL/LTR
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    localStorage.setItem('nextaura_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('nextaura_sound', soundEnabled);
  }, [soundEnabled]);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'en' ? 'ar' : 'en'));
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  const addNotification = (title, message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const addActivity = (user, action, details) => {
    const entry = {
      id: Date.now(),
      user,
      action,
      details,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setActivityFeed(prev => [entry, ...prev]);
  };

  // --- GUIDED COMPETITION GPS CONTROLS ---
  const completeStep = (stepId, memberName) => {
    let newlyUnlockedStep = null;
    let handoffMsg = '';

    setGuidedSteps(prevSteps => {
      const updated = prevSteps.map(s => {
        if (s.id === stepId) {
          handoffMsg = lang === 'ar' ? s.handoffMessageAr : s.handoffMessageEn;
          return { ...s, status: 'DONE', completedAt: new Date().toISOString() };
        }
        return s;
      });

      // Recalculate unlocks
      const doneIds = new Set(updated.filter(s => s.status === 'DONE').map(s => s.id));

      return updated.map(s => {
        if (s.status === 'LOCKED' && s.dependsOn.length > 0) {
          const allDependenciesDone = s.dependsOn.every(dId => doneIds.has(dId));
          if (allDependenciesDone) {
            newlyUnlockedStep = s;
            return { ...s, status: 'READY' };
          }
        }
        return s;
      });
    });

    if (soundEnabled) {
      playSound('approval');
    }

    addNotification('✅ Step Completed!', handoffMsg, 'success');
    sendDesktopNotification('✅ NextAura Handoff Alert', handoffMsg);
    addActivity(memberName, 'Completed Guided Step', `Step ${stepId} marked done.`);
  };

  const markStepBlocked = (stepId, reason, owner = 'Team Leader') => {
    setGuidedSteps(prev => prev.map(s => s.id === stepId ? { ...s, status: 'BLOCKED', blockedReason: reason } : s));

    // Add to blocker center
    const newBlocker = {
      id: `blk_${Date.now()}`,
      title: `GPS Step ${stepId} Blocked`,
      description: reason,
      owner,
      severity: 'HIGH',
      resolved: false
    };
    setBlockers(prev => [newBlocker, ...prev]);

    if (soundEnabled) {
      playSound('blocker');
    }

    addNotification('🚨 GPS STEP BLOCKED!', `Step ${stepId} flagged blocked: ${reason}`, 'error');
    sendDesktopNotification('🚨 GPS STEP BLOCKED!', `Step ${stepId} flagged blocked: ${reason}`);
  };

  // --- LOG EXPERIMENT & NEW BEST CV EVENT ---
  const addExperiment = (expData) => {
    const newExp = {
      id: `EXP-${String(experiments.length + 1).padStart(3, '0')}`,
      timestamp: new Date().toISOString(),
      ...expData
    };

    // Check if new best CV
    const previousBestCv = experiments.length ? Math.max(...experiments.map(e => e.cvScore || 0)) : 0;
    const isNewBest = newExp.cvScore > previousBestCv;

    setExperiments(prev => [newExp, ...prev]);

    if (isNewBest) {
      if (soundEnabled) playSound('best_cv');
      setBestCvModal({
        expId: newExp.id,
        model: newExp.model,
        prevCv: previousBestCv,
        newCv: newExp.cvScore,
        gain: (newExp.cvScore - previousBestCv).toFixed(4)
      });
      addNotification('🏆 NEW BEST CV ACHIEVED!', `${newExp.model} hit CV: ${newExp.cvScore}`, 'success');
    } else {
      if (soundEnabled) playSound('handoff');
      addNotification('🧪 Experiment Logged', `${newExp.id} added with CV: ${newExp.cvScore}`, 'info');
    }

    addActivity(expData.owner || 'Mohannad', 'Logged Experiment', `${newExp.id} (${newExp.model}) — CV: ${newExp.cvScore}`);
  };

  const toggleTask = (taskId, memberName) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const nextState = !t.completed;
        if (soundEnabled && nextState) playSound('handoff');
        addActivity(memberName, nextState ? 'Completed Task' : 'Reopened Task', t.title);
        return { ...t, completed: nextState, completedAt: nextState ? new Date().toISOString() : null };
      }
      return t;
    }));
  };

  const updateCompetition = (updates) => {
    setCompetition(prev => ({ ...prev, ...updates }));
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const value = {
    lang,
    setLang,
    toggleLanguage,
    t,
    soundEnabled,
    toggleSound,
    activeStation,
    setStation: setActiveStation,
    competition,
    updateCompetition,
    tasks,
    toggleTask,
    experiments,
    addExperiment,
    submissions,
    blockers,
    setBlockers,
    notes,
    setNotes,
    reports,
    setReports,
    activityFeed,
    notifications,
    addNotification,
    guidedSteps,
    completeStep,
    markStepBlocked,
    bestCvModal,
    setBestCvModal
  };

  return (
    <WarRoomContext.Provider value={value}>
      {children}
    </WarRoomContext.Provider>
  );
}

export function useWarRoom() {
  return useContext(WarRoomContext);
}
