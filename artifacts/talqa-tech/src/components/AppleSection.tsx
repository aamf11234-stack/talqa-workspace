import { motion } from 'framer-motion';
import { Wallet, Bell, Watch, RefreshCw } from 'lucide-react';
import { SiApple } from 'react-icons/si';

const features = [
  {
    icon: Wallet,
    title: 'بطاقة ولاء رقمية',
    desc: 'تضاف مباشرةً لمحفظة Apple Wallet — لا تطبيق، لا حساب، بلمسة واحدة.',
  },
  {
    icon: Bell,
    title: 'إشعارات Push مجانية',
    desc: 'أرسل عروضاً وتنبيهات مخصصة على شاشة العميل مباشرةً — بدون فتح أي تطبيق.',
  },
  {
    icon: Watch,
    title: 'تكامل Apple Watch',
    desc: 'رصيد النقاط وكود QR للاسترداد متاحان على معصم العميل في ثانية.',
  },
  {
    icon: RefreshCw,
    title: 'تحديث تلقائي',
    desc: 'النقاط ومستوى العضوية تتحدثان لحظياً بعد كل زيارة — صفر تدخل يدوي.',
  },
];

export default function AppleSection() {
  return (
    <section
      id="apple"
      className="py-32 relative overflow-hidden"
      style={{ background: '#FBF9F5' }}
    >
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: '#EAE6DF' }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ─── Text (right in RTL) ─── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
              style={{
                background: '#1A1A18',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <SiApple size={14} color="#FFFFFF" />
              <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-white">
                Apple Ecosystem
              </span>
            </div>

            <h2
              className="font-black leading-tight mb-6"
              style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.9rem)', color: '#1A1A18' }}
            >
              تجربة عميل
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #C5A880, #A8895E)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                من مستوى آخر تماماً
              </span>
            </h2>

            <p
              className="text-base md:text-lg leading-[1.85] mb-12 font-medium"
              style={{ color: '#7A7060' }}
            >
              نوظّف أحدث تقنيات Apple لتمنح عملاءك تجربة انسيابية تجعلهم يتذكرون براندك في كل لحظة — بدون احتكاك، بدون تعقيد.
            </p>

            <div className="space-y-7">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.55 }}
                  className="flex gap-5 items-start"
                >
                  <div
                    className="w-11 h-11 rounded-2xl shrink-0 flex items-center justify-center"
                    style={{ background: 'rgba(197,168,128,0.12)', color: '#C5A880' }}
                  >
                    <f.icon size={20} strokeWidth={1.6} />
                  </div>
                  <div>
                    <div
                      className="font-black text-[0.95rem] mb-1"
                      style={{ color: '#1A1A18' }}
                    >
                      {f.title}
                    </div>
                    <div
                      className="text-sm leading-[1.8]"
                      style={{ color: '#7A7060' }}
                    >
                      {f.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ─── Visual (left in RTL) ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center items-center relative py-12"
          >
            {/* Rings */}
            <div
              className="absolute rounded-full"
              style={{
                width: 380, height: 380,
                border: '1px solid rgba(197,168,128,0.1)',
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: 300, height: 300,
                border: '1px dashed rgba(197,168,128,0.08)',
              }}
            />

            {/* Wallet card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10"
            >
              <div
                className="w-72 rounded-3xl p-6 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, #1A1A18, #2D2B25)',
                  border: '1px solid rgba(197,168,128,0.2)',
                  boxShadow: '0 40px 80px rgba(26,26,24,0.18), 0 0 0 1px rgba(197,168,128,0.08)',
                }}
              >
                {/* Shimmer */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(197,168,128,0.06) 0%, transparent 60%)',
                  }}
                />

                {/* Card header */}
                <div className="flex items-start justify-between mb-8 relative z-10">
                  <div>
                    <div
                      className="text-[10px] font-bold tracking-[0.18em] uppercase mb-1.5"
                      style={{ color: 'rgba(255,255,255,0.35)' }}
                    >
                      MEMBERSHIP CARD
                    </div>
                    <div className="text-lg font-black text-white">منشأتك هنا</div>
                  </div>
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  >
                    <SiApple size={18} color="rgba(255,255,255,0.6)" />
                  </div>
                </div>

                {/* Level badge */}
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7 relative z-10"
                  style={{
                    background: 'rgba(197,168,128,0.12)',
                    border: '1px solid rgba(197,168,128,0.25)',
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: '#C5A880' }}
                  />
                  <span
                    className="text-xs font-bold"
                    style={{ color: '#C5A880' }}
                  >
                    Gold Member
                  </span>
                </div>

                {/* Points */}
                <div className="flex items-end justify-between relative z-10">
                  <div>
                    <div
                      className="text-[11px] font-semibold mb-1"
                      style={{ color: 'rgba(255,255,255,0.35)' }}
                    >
                      رصيد النقاط
                    </div>
                    <div className="text-3xl font-black text-white leading-none">٢٬٤٥٠</div>
                    <div
                      className="text-xs mt-1.5 font-semibold"
                      style={{ color: '#C5A880' }}
                    >
                      نقطة متاحة للاسترداد
                    </div>
                  </div>
                  {/* QR placeholder */}
                  <div
                    className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1"
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                  >
                    <div className="grid grid-cols-3 gap-0.5">
                      {[...Array(9)].map((_, j) => (
                        <div
                          key={j}
                          className="w-2 h-2 rounded-[2px]"
                          style={{
                            background: [0,2,4,6,8].includes(j)
                              ? 'rgba(255,255,255,0.5)'
                              : 'transparent',
                          }}
                        />
                      ))}
                    </div>
                    <div
                      className="text-[9px] font-bold"
                      style={{ color: 'rgba(255,255,255,0.3)' }}
                    >
                      QR
                    </div>
                  </div>
                </div>

                {/* Bottom line */}
                <div
                  className="absolute bottom-0 inset-x-0 h-[3px] rounded-b-3xl"
                  style={{ background: 'linear-gradient(to left, #C5A880, #A8895E)' }}
                />
              </div>
            </motion.div>

            {/* Floating notification */}
            <motion.div
              animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              className="absolute top-10 -left-6 rounded-2xl px-4 py-3 shadow-xl"
              style={{
                background: '#FFFFFF',
                border: '1px solid #EAE6DF',
                boxShadow: '0 8px 28px rgba(26,26,24,0.1)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(197,168,128,0.12)' }}
                >
                  <Bell size={14} style={{ color: '#C5A880' }} />
                </div>
                <div className="leading-tight">
                  <div className="text-xs font-black" style={{ color: '#1A1A18' }}>عرض خاص 🎉</div>
                  <div className="text-[11px] mt-0.5 font-medium" style={{ color: '#7A7060' }}>خصم ٢٠٪ لعملاء Gold</div>
                </div>
              </div>
            </motion.div>

            {/* Points update badge */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
              className="absolute bottom-10 -right-4 rounded-2xl px-4 py-2.5"
              style={{
                background: '#FFFFFF',
                border: '1px solid #EAE6DF',
                boxShadow: '0 6px 20px rgba(26,26,24,0.08)',
              }}
            >
              <div className="flex items-center gap-2">
                <RefreshCw size={12} style={{ color: '#C5A880' }} />
                <span className="text-xs font-bold" style={{ color: '#1A1A18' }}>+٥٠ نقطة</span>
                <span className="text-[11px]" style={{ color: '#7A7060' }}>تحديث آني</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
