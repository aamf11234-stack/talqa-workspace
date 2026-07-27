import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WA = 'https://wa.me/966551378531?text=أريد%20نظام%20حجوزات%20لمشروعي';
const P  = '#8B5CF6';

/* ─── fake live bookings stream ─── */
const NAMES = ['أحمد العتيبي','سارة الدوسري','محمد القحطاني','نورة السبيعي','عبدالله الحربي','ريم العمري','فيصل الشمري','منى الزهراني'];
const SERVICES = ['قهوة + كيك','كابتشينو مزدوج','فطور كامل','لاتيه خاص','غداء بيزنس','اجتماع VIP'];
const TIMES = ['٩:٠٠ ص','٩:٣٠ ص','١٠:٠٠ ص','١٠:٣٠ ص','١١:٠٠ ص','١١:٣٠ ص','١٢:٠٠ م','١٢:٣٠ م','١:٠٠ م','٢:٠٠ م','٣:٠٠ م','٤:٠٠ م'];

function rand<T>(arr: T[]) { return arr[Math.floor(Math.random() * arr.length)]; }
let idCounter = 0;

/* ─── Animated counter ─── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    const steps = 40;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setVal(Math.round((to * i) / steps));
      if (i >= steps) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [to]);
  return <>{val}{suffix}</>;
}

/* ─── Live booking row ─── */
function BookingRow({ name, service, time, isNew }: { name: string; service: string; time: string; isNew: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24, height: 0 }}
      animate={{ opacity: 1, x: 0, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '10px 14px', borderRadius: 12,
        background: isNew ? `${P}15` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${isNew ? `${P}40` : 'rgba(255,255,255,0.07)'}`,
        transition: 'background 1s, border 1s',
        overflow: 'hidden',
      }}
    >
      {/* Avatar */}
      <div style={{
        width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
        background: `linear-gradient(135deg,${P},#06B6D4)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: 900, color: '#fff',
      }}>
        {name[0]}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: '#fff', fontFamily: 'Cairo,sans-serif' }}>{name}</div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'Cairo,sans-serif' }}>{service}</div>
      </div>
      <div style={{ textAlign: 'left', flexShrink: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: isNew ? '#F59E0B' : 'rgba(255,255,255,0.6)', fontFamily: 'Cairo,sans-serif' }}>{time}</div>
        {isNew && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ fontSize: 9, color: '#10B981', fontWeight: 700, textAlign: 'center' }}>
            ✓ جديد
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Timeline slot ─── */
function TimeSlot({ time, name, pct, color }: { time: string; name?: string; pct: number; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, direction: 'rtl' }}>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', width: 44, flexShrink: 0, textAlign: 'right', fontFamily: 'Cairo,sans-serif', fontWeight: 700 }}>{time}</div>
      <div style={{ flex: 1, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.04)', overflow: 'hidden', position: 'relative' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: '100%', background: `linear-gradient(90deg,${color},${color}99)`, borderRadius: 8, display: 'flex', alignItems: 'center', paddingRight: 8 }}
        />
        {name && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', paddingRight: 10, fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.8)', fontFamily: 'Cairo,sans-serif' }}>
            {name}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Notification toast ─── */
function Toast({ icon, app, title, body, color, delay }: { icon: React.ReactNode; app: string; title: string; body: string; color: string; delay: number }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          style={{
            display: 'flex', gap: 10, alignItems: 'flex-start',
            padding: '12px 14px', borderRadius: 14,
            background: 'rgba(15,15,28,0.9)',
            border: `1px solid ${color}30`,
            backdropFilter: 'blur(20px)',
            boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${color}15`,
          }}
        >
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}20`, border: `1.5px solid ${color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {icon}
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.45)', marginBottom: 2 }}>{app}</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#fff', marginBottom: 2, fontFamily: 'Cairo,sans-serif' }}>{title}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'Cairo,sans-serif' }}>{body}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════════════════
   Main Section
══════════════════════════════════════════════════════════ */
export default function BookingsSection() {
  const [bookings, setBookings] = useState(() =>
    Array.from({ length: 4 }, (_, i) => ({
      id: ++idCounter,
      name: NAMES[i],
      service: SERVICES[i % SERVICES.length],
      time: TIMES[i],
      isNew: false,
    }))
  );
  const [newId, setNewId] = useState<number | null>(null);

  /* Stream new bookings every 3.5s */
  useEffect(() => {
    const id = setInterval(() => {
      const entry = {
        id: ++idCounter,
        name: rand(NAMES),
        service: rand(SERVICES),
        time: rand(TIMES),
        isNew: true,
      };
      setNewId(entry.id);
      setBookings(prev => [entry, ...prev.slice(0, 5)]);
      setTimeout(() => setNewId(null), 2500);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const timeline = [
    { time: '٩:٠٠ ص', name: 'أحمد العتيبي',  pct: 100, color: P },
    { time: '١٠:٠٠ ص', name: 'سارة الدوسري', pct: 100, color: '#06B6D4' },
    { time: '١١:٠٠ ص', name: 'محمد القحطاني', pct: 85,  color: '#10B981' },
    { time: '١٢:٠٠ م', name: '',              pct: 0,   color: P },
    { time: '١:٠٠ م',  name: 'نورة السبيعي', pct: 100, color: '#F59E0B' },
    { time: '٢:٠٠ م',  name: 'عبدالله الحربي', pct: 60,  color: P },
    { time: '٣:٠٠ م',  name: '',              pct: 0,   color: P },
    { time: '٤:٠٠ م',  name: 'ريم العمري',   pct: 100, color: '#EC4899' },
  ];

  return (
    <section id="bookings" style={{ padding: 'clamp(80px,10vw,130px) 0', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <div className="orb" style={{ width: 600, height: 600, top: '20%', left: '-10%', background: `${P}06`, animationDelay: '-2s' }} />
      <div className="orb" style={{ width: 500, height: 500, bottom: '10%', right: '-8%', background: 'rgba(6,182,212,0.05)', animationDelay: '-7s' }} />

      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px', position: 'relative' }}>

        {/* ── Header ── */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 20 }}>
          <div className="section-label" style={{ color: P, borderColor: `${P}40`, background: `${P}10` }}>
            📅 نظام الحجوزات
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,4.5vw,3.4rem)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 14 }}>
            الحجوزات تدخل{' '}
            <span style={{ background: `linear-gradient(135deg,${P},#06B6D4)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              وأنت نايم
            </span>
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: 16, maxWidth: 480, margin: '0 auto 48px' }}>
            زبون يحجز من الجوال — أنت تستقبل إشعار فوري، وهو يستقبل تأكيد على واتساب. بدون مكالمات، بدون دفتر.
          </p>
        </motion.div>

        {/* ── Stats bar ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(20px,4vw,60px)', marginBottom: 60, flexWrap: 'wrap' }}>
          {[
            { num: 95, suf: '٪', label: 'نسبة الحضور', color: '#10B981' },
            { num: 60, suf: ' ث', label: 'متوسط الحجز', color: P },
            { num: 3,  suf: '×', label: 'عودة الزبائن', color: '#F59E0B' },
            { num: 24, suf: '/٧', label: 'متاح دائماً', color: '#06B6D4' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 900, color: s.color, lineHeight: 1, fontFamily: 'Cairo,sans-serif' }}>
                <Counter to={s.num} suffix={s.suf} />
              </div>
              <div style={{ fontSize: 12, color: 'var(--text3)', fontWeight: 700, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* ── Main dashboard ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20, marginBottom: 24 }}>

          {/* Left — Timeline */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="glass" style={{ padding: '24px 20px', borderRadius: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, direction: 'rtl' }}>
              <div style={{ fontSize: 13, fontWeight: 900, color: '#fff' }}>📋 جدول اليوم</div>
              <div style={{ fontSize: 10, color: '#10B981', fontWeight: 700, background: 'rgba(16,185,129,0.1)', padding: '3px 10px', borderRadius: 99, border: '1px solid rgba(16,185,129,0.2)' }}>
                ● مباشر
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {timeline.map((slot, i) => (
                <TimeSlot key={i} {...slot} />
              ))}
            </div>
            <div style={{ marginTop: 14, padding: '10px 12px', borderRadius: 10, background: 'rgba(139,92,246,0.08)', border: `1px solid ${P}25`, direction: 'rtl', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>فراغات متاحة</span>
              <span style={{ fontSize: 11, fontWeight: 900, color: P }}>٢ مواعيد</span>
            </div>
          </motion.div>

          {/* Center — Live feed */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="glass" style={{ padding: '24px 20px', borderRadius: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, direction: 'rtl' }}>
              <div style={{ fontSize: 13, fontWeight: 900, color: '#fff' }}>⚡ الحجوزات الجديدة</div>
              <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }}
                style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <AnimatePresence mode="popLayout">
                {bookings.map(b => (
                  <BookingRow key={b.id} name={b.name} service={b.service} time={b.time} isNew={b.id === newId} />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right — Notifications */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="glass" style={{ padding: '24px 20px', borderRadius: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 900, color: '#fff', marginBottom: 18, direction: 'rtl' }}>
              🔔 سلسلة الإشعارات التلقائية
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

              <Toast delay={400} color="#25D366" app="واتساب"
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L.054 23.454a.75.75 0 00.919.914l5.698-1.493A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.523-5.172-1.432l-.369-.222-3.832 1.004 1.021-3.737-.242-.384A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>}
                title="تم تأكيد حجزك 🎉"
                body="الثلاثاء ١١:٠٠ ص — نتطلع لرؤيتك ✨"
              />

              <Toast delay={1200} color={P} app="التطبيق"
                icon={<span style={{ fontSize: 16 }}>📅</span>}
                title="حجز جديد — أحمد العتيبي"
                body="الثلاثاء ١١:٠٠ ص · قهوة + كيك"
              />

              <Toast delay={2000} color="#FF9F0A" app="Apple Watch"
                icon={<span style={{ fontSize: 16 }}>⌚</span>}
                title="تذكير بموعدك"
                body="موعدك بعد ٣٠ دقيقة — استعد"
              />

              <Toast delay={2800} color="#10B981" app="لوحة التحكم"
                icon={<span style={{ fontSize: 16 }}>📊</span>}
                title="٦ حجوزات اليوم"
                body="الطاقة الاستيعابية ٨٠٪ · إيراد ٦٤٠ ر"
              />
            </div>

            {/* Arrow flow */}
            <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, direction: 'rtl', flexWrap: 'wrap' }}>
              {['الزبون يحجز', '→', 'أنت تعرف', '→', 'هو يستلم', '→', 'كلكم مرتاحين'].map((s, i) => (
                <span key={i} style={{ fontSize: 10, fontWeight: i % 2 === 0 ? 800 : 400, color: i % 2 === 0 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)' }}>{s}</span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Bottom features ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 12, marginBottom: 32 }}>
          {[
            { icon: '📱', t: 'حجز من الجوال', d: 'في ثوانٍ بدون اتصال' },
            { icon: '💬', t: 'تأكيد واتساب', d: 'فوري وتلقائي' },
            { icon: '⌚', t: 'Apple Watch', d: 'تذكير بنبضة' },
            { icon: '📊', t: 'لوحة تحكم', d: 'كل الحجوزات بمكان' },
            { icon: '🔄', t: 'إلغاء وتعديل', d: 'بضغطة بدون مكالمة' },
            { icon: '⚡', t: 'إشعار فوري', d: 'تعرف في الثانية' },
          ].map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 + i * 0.05 }}
              className="glass" style={{ padding: '14px 16px', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 10, direction: 'rtl' }}>
              <span style={{ fontSize: 20 }}>{f.icon}</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#fff' }}>{f.t}</div>
                <div style={{ fontSize: 10, color: 'var(--text3)' }}>{f.d}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── CTA ── */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ textAlign: 'center' }}>
          <a href={WA} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', borderRadius: 16, background: `linear-gradient(135deg,${P},#6D28D9)`, color: '#fff', fontFamily: 'Cairo,sans-serif', fontSize: 16, fontWeight: 900, textDecoration: 'none', boxShadow: `0 16px 48px ${P}40` }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L.054 23.454a.75.75 0 00.919.914l5.698-1.493A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.523-5.172-1.432l-.369-.222-3.832 1.004 1.021-3.737-.242-.384A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            ابني نظام حجوزاتي الآن
          </a>
          <p style={{ fontSize: 12, color: 'var(--text3)', marginTop: 12 }}>يجهز خلال ٢٤ ساعة · دعم واتساب مستمر</p>
        </motion.div>

      </div>
    </section>
  );
}
