import React from 'react';
import { ShieldAlert, Zap } from 'lucide-react';

export default function GoldenRules() {
  const rules = [
    { num: '1️⃣', title: 'NO DUPLICATED WORK', desc: 'If Mohannad is testing CatBoost, Dyaa should not blindly test the same approach.' },
    { num: '2️⃣', title: 'LOCAL CV FIRST', desc: 'Do not chase Public Leaderboard blindly. Trust local validation folds.' },
    { num: '3️⃣', title: 'CHANGE ONE MAJOR THING AT A TIME', desc: 'Know WHY the score changed before keeping or dropping a feature.' },
    { num: '4️⃣', title: 'LOG EVERY EXPERIMENT', desc: 'No invisible experiments. Every run must be logged in the War Room tracker.' },
    { num: '5️⃣', title: 'FIRST SUBMISSION EARLY', desc: 'Verify the submission pipeline end-to-end before optimizing parameters.' },
    { num: '6️⃣', title: 'RED TEAM BEFORE FINAL', desc: 'Dyaa must validate and audit the final candidate pipeline before submission.' },
    { num: '7️⃣', title: 'DATA BEFORE MODEL', desc: 'Moayad findings on missing values, skewness, and shift must guide features.' },
    { num: '8️⃣', title: 'AI IS A TEAM OF SPECIALISTS', desc: 'ChatGPT=Strategy, Gemini=Data, Claude=Reviewer, DeepSeek=Math, Codex=Coder, Antigravity=Agent.' },
    { num: '9️⃣', title: 'NEVER TRUST A RESULT WITHOUT VALIDATION', desc: 'Always verify target encoding and preprocessors inside CV fold loops.' },
    { num: '🔟', title: 'WIN AS ONE TEAM 🏆', desc: 'Three roles. One scoreboard. Total synchronization.' }
  ];

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <ShieldAlert size={22} color="var(--accent-amber)" /> ⚡ WAR ROOM GOLDEN RULES
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
        {rules.map((r, idx) => (
          <div key={idx} style={{ background: 'rgba(21, 31, 54, 0.5)', border: '1px solid var(--border-glass)', borderRadius: '10px', padding: '12px 14px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--accent-cyan)', marginBottom: '2px' }}>
              {r.num} {r.title}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.35' }}>
              "{r.desc}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
