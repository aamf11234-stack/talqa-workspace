const WA = 'https://wa.me/966551378531';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: 'clamp(40px,6vw,72px) 0 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 'clamp(32px,5vw,60px)', marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 15, color: '#fff' }}>ت</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 900, color: '#fff' }}>تلقا تك</div>
                <div style={{ fontSize: 9, fontWeight: 600, color: 'var(--text3)', letterSpacing: '0.06em' }}>TLGA TECH</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.8, maxWidth: 240, marginBottom: 16 }}>
              شركة برمجة سعودية في الرياض. نبني تطبيقات جوال ومواقع وأنظمة Apple Wallet.
            </p>
            <div style={{ fontSize: 11, color: 'var(--text3)', fontWeight: 600 }}>س.ت. 7054835322</div>
          </div>

          {/* Links */}
          {[
            { title: 'الخدمات', links: [['الخدمات', '#services'], ['العيادات', '#clinic'], ['Apple Wallet', '#wallet'], ['الأسعار', '#calculator']] },
            { title: 'الشركة',  links: [['مشاريعنا', '#projects'], ['كيف نعمل', '#process'], ['الأسئلة الشائعة', '#faq']] },
            { title: 'تواصل',   links: [['واتساب', WA], ['الرياض، المملكة العربية السعودية', '#'], ['966551378531+', WA]] },
          ].map(({ title, links }) => (
            <div key={title}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#fff', letterSpacing: '0.06em', marginBottom: 14, textTransform: 'uppercase' }}>{title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {links.map(([label, href]) => (
                  <a key={label} href={href} target={href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer"
                    style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fff'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text2)'}>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <div style={{ fontSize: 12, color: 'var(--text3)' }}>© ٢٠٢٥ تلقا تك. جميع الحقوق محفوظة.</div>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-blue" style={{ fontSize: 12, padding: '8px 18px', borderRadius: 8 }}>
            <span className="holo-shimmer" />
            ابدأ مشروعك ←
          </a>
        </div>
      </div>
      <style>{`@media(max-width:768px){.footer-grid{grid-template-columns:1fr 1fr!important}.footer-grid>div:first-child{grid-column:1/-1}}`}</style>
    </footer>
  );
}
