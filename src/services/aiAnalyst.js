// 🤖 Aura Competition Analyst — High-Performance Bilingual Intelligence Engine

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

  // Task metrics per station
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

  // Find best experiment
  let bestExp = null;
  if (experiments.length > 0) {
    bestExp = [...experiments].sort((a, b) => {
      if (competition.metricDirection === 'lower') {
        return (a.cvScore || Infinity) - (b.cvScore || Infinity);
      }
      return (b.cvScore || -Infinity) - (a.cvScore || -Infinity);
    })[0];
  }

  // Active blockers
  const activeBlockers = blockers.filter(b => !b.resolved);
  const subsUsed = submissions.length;
  const subLimit = competition.submissionLimit || 10;
  const subsRemaining = Math.max(0, subLimit - subsUsed);

  if (isAr) {
    // ARABIC INTELLIGENCE ENGINE RESPONSES
    switch (queryType) {
      case 'ANALYZE_TEAM':
        return `## ⚡ حالة الفريق الشاملة

التقدم الإجمالي للفريق: **${overallPct}%** تم إنجازها عبر كافة المحطات.
- 👑 **مهند (قائد الفريق - النماذج)**: ${mohPct}% (${mohDone}/${mohTasks.length} مهام)
- 📊 **مؤيد (استخبارات البيانات)**: ${moaPct}% (${moaDone}/${moaTasks.length} مهام)
- 🛡️ **ضياء (الفريق الأحمر - الجودة)**: ${dyaPct}% (${dyaDone}/${dyaTasks.length} مهام)

أفضل نتيجة حتى الآن:
${bestExp ? `- **النموذج**: ${bestExp.model} (${bestExp.name})\n- **أفضل تقييم محلي CV**: ${bestExp.cvScore} ${bestExp.cvStd ? `(±${bestExp.cvStd})` : ''}\n- **درجة لوحة الصدارة LB**: ${bestExp.lbScore || 'في انتظار التسليم'}` : '- لم يتم تسجيل تجربة معتمدة بعد.'}

حصة التسليمات المستعملة: **${subsUsed} / ${subLimit}** (المتبقي: ${subsRemaining}).

---

## 🚨 تقييم المخاطر الحالية

${activeBlockers.length > 0 ? activeBlockers.map(b => `1. **عقبة [${b.severity}]**: ${b.title} (${b.owner}) — ${b.description}`).join('\n') : '1. ✅ لا توجد عقبات حرجة نشطة حالياً.'}
${subsRemaining <= 2 ? `2. ⚠️ **تحذير استهلاك التسليمات**: متبقي ${subsRemaining} تسليمات فقط اليوم!` : ''}
${!dyaTasks.find(t => t.id === 'dya_3')?.completed ? '3. ⚠️ **مخاطر التحقق**: ضياء لم يكمل فحص التسريب والاستراتيجية بعد.' : ''}
${experiments.length < 2 ? '4. ⚠️ **تنوع النماذج**: ينبغي تجربة أكثر من عائلة نموذج واحدة لتجهيز الـ Ensemble.' : ''}

---

## 🎯 خطة الإجراءات الثلاثة القادمة

1️⃣ **مهند** ← ${mohPct < 50 ? 'تأكيد خطة التقسيم CV وإطلاق نموذج البداية Baseline.' : 'دمج توقعات OOF بين CatBoost ونموذج ضياء البديل.'}

2️⃣ **مؤيد** ← ${moaPct < 80 ? 'إكمال تحليل انزياح البيانات بين التدريب والاختبار وتصدير الميزات.' : 'توليد ميزات النسبة والجمع المجموعاتي للتجربة القادمة.'}

3️⃣ **ضياء** ← ${!dyaTasks.find(t => t.id === 'dya_7')?.completed ? 'مراجعة كود التشفير والتأكد من عدم وجود تسريب داخل الطيات.' : 'بناء أنبوب اختبار لنموذج LightGBM بميزات مستقلة.'}

---

## 🧠 توصيات أدوات الذكاء الاصطناعي

استعمل:
- 🧠 **ChatGPT** ← التخطيط والاستراتيجية الرياضية وتحديد القيود.
- 🔵 **Gemini Pro** ← تحليل مستندات البيانات والانزياح.
- 🟠 **Claude** ← مراجعة الأكواد والتدقيق الأمني والفريق الأحمر.
- 💻 **Codex** ← بناء سكربتات التنفيذ السريعة.`;

      case 'WHAT_NEXT':
        return `## 🎯 خطة التنفيذ الفورية للفريق

المهمة الحالية: **"${competition.currentObjective || 'رفع تقييم CV المحتسب'}"**

---

## 🎯 الإجراءات الفورية

1️⃣ **مؤيد (البيانات)**: تسليم مصفوفة الميزات المستخرجة (النسب والمؤشرات) إلى مهند.

2️⃣ **مهند (القائد)**: تنفيذ التجربة EXP-00${experiments.length + 1} باستخدام 5-Fold Stratified CV.

3️⃣ **ضياء (الفريق الأحمر)**: إجراء فحص مستقل على سكربتات التحويل لمنع تسريب البيانات.`;

      case 'FIND_RISKS':
        return `## 🚨 تدقيق المخاطر الشامل

تم رصد **${activeBlockers.length} عقبة نشطة**:

${activeBlockers.length ? activeBlockers.map((b, i) => `${i + 1}. **[${b.severity}] ${b.title}**: ${b.description}`).join('\n') : '✅ صفر عقبات مبلاغ عنها.'}

### 🛡️ فحص التسريب والتحقق:
- **تسريب الطيات**: ${dyaTasks.find(t => t.id === 'dya_3')?.completed ? '✅ تم الفحص والاعتماد بواسطة ضياء' : '🔴 لم يتم الفحص بعد (مطلوب إجراء من ضياء)'}
- **تقرير البيانات**: ${reports.find(r => r.type === 'DATA_REPORT') ? '✅ تم تسليمه لمقر الفريق' : '🟡 في انتظار مؤيد'}
- **الفجوة بين CV و LB**: ${bestExp && bestExp.lbScore ? (Math.abs(bestExp.cvScore - bestExp.lbScore) > 0.03 ? '🔴 فجوة كبيرة تفوق 0.03! احتمال فرط التوافق Overfitting.' : '🟢 التقييم المحلي متوافق مع لوحة الصدارة.') : '⚪ في انتظار نتيجة LB لمعاينة الفجوة.'}`;

      case 'HOW_TO_IMPROVE':
        return `## 📈 استراتيجية تحسين النتيجة والارتقاء بالمرتبة

أفضل تقييم محلي حالي: **${bestExp ? bestExp.cvScore : 'غير محدد بعد'}**

---

## 🎯 4 محاور تحسين قوية

1️⃣ **التفاعلات النسبية**: إنشاء نسب متقدمة مثل \`feat_A / (feat_B + 1e-5)\` وتحويلات \`log1p\`.
2️⃣ **الترميز الفئوي**: تطبيق Target Encoding داخل طيات CV حصراً لمنع التسريب.
3️⃣ **ضبط المعلمات**: رفع \`n_estimators\` إلى 3000 مع Early Stopping عند 100 وتخفيض معدل التعلم.
4️⃣ **الدمج Ensemble**: تدريب نموذج XGBoost من قبل ضياء ودمج التوقعات مع CatBoost.`;

      case 'WORKLOAD_BALANCE':
        return `## ⚖️ تقرير توازن وحجم العمل للفريق

- 👑 **مهند**: ${mohPct}% إنجاز (${mohDone}/${mohTasks.length} مهام)
- 📊 **مؤيد**: ${moaPct}% إنجاز (${moaDone}/${moaTasks.length} مهام)
- 🛡️ **ضياء**: ${dyaPct}% إنجاز (${dyaDone}/${dyaTasks.length} مهام)

**التوصية**: ${dyaPct < mohPct ? 'إسناد مراجعة الأكواد وبناء نموذج الاختبار البديل مباشرة إلى ضياء لتسريع الإنجاز.' : 'التركيز على حلقة التجريب بين مؤيد ومهند.'}`;

      case 'SUGGEST_EXPERIMENT':
        return `## 🧪 مقترح التجربة القادمة ذات الأثر العالي

**رمز التجربة**: EXP-00${experiments.length + 1}
**النموذج**: CatBoostClassifier + LightGBM
**الفرضية**: دمج نسب مؤيد الهندسية مع معالجة CatBoost الفئوية لرفع الفئة F1 بمقدار +0.015.

---

## 📝 المواصفات الفنية

- **الميزات**: الميزات الخام + 14 نسبة هندسية + مؤشرات القيم المفقودة.
- **التقسيم**: 5-Fold StratifiedKFold (البذرة: 42).
- **الإجراء**: التشغيل على المحطة، تسجيل النتيجة، وطلب اعتماد ضياء قبل التسليم.`;

      case 'FINAL_SUBMISSION_REVIEW':
        return `## 🏆 تدقيق الجاهزية للتسليم النهائي

- **المهام الإجمالية**: ${overallPct}% منجزة
- **العقبات النشطة**: ${activeBlockers.length === 0 ? '🟢 لا توجد عقبات' : `🔴 يوجد ${activeBlockers.length} عقبات`}
- **النموذج المعتمد**: ${bestExp ? `✅ ${bestExp.model} (CV: ${bestExp.cvScore})` : '❌ لم يتم اختيار نموذج'}
- **اعتماد ضياء**: ${dyaTasks.find(t => t.id === 'dya_7')?.completed ? '🟢 تم اعتماد التسليم من قبل ضياء' : '🟡 في انتظار التدقيق النهائي من ضياء'}`;

      default:
        return generateAnalystResponse('ANALYZE_TEAM', state, 'ar');
    }
  }

  // ENGLISH RESPONSES (DEFAULT)
  switch (queryType) {
    case 'ANALYZE_TEAM':
      return `## ⚡ TEAM STATUS

Overall Team Progress: **${overallPct}%** completed across all stations.
- 👑 **Mohannad (Modeling)**: ${mohPct}% (${mohDone}/${mohTasks.length} tasks)
- 📊 **Moayad (Data)**: ${moaPct}% (${moaDone}/${moaTasks.length} tasks)
- 🛡️ **Dyaa (Red Team)**: ${dyaPct}% (${dyaDone}/${dyaTasks.length} tasks)

Current Best Result:
${bestExp ? `- **Model**: ${bestExp.model} (${bestExp.name})\n- **Best Local CV**: ${bestExp.cvScore} ${bestExp.cvStd ? `(±${bestExp.cvStd})` : ''}\n- **Public LB**: ${bestExp.lbScore || 'Pending'}` : '- No verified baseline logged yet.'}

Active Submissions Used: **${subsUsed} / ${subLimit}** (${subsRemaining} remaining).

---

## 🚨 RISKS

${activeBlockers.length > 0 ? activeBlockers.map(b => `1. **${b.severity} BLOCKER**: ${b.title} (${b.owner}) — ${b.description}`).join('\n') : '1. ✅ No active critical blockers logged right now.'}
${subsRemaining <= 2 ? `2. ⚠️ **Low Submissions Warning**: Only ${subsRemaining} submissions remaining today!` : ''}
${!dyaTasks.find(t => t.id === 'dya_3')?.completed ? '3. ⚠️ **Validation Risk**: Dyaa has not completed the Validation Strategy Attack yet.' : ''}

---

## 🎯 NEXT 3 ACTIONS

1️⃣ **Mohannad** → ${mohPct < 50 ? 'Complete validation scheme setup and establish first baseline.' : 'Test blending CatBoost OOF predictions with Dyaa alternative model.'}

2️⃣ **Moayad** → ${moaPct < 80 ? 'Finish train/test distribution shift analysis and export engineered features.' : 'Generate group-aggregated statistical features for the next experiment.'}

3️⃣ **Dyaa** → ${!dyaTasks.find(t => t.id === 'dya_7')?.completed ? 'Run full code audit for target leakage and stand by for Submission QA.' : 'Prepare alternative LightGBM model pipeline to cross-verify CatBoost findings.'}

---

## 🧠 AI TOOL RECOMMENDATION

Use:
- 🧠 **ChatGPT** → Overall modeling strategy & metric optimization logic.
- 🔵 **Gemini Pro** → Data distribution shift and EDA document analysis.
- 🟠 **Claude** → Code review, leakage verification & Red Team audit.
- 💻 **Codex** → Generating rapid notebook execution scripts.`;

    case 'WHAT_NEXT':
      return `## 🎯 IMMEDIATE TEAM ACTION PLAN

Current Objective: **"${competition.currentObjective || 'Maximize Local CV'}"**

---

## 🎯 NEXT 3 ACTIONS

1️⃣ **Moayad (Data)**: Export approved feature matrix and deliver to Mohannad.

2️⃣ **Mohannad (Lead)**: Execute Experiment EXP-00${experiments.length + 1} incorporating new features using 5-Fold Stratified CV.

3️⃣ **Dyaa (Red Team)**: Conduct parallel code review on feature generation scripts to ensure zero test-data leakage.`;

    case 'FIND_RISKS':
      return `## 🚨 COMPREHENSIVE RISK AUDIT

Found **${activeBlockers.length} Active Blocker(s)** & potential validation threats:

${activeBlockers.length ? activeBlockers.map((b, i) => `${i + 1}. **[${b.severity}] ${b.title}**: ${b.description}`).join('\n') : '✅ Zero blocking issues reported.'}

### 🛡️ Validation & Leakage Check:
- **Group Leakage**: ${dyaTasks.find(t => t.id === 'dya_3')?.completed ? '✅ Verified by Dyaa' : '🔴 NOT VERIFIED YET (Action required by Dyaa)'}
- **Data Report**: ${reports.find(r => r.type === 'DATA_REPORT') ? '✅ Delivered to Team HQ' : '🟡 Pending from Moayad'}`;

    case 'HOW_TO_IMPROVE':
      return `## 📈 CV & LEADERBOARD BOOSTING STRATEGY

Current Best CV: **${bestExp ? bestExp.cvScore : 'N/A'}**

---

## 🎯 4 STRATEGIC BOOSTS

1️⃣ **Feature Interactions**: Combine top correlated features into ratios (\`feat_A / (feat_B + 1e-5)\`) and log1p transforms.
2️⃣ **Categorical Encoding**: Apply Target Encoding inside CV loop or Out-Of-Fold Frequency Encoding.
3️⃣ **Hyperparameter Tuning**: Increase \`n_estimators\` to 3000 with early stopping rounds = 100 and lower learning rate.
4️⃣ **Model Diversity & Blending**: Train an XGBoost / ExtraTrees model (Dyaa) and blend OOF predictions.`;

    case 'WORKLOAD_BALANCE':
      return `## ⚖️ TEAM WORKLOAD & VELOCITY REPORT

- 👑 **Mohannad**: ${mohPct}% completion (${mohDone}/${mohTasks.length} tasks)
- 📊 **Moayad**: ${moaPct}% completion (${moaDone}/${moaTasks.length} tasks)
- 🛡️ **Dyaa**: ${dyaPct}% completion (${dyaDone}/${dyaTasks.length} tasks)

**Velocity Summary**: ${moaPct >= mohPct ? 'Data pipeline is ahead of modeling. Modeling team has sufficient feature assets.' : 'Data engineering is bottlenecking modeling. Prioritize Moayad feature delivery.'}`;

    case 'SUGGEST_EXPERIMENT':
      return `## 🧪 NEXT HIGH-LEVERAGE EXPERIMENT PROPOSAL

**Experiment Code**: EXP-00${experiments.length + 1}
**Target Model**: CatBoostClassifier + LightGBM Ensemble
**Hypothesis**: Combining Moayad's interaction ratios with CatBoost categorical handling will boost performance.`;

    case 'FINAL_SUBMISSION_REVIEW':
      return `## 🏆 FINAL SUBMISSION READINESS AUDIT

- **Tasks Completed**: ${overallPct}% (${tasks.filter(t => t.completed).length}/${tasks.length})
- **Active Blockers**: ${activeBlockers.length === 0 ? '🟢 ZERO BLOCKERS' : `🔴 ${activeBlockers.length} UNRESOLVED BLOCKERS`}
- **Best Model Verified**: ${bestExp ? `✅ ${bestExp.model} (CV: ${bestExp.cvScore})` : '❌ NO MODEL LOGGED'}`;

    default:
      return generateAnalystResponse('ANALYZE_TEAM', state, 'en');
  }
}
