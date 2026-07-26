import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MessageCircle, ChevronLeft } from 'lucide-react';

const WA = 'https://wa.me/966551378531';
const links = [
  { label: 'الخدمات',    href: '#services',    sub: 'Apple Wallet، تطبيقات، مواقع' },
  { label: 'مشاريعنا',  href: '#projects',    sub: 'أعمالنا الحقيقية' },
  { label: 'كيف نعمل', href: '#process',     sub: '٤ خطوات واضحة' },
  { label: 'الأسعار',  href: '#calculator',  sub: 'احسب مشروعك الآن' },
  { label: 'تواصل',    href: '#contact',     sub: 'واتساب وفروعنا' },
];

function BrandMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ overflow: 'visible' }}>
      <motion.path d="M4 8 L12 8 L20 8" stroke="white" strokeWidth="2.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22,1,0.36,1] }} />
      <motion.path d="M12 8 L12 18" stroke="white" strokeWidth="2.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.9, ease: [0.22,1,0.36,1] }} />
      <motion.path d="M7 18 Q12 22 17 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 1.4, ease: [0.22,1,0.36,1] }} />
      <motion.circle cx="9" cy="5.5" r="1.2" fill="white"
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 1.9 }} />
      <motion.circle cx="14" cy="5.5" r="1.2" fill="white"
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 2.1 }} />
    </svg>
  );
}

function MagBtn({ href, className, style, children }: any) {
  const r = useRef<HTMLAnchorElement>(null);
  return (
    <a ref={r} href={href} className={className}
      style={{ ...style, transition: 'transform 0.35s cubic-bezier(.23,1,.32,1)', position: 'relative', overflow: 'hidden' }}
      onMouseMove={e => {
        const el = r.current; if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX-(rect.left+rect.width/2))*0.28}px,${(e.clientY-(rect.top+rect.height/2))*0.28}px)`;
      }}
      onMouseLeave={() => { if (r.current) r.current.style.transform = ''; }}>
      <span className="holo-shimmer" />
      {children}
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const bar = document.getElementById('scroll-bar');
    const fn = () => {
      const h = document.documentElement;
      const pct = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setScrolled(h.scrollTop > 30);
      if (bar) bar.style.transform = `scaleX(${pct})`;
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <div id="scroll-bar" />
      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
        style={{
          position: 'fixed', top: 0, inset: '0 0 auto', zIndex: 50,
          background: scrolled || open ? 'rgba(6,6,8,0.96)' : 'transparent',
          backdropFilter: scrolled || open ? 'blur(24px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled || open ? 'blur(24px) saturate(180%)' : 'none',
          borderBottom: scrolled || open ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
          transition: 'background .35s, border-color .35s',
        }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <a href="#" onClick={close} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', zIndex: 2 }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, flexShrink: 0, background: 'linear-gradient(135deg, #4F8EFF, #3B78FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(79,142,255,0.45)' }}>
              <BrandMark />
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 900, fontSize: 17, letterSpacing: '-0.02em', lineHeight: 1.1 }}>تلقا تك</div>
              <div style={{ color: 'rgba(79,142,255,0.7)', fontWeight: 700, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', lineHeight: 1 }}>TLGA TECH</div>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="nav-desktop" style={{ alignItems: 'center', gap: 32 }}>
            {links.map(l => (
              <a key={l.href} href={l.href}
                style={{ color: 'rgba(255,255,255,0.42)', fontSize: 14, fontWeight: 600, textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.42)')}>
                {l.label}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, zIndex: 2 }}>
            <MagBtn href={WA} className="btn-blue nav-cta"
              style={{ padding: '10px 20px', borderRadius: 10, fontSize: 13, fontWeight: 700, alignItems: 'center', gap: 6 }}>
              ابدأ مشروعك ←
            </MagBtn>
            <button onClick={() => setOpen(v => !v)} className="nav-burger"
              style={{ width: 42, height: 42, borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)', background: open ? 'rgba(79,142,255,0.1)' : 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
              <AnimatePresence mode="wait">
                {open
                  ? <motion.div key="x" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.2 }}><X size={16} color="#fff" /></motion.div>
                  : <motion.div key="m" initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={16} color="#fff" /></motion.div>
                }
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div key="mob-overlay"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.4, ease: [0.22,1,0.36,1] }}
            style={{ position: 'fixed', inset: '64px 0 0', zIndex: 49, background: 'rgba(4,4,8,0.98)', backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)', overflowY: 'auto', padding: '8px 0 32px' }}>

            {/* Links */}
            <div style={{ maxWidth: 500, margin: '0 auto', padding: '0 20px' }}>
              {links.map((l, i) => (
                <motion.a key={l.href} href={l.href} onClick={close}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1, duration: 0.35, ease: [0.22,1,0.36,1] }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', textDecoration: 'none' }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 3 }}>{l.label}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>{l.sub}</div>
                  </div>
                  <ChevronLeft size={16} color="rgba(255,255,255,0.2)" />
                </motion.a>
              ))}

              {/* CTAs */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a href={WA} target="_blank" rel="noopener noreferrer" onClick={close} className="btn-blue"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '16px', borderRadius: 13, fontSize: 15, fontWeight: 700 }}>
                  ابدأ مشروعك الآن ←
                </a>
                <a href={WA} target="_blank" rel="noopener noreferrer" onClick={close}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '15px', borderRadius: 13, fontSize: 14, fontWeight: 700, background: '#25D366', color: '#fff', textDecoration: 'none', boxShadow: '0 6px 20px rgba(37,211,102,0.25)' }}>
                  <MessageCircle size={16} /> تحدث معنا واتساب
                </a>
              </motion.div>

              {/* Contact info */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
                style={{ marginTop: 28, padding: '20px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', marginBottom: 6 }}>منطقة جازان — صبيا وضمد</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>+966 55 137 8531</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', marginTop: 4 }}>س.ت. 7054835322</div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-desktop { display: none !important; }
        .nav-cta    { display: none !important; }
        .nav-burger { display: flex !important; }
        @media(min-width: 768px) {
          .nav-desktop { display: flex !important; }
          .nav-cta    { display: inline-flex !important; }
          .nav-burger { display: none !important; }
        }
      `}</style>
    </>
  );
}
