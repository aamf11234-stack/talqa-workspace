import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';

type FormState = 'idle' | 'loading' | 'error';

export const FinalCTA = () => {
  const [, setLocation] = useLocation();
  const [form, setForm] = useState({
    name: '',
    clinic: '',
    phone: '',
    message: '',
  });
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.clinic || !form.phone) return;

    setState('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setLocation('/thank-you');
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error ?? 'حدث خطأ — حاول مرة أخرى');
        setState('error');
      }
    } catch {
      setErrorMsg('تعذّر الاتصال — تحقق من الإنترنت');
      setState('error');
    }
  }

  const inputClass =
    'w-full px-4 py-3.5 rounded-xl text-white placeholder-gray-500 outline-none transition-all text-sm';
  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
  };
  const inputFocusStyle = ''; // handled inline with onFocus/onBlur

  return (
    <section
      id="contact"
      className="py-32 relative bg-[#050D1A] overflow-hidden border-t border-white/5"
    >
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-primary/10 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary text-sm font-bold tracking-widest uppercase mb-3"
            >
              ابدأ الآن
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-white mb-5"
            >
              حوّل عيادتك إلى{' '}
              <span className="text-gradient-gold">تجربة رقمية</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18 }}
              className="text-gray-400 text-base"
            >
              سجّل اهتمامك الآن وسيتواصل معك فريقنا خلال ٢٤ ساعة لتحديد موعد العرض.
            </motion.p>
          </div>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.22 }}
            className="rounded-3xl p-8 relative overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg,rgba(255,255,255,0.06) 0%,rgba(255,255,255,0.03) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
            }}
          >
            {/* Shine */}
            <div
              className="absolute top-0 left-[-100%] w-1/2 h-full pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent)',
                transform: 'skewX(-45deg)',
                animation: 'shine 5s ease-in-out infinite',
              }}
            />

            <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
              {/* Row 1 — name + clinic */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-1.5 mr-1">
                    الاسم الكريم <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="د. محمد العمري"
                    dir="rtl"
                    required
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-1.5 mr-1">
                    اسم العيادة <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="clinic"
                    value={form.clinic}
                    onChange={handleChange}
                    placeholder="عيادة النور"
                    dir="rtl"
                    required
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Row 2 — phone */}
              <div>
                <label className="block text-gray-400 text-xs font-semibold mb-1.5 mr-1">
                  رقم الجوال <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="05XXXXXXXX"
                  dir="ltr"
                  required
                  className={`${inputClass} text-right`}
                  style={inputStyle}
                />
              </div>

              {/* Row 3 — message (optional) */}
              <div>
                <label className="block text-gray-400 text-xs font-semibold mb-1.5 mr-1">
                  ملاحظة إضافية{' '}
                  <span className="text-gray-600 font-normal">(اختياري)</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="أي تفاصيل تودّ ذكرها مسبقاً..."
                  dir="rtl"
                  rows={3}
                  className={`${inputClass} resize-none`}
                  style={inputStyle}
                />
              </div>

              {/* Error message */}
              <AnimatePresence>
                {state === 'error' && errorMsg && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-400 text-sm text-center py-1"
                  >
                    {errorMsg}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={state === 'loading' || !form.name || !form.clinic || !form.phone}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl font-bold text-white text-base transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                style={{
                  background:
                    'linear-gradient(135deg,var(--primary,#1E5AC8),#2563EB)',
                  boxShadow: '0 8px 24px rgba(30,90,200,0.35)',
                }}
              >
                {state === 'loading' ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white"
                    />
                    جارٍ الإرسال...
                  </>
                ) : (
                  <>
                    سجّل اهتمامك — مجاناً
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </motion.button>

              <p className="text-gray-600 text-xs text-center">
                بياناتك آمنة ولن تُشارَك مع أي طرف ثالث
              </p>
            </form>
          </motion.div>

          {/* WhatsApp fallback */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="flex flex-col items-center gap-3 mt-8"
          >
            <p className="text-gray-600 text-sm">أو تواصل معنا مباشرةً</p>
            <a
              href="https://wa.me/966551378531"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-white text-sm transition-all"
              style={{
                background: 'rgba(37,211,102,0.12)',
                border: '1px solid rgba(37,211,102,0.25)',
                color: '#25D366',
              }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              واتساب: 966551378531+
            </a>
          </motion.div>

          {/* Footer */}
          <div className="mt-20 text-center border-t border-white/5 pt-8">
            <div className="text-xl font-black text-white tracking-widest uppercase mb-4">
              TALQA <span className="text-primary">TECH</span>
            </div>
            <p className="text-gray-500 text-sm">
              © 2025 شركة تلقا تك لتقنية المعلومات. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shine {
          0%   { left: -100%; }
          20%  { left: 200%; }
          100% { left: 200%; }
        }
      `}</style>
    </section>
  );
};
