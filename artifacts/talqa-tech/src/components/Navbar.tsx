import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const WHATSAPP = "https://wa.me/966551378531";

const links = [
  { label: 'الخدمات',       href: '#services' },
  { label: 'كيف نعمل',     href: '#process' },
  { label: 'الأسعار',       href: '#calculator' },
  { label: 'تواصل',         href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, right: 0, left: 0, zIndex: 50,
          background: scrolled ? 'rgba(8,8,8,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
          transition: 'all 0.35s ease',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #D4A843, #C49730)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(212,168,67,0.3)',
            }}>
              <span style={{ color: '#000', fontWeight: 900, fontSize: 18, lineHeight: 1 }}>ت</span>
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 900, fontSize: 17, lineHeight: 1.1, letterSpacing: '-0.02em' }}>تلقا تك</div>
              <div style={{ color: 'rgba(212,168,67,0.7)', fontWeight: 700, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', lineHeight: 1 }}>TLGA TECH</div>
            </div>
          </a>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="hidden md:flex">
            {links.map(l => (
              <a key={l.href} href={l.href} style={{
                color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: 600,
                textDecoration: 'none', transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              >{l.label}</a>
            ))}
          </div>

          {/* CTA + Burger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="btn-gold hidden sm:inline-flex"
              style={{
                padding: '10px 22px', borderRadius: 10, fontSize: 13, fontWeight: 700,
                color: '#000', textDecoration: 'none', letterSpacing: '-0.01em',
              }}
            >
              ابدأ مشروعك ←
            </a>
            <button
              onClick={() => setOpen(v => !v)}
              className="md:hidden"
              style={{
                width: 38, height: 38, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer',
              }}
            >
              {open ? <X size={16} color="#fff" /> : <Menu size={16} color="#fff" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mob"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            style={{
              position: 'fixed', top: 68, right: 0, left: 0, zIndex: 49,
              background: '#0F0F0F', borderBottom: '1px solid rgba(255,255,255,0.07)',
              padding: '20px 24px',
            }}
          >
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
                display: 'block', color: '#fff', fontSize: 16, fontWeight: 700,
                textDecoration: 'none', padding: '12px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}>{l.label}</a>
            ))}
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="btn-gold"
              style={{
                display: 'block', marginTop: 16, padding: '12px', borderRadius: 10,
                fontSize: 14, fontWeight: 700, color: '#000', textDecoration: 'none',
                textAlign: 'center',
              }}
            >ابدأ مشروعك الآن ←</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
