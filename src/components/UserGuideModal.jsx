import React, { useState } from 'react';
import { useWarRoom } from '../context/WarRoomContext';
import { BookOpen, CheckCircle, Clock, Award, ChevronRight, ChevronLeft, X, Zap, ShieldCheck, Database, Cpu } from 'lucide-react';

export default function UserGuideModal({ isOpen, onClose }) {
  const { lang, t } = useWarRoom();
  const isAr = lang === 'ar';
  const [activeStep, setActiveStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      stepNum: 1,
      titleEn: 'Step 1: Select Your Station & Role',
      titleAr: 'الخطوة 1: اختيار المحطة والدور',
      icon: <Cpu size={24} color="var(--accent-cyan)" />,
      descEn: 'Each team member must log in from their laptop and enter their designated station:',
      descAr: 'يجب على كل عضو دخول المحطة المخصصة له من جهازه الشخصي:',
      bulletsEn: [
        '👑 Mohannad (Team Leader): Modeling, strategy, cross-validation & final decisions.',
        '📊 Moayad (Data Intelligence): Data cleaning, EDA, feature engineering & distribution checks.',
        '🛡️ Dyaa (Red Team QA): Leakage audits, quality assurance & alternative baseline models.'
      ],
      bulletsAr: [
        '👑 مهند (قائد الفريق): بناء النماذج، التقييم التظاهري CV، القرارات النهائية.',
        '📊 مؤيد (مسؤول البيانات): فحص البيانات، استخراج الميزات والتفاعل.',
        '🛡️ ضياء (الفريق الأحمر): فحص التسريب، ضمان الجودة والنماذج البديلة.'
      ]
    },
    {
      stepNum: 2,
      titleEn: 'Step 2: Start the 7-Hour Competition Timer',
      titleAr: 'الخطوة 2: بدء عداد المسابقة (7 ساعات)',
      icon: <Clock size={24} color="var(--accent-green)" />,
      descEn: 'Initialize the competition timer at the start of your hackathon or competition window:',
      descAr: 'ابدأ العداد التنازلي في بداية وقت المسابقة:',
      bulletsEn: [
        'Click ▶ START 7-HOUR COMPETITION in the top bar.',
        'The timer tracks exact time remaining with status alerts (🟢 Plenty / 🟡 Medium / 🔴 Critical).',
        'Pause, reset, or adjust duration anytime.'
      ],
      bulletsAr: [
        'اضغط زر ▶ بدء مسابقة الـ 7 ساعات في الشريط العلوي.',
        'يتابع العداد الوقت المتبقي لحظة بلحظة مع التنبيهات.',
        'يمكنك إعادة الضبط أو تعديل الوقت في أي لحظة.'
      ]
    },
    {
      stepNum: 3,
      titleEn: 'Step 3: Execute Sequential Member Tasks',
      titleAr: 'الخطوة 3: تنفيذ المهام التسلسلية',
      icon: <CheckCircle size={24} color="var(--accent-purple)" />,
      descEn: 'Follow the protocol checklist inside your station to build the ML pipeline:',
      descAr: 'اتبع قائمة المهام البروتوكولية داخل محطتك لبناء أنبوب تعلم الآلة:',
      bulletsEn: [
        'Complete subtask steps sequentially and check off task checkboxes.',
        'Add observations & notes to task cards so teammates stay informed.',
        'Realtime progress bars will update across all 3 laptops via Supabase.'
      ],
      bulletsAr: [
        'نفذ المهام تسلسلياً واضغط على مربعات الاختيار.',
        'أضف ملاحظاتك ونتائجك على بطاقات المهام.',
        'تتحدث شاشات التقدم مباشرة عبر Supabase لدى جميع الأعضاء.'
      ]
    },
    {
      stepNum: 4,
      titleEn: 'Step 4: Log Machine Learning Experiments',
      titleAr: 'الخطوة 4: تسجيل تجارب تعلم الآلة',
      icon: <Database size={24} color="var(--accent-amber)" />,
      descEn: 'Track every ML experiment in the shared Experiment Table:',
      descAr: 'سجل كل تجربة في جدول التجارب المشترك:',
      bulletsEn: [
        'Click + LOG EXPERIMENT to record model family, hyperparameters, local 5-Fold CV score, public LB score, and runtime.',
        'Monitor the Score Tracker Chart to verify CV vs Public LB correlation.',
        'Detect overfitting early if local CV improves but Public LB drops!'
      ],
      bulletsAr: [
        'اضغط + تسجيل تجربة لإدخال نوع النموذج، المعلمات، ناتج CV، وناتجة لوحة الصدارة LB.',
        'راقب الرسم البياني لملاحظة التوافق بين CV و LB.',
        'اكتشف فرط التوافق مبكراً إذا ارتفع CV وهبط LB!'
      ]
    },
    {
      stepNum: 5,
      titleEn: 'Step 5: Consult Aura AI Analyst & AI Chat Assistant',
      titleAr: 'الخطوة 5: الاستعانة بالذكاء الاصطناعي Aura AI',
      icon: <Zap size={24} color="var(--accent-cyan)" />,
      descEn: 'Leverage frontier AI intelligence during the competition:',
      descAr: 'استخدم قدرات الذكاء الاصطناعي المتقدمة أثناء المسابقة:',
      bulletsEn: [
        'Use the bottom-right 💬 Live AI Assistant Chat to ask any question or ask for Python code.',
        'Click 🐍 Generate Python Baseline Code or 🧬 Generate Ensemble Code for instant code snippets.',
        'Review diagnostic scores (Velocity, Leakage Risk, Overfitting Risk, Model Diversity).'
      ],
      bulletsAr: [
        'استخدم زر الشات 💬 أسفل الشاشة لسؤال AI عن أي كود أو حالة.',
        'اضغط زر توليد الأكواد 🐍 لكتابة كود جاهز للنسخ.',
        'استعرض مؤشرات المخاطر والتنوع في المحلل.'
      ]
    },
    {
      stepNum: 6,
      titleEn: 'Step 6: Final Submission Clearance & Upload',
      titleAr: 'الخطوة 6: الاعتماد النهائي والتسليم',
      icon: <Award size={24} color="var(--accent-green)" />,
      descEn: 'Complete final verification before uploading submission files to Kaggle / IEEE:',
      descAr: 'أكمل الفحص النهائي قبل رفع الملف النهائي:',
      bulletsEn: [
        'Click 🏆 ENTER FINAL SUBMISSION MODE in Team HQ.',
        'Verify all 15 verification checklist items across Model, Data, Submission, Red Team (Dyaa), and Team Leader (Mohannad).',
        'When status turns 🟢 READY TO SUBMIT, upload your final CSV submission file!'
      ],
      bulletsAr: [
        'اضغط 🏆 وضع التسليم النهائي في مقر الفريق.',
        'أكمل اعتماد جميع البنود الـ 15 من مؤيد وضياء ومهند.',
        'عند ظهور 🟢 جاهز للتسليم، قم برفع ملف التسليم النهائي!'
      ]
    }
  ];

  const currentStepObj = steps[activeStep];

  return (
    <div className="modal-overlay" style={{ zIndex: 10000 }}>
      <div className="modal-content glass-panel" style={{ maxWidth: '680px', width: '90%', padding: '28px', borderTop: '4px solid var(--accent-cyan)' }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid var(--border-glass)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BookOpen size={24} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800' }}>
              {isAr ? '📖 دليل استخدام غرفة العمليات (خطوة بخطوة)' : '📖 War Room User Guide (Step-by-Step)'}
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Step Progress Dots */}
        <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
          {steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              style={{
                flexGrow: 1,
                height: '8px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                background: idx === activeStep
                  ? 'linear-gradient(90deg, #00F0FF, #7000FF)'
                  : idx < activeStep ? 'var(--accent-green)' : 'rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease'
              }}
              title={isAr ? s.titleAr : s.titleEn}
            />
          ))}
        </div>

        {/* Current Step Body Card */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid var(--border-cyan)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            {currentStepObj.icon}
            <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-main)' }}>
              {isAr ? currentStepObj.titleAr : currentStepObj.titleEn}
            </h4>
          </div>

          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
            {isAr ? currentStepObj.descAr : currentStepObj.descEn}
          </p>

          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {(isAr ? currentStepObj.bulletsAr : currentStepObj.bulletsEn).map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: 'var(--text-main)' }}>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Modal Navigation Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
            className="btn-secondary"
            disabled={activeStep === 0}
            style={{ opacity: activeStep === 0 ? 0.4 : 1, cursor: activeStep === 0 ? 'not-allowed' : 'pointer' }}
          >
            {isAr ? <ChevronRight size={16} /> : <ChevronLeft size={16} />} {isAr ? 'السابق' : 'Previous'}
          </button>

          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {activeStep + 1} / {steps.length}
          </span>

          {activeStep < steps.length - 1 ? (
            <button
              onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
              className="btn-primary"
            >
              {isAr ? 'التالي' : 'Next'} {isAr ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          ) : (
            <button onClick={onClose} className="btn-primary" style={{ background: 'linear-gradient(135deg, #10B981, #00F0FF)' }}>
              <CheckCircle size={16} /> {isAr ? 'فهمت الدليل - ابدأ الآن!' : 'Got it - Let\'s Win!'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
