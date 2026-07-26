import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const WHATSAPP_LINK = "https://wa.me/966551378531";

const links = [
  { label: 'الخدمات', href: '#services' },
  { label: 'الأسعار', href: '#calculator' },
  { label: 'Apple Wallet', href: '#apple' },
  { label: 'تواصل معنا', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-50"
        style={{
          background: scrolled ? 'rgba(251,249,245,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(18px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
          borderBottom: scrolled ? '1px solid #EAE6DF' : '1px solid transparent',
          transition: 'background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
              style={{ background: '#C5A880' }}
            >
              <span className="font-black text-white text-lg leading-none">ت</span>
            </div>
            <div className="leading-none">
              <span className="font-black text-[#1A1A18] text-lg tracking-tight">تلقا تك</span>
              <span className="hidden sm:block text-[10px] font-medium tracking-widest uppercase" style={{ color: '#C5A880' }}>
                Tlga Tech
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold transition-colors duration-200"
                style={{ color: '#7A7060' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#1A1A18')}
                onMouseLeave={e => (e.currentTarget.style.color = '#7A7060')}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ background: '#C5A880', boxShadow: '0 4px 18px rgba(197,168,128,0.35)' }}
            >
              ابدأ مشروعك
            </a>

            {/* Burger */}
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border transition-colors"
              style={{ borderColor: '#EAE6DF' }}
              onClick={() => setOpen(v => !v)}
              aria-label="القائمة"
            >
              {open ? <X size={18} color="#1A1A18" /> : <Menu size={18} color="#1A1A18" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[72px] inset-x-0 z-40 md:hidden"
            style={{ background: 'rgba(251,249,245,0.97)', borderBottom: '1px solid #EAE6DF' }}
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-5">
              {links.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base font-bold"
                  style={{ color: '#1A1A18' }}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-white"
                style={{ background: '#C5A880' }}
              >
                ابدأ مشروعك الآن
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
