import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import { PhoneFrame }             from '../components/PhoneFrame';
import { BottomNav }              from '../components/BottomNav';
import type { ClinicTab }         from '../components/BottomNav';
import { ScreenHome }             from '../components/ScreenHome';
import { ScreenAppointments }     from '../components/ScreenAppointments';
import { ScreenCard }             from '../components/ScreenCard';
import { ScreenDoctors }          from '../components/ScreenDoctors';
import { ScreenNotifications }    from '../components/ScreenNotifications';

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
];

const testimonials = [
  { name: 'عيادة الشفاء',       city: 'الرياض', quote: 'الحجوزات الإلكترونية قلّصت الانتظار ٦٠٪ في أول أسبوع',   initials: 'ع' },
  { name: 'مجمع النور الطبي',   city: 'جدة',    quote: 'المرضى يطلبون تطبيقنا قبل ما يسألون عن الأطباء',         initials: 'م' },
  { name: 'مستشفى الرعاية',     city: 'أبها',   quote: 'نتائج التحاليل الرقمية أنهت الدوامة الورقية كلياً',       initials: 'ر' },
];

const included = ['تسليم خلال ٦٠ يوم','نشر على المتجرين','سنة دعم مجاني','تدريب الفريق','تكامل مع HIS الحالي','تصميم بهوية عيادتك'];

export default function Home() {
  const [activeTab, setActiveTab] = useState<ClinicTab>('home');
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
            تطبيق · مواعيد · نتائج · ذاكرة طبية · إشعارات
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
          <p className="text-[12px] text-[#AAA] mt-1 font-light">جرّب التنقل بين الشاشات 👆</p>
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
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={activeTab}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 overflow-y-auto scrollbar-none">
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
      </div>

      {/* ── Owner Dashboard CTA ────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="rounded-[28px] overflow-hidden relative"
          style={{ background: 'linear-gradient(145deg,#050E1A 0%,#0B3A5A 45%,#050E1A 100%)' }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 20% 50%,rgba(0,180,216,0.15) 0%,transparent 55%)' }} />
          <div className="absolute top-0 left-0 w-48 h-48 opacity-[0.04]"
            style={{ backgroundImage: 'radial-gradient(circle,#00B4D8 1.5px,transparent 1.5px)', backgroundSize: '10px 10px' }} />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 p-7 md:p-9">

            {/* Left: icon + text */}
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
                إيرادات اليوم · طابور المرضى · أداء الفريق الطبي · التقارير الشهرية · مركز الأمان — كل شيء في مكان واحد.
              </p>
              <div className="flex flex-wrap gap-2">
                {['إيرادات فورية','طابور المرضى','أداء الموظفين','تقارير شهرية','مركز الأمان'].map(t => (
                  <span key={t} className="text-[10px] text-white/40 border border-white/10 px-2.5 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </div>

            {/* Right: mini dashboard preview */}
            <div className="shrink-0 w-full md:w-[280px] rounded-[20px] overflow-hidden border border-white/8"
              style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/8">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                  <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
                  <div className="w-2 h-2 rounded-full bg-[#28C840]" />
                </div>
                <span className="text-white/20 text-[9px] font-mono flex-1 text-center">clinic.talqa.app/owner</span>
              </div>
              <div className="p-4 space-y-2.5">
                {[
                  { label: 'إيراد اليوم', value: '٩,٨٠٠', color: '#10B981', pct: 82 },
                  { label: 'المرضى',       value: '٣٨',    color: '#00B4D8', pct: 62 },
                  { label: 'المواعيد',     value: '٢٢',    color: '#8B5CF6', pct: 74 },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="text-white/40 text-[9px]">{s.label}</span>
                      <span className="text-[9px] font-bold" style={{ color: s.color }}>{s.value}</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <motion.div className="h-full rounded-full" style={{ background: s.color }}
                        initial={{ width: 0 }} animate={{ width: `${s.pct}%` }}
                        transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }} />
                    </div>
                  </div>
                ))}
                <div className="pt-1.5 grid grid-cols-2 gap-1.5">
                  {['داخل','انتظار','قادم','مؤكد'].map((s, i) => (
                    <div key={i} className="rounded-[8px] px-2 py-1.5 text-center"
                      style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <p className="text-white/60 text-[8px]">{['د.سارة','د.خالد','د.أحمد','ريم'][i]}</p>
                      <p className="text-[9px] font-bold text-white/80">{s}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="md:self-end shrink-0">
              <button
                onClick={() => navigate('/owner')}
                className="flex items-center gap-2.5 font-bold text-[14px] px-6 py-3.5 rounded-[16px] transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_8px_28px_rgba(0,180,216,0.3)] whitespace-nowrap"
                style={{ background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)', color: '#fff' }}>
                شاهد لوحة المالك
                <span className="text-[18px]">→</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Features grid ──────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div className="text-center mb-6">
          <p className="text-[11px] text-[#AAA] font-semibold tracking-widest uppercase mb-1.5">كل ما تحصل عليه عيادتك</p>
          <h2 className="text-[24px] font-bold text-[#111]">١٥ مزية في منظومة واحدة</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
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

      {/* ── Patient Card showcase ───────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div className="rounded-[28px] p-7 md:p-9 relative overflow-hidden"
          style={{ background: 'linear-gradient(145deg,#050E1A 0%,#0B3A5A 45%,#050E1A 80%)' }}>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 85% 20%,rgba(0,180,216,0.12) 0%,transparent 55%)' }} />
          <div className="absolute bottom-0 left-0 w-40 h-40 opacity-[0.05]"
            style={{ backgroundImage: 'radial-gradient(circle,#00B4D8 1.5px,transparent 1.5px)', backgroundSize: '10px 10px' }} />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-7">
            <div className="flex-1">
              <p className="text-[#00B4D8] text-[10px] font-semibold tracking-widest uppercase mb-2">بطاقة المريض الرقمية</p>
              <h3 className="text-white text-[24px] font-bold mb-2.5 leading-tight">
                هوية المريض في جيبه<br />
                <span style={{ color: '#00B4D8' }}>بدون ورق · بدون انتظار</span>
              </h3>
              <p className="text-white/45 text-[13px] font-light leading-relaxed mb-5 max-w-xs">
                كل مريض يحمل بطاقة رقمية بمعلوماته الطبية الكاملة — QR للاستقبال، إسعاف للطوارئ، ملف صحي للتاريخ المرضي.
              </p>
              <div className="space-y-2">
                {['معلومات طبية كاملة وآمنة','QR فوري في الاستقبال دون إجراءات','ربط مباشر مع التأمين الصحي'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-white/55 text-[12px]">
                    <div className="w-1.5 h-1.5 bg-[#22C55E] rounded-full shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-[260px] rounded-[22px] p-5 relative overflow-hidden shrink-0"
              style={{ background: 'linear-gradient(145deg,#030810,#0B3A5A,#030810)', border: '1px solid rgba(0,180,216,0.18)' }}>
              <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 0%,rgba(0,180,216,0.12) 0%,transparent 55%)' }} />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p style={{ color: '#00B4D8' }} className="font-bold text-[15px]">عيادتك</p>
                    <p className="text-white/20 text-[8px] tracking-wider">DIGITAL HEALTH CARD</p>
                  </div>
                  <span className="text-[14px]">🏥</span>
                </div>
                <p className="text-white/25 text-[8px] mb-0.5">PATIENT NAME</p>
                <p className="text-white text-[13px] font-semibold mb-4">اسم المريض</p>
                <div className="grid grid-cols-3 gap-1">
                  {[['ID','#PT-001','#00B4D8'],['BLOOD','O+','#fff'],['INS.','بوبا','rgba(255,255,255,0.6)']].map(([l,v,c]) => (
                    <div key={l}>
                      <p className="text-white/25 text-[7px] mb-0.5">{l}</p>
                      <p className="text-[10px] font-bold" style={{ color: c }}>{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Security Section ───────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div className="rounded-[32px] overflow-hidden relative"
          style={{ background: 'linear-gradient(160deg,#020B14 0%,#071E2E 40%,#020B14 100%)' }}>

          {/* ambient glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%,rgba(16,185,129,0.12) 0%,transparent 55%)' }} />
          {/* dot grid */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'radial-gradient(circle,#10B981 1px,transparent 1px)', backgroundSize: '20px 20px' }} />

          <div className="relative z-10 px-7 md:px-12 py-10 md:py-14">

            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-[11px] font-bold px-4 py-1.5 rounded-full mb-4 tracking-wider">
                <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse" />
                الأمان في مقدمة أولوياتنا — دائماً
              </div>
              <h2 className="text-white text-[28px] md:text-[38px] font-bold leading-tight mb-3">
                الأكثر أماناً في قطاع<br />
                <span style={{ color: '#10B981' }}>الرعاية الصحية</span>
              </h2>
              <p className="text-white/40 text-[14px] font-light max-w-xl mx-auto leading-relaxed">
                بيانات مرضاك هي أثمن شيء تملكه عيادتك. نحن نعاملها هكذا — بتشفير لا يُكسر، وأمان لا يُساوَم عليه.
              </p>
            </div>

            {/* Compliance badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {[
                { label: 'HIPAA Compliant',  sub: 'معايير الخصوصية الصحية الأمريكية' },
                { label: 'ISO 27001',        sub: 'أمن المعلومات الدولي' },
                { label: 'NDMO',             sub: 'هيئة الحكومة الرقمية السعودية' },
                { label: 'SOC 2 Type II',    sub: 'أمن الأنظمة والخدمات' },
                { label: 'AES-256',          sub: 'تشفير عسكري المستوى' },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-2.5 px-4 py-2.5 rounded-[14px]"
                  style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.15)' }}>
                  <div className="w-5 h-5 rounded-full bg-[#10B981]/20 flex items-center justify-center shrink-0">
                    <span className="text-[#10B981] text-[10px] font-bold">✓</span>
                  </div>
                  <div>
                    <p className="text-[#10B981] text-[11px] font-bold leading-none">{b.label}</p>
                    <p className="text-white/25 text-[9px] mt-0.5">{b.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 6 pillars grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {[
                {
                  icon: '🔐',
                  title: 'تشفير AES-256 من الطرف للطرف',
                  desc: 'كل بيانات مريض — من الاسم إلى التشخيص — مشفرة بنفس المعيار المستخدم في حماية الأسرار الحكومية. لا أحد يقرأها إلا المخوّلون.',
                  accent: '#10B981',
                },
                {
                  icon: '🧠',
                  title: 'معمارية Zero-Knowledge',
                  desc: 'مفتاح التشفير ملكك وحدك. حتى فريق تلقا تك لا يستطيع الاطلاع على بيانات مرضاك — هذا ليس مجرد سياسة، بل بنية تقنية.',
                  accent: '#00B4D8',
                },
                {
                  icon: '🛡️',
                  title: 'مصادقة متعددة العوامل',
                  desc: 'Face ID + بصمة الإصبع + رمز تحقق لكل دخول. لا يصل لبياناتك أحد بدون إذنك، حتى لو كان يعرف كلمة المرور.',
                  accent: '#8B5CF6',
                },
                {
                  icon: '💾',
                  title: 'نسخ احتياطي مشفر كل ٦ ساعات',
                  desc: 'بياناتك محفوظة دائماً في مراكز بيانات موزعة جغرافياً — مشفرة بالكامل، محمية من الكوارث والاختراقات.',
                  accent: '#F59E0B',
                },
                {
                  icon: '👁️',
                  title: 'مراقبة بالذكاء الاصطناعي ٢٤/٧',
                  desc: 'نظام AI يرصد كل عملية وصول، ويكتشف أي نشاط غير اعتيادي ويوقفه قبل أن يصبح تهديداً — وينبّهك فوراً.',
                  accent: '#EF4444',
                },
                {
                  icon: '📜',
                  title: 'متوافق مع نظام PDPL السعودي',
                  desc: 'منظومتك متوافقة بالكامل مع نظام حماية البيانات الشخصية ولوائح هيئة الحكومة الرقمية السعودية — بدون أي مخاطر قانونية.',
                  accent: '#10B981',
                },
              ].map((p, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 * i }}
                  className="rounded-[22px] p-5 relative overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-[0.06] rounded-bl-[80px]"
                    style={{ background: p.accent }} />
                  <span className="text-3xl mb-3 block">{p.icon}</span>
                  <p className="text-white text-[14px] font-bold mb-2 leading-snug">{p.title}</p>
                  <p className="text-white/35 text-[12px] font-light leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Bottom bar */}
            <div className="rounded-[20px] p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
              style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)' }}>
              <div className="text-[38px] shrink-0">🔒</div>
              <div className="flex-1 text-center sm:text-right">
                <p className="text-[#10B981] text-[16px] font-bold mb-1">بياناتك ملكك وحدك. نحن لا نراها.</p>
                <p className="text-white/35 text-[13px] font-light">
                  لم يُسجَّل أي اختراق لبيانات منذ تأسيس المنظومة. هذا ليس حظاً — هذا هندسة.
                </p>
              </div>
              <div className="shrink-0 text-center">
                <p className="text-[#10B981] text-[32px] font-bold leading-none">٠</p>
                <p className="text-white/30 text-[11px]">اختراقات مسجلة</p>
              </div>
              <div className="shrink-0 text-center">
                <p className="text-[#10B981] text-[32px] font-bold leading-none">١٠٠٪</p>
                <p className="text-white/30 text-[11px]">تشفير البيانات</p>
              </div>
              <div className="shrink-0 text-center">
                <p className="text-[#10B981] text-[32px] font-bold leading-none">٢٤/٧</p>
                <p className="text-white/30 text-[11px]">مراقبة أمنية</p>
              </div>
            </div>
          </div>
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
          <div className="absolute bottom-0 left-0 w-36 h-36 opacity-[0.04]"
            style={{ backgroundImage: 'radial-gradient(circle,#00B4D8 1.5px,transparent 1.5px)', backgroundSize: '10px 10px' }} />
          <div className="relative z-10">
            <p className="text-[#00B4D8] text-[11px] font-semibold tracking-widest uppercase mb-3">سعر إطلاق خاص</p>
            <p className="text-white text-[52px] font-bold leading-none mb-1">25,000</p>
            <p style={{ color: '#00B4D8' }} className="text-[18px] font-light mb-1.5">ريال سعودي</p>
            <p className="text-white/30 text-[12px] font-light mb-6 leading-relaxed">
              iOS + Android · موقع · نتائج رقمية · حجوزات · سجل طبي · دعم كامل
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
