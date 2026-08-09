// 🤖 Aura Competition Analyst — Elite Kaggle Grandmaster Intelligence Engine

export function buildGrandmasterContext(state, lang = 'en') {
  const {
    competition = {},
    tasks = [],
    experiments = [],
    submissions = [],
    blockers = [],
    notes = [],
    reports = []
  } = state;

  const isAr = lang === 'ar';

  const mohTasks = tasks.filter(t => t.memberId === 'mohannad');
  const moaTasks = tasks.filter(t => t.memberId === 'moayad');
  const dyaTasks = tasks.filter(t => t.memberId === 'dyaa');

  const mohDone = mohTasks.filter(t => t.completed).length;
  const moaDone = moaTasks.filter(t => t.completed).length;
  const dyaDone = dyaTasks.filter(t => t.completed).length;

  const completedTasks = tasks.filter(t => t.completed).map(t => `${t.memberId}: ${t.title}`);
  const pendingTasks = tasks.filter(t => !t.completed).map(t => `${t.memberId}: ${t.title}`);

  const activeBlockers = blockers.filter(b => !b.resolved);
  const bestExp = [...experiments].sort((a, b) => (b.cvScore || 0) - (a.cvScore || 0))[0];

  return `
SYSTEM PERSONA:
You are "Aura AI", a Senior Machine Learning Competition Strategist and Kaggle Grandmaster Analyst working as the 4th teammate inside NextAura AI Competition War Room for an IEEE Machine Learning Competition.

THE HUMAN TEAM:
- Mohannad (👑 Team Leader & Modeling Strategist)
- Moayad (📊 Data Intelligence & Feature Engineer)
- Dyaa (🛡️ Red Team & Quality Assurance Officer)

CURRENT COMPETITION TELEMETRY:
- Competition Name: ${competition.name}
- Evaluation Metric: ${competition.metric} (Direction: ${competition.metricDirection || 'higher is better'})
- Submission Limit: ${submissions.length} / ${competition.submissionLimit || 10} used
- Current Team Mission: "${competition.currentObjective}"
- Next Action: "${competition.nextAction}"

COMPLETED TASKS (${completedTasks.length}/${tasks.length}):
${completedTasks.length > 0 ? completedTasks.join('\n') : 'None yet.'}

PENDING TASKS (${pendingTasks.length}/${tasks.length}):
${pendingTasks.length > 0 ? pendingTasks.join('\n') : 'All tasks completed!'}

LOGGED EXPERIMENTS (${experiments.length}):
${experiments.length > 0 ? JSON.stringify(experiments, null, 2) : 'No experiments logged yet.'}

ACTIVE BLOCKERS (${activeBlockers.length}):
${activeBlockers.length > 0 ? JSON.stringify(activeBlockers, null, 2) : 'Zero active blockers.'}

SUBMITTED DATA/RISK REPORTS (${reports.length}):
${reports.length > 0 ? JSON.stringify(reports, null, 2) : 'No reports submitted yet.'}

INSTRUCTIONS:
1. Provide hyper-specific, elite Machine Learning competition advice.
2. DO NOT output generic high-level fluff like "do data cleaning". Be extremely technical (e.g. suggest exact cross-validation schemes like 5-Fold StratifiedKFold, target-encoding inside folds, GBDT hyperparameters, rank blending, feature ratios).
3. Always respond in the language specified: ${isAr ? 'ARABIC (العربية)' : 'ENGLISH'}.
4. Use clean GitHub markdown formatting with headings (## ⚡ TEAM STATUS, ## 🚨 RISKS, ## 🎯 NEXT 3 ACTIONS, ## 🧬 ENSEMBLE/MODELING ADVICE).
`;
}

export async function queryFrontierAI({ queryType, prompt, state, lang = 'en', apiKey = '', selectedModel = 'gemini-1.5-pro' }) {
  const systemContext = buildGrandmasterContext(state, lang);

  // If user provided a Gemini API Key, call Gemini 1.5/2.5 Pro API directly
  if (apiKey && apiKey.trim().length > 10) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey.trim()}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${systemContext}\n\nUSER ACTION/QUESTION: ${prompt || queryType}`
            }]
          }]
        })
      });

      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      }
    } catch (err) {
      console.error('Frontier AI API Error:', err);
    }
  }

  // Fallback to internal Grandmaster Heuristic Engine
  return generateAnalystResponse(queryType, state, lang);
}

export function generateAnalystResponse(queryType, state, lang = 'en') {
  const isAr = lang === 'ar';
  const {
    competition = {},
    tasks = [],
    experiments = [],
    submissions = [],
    blockers = [],
    notes = [],
    reports = []
  } = state;

  const mohTasks = tasks.filter(t => t.memberId === 'mohannad');
  const moaTasks = tasks.filter(t => t.memberId === 'moayad');
  const dyaTasks = tasks.filter(t => t.memberId === 'dyaa');

  const mohDone = mohTasks.filter(t => t.completed).length;
  const moaDone = moaTasks.filter(t => t.completed).length;
  const dyaDone = dyaTasks.filter(t => t.completed).length;

  const mohPct = mohTasks.length ? Math.round((mohDone / mohTasks.length) * 100) : 0;
  const moaPct = moaTasks.length ? Math.round((moaDone / moaTasks.length) * 100) : 0;
  const dyaPct = dyaTasks.length ? Math.round((dyaDone / dyaTasks.length) * 100) : 0;
  const overallPct = tasks.length ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0;

  let bestExp = null;
  if (experiments.length > 0) {
    bestExp = [...experiments].sort((a, b) => (b.cvScore || 0) - (a.cvScore || 0))[0];
  }

  const activeBlockers = blockers.filter(b => !b.resolved);
  const subsUsed = submissions.length;
  const subLimit = competition.submissionLimit || 10;
  const subsRemaining = Math.max(0, subLimit - subsUsed);

  if (isAr) {
    switch (queryType) {
      case 'ANALYZE_TEAM':
        return `## ⚡ حالة الفريق والتحليل الذكي اللحظي

نسبة الإنجاز الكلية: **${overallPct}%** عبر المحطات الثلاث.
- 👑 **مهند (بناء النماذج)**: ${mohPct}% (${mohDone}/${mohTasks.length} مهام)
- 📊 **مؤيد (استخبارات البيانات)**: ${moaPct}% (${moaDone}/${moaTasks.length} مهام)
- 🛡️ **ضياء (الفريق الأحمر وضبط الجودة)**: ${dyaPct}% (${dyaDone}/${dyaTasks.length} مهام)

تحليل النماذج والنتائج:
${bestExp ? `- **أفضل نموذج حالي**: ${bestExp.model} (${bestExp.name})\n- **درجة التقييم المحلي (CV)**: ${bestExp.cvScore}\n- **لوحة الصدارة (LB)**: ${bestExp.lbScore || 'في انتظار التسليم'}` : '- لم يتم تسجيل أي تجربة محتسبة بعد. يجب على مهند إطلاق نموذج البداية.'}

حصة التسليمات: **${subsUsed} / ${subLimit}** (المتبقي: ${subsRemaining}).

---

## 🚨 تقييم المخاطر وتغييرات التوزيع

${activeBlockers.length > 0 ? activeBlockers.map(b => `1. **عقبة [${b.severity}]**: ${b.title} (${b.owner}) — ${b.description}`).join('\n') : '1. ✅ لا توجد عقبات حرجة نشطة حتى الآن.'}
${subsRemaining <= 2 ? `2. ⚠️ **حظر التسليم العشوائي**: متبقي ${subsRemaining} تسليمات فقط! يجب الحصول على موافقة ضياء.` : ''}
${experiments.length === 0 ? '3. ⚠️ **غياب النقطة المرجعية Baseline**: يجب إطلاق أول نموذج والتحقق من أنبوب التسليم.' : ''}

---

## 🎯 الإجراءات الاستراتيجية الـ 3 القادمة

1️⃣ **مهند** ← ${mohPct < 40 ? 'قراءة الشروط وتأكيد دالة التقييم الفعالة مع إطلاق أول Baseline.' : 'بدء تجربة عائلة GBDT ثانية (LightGBM) للمقارنة مع CatBoost.'}

2️⃣ **مؤيد** ← ${moaPct < 60 ? 'فحص جودة البيانات وحساب نسبة القيم المفقودة والتكرار.' : 'استخراج ميزات التفاعل والنسب النسبية (Ratios) وإرسال التقرير.'}

3️⃣ **ضياء** ← ${!dyaTasks.find(t => t.id === 'dya_3')?.completed ? 'فحص كود التقسيم للتأكد من عدم وجود تسريب للمعلومات بين الطيات.' : 'بناء أنبوب نموذج بديل مستقل لدمج التوقعات.'}

---

## 🧠 توصيات أدوات الذكاء الاصطناعي الخاصة بالمهمة

- 🧠 **ChatGPT** ← اختيار دوال الخسارة المخصصة (Custom Objective) وحساب الفئات.
- 🔵 **Gemini Pro** ← فحص توزيعات الميزات واكتشاف انزياح البيانات.
- 🟠 **Claude** ← مراجعة الكود والتحقق من حظر تسريب التقييم Target Leakage.`;

      case 'WHAT_NEXT':
        return `## 🎯 خطة الإجراء الفورية للفريق

الهدف الحالي: **"${competition.currentObjective}"**

---

## 🎯 الإجراءات الموصى بها الآن

1️⃣ **مؤيد**: إكمال فحص تسريب البيانات وتصدير ملف الميزات الهندسية الأولى.
2️⃣ **مهند**: بناء تقييم 5-Fold StratifiedKFold وتسجيل نتيجة أول تجربة EXP-001.
3️⃣ **ضياء**: اختبار كود المعالجة المسبقة للتأكد من تنفيذ التجهيز داخل كل طية (Inside-Fold Fit).`;

      case 'FIND_RISKS':
        return `## 🚨 تدقيق المخاطر والأنومالي

- **عدد العقبات النشطة**: ${activeBlockers.length}
- **فحص تسريب الطيات**: ${dyaTasks.find(t => t.id === 'dya_3')?.completed ? '✅ معتمد من ضياء' : '🔴 لم يتم اعتماده بعد (مخاطرة عالية)'}
- **تقرير البيانات**: ${reports.find(r => r.type === 'DATA_REPORT') ? '✅ مكتمل' : '🟡 قيد الإعداد بواسطة مؤيد'}

**التوصية الفنية**: لا تقم بأي تسليم للوحة الصدارة العامة قبل اعتماد ضياء ومطابقة الأبعاد والأنواع.`;

      case 'ENSEMBLE_GEN':
        return `## 🧬 استراتيجية دمج النماذج (Ensemble & Blending)

توصية الكراندماستر:
1. **النماذج المطلوبة**: CatBoost + LightGBM + XGBoost + ExtraTrees.
2. **طريقة الدمج**: Rank Averaging أو Scipy Minimize على توقعات OOF.
3. **التنوع**: استخدام تمثيلات ميزات مختلفة لكل نموذج لتقليل الارتباط (Correlation < 0.85).`;

      case 'HOW_TO_IMPROVE':
        return `## 📈 خطة رفع النتائج وتجاوز المنافسين

1️⃣ **الهندسة النسبية**: إنشاء ميزات تمثل الفروق والنسب بين الميزات الأعلى أهمية.
2️⃣ **الترميز المستهدف (Target Encoding)**: تطبيقه حصرياً داخل طيات التدريب مع إضافة ضوضاء خفيفة Smoothing.
3️⃣ **تحسين التوافق**: رفع عدد الأشجار وتصغير التعلم \`learning_rate=0.015\`.`;

      default:
        return generateAnalystResponse('ANALYZE_TEAM', state, 'ar');
    }
  }

  // ENGLISH GRANDMASTER ENGINE RESPONSES
  switch (queryType) {
    case 'ANALYZE_TEAM':
      return `## ⚡ REAL-TIME TEAM TELEMETRY ANALYSIS

Overall Progress: **${overallPct}%** completed across all stations.
- 👑 **Mohannad (Modeling)**: ${mohPct}% (${mohDone}/${mohTasks.length} tasks)
- 📊 **Moayad (Data)**: ${moaPct}% (${moaDone}/${moaTasks.length} tasks)
- 🛡️ **Dyaa (Red Team)**: ${dyaPct}% (${dyaDone}/${dyaTasks.length} tasks)

Modeling Benchmark:
${bestExp ? `- **Current Best Model**: ${bestExp.model} (${bestExp.name})\n- **Best Local CV**: ${bestExp.cvScore}\n- **Public LB**: ${bestExp.lbScore || 'Awaiting submission'}` : '- No verified baseline logged yet. Mohannad must build and run Experiment EXP-001.'}

Submission Quota: **${subsUsed} / ${subLimit}** (${subsRemaining} remaining).

---

## 🚨 RISK AUDIT & VALIDATION ANALYSIS

${activeBlockers.length > 0 ? activeBlockers.map(b => `1. **[${b.severity}] BLOCKER**: ${b.title} (${b.owner}) — ${b.description}`).join('\n') : '1. ✅ Zero critical pipeline blockers reported.'}
${subsRemaining <= 2 ? `2. ⚠️ **Low Submissions Alert**: Only ${subsRemaining} submissions remaining today!` : ''}
${experiments.length === 0 ? '3. ⚠️ **Baseline Missing**: Create simplest end-to-end pipeline before adding feature complexity.' : ''}

---

## 🎯 NEXT 3 STRATEGIC ACTIONS

1️⃣ **Mohannad** → ${mohPct < 40 ? 'Read challenge rules and establish 5-Fold Stratified CV baseline.' : 'Train a second GBDT architecture (LightGBM) for model diversity.'}

2️⃣ **Moayad** → ${moaPct < 60 ? 'Run leakage audit and train/test distribution shift analysis.' : 'Generate group statistics & domain ratio features.'}

3️⃣ **Dyaa** → ${!dyaTasks.find(t => t.id === 'dya_3')?.completed ? 'Audit preprocessor code to ensure zero target encoding leakage across folds.' : 'Build independent XGBoost pipeline for ensembling.'}

---

## 🧠 AI TOOL ASSIGNMENTS

- 🧠 **ChatGPT** → Multi-class loss function tuning & metric formulation.
- 🔵 **Gemini Pro** → Data distribution shift analysis & document inspection.
- 🟠 **Claude** → Code review & Red Team validation attack.`;

    case 'WHAT_NEXT':
      return `## 🎯 IMMEDIATE ACTION PLAN

Current Objective: **"${competition.currentObjective}"**

1️⃣ **Moayad**: Complete leakage investigation & deliver initial feature matrix.
2️⃣ **Mohannad**: Build baseline model & log Experiment EXP-001 with 5-Fold CV.
3️⃣ **Dyaa**: Verify local metric logic against scikit-learn standard.`;

    case 'FIND_RISKS':
      return `## 🚨 RISK AUDIT & ANOMALY SCAN

- **Active Blockers**: ${activeBlockers.length}
- **Fold Leakage Verification**: ${dyaTasks.find(t => t.id === 'dya_3')?.completed ? '✅ Verified by Dyaa' : '🔴 PENDING (High risk)'}
- **Data Report**: ${reports.find(r => r.type === 'DATA_REPORT') ? '✅ Submitted' : '🟡 Pending from Moayad'}`;

    case 'ENSEMBLE_GEN':
      return `## 🧬 MODEL ENSEMBLE & BLENDING STRATEGY

Grandmaster Recommendations:
1. **Model Diversity**: Combine CatBoost + LightGBM + XGBoost + ExtraTrees.
2. **Blending Scheme**: Use rank averaging or Nelder-Mead optimization on OOF predictions.
3. **Correlation Limit**: Keep pairwise OOF correlation < 0.85 for optimal ensemble gain.`;

    default:
      return generateAnalystResponse('ANALYZE_TEAM', state, 'en');
  }
}
