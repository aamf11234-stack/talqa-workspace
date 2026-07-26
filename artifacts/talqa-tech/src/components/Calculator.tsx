import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Globe, Wallet, Zap, CheckCircle2, RotateCcw, MessageCircle } from 'lucide-react';

const WA = 'https://wa.me/966551378531?text=';

const types = [
  { id: 'app',    Icon: Smartphone, title: 'تطبيق جوال',       sub: 'iOS & Android',    minP: 8000,  maxP: 22000, minW: 6,  maxW: 12 },
  { id: 'web',    Icon: Globe,      title: 'موقع / لوحة تحكم', sub: 'Web Platform',     minP: 5000,  maxP: 15000, minW: 4,  maxW: 8  },
  { id: 'wallet', Icon: Wallet,     title: 'Apple Wallet',      sub: 'بطاقة ولاء رقمية', minP: 3000,  maxP: 8000,  minW: 2,  maxW: 4  },
  { id: 'custom', Icon: Zap,        title: 'حل مخصص / API',    sub: 'Automation',       minP: 6000,  maxP: 20000, minW: 4,  maxW: 10 },
];

const addons = [
  { id: 'dash',     label: 'لوحة تحكم + تقارير',  aMin: 2000, aMax: 4000, aW: 2 },
  { id: 'loyalty',  label: 'نظام نقاط وولاء',      aMin: 2500, aMax: 5000, aW: 2 },
  { id: 'wa',       label: 'تكامل واتساب',         aMin: 1000, aMax: 2500, aW: 1 },
  { id: 'booking',  label: 'نظام حجوزات',          aMin: 2000, aMax: 4500, aW: 2 },
  { id: 'analytics',label: 'تحليلات وإحصائيات',   aMin: 1200, aMax: 2500, aW: 1 },
  { id: 'mlang',    label: 'دعم متعدد اللغات',     aMin: 800,  aMax: 1800, aW: 1 },
];

const sar = (n: number) => n.toLocaleString('ar-SA') + ' ر.س';

const S = { surface: 'var(--surface)', border: 'rgba(255,255,255,0.08)', border2: 'rgba(79,142,255,0.35)' };

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
    return encodeURIComponent(`السلام عليكم، أريد مناقشة مشروع:\n\nالنوع: ${t?.title}\nالإضافات: ${ch.length ? ch.join('، ') : 'لا توجد'}\nالميزانية: ${sar(e.min)} — ${sar(e.max)}\nالمدة: ${e.wMin}–${e.wMax} أسبوع\n\nأرجو التواصل.`);
  };

  const bars = ['نوع المشروع', 'الإضافات', 'التقدير'];

  return (
    <section id="calculator" style={{ padding: '120px 0', background: 'var(--bg)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, inset: '0 0 auto', height: 1, background: 'rgba(255,255,255,0.07)' }} />

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 28px' }}>
        <div style={{ marginBottom: 56 }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4F8EFF', marginBottom: 18 }}>احسب مشروعك</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
            style={{ fontWeight: 900, fontSize: 'clamp(1.9rem,3.5vw,2.8rem)', letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.1 }}>
            كم يكلف مشروعك؟<br /><span className="text-blue">اعرف التقدير الآن.</span>
          </motion.h2>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 32 }}>
          {bars.map((label, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 800, flexShrink: 0,
                  background: step > i ? '#4F8EFF' : step === i ? 'rgba(79,142,255,0.14)' : 'rgba(255,255,255,0.04)',
                  color: step > i ? '#fff' : step === i ? '#4F8EFF' : 'rgba(255,255,255,0.25)',
                  border: step === i ? '1px solid rgba(79,142,255,0.4)' : '1px solid rgba(255,255,255,0.07)',
                }}>
                  {step > i ? <CheckCircle2 size={14} /> : i + 1}
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: step >= i ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.22)' }}>{label}</span>
              </div>
              {i < 2 && <div style={{ flex: 1, height: 1, background: step > i ? 'rgba(79,142,255,0.45)' : 'rgba(255,255,255,0.07)', margin: '0 12px', transition: 'background 0.4s' }} />}
            </div>
          ))}
        </div>

        {/* Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          style={{ background: S.surface, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '40px 36px', boxShadow: '0 28px 80px rgba(0,0,0,0.45)' }}>

          <AnimatePresence mode="wait">

            {step === 0 && (
              <motion.div key="s0" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
                <h3 style={{ fontSize: 17, fontWeight: 900, color: '#fff', marginBottom: 24, letterSpacing: '-0.02em' }}>ما نوع المشروع الذي تريد بناءه؟</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 32 }}>
                  {types.map(pt => {
                    const sel = tid === pt.id;
                    return (
                      <button key={pt.id} onClick={() => setTid(pt.id)} style={{
                        display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px', borderRadius: 12, cursor: 'pointer', textAlign: 'right',
                        border: `1px solid ${sel ? S.border2 : S.border}`,
                        background: sel ? 'rgba(79,142,255,0.08)' : 'rgba(255,255,255,0.03)',
                        boxShadow: sel ? '0 0 0 3px rgba(79,142,255,0.15)' : 'none',
                        transition: 'all 0.2s',
                      }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: sel ? 'rgba(79,142,255,0.15)' : 'rgba(255,255,255,0.06)', color: sel ? '#4F8EFF' : 'rgba(255,255,255,0.4)' }}>
                          <pt.Icon size={18} strokeWidth={1.5} />
                        </div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: sel ? '#fff' : 'rgba(255,255,255,0.72)', marginBottom: 2 }}>{pt.title}</div>
                          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', fontWeight: 600 }}>{pt.sub}</div>
                        </div>
                        {sel && <CheckCircle2 size={14} style={{ marginRight: 'auto', marginLeft: 0, flexShrink: 0, color: '#4F8EFF' }} />}
                      </button>
                    );
                  })}
                </div>
                <button disabled={!tid} onClick={() => setStep(1)} className={tid ? 'btn-blue' : ''}
                  style={{ padding: '13px 28px', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: tid ? 'pointer' : 'not-allowed', color: tid ? '#fff' : 'rgba(255,255,255,0.18)', background: tid ? undefined : 'rgba(255,255,255,0.04)', border: tid ? 'none' : '1px solid rgba(255,255,255,0.07)' }}>
                  التالي — الإضافات ←
                </button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
                <h3 style={{ fontSize: 17, fontWeight: 900, color: '#fff', marginBottom: 6, letterSpacing: '-0.02em' }}>أي الإضافات تحتاجها؟</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.32)', marginBottom: 24, fontWeight: 500 }}>اختياري — يمكنك تخطيها للحصول على تقدير الأساسي.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 32 }}>
                  {addons.map(a => {
                    const on = aids.includes(a.id);
                    return (
                      <button key={a.id} onClick={() => toggle(a.id)} style={{
                        display: 'flex', alignItems: 'center', gap: 10, padding: '13px 15px', borderRadius: 10, cursor: 'pointer', textAlign: 'right',
                        border: `1px solid ${on ? 'rgba(79,142,255,0.35)' : S.border}`,
                        background: on ? 'rgba(79,142,255,0.07)' : 'rgba(255,255,255,0.02)',
                        transition: 'all 0.18s',
                      }}>
                        <div style={{ width: 18, height: 18, borderRadius: 5, flexShrink: 0, border: `1.5px solid ${on ? '#4F8EFF' : 'rgba(255,255,255,0.2)'}`, background: on ? '#4F8EFF' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.18s' }}>
                          {on && <CheckCircle2 size={10} color="#fff" />}
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 700, color: on ? '#fff' : 'rgba(255,255,255,0.5)', flex: 1 }}>{a.label}</span>
                        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)', fontWeight: 600, flexShrink: 0 }}>+{sar(a.aMin)}</span>
                      </button>
                    );
                  })}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button onClick={() => setStep(0)} style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.3)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3 }}>السابق</button>
                  <button onClick={() => setStep(2)} className="btn-blue" style={{ padding: '13px 28px', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer', border: 'none' }}>احسب التقدير ←</button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <div style={{ textAlign: 'center', marginBottom: 36 }}>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.1 }}
                    style={{ width: 54, height: 54, borderRadius: 14, margin: '0 auto 16px', background: 'rgba(79,142,255,0.12)', border: '1px solid rgba(79,142,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle2 size={24} color="#4F8EFF" />
                  </motion.div>
                  <h3 style={{ fontSize: 17, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', marginBottom: 6 }}>التقدير الأولي لمشروعك</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.32)' }}>{t?.title}{aids.length > 0 ? ` + ${aids.length} إضافات` : ''}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                  <div style={{ padding: '24px 20px', borderRadius: 14, background: 'rgba(79,142,255,0.07)', border: '1px solid rgba(79,142,255,0.18)', textAlign: 'center' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(79,142,255,0.6)', marginBottom: 10 }}>الميزانية</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>{sar(e.min)}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', marginTop: 4 }}>حتى {sar(e.max)}</div>
                  </div>
                  <div style={{ padding: '24px 20px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: 10 }}>المدة</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>{e.wMin}–{e.wMax}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', marginTop: 4 }}>أسبوع تقريباً</div>
                  </div>
                </div>

                <div style={{ padding: '12px 16px', borderRadius: 10, marginBottom: 24, fontSize: 12, fontWeight: 500, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.28)' }}>
                  ⚠️ تقدير أولي للتخطيط. السعر النهائي يُحدَّد بعد مناقشة متطلبات مشروعك.
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <a href={WA + waMsg()} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '15px', borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: 'none', background: '#25D366', color: '#fff', boxShadow: '0 6px 24px rgba(37,211,102,0.3)' }}>
                    <MessageCircle size={16} />
                    أرسل تفاصيل مشروعك عبر واتساب
                  </a>
                  <button onClick={() => { setStep(0); setTid(null); setAids([]); }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px', borderRadius: 12, fontSize: 13, fontWeight: 700, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>
                    <RotateCcw size={13} />ابدأ من جديد
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
