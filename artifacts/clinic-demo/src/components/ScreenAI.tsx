import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SYMPTOMS = [
  { text: 'صداع شديد من ٣ أيام', icon: '🧠', spec: 'أعصاب', urgent: false, reply: 'الصداع المستمر فوق ٧٢ ساعة يستحق تقييماً متخصصاً. هل هو مصحوب بغثيان أو حساسية للضوء؟', doctor: 'د. فهد الأحمري', docSpec: 'استشاري أعصاب' },
  { text: 'ارتفاع ضغط الدم مع تعب', icon: '❤️', spec: 'قلب وأوعية', urgent: true, reply: 'ارتفاع الضغط مع الإرهاق يحتاج متابعة عاجلة. قِس ضغطك الآن وتواصل مع طبيب القلب فوراً.', doctor: 'د. سارة المطيري', docSpec: 'أمراض قلبية' },
  { text: 'سعال مستمر مع حرارة', icon: '🌡️', spec: 'طب عام', urgent: false, reply: 'السعال المصحوب بالحرارة يشير لعدوى تنفسية. أنصح بفحص طب عام مع تحليل دم بسيط.', doctor: 'د. خالد الدوسري', docSpec: 'طب عام' },
  { text: 'ألم حاد في البطن', icon: '🫁', spec: 'جهاز هضمي', urgent: true, reply: 'الألم الحاد في البطن يستدعي تقييماً فورياً — توجّه لأقرب طبيب جهاز هضمي أو طوارئ.', doctor: 'د. أحمد الغامدي', docSpec: 'جراحة وجهاز هضمي' },
];

type Msg = { from: 'user' | 'ai'; text: string; meta?: typeof SYMPTOMS[0] };

export function ScreenAI() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [thinking, setThinking] = useState(false);
  const [done, setDone] = useState(false);

  const send = (s: typeof SYMPTOMS[0]) => {
    if (thinking || done) return;
    setMsgs(m => [...m, { from: 'user', text: s.text }]);
    setThinking(true);
    setTimeout(() => {
      setMsgs(m => [...m, { from: 'ai', text: s.reply, meta: s }]);
      setThinking(false);
      setDone(true);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: '#F2F6FB', fontFamily: 'Tajawal,sans-serif' }}>
      {/* header */}
      <div className="shrink-0 px-5 pt-5 pb-4" style={{ background: 'linear-gradient(160deg,#0D0520,#1E0A45)' }}>
        <div className="flex items-center gap-3 mb-2">
          <motion.div animate={{ boxShadow: ['0 0 0px rgba(139,92,246,0.4)', '0 0 24px rgba(139,92,246,0.7)', '0 0 0px rgba(139,92,246,0.4)'] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-11 h-11 rounded-2xl flex items-center justify-center text-[22px]"
            style={{ background: 'linear-gradient(135deg,#8B5CF6,#6D28D9)' }}>🤖</motion.div>
          <div>
            <p className="text-white text-[16px] font-black">AI Doctor</p>
            <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>تحليل الأعراض بالذكاء الاصطناعي</p>
          </div>
          <div className="mr-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(139,92,246,0.18)', border: '1px solid rgba(139,92,246,0.3)' }}>
            <motion.div className="w-1.5 h-1.5 rounded-full bg-violet-400"
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
            <span className="text-[9px] font-bold text-violet-300">مباشر</span>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['GPT-4 Medical','ICD-10','SNOMED CT'].map(b => (
            <span key={b} className="text-[8px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(139,92,246,0.15)', color: 'rgba(167,139,250,0.9)', border: '1px solid rgba(139,92,246,0.2)' }}>{b}</span>
          ))}
        </div>
      </div>

      {/* messages */}
      <div className="flex-1 overflow-y-auto scrollbar-none px-4 py-4 space-y-3">
        {msgs.length === 0 && !thinking && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[13px]"
              style={{ background: 'linear-gradient(135deg,#8B5CF6,#6D28D9)' }}>🤖</div>
            <div className="bg-white rounded-[18px] rounded-tl-sm px-4 py-3 shadow-sm max-w-[80%]">
              <p className="text-[12px] text-[#333] leading-relaxed">مرحباً! صف أعراضك وسأحللها وأوصيك بالتخصص والطبيب المناسب فوراً.</p>
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {msgs.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2.5 ${m.from === 'user' ? 'flex-row-reverse' : ''}`}>
              {m.from === 'ai' && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[13px]"
                  style={{ background: 'linear-gradient(135deg,#8B5CF6,#6D28D9)' }}>🤖</div>
              )}
              <div className={`max-w-[82%] space-y-2`}>
                <div className={`px-4 py-3 rounded-[18px] text-[12px] leading-relaxed shadow-sm ${
                  m.from === 'user' ? 'rounded-tr-sm text-white' : 'bg-white rounded-tl-sm text-[#333]'
                }`} style={m.from === 'user' ? { background: 'linear-gradient(135deg,#0B4A6F,#007FAF)' } : {}}>
                  {m.text}
                </div>
                {m.from === 'ai' && m.meta && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-[16px] p-3"
                    style={{ background: m.meta.urgent ? 'rgba(239,68,68,0.07)' : 'rgba(139,92,246,0.07)', border: `1px solid ${m.meta.urgent ? 'rgba(239,68,68,0.18)' : 'rgba(139,92,246,0.18)'}` }}>
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="text-[14px]">{m.meta.urgent ? '⚠️' : '✅'}</span>
                      <p className="text-[10px] font-black" style={{ color: m.meta.urgent ? '#EF4444' : '#8B5CF6' }}>
                        {m.meta.urgent ? 'يحتاج متابعة عاجلة' : 'توصية طبية'}
                      </p>
                      <span className="mr-auto text-[9px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: m.meta.urgent ? 'rgba(239,68,68,0.12)' : 'rgba(139,92,246,0.12)', color: m.meta.urgent ? '#EF4444' : '#8B5CF6' }}>
                        {m.meta.spec}
                      </span>
                    </div>
                    <div className="bg-white rounded-[14px] p-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-[18px] shrink-0"
                        style={{ background: 'rgba(139,92,246,0.1)' }}>👨‍⚕️</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-black text-[#111]">{m.meta.doctor}</p>
                        <p className="text-[9px] text-[#AAA]">{m.meta.docSpec} · متاح اليوم</p>
                      </div>
                      <div className="text-[9px] font-black text-white px-3 py-1.5 rounded-xl shrink-0"
                        style={{ background: 'linear-gradient(135deg,#0B4A6F,#007FAF)' }}>احجز ←</div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {thinking && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[13px]"
              style={{ background: 'linear-gradient(135deg,#8B5CF6,#6D28D9)' }}>🤖</div>
            <div className="bg-white rounded-[18px] rounded-tl-sm px-4 py-3.5 shadow-sm">
              <div className="flex gap-1.5 items-center">
                <p className="text-[10px] text-[#888] ml-1">يحلل الأعراض</p>
                {[0, 0.2, 0.4].map((d, i) => (
                  <motion.div key={i} className="w-2 h-2 rounded-full bg-violet-400"
                    animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: d }} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* suggestions / reset */}
      <div className="shrink-0 px-4 pb-28">
        {!done ? (
          <>
            <p className="text-[10px] text-[#AAA] font-semibold mb-2.5 text-center">اختر من الأعراض الشائعة</p>
            <div className="grid grid-cols-2 gap-2">
              {SYMPTOMS.map((s, i) => (
                <motion.button key={i} onClick={() => send(s)} disabled={thinking}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  whileTap={{ scale: 0.94 }}
                  className="flex items-center gap-2 px-3 py-3 rounded-[15px] text-right"
                  style={{ background: '#fff', border: '1px solid rgba(11,74,111,0.08)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <span className="text-[20px] shrink-0">{s.icon}</span>
                  <p className="text-[10px] font-semibold text-[#333] leading-snug">{s.text}</p>
                </motion.button>
              ))}
            </div>
          </>
        ) : (
          <motion.button onClick={() => { setMsgs([]); setDone(false); }}
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="w-full py-3.5 rounded-[16px] text-[13px] font-black text-white"
            style={{ background: 'linear-gradient(135deg,#8B5CF6,#6D28D9)' }}>
            جرّب أعراضاً أخرى ↻
          </motion.button>
        )}
      </div>
    </div>
  );
}
