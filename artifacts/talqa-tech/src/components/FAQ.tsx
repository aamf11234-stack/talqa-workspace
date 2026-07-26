import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const QS = [
  { q: 'كم يكلف تطبيق Apple Wallet؟', a: 'تبدأ أسعار بطاقات Apple Wallet من ٣٠٠٠ ريال تقريباً حسب المتطلبات. يشمل السعر البطاقة، لوحة التحكم، وتكامل Push Notifications. احسب مشروعك بالضبط عبر حاسبة الميزانية في الأعلى.' },
  { q: 'كم تستغرق مدة تطوير التطبيق؟', a: 'بطاقة Apple Wallet تستغرق ٢-٤ أسابيع، التطبيق الكامل ٦-١٢ أسبوعاً. نحدد الجدول الزمني بدقة بعد مناقشة متطلباتك خلال الاستشارة المجانية.' },
  { q: 'هل تدعمون الأجهزة الأندرويد أيضاً؟', a: 'نعم — نوفر بطاقات ولاء رقمية تعمل على Android أيضاً عبر Google Wallet أو نظام QR Code مدمج. نقدم حلاً شاملاً يغطي كل الأجهزة.' },
  { q: 'هل يمكنني تحديث التطبيق بعد الإطلاق؟', a: 'بالطبع — توفر لوحة التحكم إمكانية التحديث الكامل في أي وقت. إضافة منتجات، تعديل النقاط، إرسال إشعارات، وإضافة مستخدمين — كل ذلك بنقرة واحدة.' },
  { q: 'ما الفرق بين تلقا تك وشركات البرمجة الأخرى؟', a: 'نحن متخصصون في منظومة الولاء الرقمي وApple Wallet، ومعنا خبرة عملية في السوق السعودي. لا نبيع مشاريع نمطية — كل مشروع مخصص ٧ رأساً على عقب لبراندك.' },
  { q: 'هل هناك دعم تقني بعد الإطلاق؟', a: 'نعم — ندعمك ٢٤/٧ للأشهر الثلاثة الأولى بعد الإطلاق. بعد ذلك تتوفر خطط دعم مستمر بأسعار مناسبة. لن تُترك وحدك أبداً.' },
  { q: 'هل يمكن دمج التطبيق مع نظامي الحالي (POS / ERP)؟', a: 'نعم — نبني API مخصص يربط تطبيقك بأي نظام POS أو ERP تستخدمه. كامل عمليات المزامنة تتم تلقائياً بدون تدخل يدوي.' },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section style={{ padding: '120px 0', background: 'var(--bg)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, inset: '0 0 auto', height: 1, background: 'rgba(255,255,255,0.07)' }} />
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 28px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4F8EFF', marginBottom: 18 }}>الأسئلة الشائعة</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}
            style={{ fontWeight: 900, fontSize: 'clamp(1.8rem,3vw,2.8rem)', letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.1 }}>
            أسئلتك، إجاباتنا<br /><span className="text-blue">بوضوح تام.</span>
          </motion.h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {QS.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5 }}
              style={{ borderRadius: 14, border: `1px solid ${open === i ? 'rgba(79,142,255,0.3)' : 'rgba(255,255,255,0.07)'}`, background: open === i ? 'rgba(79,142,255,0.05)' : 'var(--surface)', overflow: 'hidden', transition: 'border-color 0.3s, background 0.3s' }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', padding: '20px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'right' }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: open === i ? '#fff' : 'rgba(255,255,255,0.75)', flex: 1, lineHeight: 1.4, transition: 'color 0.2s' }}>{item.q}</span>
                <motion.div animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.25, ease: [0.22,1,0.36,1] }}
                  style={{ width: 28, height: 28, borderRadius: 8, background: open === i ? 'rgba(79,142,255,0.15)' : 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.3s' }}>
                  <Plus size={14} color={open === i ? '#4F8EFF' : 'rgba(255,255,255,0.4)'} />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22,1,0.36,1] }}>
                    <div style={{ padding: '0 22px 20px', fontSize: 14, lineHeight: 1.9, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>{item.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          style={{ marginTop: 52, padding: '32px', borderRadius: 20, background: 'rgba(79,142,255,0.06)', border: '1px solid rgba(79,142,255,0.2)', textAlign: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 8 }}>سؤالك مش موجود هنا؟</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.38)', marginBottom: 20 }}>تحدث معنا مباشرة — نرد خلال دقائق على واتساب</div>
          <a href="https://wa.me/966551378531" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 11, background: '#25D366', color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 700, boxShadow: '0 6px 24px rgba(37,211,102,0.3)' }}>
            💬 اسألنا على واتساب
          </a>
        </motion.div>
      </div>
    </section>
  );
}
