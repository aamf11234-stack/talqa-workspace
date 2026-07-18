import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneFrame }             from '../components/PhoneFrame';
import { BottomNav }              from '../components/BottomNav';
import type { ClinicTab }         from '../components/BottomNav';
import { ScreenHome }             from '../components/ScreenHome';
import { ScreenAppointments }     from '../components/ScreenAppointments';
import { ScreenCard }             from '../components/ScreenCard';
import { ScreenDoctors }          from '../components/ScreenDoctors';
import { ScreenNotifications }    from '../components/ScreenNotifications';

/* ─────────────────────────── data ─────────────────────────── */
const pillars = [
  { icon: '📱', title: 'تطبيق المريض',    sub: 'iOS + Android',   desc: 'بوابة صحية شاملة في جيب كل مريض',     color: '#0B4A6F' },
  { icon: '📅', title: 'حجز المواعيد',     sub: 'فوري · ٢٤/٧',    desc: 'احجز موعدك مع أي طبيب في ثوانٍ',      color: '#0D7A3E' },
  { icon: '🧪', title: 'نتائج التحاليل',   sub: 'فورية · آمنة',    desc: 'نتائج المختبر مباشرة على الهاتف',      color: '#7C3D00' },
  { icon: '🔔', title: 'إشعارات ذكية',     sub: 'أدوية · مواعيد',  desc: 'تذكيرات دقيقة تحسّن الالتزام الدوائي', color: '#3B0A6F' },
];

const features = [
  { icon: '🪪', title: 'بطاقة مريض رقمية',      desc: 'QR فوري بدون بطاقة ورقية'            },
  { icon: '📅', title: 'حجز مواعيد لحظي',        desc: 'تأكيد فوري + واتساب + تقويم'         },
  { icon: '🧪', title: 'نتائج التحاليل',          desc: 'مباشرة من المختبر للمريض'             },
  { icon: '💊', title: 'تذكيرات الأدوية',         desc: 'جدول دوائي ذكي مع إشعارات'           },
  { icon: '📋', title: 'السجل الطبي الإلكتروني',  desc: 'تاريخ طبي كامل في مكان واحد'         },
  { icon: '🩺', title: 'متابعة مزمنة ذكية',       desc: 'مرضى السكر والضغط والقلب'            },
  { icon: '📊', title: 'لوحة تحليلات الإدارة',    desc: 'إحصاء المرضى والزيارات والإيرادات'   },
  { icon: '🌐', title: 'موقع إلكتروني',           desc: 'خدمات + مواعيد + أطباء + أخبار'       },
  { icon: '📱', title: 'تطبيق iOS + Android',     desc: 'نشر على المتجرين الرسميين'            },
  { icon: '💬', title: 'رسائل واتساب آلية',        desc: 'تأكيدات + تذكيرات + نتائج'            },
  { icon: '🔒', title: 'أمان HIPAA-Ready',        desc: 'تشفير بيانات المرضى كاملاً'           },
  { icon: '🔗', title: 'تكامل أنظمة HIS/LIS',     desc: 'ربط مع الأنظمة الموجودة بسهولة'       },
];

const testimonials = [
  { name: 'عيادة الشفاء',     city: 'الرياض', quote: 'الحجوزات الإلكترونية قلّصت الانتظار ٦٠٪ في أول أسبوع', initials: 'ع', color: '#0B4A6F' },
  { name: 'مجمع النور الطبي', city: 'جدة',    quote: 'المرضى يطلبون تطبيقنا قبل ما يسألون عن الأطباء',        initials: 'م', color: '#0D7A3E' },
  { name: 'مستشفى الرعاية',   city: 'أبها',   quote: 'نتائج التحاليل الرقمية أنهت الدوامة الورقية كلياً',      initials: 'ر', color: '#7C3D00' },
];

const included = ['تسليم خلال ٦٠ يوم', 'نشر على المتجرين', 'سنة دعم مجاني', 'تدريب الفريق', 'تكامل مع HIS الحالي', 'تصميم بهوية عيادتك'];

/* ─────────────────────────── component ────────────────────── */
export default function Home() {
  const [activeTab, setActiveTab] = useState<ClinicTab>('home');

  useEffect(() => {
    document.documentElement.dir  = 'rtl';
    document.documentElement.lang = 'ar';
    document.body.style.fontFamily = "'Tajawal', sans-serif";
  }, []);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] },
  });

  return (
    <div dir="rtl" style={{ fontFamily: "'Tajawal', sans-serif", background: '#F0F6FF', minHeight: '100vh', color: '#111' }}>

      {/* ── Navbar ─────────────────────────────────────────────────── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(11,74,111,0.08)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(11,74,111,0.3)' }}>
              <span style={{ color: '#fff', fontSize: 13, fontWeight: 800 }}>ت</span>
            </div>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#0B4A6F', letterSpacing: '-0.3px' }}>تلقا تك</span>
          </div>
          <span style={{ fontSize: 12, color: '#AAA', fontWeight: 400, display: 'none' }} className="sm:block">وكالة تصميم تطبيقات ومواقع احترافية</span>
          <a href="https://wa.me/966" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 12, fontWeight: 700, color: '#0B4A6F', border: '1.5px solid rgba(11,74,111,0.25)', padding: '7px 18px', borderRadius: 999, textDecoration: 'none', transition: 'background 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(11,74,111,0.06)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            تواصل الآن
          </a>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '64px 24px 48px', textAlign: 'center' }}>
        <motion.div {...fadeUp(0)}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'linear-gradient(135deg,#0B4A6F,#0077A8)',
            color: '#fff', fontSize: 11, fontWeight: 700,
            padding: '6px 16px', borderRadius: 999, marginBottom: 24,
            letterSpacing: '0.06em', boxShadow: '0 6px 24px rgba(11,74,111,0.25)',
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E', flexShrink: 0, animation: 'pulse 2s infinite' }} />
            نظام المريض الرقمي · مخصص لعيادتك
          </span>

          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, lineHeight: 1.2, marginBottom: 20, letterSpacing: '-0.5px', color: '#0B1F30' }}>
            حوّل عيادتك إلى<br />
            <span style={{ color: '#0B4A6F' }}>تجربة صحية رقمية</span>
          </h1>

          <p style={{ fontSize: 'clamp(17px, 2.5vw, 22px)', fontWeight: 300, color: '#666', marginBottom: 16, lineHeight: 1.7 }}>
            تطبيق · مواعيد · نتائج · ذاكرة طبية · إشعارات
          </p>
          <p style={{ fontSize: 13, fontWeight: 400, color: '#999', maxWidth: 440, margin: '0 auto', lineHeight: 1.8 }}>
            منظومة رقمية متكاملة تربط مرضى عيادتك بفريقها الطبي —
            تحسّن الالتزام، تقلّل الانتظار، وتبني ثقة تدوم.
          </p>
        </motion.div>
      </section>

      {/* ── 4 Pillars ──────────────────────────────────────────────── */}
      <section style={{ maxWidth: 960, margin: '0 auto 56px', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
          {pillars.map((p, i) => (
            <motion.div key={i} {...fadeUp(i * 0.07)}
              style={{
                borderRadius: 20, padding: '22px 20px', position: 'relative', overflow: 'hidden',
                background: `linear-gradient(145deg, ${p.color}22 0%, ${p.color}44 100%)`,
                border: `1px solid ${p.color}33`,
              }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 10%, rgba(255,255,255,0.06) 0%, transparent 60%)' }} />
              <span style={{ fontSize: 28, marginBottom: 14, display: 'block' }}>{p.icon}</span>
              <p style={{ fontWeight: 800, fontSize: 15, color: '#0B1F30', marginBottom: 2 }}>{p.title}</p>
              <p style={{ fontSize: 10, color: '#888', fontWeight: 400, marginBottom: 8, letterSpacing: '0.04em' }}>{p.sub}</p>
              <p style={{ fontSize: 12, color: '#555', fontWeight: 400, lineHeight: 1.6 }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Phone Demo ─────────────────────────────────────────────── */}
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px 64px' }}>
        <motion.div {...fadeUp(0.1)} style={{ textAlign: 'center', marginBottom: 28 }}>
          <p style={{ fontSize: 11, color: '#AAA', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>نموذج توضيحي حقيقي</p>
          <h2 style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 800, color: '#0B1F30', marginBottom: 6 }}>شوف كيف يبدو تطبيق عيادتك</h2>
          <p style={{ fontSize: 13, color: '#AAA', fontWeight: 400 }}>جرّب التنقل بين الشاشات 👆</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          style={{ width: 390, position: 'relative' }}
        >
          <div style={{
            position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', zIndex: 20,
            background: '#fff', border: '1px solid rgba(11,74,111,0.15)', color: '#0B4A6F',
            fontSize: 10, fontWeight: 700, padding: '5px 14px', borderRadius: 999,
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)', whiteSpace: 'nowrap',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} />
            نموذج تفاعلي · مبني فعلياً
          </div>

          <PhoneFrame>
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden', height: '100%' }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={activeTab}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  style={{ position: 'absolute', inset: 0, overflowY: 'auto' }}
                  className="scrollbar-none"
                >
                  {activeTab === 'home'          && <ScreenHome />}
                  {activeTab === 'appointments'  && <ScreenAppointments />}
                  {activeTab === 'card'          && <ScreenCard />}
                  {activeTab === 'doctors'       && <ScreenDoctors />}
                  {activeTab === 'notifications' && <ScreenNotifications />}
                </motion.div>
              </AnimatePresence>
            </div>
            <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} notifCount={2} />
          </PhoneFrame>
        </motion.div>
      </section>

      {/* ── Features ───────────────────────────────────────────────── */}
      <section style={{ maxWidth: 960, margin: '0 auto 64px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <p style={{ fontSize: 11, color: '#AAA', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>كل ما تحصل عليه عيادتك</p>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 800, color: '#0B1F30' }}>١٢ مزية في منظومة واحدة</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 12 }}>
          {features.map((f, i) => (
            <motion.div key={i} {...fadeUp(0.03 * i)}
              style={{
                background: '#fff', borderRadius: 18, padding: '18px 16px',
                border: '1px solid rgba(11,74,111,0.07)',
                boxShadow: '0 2px 12px rgba(11,74,111,0.05)',
                transition: 'all 0.2s', cursor: 'default',
              }}
              whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(11,74,111,0.12)', borderColor: 'rgba(11,74,111,0.18)' }}
            >
              <span style={{ fontSize: 26, marginBottom: 10, display: 'block' }}>{f.icon}</span>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#0B1F30', marginBottom: 4, lineHeight: 1.4 }}>{f.title}</p>
              <p style={{ fontSize: 11, color: '#999', fontWeight: 400, lineHeight: 1.6 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Patient Card ───────────────────────────────────────────── */}
      <section style={{ maxWidth: 960, margin: '0 auto 64px', padding: '0 24px' }}>
        <div style={{
          borderRadius: 28, padding: '40px 36px', position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(145deg,#050E1A 0%,#0B3A5A 50%,#050E1A 100%)',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 20%,rgba(0,180,216,0.15) 0%,transparent 55%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: 160, height: 160, opacity: 0.05, backgroundImage: 'radial-gradient(circle,#00B4D8 1.5px,transparent 1.5px)', backgroundSize: '10px 10px' }} />

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center' }}>
            <div style={{ flex: 1, minWidth: 240 }}>
              <p style={{ color: '#00B4D8', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>بطاقة المريض الرقمية</p>
              <h3 style={{ color: '#fff', fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 800, lineHeight: 1.3, marginBottom: 12 }}>
                هوية المريض في جيبه<br />
                <span style={{ color: '#00B4D8' }}>بدون ورق · بدون انتظار</span>
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, fontWeight: 400, lineHeight: 1.8, marginBottom: 20, maxWidth: 320 }}>
                كل مريض يحمل بطاقة رقمية بمعلوماته الطبية الكاملة — QR للاستقبال، إسعاف للطوارئ، ملف صحي للتاريخ المرضي.
              </p>
              {['معلومات طبية كاملة وآمنة', 'QR فوري في الاستقبال دون إجراءات', 'ربط مباشر مع التأمين الصحي'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.55)', fontSize: 13, marginBottom: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>

            {/* Card visual */}
            <div style={{
              width: 260, borderRadius: 22, padding: '22px 20px', position: 'relative', overflow: 'hidden', flexShrink: 0,
              background: 'linear-gradient(145deg,#030810,#0B3A5A,#030810)',
              border: '1px solid rgba(0,180,216,0.2)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 0%,rgba(0,180,216,0.15) 0%,transparent 55%)' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <div>
                    <p style={{ color: '#00B4D8', fontWeight: 800, fontSize: 16 }}>عيادتك</p>
                    <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 8, letterSpacing: '0.1em' }}>DIGITAL HEALTH CARD</p>
                  </div>
                  <span style={{ fontSize: 18 }}>🏥</span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 8, marginBottom: 4 }}>PATIENT NAME</p>
                <p style={{ color: '#fff', fontSize: 14, fontWeight: 700, marginBottom: 20 }}>اسم المريض</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
                  {[['ID', '#PT-001', '#00B4D8'], ['BLOOD', 'O+', '#fff'], ['INS.', 'بوبا', 'rgba(255,255,255,0.6)']].map(([label, val, clr]) => (
                    <div key={label}>
                      <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 7, marginBottom: 3 }}>{label}</p>
                      <p style={{ color: clr, fontSize: 11, fontWeight: 700 }}>{val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────── */}
      <section style={{ maxWidth: 960, margin: '0 auto 64px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <p style={{ fontSize: 11, color: '#AAA', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>قالوا عنّا</p>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 800, color: '#0B1F30' }}>عيادات ومستشفيات تثق بتلقا تك</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {testimonials.map((t, i) => (
            <motion.div key={i} {...fadeUp(0.08 * i)}
              style={{
                background: '#fff', borderRadius: 22, padding: '24px 22px',
                border: '1px solid rgba(11,74,111,0.07)',
                boxShadow: '0 4px 20px rgba(11,74,111,0.06)',
              }}>
              <p style={{ fontSize: 14, marginBottom: 14 }}>⭐⭐⭐⭐⭐</p>
              <p style={{ fontSize: 14, color: '#444', fontWeight: 400, lineHeight: 1.8, marginBottom: 20, fontStyle: 'italic' }}>"{t.quote}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: `linear-gradient(135deg,${t.color},#00B4D8)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 800, flexShrink: 0 }}>
                  {t.initials}
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#0B1F30' }}>{t.name}</p>
                  <p style={{ fontSize: 11, color: '#AAA', fontWeight: 400 }}>{t.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section style={{ maxWidth: 520, margin: '0 auto 80px', padding: '0 24px' }}>
        <motion.div {...fadeUp(0.15)}
          style={{
            borderRadius: 28, padding: '44px 36px', textAlign: 'center', position: 'relative', overflow: 'hidden',
            background: 'linear-gradient(145deg,#050E1A 0%,#0B3A5A 50%,#050E1A 100%)',
            boxShadow: '0 30px 80px rgba(11,74,111,0.3)',
          }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%,rgba(0,180,216,0.2) 0%,transparent 60%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: 140, height: 140, opacity: 0.04, backgroundImage: 'radial-gradient(circle,#00B4D8 1.5px,transparent 1.5px)', backgroundSize: '10px 10px' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ color: '#00B4D8', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>سعر إطلاق خاص</p>
            <p style={{ color: '#fff', fontSize: 56, fontWeight: 900, lineHeight: 1, marginBottom: 6, letterSpacing: '-1px' }}>25,000</p>
            <p style={{ color: '#00B4D8', fontSize: 18, fontWeight: 400, marginBottom: 8 }}>ريال سعودي</p>
            <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: 12, fontWeight: 400, marginBottom: 28, lineHeight: 1.7 }}>
              iOS + Android · موقع · نتائج رقمية · حجوزات · سجل طبي · دعم كامل
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 16px', marginBottom: 32, textAlign: 'right' }}>
              {included.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00B4D8', flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>

            <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
              style={{
                display: 'block', width: '100%', background: '#fff',
                fontWeight: 800, fontSize: 15, padding: '16px 0', borderRadius: 16,
                color: '#0B4A6F', textDecoration: 'none',
                boxShadow: '0 10px 32px rgba(0,0,0,0.25)',
                transition: 'transform 0.15s, background 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.background = '#F0F8FF'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = '#fff'; }}>
              ابدأ مشروع عيادتك مع تلقا تك 🚀
            </a>
            <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11, marginTop: 14, fontWeight: 400 }}>تواصل معنا على واتساب للاستفسار المجاني</p>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer style={{ textAlign: 'center', paddingBottom: 40, paddingTop: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: 8, background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: 10, fontWeight: 800 }}>ت</span>
          </div>
          <span style={{ fontSize: 14, fontWeight: 800, color: '#0B1F30' }}>تلقا تك</span>
        </div>
        <p style={{ fontSize: 11, color: '#CCC', fontWeight: 400 }}>وكالة تصميم تطبيقات ومواقع احترافية · جميع الحقوق محفوظة ٢٠٢٥</p>
      </footer>

    </div>
  );
}
