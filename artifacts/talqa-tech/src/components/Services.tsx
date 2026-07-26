import { motion } from 'framer-motion';
import { Wallet, Smartphone, LayoutDashboard, Zap } from 'lucide-react';

const services = [
  {
    icon: Wallet,
    en: 'Apple Wallet',
    title: 'تكامل Apple Wallet',
    desc: 'بطاقات ولاء رقمية تُضاف مباشرةً لمحفظة عميلك. تحديث تلقائي للنقاط، QR Code للاسترداد، وإشعارات فورية — كل ذلك بدون تطبيق.',
    tag: 'الأكثر طلباً',
    features: ['بطاقة عضوية رقمية', 'تحديث نقاط آني', 'إشعارات Wallet'],
    accent: '#C5A880',
  },
  {
    icon: Smartphone,
    en: 'Mobile Apps',
    title: 'تطبيقات الجوال',
    desc: 'تطبيقات iOS & Android بتجربة مستخدم Native سلسة وتصميم مخصص يعكس هوية علامتك التجارية بالكامل.',
    tag: null,
    features: ['iOS & Android', 'تصميم UI/UX مخصص', 'لوحة تحكم مدمجة'],
    accent: '#1A1A18',
  },
  {
    icon: LayoutDashboard,
    en: 'Web Platforms',
    title: 'المواقع ولوحات التحكم',
    desc: 'مواقع تسويقية سريعة التحميل ولوحات تحكم سحابية تمنحك رؤية كاملة على بياناتك وعملياتك في مكان واحد.',
    tag: null,
    features: ['أداء فائق', 'تحليلات لحظية', 'صلاحيات متعددة'],
    accent: '#4B7BEC',
  },
  {
    icon: Zap,
    en: 'Automation & API',
    title: 'أتمتة وحلول مخصصة',
    desc: 'حلول برمجية خاصة تربط أنظمتك ببعضها — تكامل واتساب، ربط API خارجي، وأتمتة العمليات التي تستهلك وقتك يومياً.',
    tag: null,
    features: ['تكامل واتساب', 'ربط أنظمة API', 'أتمتة كاملة'],
    accent: '#E85D4A',
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-32 relative"
      style={{ background: '#FBF9F5' }}
    >
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: '#EAE6DF' }} />

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="max-w-xl mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-[11px] font-bold tracking-[0.15em] uppercase mb-5"
            style={{ color: '#C5A880' }}
          >
            ما نبنيه لك
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="font-black leading-tight mb-5"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1A1A18' }}
          >
            خدماتنا الأربع الجوهرية
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg leading-[1.8] font-medium"
            style={{ color: '#7A7060' }}
          >
            لا نقدم مجرد تطبيقات. نبني منظومات رقمية متكاملة تعمل معاً لتحويل براندك إلى تجربة لا تُنسى.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-3xl p-8 border overflow-hidden cursor-default transition-all duration-400"
              style={{
                background: '#FFFFFF',
                borderColor: '#EAE6DF',
              }}
              whileHover={{
                y: -5,
                boxShadow: '0 24px 60px rgba(26,26,24,0.09)',
                borderColor: svc.accent === '#C5A880' ? '#C5A880' : '#D8D4CD',
                transition: { duration: 0.3 },
              }}
            >
              {/* Tag */}
              {svc.tag && (
                <div
                  className="absolute top-7 left-7 text-[11px] font-bold px-3 py-1 rounded-full tracking-wide"
                  style={{ background: 'rgba(197,168,128,0.12)', color: '#A8895E' }}
                >
                  {svc.tag}
                </div>
              )}

              {/* Index */}
              <div
                className="absolute top-7 right-8 font-black text-6xl leading-none select-none pointer-events-none"
                style={{ color: 'rgba(26,26,24,0.04)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-7 transition-all duration-300 group-hover:scale-[1.08]"
                style={{
                  background: `${svc.accent}14`,
                  color: svc.accent,
                }}
              >
                <svc.icon size={26} strokeWidth={1.6} />
              </div>

              {/* Label */}
              <div
                className="text-[11px] font-bold tracking-[0.14em] uppercase mb-2"
                style={{ color: svc.accent === '#C5A880' ? '#A8895E' : '#B0A898' }}
              >
                {svc.en}
              </div>

              {/* Title */}
              <h3
                className="font-black text-[1.35rem] leading-tight mb-4"
                style={{ color: '#1A1A18' }}
              >
                {svc.title}
              </h3>

              {/* Description */}
              <p
                className="text-[0.94rem] leading-[1.85] mb-8"
                style={{ color: '#7A7060' }}
              >
                {svc.desc}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {svc.features.map(f => (
                  <span
                    key={f}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{ background: '#F4F1EB', color: '#7A7060' }}
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* Bottom reveal line */}
              <div
                className="absolute bottom-0 inset-x-0 h-[3px] rounded-b-3xl origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ background: `linear-gradient(to left, ${svc.accent}, ${svc.accent}88)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
