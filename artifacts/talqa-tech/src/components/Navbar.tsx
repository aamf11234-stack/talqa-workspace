import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const WA = 'https://wa.me/966551378531';
const links = [
  { label: 'الخدمات',   href: '#services'   },
  { label: 'كيف نعمل', href: '#process'    },
  { label: 'الأسعار',  href: '#calculator' },
  { label: 'تواصل',    href: '#contact'    },
];

/* ── Animated SVG brand mark ── */
function BrandMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ overflow: 'visible' }}>
      {/* Letter ت stylized */}
      <motion.path
        d="M4 8 L12 8 L20 8"
        stroke="white" strokeWidth="2.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d="M12 8 L12 18"
        stroke="white" strokeWidth="2.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d="M7 18 Q12 22 17 18"
        stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Two dots (ت) */}
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

  return (
    <>
      <div id="scroll-bar" />
      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, inset: '0 0 auto', zIndex: 50,
          background: scrolled ? 'rgba(6,6,8,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
          transition: 'background .35s, border-color .35s',
        }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, flexShrink: 0, background: 'linear-gradient(135deg, #4F8EFF, #3B78FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(79,142,255,0.45)' }}>
              <BrandMark />
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 900, fontSize: 17, letterSpacing: '-0.02em', lineHeight: 1.1 }}>تلقا تك</div>
              <div style={{ color: 'rgba(79,142,255,0.7)', fontWeight: 700, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', lineHeight: 1 }}>TLGA TECH</div>
            </div>
          </a>

          {/* Links desktop */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="hidden md:flex">
            {links.map(l => (
              <a key={l.href} href={l.href}
                style={{ color: 'rgba(255,255,255,0.42)', fontSize: 14, fontWeight: 600, textDecoration: 'none', transition: 'color .2s', position: 'relative' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.42)')}>
                {l.label}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <MagBtn href={WA} className="btn-blue hidden sm:inline-flex"
              style={{ padding: '10px 22px', borderRadius: 10, fontSize: 13, fontWeight: 700 }}>
              ابدأ مشروعك ←
            </MagBtn>
            <button onClick={() => setOpen(v => !v)} className="md:hidden"
              style={{ width: 38, height: 38, borderRadius: 9, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              {open ? <X size={15} color="#fff" /> : <Menu size={15} color="#fff" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div key="mob" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
            style={{ position: 'fixed', top: 68, inset: '68px 0 auto', zIndex: 49, background: '#0A0A0E', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '20px 28px' }}>
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                style={{ display: 'block', color: '#fff', fontSize: 16, fontWeight: 700, textDecoration: 'none', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {l.label}
              </a>
            ))}
            <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-blue"
              style={{ display: 'flex', justifyContent: 'center', marginTop: 16, padding: '13px', borderRadius: 10, fontSize: 14, fontWeight: 700 }}>
              ابدأ مشروعك الآن ←
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
