import { motion } from 'framer-motion';
import { Wallet, Smartphone, LayoutDashboard, Zap } from 'lucide-react';

const services = [
  {
    icon: Wallet,
    en: 'Apple Wallet',
    title: 'تكامل Apple Wallet',
    desc: 'اشتراكات وبطاقات ولاء رقمية تُضاف مباشرةً لمحفظة عميلك — تحديث تلقائي للنقاط، QR Code، وإشعارات فورية بلا تطبيق.',
    tag: 'الأكثر طلباً',
    tagColor: '#C5A880',
    features: ['بطاقة عضوية رقمية', 'تحديث نقاط آني', 'إشعارات Wallet'],
  },
  {
    icon: Smartphone,
    en: 'Mobile Apps',
    title: 'تطبيقات الجوال',
    desc: 'تطبيقات iOS & Android متكاملة بتجربة مستخدم سلسة وتصميم Native يعكس هوية علامتك التجارية.',
    tag: null,
    tagColor: '',
    features: ['iOS & Android', 'تصميم UI/UX مخصص', 'لوحة تحكم مرفقة'],
  },
  {
    icon: LayoutDashboard,
    en: 'Web Platforms',
    title: 'المواقع ولوحات التحكم',
    desc: 'مواقع تسويقية سريعة التحميل ولوحات تحكم سحابية تمنحك رؤية كاملة لبياناتك وعملياتك في مكان واحد.',
    tag: null,
    tagColor: '',
    features: ['تحميل فائق السرعة', 'تحليلات لحظية', 'دعم متعدد المستخدمين'],
  },
  {
    icon: Zap,
    en: 'Custom Automation',
    title: 'أتمتة وAPI مخصص',
    desc: 'حلول برمجية خاصة تربط أنظمتك ببعضها — تكامل WhatsApp، ربط الأنظمة، وأتمتة العمليات التي تستهلك وقتك.',
    tag: null,
    tagColor: '',
    features: ['تكامل WhatsApp', 'ربط أنظمة خارجية', 'أتمتة كاملة'],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function Services() {
  return (
    <section id="services" className="py-32 relative" style={{ background: '#FBF9F5' }}>
      {/* Section divider */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: '#EAE6DF' }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-bold tracking-widest uppercase mb-4"
            style={{ color: '#C5A880' }}
          >
            ما نبنيه لك
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl font-black mb-5 leading-tight"
            style={{ color: '#1A1A18' }}
          >
            خدماتنا الأربع الجوهرية
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg leading-relaxed font-medium"
            style={{ color: '#7A7060' }}
          >
            لا نقدم مجرد تطبيقات — نبني منظومات رقمية متكاملة تعمل معاً لتحويل براندك إلى تجربة استثنائية.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((svc, i) => (
            <motion.div
              key={i}
              variants={cardVariant}
              className="card-shimmer group relative rounded-3xl p-8 border transition-all duration-300 cursor-default"
              style={{
                background: '#FFFFFF',
                borderColor: '#EAE6DF',
              }}
              whileHover={{
                y: -6,
                boxShadow: '0 20px 60px rgba(197,168,128,0.15)',
                borderColor: '#C5A880',
                transition: { duration: 0.3 },
              }}
            >
              {/* Tag */}
              {svc.tag && (
                <span
                  className="absolute top-6 left-6 text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: 'rgba(197,168,128,0.15)', color: svc.tagColor }}
                >
                  {svc.tag}
                </span>
              )}

              {/* Number watermark */}
              <div
                className="absolute top-6 right-6 font-black text-5xl leading-none select-none pointer-events-none transition-opacity duration-300 group-hover:opacity-100"
                style={{ color: 'rgba(197,168,128,0.08)', opacity: 0.06 }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: 'rgba(197,168,128,0.1)',
                  color: '#C5A880',
                }}
              >
                <svc.icon size={28} strokeWidth={1.5} />
              </div>

              {/* Content */}
              <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#C5A880' }}>
                {svc.en}
              </div>
              <h3 className="text-2xl font-black mb-4 leading-tight" style={{ color: '#1A1A18' }}>
                {svc.title}
              </h3>
              <p className="text-base leading-relaxed mb-7" style={{ color: '#7A7060' }}>
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

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 right-0 left-0 h-0.5 rounded-b-3xl origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ background: 'linear-gradient(to left, #C5A880, #A8895E)' }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
