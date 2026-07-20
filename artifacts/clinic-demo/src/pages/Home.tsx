import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import { PhoneFrame }             from '../components/PhoneFrame';
import { BottomNav }              from '../components/BottomNav';
import type { ClinicTab }         from '../components/BottomNav';
import { ScreenHome }             from '../components/ScreenHome';
import { ScreenAppointments }     from '../components/ScreenAppointments';
import { ScreenCard }             from '../components/ScreenCard';
import { ScreenNotifications }    from '../components/ScreenNotifications';
import { ScreenAI }               from '../components/ScreenAI';
import { ScreenTelemedicine }     from '../components/ScreenTelemedicine';

/* ── Face ID Lock Screen ──────────────────────────────────────── */
function FaceIDScreen({ onUnlock }: { onUnlock: () => void }) {
  const [phase, setPhase] = useState<'idle'|'scanning'|'done'>('idle');

  const scan = () => {
    setPhase('scanning');
    setTimeout(() => { setPhase('done'); setTimeout(onUnlock, 800); }, 2000);
  };

  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col items-center justify-between py-10"
      style={{ background: 'linear-gradient(175deg,#050E1A 0%,#0B1A30 50%,#050E1A 100%)', fontFamily: 'Tajawal,sans-serif' }}
      exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.5 }}>

      {/* top */}
      <div className="text-center mt-6">
        <div className="flex items-center justify-center gap-2 mb-1">
          <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)' }}>
            <span className="text-white text-[8px] font-bold">ت</span>
          </div>
          <span className="text-white/70 text-[12px] font-bold">عيادة الشفاء</span>
        </div>
        <p className="text-white/30 text-[10px]">الاثنين، ٢٠ يوليو</p>
      </div>

      {/* face id area */}
      <div className="flex flex-col items-center">
        {/* face scan ring */}
        <div className="relative mb-8">
          {/* outer rings */}
          {phase === 'scanning' && [1,2,3].map(n => (
            <motion.div key={n} className="absolute inset-0 rounded-full border"
              style={{ margin: -n * 14, borderColor: `rgba(0,180,216,${0.3 / n})` }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: n * 0.2 }} />
          ))}

          <motion.div
            className="w-28 h-28 rounded-full flex items-center justify-center relative overflow-hidden"
            style={{ border: `2px solid ${phase === 'done' ? '#10B981' : phase === 'scanning' ? '#00B4D8' : 'rgba(255,255,255,0.15)'}`,
              background: 'rgba(255,255,255,0.04)', transition: 'border-color 0.4s' }}>

            {/* scan beam */}
            {phase === 'scanning' && (
              <motion.div className="absolute left-0 right-0 h-0.5 pointer-events-none"
                style={{ background: 'linear-gradient(90deg,transparent,#00B4D8,transparent)', top: 0 }}
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }} />
            )}

            <span className="text-[52px] relative z-10">
              {phase === 'done' ? '✅' : '🫥'}
            </span>
          </motion.div>
        </div>

        {/* face outline dots */}
        {phase === 'scanning' && (
          <motion.div className="absolute" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {[
              { top: '28%', left: '38%' }, { top: '28%', left: '58%' },
              { top: '36%', left: '30%' }, { top: '36%', left: '66%' },
              { top: '44%', left: '34%' }, { top: '44%', left: '62%' },
              { top: '50%', left: '48%' },
              { top: '56%', left: '40%' }, { top: '56%', left: '56%' },
            ].map((s, i) => (
              <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-[#00B4D8]"
                style={s} animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }} />
            ))}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {phase === 'idle' && (
            <motion.div key="idle" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-center">
              <p className="text-white text-[16px] font-black mb-1">مرحباً، أحمد 👋</p>
              <p className="text-white/40 text-[11px] mb-6">افتح التطبيق بـ Face ID</p>
              <motion.button onClick={scan} whileTap={{ scale: 0.94 }}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-white text-[13px] font-black"
                style={{ background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)', boxShadow: '0 8px 28px rgba(0,180,216,0.35)' }}>
                <span className="text-[18px]">🔒</span> فتح بـ Face ID
              </motion.button>
            </motion.div>
          )}
          {phase === 'scanning' && (
            <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
              <p className="text-[#00B4D8] text-[14px] font-black mb-1">جاري مسح الوجه…</p>
              <p className="text-white/30 text-[10px]">ابقَ نظراً للشاشة</p>
            </motion.div>
          )}
          {phase === 'done' && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <p className="text-[#10B981] text-[15px] font-black mb-1">تم التعرف ✓</p>
              <p className="text-white/30 text-[10px]">يفتح التطبيق…</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* bottom */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-2 flex-wrap justify-center">
          {['Face ID','Touch ID','AES-256'].map(b => (
            <span key={b} className="text-[8px] font-bold px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(0,180,216,0.1)', color: 'rgba(0,180,216,0.7)', border: '1px solid rgba(0,180,216,0.15)' }}>{b}</span>
          ))}
        </div>
        <button onClick={onUnlock} className="text-white/20 text-[10px]">دخول بكلمة المرور</button>
      </div>
    </motion.div>
  );
}

/* ── data ──────────────────────────────────────────────────────── */
const pillars = [
  { icon: '📱', title: 'تطبيق المريض',    sub: 'iOS + Android',   desc: 'بوابة صحية شاملة في جيب كل مريض',      bg: 'linear-gradient(145deg,#050E1A,#0B3A5A,#050E1A)' },
  { icon: '📅', title: 'حجز المواعيد',     sub: 'فوري · ٢٤/٧',    desc: 'احجز موعدك مع أي طبيب في ثوانٍ',       bg: 'linear-gradient(145deg,#060A06,#0D2814,#060A06)' },
  { icon: '🧪', title: 'نتائج التحاليل',   sub: 'فورية · آمنة',    desc: 'نتائج المختبر مباشرة على هاتف المريض', bg: 'linear-gradient(145deg,#0A0800,#2E1800,#0A0800)' },
  { icon: '🔔', title: 'إشعارات ذكية',     sub: 'أدوية · مواعيد',  desc: 'تذكيرات دقيقة تحسّن الالتزام الدوائي',  bg: 'linear-gradient(145deg,#080012,#1A0030,#080012)' },
];

const allFeatures = [
  { icon: '🪪', title: 'بطاقة مريض رقمية',       desc: 'QR فوري بدون بطاقة ورقية'               },
  { icon: '📅', title: 'حجز مواعيد لحظي',         desc: 'تأكيد فوري + واتساب + تقويم'            },
  { icon: '🧪', title: 'نتائج التحاليل',           desc: 'مباشرة من المختبر للمريض'                },
  { icon: '💊', title: 'تذكيرات الأدوية',          desc: 'جدول دوائي ذكي مع إشعارات'              },
  { icon: '❤️', title: 'Apple Health',             desc: 'مزامنة تلقائية مع بيانات صحتك'           },
  { icon: '⌚', title: 'Apple Watch',              desc: 'مؤشرات حيوية على معصمك مباشرة'          },
  { icon: '👨‍👩‍👧', title: 'إدارة التابعين',         desc: 'صحة عائلتك في مكان واحد'               },
  { icon: '🎫', title: 'Apple Wallet',             desc: 'تذكرة موعدك في المحفظة تلقائياً'         },
  { icon: '📋', title: 'السجل الطبي الإلكتروني',   desc: 'تاريخ طبي كامل في مكان واحد'            },
  { icon: '🩺', title: 'متابعة مزمنة ذكية',        desc: 'مرضى السكر والضغط والقلب'               },
  { icon: '📊', title: 'لوحة تحليلات الإدارة',     desc: 'إحصاء المرضى والزيارات والإيرادات'      },
  { icon: '🌐', title: 'موقع إلكتروني',            desc: 'خدمات + مواعيد + أطباء + أخبار'          },
  { icon: '💬', title: 'رسائل واتساب آلية',        desc: 'تأكيدات + تذكيرات + نتائج'               },
  { icon: '🔒', title: 'أمان HIPAA-Ready',         desc: 'تشفير بيانات المرضى كاملاً'              },
  { icon: '🔗', title: 'تكامل أنظمة HIS/LIS',      desc: 'ربط مع الأنظمة الموجودة بسهولة'          },
  { icon: '🤖', title: 'AI Doctor',                desc: 'تحليل أعراض بالذكاء الاصطناعي'          },
  { icon: '📹', title: 'استشارة فيديو',            desc: 'تليميديسن مشفر ٢٤/٧'                     },
  { icon: '💉', title: 'باقات جلسات',              desc: 'ليزر · علاج طبيعي · جمالي'              },
];

const testimonials = [
  { name: 'عيادة الشفاء',       city: 'الرياض', quote: 'الحجوزات الإلكترونية قلّصت الانتظار ٦٠٪ في أول أسبوع',   initials: 'ع' },
  { name: 'مجمع النور الطبي',   city: 'جدة',    quote: 'المرضى يطلبون تطبيقنا قبل ما يسألون عن الأطباء',         initials: 'م' },
  { name: 'مستشفى الرعاية',     city: 'أبها',   quote: 'نتائج التحاليل الرقمية أنهت الدوامة الورقية كلياً',       initials: 'ر' },
];

const included = ['تسليم خلال ٦٠ يوم','نشر على المتجرين','سنة دعم مجاني','تدريب الفريق','تكامل مع HIS الحالي','تصميم بهوية عيادتك'];

/* ── component ─────────────────────────────────────────────────── */
export default function Home() {
  const [activeTab, setActiveTab] = useState<ClinicTab>('home');
  const [showFaceID, setShowFaceID] = useState(true);
  const [, navigate] = useLocation();

  useEffect(() => {
    document.documentElement.dir  = 'rtl';
    document.documentElement.lang = 'ar';
  }, []);

  return (
    <div className="min-h-screen w-full" style={{ background: 'linear-gradient(180deg,#EBF5FF 0%,#E0EFFD 100%)', fontFamily: "'Tajawal', sans-serif" }} dir="rtl">

      {/* ── Navbar ─────────────────────────────────────────────── */}
      <div className="sticky top-0 z-50 border-b border-[rgba(11,74,111,0.1)] bg-white/88 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shadow-[0_2px_8px_rgba(11,74,111,0.25)]"
              style={{ background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)' }}>
              <span className="text-white text-[10px] font-bold">ت</span>
            </div>
            <span className="text-[14px] font-bold text-[#111]">تلقا تك</span>
          </div>
          <span className="text-[11px] text-[#AAA] font-light hidden sm:block">وكالة تصميم تطبيقات ومواقع احترافية</span>
          <a href="https://wa.me/966" target="_blank" rel="noopener noreferrer"
            className="text-[11px] font-semibold text-[#0B4A6F] border border-[rgba(11,74,111,0.2)] px-3.5 py-1.5 rounded-full hover:bg-[#0B4A6F]/5 transition-colors">
            تواصل الآن
          </a>
        </div>
      </div>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-8 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-flex items-center gap-2 text-white text-[11px] font-semibold px-4 py-1.5 rounded-full mb-5 tracking-widest shadow-[0_4px_20px_rgba(0,180,216,0.25)]"
            style={{ background: 'linear-gradient(135deg,#0B4A6F,#0077A8)' }}>
            <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse shrink-0" />
            نظام المريض الرقمي · مخصص لعيادتك
          </span>
          <h1 className="text-[34px] md:text-[46px] font-bold text-[#111] leading-tight mb-4 tracking-tight">
            حوّل عيادتك إلى<br />
            <span style={{ color: '#0B4A6F' }}>تجربة صحية رقمية</span>
          </h1>
          <p className="text-[20px] md:text-[26px] font-light text-[#777] mb-5 leading-relaxed">
            تطبيق · مواعيد · نتائج · AI · تليميديسن
          </p>
          <p className="text-[13px] text-[#999] font-light max-w-md mx-auto leading-relaxed">
            منظومة رقمية متكاملة تربط مرضى عيادتك بفريقها الطبي —
            تحسّن الالتزام، تقلّل الانتظار، وتبني ثقة تدوم.
          </p>
        </motion.div>
      </div>

      {/* ── 4 Pillars ──────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {pillars.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="rounded-[20px] p-5 relative overflow-hidden" style={{ background: p.bg }}>
              <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 10%,rgba(0,180,216,0.12) 0%,transparent 60%)' }} />
              <span className="text-2xl mb-3 block">{p.icon}</span>
              <p className="text-white text-[14px] font-bold mb-0.5 relative">{p.title}</p>
              <p className="text-white/35 text-[10px] font-light mb-1.5 relative">{p.sub}</p>
              <p className="text-white/55 text-[11px] font-light relative leading-snug">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Phone Demo ─────────────────────────────────────────── */}
      <div className="flex flex-col items-center px-4 mb-10">
        <div className="text-center mb-5">
          <p className="text-[11px] text-[#AAA] font-semibold tracking-widest uppercase mb-1">نموذج توضيحي حقيقي</p>
          <h2 className="text-[22px] font-bold text-[#111]">شوف كيف يبدو تطبيق عيادتك</h2>
          <p className="text-[12px] text-[#AAA] mt-1 font-light">جرّب جميع الشاشات — بما فيها Face ID وAI Doctor 👆</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 28, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          style={{ width: 390 }} className="relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 bg-white border border-[rgba(11,74,111,0.15)] text-[#0B4A6F] text-[10px] font-bold px-3 py-1 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.1)] whitespace-nowrap flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />
            نموذج تفاعلي · مبني فعلياً
          </div>

          <PhoneFrame>
            <div className="flex-1 relative overflow-hidden h-full">
              {/* Face ID overlay */}
              <AnimatePresence>
                {showFaceID && (
                  <FaceIDScreen onUnlock={() => setShowFaceID(false)} />
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={activeTab}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 overflow-y-auto scrollbar-none">
                  {activeTab === 'home'          && <ScreenHome />}
                  {activeTab === 'appointments'  && <ScreenAppointments />}
                  {activeTab === 'card'          && <ScreenCard />}
                  {activeTab === 'ai'            && <ScreenAI />}
                  {activeTab === 'telemedicine'  && <ScreenTelemedicine />}
                  {activeTab === 'notifications' && <ScreenNotifications />}
                </motion.div>
              </AnimatePresence>
            </div>
            <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} notifCount={2} />
          </PhoneFrame>
        </motion.div>
      </div>

      {/* ── Owner Dashboard CTA ────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="rounded-[28px] overflow-hidden relative"
          style={{ background: 'linear-gradient(145deg,#050E1A 0%,#0B3A5A 45%,#050E1A 100%)' }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 20% 50%,rgba(0,180,216,0.15) 0%,transparent 55%)' }} />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 p-7 md:p-9">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 text-[#10B981] text-[10px] font-bold bg-[#10B981]/10 border border-[#10B981]/20 px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse" />
                  جديد · لوحة الإدارة الذكية
                </span>
              </div>
              <h3 className="text-white text-[22px] md:text-[26px] font-bold mb-2 leading-tight">
                لوحة تحكم المالك<br />
                <span style={{ color: '#00B4D8' }}>والموظفين</span>
              </h3>
              <p className="text-white/45 text-[13px] font-light leading-relaxed mb-4 max-w-sm">
                إيرادات اليوم · طابور المرضى · أداء الفريق الطبي · التقارير الشهرية — كل شيء في مكان واحد.
              </p>
            </div>
            <div className="md:self-end shrink-0">
              <button
                onClick={() => navigate('/owner')}
                className="flex items-center gap-2.5 font-bold text-[14px] px-6 py-3.5 rounded-[16px] transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_8px_28px_rgba(0,180,216,0.3)] whitespace-nowrap"
                style={{ background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)', color: '#fff' }}>
                شاهد لوحة المالك →
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Features grid ──────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div className="text-center mb-6">
          <p className="text-[11px] text-[#AAA] font-semibold tracking-widest uppercase mb-1.5">كل ما تحصل عليه عيادتك</p>
          <h2 className="text-[24px] font-bold text-[#111]">١٨ مزية في منظومة واحدة</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {allFeatures.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i }}
              className="bg-white/80 rounded-[18px] p-4 border border-[rgba(11,74,111,0.07)] shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:border-[rgba(11,74,111,0.18)] hover:-translate-y-0.5 transition-all duration-200">
              <span className="text-2xl mb-2 block">{f.icon}</span>
              <p className="text-[12px] font-semibold text-[#111] mb-0.5 leading-snug">{f.title}</p>
              <p className="text-[10px] text-[#999] font-light leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Testimonials ────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div className="text-center mb-6">
          <p className="text-[11px] text-[#AAA] font-semibold tracking-widest uppercase mb-1.5">قالوا عنّا</p>
          <h2 className="text-[24px] font-bold text-[#111]">عيادات ومستشفيات تثق بتلقا تك</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i }}
              className="bg-white/80 rounded-[22px] p-5 border border-[rgba(11,74,111,0.07)] shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
              <p className="text-[13px] mb-3">⭐⭐⭐⭐⭐</p>
              <p className="text-[13px] text-[#444] font-light leading-relaxed mb-4 italic">"{t.quote}"</p>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-bold shrink-0"
                  style={{ background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)' }}>{t.initials}</div>
                <div>
                  <p className="text-[12px] font-semibold text-[#111]">{t.name}</p>
                  <p className="text-[10px] text-[#AAA] font-light">{t.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <div className="max-w-lg mx-auto px-6 mb-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-[28px] p-8 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(145deg,#050E1A 0%,#0B3A5A 45%,#050E1A 100%)' }}>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%,rgba(0,180,216,0.18) 0%,transparent 60%)' }} />
          <div className="relative z-10">
            <p className="text-[#00B4D8] text-[11px] font-semibold tracking-widest uppercase mb-3">سعر إطلاق خاص</p>
            <p className="text-white text-[52px] font-bold leading-none mb-1">25,000</p>
            <p style={{ color: '#00B4D8' }} className="text-[18px] font-light mb-1.5">ريال سعودي</p>
            <p className="text-white/30 text-[12px] font-light mb-6 leading-relaxed">
              iOS + Android · موقع · AI Doctor · تليميديسن · دعم كامل
            </p>
            <div className="grid grid-cols-2 gap-2.5 mb-7">
              {included.map(item => (
                <div key={item} className="flex items-center gap-2 text-white/50 text-[11px]">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#00B4D8' }} />
                  {item}
                </div>
              ))}
            </div>
            <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer"
              className="block w-full bg-white font-bold text-[15px] py-4 rounded-[16px] hover:bg-[#F0F8FF] active:scale-95 transition-all duration-200 shadow-[0_8px_28px_rgba(0,0,0,0.2)]"
              style={{ color: '#0B4A6F' }}>
              ابدأ مشروع عيادتك مع تلقا تك 🚀
            </a>
            <p className="text-white/25 text-[11px] mt-3 font-light">تواصل معنا على واتساب للاستفسار المجاني</p>
          </div>
        </motion.div>
      </div>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <div className="text-center pb-10 px-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)' }}>
            <span className="text-white text-[9px] font-bold">ت</span>
          </div>
          <span className="text-[13px] font-bold text-[#111]">تلقا تك</span>
        </div>
        <p className="text-[11px] text-[#CCC] font-light">وكالة تصميم تطبيقات ومواقع احترافية · جميع الحقوق محفوظة ٢٠٢٥</p>
      </div>
    </div>
  );
}
