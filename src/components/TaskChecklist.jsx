import React, { useState } from 'react';
import { useWarRoom } from '../context/WarRoomContext';
import { CheckSquare, Square, Clock, ChevronDown, ChevronUp, Edit3 } from 'lucide-react';

export default function TaskChecklist({ memberId, memberName }) {
  const { tasks, toggleTask, updateTaskNotes, t } = useWarRoom();
  const [editingNotesId, setEditingNotesId] = useState(null);
  const [tempNotes, setTempNotes] = useState('');
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const memberTasks = tasks.filter(tItem => tItem.memberId === memberId);
  const completedCount = memberTasks.filter(tItem => tItem.completed).length;
  const progressPct = memberTasks.length ? Math.round((completedCount / memberTasks.length) * 100) : 0;

  const handleNotesSave = (taskId) => {
    updateTaskNotes(taskId, tempNotes);
    setEditingNotesId(null);
  };

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      {/* Header & Progress */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '20px',
        paddingBottom: '16px',
        borderBottom: '1px solid var(--border-glass)'
      }}>
        <div>
          <h3 style={{ fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {t.taskChecklist} — {memberName}
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {t.sequentialProtocol} ({completedCount} / {memberTasks.length})
          </p>
        </div>

        <div style={{ minWidth: '180px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>{t.stationProgress}</span>
            <span style={{ fontWeight: '700', color: progressPct === 100 ? 'var(--accent-green)' : 'var(--accent-cyan)' }}>
              {progressPct}%
            </span>
          </div>
          <div className="progress-bar-bg">
            <div 
              className={`progress-bar-fill ${progressPct === 100 ? 'progress-bar-green' : 'progress-bar-cyan'}`}
              style={{ width: `${progressPct}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Sequential Task Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {memberTasks.map((task) => {
          const isExpanded = expandedTaskId === task.id;
          const isEditingNotes = editingNotesId === task.id;

          return (
            <div
              key={task.id}
              style={{
                background: task.completed ? 'rgba(16, 185, 129, 0.05)' : 'rgba(21, 31, 54, 0.6)',
                border: `1px solid ${task.completed ? 'rgba(16, 185, 129, 0.25)' : 'var(--border-glass)'}`,
                borderRadius: '12px',
                padding: '16px',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <button
                  onClick={() => toggleTask(task.id, memberName)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: task.completed ? 'var(--accent-green)' : 'var(--text-dim)',
                    padding: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title={task.completed ? 'Mark incomplete' : 'Mark complete'}
                >
                  {task.completed ? (
                    <CheckSquare size={24} color="var(--accent-green)" />
                  ) : (
                    <Square size={24} />
                  )}
                </button>

                <div style={{ flexGrow: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                    <h4 style={{
                      fontSize: '1.05rem',
                      fontWeight: '700',
                      textDecoration: task.completed ? 'line-through' : 'none',
                      color: task.completed ? 'var(--text-muted)' : 'var(--text-main)'
                    }}>
                      {task.title}
                    </h4>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className={`badge ${
                        task.priority === 'CRITICAL' ? 'badge-red' :
                        task.priority === 'HIGH' ? 'badge-amber' : 'badge-cyan'
                      }`}>
                        {task.priority}
                      </span>

                      {task.completedAt && (
                        <span style={{ fontSize: '0.72rem', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={12} /> {new Date(task.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}

                      <button
                        onClick={() => setExpandedTaskId(isExpanded ? null : task.id)}
                        className="btn-secondary"
                        style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                      >
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />} Details
                      </button>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: '1.4' }}>
                    {task.explanation}
                  </p>

                  {isExpanded && (
                    <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px dashed var(--border-glass)' }}>
                      {task.subtasks && task.subtasks.length > 0 && (
                        <div style={{ marginBottom: '14px' }}>
                          <p style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '6px' }}>
                            {t.subtaskSteps}
                          </p>
                          <ul style={{ listStyle: 'none', paddingLeft: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {task.subtasks.map((sub, i) => (
                              <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ color: task.completed ? 'var(--accent-green)' : 'var(--accent-cyan)' }}>•</span> {sub}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>
                            {t.notesObs}
                          </span>
                          {!isEditingNotes && (
                            <button
                              onClick={() => { setEditingNotesId(task.id); setTempNotes(task.notes || ''); }}
                              style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                            >
                              <Edit3 size={12} /> {task.notes ? t.editNotes : t.addNotes}
                            </button>
                          )}
                        </div>

                        {isEditingNotes ? (
                          <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                            <input
                              type="text"
                              value={tempNotes}
                              onChange={(e) => setTempNotes(e.target.value)}
                              placeholder="Enter notes..."
                            />
                            <button onClick={() => handleNotesSave(task.id)} className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                              {t.save}
                            </button>
                          </div>
                        ) : (
                          <p style={{ fontSize: '0.85rem', color: task.notes ? 'var(--accent-cyan)' : 'var(--text-dim)', fontStyle: task.notes ? 'normal' : 'italic' }}>
                            {task.notes || t.noNotes}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
