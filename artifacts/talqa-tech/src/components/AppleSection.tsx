import { motion } from 'framer-motion';
import { Wallet, Watch, Bell, QrCode } from 'lucide-react';
import { SiApple } from 'react-icons/si';

const features = [
  {
    icon: Wallet,
    title: 'بطاقة ولاء رقمية',
    desc: 'تضاف مباشرةً لمحفظة Apple Wallet — لا تطبيق، لا حساب، بلمسة واحدة.',
  },
  {
    icon: Bell,
    title: 'إشعارات لحظية',
    desc: 'أرسل عروضاً وتنبيهات للعميل مباشرةً على شاشته — حتى بدون فتح أي تطبيق.',
  },
  {
    icon: Watch,
    title: 'تكامل Apple Watch',
    desc: 'النقاط، كود QR للاسترداد، وتأكيدات الحجز — كلها على معصم العميل.',
  },
  {
    icon: QrCode,
    title: 'تحديث تلقائي',
    desc: 'رصيد النقاط ومستوى العضوية يتحدثان تلقائياً بعد كل زيارة دون أي تدخل.',
  },
];

export default function AppleSection() {
  return (
    <section
      id="apple"
      className="py-32 relative overflow-hidden"
      style={{ background: '#1A1A18' }}
    >
      {/* Warm glow */}
      <div
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-0 w-[500px] h-[500px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #C5A880 0%, transparent 70%)', filter: 'blur(90px)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text side (right / RTL start) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <SiApple size={16} color="#FFFFFF" />
              <span className="text-xs font-bold tracking-widest uppercase text-white">Apple Ecosystem</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              تجربة عميل
              <br />
              <span className="text-gradient-gold">من مستوى آخر</span>
            </h2>

            <p className="text-base md:text-lg leading-relaxed mb-12 font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>
              نوظّف أحدث تقنيات Apple لتمنح عملاءك تجربة انسيابية تجعلهم يتذكرون براندك في كل لحظة — بدون احتكاك، بدون تعقيد.
            </p>

            <div className="space-y-8">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.55 }}
                  className="flex gap-5"
                >
                  <div
                    className="w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center"
                    style={{ background: 'rgba(197,168,128,0.12)', color: '#C5A880' }}
                  >
                    <f.icon size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-base font-black text-white mb-1">{f.title}</div>
                    <div className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{f.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center items-center"
          >
            {/* Outer ring */}
            <div
              className="absolute w-[420px] h-[420px] rounded-full"
              style={{ border: '1px solid rgba(197,168,128,0.12)' }}
            />
            <div
              className="absolute w-[340px] h-[340px] rounded-full"
              style={{ border: '1px dashed rgba(197,168,128,0.08)' }}
            />

            {/* Wallet card mockup */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10"
            >
              <div
                className="w-72 rounded-3xl p-6 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #1A1A18 0%, #2C2A24 100%)',
                  border: '1px solid rgba(197,168,128,0.25)',
                  boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(197,168,128,0.1)',
                }}
              >
                {/* Card header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      MEMBERSHIP
                    </div>
                    <div className="text-lg font-black text-white">براون دوز</div>
                  </div>
                  <SiApple size={22} color="rgba(255,255,255,0.6)" />
                </div>

                {/* Level */}
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
                  style={{ background: 'rgba(197,168,128,0.15)', border: '1px solid rgba(197,168,128,0.3)' }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: '#C5A880' }} />
                  <span className="text-xs font-bold" style={{ color: '#C5A880' }}>Gold Member</span>
                </div>

                {/* Points */}
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-xs font-medium mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>رصيد النقاط</div>
                    <div className="text-3xl font-black text-white">٢٬٤٥٠</div>
                    <div className="text-xs mt-1" style={{ color: '#C5A880' }}>نقطة متاحة</div>
                  </div>
                  {/* QR placeholder */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  >
                    <QrCode size={28} color="rgba(255,255,255,0.5)" />
                  </div>
                </div>

                {/* Stripe at bottom */}
                <div
                  className="absolute bottom-0 right-0 left-0 h-1 rounded-b-3xl"
                  style={{ background: 'linear-gradient(to left, #C5A880, #A8895E)' }}
                />
              </div>
            </motion.div>

            {/* Floating notification badge */}
            <motion.div
              animate={{ y: [0, -6, 0], x: [0, 3, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute top-8 -left-4 rounded-2xl px-4 py-3 shadow-xl"
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div className="flex items-center gap-2.5">
                <Bell size={14} style={{ color: '#C5A880' }} />
                <div className="leading-none">
                  <div className="text-xs font-bold text-white">عرض خاص!</div>
                  <div className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>خصم ٢٠٪ اليوم فقط</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
