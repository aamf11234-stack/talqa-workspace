import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const WA = 'https://wa.me/966551378531';

const QA = [
  { q: 'كم يستغرق بناء تطبيق؟', a: 'يعتمد على التعقيد. تطبيق ولاء بسيط: ٣–٤ أسابيع. نظام متكامل مثل عيادات: ٦–١٠ أسابيع. نحدد الجدول معاً في أول جلسة.' },
  { q: 'كم تكلفة التطبيق؟', a: 'لا يوجد سعر ثابت — نسعّر حسب المشروع. استخدم حاسبة الأسعار في الصفحة أو تواصل معنا للحصول على عرض مخصص مجاناً.' },
  { q: 'هل تبنون لجميع القطاعات؟', a: 'نعم — عيادات، مطاعم وكافيهات، صالونات، نوادي لياقة، متاجر، وشركات. لدينا ديموز جاهزة لأغلب القطاعات.' },
  { q: 'هل تدعمون Apple Wallet؟', a: 'نعم، نبني بطاقات PassKit كاملة تُضاف لمحفظة آبل وتُرسل Push Notifications لعملائك تلقائياً.' },
  { q: 'ما بعد التسليم؟', a: 'ندعمك ٣ أشهر مجاناً بعد الإطلاق. بعدها توجد باقات صيانة شهرية باسعار مناسبة.' },
  { q: 'هل أنتم في الرياض فقط؟', a: 'مقرنا في الرياض لكننا نخدم عملاء من جميع مناطق المملكة بشكل رقمي بدون أي عائق.' },
  { q: 'هل التطبيق يعمل على iOS وAndroid؟', a: 'نعم، نبني بـ React Native الذي يعمل على النظامين من كودبيس واحدة — يوفر الوقت والتكلفة.' },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" style={{ padding: 'clamp(72px,10vw,120px) 0', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>الأسئلة الشائعة</div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.9rem,3.5vw,3rem)', letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.1 }}>
            أجوبة واضحة<br /><span className="text-blue">بلا تعقيد.</span>
          </h2>
        </div>

        <div style={{ border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          {QA.map(({ q, a }, i) => (
            <div key={i} style={{ borderBottom: i < QA.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'clamp(16px,2.5vw,22px) clamp(20px,3vw,28px)', background: open === i ? 'rgba(255,255,255,0.025)' : 'transparent', border: 'none', cursor: 'pointer', textAlign: 'right', direction: 'rtl', gap: 12, transition: 'background 0.2s' }}>
                <span style={{ fontSize: 'clamp(13px,1.4vw,15px)', fontWeight: 700, color: '#fff', flex: 1 }}>{q}</span>
                <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.25 }} style={{ flexShrink: 0 }}>
                  <ChevronDown size={16} color="var(--text3)" />
                </motion.span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden' }}>
                    <div style={{ padding: '0 clamp(20px,3vw,28px) clamp(16px,2.5vw,22px)', fontSize: 'clamp(13px,1.4vw,14px)', color: 'var(--text2)', lineHeight: 1.8 }}>
                      {a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 16 }}>سؤالك مو مذكور هنا؟</p>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-blue" style={{ fontSize: 14 }}>
            <span className="holo-shimmer" />
            اسألنا مباشرة على واتساب ←
          </a>
        </div>
      </div>
    </section>
  );
}
