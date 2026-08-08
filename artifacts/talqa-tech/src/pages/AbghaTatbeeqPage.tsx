import { motion } from 'framer-motion';
import { Check, MessageCircle, Smartphone, CreditCard, Globe, Clock, Shield } from 'lucide-react';

const WA = 'https://wa.me/966551378531?text=السلام%20عليكم%2C%20ابغى%20تطبيق%20جوال%20لمشروعي';

const FEATURES = [
  { icon: Smartphone, title: 'تطبيق iOS وAndroid', desc: 'تطبيق واحد يشتغل على iPhone وAndroid بتصميم Native فاخر' },
  { icon: CreditCard, title: 'Apple Wallet مجاناً', desc: 'بطاقة ولاء رقمية تُضاف لجوال عميلك بضغطة واحدة' },
  { icon: Globe, title: 'لوحة تحكم كاملة', desc: 'تحكم في تطبيقك وتتابع العملاء والطلبات من أي مكان' },
  { icon: Clock, title: 'تسليم في ٣ أسابيع', desc: 'نبدأ الأسبوع هذا ونسلّم تطبيقك الكامل في ٢١ يوم' },
  { icon: Shield, title: 'كود ملكك بالكامل', desc: 'ما فيه رسوم شهرية ولا عمولة — الكود ملكك تعمل فيه ما تبي' },
  { icon: Check, title: 'ضمان رضا ٣ أشهر', desc: 'أي خطأ أو تعديل — نصلحه مجاناً خلال ٩٠ يوم من التسليم' },
];

const SECTORS = [
  { emoji: '🍽️', name: 'مطاعم وكافيهات' },
  { emoji: '🏥', name: 'عيادات طبية' },
  { emoji: '💪', name: 'نوادي رياضية' },
  { emoji: '💇', name: 'صالونات تجميل' },
  { emoji: '🛍️', name: 'متاجر إلكترونية' },
  { emoji: '🏨', name: 'فنادق وشقق' },
  { emoji: '📚', name: 'مراكز تعليمية' },
  { emoji: '🚗', name: 'معارض سيارات' },
];

const STEPS = [
  { n: '١', title: 'تواصل معنا', desc: 'أرسل لنا على واتساب فكرة تطبيقك — نرد خلال ساعتين' },
  { n: '٢', title: 'جلسة تحليل مجانية', desc: 'نجلس معك ٣٠ دقيقة نفهم فيها كل ما تحتاجه' },
  { n: '٣', title: 'نبدأ التطوير', desc: 'فريقنا يبدأ الكود فوراً مع تحديثات يومية لك على واتساب' },
  { n: '٤', title: 'استلم تطبيقك', desc: 'تطبيقك جاهز على App Store وGoogle Play في ٣ أسابيع' },
];

export default function AbghaTatbeeqPage() {
  return (
    <div style={{ background: 'var(--bg)', color: '#fff', fontFamily: 'Cairo, sans-serif', direction: 'rtl', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.18), transparent 70%)', filter: 'blur(60px)' }} />
          <div style={{ position: 'absolute', bottom: '0', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%)', filter: 'blur(60px)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 760, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ marginBottom: 28 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 22px', borderRadius: 99, background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', fontSize: 14, fontWeight: 700, color: '#C4B5FD' }}>
              🚀 تطبيقك جاهز في ٣ أسابيع بـ <strong style={{ color: '#fff' }}>٤٩٩ ريال</strong>
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
            style={{ fontWeight: 900, fontSize: 'clamp(2.8rem,8vw,5.5rem)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: 24 }}>
            <span style={{ color: '#fff' }}>ابغى تطبيق</span>
            <br />
            <span style={{ background: 'linear-gradient(135deg,#8B5CF6,#EC4899,#F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              لمشروعي في السعودية؟
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
            style={{ fontSize: 'clamp(16px,2vw,20px)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.85, maxWidth: 580, margin: '0 auto 40px' }}>
            تلقا تك تبني تطبيقك الجوال <strong style={{ color: '#fff' }}>iOS وAndroid</strong> + بطاقة Apple Wallet + لوحة تحكم —
            كل هذا بـ <strong style={{ color: '#F59E0B' }}>٤٩٩ ريال</strong> دفعة واحدة. الكود ملكك، بدون رسوم شهرية.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 32px', borderRadius: 14, background: 'linear-gradient(135deg,#8B5CF6,#7C3AED)', border: 'none', color: '#fff', fontSize: 17, fontWeight: 800, textDecoration: 'none', cursor: 'pointer' }}>
              <MessageCircle size={20} />
              ابدأ مشروعك الآن مجاناً
            </a>
            <a href="/pricing"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 14, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: 16, fontWeight: 700, textDecoration: 'none' }}>
              شوف الأسعار
            </a>
          </motion.div>
        </div>
      </section>

      {/* Sectors */}
      <section style={{ padding: 'clamp(60px,10vw,120px) 24px', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, marginBottom: 16, color: '#fff' }}>
          ابغى تطبيق لـ … أي قطاع كان
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 17, marginBottom: 48 }}>
          طوّرنا تطبيقات لأكثر من ١٠ قطاعات في المملكة العربية السعودية
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 16 }}>
          {SECTORS.map(s => (
            <div key={s.name} style={{ padding: '20px 16px', borderRadius: 16, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>{s.emoji}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>{s.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: 'clamp(60px,10vw,120px) 24px', maxWidth: 960, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, color: '#fff', marginBottom: 12 }}>
            كل اللي تحتاجه في تطبيق واحد
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 17 }}>بـ ٤٩٩ ريال تحصل على منظومة متكاملة</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 20 }}>
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              style={{ padding: '28px 24px', borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <f.icon size={28} color="#8B5CF6" style={{ marginBottom: 14 }} />
              <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{f.title}</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section style={{ padding: 'clamp(60px,10vw,120px) 24px', maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, color: '#fff', marginBottom: 12 }}>
          كيف تحصل على تطبيقك؟
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 17, marginBottom: 56 }}>٤ خطوات بسيطة من الفكرة للتطبيق</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 20 }}>
          {STEPS.map((s, i) => (
            <motion.div key={s.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              style={{ padding: '28px 20px', borderRadius: 20, background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', textAlign: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg,#8B5CF6,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 900, color: '#fff', margin: '0 auto 16px' }}>{s.n}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(60px,10vw,100px) 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '60px 40px', borderRadius: 28, background: 'linear-gradient(135deg,rgba(139,92,246,0.15),rgba(59,130,246,0.08))', border: '1px solid rgba(139,92,246,0.25)' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 900, color: '#fff', marginBottom: 16 }}>
            ابغى تطبيق؟ ابدأ اليوم
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1.8, marginBottom: 36 }}>
            استشارة مجانية ٣٠ دقيقة نفهم فيها فكرتك ونقترح الحل الأمثل — بدون أي التزام
          </p>
          <a href={WA} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', borderRadius: 14, background: 'linear-gradient(135deg,#8B5CF6,#7C3AED)', color: '#fff', fontSize: 18, fontWeight: 800, textDecoration: 'none' }}>
            <MessageCircle size={22} />
            تواصل معنا على واتساب
          </a>
          <div style={{ marginTop: 20, fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
            رد خلال ساعتين · استشارة مجانية · بدون التزام
          </div>
        </div>
      </section>
    </div>
  );
}
