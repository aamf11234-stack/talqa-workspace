import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';

const WHATSAPP_LINK = "https://wa.me/966551378531?text=السلام%20عليكم%2C%20أريد%20أن%20أحسب%20تكلفة%20مشروعي";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
});

const floatCards = [
  { label: 'تطبيق براون دوز', sub: '٢٤٠٠+ عميل نشط', color: '#C5A880' },
  { label: 'Apple Wallet', sub: 'بطاقة رقمية فورية', color: '#1A1A18' },
  { label: 'لوحة تحكم حية', sub: 'إحصائيات لحظية', color: '#4B7BEC' },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden dot-grid hero-noise"
      style={{ background: '#FBF9F5' }}
    >
      {/* Warm glow blobs */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle, #C5A880 0%, transparent 70%)', filter: 'blur(80px)' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 -left-40 w-[400px] h-[400px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #C5A880 0%, transparent 70%)', filter: 'blur(100px)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 mb-8">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase"
            style={{
              background: 'rgba(197,168,128,0.12)',
              color: '#A8895E',
              border: '1px solid rgba(197,168,128,0.3)',
            }}
          >
            <Sparkles size={12} />
            منظومة تلقا التقنية
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.1)}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-black leading-[1.12] tracking-tight mb-7"
          style={{ color: '#1A1A18' }}
        >
          نحوّل أفكارك التجارية
          <br />
          <span className="text-gradient-gold">إلى حلول برمجية تدر الأرباح</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 font-medium"
          style={{ color: '#7A7060' }}
        >
          تطبيقات جوال، بطاقات Apple Wallet، مواقع سريعة، وأنظمة مخصصة
          <br className="hidden sm:block" />
          تعزز قيمة براندك وتبقي عملاءك يعودون.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          {...fadeUp(0.3)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <a
            href="#calculator"
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #C5A880, #A8895E)',
              boxShadow: '0 8px 32px rgba(197,168,128,0.45)',
            }}
          >
            احسب تكلفة مشروعك
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              color: '#1A1A18',
              border: '2px solid #EAE6DF',
              background: '#FFFFFF',
            }}
          >
            استكشف أعمالنا
          </a>
        </motion.div>

        {/* Floating mini-cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {floatCards.map((card, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl shadow-sm border"
              style={{ background: '#FFFFFF', borderColor: '#EAE6DF' }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: card.color }}
              />
              <div className="text-right leading-none">
                <div className="text-sm font-bold" style={{ color: '#1A1A18' }}>{card.label}</div>
                <div className="text-xs mt-0.5" style={{ color: '#7A7060' }}>{card.sub}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1.5"
          style={{ borderColor: 'rgba(197,168,128,0.4)' }}
        >
          <div className="w-1 h-2 rounded-full" style={{ background: '#C5A880' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
