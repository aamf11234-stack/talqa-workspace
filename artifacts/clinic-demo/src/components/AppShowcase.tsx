import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneFrame } from './PhoneFrame';
import { BottomNav } from './BottomNav';
import type { ClinicTab } from './BottomNav';
import { ScreenHome } from './ScreenHome';
import { ScreenAppointments } from './ScreenAppointments';
import { ScreenCard } from './ScreenCard';
import { ScreenDoctors } from './ScreenDoctors';
import { ScreenNotifications } from './ScreenNotifications';
import { ScreenResults } from './ScreenResults';

const tabLabels: Record<ClinicTab, string> = {
  home: 'الرئيسية',
  appointments: 'المواعيد',
  card: 'البطاقة الطبية',
  doctors: 'الأطباء',
  notifications: 'الإشعارات',
};

const tabDescriptions: Record<ClinicTab, string> = {
  home: 'صحة المريض، المؤشرات الحيوية، والموعد القادم — كل شيء في لمحة واحدة',
  appointments: 'حجز موعد في ثوانٍ، مع تأكيد فوري ورسالة واتساب',
  card: 'بطاقة المريض الرقمية مع QR للاستقبال، بدون ورق وبدون انتظار',
  doctors: 'فريق الأطباء كاملاً مع التقييمات، التخصصات، والأوقات المتاحة',
  notifications: 'تذكير دواء، نتيجة جاهزة، موعد غداً — كل شيء في مكان واحد',
};

export const AppShowcase = () => {
  const [activeTab, setActiveTab] = useState<ClinicTab>('home');

  // Auto-rotate tabs for demo effect
  const tabs: ClinicTab[] = ['home', 'appointments', 'card', 'doctors', 'notifications'];

  return (
    <section className="py-24 relative overflow-hidden" id="app">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(0,180,216,0.06) 0%, transparent 70%)' }} />
      </div>

      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-4"
            style={{ borderColor: 'rgba(0,180,216,0.3)', background: 'rgba(0,180,216,0.08)' }}>
            <span className="w-2 h-2 rounded-full bg-[#00B4D8] animate-pulse" />
            <span className="text-[#00B4D8] text-sm font-semibold">نموذج توضيحي حقيقي · مبني فعلياً</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            تطبيق <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#C9A84C] to-[#F0D080]">عيادتك</span> الحقيقي
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            جرّب التنقل بين الشاشات — هذا التطبيق مبني فعلياً وسيحمل هوية عيادتك الكاملة
          </p>
        </motion.div>

        <div className="flex flex-col xl:flex-row items-center gap-16 justify-center">

          {/* Phone mockup — real interactive app */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="relative shrink-0"
          >
            {/* Glow behind phone */}
            <div className="absolute inset-0 -z-10 blur-3xl opacity-30 scale-75"
              style={{ background: 'radial-gradient(ellipse, #00B4D8 0%, #0B4A6F 50%, transparent 80%)' }} />

            {/* Demo badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 bg-white text-[#0B4A6F] text-[10px] font-bold px-3 py-1 rounded-full shadow-lg whitespace-nowrap flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />
              تفاعلي · جرّب الضغط على الشاشة
            </div>

            <PhoneFrame>
              <div className="flex-1 relative overflow-hidden h-full">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
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

          {/* Feature list — tab description + click to switch */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-md w-full"
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              ٥ شاشات، تجربة واحدة متكاملة
            </h3>

            <div className="space-y-3">
              {tabs.map((tab) => {
                const isActive = activeTab === tab;
                const icons: Record<ClinicTab, string> = {
                  home: '🏥',
                  appointments: '📅',
                  card: '🪪',
                  doctors: '👨‍⚕️',
                  notifications: '🔔',
                };
                return (
                  <motion.button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-right p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden"
                    style={{
                      background: isActive ? 'rgba(11,74,111,0.3)' : 'rgba(255,255,255,0.03)',
                      borderColor: isActive ? 'rgba(0,180,216,0.4)' : 'rgba(255,255,255,0.08)',
                    }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="tab-bg"
                        className="absolute inset-0 -z-10"
                        style={{ background: 'linear-gradient(135deg, rgba(11,74,111,0.4), rgba(0,180,216,0.1))' }}
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    <div className="flex items-center gap-3">
                      <span className="text-2xl shrink-0">{icons[tab]}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className={`font-bold text-sm ${isActive ? 'text-white' : 'text-gray-400'}`}>
                            {tabLabels[tab]}
                          </p>
                          {isActive && (
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0"
                              style={{ background: 'rgba(0,180,216,0.2)', color: '#00B4D8' }}>
                              تشاهده الآن
                            </span>
                          )}
                        </div>
                        <p className={`text-xs leading-snug ${isActive ? 'text-gray-300' : 'text-gray-600'}`}>
                          {tabDescriptions[tab]}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Results screen extra highlight */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-4 p-4 rounded-2xl border"
              style={{ background: 'rgba(34,197,94,0.05)', borderColor: 'rgba(34,197,94,0.15)' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">🧪</span>
                <p className="font-bold text-sm text-white">نتائج التحاليل الرقمية</p>
              </div>
              <p className="text-xs text-gray-400 leading-snug">
                النتيجة تصل من المختبر مباشرة لتطبيق المريض — لا ورق، لا انتظار، لا اتصالات
              </p>
            </motion.div>

            {/* CTA */}
            <motion.a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-6 flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-base transition-all"
              style={{
                background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)',
                boxShadow: '0 8px 30px rgba(0,180,216,0.25)',
                color: 'white',
              }}
            >
              <span>ابنِ تطبيق عيادتك الآن</span>
              <span className="text-lg">🚀</span>
            </motion.a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
