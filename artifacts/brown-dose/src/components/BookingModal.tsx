import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ChevronRight, ChevronLeft, Check, Coffee, Crown,
  Building2, MapPin, User, Phone, Sparkles, Clock,
  Headphones, Rocket, Tag, CheckCircle2,
} from 'lucide-react';

/* ─── Theme ─── */
const C = {
  bg:      '#0E0700',
  card:    '#1A0C00',
  primary: '#C4783A',
  grad:    'linear-gradient(135deg,#C4783A,#8B5E2A)',
  border:  'rgba(196,120,58,0.22)',
  borderSm:'rgba(196,120,58,0.12)',
  glow:    'rgba(196,120,58,0.18)',
};

/* ─── Discount codes → influencer name ─── */
const CODES: Record<string, string> = {
  'TURKI':   'تركي',
  'NORA':    'نورة',
  'SULTAN':  'سلطان',
  'KHALID':  'خالد',
  'SARA':    'سارة',
  'FAISAL':  'فيصل',
  'HESSA':   'حصة',
  'AHMED':   'أحمد',
};

function validateCode(raw: string): string | null {
  return CODES[raw.trim().toUpperCase()] ?? null;
}

/* ─── Types ─── */
interface BookingData {
  pkg: 'starter' | 'pro' | '';
  bizType: string;
  bizName: string;
  city: string;
  name: string;
  phone: string;
  discountCode: string;
  influencer: string;
}

/* ─── Step dots ─── */
function StepDots({ step, total }: { step: number; total: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', marginBottom: 28 }}>
      {Array.from({ length: total }).map((_, i) => (
        <motion.div key={i}
          animate={{ width: i === step ? 28 : 8, background: i <= step ? C.primary : 'rgba(255,255,255,0.15)' }}
          transition={{ duration: 0.3 }}
          style={{ height: 8, borderRadius: 4 }}
        />
      ))}
    </div>
  );
}

/* ─── Discount code banner ─── */
function DiscountBanner({
  influencer, code,
}: { influencer: string; code: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'linear-gradient(135deg,rgba(196,120,58,0.18),rgba(139,94,42,0.10))',
        border: `1px solid ${C.border}`,
        borderRadius: 14, padding: '12px 16px',
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
      }}
    >
      <div style={{ width: 32, height: 32, borderRadius: 10, background: C.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <CheckCircle2 size={17} color="#fff" />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>
          عرض خاص من {influencer} 🎉
        </div>
        <div style={{ fontSize: 11, color: 'rgba(232,160,96,0.8)' }}>
          كود <span style={{ fontFamily: 'monospace', letterSpacing: 1 }}>{code.toUpperCase()}</span> · التأسيس مجاني + ٤٩٩ ريال/شهر فقط
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Discount code input ─── */
function DiscountInput({
  applied,
  onApply,
}: {
  applied: { code: string; influencer: string } | null;
  onApply: (code: string, influencer: string | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  function tryApply() {
    const name = validateCode(input);
    if (name) {
      onApply(input, name);
      setError(false);
      setOpen(false);
    } else {
      setError(true);
    }
  }

  if (applied) return null; // banner shown instead

  return (
    <div style={{ marginBottom: 16 }}>
      {!open ? (
        <button onClick={() => setOpen(true)} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'rgba(255,255,255,0.04)', border: '1px dashed rgba(196,120,58,0.25)',
          borderRadius: 10, padding: '9px 14px', cursor: 'pointer', width: '100%',
          color: 'rgba(232,160,96,0.7)', fontSize: 12, fontWeight: 700,
          fontFamily: 'Noto Kufi Arabic, Cairo, sans-serif',
        }}>
          <Tag size={13} />
          عندك كود خصم من مشهور؟
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
          style={{ display: 'flex', gap: 8 }}
        >
          <input
            autoFocus
            value={input}
            onChange={e => { setInput(e.target.value); setError(false); }}
            onKeyDown={e => e.key === 'Enter' && tryApply()}
            placeholder="أدخل الكود هنا"
            dir="ltr"
            style={{
              flex: 1, padding: '10px 14px',
              background: error ? 'rgba(239,68,68,0.08)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : 'rgba(196,120,58,0.3)'}`,
              borderRadius: 10, color: '#fff', fontSize: 14,
              fontFamily: 'monospace', letterSpacing: 2, outline: 'none',
              transition: 'all 0.2s',
            }}
          />
          <button onClick={tryApply} style={{
            padding: '10px 16px', background: C.grad, border: 'none',
            borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 800,
            cursor: 'pointer', fontFamily: 'Noto Kufi Arabic, Cairo, sans-serif',
          }}>تطبيق</button>
          <button onClick={() => setOpen(false)} style={{
            padding: '10px 12px', background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10, color: 'rgba(255,255,255,0.5)',
            cursor: 'pointer',
          }}><X size={14} /></button>
        </motion.div>
      )}
      {error && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ fontSize: 11, color: '#EF4444', marginTop: 6, paddingRight: 4 }}>
          كود غير صحيح — تأكد من الكود اللي شاركه المشهور
        </motion.p>
      )}
    </div>
  );
}

/* ─── Package card ─── */
function PkgCard({
  icon: Icon, title, price, priceLabel, monthlyNote,
  features, tag, selected, onSelect, isDiscounted,
}: {
  icon: React.ElementType; title: string;
  price: string; priceLabel: string; monthlyNote?: string;
  features: string[]; tag?: string;
  selected: boolean; onSelect: () => void;
  isDiscounted?: boolean;
}) {
  return (
    <motion.div whileTap={{ scale: 0.98 }} onClick={onSelect} style={{
      border: selected ? `2px solid ${C.primary}` : '2px solid rgba(255,255,255,0.08)',
      borderRadius: 20, padding: '20px 18px',
      background: selected ? 'rgba(196,120,58,0.10)' : 'rgba(255,255,255,0.03)',
      cursor: 'pointer', position: 'relative', transition: 'all 0.25s',
      boxShadow: selected ? `0 0 30px ${C.glow}` : 'none',
    }}>
      {tag && (
        <div style={{
          position: 'absolute', top: -11, right: 16,
          background: C.grad, color: '#fff',
          fontSize: 10, fontWeight: 800, padding: '3px 12px', borderRadius: 99,
        }}>{tag}</div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: selected ? C.grad : 'rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={17} color={selected ? '#fff' : '#888'} />
          </div>
          <span style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>{title}</span>
        </div>
        <motion.div animate={{ scale: selected ? 1 : 0, opacity: selected ? 1 : 0 }}
          style={{ width: 22, height: 22, borderRadius: '50%', background: C.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Check size={12} color="#fff" strokeWidth={3} />
        </motion.div>
      </div>

      {/* Price */}
      <div style={{ marginBottom: 14 }}>
        {isDiscounted ? (
          <div>
            <span style={{ fontSize: 22, fontWeight: 900, color: '#4ADE80' }}>مجاناً</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginRight: 6, textDecoration: 'line-through' }}>{price} ريال</span>
            <div style={{ fontSize: 12, color: 'rgba(232,160,96,0.8)', marginTop: 3, fontWeight: 700 }}>+ ٤٩٩ ريال/شهر</div>
          </div>
        ) : (
          <div>
            <span style={{ fontSize: 30, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em' }}>{price}</span>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginRight: 4 }}>{priceLabel}</span>
            {monthlyNote && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{monthlyNote}</div>}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: selected ? 'rgba(196,120,58,0.25)' : 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Check size={8} color={selected ? C.primary : '#666'} strokeWidth={3} />
            </div>
            <span style={{ fontSize: 12, color: selected ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.4)' }}>{f}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Text input ─── */
function Field({ label, icon: Icon, value, onChange, placeholder, type = 'text', dir = 'rtl' }: {
  label: string; icon: React.ElementType;
  value: string; onChange: (v: string) => void;
  placeholder: string; type?: string; dir?: string;
}) {
  const [focus, setFocus] = useState(false);
  return (
    <div>
      <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(232,160,96,0.7)', marginBottom: 7, display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon size={12} />{label}
      </label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} dir={dir}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{
          width: '100%', padding: '12px 14px',
          background: focus ? 'rgba(196,120,58,0.08)' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${focus ? C.primary : 'rgba(255,255,255,0.1)'}`,
          borderRadius: 12, color: '#fff', fontSize: 14,
          fontFamily: 'Noto Kufi Arabic, Cairo, sans-serif',
          outline: 'none', direction: dir, boxSizing: 'border-box',
          transition: 'all 0.2s',
          boxShadow: focus ? `0 0 0 3px ${C.glow}` : 'none',
        }}
      />
    </div>
  );
}

/* ─── Select ─── */
function SelectField({ label, icon: Icon, value, onChange, options }: {
  label: string; icon: React.ElementType;
  value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  const [focus, setFocus] = useState(false);
  return (
    <div>
      <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(232,160,96,0.7)', marginBottom: 7, display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon size={12} />{label}
      </label>
      <select value={value} onChange={e => onChange(e.target.value)}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{
          width: '100%', padding: '12px 14px',
          background: focus ? 'rgba(196,120,58,0.08)' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${focus ? C.primary : 'rgba(255,255,255,0.1)'}`,
          borderRadius: 12, color: value ? '#fff' : 'rgba(255,255,255,0.35)',
          fontSize: 14, fontFamily: 'Noto Kufi Arabic, Cairo, sans-serif',
          outline: 'none', direction: 'rtl', boxSizing: 'border-box',
          cursor: 'pointer', transition: 'all 0.2s',
          WebkitAppearance: 'none',
        }}>
        <option value="" disabled style={{ background: '#1A0C00' }}>اختر نوع نشاطك</option>
        {options.map(o => (
          <option key={o.value} value={o.value} style={{ background: '#1A0C00' }}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

/* ─── Success ─── */
function SuccessScreen({ data }: { data: BookingData }) {
  const steps = [
    { icon: Clock,      title: 'مراجعة الطلب',   desc: 'يصلك تأكيد خلال ساعتين',             time: 'اليوم' },
    { icon: Headphones, title: 'جلسة تعريفية',   desc: '٣٠ دقيقة لفهم نشاطك بالكامل',        time: 'خلال ٢٤ ساعة' },
    { icon: Rocket,     title: 'بدء التطوير',     desc: 'نبدأ بناء تطبيقك على الفور',         time: 'خلال ٣ أيام' },
    { icon: Sparkles,   title: 'تسليم التطبيق',  desc: 'تطبيق كامل جاهز للإطلاق',            time: 'خلال ٦٠ يوم' },
  ];

  return (
    <motion.div key="success" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16,1,0.3,1] }} style={{ textAlign: 'center' }}>

      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 280, damping: 22 }}
        style={{ width: 72, height: 72, borderRadius: '50%', background: C.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: `0 12px 36px ${C.glow}` }}>
        <Check size={34} color="#fff" strokeWidth={3} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <h2 style={{ fontSize: 22, fontWeight: 900, color: '#fff', marginBottom: 8 }}>
          تم استلام طلبك، {data.name.split(' ')[0]}! 🎉
        </h2>
        {data.influencer && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(196,120,58,0.12)', border: `1px solid ${C.border}`, borderRadius: 99, padding: '4px 14px', marginBottom: 10 }}>
            <Tag size={11} color={C.primary} />
            <span style={{ fontSize: 12, color: '#E8A060', fontWeight: 700 }}>عرض {data.influencer}</span>
          </div>
        )}
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 28, lineHeight: 1.7 }}>
          {data.bizName ? `سنبني تطبيق ${data.bizName} ` : 'سنتواصل معك '}
          على الرقم <span style={{ color: '#E8A060', direction: 'ltr', display: 'inline-block' }}>{data.phone}</span>
        </p>
      </motion.div>

      <div style={{ textAlign: 'right', marginBottom: 8 }}>
        {steps.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14, position: 'relative' }}>
            {i < steps.length - 1 && (
              <div style={{ position: 'absolute', right: 17, top: 32, width: 2, height: 22, background: 'rgba(196,120,58,0.2)' }} />
            )}
            <div style={{ width: 36, height: 36, borderRadius: 10, background: i === 0 ? C.grad : 'rgba(196,120,58,0.15)', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <s.icon size={16} color={i === 0 ? '#fff' : C.primary} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: i === 0 ? '#fff' : 'rgba(255,255,255,0.7)' }}>{s.title}</span>
                <span style={{ fontSize: 10, color: 'rgba(196,120,58,0.8)', fontWeight: 700, background: 'rgba(196,120,58,0.1)', padding: '2px 8px', borderRadius: 99 }}>{s.time}</span>
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{s.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MAIN MODAL
═══════════════════════════════════════════ */
export function BookingModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [done, setDone] = useState(false);
  const [discount, setDiscount] = useState<{ code: string; influencer: string } | null>(null);

  const [data, setData] = useState<BookingData>({
    pkg: '', bizType: '', bizName: '', city: '',
    name: '', phone: '', discountCode: '', influencer: '',
  });
  const set = (k: keyof BookingData) => (v: string) => setData(d => ({ ...d, [k]: v }));

  function applyCode(code: string, influencer: string | null) {
    if (influencer) {
      setDiscount({ code, influencer });
      setData(d => ({ ...d, discountCode: code.toUpperCase(), influencer }));
    }
  }

  const canNext = [
    data.pkg !== '',
    data.bizType !== '' && data.bizName.trim() !== '',
    data.name.trim() !== '' && data.phone.trim().length >= 9,
  ];

  function next() {
    if (step === 2) { setDone(true); return; }
    setDir(1); setStep(s => s + 1);
  }
  function back() { setDir(-1); setStep(s => s - 1); }

  const slide = {
    initial:    (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    animate:    { opacity: 1, x: 0 },
    exit:       (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
    transition: { duration: 0.28, ease: [0.22,1,0.36,1] },
  };

  const STARTER_FEATURES = ['تطبيق ويب بهوية نشاطك', 'نظام نقاط ولاء تلقائي', 'قائمة QR تفاعلية', 'دعم مباشر ٦ أشهر'];
  const PRO_FEATURES      = ['كل ميزات الكافيه', 'Apple & Google Wallet', 'نظام توصيل واستلام', 'لوحة تحكم + إحصائيات', 'تطبيق iOS + Android'];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px', direction: 'rtl',
      }}>
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.96 }}
        transition={{ duration: 0.38, ease: [0.16,1,0.3,1] }}
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 480,
          background: C.card, border: `1px solid ${C.border}`,
          borderRadius: 28, padding: '28px 24px 24px',
          position: 'relative',
          boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 0 60px ${C.glow}`,
          maxHeight: '90vh', overflowY: 'auto',
        }}>

        {/* Close */}
        <button onClick={onClose} style={{
          position: 'absolute', top: 16, left: 16,
          width: 32, height: 32, borderRadius: '50%',
          background: 'rgba(255,255,255,0.07)', border: 'none',
          color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><X size={15} /></button>

        {/* Glow */}
        <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: C.glow, filter: 'blur(50px)', pointerEvents: 'none' }} />

        {!done ? (
          <>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 22 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(232,160,96,0.8)', marginBottom: 6 }}>
                {['اختر باقتك', 'معلومات نشاطك', 'بياناتك'][step]}
              </div>
              <StepDots step={step} total={3} />
            </div>

            <div style={{ overflow: 'hidden', minHeight: 300 }}>
              <AnimatePresence mode="wait" custom={dir}>

                {/* ── Step 0: Packages ── */}
                {step === 0 && (
                  <motion.div key="s0" custom={dir} variants={slide} initial="initial" animate="animate" exit="exit" transition={slide.transition}>

                    {discount
                      ? <DiscountBanner influencer={discount.influencer} code={discount.code} />
                      : <DiscountInput applied={null} onApply={applyCode} />
                    }

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <PkgCard
                        icon={Coffee} title="باقة الكافيه"
                        price="٢٬٠٠٠" priceLabel="ريال — دفعة واحدة"
                        features={STARTER_FEATURES}
                        selected={data.pkg === 'starter'} onSelect={() => set('pkg')('starter')}
                        isDiscounted={!!discount}
                      />
                      <PkgCard
                        icon={Crown} title="باقة المطعم الكامل"
                        price="٣٬٥٠٠" priceLabel="ريال — دفعة واحدة"
                        features={PRO_FEATURES}
                        tag="الأكثر طلباً ✦"
                        selected={data.pkg === 'pro'} onSelect={() => set('pkg')('pro')}
                        isDiscounted={!!discount}
                      />
                    </div>
                  </motion.div>
                )}

                {/* ── Step 1: Business info ── */}
                {step === 1 && (
                  <motion.div key="s1" custom={dir} variants={slide} initial="initial" animate="animate" exit="exit" transition={slide.transition}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      <SelectField
                        label="نوع النشاط" icon={Coffee} value={data.bizType} onChange={set('bizType')}
                        options={[
                          { value: 'cafe',       label: '☕ كافيه' },
                          { value: 'restaurant', label: '🍽️ مطعم' },
                          { value: 'bakery',     label: '🥐 مخبزة / حلويات' },
                          { value: 'juice',      label: '🥤 عصائر / مشروبات' },
                          { value: 'other',      label: '📦 نشاط آخر' },
                        ]}
                      />
                      <Field label="اسم النشاط التجاري" icon={Building2} value={data.bizName} onChange={set('bizName')} placeholder="مثال: كافيه النخبة" />
                      <Field label="المدينة" icon={MapPin} value={data.city} onChange={set('city')} placeholder="مثال: الرياض" />
                    </div>
                  </motion.div>
                )}

                {/* ── Step 2: Contact ── */}
                {step === 2 && (
                  <motion.div key="s2" custom={dir} variants={slide} initial="initial" animate="animate" exit="exit" transition={slide.transition}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

                      {/* Summary */}
                      <div style={{ background: 'rgba(196,120,58,0.08)', border: `1px solid ${C.border}`, borderRadius: 14, padding: '14px 16px', marginBottom: 4 }}>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>ملخص طلبك</div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>
                          {data.pkg === 'pro' ? '👑 باقة المطعم الكامل' : '☕ باقة الكافيه'}
                          {discount
                            ? <span style={{ color: '#4ADE80', marginRight: 6 }}>— مجاناً + ٤٩٩/شهر</span>
                            : <span style={{ color: 'rgba(255,255,255,0.5)', marginRight: 6 }}>— {data.pkg === 'pro' ? '٣,٥٠٠' : '٢,٠٠٠'} ريال</span>
                          }
                        </div>
                        {data.bizName && (
                          <div style={{ fontSize: 12, color: 'rgba(232,160,96,0.7)', marginTop: 3 }}>
                            {data.bizName} · {data.city || 'المملكة'}
                          </div>
                        )}
                        {discount && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 5 }}>
                            <Tag size={10} color={C.primary} />
                            <span style={{ fontSize: 11, color: 'rgba(232,160,96,0.7)' }}>كود {discount.code.toUpperCase()} · عرض {discount.influencer}</span>
                          </div>
                        )}
                      </div>

                      <Field label="اسمك الكامل" icon={User} value={data.name} onChange={set('name')} placeholder="مثال: سلطان الغامدي" />
                      <Field label="رقم الجوال" icon={Phone} value={data.phone} onChange={set('phone')} placeholder="05xxxxxxxx" type="tel" dir="ltr" />
                      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textAlign: 'center', lineHeight: 1.6 }}>
                        بالضغط على "احجز مشروعك" أنت توافق على التواصل معك لإتمام الطلب
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {step > 0 && (
                <button onClick={back} style={{
                  padding: '13px 18px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.7)', fontSize: 14, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontFamily: 'Noto Kufi Arabic, Cairo, sans-serif',
                }}>
                  <ChevronRight size={16} /> رجوع
                </button>
              )}
              <button onClick={next} disabled={!canNext[step]} style={{
                flex: 1, padding: '14px', borderRadius: 12,
                background: canNext[step] ? C.grad : 'rgba(255,255,255,0.06)',
                border: canNext[step] ? 'none' : '1px solid rgba(255,255,255,0.08)',
                color: canNext[step] ? '#fff' : 'rgba(255,255,255,0.25)',
                fontSize: 15, fontWeight: 800, cursor: canNext[step] ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                fontFamily: 'Noto Kufi Arabic, Cairo, sans-serif',
                boxShadow: canNext[step] ? '0 8px 24px rgba(196,120,58,0.3)' : 'none',
                transition: 'all 0.2s',
              }}>
                {step === 2
                  ? <><Sparkles size={16} /> احجز مشروعك الآن</>
                  : <><span>التالي</span><ChevronLeft size={16} /></>
                }
              </button>
            </div>
          </>
        ) : (
          <SuccessScreen data={data} />
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── Trigger button ─── */
export function BookingButton({
  children, variant = 'primary', style: extraStyle,
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
  style?: React.CSSProperties;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} style={{
        ...(variant === 'primary' ? {
          background: C.grad, color: '#fff',
          boxShadow: '0 8px 28px rgba(196,120,58,0.35)', border: 'none',
        } : {
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.10)',
          color: 'rgba(255,255,255,0.7)',
        }),
        padding: '13px 24px', borderRadius: 12,
        fontWeight: 800, fontSize: 15, cursor: 'pointer',
        display: 'inline-flex', alignItems: 'center',
        justifyContent: 'center', gap: 8,
        fontFamily: 'Noto Kufi Arabic, Cairo, sans-serif',
        transition: 'opacity 0.2s', ...extraStyle,
      }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        {children}
      </button>
      <AnimatePresence>
        {open && <BookingModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
