import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';

const WA = 'https://wa.me/966551378531?text=السلام%20عليكم%2C%20أبي%20أعرف%20أكثر%20عن%20خدماتكم';

/* ─── Conversation script ─── */
const SCRIPT = [
  {
    from: 'user',
    text: 'السلام عليكم، سمعت عنكم من صاحبي — أبي أعرف أكثر عن تطبيق الولاء',
    delay: 600,
  },
  {
    from: 'ai',
    text: 'وعليكم السلام! 😊 أهلاً بك — سؤالك وصل. تطبيق الولاء يخلي عملائك يجمعون نقاط مع كل زيارة أو طلبية، وانت تتحكم بكل شيء من لوحة تحكم بسيطة. شو نوع مشروعك؟',
    delay: 2200,
    typing: 1600,
  },
  {
    from: 'user',
    text: 'عندي بوفيه — ولما العميل يزور يحب يحس إن في مكافأة',
    delay: 1400,
  },
  {
    from: 'ai',
    text: 'فكرة ذهبية لو سمحت! 🔥 البوفيهات اللي عندها برامج ولاء ترتفع عندها الزيارات المتكررة ٤٠٪ بالمتوسط. نقدر نصمم لك نظام: كل زيارة = نقاط، وبعد ١٠ زيارات مثلاً تلقى وجبة مجانية. كم فرع عندك؟',
    delay: 2600,
    typing: 1900,
  },
  {
    from: 'user',
    text: 'فرعين الحين وبافتح ثالث قريب',
    delay: 1200,
  },
  {
    from: 'ai',
    text: 'ماشاء الله، توسع مبارك! 🎉 نربط الفروع الثلاثة بنظام واحد — العميل يجمع نقاطه في أي فرع وتُحسب مع بعض. بالإضافة: Apple Wallet + إشعارات واتساب تلقائية + تقارير يومية. تبي أشوف لك نموذج حي؟',
    delay: 2800,
    typing: 2100,
  },
  {
    from: 'user',
    text: 'أيوه اعرض علي، وكم يكلف تقريباً؟',
    delay: 1300,
  },
  {
    from: 'ai',
    text: 'للمشاريع بحجمك السعر يبدأ من ٤٩٩٩ ريال، ويشمل: التطبيق + الموقع + Apple Wallet + ٣ أشهر دعم كامل 💪 وعندنا ضمان: لو ما عجبك خلال ١٤ يوم نرجعلك كل ريال. تبي نحجز استشارة مجانية ٣٠ دقيقة؟',
    delay: 2900,
    typing: 2200,
  },
  {
    from: 'user',
    text: 'والله كلام منطقي، متى أقدر أحجز؟',
    delay: 1100,
  },
  {
    from: 'ai',
    text: 'الحين! 🗓 اضغط على الزر تحت وراح يتواصل معك أحد من الفريق خلال دقائق — وين ما كنت نوصلك على واتساب 📲',
    delay: 2200,
    typing: 1600,
    cta: true,
  },
];

/* ─── Typing indicator ─── */
function TypingBubble() {
  return (
    <motion.div initial={{ opacity: 0, y: 8, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
      style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '10px 14px', borderRadius: '18px 18px 18px 4px', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.12)', width: 'fit-content', marginBottom: 6 }}>
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        {[0, 1, 2].map(i => (
          <motion.div key={i}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
            style={{ width: 7, height: 7, borderRadius: '50%', background: '#9CA3AF' }} />
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Single chat bubble ─── */
function Bubble({ msg, showCta }: { msg: typeof SCRIPT[0]; showCta: boolean }) {
  const isUser = msg.from === 'user';
  const now = new Date();
  const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 340, damping: 28 }}
      style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', marginBottom: 6 }}>
      {/* Avatar for AI */}
      {!isUser && (
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#8B5CF6,#06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: 6, alignSelf: 'flex-end', boxShadow: '0 2px 8px rgba(139,92,246,0.4)' }}>
          <span style={{ fontSize: 13, fontWeight: 900, color: '#fff', fontFamily: 'Cairo,sans-serif', lineHeight: 1 }}>ت</span>
        </div>
      )}

      <div style={{ maxWidth: '78%' }}>
        <div style={{
          padding: '9px 12px',
          borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          background: isUser ? 'linear-gradient(135deg,#dcf8c6,#c5f0a4)' : '#fff',
          boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
          position: 'relative',
        }}>
          <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: '#1a1a1a', fontFamily: 'Cairo,sans-serif', direction: 'rtl', textAlign: 'right', whiteSpace: 'pre-wrap' }}>
            {msg.text}
          </p>
          {/* Time + ticks */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 3, marginTop: 4 }}>
            <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.38)', fontFamily: 'monospace' }}>{time}</span>
            {isUser && (
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                <path d="M1 5L4 8L8 2" stroke="#53BDEB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 5L9 8L13 2" stroke="#53BDEB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        </div>

        {/* CTA button inside chat */}
        {msg.cta && showCta && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{ marginTop: 8 }}>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px', borderRadius: 12, background: 'linear-gradient(135deg,#25D366,#128C7E)', color: '#fff', textDecoration: 'none', fontFamily: 'Cairo,sans-serif', fontSize: 13, fontWeight: 800, boxShadow: '0 4px 14px rgba(37,211,102,0.45)' }}>
              <span>احجز استشارتك المجانية الحين</span>
              <span style={{ fontSize: 16 }}>←</span>
            </a>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── WhatsApp phone shell ─── */
function WaPhone() {
  const [messages, setMessages] = useState<typeof SCRIPT>([]);
  const [typing,   setTyping]   = useState(false);
  const [ctaReady, setCtaReady] = useState(false);
  const [phase,    setPhase]    = useState(0); // index into SCRIPT
  const [started,  setStarted]  = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  /* Auto-scroll */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  /* Start sequence after a short wait */
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 800);
    return () => clearTimeout(t);
  }, []);

  /* Drive the conversation */
  useEffect(() => {
    if (!started || phase >= SCRIPT.length) return;
    const msg = SCRIPT[phase];

    const t1 = setTimeout(() => {
      if (msg.from === 'ai' && msg.typing) setTyping(true);
    }, msg.delay);

    const typingDuration = msg.from === 'ai' && msg.typing ? msg.typing : 0;
    const t2 = setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, msg]);
      if (msg.cta) setTimeout(() => setCtaReady(true), 500);
      setPhase(p => p + 1);
    }, msg.delay + typingDuration);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [started, phase]);

  /* Restart after conversation ends */
  useEffect(() => {
    if (phase < SCRIPT.length) return;
    const t = setTimeout(() => {
      setMessages([]); setPhase(0); setTyping(false); setCtaReady(false);
    }, 8000);
    return () => clearTimeout(t);
  }, [phase]);

  const W = 310, H = 660, R = 46, B = 7;

  return (
    <div style={{ position: 'relative', width: W, margin: '0 auto', flexShrink: 0 }}>
      {/* Glow */}
      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 380, height: 380, background: 'radial-gradient(ellipse,rgba(37,211,102,0.18) 0%,transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

      {/* Shell */}
      <div style={{ width: W, height: H, borderRadius: R, background: 'linear-gradient(160deg,#2e2e2e 0%,#141414 60%,#1e1e1e 100%)', boxShadow: '0 60px 120px rgba(0,0,0,0.8),inset 0 1px 0 rgba(255,255,255,0.16),0 0 0 1px rgba(255,255,255,0.05)', padding: B, boxSizing: 'border-box' as const }}>
        <div style={{ width: '100%', height: '100%', borderRadius: R - B + 2, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#ECE5DD', position: 'relative' }}>

          {/* Dynamic Island */}
          <div style={{ position: 'absolute', top: B + 6, left: '50%', transform: 'translateX(-50%)', width: 94, height: 26, background: '#000', borderRadius: 18, zIndex: 30, boxShadow: '0 0 0 1.5px rgba(255,255,255,0.07)' }} />

          {/* WhatsApp Header */}
          <div style={{ background: '#128C7E', padding: '42px 14px 10px', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, direction: 'rtl' }}>
              {/* Back + Avatar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#8B5CF6,#06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(139,92,246,0.5)', flexShrink: 0 }}>
                    <span style={{ fontSize: 16, fontWeight: 900, color: '#fff', fontFamily: 'Cairo,sans-serif', lineHeight: 1 }}>ت</span>
                  </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 900, color: '#fff', fontFamily: 'Cairo,sans-serif' }}>مساعد تلقا</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', fontFamily: 'Cairo,sans-serif' }}>
                  {typing ? (
                    <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>يكتب...</motion.span>
                  ) : 'متصل الآن'}
                </div>
              </div>
              {/* Icons */}
              <div style={{ display: 'flex', gap: 14, opacity: 0.9 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.03 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><circle cx="12" cy="12" r="2"/><circle cx="12" cy="4" r="2"/><circle cx="12" cy="20" r="2"/></svg>
              </div>
            </div>
          </div>

          {/* Chat background pattern */}
          <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
            {/* Wallpaper-like subtle pattern */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(0,0,0,0.04) 1px,transparent 1px)', backgroundSize: '22px 22px', pointerEvents: 'none' }} />

            {/* Messages scroll */}
            <div style={{ height: '100%', overflowY: 'auto', padding: '12px 10px', display: 'flex', flexDirection: 'column' }}>
              {/* Date pill */}
              <div style={{ textAlign: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 10, color: '#667781', background: 'rgba(255,255,255,0.8)', padding: '3px 10px', borderRadius: 99, fontFamily: 'Cairo,sans-serif', backdropFilter: 'blur(8px)' }}>اليوم</span>
              </div>

              {messages.map((msg, i) => (
                <Bubble key={i} msg={msg} showCta={ctaReady} />
              ))}

              <AnimatePresence>
                {typing && (
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#25D366,#128C7E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>🤖</div>
                    <TypingBubble />
                  </div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>
          </div>

          {/* Input bar */}
          <div style={{ background: '#F0F0F0', padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8, borderTop: '1px solid rgba(0,0,0,0.08)', flexShrink: 0 }}>
            <div style={{ flex: 1, background: '#fff', borderRadius: 22, padding: '9px 14px', fontSize: 12, color: '#aaa', fontFamily: 'Cairo,sans-serif', direction: 'rtl' }}>اكتب رسالة...</div>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(37,211,102,0.4)', flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            </div>
          </div>

        </div>
      </div>

      {/* Side buttons */}
      <div style={{ position: 'absolute', top: 112, left: -3, width: 3, height: 26, borderRadius: '3px 0 0 3px', background: 'rgba(255,255,255,0.12)' }} />
      <div style={{ position: 'absolute', top: 148, left: -3, width: 3, height: 26, borderRadius: '3px 0 0 3px', background: 'rgba(255,255,255,0.12)' }} />
      <div style={{ position: 'absolute', top: 136, right: -3, width: 3, height: 52, borderRadius: '0 3px 3px 0', background: 'rgba(255,255,255,0.12)' }} />
    </div>
  );
}

/* ─── Feature chips ─── */
const FEATURES = [
  { emoji: '🧠', title: 'يفهم اللهجة السعودية',   desc: 'يرد بطريقة طبيعية بدون رسمية زيادة' },
  { emoji: '⚡', title: 'رد فوري ٢٤/٧',           desc: 'ما في عميل ينتظر — رد في ثوانٍ' },
  { emoji: '🎯', title: 'يوجّه للبيع',              desc: 'يحوّل الاستفسار لموعد أو طلب حقيقي' },
  { emoji: '📊', title: 'يحفظ كل المحادثات',      desc: 'تاريخ كامل لكل عميل في لوحة التحكم' },
  { emoji: '🔗', title: 'يتكامل مع الأنظمة',      desc: 'حجوزات، طلبات، ولاء — كل شيء مربوط' },
  { emoji: '🛡', title: 'خصوصية تامة',             desc: 'بياناتك على خوادمك أنت — مو خارجية' },
];

/* ─── Main Section ─── */
export default function AiChat() {
  return (
    <section id="ai-chat" style={{ padding: 'clamp(80px,10vw,130px) 0', background: 'var(--bg2)', position: 'relative', overflow: 'hidden' }}>
      {/* Orbs */}
      <div className="orb" style={{ width: 600, height: 600, top: '10%', right: '-15%', background: 'rgba(37,211,102,0.06)', animationDelay: '-2s' }} />
      <div className="orb" style={{ width: 500, height: 500, bottom: '0%', left: '-12%', background: 'rgba(37,211,102,0.04)', animationDelay: '-7s' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', position: 'relative' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-label" style={{ color: '#25D366', borderColor: 'rgba(37,211,102,0.35)', background: 'rgba(37,211,102,0.1)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'linear-gradient(135deg,#8B5CF6,#06B6D4)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: '#fff', fontFamily: 'Cairo,sans-serif' }}>ت</span>
            مساعد تلقا بالذكاء الاصطناعي
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,4vw,3.2rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            يرد على{' '}
            <span style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              عملائك بدالك
            </span>
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: 16, marginTop: 14, maxWidth: 520, margin: '14px auto 0' }}>
            مساعد ذكي يفهم اللهجة السعودية — يرد، يقنع، ويحجز بدون ما تتدخل.
          </p>
        </motion.div>

        {/* Layout */}
        <div className="aichat-grid">

          {/* Phone */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}>
            <WaPhone />
            <div style={{ textAlign: 'center', marginTop: 12, fontSize: 11, color: 'var(--text3)', fontWeight: 600 }}>
              ▶ محادثة حقيقية — تشتغل تلقائياً
            </div>
          </motion.div>

          {/* Right panel */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center' }}>

            {/* Features grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {FEATURES.map(f => (
                <div key={f.title} className="glass" style={{ padding: '14px 14px' }}>
                  <div style={{ fontSize: 22, marginBottom: 7 }}>{f.emoji}</div>
                  <div style={{ fontSize: 12, fontWeight: 900, color: '#fff', marginBottom: 4 }}>{f.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text2)', lineHeight: 1.5 }}>{f.desc}</div>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {[
                { val: '٩٤٪', label: 'رضا العملاء',     color: '#25D366' },
                { val: '<٥ث', label: 'متوسط الرد',      color: '#06B6D4' },
                { val: '٣×',  label: 'ارتفاع التحويل',  color: '#8B5CF6' },
              ].map(s => (
                <div key={s.label} style={{ padding: '12px 8px', borderRadius: 12, background: `${s.color}10`, border: `1px solid ${s.color}25`, textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: 9, color: 'var(--text3)', fontWeight: 700, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a href={WA} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '15px 24px', borderRadius: 16, background: 'linear-gradient(135deg,#25D366,#128C7E)', color: '#fff', fontFamily: 'Cairo,sans-serif', fontSize: 15, fontWeight: 900, textDecoration: 'none', boxShadow: '0 12px 32px rgba(37,211,102,0.4)', transition: 'transform 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
              <MessageCircle size={18} />
              جرّب المساعد الآن على واتساب
              <ArrowRight size={16} style={{ transform: 'scaleX(-1)' }} />
            </a>

            <p style={{ fontSize: 11, color: 'var(--text3)', textAlign: 'center', margin: 0 }}>
              🔒 ما في ربط ببيانات خارجية — كل شيء على سيرفرك
            </p>
          </motion.div>
        </div>
      </div>

      <style>{`
        .aichat-grid {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 60px;
          align-items: center;
        }
        @media (max-width: 860px) {
          .aichat-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
