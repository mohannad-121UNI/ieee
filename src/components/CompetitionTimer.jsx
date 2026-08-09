import React, { useState, useEffect } from 'react';
import { useWarRoom } from '../context/WarRoomContext';
import { Clock, Play, RotateCcw, Edit2, Check } from 'lucide-react';

export default function CompetitionTimer() {
  const { competition, updateCompetition, lang, t } = useWarRoom();
  const isAr = lang === 'ar';

  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0, totalMs: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [hoursInput, setHoursInput] = useState('7');

  const isTimerStarted = Boolean(competition.timerStarted);

  useEffect(() => {
    if (!isTimerStarted || !competition.endTime) return;

    const calculateTimer = () => {
      const end = new Date(competition.endTime).getTime();
      const now = new Date().getTime();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, totalMs: 0 });
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds, totalMs: diff });
      }
    };

    calculateTimer();
    const interval = setInterval(calculateTimer, 1000);
    return () => clearInterval(interval);
  }, [competition.endTime, isTimerStarted]);

  // Start 7-Hour Timer
  const handleStartTimer = () => {
    const hrs = parseFloat(hoursInput) || 7;
    const newEndTime = new Date(Date.now() + hrs * 3600 * 1000).toISOString();
    updateCompetition({
      timerStarted: true,
      endTime: newEndTime
    });
  };

  // Reset Timer
  const handleResetTimer = () => {
    updateCompetition({
      timerStarted: false,
      endTime: null
    });
    setTimeLeft({ hours: 0, minutes: 0, seconds: 0, totalMs: 0 });
  };

  const handleSaveDuration = () => {
    const hrs = parseFloat(hoursInput) || 7;
    const newEndTime = new Date(Date.now() + hrs * 3600 * 1000).toISOString();
    updateCompetition({
      timerStarted: true,
      endTime: newEndTime
    });
    setIsEditing(false);
  };

  const hoursLeft = timeLeft.totalMs / (1000 * 3600);
  const statusColor = hoursLeft > 3 ? 'var(--accent-green)' : hoursLeft > 1 ? 'var(--accent-amber)' : 'var(--accent-red)';
  const statusText = hoursLeft > 3 ? (isAr ? '🟢 متوفر وقت كافٍ' : '🟢 Plenty of time') :
                     hoursLeft > 1 ? (isAr ? '🟡 الوقت متوسط' : '🟡 Medium time') :
                     (isAr ? '🔴 وقت حرج' : '🔴 Critical time');

  const formatTwo = (num) => String(num).padStart(2, '0');

  // If timer not started yet -> Render Start 7-Hour Competition Button
  if (!isTimerStarted) {
    return (
      <button
        onClick={handleStartTimer}
        className="btn-primary animate-pulse-glow"
        style={{
          padding: '8px 16px',
          fontSize: '0.85rem',
          background: 'linear-gradient(135deg, #10B981 0%, #00F0FF 100%)',
          boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)'
        }}
      >
        <Play size={16} /> {isAr ? '▶ بدء مسابقة الـ 7 ساعات' : '▶ START 7-HOUR COMPETITION'}
      </button>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div 
        style={{
          background: 'rgba(21, 31, 54, 0.9)',
          border: `1px solid ${statusColor}40`,
          boxShadow: `0 0 12px ${statusColor}20`,
          borderRadius: '12px',
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <Clock size={18} color={statusColor} className={hoursLeft <= 1 ? 'animate-pulse-glow' : ''} />
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
              {isAr ? 'الوقت المتبقي' : 'TIME REMAINING'}
            </span>
            <span className={`badge ${hoursLeft > 3 ? 'badge-green' : hoursLeft > 1 ? 'badge-amber' : 'badge-red'}`} style={{ fontSize: '0.6rem', padding: '2px 6px' }}>
              {statusText}
            </span>
          </div>

          {isEditing ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
              <input
                type="number"
                value={hoursInput}
                onChange={e => setHoursInput(e.target.value)}
                style={{ width: '60px', padding: '2px 6px', fontSize: '0.8rem' }}
                placeholder="Hours"
              />
              <button onClick={handleSaveDuration} className="btn-primary" style={{ padding: '2px 6px', fontSize: '0.7rem' }}>
                <Check size={12} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '1.15rem', fontWeight: '900', color: statusColor, fontFamily: 'var(--font-mono)' }}>
                {formatTwo(timeLeft.hours)}:{formatTwo(timeLeft.minutes)}:{formatTwo(timeLeft.seconds)}
              </span>

              <button 
                onClick={() => setIsEditing(true)} 
                style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: '2px' }}
                title="Edit timer"
              >
                <Edit2 size={11} />
              </button>

              <button 
                onClick={handleResetTimer} 
                style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: '2px' }}
                title="Reset timer"
              >
                <RotateCcw size={11} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
