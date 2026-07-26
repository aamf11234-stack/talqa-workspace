import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';

const WHATSAPP_LINK = "https://wa.me/966551378531?text=السلام%20عليكم%2C%20أريد%20الاستفسار%20عن%20خدمات%20تلقا%20تك";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

const stats = [
  { value: '+١٥', label: 'مشروع مُنجز' },
  { value: '+٣', label: 'قطاعات' },
  { value: '١٠٠٪', label: 'رضا العملاء' },
  { value: '٢', label: 'فرع في جازان' },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-28 pb-0 overflow-hidden"
      style={{ background: '#FBF9F5' }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />

      {/* Warm radial glows */}
      <div
        className="pointer-events-none absolute -top-60 -right-60 w-[700px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(197,168,128,0.22) 0%, transparent 65%)', filter: 'blur(1px)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(197,168,128,0.14) 0%, transparent 70%)' }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

        {/* Badge */}
        <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 mb-10">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase"
            style={{
              background: 'rgba(197,168,128,0.1)',
              color: '#A8895E',
              border: '1px solid rgba(197,168,128,0.28)',
              letterSpacing: '0.1em',
            }}
          >
            <Sparkles size={11} strokeWidth={2.5} />
            منظومة تلقا التقنية
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.08)}
          className="font-black leading-[1.1] tracking-tight mb-6"
          style={{
            fontSize: 'clamp(2.6rem, 6vw, 5rem)',
            color: '#1A1A18',
          }}
        >
          نحوّل أفكارك التجارية
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #C5A880 0%, #A8895E 55%, #C5A880 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            إلى حلول برمجية تدر الأرباح
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          {...fadeUp(0.16)}
          className="text-lg md:text-xl leading-[1.8] mb-12 max-w-2xl mx-auto font-medium"
          style={{ color: '#7A7060' }}
        >
          تطبيقات جوال، بطاقات Apple Wallet، مواقع سريعة، وأنظمة مخصصة
          <br className="hidden sm:block" />
          تعزز قيمة براندك وتبقي عملاءك يعودون.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.24)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <a
            href="#calculator"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-[15px] font-bold text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
            style={{
              background: 'linear-gradient(135deg, #C5A880, #A8895E)',
              boxShadow: '0 8px 28px rgba(197,168,128,0.4), 0 2px 8px rgba(197,168,128,0.2)',
            }}
          >
            احسب تكلفة مشروعك
            <ArrowLeft size={17} className="transition-transform duration-300 group-hover:-translate-x-1" />
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-[15px] font-bold transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
            style={{
              color: '#1A1A18',
              background: '#FFFFFF',
              border: '1.5px solid #EAE6DF',
              boxShadow: '0 2px 12px rgba(26,26,24,0.06)',
            }}
          >
            استكشف أعمالنا
          </a>
        </motion.div>
      </div>

      {/* ── Stats bar — full width, bottom of hero ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full"
        style={{ borderTop: '1px solid #EAE6DF' }}
      >
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
            {stats.map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1.5 text-center md:border-l first:border-l-0 md:first:border-l-0"
                style={{ borderColor: '#EAE6DF' }}
              >
                <span
                  className="font-black leading-none"
                  style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#1A1A18' }}
                >
                  {s.value}
                </span>
                <span className="text-sm font-semibold" style={{ color: '#7A7060' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
