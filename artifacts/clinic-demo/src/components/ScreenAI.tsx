import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SYMPTOMS = [
  { text:'صداع شديد من ٣ أيام',   icon:'🧠', spec:'أعصاب',        urgent:false, reply:'الصداع المستمر فوق ٧٢ ساعة يستحق تقييماً متخصصاً. هل هو مصحوب بغثيان أو حساسية للضوء؟', doctor:'د. فهد الأحمري',  docSpec:'استشاري أعصاب' },
  { text:'ارتفاع ضغط مع تعب',      icon:'❤️', spec:'قلب وأوعية',   urgent:true,  reply:'ارتفاع الضغط مع الإرهاق يحتاج متابعة عاجلة. قِس ضغطك الآن وتواصل مع طبيب القلب فوراً.',  doctor:'د. سارة المطيري', docSpec:'أمراض قلبية' },
  { text:'سعال مستمر مع حرارة',    icon:'🌡️', spec:'طب عام',        urgent:false, reply:'السعال المصحوب بالحرارة يشير لعدوى تنفسية. أنصح بفحص طب عام مع تحليل دم بسيط.',         doctor:'د. خالد الدوسري', docSpec:'طب عام' },
  { text:'ألم حاد في البطن',       icon:'🫁', spec:'جهاز هضمي',     urgent:true,  reply:'الألم الحاد في البطن يستدعي تقييماً فورياً — توجّه لأقرب طبيب جهاز هضمي أو طوارئ.',    doctor:'د. أحمد الغامدي', docSpec:'جراحة وجهاز هضمي' },
];

type Msg = { from:'user'|'ai'; text:string; meta?:typeof SYMPTOMS[0] };

export function ScreenAI() {
  const [msgs,     setMsgs]     = useState<Msg[]>([]);
  const [thinking, setThinking] = useState(false);
  const [done,     setDone]     = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:'smooth' });
  }, [msgs, thinking]);

  const send = (s: typeof SYMPTOMS[0]) => {
    if (thinking || done) return;
    setMsgs(m => [...m, { from:'user', text:s.text }]);
    setThinking(true);
    setTimeout(() => {
      setMsgs(m => [...m, { from:'ai', text:s.reply, meta:s }]);
      setThinking(false);
      setDone(true);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full" style={{ background:'#0E1621', fontFamily:'Tajawal,sans-serif' }}>

      {/* Header */}
      <div className="shrink-0 px-5 pt-3 pb-5 relative overflow-hidden"
        style={{ background:'linear-gradient(170deg,#0E0B22 0%,#160834 100%)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:'radial-gradient(ellipse at 60% 40%,rgba(139,92,246,0.2) 0%,transparent 65%)' }}/>
        <div className="absolute bottom-0 inset-x-0 h-8 pointer-events-none"
          style={{ background:'linear-gradient(to bottom,transparent,#0E1621)' }}/>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              animate={{ boxShadow:['0 0 0 rgba(139,92,246,0.4)','0 0 20px rgba(139,92,246,0.6)','0 0 0 rgba(139,92,246,0.4)'] }}
              transition={{ duration:2.5, repeat:Infinity }}
              className="w-11 h-11 rounded-2xl flex items-center justify-center text-[22px]"
              style={{ background:'linear-gradient(135deg,#8B5CF6,#6D28D9)' }}>🤖</motion.div>
            <div className="flex-1">
              <p className="text-white text-[16px] font-black leading-none mb-0.5">AI Doctor</p>
              <p className="text-white/35 text-[10px]">تحليل الأعراض بالذكاء الاصطناعي</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{ background:'rgba(139,92,246,0.15)', border:'1px solid rgba(139,92,246,0.25)' }}>
              <motion.div className="w-1.5 h-1.5 rounded-full bg-violet-400"
                animate={{ opacity:[1,0.3,1] }} transition={{ duration:1.4, repeat:Infinity }}/>
              <span className="text-violet-300 text-[9px] font-bold">مباشر</span>
            </div>
          </div>
          <div className="flex gap-1.5">
            {['GPT-4 Medical','ICD-10','SNOMED CT'].map(b => (
              <span key={b} className="text-[8px] font-bold px-2 py-0.5 rounded-full"
                style={{ background:'rgba(139,92,246,0.12)', color:'rgba(167,139,250,0.85)', border:'1px solid rgba(139,92,246,0.18)' }}>{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-none px-4 py-4 space-y-3">

        {/* Welcome */}
        {msgs.length === 0 && !thinking && (
          <motion.div initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} className="flex gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[13px]"
              style={{ background:'linear-gradient(135deg,#8B5CF6,#6D28D9)' }}>🤖</div>
            <div className="max-w-[82%] px-4 py-3 rounded-[18px] rounded-tl-sm"
              style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.08)' }}>
              <p className="text-white/80 text-[12px] leading-relaxed">مرحباً! صف أعراضك وسأحللها وأوصيك بالتخصص والطبيب المناسب فوراً.</p>
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {msgs.map((m, i) => (
            <motion.div key={i} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
              className={`flex gap-2.5 ${m.from==='user' ? 'flex-row-reverse' : ''}`}>

              {m.from==='ai' && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[13px]"
                  style={{ background:'linear-gradient(135deg,#8B5CF6,#6D28D9)' }}>🤖</div>
              )}

              <div className="max-w-[82%] space-y-2">
                <div className={`px-4 py-3 rounded-[18px] text-[12px] leading-relaxed ${
                  m.from==='user' ? 'rounded-tr-sm' : 'rounded-tl-sm'
                }`} style={m.from==='user'
                  ? { background:'linear-gradient(135deg,#0B4A6F,#00B4D8)', color:'#fff' }
                  : { background:'rgba(255,255,255,0.06)', color:'rgba(255,255,255,0.85)', border:'1px solid rgba(255,255,255,0.08)' }}>
                  {m.text}
                </div>

                {m.from==='ai' && m.meta && (
                  <motion.div initial={{ opacity:0, scale:0.96 }} animate={{ opacity:1, scale:1 }}
                    transition={{ delay:0.3 }}
                    className="rounded-[18px] p-3.5"
                    style={{
                      background: m.meta.urgent ? 'rgba(239,68,68,0.08)' : 'rgba(139,92,246,0.08)',
                      border:`1px solid ${m.meta.urgent ? 'rgba(239,68,68,0.2)' : 'rgba(139,92,246,0.2)'}`,
                    }}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[13px]">{m.meta.urgent ? '⚠️' : '✅'}</span>
                      <p className="text-[10px] font-black" style={{ color:m.meta.urgent ? '#FF6B6B' : '#A78BFA' }}>
                        {m.meta.urgent ? 'يحتاج متابعة عاجلة' : 'توصية طبية'}
                      </p>
                      <span className="mr-auto text-[8px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background:m.meta.urgent ? 'rgba(239,68,68,0.12)' : 'rgba(139,92,246,0.12)', color:m.meta.urgent ? '#FF6B6B' : '#A78BFA' }}>
                        {m.meta.spec}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 rounded-[14px] p-3"
                      style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.07)' }}>
                      <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-[18px] shrink-0"
                        style={{ background:'rgba(139,92,246,0.12)' }}>👨‍⚕️</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-[12px] font-black leading-none mb-0.5">{m.meta.doctor}</p>
                        <p className="text-white/35 text-[9px]">{m.meta.docSpec} · متاح اليوم</p>
                      </div>
                      <div className="text-[9px] font-black text-white px-3 py-1.5 rounded-[10px] shrink-0"
                        style={{ background:'linear-gradient(135deg,#0B4A6F,#00B4D8)' }}>احجز ←</div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {thinking && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="flex gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[13px]"
              style={{ background:'linear-gradient(135deg,#8B5CF6,#6D28D9)' }}>🤖</div>
            <div className="px-4 py-3.5 rounded-[18px] rounded-tl-sm"
              style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-2">
                <span className="text-white/35 text-[10px]">يحلل الأعراض</span>
                <div className="flex gap-1">
                  {[0,0.18,0.36].map((d,i) => (
                    <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-violet-400"
                      animate={{ y:[0,-4,0] }} transition={{ duration:0.55, repeat:Infinity, delay:d }}/>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef}/>
      </div>

      {/* Suggestions */}
      <div className="shrink-0 px-4 pb-20 pt-2"
        style={{ borderTop:'1px solid rgba(255,255,255,0.05)' }}>
        {!done ? (
          <>
            <p className="text-white/25 text-[10px] text-center mb-3">اختر من الأعراض الشائعة</p>
            <div className="grid grid-cols-2 gap-2">
              {SYMPTOMS.map((s, i) => (
                <motion.button key={i} onClick={() => send(s)} disabled={thinking}
                  initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.06 }}
                  whileTap={{ scale:0.95 }}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-[14px] text-right"
                  style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.07)', opacity:thinking?0.5:1 }}>
                  <span className="text-[18px] shrink-0">{s.icon}</span>
                  <p className="text-white/60 text-[10px] font-semibold leading-snug">{s.text}</p>
                </motion.button>
              ))}
            </div>
          </>
        ) : (
          <motion.button onClick={() => { setMsgs([]); setDone(false); }}
            initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
            whileTap={{ scale:0.95 }}
            className="w-full py-3.5 rounded-[16px] text-[13px] font-black text-white"
            style={{ background:'linear-gradient(135deg,#8B5CF6,#6D28D9)' }}>
            جرّب أعراضاً أخرى ↻
          </motion.button>
        )}
      </div>
    </div>
  );
}
