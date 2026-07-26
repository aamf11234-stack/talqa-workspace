import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Globe, Wallet, Zap, CheckCircle2, ArrowLeft, RotateCcw, MessageCircle } from 'lucide-react';

const WHATSAPP_BASE = "https://wa.me/966551378531?text=";

/* ── Data ──────────────────────────────────────────────── */
const projectTypes = [
  {
    id: 'app',
    icon: Smartphone,
    title: 'تطبيق جوال',
    sub: 'iOS & Android',
    baseMin: 8000,
    baseMax: 22000,
    baseWeeksMin: 6,
    baseWeeksMax: 12,
  },
  {
    id: 'web',
    icon: Globe,
    title: 'موقع / لوحة تحكم',
    sub: 'Web Platform',
    baseMin: 5000,
    baseMax: 15000,
    baseWeeksMin: 4,
    baseWeeksMax: 8,
  },
  {
    id: 'wallet',
    icon: Wallet,
    title: 'Apple Wallet',
    sub: 'بطاقة ولاء رقمية',
    baseMin: 3000,
    baseMax: 8000,
    baseWeeksMin: 2,
    baseWeeksMax: 4,
  },
  {
    id: 'custom',
    icon: Zap,
    title: 'حل مخصص / API',
    sub: 'Automation & Integration',
    baseMin: 6000,
    baseMax: 20000,
    baseWeeksMin: 4,
    baseWeeksMax: 10,
  },
];

const addons = [
  { id: 'dashboard', label: 'لوحة تحكم مع تقارير', addMin: 2000, addMax: 4000, addWeeks: 2 },
  { id: 'loyalty', label: 'نظام نقاط وولاء', addMin: 2500, addMax: 5000, addWeeks: 2 },
  { id: 'whatsapp', label: 'تكامل واتساب ذكي', addMin: 1000, addMax: 2500, addWeeks: 1 },
  { id: 'booking', label: 'نظام حجوزات متكامل', addMin: 2000, addMax: 4500, addWeeks: 2 },
  { id: 'analytics', label: 'تحليلات وإحصائيات', addMin: 1200, addMax: 2500, addWeeks: 1 },
  { id: 'multilang', label: 'دعم متعدد اللغات', addMin: 800, addMax: 1800, addWeeks: 1 },
];

/* ── Helpers ────────────────────────────────────────────── */
function formatSAR(n: number) {
  return n.toLocaleString('ar-SA') + ' ر.س';
}

/* ── Step components ────────────────────────────────────── */
function StepDot({ active, done, num }: { active: boolean; done: boolean; num: number }) {
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 shrink-0"
      style={{
        background: done ? '#C5A880' : active ? '#1A1A18' : '#F4F1EB',
        color: done || active ? '#FFFFFF' : '#7A7060',
        boxShadow: active ? '0 0 0 4px rgba(197,168,128,0.2)' : 'none',
      }}
    >
      {done ? <CheckCircle2 size={18} /> : num}
    </div>
  );
}

/* ── Main Calculator ─────────────────────────────────────── */
export default function Calculator() {
  const [step, setStep] = useState(0); // 0=type, 1=addons, 2=result
  const [typeId, setTypeId] = useState<string | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const selectedType = projectTypes.find(p => p.id === typeId);

  function toggleAddon(id: string) {
    setSelectedAddons(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  }

  function calcEstimate() {
    if (!selectedType) return { min: 0, max: 0, weeksMin: 0, weeksMax: 0 };
    const chosenAddons = addons.filter(a => selectedAddons.includes(a.id));
    const addMin = chosenAddons.reduce((s, a) => s + a.addMin, 0);
    const addMax = chosenAddons.reduce((s, a) => s + a.addMax, 0);
    const addW = chosenAddons.reduce((s, a) => s + a.addWeeks, 0);
    return {
      min: selectedType.baseMin + addMin,
      max: selectedType.baseMax + addMax,
      weeksMin: selectedType.baseWeeksMin + addW,
      weeksMax: selectedType.baseWeeksMax + addW,
    };
  }

  function buildWhatsApp() {
    if (!selectedType) return WHATSAPP_BASE;
    const est = calcEstimate();
    const chosenLabels = addons.filter(a => selectedAddons.includes(a.id)).map(a => a.label);
    const msg = `السلام عليكم، أريد معرفة تفاصيل مشروع:\n\nالنوع: ${selectedType.title}\nالإضافات: ${chosenLabels.length ? chosenLabels.join('، ') : 'لا توجد'}\nالميزانية المتوقعة: ${formatSAR(est.min)} — ${formatSAR(est.max)}\nالمدة المتوقعة: ${est.weeksMin}–${est.weeksMax} أسبوع\n\nأرجو التواصل لمناقشة التفاصيل.`;
    return WHATSAPP_BASE + encodeURIComponent(msg);
  }

  function reset() {
    setStep(0);
    setTypeId(null);
    setSelectedAddons([]);
  }

  const est = calcEstimate();

  return (
    <section
      id="calculator"
      className="py-32 relative"
      style={{ background: '#F4F1EB' }}
    >
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: '#EAE6DF' }} />
      <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: '#EAE6DF' }} />

      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-bold tracking-widest uppercase mb-4"
            style={{ color: '#C5A880' }}
          >
            احسب مشروعك
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-black leading-tight"
            style={{ color: '#1A1A18' }}
          >
            كم يكلف مشروعك؟
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base mt-4 font-medium"
            style={{ color: '#7A7060' }}
          >
            أداة تفاعلية للحصول على تقدير أولي خلال ثوانٍ.
          </motion.p>
        </div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            {['اختر النوع', 'الإضافات', 'التقدير'].map((label, i) => (
              <div key={i} className="flex items-center gap-2 flex-1 min-w-0">
                <StepDot active={step === i} done={step > i} num={i + 1} />
                <span
                  className="text-xs font-bold truncate"
                  style={{ color: step >= i ? '#1A1A18' : '#B0A898' }}
                >
                  {label}
                </span>
                {i < 2 && (
                  <div
                    className="flex-1 h-0.5 rounded-full min-w-[12px] transition-all duration-500"
                    style={{ background: step > i ? '#C5A880' : '#EAE6DF' }}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl border p-8"
          style={{ background: '#FFFFFF', borderColor: '#EAE6DF', boxShadow: '0 8px 40px rgba(26,26,24,0.06)' }}
        >
          <AnimatePresence mode="wait">
            {/* ── Step 0: choose type ── */}
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-black mb-6" style={{ color: '#1A1A18' }}>
                  ما نوع المشروع الذي تريد بناءه؟
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {projectTypes.map(pt => {
                    const selected = typeId === pt.id;
                    return (
                      <button
                        key={pt.id}
                        onClick={() => setTypeId(pt.id)}
                        className="flex items-center gap-4 p-5 rounded-2xl border text-right transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                          background: selected ? 'rgba(197,168,128,0.08)' : '#FAFAF8',
                          borderColor: selected ? '#C5A880' : '#EAE6DF',
                          boxShadow: selected ? '0 0 0 2px rgba(197,168,128,0.25)' : 'none',
                        }}
                      >
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                          style={{
                            background: selected ? '#C5A880' : '#F4F1EB',
                            color: selected ? '#FFFFFF' : '#7A7060',
                          }}
                        >
                          <pt.icon size={22} strokeWidth={1.5} />
                        </div>
                        <div className="leading-tight min-w-0">
                          <div className="font-black text-base" style={{ color: '#1A1A18' }}>{pt.title}</div>
                          <div className="text-xs font-medium mt-0.5" style={{ color: '#7A7060' }}>{pt.sub}</div>
                        </div>
                        {selected && (
                          <CheckCircle2
                            size={18}
                            className="mr-auto shrink-0"
                            style={{ color: '#C5A880' }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-start">
                  <button
                    disabled={!typeId}
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                    style={{ background: typeId ? 'linear-gradient(135deg, #C5A880, #A8895E)' : '#D0C8BE' }}
                  >
                    التالي — اختر الإضافات
                    <ArrowLeft size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Step 1: addons ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-black mb-2" style={{ color: '#1A1A18' }}>
                  أي الإضافات تريد تضمينها؟
                </h3>
                <p className="text-sm mb-7" style={{ color: '#7A7060' }}>
                  اختر ما يلزمك — يمكنك تخطي هذه الخطوة إذا كنت تريد الأساسي فقط.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {addons.map(a => {
                    const on = selectedAddons.includes(a.id);
                    return (
                      <button
                        key={a.id}
                        onClick={() => toggleAddon(a.id)}
                        className="flex items-center gap-3 px-5 py-4 rounded-2xl border text-right transition-all duration-200 hover:scale-[1.01]"
                        style={{
                          background: on ? 'rgba(197,168,128,0.08)' : '#FAFAF8',
                          borderColor: on ? '#C5A880' : '#EAE6DF',
                        }}
                      >
                        <div
                          className="w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all"
                          style={{
                            borderColor: on ? '#C5A880' : '#D0C8BE',
                            background: on ? '#C5A880' : 'transparent',
                          }}
                        >
                          {on && <CheckCircle2 size={12} color="#FFFFFF" />}
                        </div>
                        <span className="text-sm font-bold" style={{ color: '#1A1A18' }}>{a.label}</span>
                        <span className="mr-auto text-xs font-medium shrink-0" style={{ color: '#7A7060' }}>
                          +{formatSAR(a.addMin)}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setStep(0)}
                    className="text-sm font-bold underline underline-offset-4"
                    style={{ color: '#7A7060' }}
                  >
                    السابق
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold text-white transition-all hover:scale-105 active:scale-95"
                    style={{ background: 'linear-gradient(135deg, #C5A880, #A8895E)' }}
                  >
                    احسب التقدير
                    <ArrowLeft size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Step 2: result ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
              >
                <div className="text-center mb-10">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                    className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-5"
                    style={{ background: 'rgba(197,168,128,0.15)' }}
                  >
                    <CheckCircle2 size={32} style={{ color: '#C5A880' }} />
                  </motion.div>
                  <h3 className="text-xl font-black mb-2" style={{ color: '#1A1A18' }}>التقدير الأولي لمشروعك</h3>
                  <p className="text-sm" style={{ color: '#7A7060' }}>
                    {selectedType?.title} {selectedAddons.length > 0 ? `+ ${selectedAddons.length} إضافات` : ''}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {/* Budget */}
                  <div
                    className="rounded-2xl p-6 text-center"
                    style={{ background: 'rgba(197,168,128,0.08)', border: '1px solid rgba(197,168,128,0.2)' }}
                  >
                    <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#A8895E' }}>
                      الميزانية المتوقعة
                    </div>
                    <div className="text-2xl font-black leading-tight" style={{ color: '#1A1A18' }}>
                      {formatSAR(est.min)}
                    </div>
                    <div className="text-sm font-medium mt-1" style={{ color: '#7A7060' }}>
                      إلى {formatSAR(est.max)}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div
                    className="rounded-2xl p-6 text-center"
                    style={{ background: '#F4F1EB', border: '1px solid #EAE6DF' }}
                  >
                    <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#7A7060' }}>
                      مدة التنفيذ
                    </div>
                    <div className="text-2xl font-black leading-tight" style={{ color: '#1A1A18' }}>
                      {est.weeksMin}–{est.weeksMax}
                    </div>
                    <div className="text-sm font-medium mt-1" style={{ color: '#7A7060' }}>أسبوع تقريباً</div>
                  </div>
                </div>

                <div
                  className="rounded-2xl p-4 mb-8 text-sm font-medium"
                  style={{ background: '#FBF9F5', border: '1px solid #EAE6DF', color: '#7A7060' }}
                >
                  ⚠️ هذا تقدير أولي للتخطيط فقط. السعر النهائي يُحدَّد بعد مناقشة متطلبات مشروعك بالتفصيل.
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={buildWhatsApp()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2.5 py-4 rounded-2xl text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-md"
                    style={{ background: '#25D366', boxShadow: '0 6px 24px rgba(37,211,102,0.3)' }}
                  >
                    <MessageCircle size={18} />
                    أرسل تفاصيل مشروعك عبر واتساب
                  </a>
                  <button
                    onClick={reset}
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-sm font-bold border transition-all hover:scale-105 active:scale-95"
                    style={{ borderColor: '#EAE6DF', color: '#7A7060', background: '#FFFFFF' }}
                  >
                    <RotateCcw size={15} />
                    ابدأ من جديد
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
