import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'استشارة مجانية',
    desc: 'نتفاهم على فكرتك، متطلباتك، والجدول الزمني. لا التزام، لا دفع — فقط محادثة صريحة.',
  },
  {
    num: '02',
    title: 'عرض سعر واضح',
    desc: 'خلال ٢٤ ساعة تصلك ميزانية مفصّلة وخطة تسليم — لا أسعار مفاجئة بعد البدء.',
  },
  {
    num: '03',
    title: 'بناء وتسليم',
    desc: 'نبني المشروع مع تحديثات أسبوعية منتظمة، ونسلّم مع تدريب كامل على كيفية الاستخدام.',
  },
  {
    num: '04',
    title: 'دعم ما بعد الإطلاق',
    desc: 'أنت لست وحدك بعد التسليم — نقف معك لأي تعديل أو دعم تقني تحتاجه لاحقاً.',
  },
];

export default function Process() {
  return (
    <section
      className="py-32 relative"
      style={{ background: '#1A1A18' }}
    >
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

      {/* Subtle warm glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-15"
        style={{ background: 'radial-gradient(ellipse, #C5A880 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-[11px] font-bold tracking-[0.15em] uppercase mb-5"
            style={{ color: '#C5A880' }}
          >
            طريقة عملنا
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="font-black leading-tight text-white"
            style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)' }}
          >
            من الفكرة إلى الإطلاق
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #C5A880, #A8895E)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              في أربع خطوات
            </span>
          </motion.h2>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-7 rounded-3xl border"
              style={{
                background: 'rgba(255,255,255,0.03)',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            >
              {/* Connector line (desktop) */}
              {i < 3 && (
                <div
                  className="hidden lg:block absolute top-11 -left-3 w-6 h-px"
                  style={{ background: 'rgba(197,168,128,0.25)' }}
                />
              )}

              {/* Step number */}
              <div
                className="inline-flex items-center justify-center w-11 h-11 rounded-2xl font-black text-sm mb-7"
                style={{
                  background: 'rgba(197,168,128,0.12)',
                  color: '#C5A880',
                  border: '1px solid rgba(197,168,128,0.2)',
                }}
              >
                {step.num}
              </div>

              <h3
                className="font-black text-[1.1rem] text-white mb-3"
              >
                {step.title}
              </h3>

              <p
                className="text-sm leading-[1.9]"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
