import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'wouter';

const WA = 'https://wa.me/966551378531';

const LINKS = [
  { href: '/services', label: 'الخدمات' },
  { href: '/templates', label: 'القوالب' },
  { href: '/pricing', label: 'الأسعار' },
  { href: '/about', label: 'من نحن' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [loc] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => { setOpen(false); }, [loc]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          transition: 'all 0.3s ease',
          background: scrolled ? 'rgba(250, 248, 245, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid #EAE3D2' : '1px solid transparent',
          boxShadow: scrolled ? '0 1px 20px rgba(44,34,30,0.06)' : 'none',
        }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 24px',
          height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8 }} data-testid="link-logo">
            <span style={{ fontSize: 24, fontWeight: 900, color: '#1A1208', letterSpacing: '-0.04em' }}>
              تلقا
            </span>
            <span style={{
              background: '#EAE3D2', color: '#5C524E',
              fontSize: 10, padding: '2px 8px', borderRadius: 9999, fontWeight: 600,
              transform: 'translateY(1px)'
            }}>
              SaaS Platform
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="nav-desktop" style={{ gap: 32, alignItems: 'center' }}>
            {LINKS.map(l => {
              const active = loc === l.href;
              const linkStyle: React.CSSProperties = {
                fontSize: 15, fontWeight: 500,
                color: active ? '#1A1208' : '#5C524E',
                textDecoration: 'none', transition: 'color 0.2s ease',
                cursor: 'pointer',
              };
              return (
                <Link key={l.href} href={l.href} style={linkStyle} data-testid={`link-nav-${l.label}`}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = '#1A1208'; }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = '#5C524E'; }}>
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <a href={WA} target="_blank" rel="noopener noreferrer" className="nav-cta"
            style={{ 
              background: '#2C221E', color: '#FAF8F5', 
              padding: '10px 20px', borderRadius: 9999, fontSize: 15, fontWeight: 600, 
              textDecoration: 'none', transition: 'background 0.2s ease',
              flexShrink: 0
            }} 
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#3D2E28'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#2C221E'; }}
            data-testid="button-cta-desktop">
            ابدأ مجاناً
          </a>

          {/* Mobile burger */}
          <button onClick={() => setOpen(v => !v)} className="nav-burger"
            style={{
              width: 40, height: 40, borderRadius: 8, border: 'none',
              background: 'transparent',
              cursor: 'pointer', alignItems: 'center', justifyContent: 'center',
              color: '#1A1208', transition: 'all 0.2s',
            }} data-testid="button-menu-toggle">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 999,
              background: 'rgba(250, 248, 245, 0.98)',
              backdropFilter: 'blur(24px)',
              display: 'flex', flexDirection: 'column',
              paddingTop: 88, paddingBottom: 32, paddingInline: 24,
            }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
              {LINKS.map((l, i) => {
                const active = loc === l.href;
                const mobileStyle: React.CSSProperties = {
                  display: 'block', padding: '12px 0', fontSize: 20, fontWeight: 600,
                  color: active ? '#1A1208' : '#5C524E', textDecoration: 'none',
                  transition: 'color 0.15s',
                };
                return (
                  <motion.div key={l.href}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}>
                    <Link href={l.href} style={mobileStyle} data-testid={`link-mobile-${l.label}`}>
                      {l.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              style={{ paddingTop: 20 }}>
              <a href={WA} target="_blank" rel="noopener noreferrer"
                style={{ 
                  display: 'flex', width: '100%', textAlign: 'center', justifyContent: 'center', 
                  padding: '16px', fontSize: 16, background: '#2C221E', color: '#FAF8F5', 
                  borderRadius: 9999, textDecoration: 'none', fontWeight: 600 
                }}
                data-testid="button-cta-mobile">
                ابدأ مجاناً
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}