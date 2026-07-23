import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';

export default function ThankYou() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: 'linear-gradient(160deg,#050D1A 0%,#0A1628 50%,#050D1A 100%)' }}
    >
      {/* Background glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(var(--primary-rgb,30,90,200),0.15) 0%, transparent 65%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative z-10 max-w-lg w-full"
      >
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
          className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center"
          style={{
            background:
              'linear-gradient(135deg,rgba(37,211,102,0.2),rgba(37,211,102,0.08))',
            border: '2px solid rgba(37,211,102,0.4)',
            boxShadow: '0 0 40px rgba(37,211,102,0.25)',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-12 h-12"
            fill="none"
            stroke="#25D366"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-black text-white mb-4"
        >
          تم الاستلام!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
          className="text-gray-300 text-lg mb-2"
        >
          شكراً على اهتمامك بتلقا للعيادات.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.44 }}
          className="text-gray-400 text-base mb-10"
        >
          سيتواصل معك فريقنا خلال <span className="text-white font-bold">٢٤ ساعة</span> لتحديد موعد العرض.
        </motion.p>

        {/* Cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 mb-10"
        >
          <div
            className="flex-1 rounded-2xl p-5 text-right"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div className="text-2xl mb-2">📱</div>
            <p className="text-white font-bold text-sm mb-1">للاستفسار الفوري</p>
            <p className="text-gray-400 text-xs">تواصل معنا مباشرةً على واتساب</p>
          </div>
          <div
            className="flex-1 rounded-2xl p-5 text-right"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div className="text-2xl mb-2">🎯</div>
            <p className="text-white font-bold text-sm mb-1">الخطوة التالية</p>
            <p className="text-gray-400 text-xs">عرض تجريبي مباشر لنظام عيادتك</p>
          </div>
        </motion.div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.56 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a
            href="https://wa.me/966551378531"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-white text-base transition-all"
            style={{
              background: '#25D366',
              boxShadow: '0 8px 24px rgba(37,211,102,0.3)',
            }}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            تواصل الآن — واتساب
          </a>

          <button
            onClick={() => setLocation('/')}
            className="px-8 py-4 rounded-xl font-bold text-gray-300 text-base transition-all hover:text-white"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            العودة للرئيسية
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
