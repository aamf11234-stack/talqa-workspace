import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import TlqaLogo from './TlqaLogo';

const WA = 'https://wa.me/966551378531';

const LINKS = [
  { href: '/services',  label: 'الخدمات'      },
  { href: '/bookings',  label: 'الحجوزات'     },
  { href: '/wallet',    label: 'Digital Wallet' },
  { href: '/ai',        label: 'الذكاء الاصطناعي' },
  { href: '/clinic',    label: 'العيادات'      },
  { href: '/pricing',   label: 'الأسعار'      },
  { href: '/projects',  label: 'مشاريعنا'     },
  { href: '/about',     label: 'من نحن'        },
];

interface Props { accent?: string }

export default function Navbar({ accent = '#8B5CF6' }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [loc]                   = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // close menu on route change
  useEffect(() => { setOpen(false); }, [loc]);

  return (
    <>
      <div id="scroll-bar" />

      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        transition: 'background 0.3s, border-color 0.3s',
        background: scrolled ? 'rgba(7,7,15,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.07)' : 'transparent'}`,
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 24px',
          height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <motion.div whileHover={{ scale: 1.04 }} style={{ display: 'inline-flex' }}>
              <TlqaLogo size={34} withText />
            </motion.div>
          </Link>

          {/* Desktop nav */}
          <nav className="nav-desktop" style={{ gap: 1 }}>
            {LINKS.map(l => {
              const active = loc === l.href;
              return (
                <Link key={l.href} href={l.href} style={{
                  padding: '7px 11px', borderRadius: 8,
                  fontSize: 12.5, fontWeight: active ? 700 : 600,
                  color: active ? '#fff' : 'var(--text2)',
                  textDecoration: 'none', transition: 'color 0.15s, background 0.15s',
                  background: active ? 'rgba(255,255,255,0.07)' : 'transparent',
                  borderBottom: active ? `2px solid ${accent}` : '2px solid transparent',
                }}
                  onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}}
                  onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.color = 'var(--text2)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}}>
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <a href={WA} target="_blank" rel="noopener noreferrer" className="nav-cta btn-blue"
            style={{ padding: '9px 18px', borderRadius: 9, fontSize: 12.5, gap: 6, flexShrink: 0 }}>
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
            initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 999,
              background: 'rgba(7,7,15,0.98)',
              backdropFilter: 'blur(24px)',
              display: 'flex', flexDirection: 'column',
              paddingTop: 80, paddingBottom: 32, paddingInline: 28,
            }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, overflowY: 'auto' }}>
              {LINKS.map((l, i) => {
                const active = loc === l.href;
                return (
                  <motion.div key={l.href}
                    initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + i * 0.05 }}>
                    <Link href={l.href}
                      style={{
                        display: 'block', padding: '15px 0', fontSize: 20, fontWeight: 800,
                        color: active ? accent : '#fff', textDecoration: 'none',
                        borderBottom: '1px solid var(--border)', transition: 'color 0.15s',
                      }}>
                      {l.label}
                      {active && <span style={{ fontSize: 12, marginRight: 8, opacity: 0.6 }}>← أنت هنا</span>}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 20 }}>
              <Link href="/faq"
                style={{ textAlign: 'center', padding: '13px', borderRadius: 12, fontSize: 14, fontWeight: 700,
                  color: 'var(--text2)', textDecoration: 'none', background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--border)' }}>
                الأسئلة الشائعة
              </Link>
              <a href={WA} target="_blank" rel="noopener noreferrer"
                className="btn-purple"
                style={{ textAlign: 'center', justifyContent: 'center', borderRadius: 12, padding: '15px', fontSize: 16 }}>
                <span className="holo-shimmer" />
                ابدأ مشروعك على واتساب ←
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
