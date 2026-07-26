import { motion } from 'framer-motion';

const WA = 'https://wa.me/966551378531';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: 'clamp(56px,7vw,88px) 0 32px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: 300, background: 'radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        {/* Top CTA banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ marginBottom: 72, padding: 'clamp(28px,5vw,48px)', borderRadius: 24, background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(59,130,246,0.10))', border: '1px solid rgba(139,92,246,0.2)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(139,92,246,0.12)', filter: 'blur(40px)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 14 }}>
              جاهز تبدأ مشروعك؟ <span className="grad">تحدث معنا الآن.</span>
            </div>
            <p style={{ color: 'var(--text2)', fontSize: 15, marginBottom: 24 }}>مشاورة مجانية — بدون التزام. نرد خلال ساعات.</p>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-purple" style={{ fontSize: 15 }}>
              ابدأ مشروعك على واتساب ←
            </a>
          </div>
        </motion.div>

        {/* Links grid */}
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr 1fr', gap: 'clamp(28px,4vw,52px)', marginBottom: 52 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, var(--purple), var(--blue))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, color: '#fff' }}>ت</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 900, color: '#fff', lineHeight: 1 }}>تلقا تك</div>
                <div style={{ fontSize: 9, fontWeight: 600, color: 'var(--text3)', letterSpacing: '0.08em' }}>TLGA TECH</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.85, maxWidth: 220, marginBottom: 16 }}>
              شركة برمجة سعودية في الرياض. نبني تطبيقات جوال ومواقع وأنظمة Apple Wallet.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 99, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', flexShrink: 0 }} className="pulse-dot" />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#10B981' }}>س.ت. 7054835322</span>
            </div>
          </div>

          {/* Links */}
          {[
            { title: 'الخدمات', links: [['الخدمات', '#services'], ['Apple Wallet', '#wallet'], ['الحجوزات', '#bookings'], ['الأسعار', '#calculator']] },
            { title: 'الشركة',  links: [['مشاريعنا', '#projects'], ['كيف نعمل', '#process'], ['الأسئلة الشائعة', '#faq'], ['الديمو', '#live-demo']] },
            { title: 'تواصل',   links: [['واتساب', WA], ['الرياض، المملكة العربية السعودية', '#'], ['+966551378531', WA]] },
          ].map(({ title, links }) => (
            <div key={title}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#fff', letterSpacing: '0.08em', marginBottom: 16, textTransform: 'uppercase' }}>{title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(([label, href]) => (
                  <a key={label} href={href} target={href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer"
                    style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none', transition: 'color 0.15s', fontWeight: 500 }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--purple2)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text2)'; }}>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text3)' }}>© ٢٠٢٥ تلقا تك. جميع الحقوق محفوظة.</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['#services', '#live-demo', '#wallet', '#bookings'].map((href, i) => (
              <a key={href} href={href} style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--surface2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'var(--text3)', textDecoration: 'none', fontWeight: 700 }}>
                {['S', 'D', 'W', 'B'][i]}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-grid > div:first-child { grid-column: 1 / -1; }
        }
        @media(max-width:480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
