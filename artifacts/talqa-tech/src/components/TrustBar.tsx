import { motion } from 'framer-motion';
import { ShieldCheck, Clock3, HeartHandshake, Star } from 'lucide-react';

const items = [
  {
    icon: ShieldCheck,
    title: 'جودة مضمونة',
    desc: 'كل مشروع يخضع لاختبار شامل قبل التسليم — لا أخطاء خفية، لا مفاجآت.',
  },
  {
    icon: Clock3,
    title: 'الالتزام بالمواعيد',
    desc: 'نسلّم في الموعد ونُبلّغك بكل تحديث أسبوعي طوال فترة التطوير.',
  },
  {
    icon: HeartHandshake,
    title: 'شراكة طويلة الأمد',
    desc: 'لسنا نكمل ونختفي — نحن شريكك التقني قبل وبعد الإطلاق.',
  },
  {
    icon: Star,
    title: 'خبرة في قطاعات متعددة',
    desc: 'مشاريع ناجحة في قطاع المطاعم، العيادات، الصالونات، والتجزئة.',
  },
];

export default function TrustBar() {
  return (
    <section
      className="py-24 relative"
      style={{ background: '#FBF9F5' }}
    >
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: '#EAE6DF' }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(197,168,128,0.1)', color: '#C5A880' }}
              >
                <item.icon size={22} strokeWidth={1.6} />
              </div>
              <div>
                <div
                  className="font-black text-base mb-2"
                  style={{ color: '#1A1A18' }}
                >
                  {item.title}
                </div>
                <div
                  className="text-sm leading-[1.85]"
                  style={{ color: '#7A7060' }}
                >
                  {item.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
