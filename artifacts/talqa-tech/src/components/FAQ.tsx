import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const WA = 'https://wa.me/966551378531';

const QA = [
  { q: 'كم يستغرق بناء تطبيق؟', a: 'يعتمد على التعقيد. تطبيق ولاء بسيط: ٣–٤ أسابيع. نظام متكامل مثل عيادات: ٦–١٠ أسابيع. نحدد الجدول معاً في أول جلسة.', color: '#8B5CF6' },
  { q: 'كم تكلفة التطبيق؟', a: 'لا يوجد سعر ثابت — نسعّر حسب المشروع. استخدم حاسبة الأسعار في الصفحة أو تواصل معنا للحصول على عرض مخصص مجاناً.', color: '#3B82F6' },
  { q: 'هل تبنون لجميع القطاعات؟', a: 'نعم — عيادات، مطاعم وكافيهات، صالونات، نوادي لياقة، متاجر، وشركات. لدينا ديموز جاهزة لأغلب القطاعات.', color: '#06B6D4' },
  { q: 'هل تدعمون Apple Wallet؟', a: 'نعم، نبني بطاقات PassKit كاملة بـ ٨ أنواع مختلفة — تُضاف لمحفظة آبل وتُرسل Push Notifications لعملائك تلقائياً.', color: '#10B981' },
  { q: 'ما بعد التسليم؟', a: 'ندعمك ٣ أشهر مجاناً بعد الإطلاق. بعدها توجد باقات صيانة شهرية بأسعار مناسبة.', color: '#F59E0B' },
  { q: 'هل أنتم في الرياض فقط؟', a: 'مقرنا في الرياض لكننا نخدم عملاء من جميع مناطق المملكة بشكل رقمي بدون أي عائق.', color: '#EC4899' },
  { q: 'هل التطبيق يعمل على iOS وAndroid؟', a: 'نعم، نبني بـ React Native الذي يعمل على النظامين من كودبيس واحدة — يوفر الوقت والتكلفة.', color: '#A78BFA' },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" style={{ padding: 'clamp(80px,10vw,130px) 0', background: 'var(--bg2)', position: 'relative', overflow: 'hidden' }}>
      <div className="orb" style={{ width: 500, height: 500, top: '30%', left: '-10%', background: 'rgba(139,92,246,0.07)', animationDelay: '-7s' }} />

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 52 }}>
          <div className="section-label">الأسئلة الشائعة</div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,4vw,3.2rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            أجوبة واضحة{' '}
            <span className="grad">بلا تعقيد</span>
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {QA.map(({ q, a, color }, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.45 }}
              style={{
                borderRadius: 14,
                border: `1px solid ${open === i ? color + '40' : 'var(--border)'}`,
                background: open === i ? `${color}08` : 'rgba(255,255,255,0.02)',
                overflow: 'hidden',
                transition: 'border-color 0.25s, background 0.25s',
              }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '18px 22px', background: 'transparent', border: 'none',
                  cursor: 'pointer', textAlign: 'right', direction: 'rtl', gap: 14,
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
                  <div style={{ width: 4, height: 20, borderRadius: 2, background: open === i ? color : 'var(--border)', flexShrink: 0, transition: 'background 0.25s' }} />
                  <span style={{ fontSize: 'clamp(14px,1.5vw,15px)', fontWeight: 700, color: open === i ? '#fff' : 'rgba(255,255,255,0.8)', transition: 'color 0.2s' }}>{q}</span>
                </div>
                <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.25 }} style={{ flexShrink: 0 }}>
                  <ChevronDown size={16} color={open === i ? color : 'var(--text3)'} />
                </motion.span>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden' }}>
                    <div style={{ padding: '0 22px 20px 22px', paddingRight: 38, fontSize: 14, color: 'var(--text2)', lineHeight: 1.85 }}>
                      {a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: 44, textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 20 }}>سؤالك مو مذكور هنا؟</p>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-purple" style={{ fontSize: 14 }}>
            اسألنا مباشرة على واتساب ←
          </a>
        </div>
      </div>
    </section>
  );
}
