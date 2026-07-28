import { motion } from 'framer-motion';
import { Link } from 'wouter';
import PageLayout from './PageLayout';
import { useIsMobile } from '../hooks/useIsMobile';
import {
  CheckCircle2, ArrowUpLeft, Star, Zap,
  QrCode, Bell, BarChart3, Wallet, MapPin, Clock
} from 'lucide-react';

const WA = 'https://wa.me/966551378531?text=' + encodeURIComponent('السلام عليكم، أبي نظام تطبيق المطاعم والكافيهات بـ٤٩٩ ريال');

const A = '#F59E0B';   // amber
const A2 = '#EF4444';  // red
const AG = `linear-gradient(135deg, ${A}, ${A2})`;

/* ── PHONE MOCKUP ── */
function FoodPhone({ m }: { m: boolean }) {
  return (
    <div style={{ position: 'relative', width: 270 }}>
      {/* Glow */}
      <div style={{ position: 'absolute', inset: -80, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.22) 0%, transparent 65%)', pointerEvents: 'none' }} />

      {/* Floating pill — top right */}
      {!m && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}
          style={{ position: 'absolute', top: 52, right: -60, zIndex: 10, background: 'rgba(10,8,2,0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 14, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 16px 40px rgba(0,0,0,0.5)' }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BarChart3 size={14} color={A} />
          </div>
          <div>
            <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 14, color: '#fff', lineHeight: 1 }}>+٣٥٪</div>
            <div style={{ fontFamily: 'Cairo,sans-serif', fontSize: 9, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>عودة العملاء</div>
          </div>
        </motion.div>
      )}

      {/* Floating pill — bottom left */}
      {!m && (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }}
          style={{ position: 'absolute', bottom: 90, left: -68, zIndex: 10, background: 'rgba(10,8,2,0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 14, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 16px 40px rgba(0,0,0,0.5)', maxWidth: 190 }}>
          <div style={{ width: 26, height: 26, borderRadius: 8, background: 'rgba(16,185,129,0.15)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bell size={12} color="#10B981" />
          </div>
          <div>
            <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 800, fontSize: 10, color: '#fff', lineHeight: 1.3 }}>طلب جديد</div>
            <div style={{ fontFamily: 'Cairo,sans-serif', fontSize: 8.5, color: '#10B981', marginTop: 2 }}>أحمد · افقاتو براون ☕</div>
          </div>
        </motion.div>
      )}

      {/* Phone shell */}
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: 270, height: 520, borderRadius: 46, background: 'linear-gradient(160deg,#1a0f02 0%,#0a0500 100%)', border: '1.5px solid rgba(245,158,11,0.18)', boxShadow: ['0 60px 130px rgba(0,0,0,0.75)', '0 0 100px rgba(245,158,11,0.14)', 'inset 0 1px 0 rgba(255,255,255,0.06)'].join(', '), position: 'relative', overflow: 'hidden', padding: '16px 14px' }}>

        {/* Sheen */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 220, background: 'linear-gradient(180deg,rgba(245,158,11,0.07) 0%,transparent 100%)', pointerEvents: 'none' }} />

        {/* Notch */}
        <div style={{ width: 80, height: 24, borderRadius: 12, background: '#000', margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#1a1a1a', border: '1px solid #333' }} />
          <div style={{ width: 34, height: 5, borderRadius: 3, background: '#111' }} />
        </div>

        {/* App screen */}
        <div style={{ height: 420, borderRadius: 30, overflow: 'hidden', background: 'linear-gradient(160deg,rgba(245,158,11,0.10) 0%,rgba(6,4,0,0.98) 100%)', border: '1px solid rgba(245,158,11,0.14)', padding: 16 }}>

          {/* Status bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>9:41</span>
            <div style={{ display: 'flex', gap: 3 }}>
              {[1,2,3].map(i => <div key={i} style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />)}
            </div>
          </div>

          {/* App header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: AG, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, boxShadow: '0 6px 20px rgba(245,158,11,0.35)' }}>
              ☕
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 900, color: '#fff', fontFamily: 'Cairo,sans-serif' }}>كافيه النخبة</div>
              <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', fontFamily: 'Cairo,sans-serif' }}>مدعوم بتلقا تك</div>
            </div>
            <div style={{ marginRight: 'auto', width: 7, height: 7, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px rgba(16,185,129,0.8)' }} />
          </div>

          {/* Revenue hero */}
          <div style={{ padding: '14px', borderRadius: 16, background: 'linear-gradient(135deg,rgba(245,158,11,0.18),rgba(239,68,68,0.10))', border: '1px solid rgba(245,158,11,0.22)', marginBottom: 10 }}>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.5)', fontFamily: 'Cairo,sans-serif', marginBottom: 4 }}>طلبات اليوم</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: -1, lineHeight: 1, fontFamily: 'Cairo,sans-serif' }}>٨٤</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
              <span style={{ fontSize: 8, color: '#10B981', fontWeight: 800, background: 'rgba(16,185,129,0.12)', padding: '2px 6px', borderRadius: 99 }}>↑٢٨٪</span>
              <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', fontFamily: 'Cairo,sans-serif' }}>من أمس</span>
            </div>
          </div>

          {/* Feature rows */}
          {[
            { icon: '💳', label: 'Apple Wallet', active: true },
            { icon: '📊', label: 'لوحة التحكم', active: false },
            { icon: '🔔', label: 'إشعارات تلقائية', active: false },
            { icon: '🗺️', label: 'تتبع التوصيل', active: false },
          ].map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7, padding: '7px 10px', borderRadius: 11, background: f.active ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.025)', border: `1px solid ${f.active ? 'rgba(245,158,11,0.22)' : 'rgba(255,255,255,0.05)'}` }}>
              <span style={{ fontSize: 13, flexShrink: 0 }}>{f.icon}</span>
              <span style={{ fontSize: 9, fontWeight: 700, color: f.active ? '#fff' : 'rgba(255,255,255,0.4)', fontFamily: 'Cairo,sans-serif', flex: 1 }}>{f.label}</span>
              {f.active && <CheckCircle2 size={9} strokeWidth={2.5} color="#10B981" />}
            </div>
          ))}
        </div>

        {/* Home bar */}
        <div style={{ width: 80, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.12)', margin: '10px auto 0' }} />
      </motion.div>
    </div>
  );
}

/* ── BENTO FEATURES ── */
const FEATURES = [
  { icon: '💳', title: 'Apple & Google Wallet', desc: 'بطاقة ولاء رقمية تُضاف لجوال العميل بلمسة — نقاط تلقائية لكل طلب وتنبيه NFC عند دخول الفرع.', big: true },
  { icon: '📱', title: 'قائمة QR تفاعلية', desc: 'منيو رقمي يُحدَّث فوراً بدون طباعة.', big: false },
  { icon: '🛵', title: 'طلب + توصيل', desc: 'يطلب من الجوال ويتابع التوصيل لحظياً.', big: false },
  { icon: '🤖', title: 'AI يرسل العروض', desc: 'يحلل عادات الشراء ويرسل الكوبون الصح.', big: false },
  { icon: '📊', title: 'إحصائيات المبيعات', desc: 'أكثر صنف، أكثر وقت، أعلى قيمة طلب.', big: false },
  { icon: '🔔', title: 'إشعارات واتساب', desc: 'شكراً على الطلب، تذكير بالنقاط، عرض خاص.', big: false },
];

/* ── MAIN PAGE ── */
export default function FoodPage() {
  const m = useIsMobile();

  return (
    <PageLayout accent={A}>

      {/* ════════════════ HERO ════════════════ */}
      <section style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: m ? '1fr' : '1fr 1fr',
        alignItems: 'center',
        padding: m ? '100px 20px 60px' : 'clamp(100px,12vw,140px) clamp(24px,5vw,80px) 80px',
        maxWidth: 1280, margin: '0 auto',
        position: 'relative', gap: 0,
      }}>
        {/* Ambient blobs */}
        <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 700, height: 700, borderRadius: '50%', background: A, filter: 'blur(220px)', opacity: 0.055 }} />
          <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: 600, height: 600, borderRadius: '50%', background: A2, filter: 'blur(200px)', opacity: 0.045 }} />
        </div>

        {/* LEFT — text */}
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
          style={{ paddingRight: m ? 0 : 48 }}>

          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>
              ☕
            </div>
            <span style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: 11, color: A, letterSpacing: 2.5, textTransform: 'uppercase' }}>
              المطاعم والكافيهات
            </span>
          </div>

          {/* Headline */}
          <h1 style={{ fontWeight: 900, fontSize: 'clamp(2.8rem,5.5vw,4.8rem)', letterSpacing: '-0.045em', lineHeight: 1.05, marginBottom: 28, fontFamily: 'Cairo,sans-serif' }}>
            <span style={{ display: 'block', color: '#fff' }}>كافيهك أو مطعمك</span>
            <span style={{ display: 'block', background: AG, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              يستاهل تطبيق يليق به
            </span>
          </h1>

          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, marginBottom: 40, maxWidth: 460, fontFamily: 'Cairo,sans-serif', fontWeight: 500 }}>
            تطبيق جوال كامل بهوية نشاطك — قائمة QR، Apple Wallet، نقاط ولاء، طلب وتوصيل.
            يُسلَّم في أسبوعين ويبدأ يرجّع العميل تلقائياً.
          </p>

          {/* Feature chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
            {['Apple & Google Wallet', 'قائمة QR', 'طلب توصيل', 'إحصائيات مبيعات'].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 99, background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.18)', fontFamily: 'Cairo,sans-serif', fontWeight: 700, fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: A, flexShrink: 0 }} />
                {f}
              </div>
            ))}
          </div>

          {/* Price badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16, padding: '18px 28px', borderRadius: 20, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.22)', marginBottom: 36, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(245,158,11,0.05),transparent)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'Cairo,sans-serif', marginBottom: 2 }}>السعر الكامل</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 42, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>٤٩٩</span>
                <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>ريال</span>
              </div>
              <div style={{ fontSize: 11, color: A, fontWeight: 700, fontFamily: 'Cairo,sans-serif', marginTop: 3 }}>دفعة واحدة · بلا رسوم شهرية</div>
            </div>
            <div style={{ width: 1, height: 52, background: 'rgba(245,158,11,0.2)' }} />
            <div>
              {['تسليم أسبوعين', 'دعم ٣ أشهر'].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <CheckCircle2 size={12} strokeWidth={2.5} color={A} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.6)', fontFamily: 'Cairo,sans-serif' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <motion.a href={WA} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.03, boxShadow: '0 20px 50px rgba(245,158,11,0.40)' }}
              whileTap={{ scale: 0.97 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '15px 32px', borderRadius: 14, background: AG, color: '#fff', fontFamily: 'Cairo,sans-serif', fontSize: 15, fontWeight: 900, textDecoration: 'none', boxShadow: '0 12px 36px rgba(245,158,11,0.30)' }}>
              ابدأ مشروعك الآن
              <ArrowUpLeft size={16} strokeWidth={2.5} />
            </motion.a>
            <Link href="/sectors/cafes"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 24px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.7)', fontFamily: 'Cairo,sans-serif', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
              شاهد تفاصيل الكافيهات
            </Link>
          </div>
        </motion.div>

        {/* RIGHT — phone */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: [0.22,1,0.36,1] }}
          style={{ display: m ? 'none' : 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft: 40 }}>
          <FoodPhone m={m} />
        </motion.div>
      </section>

      {/* ════════════════ STATS ════════════════ */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: m ? 'repeat(2,1fr)' : 'repeat(4,1fr)' }}>
            {[
              { n: '+١٢٠', l: 'كافيه ومطعم يستخدم نظامنا' },
              { n: '٣٥٪', l: 'زيادة في عودة العملاء' },
              { n: '١٤ يوم', l: 'وقت التسليم' },
              { n: '٤٩٩', l: 'ريال فقط — دفعة واحدة' },
            ].map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ padding: m ? '32px 20px' : '52px 32px', borderRight: m ? (i%2===0 ? '1px solid rgba(255,255,255,0.06)' : 'none') : (i<3 ? '1px solid rgba(255,255,255,0.06)' : 'none'), borderBottom: m && i<2 ? '1px solid rgba(255,255,255,0.06)' : 'none', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 32, width: 28, height: 2, background: AG, borderRadius: 1 }} />
                <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 'clamp(2.4rem,3vw,3.6rem)', color: '#fff', letterSpacing: -2, lineHeight: 1, marginBottom: 10 }}>{s.n}</div>
                <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 600, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ FEATURES ════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ marginBottom: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: A, boxShadow: `0 0 8px ${A}` }} />
                <span style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: 11, color: A, letterSpacing: 2.5, textTransform: 'uppercase' }}>FEATURES</span>
              </div>
              <h2 style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 'clamp(2rem,3.5vw,3rem)', color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                منظومة رقمية كاملة<br />لنشاطك الغذائي
              </h2>
            </div>
            <p style={{ fontFamily: 'Cairo,sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.5)', maxWidth: 360, lineHeight: 1.8 }}>
              مش مجرد تطبيق — نظام يشتغل وأنت نايم ويرجّع العميل تلقائياً.
            </p>
          </div>

          {/* Bento */}
          <div>
            {/* Row 1 */}
            <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1.7fr 1fr', gap: 12, marginBottom: 12 }}>
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                style={{ padding: '36px 32px', borderRadius: 24, background: 'linear-gradient(135deg,rgba(245,158,11,0.12) 0%,rgba(6,4,0,0.96) 100%)', border: '1px solid rgba(245,158,11,0.22)', position: 'relative', overflow: 'hidden', minHeight: 220 }}>
                <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: `radial-gradient(circle,rgba(245,158,11,0.12) 0%,transparent 70%)`, pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,rgba(245,158,11,0.5),transparent)` }} />
                <div style={{ width: 52, height: 52, borderRadius: 16, marginBottom: 20, background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>💳</div>
                <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 19, color: '#fff', marginBottom: 10 }}>بطاقة Apple & Google Wallet</div>
                <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 500, fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75 }}>نقاط تُضاف تلقائياً لكل طلب — تنبيه فوري لما يقترب من الجائزة. تُضاف لـ iPhone بلمسة واحدة.</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
                style={{ padding: '32px 28px', borderRadius: 24, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden', minHeight: 220 }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: 3, bottom: 0, background: `linear-gradient(180deg,${A},transparent)`, opacity: 0.5 }} />
                <div style={{ width: 46, height: 46, borderRadius: 14, marginBottom: 18, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>📱</div>
                <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 16, color: '#fff', marginBottom: 8 }}>قائمة QR تفاعلية</div>
                <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 500, fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}>عميلك يطلب من جواله مباشرة — تُحدَّث فوراً بدون طباعة.</div>
              </motion.div>
            </div>
            {/* Row 2 */}
            <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: 12 }}>
              {[
                { icon: '🛵', title: 'طلب وتوصيل', desc: 'يطلب من الجوال ويتابع التوصيل لحظياً مع خريطة مباشرة.' },
                { icon: '🤖', title: 'AI يرسل العروض', desc: 'يحلل عادات الشراء ويرسل الكوبون الصح في الوقت الصح.' },
                { icon: '📊', title: 'إحصائيات مبيعات', desc: 'أكثر صنف، أوقات الذروة، أعلى قيمة طلب — كل شيء أمامك.' },
              ].map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*0.07 }}
                  style={{ padding: '26px 24px', borderRadius: 20, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,rgba(245,158,11,0.3),transparent)` }} />
                  <div style={{ width: 42, height: 42, borderRadius: 13, marginBottom: 16, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{f.icon}</div>
                  <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 800, fontSize: 14.5, color: '#fff', marginBottom: 8 }}>{f.title}</div>
                  <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 500, fontSize: 12.5, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{f.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ HOW IT WORKS ════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,120px) clamp(24px,5vw,80px)', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: A }} />
            <span style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: 11, color: A, letterSpacing: 2.5, textTransform: 'uppercase' }}>HOW IT WORKS</span>
          </div>
          <h2 style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 'clamp(2rem,3vw,2.8rem)', color: '#fff', letterSpacing: '-0.04em', marginBottom: 56 }}>
            من الفكرة للتطبيق في أسبوعين
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: 24, position: 'relative' }}>
            {!m && <div style={{ position: 'absolute', top: '50%', left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(245,158,11,0.2),transparent)', transform: 'translateY(-50%)' }} />}
            {[
              { s: '١', icon: '🎯', t: 'تحليل مجاني', d: 'نجلس معك ساعة نفهم نشاطك وعملاءك والهدف.' },
              { s: '٢', icon: '⚡', t: 'بناء في أسبوعين', d: 'نبني التطبيق والبطاقة ولوحة التحكم كاملة.' },
              { s: '٣', icon: '🚀', t: 'إطلاق وتدريب', d: 'نطلق معك ونتابع الأداء ٣ أشهر مجاناً.' },
            ].map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*0.1 }}
                style={{ background: 'rgba(10,8,2,0.9)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 24, padding: '36px 28px', position: 'relative', zIndex: 2 }}>
                <div style={{ width: 60, height: 60, borderRadius: 18, background: 'rgba(245,158,11,0.10)', border: '1px solid rgba(245,158,11,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, margin: '0 auto 20px', boxShadow: '0 8px 24px rgba(245,158,11,0.12)' }}>
                  {step.icon}
                </div>
                <div style={{ fontSize: 11, color: A, fontWeight: 700, letterSpacing: 2, marginBottom: 10, fontFamily: 'sans-serif', textTransform: 'uppercase' }}>الخطوة {step.s}</div>
                <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 18, color: '#fff', marginBottom: 10 }}>{step.t}</div>
                <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 500, fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{step.d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ PRICING CTA ════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,120px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            style={{ background: 'linear-gradient(135deg,rgba(245,158,11,0.12),rgba(239,68,68,0.07))', border: '1px solid rgba(245,158,11,0.28)', borderRadius: 36, padding: '52px 44px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>

            <div style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(245,158,11,0.09)', filter: 'blur(60px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,rgba(245,158,11,0.5),transparent)` }} />

            {/* Best value badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: AG, color: '#fff', padding: '5px 16px', borderRadius: 99, fontSize: 12, fontWeight: 800, marginBottom: 28, fontFamily: 'Cairo,sans-serif' }}>
              <Zap size={12} fill="#fff" />
              الأفضل قيمة في السوق
            </div>

            <div style={{ marginBottom: 10 }}>
              <span style={{ fontSize: 72, fontWeight: 900, color: '#fff', letterSpacing: '-0.05em', lineHeight: 1, fontFamily: 'Cairo,sans-serif' }}>٤٩٩</span>
              <span style={{ fontSize: 24, color: 'rgba(255,255,255,0.45)', fontWeight: 600, marginRight: 8 }}>ريال</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 36, fontSize: 14, fontFamily: 'Cairo,sans-serif' }}>دفعة واحدة · ملكيتك الكاملة · بلا رسوم شهرية</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 40, textAlign: 'right' }}>
              {[
                'تطبيق جوال كامل بهوية نشاطك',
                'بطاقة Apple & Google Wallet',
                'قائمة QR تفاعلية',
                'نظام طلب وتوصيل',
                'لوحة تحكم وإحصائيات',
                'دعم واتساب ٣ أشهر',
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, direction: 'rtl' }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.30)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckCircle2 size={12} color={A} strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', fontWeight: 600, fontFamily: 'Cairo,sans-serif' }}>{f}</span>
                </div>
              ))}
            </div>

            <motion.a href={WA} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.03, boxShadow: '0 20px 50px rgba(245,158,11,0.40)' }} whileTap={{ scale: 0.97 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: AG, color: '#fff', padding: '17px 28px', borderRadius: 16, fontWeight: 900, fontSize: 17, textDecoration: 'none', boxShadow: '0 12px 36px rgba(245,158,11,0.30)', fontFamily: 'Cairo,sans-serif' }}>
              احجز تطبيقك الآن
              <ArrowUpLeft size={18} strokeWidth={2.5} />
            </motion.a>

            <p style={{ marginTop: 20, fontSize: 12, color: 'rgba(255,255,255,0.3)', fontFamily: 'Cairo,sans-serif' }}>
              رد خلال ساعة · تحليل مجاني قبل البدء
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════ TESTIMONIAL ════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ padding: '44px 40px', borderRadius: 28, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', textAlign: 'center', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 24 }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill={A} color={A} />)}
            </div>
            <p style={{ fontFamily: 'Cairo,sans-serif', fontSize: 18, color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, marginBottom: 28, fontWeight: 500 }}>
              "قبل تلقا كنا نخسر عملاء كل أسبوع — بعد ٣ أشهر من نظام الولاء، المبيعات ارتفعت ٤٢٪ وعودة العملاء صارت ثلاثة أضعاف."
            </p>
            <div>
              <div style={{ fontFamily: 'Cairo,sans-serif', fontWeight: 900, fontSize: 15, color: '#fff' }}>خالد العتيبي</div>
              <div style={{ fontFamily: 'Cairo,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>صاحب سلسلة كافيهات · الرياض</div>
            </div>
          </motion.div>
        </div>
      </section>

    </PageLayout>
  );
}
