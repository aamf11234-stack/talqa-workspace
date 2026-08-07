import { motion } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';
import { useIsMobile } from '../hooks/useIsMobile';
import { Star, Wifi, Calendar, CheckCircle2, ArrowDown } from 'lucide-react';

const WA = 'https://wa.me/966551378531?text=السلام%20عليكم%2C%20أريد%20أبدأ%20مشروعي';

function Stat({ end, label, suffix = '' }: { end: number; label: string; suffix?: string }) {
  const { count, ref } = useCountUp(end, 1800);
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '24px 12px' }}>
      <div style={{ fontSize: 'clamp(1.8rem,2.8vw,2.4rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }} className="grad">
        {count.toLocaleString('ar-SA')}{suffix}<span style={{ opacity: 0.7 }}>+</span>
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text3)', marginTop: 6 }}>{label}</div>
    </div>
  );
}

/* ── Floating mini-cards ── */
function FloatingCard({ children, style }: { children: React.ReactNode; style: React.CSSProperties }) {
  return (
    <motion.div
      className="floating-card"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute', zIndex: 1,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 16,
        padding: '12px 16px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        pointerEvents: 'none',
        ...style,
      }}>
      {children}
    </motion.div>
  );
}

const words = ['نحوّل', 'أفكارك', 'إلى', 'منتجات'];
const words2 = ['يعشقها', 'عملاؤك.'];

export default function Hero() {
  const m = useIsMobile();
  return (
    <section style={{
      position: 'relative', minHeight: '100dvh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      paddingTop: 80, background: 'var(--bg)', overflow: 'hidden',
    }}>
      {/* ── Animated mesh background ── */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.22, 0.15] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '-20%', right: '-15%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, #8B5CF6, transparent 70%)', filter: 'blur(80px)' }} />
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.18, 0.1] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ position: 'absolute', bottom: '0%', left: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, #3B82F6, transparent 70%)', filter: 'blur(80px)' }} />
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.07, 0.14, 0.07] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          style={{ position: 'absolute', top: '50%', left: '45%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, #06B6D4, transparent 70%)', filter: 'blur(60px)' }} />

        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black 30%, transparent 100%)',
        }} />
      </div>

      {/* ── Floating Cards ── */}
      {/* Wallet card — top right */}
      <FloatingCard style={{ top: '18%', right: '8%', minWidth: 180 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg,#F59E0B,#EF4444)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>☕</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#fff' }}>Apple & Google Wallet</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>تُضاف بضغطة واحدة</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 3 }}>
          {[...Array(5)].map((_,i) => <Star key={i} size={10} fill="#F59E0B" color="#F59E0B" />)}
        </div>
      </FloatingCard>

      {/* Booking card — top left */}
      <FloatingCard style={{ top: '22%', left: '7%', minWidth: 160 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Calendar size={12} color="#10B981" />
          </div>
          <span style={{ fontSize: 11, fontWeight: 800, color: '#fff' }}>حجز جديد</span>
        </div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>أحمد العمري — ٣:٠٠ م</div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 99, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}>
          <CheckCircle2 size={9} color="#10B981" />
          <span style={{ fontSize: 9, fontWeight: 700, color: '#10B981' }}>مؤكد</span>
        </div>
      </FloatingCard>

      {/* NFC card — bottom right */}
      <FloatingCard style={{ bottom: '22%', right: '6%', minWidth: 150 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: 6, background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Wifi size={12} color="#8B5CF6" style={{ transform: 'rotate(90deg)' }} />
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#fff' }}>NFC جاهز</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>لمس واقرأ</div>
          </div>
        </div>
      </FloatingCard>

      {/* Points card — bottom left */}
      <FloatingCard style={{ bottom: '24%', left: '6%', minWidth: 140 }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>نقاط العميل</div>
        <div style={{ fontSize: 26, fontWeight: 900, color: '#F59E0B', letterSpacing: '-0.04em', lineHeight: 1 }}>٢٤٧</div>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginTop: 3 }}>نقطة ولاء</div>
      </FloatingCard>

      {/* ── Main Content ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%', maxWidth: 860, margin: '0 auto',
        padding: '0 24px', textAlign: 'center',
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ marginBottom: 36 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '7px 18px', borderRadius: 99,
            border: '1px solid rgba(139,92,246,0.3)',
            background: 'rgba(139,92,246,0.08)',
            fontSize: 12, fontWeight: 700,
            color: 'rgba(167,139,250,0.9)', letterSpacing: '0.05em',
          }}>
            <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--purple)', flexShrink: 0 }} />
            تلقا تك · الرياض، المملكة العربية السعودية
          </span>
        </motion.div>

        {/* Headline */}
        <h1 style={{ fontWeight: 900, lineHeight: 1.05, fontSize: 'clamp(2.8rem,8vw,6.5rem)', letterSpacing: '-0.035em', marginBottom: 24 }}>
          <span style={{ display: 'block', overflow: 'hidden' }}>
            {words.map((w, i) => (
              <motion.span key={w} initial={{ y: 90, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.75, delay: i * 0.08, ease: [0.22,1,0.36,1] }}
                style={{ display: 'inline-block', marginLeft: '0.22em' }}>{w}</motion.span>
            ))}
          </span>
          <span style={{ display: 'block', overflow: 'hidden' }}>
            {words2.map((w, i) => (
              <motion.span key={w} className="grad" initial={{ y: 90, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.75, delay: 0.32 + i * 0.09, ease: [0.22,1,0.36,1] }}
                style={{ display: 'inline-block', marginLeft: '0.22em' }}>{w}</motion.span>
            ))}
          </span>
        </h1>

        {/* Sub */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55, duration: 0.7 }}
          style={{ fontSize: 'clamp(15px,1.9vw,18px)', fontWeight: 500, color: 'var(--text2)', lineHeight: 1.85, maxWidth: 500, margin: '0 auto 48px' }}>
          تطبيقات جوال · Apple & Google Wallet · مواقع · أتمتة
          <br />نبني معك ما يجعل عميلك يعود دائماً.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.5 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginBottom: 20 }}>
          <a href="#live-demo" className="btn-purple" style={{ fontSize: 'clamp(14px,1.6vw,16px)', padding: '14px 32px' }}>
            شوف الديمو مباشرة ←
          </a>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ fontSize: 'clamp(14px,1.6vw,16px)', padding: '14px 28px' }}>
            تحدث معنا الآن
          </a>
        </motion.div>

        {/* Apple Wallet button */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.78, duration: 0.5 }}
          style={{ marginBottom: 44 }}>
          <a
            href="#wallet"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              background: '#000', border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 14, padding: '11px 22px',
              textDecoration: 'none', cursor: 'pointer',
              boxShadow: '0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
              transition: 'transform .15s, box-shadow .15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.12)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)'; }}
          >
            {/* Apple Wallet stacked-cards icon */}
            <svg width="38" height="30" viewBox="0 0 38 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Card 3 — blue (back) */}
              <rect x="4" y="2" width="30" height="18" rx="4" fill="#4A90D9" />
              {/* Card 2 — yellow */}
              <rect x="4" y="6" width="30" height="18" rx="4" fill="#F5C842" />
              {/* Card 1 — green */}
              <rect x="4" y="10" width="30" height="18" rx="4" fill="#5CB85C" />
              {/* Front card — beige/gray */}
              <rect x="2" y="13" width="34" height="16" rx="4" fill="#D9D4CB" />
              {/* Card stripe */}
              <rect x="2" y="18" width="34" height="5" fill="rgba(0,0,0,0.12)" />
              {/* Red chip hint */}
              <rect x="7" y="15.5" width="8" height="6" rx="1.5" fill="#E05252" opacity="0.85" />
            </svg>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', fontFamily: 'system-ui', fontWeight: 400, lineHeight: 1, marginBottom: 3 }}>
                Add to
              </div>
              <div style={{ fontSize: 19, color: '#fff', fontFamily: 'system-ui, -apple-system', fontWeight: 600, lineHeight: 1, letterSpacing: '-0.01em' }}>
                Apple Wallet
              </div>
            </div>
          </a>
        </motion.div>

        {/* Trust pills */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
          {['✓ تسليم في الموعد', '✓ دعم ٢٤/٧', '✓ كود نظيف ١٠٠٪', '✓ ضمان ٣ أشهر'].map(t => (
            <span key={t} style={{
              padding: '5px 14px', borderRadius: 99,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              fontSize: 12, fontWeight: 600, color: 'var(--text3)',
            }}>{t}</span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        style={{ position: 'absolute', bottom: 100, left: '50%', transform: 'translateX(-50%)', zIndex: 2, textAlign: 'center' }}>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={18} color="rgba(255,255,255,0.2)" />
        </motion.div>
      </motion.div>

      {/* Stats bar */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', borderTop: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: m ? 'repeat(2,1fr)' : 'repeat(4,1fr)' }}>
          {[{ end: 14, label: 'مشروع مُنجز' }, { end: 3, label: 'قطاعات مخدومة' }, { end: 95, label: 'رضا العملاء', suffix: '٪' }, { end: 24, label: 'دعم فني', suffix: '/٧' }].map((s, i) => (
            <div key={s.label} style={{ borderLeft: i > 0 ? '1px solid var(--border)' : 'none' }}>
              <Stat end={s.end} label={s.label} suffix={s.suffix ?? ''} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:768px) {
          .floating-card { display: none !important; }
        }
        @media(max-width:520px) {
          h1 { font-size: clamp(2.4rem,12vw,3.8rem) !important; }
        }
      `}</style>
    </section>
  );
}
