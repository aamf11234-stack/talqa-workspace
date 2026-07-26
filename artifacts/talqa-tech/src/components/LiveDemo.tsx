import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, MessageCircle, ChevronLeft, ArrowLeft } from 'lucide-react';

const WA = 'https://wa.me/966551378531';

const SECTORS = [
  {
    id: 'cafe',
    emoji: '☕',
    label: 'مطاعم وكافيهات',
    sub: 'ولاء رقمي + Apple Wallet',
    color: '#C8996C',
    bg: 'linear-gradient(145deg,#1A120A,#120D06)',
    border: 'rgba(200,153,108,0.25)',
    demo: '/brown-dose/',
    demoLabel: 'شاهد ديمو Brown Dose',
    badge: 'ديمو جاهز',
    screens: [
      { label: 'بطاقة Wallet', lines: ['Gold Member', '٢٬٤٥٠ نقطة', '───────────', 'عرض خاص 🎉 -20%'] },
      { label: 'لوحة التحكم', lines: ['أعضاء: ١٢٤', 'مبيعات: ٨٩٣ر.س', '↑ +١٢٪ هذا الشهر', 'آخر زيارة: ٣د'] },
    ],
    features: ['Apple Wallet', 'Push Notifications', 'QR Code', 'نقاط ومستويات', 'لوحة تحكم'],
    desc: 'عميلك يضيف بطاقتك لمحفظة آبل بلمسة واحدة — ويستقبل عروضك على شاشة قفله تلقائياً.',
  },
  {
    id: 'clinic',
    emoji: '🏥',
    label: 'عيادات وصحة',
    sub: 'إدارة مواعيد + ملفات مرضى',
    color: '#4F8EFF',
    bg: 'linear-gradient(145deg,#0A0E1A,#07090F)',
    border: 'rgba(79,142,255,0.25)',
    demo: '/clinic-demo/',
    demoLabel: 'شاهد ديمو العيادة',
    badge: 'ديمو جاهز',
    screens: [
      { label: 'المواعيد', lines: ['أحمد محمد - 9:00', 'سارة علي  - 10:30', 'خالد الزهراني - 12:00', '+ ٥ مواعيد أخرى'] },
      { label: 'ملف المريض', lines: ['الاسم: سارة علي', 'العمر: ٢٨ سنة', 'آخر زيارة: الأمس', 'وصفة: معلقة ✏️'] },
    ],
    features: ['إدارة المواعيد', 'ملفات المرضى', 'الوصفات الطبية', 'تقارير يومية', 'تطبيق iOS/Android'],
    desc: 'نظام إدارة عيادة متكامل — من الحجز حتى الوصفة. يعمل على الويب والجوال بدون تدريب.',
  },
  {
    id: 'salon',
    emoji: '💇',
    label: 'صالونات وسبا',
    sub: 'حجوزات + ولاء + Apple Wallet',
    color: '#F472B6',
    bg: 'linear-gradient(145deg,#1A0A12,#0F070A)',
    border: 'rgba(244,114,182,0.25)',
    demo: null,
    demoLabel: 'طلب ديمو خاص',
    badge: 'قريباً',
    screens: [
      { label: 'الحجوزات', lines: ['تلوين شعر - 3pm', 'كيراتين - 5:30pm', 'مانيكير - 7pm', '+ ٤ مواعيد باقية'] },
      { label: 'الولاء', lines: ['نادية الزهراني', 'Gold Member ✦', 'النقاط: ١٨٠٠', 'مكافأة: قريباً 🎁'] },
    ],
    features: ['Apple Wallet', 'حجوزات أونلاين', 'تذكير واتساب', 'نقاط وولاء', 'جدول المواعيد'],
    desc: 'نظام صالون احترافي يملأ مواعيدك تلقائياً ويُذكّر عميلاتك قبل موعدهن بساعة.',
  },
  {
    id: 'gym',
    emoji: '🏋️',
    label: 'نوادي لياقة',
    sub: 'اشتراكات + حضور + Apple Wallet',
    color: '#34D399',
    bg: 'linear-gradient(145deg,#0A1A12,#070F0A)',
    border: 'rgba(52,211,153,0.25)',
    demo: null,
    demoLabel: 'طلب ديمو خاص',
    badge: 'قريباً',
    screens: [
      { label: 'الاشتراك', lines: ['محمد الحارثي', 'باقة: Premium ⚡', 'ينتهي: ١٥ أغسطس', 'QR للدخول: ▦'] },
      { label: 'الحضور', lines: ['هذا الأسبوع: ٤x', 'الشهر: ١٦ زيارة', 'أفضل وقت: 7am', '🔥 ٢١ يوم متواصل'] },
    ],
    features: ['Apple Wallet', 'QR دخول', 'تتبع الحضور', 'إدارة الاشتراكات', 'Push تنبيهات'],
    desc: 'بطاقة عضوية على Apple Wallet تفتح الباب بـ QR وتتابع حضور أعضائك تلقائياً.',
  },
  {
    id: 'store',
    emoji: '🛒',
    label: 'متاجر',
    sub: 'ولاء + Wallet + تطبيق',
    color: '#A78BFA',
    bg: 'linear-gradient(145deg,#120A1A,#0A070F)',
    border: 'rgba(167,139,250,0.25)',
    demo: null,
    demoLabel: 'طلب ديمو خاص',
    badge: 'قريباً',
    screens: [
      { label: 'متجرك', lines: ['الطلب #١٢٣٤', 'الحالة: يُجهَّز ⚙️', 'وقت التسليم: 30د', 'تتبع مباشر 📍'] },
      { label: 'النقاط', lines: ['نقاطي: ٣٤٠٠', 'قيمتها: ٣٤ ر.س', 'أحدث صفقة: -١٥٪', 'استبدل الآن 🎁'] },
    ],
    features: ['تطبيق iOS/Android', 'Apple Wallet', 'نقاط بكل شراء', 'إشعارات العروض', 'تتبع الطلبات'],
    desc: 'تطبيق متجر يجمع الطلبات والولاء وApple Wallet في مكان واحد — يعيد عميلك مراراً.',
  },
];

/* ── Mini phone preview ── */
function MiniPhone({ screens, color }: { screens: typeof SECTORS[0]['screens']; color: string }) {
  const [s, setS] = useState(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flexShrink: 0 }}>
      <div style={{ width: 130, borderRadius: 24, background: '#0C0C14', border: '3px solid #1A1A24', boxShadow: `0 20px 50px rgba(0,0,0,0.6), 0 0 30px ${color}18`, overflow: 'hidden' }}>
        <div style={{ height: 18, background: '#080810', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 38, height: 9, borderRadius: 8, background: '#000' }} />
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={s} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }}
            style={{ height: 190, background: 'linear-gradient(160deg,#0D0D18,#111120)', padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: color, opacity: 0.7, marginBottom: 2 }}>{screens[s].label}</div>
            {screens[s].lines.map((line, i) => (
              <div key={i} style={{ fontSize: 10, fontWeight: i === 0 ? 800 : 500, color: i === 0 ? '#fff' : 'rgba(255,255,255,0.4)', padding: '5px 8px', background: i === 0 ? `${color}12` : 'rgba(255,255,255,0.03)', borderRadius: 6, border: i === 0 ? `1px solid ${color}20` : '1px solid transparent', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{line}</div>
            ))}
          </motion.div>
        </AnimatePresence>
        <div style={{ height: 14, background: '#080810', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 36, height: 3, borderRadius: 99, background: 'rgba(255,255,255,0.1)' }} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 5 }}>
        {screens.map((_, i) => (
          <button key={i} onClick={() => setS(i)} style={{ width: s === i ? 16 : 6, height: 5, borderRadius: 99, border: 'none', cursor: 'pointer', background: s === i ? color : 'rgba(255,255,255,0.15)', transition: 'all 0.3s', padding: 0 }} />
        ))}
      </div>
    </div>
  );
}

export default function LiveDemo() {
  const [active, setActive] = useState<string | null>(null);
  const sector = SECTORS.find(s => s.id === active);

  return (
    <section style={{ padding: 'clamp(72px,10vw,120px) 0', background: 'var(--bg2)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, inset: '0 0 auto', height: 1, background: 'rgba(255,255,255,0.07)' }} />
      <div style={{ position: 'absolute', bottom: 0, inset: 'auto 0 0', height: 1, background: 'rgba(255,255,255,0.07)' }} />
      {sector && (
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 500, borderRadius: '50%', background: `radial-gradient(ellipse, ${sector.color}08, transparent 60%)`, filter: 'blur(80px)', pointerEvents: 'none', transition: 'background 0.8s' }} />
      )}

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4F8EFF', marginBottom: 16 }}>جرّب قبل أن تشتري</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ fontWeight: 900, fontSize: 'clamp(1.8rem,3.5vw,2.9rem)', letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.1, marginBottom: 12 }}>
            اختر قطاعك<br /><span className="text-blue">وشاهد النتيجة حيّاً.</span>
          </motion.h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.32)', maxWidth: 420, margin: '0 auto' }}>
            ديموز حقيقية تعمل الآن — ليس صور أو موكاب.
          </p>
        </div>

        {/* Sector tabs */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 40 }}>
          {SECTORS.map(s => (
            <motion.button key={s.id} onClick={() => setActive(active === s.id ? null : s.id)}
              whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}
              style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '11px 18px', borderRadius: 99, cursor: 'pointer', border: `1.5px solid ${active === s.id ? s.color + '50' : 'rgba(255,255,255,0.09)'}`, background: active === s.id ? `${s.color}10` : 'rgba(255,255,255,0.03)', transition: 'all 0.25s', position: 'relative' }}>
              <span style={{ fontSize: 18 }}>{s.emoji}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: active === s.id ? '#fff' : 'rgba(255,255,255,0.55)' }}>{s.label}</span>
              {s.badge === 'ديمو جاهز' && (
                <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 4, background: `${s.color}18`, color: s.color, border: `1px solid ${s.color}30`, letterSpacing: '0.08em' }}>LIVE</span>
              )}
              {s.badge === 'قريباً' && (
                <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 4, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.08)' }}>قريباً</span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          {sector && (
            <motion.div key={sector.id}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22,1,0.36,1] }}
              style={{ borderRadius: 24, border: `1px solid ${sector.border}`, background: sector.bg, overflow: 'hidden' }}>

              <div className="demo-panel" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 0, alignItems: 'stretch' }}>

                {/* Text */}
                <div style={{ padding: 'clamp(28px,4vw,48px)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, background: `${sector.color}12`, border: `1px solid ${sector.color}25` }}>{sector.emoji}</div>
                    <div>
                      <h3 style={{ fontSize: 'clamp(1.3rem,2.5vw,1.9rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 5 }}>{sector.label}</h3>
                      <div style={{ fontSize: 12, color: `${sector.color}88`, fontWeight: 600 }}>{sector.sub}</div>
                    </div>
                  </div>

                  <p style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(255,255,255,0.45)', marginBottom: 24, maxWidth: 480 }}>{sector.desc}</p>

                  {/* Features */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 32 }}>
                    {sector.features.map(f => (
                      <span key={f} style={{ fontSize: 11, fontWeight: 700, padding: '5px 12px', borderRadius: 7, background: `${sector.color}0C`, border: `1px solid ${sector.color}20`, color: sector.color }}>✓ {f}</span>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
                    {sector.demo ? (
                      <a href={sector.demo} target="_blank" rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 24px', borderRadius: 12, background: sector.color, color: '#000', textDecoration: 'none', fontSize: 14, fontWeight: 800, boxShadow: `0 8px 28px ${sector.color}35`, transition: 'all 0.2s' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = ''}>
                        <ExternalLink size={15} /> {sector.demoLabel} ←
                      </a>
                    ) : (
                      <a href={`${WA}?text=${encodeURIComponent(`السلام عليكم، أريد ديمو لـ${sector.label}`)}`} target="_blank" rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 24px', borderRadius: 12, background: '#25D366', color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 800, boxShadow: '0 8px 28px rgba(37,211,102,0.3)' }}>
                        <MessageCircle size={15} /> اطلب ديمو لـ{sector.label}
                      </a>
                    )}
                    <a href={`${WA}?text=${encodeURIComponent(`أريد نظاماً مثل هذا لـ${sector.label}`)}`} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '13px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 13, fontWeight: 700, transition: 'all 0.2s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}>
                      ابنِ هذا لمشروعي <ArrowLeft size={13} />
                    </a>
                  </div>
                </div>

                {/* Phone preview */}
                <div className="demo-phone" style={{ padding: '40px 40px 40px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MiniPhone screens={sector.screens} color={sector.color} />
                </div>
              </div>

              {/* Bottom: live badge */}
              {sector.demo && (
                <div style={{ borderTop: `1px solid ${sector.border}`, padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#34D399', boxShadow: '0 0 8px #34D399', animation: 'live-pulse 2s infinite' }} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)' }}>ديمو حي يعمل الآن — شاهده على أي جهاز</span>
                  </div>
                  <a href={sector.demo} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: sector.color, textDecoration: 'none' }}>
                    فتح في تبويب جديد <ExternalLink size={11} />
                  </a>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* If nothing selected: hint */}
        {!active && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="demo-hint"
            style={{ textAlign: 'center', padding: '48px 20px', borderRadius: 20, border: '1px dashed rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.015)' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>👆</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.35)' }}>اختر قطاعك من الأعلى</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.2)', marginTop: 6 }}>وشاهد ديمو حقيقي من مشاريعنا</div>
          </motion.div>
        )}
      </div>

      <style>{`
        @keyframes live-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.85)} }
        @media(max-width:700px){
          .demo-panel{grid-template-columns:1fr!important}
          .demo-phone{display:none!important}
        }
      `}</style>
    </section>
  );
}
