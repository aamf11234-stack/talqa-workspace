import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, Monitor, Smartphone, Activity } from 'lucide-react';
import { PhoneFrame } from './PhoneFrame';
import { BottomNav } from './BottomNav';
import type { ClinicTab } from './BottomNav';
import { ScreenHome } from './ScreenHome';
import { ScreenAppointments } from './ScreenAppointments';
import { ScreenCard } from './ScreenCard';
import { ScreenDoctors } from './ScreenDoctors';
import { ScreenNotifications } from './ScreenNotifications';

export const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -50]);
  const y2 = useTransform(scrollY, [0, 500], [0, 50]);
  const [activeTab, setActiveTab] = useState<ClinicTab>('home');

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* ECG-like animated line */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <motion.polyline
            points="0,300 200,300 250,300 270,200 290,400 310,100 330,350 360,300 800,300 850,300 870,220 890,380 910,150 930,320 960,300 1300,300"
            fill="none"
            stroke="#00B4D8"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop', repeatDelay: 1 }}
          />
        </svg>
        <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] rounded-full blur-[100px] opacity-30"
          style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30rem] h-[30rem] rounded-full blur-[100px] opacity-20"
          style={{ background: 'radial-gradient(circle, #0EA5E9 0%, transparent 70%)' }} />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'radial-gradient(circle, #00B4D8 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="container mx-auto px-6 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6 order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border w-fit"
              style={{ borderColor: 'rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.08)' }}>
              <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
              <span className="text-[#C9A84C] text-sm font-semibold tracking-wide">المنظومة الرقمية الأقوى للعيادات والمراكز الطبية</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black leading-tight text-white">
              لا تكن مجرد <br />
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #0EA5E9, #00B4D8)' }}>
                عيادة تقليدية
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 font-medium leading-relaxed max-w-xl">
              احصل على <span className="text-white font-bold">موقع إلكتروني</span> احترافي،
              و<span className="text-white font-bold">تطبيق ذكي</span> لمرضاك،
              و<span className="text-white font-bold">لوحة تحكم</span> متكاملة.
              كل ذلك بقيمة استثمارية{' '}
              <span className="font-black text-3xl" style={{ color: '#C9A84C' }}>١٨,٠٠٠ ريال</span> فقط.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <motion.a
                href="https://wa.me/966500000000"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(201,168,76,0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all"
                style={{ background: 'linear-gradient(135deg,#C9A84C,#E8C86A)', color: '#050D1A' }}
              >
                احجز نسختك الآن
              </motion.a>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg text-white transition-all border"
                style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)' }}
                onClick={() => document.getElementById('app')?.scrollIntoView({ behavior: 'smooth' })}
              >
                شاهد التطبيق
              </motion.button>
            </div>
            
            <div className="flex items-center gap-6 mt-4 opacity-50 text-sm text-gray-300 flex-wrap">
              <div className="flex items-center gap-2"><Monitor size={16} /> موقع متجاوب</div>
              <div className="flex items-center gap-2"><Smartphone size={16} /> تطبيق iOS & Android</div>
              <div className="flex items-center gap-2"><Activity size={16} /> لوحة تحكم ذكية</div>
            </div>
          </motion.div>

          {/* Real interactive phone — scaled */}
          <div className="relative flex justify-center items-center h-[600px] order-1 lg:order-2">
            {/* Browser mockup behind phone */}
            <motion.div
              style={{ y: y2 }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute left-0 w-[58%] z-0"
            >
              <div className="rounded-xl overflow-hidden shadow-2xl border"
                style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#111' }}>
                {/* Browser bar */}
                <div className="px-4 py-2.5 flex items-center gap-2 border-b" style={{ background: '#1a1a1a', borderColor: '#222' }}>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  </div>
                  <div className="mx-auto bg-black/40 rounded px-8 py-0.5 text-[9px] text-white/30 font-mono">
                    clinic.com
                  </div>
                </div>
                {/* Browser content */}
                <div className="bg-white p-4" style={{ height: 260 }}>
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
                    <div className="font-bold text-[#050D1A] text-sm flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded bg-[#0EA5E9]" />
                      عيادات النخبة
                    </div>
                    <div className="flex gap-4 text-[10px] text-gray-400 font-medium">
                      <span className="text-[#0EA5E9]">الرئيسية</span>
                      <span>أطباؤنا</span>
                      <span>خدماتنا</span>
                    </div>
                    <button className="bg-[#050D1A] text-white px-3 py-1.5 rounded text-[10px] font-semibold">
                      احجز موعدك
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 items-center">
                    <div>
                      <h2 className="text-lg font-bold text-[#050D1A] mb-2 leading-tight">الرعاية الصحية<br/>بمفهوم جديد</h2>
                      <p className="text-gray-400 text-[10px] mb-3 leading-relaxed">
                        نقدم لك أحدث التقنيات الطبية مع نخبة من الاستشاريين.
                      </p>
                      <button className="bg-[#0EA5E9] text-white px-4 py-1.5 rounded text-[10px] font-bold shadow-sm">
                        تصفح العيادات
                      </button>
                      {/* Doctor cards */}
                      <div className="mt-3 space-y-1.5">
                        {[
                          { name: 'د. سارة المطيري', spec: 'طب عام', avail: true },
                          { name: 'د. فهد الحربي', spec: 'قلبية', avail: true },
                        ].map((d, i) => (
                          <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-2 py-1.5 border border-gray-100">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0"
                              style={{ background: i === 0 ? '#0B4A6F' : '#00B4D8' }}>
                              {d.name[3]}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[9px] font-bold text-gray-800 truncate">{d.name}</p>
                              <p className="text-[8px] text-gray-400">{d.spec}</p>
                            </div>
                            {d.avail && <div className="w-1.5 h-1.5 bg-green-500 rounded-full shrink-0" />}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="relative">
                      <div className="w-full h-28 bg-gray-100 rounded-lg overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center text-4xl">🏥</div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-lg" />
                      </div>
                      {/* Appointment badge */}
                      <div className="absolute -bottom-2 -right-2 bg-white shadow-lg border border-gray-100 rounded-lg p-1.5 flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-[#22C55E]/20 flex items-center justify-center">
                          <span className="text-[8px]">✓</span>
                        </div>
                        <div>
                          <p className="text-[8px] font-bold text-gray-800">تأكيد موعد</p>
                          <p className="text-[7px] text-gray-400">اليوم ١٠:٣٠</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Label */}
              <div className="mt-2 text-center">
                <span className="text-xs text-gray-500 flex items-center justify-center gap-1">
                  <Monitor size={12} />
                  موقع العيادة الإلكتروني
                </span>
              </div>
            </motion.div>

            {/* Real interactive phone */}
            <motion.div
              style={{ y: y1 }}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.15, type: 'spring', stiffness: 90 }}
              className="absolute left-[42%] z-20"
              style={{
                transform: 'scale(0.52)',
                transformOrigin: 'top center',
                top: -30,
              }}
            >
              {/* Glow */}
              <div className="absolute inset-0 -z-10 blur-3xl opacity-40 scale-75"
                style={{ background: 'radial-gradient(ellipse, #0B4A6F 0%, transparent 70%)' }} />
              <PhoneFrame>
                <div className="flex-1 relative overflow-hidden h-full">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute inset-0 overflow-y-auto scrollbar-none"
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

            {/* Phone label */}
            <div className="absolute bottom-2 left-[58%] z-30 text-center">
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Smartphone size={12} />
                تطبيق المريض
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center"
      >
        <span className="text-xs mb-2">استكشف المزيد</span>
        <ChevronDown size={20} />
      </motion.div>
    </section>
  );
};
