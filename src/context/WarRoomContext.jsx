import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_COMPETITION,
  INITIAL_TASKS,
  INITIAL_EXPERIMENTS,
  INITIAL_SUBMISSIONS,
  INITIAL_BLOCKERS,
  INITIAL_NOTES,
  INITIAL_ACTIVITIES
} from '../config/initialData';
import { TRANSLATIONS } from '../config/translations';
import { supabase, isSupabaseConfigured, warRoomChannel } from '../services/supabase';

const WarRoomContext = createContext();

const STORAGE_KEY = 'nextaura_warroom_state_v3';

export const WarRoomProvider = ({ children }) => {
  // Language State: 'en' | 'ar'
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('nextaura_lang') || 'en';
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem('nextaura_lang', newLang);
    if (typeof document !== 'undefined') {
      document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = newLang;
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Station State
  const [activeStation, setActiveStation] = useState(() => {
    return localStorage.getItem('nextaura_active_station') || 'station_select';
  });

  // Data States
  const [competition, setCompetition] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_comp`);
    return saved ? JSON.parse(saved) : INITIAL_COMPETITION;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_tasks`);
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [experiments, setExperiments] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_exps`);
    return saved ? JSON.parse(saved) : INITIAL_EXPERIMENTS;
  });

  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_subs`);
    return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
  });

  const [blockers, setBlockers] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_blockers`);
    return saved ? JSON.parse(saved) : INITIAL_BLOCKERS;
  });

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_notes`);
    return saved ? JSON.parse(saved) : INITIAL_NOTES;
  });

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_activities`);
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });

  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_reports`);
    return saved ? JSON.parse(saved) : [];
  });

  // Notifications State
  const [notifications, setNotifications] = useState([]);

  // Auto-save to LocalStorage & broadcast
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_comp`, JSON.stringify(competition));
    localStorage.setItem(`${STORAGE_KEY}_tasks`, JSON.stringify(tasks));
    localStorage.setItem(`${STORAGE_KEY}_exps`, JSON.stringify(experiments));
    localStorage.setItem(`${STORAGE_KEY}_subs`, JSON.stringify(submissions));
    localStorage.setItem(`${STORAGE_KEY}_blockers`, JSON.stringify(blockers));
    localStorage.setItem(`${STORAGE_KEY}_notes`, JSON.stringify(notes));
    localStorage.setItem(`${STORAGE_KEY}_activities`, JSON.stringify(activities));
    localStorage.setItem(`${STORAGE_KEY}_reports`, JSON.stringify(reports));

    if (warRoomChannel) {
      warRoomChannel.postMessage({
        type: 'STATE_UPDATE',
        payload: { competition, tasks, experiments, submissions, blockers, notes, activities, reports }
      });
    }
  }, [competition, tasks, experiments, submissions, blockers, notes, activities, reports]);

  // Listen to BroadcastChannel updates
  useEffect(() => {
    if (!warRoomChannel) return;
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'STATE_UPDATE') {
        const { payload } = event.data;
        if (payload.competition) setCompetition(payload.competition);
        if (payload.tasks) setTasks(payload.tasks);
        if (payload.experiments) setExperiments(payload.experiments);
        if (payload.submissions) setSubmissions(payload.submissions);
        if (payload.blockers) setBlockers(payload.blockers);
        if (payload.notes) setNotes(payload.notes);
        if (payload.activities) setActivities(payload.activities);
        if (payload.reports) setReports(payload.reports);
      }
    };
    warRoomChannel.addEventListener('message', handleMessage);
    return () => warRoomChannel.removeEventListener('message', handleMessage);
  }, []);

  const changeStation = (stationId) => {
    setActiveStation(stationId);
    localStorage.setItem('nextaura_active_station', stationId);
  };

  const resetWarRoom = () => {
    setCompetition(INITIAL_COMPETITION);
    setTasks(INITIAL_TASKS);
    setExperiments(INITIAL_EXPERIMENTS);
    setSubmissions(INITIAL_SUBMISSIONS);
    setBlockers(INITIAL_BLOCKERS);
    setNotes(INITIAL_NOTES);
    setActivities(INITIAL_ACTIVITIES);
    setReports([]);
    localStorage.clear();
    addNotification('War Room Reset 🔄', 'All telemetry cleared.', 'info');
  };

  const addNotification = (title, message, type = 'info') => {
    const id = Date.now();
    setNotifications((prev) => [{ id, title, message, type }, ...prev].slice(0, 5));
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4500);
  };

  const logActivity = (member, action) => {
    const newActivity = {
      id: `ACT-${Date.now()}`,
      member,
      action,
      timestamp: new Date().toISOString()
    };
    setActivities((prev) => [newActivity, ...prev].slice(0, 50));
  };

  const toggleTask = (taskId, memberName) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextCompleted = !t.completed;
          logActivity(
            memberName || t.memberId,
            `${nextCompleted ? 'completed' : 'uncompleted'} task "${t.title}"`
          );
          if (nextCompleted) {
            addNotification('Task Completed! ✅', `${t.title} marked complete.`, 'success');
          }
          return {
            ...t,
            completed: nextCompleted,
            completedAt: nextCompleted ? new Date().toISOString() : null
          };
        }
        return t;
      })
    );
  };

  const updateTaskNotes = (taskId, notesText) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, notes: notesText } : t))
    );
  };

  const addExperiment = (expData) => {
    const newExp = {
      id: expData.id || `EXP-${String(experiments.length + 1).padStart(3, '0')}`,
      owner: expData.owner,
      model: expData.model,
      name: expData.name,
      changes: expData.changes,
      cvScore: parseFloat(expData.cvScore),
      cvStd: expData.cvStd ? parseFloat(expData.cvStd) : null,
      lbScore: expData.lbScore ? parseFloat(expData.lbScore) : null,
      runtime: expData.runtime || '5m',
      status: expData.status || 'KEEP',
      notes: expData.notes || '',
      timestamp: new Date().toISOString()
    };

    const currentBest = [...experiments].sort((a, b) => (b.cvScore || 0) - (a.cvScore || 0))[0];
    const isNewBest = !currentBest || newExp.cvScore > currentBest.cvScore;

    if (isNewBest) {
      newExp.status = 'BEST';
      addNotification('🏆 NEW BEST CV!', `${newExp.model} achieved CV: ${newExp.cvScore}!`, 'success');
    } else {
      addNotification('Experiment Recorded 🧪', `${newExp.name} logged (CV: ${newExp.cvScore}).`, 'info');
    }

    setExperiments((prev) => [
      newExp,
      ...prev.map((e) => (isNewBest && e.status === 'BEST' ? { ...e, status: 'KEEP' } : e))
    ]);

    logActivity(newExp.owner, `logged experiment ${newExp.id} (${newExp.name}) with CV: ${newExp.cvScore}`);
  };

  const updateExperimentStatus = (expId, status) => {
    setExperiments((prev) =>
      prev.map((e) => (e.id === expId ? { ...e, status } : e))
    );
  };

  const addSubmission = (subData) => {
    const newSub = {
      id: `SUB-${String(submissions.length + 1).padStart(3, '0')}`,
      submissionNumber: submissions.length + 1,
      experimentId: subData.experimentId,
      cvScore: parseFloat(subData.cvScore),
      lbScore: parseFloat(subData.lbScore),
      notes: subData.notes || '',
      timestamp: new Date().toISOString()
    };

    setSubmissions((prev) => [newSub, ...prev]);

    if (subData.experimentId && subData.lbScore) {
      setExperiments((prev) =>
        prev.map((e) => (e.id === subData.experimentId ? { ...e, lbScore: parseFloat(subData.lbScore) } : e))
      );
    }

    addNotification('Submission Recorded! 📤', `Submission #${newSub.submissionNumber} scored LB: ${newSub.lbScore}`, 'success');
    logActivity('Team', `recorded submission #${newSub.submissionNumber} (LB: ${newSub.lbScore})`);
  };

  const addBlocker = (blockerData) => {
    const newBlocker = {
      id: `BLK-${String(blockers.length + 1).padStart(3, '0')}`,
      title: blockerData.title,
      description: blockerData.description,
      owner: blockerData.owner,
      severity: blockerData.severity || 'HIGH',
      resolved: false,
      createdAt: new Date().toISOString()
    };

    setBlockers((prev) => [newBlocker, ...prev]);
    addNotification('🚨 BLOCKER ADDED', `${newBlocker.owner} flagged: ${newBlocker.title}`, 'error');
    logActivity(newBlocker.owner, `flagged ${newBlocker.severity} blocker: "${newBlocker.title}"`);
  };

  const toggleBlockerResolved = (blockerId) => {
    setBlockers((prev) =>
      prev.map((b) => {
        if (b.id === blockerId) {
          const nextResolved = !b.resolved;
          logActivity(b.owner, `${nextResolved ? 'resolved' : 'reopened'} blocker "${b.title}"`);
          if (nextResolved) {
            addNotification('Blocker Resolved! 🎉', `"${b.title}" marked resolved.`, 'success');
          }
          return { ...b, resolved: nextResolved };
        }
        return b;
      })
    );
  };

  const addTeamNote = (member, text) => {
    const newNote = {
      id: `NOTE-${Date.now()}`,
      member,
      text,
      timestamp: new Date().toISOString()
    };
    setNotes((prev) => [newNote, ...prev]);
    logActivity(member, `posted note: "${text.slice(0, 40)}..."`);
  };

  const addReport = (reportData) => {
    const newReport = {
      id: `REP-${Date.now()}`,
      member: reportData.member,
      type: reportData.type,
      content: reportData.content,
      createdAt: new Date().toISOString()
    };
    setReports((prev) => [newReport, ...prev]);
    addNotification('Report Delivered 📤', `${reportData.type} sent to TEAM HQ by ${reportData.member}`, 'success');
    logActivity(reportData.member, `delivered ${reportData.type} to Team HQ`);
  };

  const updateCompetition = (compData) => {
    setCompetition((prev) => ({ ...prev, ...compData }));
    addNotification('Settings Updated ⚙️', 'Competition configuration saved.', 'info');
  };

  return (
    <WarRoomContext.Provider
      value={{
        lang,
        setLang,
        t,
        activeStation,
        changeStation,
        resetWarRoom,
        competition,
        updateCompetition,
        tasks,
        toggleTask,
        updateTaskNotes,
        experiments,
        addExperiment,
        updateExperimentStatus,
        submissions,
        addSubmission,
        blockers,
        addBlocker,
        toggleBlockerResolved,
        notes,
        addTeamNote,
        activities,
        reports,
        addReport,
        notifications,
        addNotification,
        logActivity
      }}
    >
      {children}
    </WarRoomContext.Provider>
  );
};

export const useWarRoom = () => useContext(WarRoomContext);
