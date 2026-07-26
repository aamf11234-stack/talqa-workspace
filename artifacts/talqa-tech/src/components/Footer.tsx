import { motion } from 'framer-motion';
import { MapPin, FileText, MessageCircle } from 'lucide-react';

const WHATSAPP_LINK = "https://wa.me/966551378531";

const footerLinks = [
  { label: 'الخدمات', href: '#services' },
  { label: 'احسب مشروعك', href: '#calculator' },
  { label: 'Apple Wallet', href: '#apple' },
  { label: 'تواصل معنا', href: '#contact' },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative pt-24 pb-10 overflow-hidden"
      style={{ background: '#FBF9F5', borderTop: '1px solid #EAE6DF' }}
    >
      {/* Top gold line */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(to left, transparent, #C5A880, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          {/* Brand col */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5"
          >
            <div className="flex items-center gap-2.5 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: '#C5A880' }}
              >
                <span className="font-black text-white text-xl leading-none">ت</span>
              </div>
              <div>
                <div className="font-black text-xl leading-none" style={{ color: '#1A1A18' }}>تلقا تك</div>
                <div className="text-xs font-bold tracking-widest uppercase mt-0.5" style={{ color: '#C5A880' }}>
                  Tlga Tech
                </div>
              </div>
            </div>

            <p className="text-base leading-relaxed mb-8 max-w-xs" style={{ color: '#7A7060' }}>
              شريكك التقني الموثوق في المملكة العربية السعودية. نحوّل أفكارك إلى منتجات رقمية تضمن لك التفوق في سوقك.
            </p>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-md"
              style={{ background: '#25D366', boxShadow: '0 4px 18px rgba(37,211,102,0.3)' }}
            >
              <MessageCircle size={16} />
              تحدث معنا الآن
            </a>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-3"
          >
            <h4 className="font-black text-base mb-6" style={{ color: '#1A1A18' }}>الصفحات</h4>
            <ul className="space-y-4">
              {footerLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-semibold transition-colors duration-200"
                    style={{ color: '#7A7060' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#C5A880')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#7A7060')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="md:col-span-4"
          >
            <h4 className="font-black text-base mb-6" style={{ color: '#1A1A18' }}>تواصل وفروع</h4>
            <ul className="space-y-5">
              <li>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-semibold transition-colors"
                  style={{ color: '#7A7060' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#1A1A18')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#7A7060')}
                >
                  <MessageCircle size={16} style={{ color: '#C5A880' }} />
                  +966 55 137 8531
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm font-semibold" style={{ color: '#7A7060' }}>
                <FileText size={16} style={{ color: '#C5A880' }} />
                <span>السجل التجاري: 7054835322</span>
              </li>
              <li className="flex items-start gap-3 text-sm font-semibold" style={{ color: '#7A7060' }}>
                <MapPin size={16} className="shrink-0 mt-0.5" style={{ color: '#C5A880' }} />
                <span>منطقة جازان — صبيا وضمد<br />المملكة العربية السعودية</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium"
          style={{ borderTop: '1px solid #EAE6DF', color: '#B0A898' }}
        >
          <p>© {new Date().getFullYear()} تلقا تك (Tlga Tech) — جميع الحقوق محفوظة.</p>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-[#C5A880] transition-colors">شروط الاستخدام</span>
            <span className="cursor-pointer hover:text-[#C5A880] transition-colors">سياسة الخصوصية</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
