import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const WA = 'https://wa.me/966551378531';

const LINKS = [
  { href: '#services', label: 'الخدمات' },
  { href: '#clinic',   label: 'عيادات' },
  { href: '#projects', label: 'مشاريعنا' },
  { href: '#calculator', label: 'الأسعار' },
  { href: '#contact',  label: 'تواصل' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Scroll bar */}
      <div id="scroll-bar" />

      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        transition: 'background 0.3s, border-color 0.3s',
        background: scrolled ? 'rgba(8,8,8,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.07)' : 'transparent'}`,
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 24px',
          height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none', flexShrink: 0 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 9,
              background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: 15, color: '#fff', letterSpacing: '-0.02em',
            }}>ت</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.01em' }}>تلقا تك</div>
              <div style={{ fontSize: 9, fontWeight: 600, color: 'var(--text3)', letterSpacing: '0.06em' }}>TLGA TECH</div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="nav-desktop" style={{ gap: 2 }}>
            {LINKS.map(l => (
              <a key={l.href} href={l.href} style={{
                padding: '7px 14px', borderRadius: 8,
                fontSize: 13, fontWeight: 600, color: 'var(--text2)',
                textDecoration: 'none', transition: 'color 0.15s, background 0.15s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text2)'; (e.currentTarget as HTMLElement).style.background = ''; }}>
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a href={WA} target="_blank" rel="noopener noreferrer" className="nav-cta btn-blue"
            style={{ padding: '9px 20px', borderRadius: 9, fontSize: 13, gap: 6 }}>
            <span className="holo-shimmer" />
            ابدأ مشروعك ←
          </a>

          {/* Mobile burger */}
          <button onClick={() => setOpen(v => !v)} className="nav-burger"
            style={{
              width: 40, height: 40, borderRadius: 9, border: '1px solid var(--border)',
              background: open ? 'rgba(79,142,255,0.1)' : 'rgba(255,255,255,0.04)',
              cursor: 'pointer', alignItems: 'center', justifyContent: 'center',
              color: '#fff', transition: 'all 0.2s',
            }}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 999,
              background: 'rgba(8,8,8,0.97)',
              backdropFilter: 'blur(20px)',
              display: 'flex', flexDirection: 'column',
              paddingTop: 80, paddingBottom: 32, paddingInline: 28,
            }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
              {LINKS.map((l, i) => (
                <motion.a key={l.href} href={l.href}
                  initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06 }}
                  onClick={() => setOpen(false)}
                  style={{
                    padding: '16px 0', fontSize: 22, fontWeight: 800,
                    color: '#fff', textDecoration: 'none',
                    borderBottom: '1px solid var(--border)',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--blue)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#fff'}>
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <motion.a href={WA} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="btn-blue" onClick={() => setOpen(false)}
              style={{ textAlign: 'center', justifyContent: 'center', borderRadius: 12, padding: '16px', fontSize: 16 }}>
              <span className="holo-shimmer" />
              ابدأ مشروعك على واتساب ←
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
