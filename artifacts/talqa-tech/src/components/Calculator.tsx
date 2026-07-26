import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Globe, Wallet, Zap, CheckCircle2, RotateCcw, MessageCircle, ChevronLeft } from 'lucide-react';

const WA = 'https://wa.me/966551378531?text=';

const types = [
  { id: 'app',    Icon: Smartphone, title: 'تطبيق جوال',        sub: 'iOS & Android',      minP: 8000,  maxP: 22000, minW: 6,  maxW: 12, color: '#8B5CF6', emoji: '📱' },
  { id: 'web',    Icon: Globe,      title: 'موقع / لوحة تحكم',  sub: 'Web Platform',        minP: 5000,  maxP: 15000, minW: 4,  maxW: 8,  color: '#3B82F6', emoji: '🌐' },
  { id: 'wallet', Icon: Wallet,     title: 'Apple Wallet',       sub: 'بطاقة ولاء رقمية',  minP: 3000,  maxP: 8000,  minW: 2,  maxW: 4,  color: '#06B6D4', emoji: '💳' },
  { id: 'custom', Icon: Zap,        title: 'حل مخصص / API',     sub: 'Automation',          minP: 6000,  maxP: 20000, minW: 4,  maxW: 10, color: '#EC4899', emoji: '⚡' },
];

const addons = [
  { id: 'dash',      label: 'لوحة تحكم + تقارير',  aMin: 2000, aMax: 4000, aW: 2, color: '#8B5CF6' },
  { id: 'loyalty',   label: 'نظام نقاط وولاء',      aMin: 2500, aMax: 5000, aW: 2, color: '#F59E0B' },
  { id: 'wa',        label: 'تكامل واتساب',          aMin: 1000, aMax: 2500, aW: 1, color: '#25D366' },
  { id: 'booking',   label: 'نظام حجوزات',           aMin: 2000, aMax: 4500, aW: 2, color: '#10B981' },
  { id: 'analytics', label: 'تحليلات وإحصائيات',    aMin: 1200, aMax: 2500, aW: 1, color: '#3B82F6' },
  { id: 'mlang',     label: 'دعم متعدد اللغات',      aMin: 800,  aMax: 1800, aW: 1, color: '#EC4899' },
];

const sar = (n: number) => n.toLocaleString('ar-SA') + ' ر.س';

export default function Calculator() {
  const [step, setStep] = useState(0);
  const [tid,  setTid]  = useState<string | null>(null);
  const [aids, setAids] = useState<string[]>([]);

  const t = types.find(x => x.id === tid);
  const toggle = (id: string) => setAids(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const calc = () => {
    if (!t) return { min: 0, max: 0, wMin: 0, wMax: 0 };
    const ch = addons.filter(a => aids.includes(a.id));
    return { min: t.minP + ch.reduce((s,a)=>s+a.aMin,0), max: t.maxP + ch.reduce((s,a)=>s+a.aMax,0), wMin: t.minW + ch.reduce((s,a)=>s+a.aW,0), wMax: t.maxW + ch.reduce((s,a)=>s+a.aW,0) };
  };

  const e = calc();
  const waMsg = () => {
    const ch = addons.filter(a => aids.includes(a.id)).map(a => a.label);
    return encodeURIComponent(`السلام عليكم، أريد مناقشة مشروع:\n\nالنوع: ${t?.title}\nالإضافات: ${ch.length ? ch.join('، ') : 'لا توجد'}\nالميزانية المتوقعة: ${sar(e.min)} — ${sar(e.max)}\nالمدة: ${e.wMin}–${e.wMax} أسبوع\n\nأرجو التواصل.`);
  };

  const STEPS = ['نوع المشروع', 'الإضافات', 'التقدير'];

  return (
    <section id="calculator" style={{ padding: 'clamp(80px,10vw,130px) 0', background: 'var(--bg2)', position: 'relative', overflow: 'hidden' }}>
      <div className="orb" style={{ width: 500, height: 500, top: '50%', right: '-8%', transform: 'translateY(-50%)', background: 'rgba(139,92,246,0.07)', animationDelay: '-3s' }} />

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 52 }}>
          <div className="section-label" style={{ color: '#F59E0B', borderColor: 'rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.08)' }}>احسب مشروعك</div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,4vw,3.2rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            كم يكلف{' '}
            <span style={{ background: 'linear-gradient(135deg, #F59E0B, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>مشروعك؟</span>
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: 15, marginTop: 12 }}>اعرف التقدير الأولي في ثوانٍ — بدون التزام.</p>
        </motion.div>

        {/* Step indicators */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: 36 }}>
          {STEPS.map((label, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 800,
                  background: step > i ? 'var(--purple)' : step === i ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.04)',
                  color: step > i ? '#fff' : step === i ? 'var(--purple2)' : 'var(--text3)',
                  border: step === i ? '1px solid rgba(139,92,246,0.4)' : step > i ? 'none' : '1px solid var(--border)',
                  boxShadow: step === i ? '0 0 20px rgba(139,92,246,0.3)' : 'none',
                  transition: 'all 0.3s',
                }}>
                  {step > i ? <CheckCircle2 size={16} /> : i + 1}
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: step >= i ? 'var(--text2)' : 'var(--text3)', whiteSpace: 'nowrap' }}>{label}</span>
              </div>
              {i < 2 && (
                <div style={{ width: 80, height: 1, background: step > i ? 'var(--purple)' : 'var(--border)', margin: '0 8px', marginBottom: 22, transition: 'background 0.4s' }} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 24, padding: 'clamp(24px,4vw,44px)', boxShadow: '0 40px 100px rgba(0,0,0,0.4)', position: 'relative', overflow: 'hidden' }}>

          {/* Card glow */}
          {t && <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: `${t.color}15`, filter: 'blur(40px)', pointerEvents: 'none', transition: 'background 0.5s' }} />}

          <AnimatePresence mode="wait">

            {/* STEP 0 — Project type */}
            {step === 0 && (
              <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                <h3 style={{ fontSize: 17, fontWeight: 900, color: '#fff', marginBottom: 22, letterSpacing: '-0.02em' }}>ما نوع مشروعك؟</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
                  {types.map(pt => {
                    const sel = tid === pt.id;
                    return (
                      <motion.button key={pt.id} onClick={() => setTid(pt.id)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px',
                          borderRadius: 14, cursor: 'pointer', textAlign: 'right',
                          border: `1.5px solid ${sel ? pt.color + '60' : 'var(--border)'}`,
                          background: sel ? `${pt.color}12` : 'rgba(255,255,255,0.02)',
                          boxShadow: sel ? `0 0 24px ${pt.color}25` : 'none',
                          transition: 'all 0.2s', minHeight: 72,
                        }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: sel ? `${pt.color}20` : 'rgba(255,255,255,0.05)', fontSize: 20, transition: 'all 0.2s' }}>
                          {pt.emoji}
                        </div>
                        <div style={{ flex: 1, textAlign: 'right' }}>
                          <div style={{ fontSize: 14, fontWeight: 800, color: sel ? '#fff' : 'rgba(255,255,255,0.7)', marginBottom: 3, transition: 'color 0.2s' }}>{pt.title}</div>
                          <div style={{ fontSize: 10, color: sel ? pt.color : 'var(--text3)', fontWeight: 600 }}>{pt.sub}</div>
                        </div>
                        {sel && <CheckCircle2 size={16} color={pt.color} style={{ flexShrink: 0 }} />}
                      </motion.button>
                    );
                  })}
                </div>
                <motion.button disabled={!tid} onClick={() => setStep(1)} whileHover={tid ? { scale: 1.01 } : {}} whileTap={tid ? { scale: 0.99 } : {}}
                  style={{
                    width: '100%', padding: '15px', borderRadius: 13, fontSize: 15, fontWeight: 700,
                    cursor: tid ? 'pointer' : 'not-allowed',
                    background: tid ? `linear-gradient(135deg, ${t?.color ?? '#8B5CF6'}, ${t?.color ?? '#3B82F6'}99)` : 'rgba(255,255,255,0.04)',
                    color: tid ? '#fff' : 'var(--text3)',
                    border: tid ? 'none' : '1px solid var(--border)',
                    boxShadow: tid ? `0 8px 32px ${t?.color ?? '#8B5CF6'}30` : 'none',
                    transition: 'all 0.3s',
                  }}>
                  التالي — الإضافات ←
                </motion.button>
              </motion.div>
            )}

            {/* STEP 1 — Addons */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: `${t?.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{t?.emoji}</div>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>أي الإضافات تحتاجها؟</h3>
                    <p style={{ fontSize: 11, color: 'var(--text3)', fontWeight: 500 }}>اختياري — يمكنك تخطيها</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 28 }}>
                  {addons.map(a => {
                    const on = aids.includes(a.id);
                    return (
                      <motion.button key={a.id} onClick={() => toggle(a.id)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10, padding: '13px 14px',
                          borderRadius: 12, cursor: 'pointer', textAlign: 'right',
                          border: `1.5px solid ${on ? a.color + '50' : 'var(--border)'}`,
                          background: on ? `${a.color}10` : 'rgba(255,255,255,0.02)',
                          transition: 'all 0.2s',
                        }}>
                        <div style={{ width: 20, height: 20, borderRadius: 6, flexShrink: 0, border: `2px solid ${on ? a.color : 'rgba(255,255,255,0.2)'}`, background: on ? a.color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                          {on && <CheckCircle2 size={11} color="#fff" />}
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: on ? '#fff' : 'rgba(255,255,255,0.55)', flex: 1, transition: 'color 0.2s' }}>{a.label}</span>
                        {on && <span style={{ fontSize: 10, fontWeight: 700, color: a.color }}>+{(a.aMin/1000).toFixed(0)}k</span>}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Live preview bar */}
                {aids.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    style={{ padding: '10px 16px', borderRadius: 10, background: `${t?.color}10`, border: `1px solid ${t?.color}25`, marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: 'var(--text2)', fontWeight: 600 }}>معاينة التكلفة مع الإضافات</span>
                    <span style={{ fontSize: 14, fontWeight: 900, color: t?.color }}>{sar(e.min)}+</span>
                  </motion.div>
                )}

                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={() => setStep(0)} style={{ padding: '13px 18px', fontSize: 13, fontWeight: 700, color: 'var(--text3)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <ChevronLeft size={14} /> السابق
                  </button>
                  <button onClick={() => setStep(2)} style={{ flex: 1, padding: '13px', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', border: 'none', background: `linear-gradient(135deg, ${t?.color ?? '#8B5CF6'}, ${t?.color ?? '#3B82F6'}99)`, color: '#fff', boxShadow: `0 8px 32px ${t?.color ?? '#8B5CF6'}30` }}>
                    احسب التقدير ←
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2 — Result */}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.1 }}
                    style={{ width: 56, height: 56, borderRadius: 16, margin: '0 auto 16px', background: `${t?.color}20`, border: `1px solid ${t?.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>
                    {t?.emoji}
                  </motion.div>
                  <h3 style={{ fontSize: 18, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', marginBottom: 6 }}>التقدير الأولي</h3>
                  <p style={{ fontSize: 12, color: 'var(--text3)' }}>{t?.title}{aids.length > 0 ? ` · ${aids.length} إضافات` : ''}</p>
                </div>

                {/* Main price display */}
                <div style={{ padding: '28px 24px', borderRadius: 18, background: `linear-gradient(135deg, ${t?.color}15, ${t?.color}05)`, border: `1px solid ${t?.color}30`, textAlign: 'center', marginBottom: 14, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: `${t?.color}12` }} />
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: t?.color, marginBottom: 10 }}>نطاق الميزانية</div>
                  <div style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>
                    {sar(e.min)}
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--text2)', marginTop: 4 }}>حتى {sar(e.max)}</div>
                </div>

                {/* Timeline + note */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
                  <div style={{ padding: '14px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', textAlign: 'center' }}>
                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 6 }}>وقت التسليم</div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: '#fff' }}>{e.wMin}–{e.wMax}</div>
                    <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 2 }}>أسبوع</div>
                  </div>
                  <div style={{ padding: '14px', borderRadius: 12, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', textAlign: 'center' }}>
                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(16,185,129,0.7)', marginBottom: 6 }}>ما بعد التسليم</div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: '#10B981' }}>٣</div>
                    <div style={{ fontSize: 10, color: 'rgba(16,185,129,0.6)', marginTop: 2 }}>أشهر دعم مجاناً</div>
                  </div>
                </div>

                <div style={{ padding: '10px 14px', borderRadius: 10, marginBottom: 20, fontSize: 11, fontWeight: 500, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text3)', textAlign: 'center' }}>
                  هذا تقدير أولي للتخطيط — السعر النهائي يُحدَّد بعد مناقشة متطلباتك
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <motion.a href={WA + waMsg()} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '15px', borderRadius: 13, fontSize: 15, fontWeight: 700, textDecoration: 'none', background: 'linear-gradient(135deg, #25D366, #1da851)', color: '#fff', boxShadow: '0 8px 28px rgba(37,211,102,0.35)' }}>
                    <MessageCircle size={17} /> أرسل تفاصيل مشروعك عبر واتساب
                  </motion.a>
                  <button onClick={() => { setStep(0); setTid(null); setAids([]); }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', borderRadius: 12, fontSize: 13, fontWeight: 700, background: 'transparent', border: '1px solid var(--border)', color: 'var(--text3)', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--text3)'; }}>
                    <RotateCcw size={13} /> احسب مشروعاً مختلفاً
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`@media(max-width:480px){ .calc-grid{grid-template-columns:1fr!important} }`}</style>
    </section>
  );
}
