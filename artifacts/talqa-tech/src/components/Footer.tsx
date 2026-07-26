import { motion } from 'framer-motion';
import { MapPin, FileText, MessageCircle } from 'lucide-react';

const WA = 'https://wa.me/966551378531';
const nav = [
  { label: 'الخدمات',      href: '#services'   },
  { label: 'كيف نعمل',    href: '#process'    },
  { label: 'احسب مشروعك', href: '#calculator' },
  { label: 'Apple Wallet', href: '#apple'      },
  { label: 'تواصل معنا',  href: '#contact'    },
];

export default function Footer() {
  return (
    <footer id="contact" style={{ background: 'var(--bg2)', borderTop: '1px solid rgba(255,255,255,0.07)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, inset: '0 0 auto', height: 1, background: 'linear-gradient(to left, transparent, rgba(79,142,255,0.45), transparent)' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 28px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr', gap: 48, marginBottom: 64 }} className="footer-grid">

          {/* Brand */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg, #4F8EFF, #3B78FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(79,142,255,0.3)' }}>
                <span style={{ color: '#fff', fontWeight: 900, fontSize: 18, lineHeight: 1 }}>ت</span>
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 900, fontSize: 17, letterSpacing: '-0.02em', lineHeight: 1.1 }}>تلقا تك</div>
                <div style={{ color: 'rgba(79,142,255,0.65)', fontWeight: 700, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase' }}>TLGA TECH</div>
              </div>
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.9, color: 'rgba(255,255,255,0.32)', maxWidth: 300, marginBottom: 28, fontWeight: 500 }}>
              شريكك التقني الموثوق في المملكة العربية السعودية. نحوّل أفكارك إلى منتجات رقمية تضمن لك التفوق في سوقك.
            </p>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 20px', borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: 'none', background: '#25D366', color: '#fff', boxShadow: '0 4px 16px rgba(37,211,102,0.25)' }}>
              <MessageCircle size={15} /> تحدث معنا الآن
            </a>
          </motion.div>

          {/* Links */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginBottom: 20 }}>الصفحات</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
              {nav.map(c => (
                <a key={c.href} href={c.href} style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.38)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#4F8EFF')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.38)')}>
                  {c.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginBottom: 20 }}>تواصل وفروع</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <a href={WA} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.42)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.42)')}>
                <MessageCircle size={14} color="#4F8EFF" /> +966 55 137 8531
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.32)' }}>
                <FileText size={14} color="rgba(79,142,255,0.6)" /> السجل التجاري: 7054835322
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.32)' }}>
                <MapPin size={14} color="rgba(79,142,255,0.6)" style={{ flexShrink: 0, marginTop: 2 }} />
                منطقة جازان — صبيا وضمد<br />المملكة العربية السعودية
              </div>
            </div>
          </motion.div>
        </div>

        <div style={{ paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.18)', fontWeight: 500 }}>© {new Date().getFullYear()} تلقا تك (Tlga Tech) — جميع الحقوق محفوظة.</p>
          <div style={{ display: 'flex', gap: 20, fontSize: 12, color: 'rgba(255,255,255,0.18)', fontWeight: 500 }}>
            <span style={{ cursor: 'pointer', transition: 'color .2s' }} onMouseEnter={e=>(e.currentTarget.style.color='rgba(255,255,255,0.5)')} onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.18)')}>شروط الاستخدام</span>
            <span style={{ cursor: 'pointer', transition: 'color .2s' }} onMouseEnter={e=>(e.currentTarget.style.color='rgba(255,255,255,0.5)')} onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.18)')}>سياسة الخصوصية</span>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.footer-grid{grid-template-columns:1fr!important}}`}</style>
    </footer>
  );
}
