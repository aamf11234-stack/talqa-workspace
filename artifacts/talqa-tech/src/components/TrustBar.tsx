import { motion } from 'framer-motion';
import { ShieldCheck, Clock3, HeartHandshake, Award } from 'lucide-react';

const items = [
  { icon: ShieldCheck, title: 'ضمان الجودة', desc: 'كل مشروع يخضع لاختبار شامل قبل التسليم.' },
  { icon: Clock3, title: 'التسليم في الموعد', desc: 'نلتزم بالجداول الزمنية ونبلّغك بكل تحديث.' },
  { icon: HeartHandshake, title: 'دعم ما بعد الإطلاق', desc: 'لسنا نكمل ونختفي — نحن شريكك على المدى البعيد.' },
  { icon: Award, title: 'خبرة موثّقة', desc: 'مشاريع ناجحة في قطاعات المطاعم، العيادات، والتجزئة.' },
];

export default function TrustBar() {
  return (
    <section className="py-24 relative" style={{ background: '#FBF9F5' }}>
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: '#EAE6DF' }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className="flex flex-col items-center text-center gap-4"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(197,168,128,0.1)', color: '#C5A880' }}
              >
                <item.icon size={26} strokeWidth={1.5} />
              </div>
              <div>
                <div className="font-black text-base mb-1.5" style={{ color: '#1A1A18' }}>{item.title}</div>
                <div className="text-sm leading-relaxed" style={{ color: '#7A7060' }}>{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
