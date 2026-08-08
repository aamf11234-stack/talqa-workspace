import { motion } from 'framer-motion';

const WA = 'https://wa.me/966551378531';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: 'clamp(56px,7vw,88px) 0 32px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: 300, background: 'radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        {/* Top CTA banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ marginBottom: 80, padding: 'clamp(32px,6vw,56px)', borderRadius: 28, background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -60, right: -60, width: 250, height: 250, borderRadius: '50%', background: 'rgba(139,92,246,0.15)', filter: 'blur(60px)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 16 }}>
              جاهز لتوسيع <span className="grad">أعمالك؟</span>
            </div>
            <p style={{ color: 'var(--text2)', fontSize: 16, marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>ندرس فكرتك ونعطيك خطة عمل واضحة وتسعير دقيق — مجاناً وبدون أي التزام.</p>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-purple" style={{ fontSize: 16 }}>
              ابدأ مشروعك على واتساب
            </a>
          </div>
        </motion.div>

        {/* Links grid */}
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 'clamp(32px,5vw,64px)', marginBottom: 64 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, var(--purple), #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18, color: '#fff', boxShadow: '0 4px 12px rgba(139,92,246,0.3)' }}>ت</div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>تلقا تك</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text3)', letterSpacing: '0.12em', marginTop: 4 }}>TLGA TECH</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.85, maxWidth: 280, marginBottom: 20 }}>
              شركة تقنية سعودية تبني تجارب رقمية فاخرة — تطبيقات، مواقع، وبطاقات أعمال تحول الزوار إلى عملاء دائمين.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 99, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', flexShrink: 0 }} className="pulse-dot" />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#10B981' }}>س.ت. 7054835322</span>
            </div>
          </div>

          {/* Links */}
          {[
            { title: 'الخدمات', links: [['الخدمات', '#services'], ['Apple Wallet', '#wallet'], ['الحجوزات', '#bookings'], ['الأسعار', '#calculator']] },
            { title: 'الشركة',  links: [['مشاريعنا', '#projects'], ['كيف نعمل', '#process'], ['الأسئلة الشائعة', '#faq'], ['الديمو', '#live-demo']] },
            { title: 'تواصل',   links: [['واتساب', WA], ['الرياض، المملكة العربية السعودية', '#'], ['+966551378531', WA]] },
          ].map(({ title, links }) => (
            <div key={title}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', letterSpacing: '0.05em', marginBottom: 20, textTransform: 'uppercase' }}>{title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {links.map(([label, href]) => (
                  <a key={label} href={href} target={href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer"
                    style={{ fontSize: 14, color: 'var(--text2)', textDecoration: 'none', transition: 'color 0.2s, transform 0.2s', fontWeight: 500, display: 'inline-block' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.transform = 'translateX(-4px)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text2)'; (e.currentTarget as HTMLElement).style.transform = 'translateX(0)'; }}>
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
