import React from 'react';
import { useWarRoom } from '../context/WarRoomContext';
import { AlertOctagon, Award, Clock, ArrowRight } from 'lucide-react';

export default function EndgameBanner() {
  const { competition, lang } = useWarRoom();
  const isAr = lang === 'ar';

  if (!competition.endTime || !competition.timerStarted) return null;

  const end = new Date(competition.endTime).getTime();
  const now = new Date().getTime();
  const diff = end - now;
  const minutesLeft = Math.floor(diff / (1000 * 60));

  // Trigger Endgame mode under 20 minutes
  if (diff > 0 && minutesLeft <= 20) {
    return (
      <div 
        className="glass-panel animate-pulse-glow"
        style={{
          margin: '0 20px 20px 20px',
          padding: '18px 24px',
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.25), rgba(245, 158, 11, 0.25))',
          border: '2px solid var(--accent-red)',
          boxShadow: '0 0 30px rgba(239, 68, 68, 0.5)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <AlertOctagon size={28} color="var(--accent-red)" className="animate-pulse-glow" />
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--accent-red)' }}>
              🚨 {isAr ? 'تفعيل وضع النهاية (ENDGAME MODE) — متبقي أقل من 20 دقيقة!' : 'ENDGAME MODE ACTIVATED (< 20 MINUTES REMAINING!)'}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', marginTop: '2px' }}>
              {isAr 
                ? 'أوقف التجارب الثانوية الآن! ركز حصرياً على: 1. اختيار النموذج النهائي، 2. اعتمادات الفريق الأحمر، 3. الرفع على المنصة.'
                : 'Halt low-priority experiments! Focus strictly on: 1. Final Model Selection, 2. Red Team Audits, 3. Final Submission Upload!'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.3rem', fontWeight: '900', color: 'var(--accent-red)', fontFamily: 'var(--font-mono)' }}>
            {minutesLeft}m REMAINING
          </span>
        </div>
      </div>
    );
  }

  return null;
}
