import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const REVIEWS = [
  { name: 'أحمد المالكي', role: 'صاحب سلسلة مقاهي، جازان', stars: 5, text: 'تلقا تك غيّرت طريقة تعاملنا مع عملائنا. بطاقة Apple Wallet لقيت قبولاً خرافياً — العملاء يشاركونها بأنفسهم!', avatar: 'أ' },
  { name: 'سارة القحطاني', role: 'مديرة صالون تجميل، صبيا', stars: 5, text: 'التطبيق جاء أفضل من توقعاتي. التصميم احترافي، التسليم في الوقت المحدد، والدعم بعد الإطلاق ممتاز.', avatar: 'س' },
  { name: 'محمد الحارثي', role: 'مدير مطعم، ضمد', stars: 5, text: 'ربحنا من نظام الولاء أكثر مما دفعناه في أول شهرين. الاستثمار كان يستحق بالكامل.', avatar: 'م' },
  { name: 'نورة العسيري', role: 'صاحبة متجر إلكتروني', stars: 5, text: 'الفريق يفهم السوق المحلي — كل تفصيل في التطبيق يعكس ذوق العميل السعودي. ممتازون.', avatar: 'ن' },
  { name: 'فهد الزهراني', role: 'مدير عيادة طبية، جازان', stars: 5, text: 'لوحة التحكم سهّلت إدارة المواعيد بشكل لا يُصدق. أنصح كل عيادة بالتواصل مع تلقا تك.', avatar: 'ف' },
  { name: 'خالد البارقي', role: 'صاحب مركز لياقة، صبيا', stars: 5, text: 'الدعم الفني متواجد ٢٤/٧ فعلاً — رسائلي تجد رداً خلال دقائق. ثقة حقيقية لا كلام فارغ.', avatar: 'خ' },
];

function ReviewCard({ r, i }: { r: typeof REVIEWS[0]; i: number }) {
  return (
    <div style={{ width: 300, flexShrink: 0, padding: '24px 22px', borderRadius: 18, background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Stars */}
      <div style={{ display: 'flex', gap: 3 }}>
        {[...Array(r.stars)].map((_, j) => <Star key={j} size={13} fill="#F59E0B" color="#F59E0B" />)}
      </div>
      {/* Text */}
      <p style={{ fontSize: 13.5, lineHeight: 1.85, color: 'rgba(255,255,255,0.55)', fontWeight: 500, flex: 1 }}>"{r.text}"</p>
      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: `hsl(${i * 60 + 220},60%,40%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900, color: '#fff', flexShrink: 0 }}>{r.avatar}</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>{r.name}</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>{r.role}</div>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ reversed = false }) {
  const reviews = reversed ? [...REVIEWS].reverse() : REVIEWS;
  return (
    <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
      <div style={{ display: 'flex', gap: 14, animation: `tm-${reversed ? 'r' : 'f'} ${reversed ? 42 : 36}s linear infinite`, width: 'max-content', alignItems: 'stretch' }}>
        {[...reviews, ...reviews].map((r, i) => <ReviewCard key={i} r={r} i={i % REVIEWS.length} />)}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section style={{ padding: '100px 0', background: 'var(--bg2)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, inset: '0 0 auto', height: 1, background: 'rgba(255,255,255,0.07)' }} />
      <div style={{ position: 'absolute', bottom: 0, inset: 'auto 0 0', height: 1, background: 'rgba(255,255,255,0.07)' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px', marginBottom: 52 }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#F59E0B', marginBottom: 16 }}>آراء عملائنا</motion.div>
        <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}
          style={{ fontWeight: 900, fontSize: 'clamp(1.8rem,3vw,2.8rem)', letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.1 }}>
          عملاء سعداء.<br /><span style={{ background: 'linear-gradient(135deg,#FCD34D,#F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>نتائج حقيقية.</span>
        </motion.h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <MarqueeRow />
        <MarqueeRow reversed />
      </div>

      <style>{`
        @keyframes tm-f { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes tm-r { from{transform:translateX(-50%)} to{transform:translateX(0)} }
      `}</style>
    </section>
  );
}
