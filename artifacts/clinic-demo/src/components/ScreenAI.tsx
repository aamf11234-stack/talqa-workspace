import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { theme?: 'dark' | 'light' }

const SYMPTOMS = [
 { text:'صداع شديد من ٣ أيام', icon:'', spec:'أعصاب', urgent:false, reply:'الصداع المستمر فوق ٧٢ ساعة يستحق تقييماً متخصصاً. هل هو مصحوب بغثيان أو حساسية للضوء؟', doctor:'د. فهد الأحمري', docSpec:'استشاري أعصاب' },
 { text:'ارتفاع ضغط مع تعب', icon:'', spec:'قلب وأوعية', urgent:true, reply:'ارتفاع الضغط مع الإرهاق يحتاج متابعة عاجلة. قِس ضغطك الآن وتواصل مع طبيب القلب فوراً.', doctor:'د. سارة المطيري', docSpec:'أمراض قلبية' },
 { text:'سعال مستمر مع حرارة', icon:'', spec:'طب عام', urgent:false, reply:'السعال المصحوب بالحرارة يشير لعدوى تنفسية. أنصح بفحص طب عام مع تحليل دم بسيط.', doctor:'د. خالد الدوسري', docSpec:'طب عام' },
 { text:'ألم حاد في البطن', icon:'', spec:'جهاز هضمي', urgent:true, reply:'الألم الحاد في البطن يستدعي تقييماً فورياً — توجّه لأقرب طبيب جهاز هضمي أو طوارئ.', doctor:'د. أحمد الغامدي', docSpec:'جراحة وجهاز هضمي' },
];

type Msg = { from:'user'|'ai'; text:string; meta?:typeof SYMPTOMS[0] };

export function ScreenAI({ theme = 'dark' }: Props) {
 const dark = theme === 'dark';
 const [msgs, setMsgs] = useState<Msg[]>([]);
 const [thinking, setThinking] = useState(false);
 const [done, setDone] = useState(false);
 const bottomRef = useRef<HTMLDivElement>(null);

 useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }); }, [msgs, thinking]);

 /* theme tokens */
 const bg = dark ? '#0E1621' : '#F0F5FB';
 const headerBg = dark ? 'linear-gradient(170deg,#0E0B22,#160834)' : 'linear-gradient(170deg,#F5F0FF,#EDE8FF)';
 const headerGlow = dark ? 'rgba(139,92,246,0.20)' : 'rgba(139,92,246,0.10)';
 const headerFade = dark ? '#0E1621' : '#F0F5FB';
 const txt = dark ? '#fff' : '#0A1628';
 const txtSub = dark ? 'rgba(255,255,255,0.35)' : '#6B5EA8';
 const msgAiBg = dark ? 'rgba(255,255,255,0.06)' : '#fff';
 const msgAiBdr = dark ? 'rgba(255,255,255,0.08)' : 'rgba(139,92,246,0.15)';
 const msgAiColor = dark ? 'rgba(255,255,255,0.85)' : '#0A1628';
 const chipBg = dark ? 'rgba(255,255,255,0.05)' : '#fff';
 const chipBdr = dark ? 'rgba(255,255,255,0.07)' : 'rgba(139,92,246,0.15)';
 const chipTxt = dark ? 'rgba(255,255,255,0.60)' : '#6B5EA8';
 const recCardBg = dark ? 'rgba(255,255,255,0.05)' : '#F8F6FF';
 const recCardBdr = dark ? 'rgba(255,255,255,0.07)' : 'rgba(139,92,246,0.15)';
 const resetBtnBg = dark ? 'linear-gradient(135deg,#8B5CF6,#6D28D9)' : 'linear-gradient(135deg,#7C3AED,#6D28D9)';
 const liveRing = dark ? 'rgba(139,92,246,0.4)' : 'rgba(139,92,246,0.25)';
 const thinkBg = dark ? 'rgba(255,255,255,0.06)' : '#fff';
 const thinkBdr = dark ? 'rgba(255,255,255,0.08)' : 'rgba(139,92,246,0.15)';
 const divider = dark ? 'rgba(255,255,255,0.05)' : 'rgba(139,92,246,0.1)';
 const welcomeTxt = dark ? 'rgba(255,255,255,0.80)' : '#4A3880';
 const pillBg = dark ? 'rgba(139,92,246,0.15)' : 'rgba(139,92,246,0.10)';
 const pillBdr = dark ? 'rgba(139,92,246,0.25)' : 'rgba(139,92,246,0.20)';
 const pillTxt = dark ? 'rgba(167,139,250,0.85)' : '#6D28D9';
 const pillDot = dark ? 'rgba(167,139,250,0.4)' : 'rgba(109,40,217,0.4)';
 const hintTxt = dark ? 'rgba(255,255,255,0.25)' : 'rgba(109,40,217,0.4)';

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
 <div className="flex flex-col h-full" style={{ background: bg, fontFamily: 'Tajawal,sans-serif' }}>

 {/* Header */}
 <div className="shrink-0 px-5 pt-3 pb-5 relative overflow-hidden" style={{ background: headerBg }}>
 <div className="absolute inset-0 pointer-events-none"
 style={{ background: `radial-gradient(ellipse at 60% 40%, ${headerGlow} 0%, transparent 65%)` }}/>
 <div className="absolute bottom-0 inset-x-0 h-8 pointer-events-none"
 style={{ background: `linear-gradient(to bottom, transparent, ${headerFade})` }}/>
 <div className="relative z-10">
 <div className="flex items-center gap-3 mb-3">
 <motion.div
 animate={{ boxShadow: [`0 0 0 ${liveRing}`, `0 0 20px ${liveRing}`, `0 0 0 ${liveRing}`] }}
 transition={{ duration:2.5, repeat:Infinity }}
 className="w-11 h-11 rounded-2xl flex items-center justify-center text-[22px]"
 style={{ background:'linear-gradient(135deg,#8B5CF6,#6D28D9)' }}></motion.div>
 <div className="flex-1">
 <p className="text-[16px] font-black leading-none mb-0.5" style={{ color: txt }}>AI Doctor</p>
 <p className="text-[10px]" style={{ color: txtSub }}>تحليل الأعراض بالذكاء الاصطناعي</p>
 </div>
 <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
 style={{ background: pillBg, border: `1px solid ${pillBdr}` }}>
 <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: pillDot }}
 animate={{ opacity:[1,0.3,1] }} transition={{ duration:1.4, repeat:Infinity }}/>
 <span className="text-[9px] font-bold" style={{ color: pillTxt }}>مباشر</span>
 </div>
 </div>
 <div className="flex gap-1.5">
 {['GPT-4 Medical','ICD-10','SNOMED CT'].map(b => (
 <span key={b} className="text-[8px] font-bold px-2 py-0.5 rounded-full"
 style={{ background: pillBg, color: pillTxt, border: `1px solid ${pillBdr}` }}>{b}</span>
 ))}
 </div>
 </div>
 </div>

 {/* Messages */}
 <div className="flex-1 overflow-y-auto scrollbar-none px-4 py-4 space-y-3">
 {msgs.length === 0 && !thinking && (
 <motion.div initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} className="flex gap-2.5">
 <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[13px]"
 style={{ background:'linear-gradient(135deg,#8B5CF6,#6D28D9)' }}></div>
 <div className="max-w-[82%] px-4 py-3 rounded-[18px] rounded-tl-sm"
 style={{ background: msgAiBg, border: `1px solid ${msgAiBdr}` }}>
 <p className="text-[12px] leading-relaxed" style={{ color: welcomeTxt }}>مرحباً! صف أعراضك وسأحللها وأوصيك بالتخصص والطبيب المناسب فوراً.</p>
 </div>
 </motion.div>
 )}

 <AnimatePresence>
 {msgs.map((m, i) => (
 <motion.div key={i} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
 className={`flex gap-2.5 ${m.from === 'user' ? 'flex-row-reverse' : ''}`}>
 {m.from === 'ai' && (
 <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[13px]"
 style={{ background:'linear-gradient(135deg,#8B5CF6,#6D28D9)' }}></div>
 )}
 <div className="max-w-[82%] space-y-2">
 <div className={`px-4 py-3 rounded-[18px] text-[12px] leading-relaxed ${m.from === 'user' ? 'rounded-tr-sm' : 'rounded-tl-sm'}`}
 style={m.from === 'user'
 ? { background:'linear-gradient(135deg,#0B4A6F,#00B4D8)', color:'#fff' }
 : { background: msgAiBg, color: msgAiColor, border: `1px solid ${msgAiBdr}` }}>
 {m.text}
 </div>

 {m.from === 'ai' && m.meta && (
 <motion.div initial={{ opacity:0, scale:0.96 }} animate={{ opacity:1, scale:1 }}
 transition={{ delay:0.3 }}
 className="rounded-[18px] p-3.5"
 style={{
 background: m.meta.urgent
 ? (dark ? 'rgba(239,68,68,0.08)' : 'rgba(239,68,68,0.05)')
 : (dark ? 'rgba(139,92,246,0.08)' : '#F3F0FF'),
 border: `1px solid ${m.meta.urgent ? 'rgba(239,68,68,0.2)' : (dark ? 'rgba(139,92,246,0.2)' : 'rgba(139,92,246,0.2)')}`,
 }}>
 <div className="flex items-center gap-2 mb-3">
 <span className="text-[13px]">{m.meta.urgent ? '' : ''}</span>
 <p className="text-[10px] font-black"
 style={{ color: m.meta.urgent ? '#FF6B6B' : '#8B5CF6' }}>
 {m.meta.urgent ? 'يحتاج متابعة عاجلة' : 'توصية طبية'}
 </p>
 <span className="mr-auto text-[8px] font-bold px-2 py-0.5 rounded-full"
 style={{
 background: m.meta.urgent ? 'rgba(239,68,68,0.12)' : (dark ? 'rgba(139,92,246,0.12)' : 'rgba(139,92,246,0.15)'),
 color: m.meta.urgent ? '#FF6B6B' : '#8B5CF6',
 }}>
 {m.meta.spec}
 </span>
 </div>
 <div className="flex items-center gap-3 rounded-[14px] p-3"
 style={{ background: recCardBg, border: `1px solid ${recCardBdr}` }}>
 <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-[18px] shrink-0"
 style={{ background: dark ? 'rgba(139,92,246,0.12)' : 'rgba(139,92,246,0.1)' }}>‍</div>
 <div className="flex-1 min-w-0">
 <p className="text-[12px] font-black leading-none mb-0.5" style={{ color: txt }}>{m.meta.doctor}</p>
 <p className="text-[9px]" style={{ color: txtSub }}>{m.meta.docSpec} · متاح اليوم</p>
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
 style={{ background:'linear-gradient(135deg,#8B5CF6,#6D28D9)' }}></div>
 <div className="px-4 py-3.5 rounded-[18px] rounded-tl-sm"
 style={{ background: thinkBg, border: `1px solid ${thinkBdr}` }}>
 <div className="flex items-center gap-2">
 <span className="text-[10px]" style={{ color: txtSub }}>يحلل الأعراض</span>
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
 <div className="shrink-0 px-4 pb-20 pt-2" style={{ borderTop: `1px solid ${divider}` }}>
 {!done ? (
 <>
 <p className="text-[10px] text-center mb-3" style={{ color: hintTxt }}>اختر من الأعراض الشائعة</p>
 <div className="grid grid-cols-2 gap-2">
 {SYMPTOMS.map((s, i) => (
 <motion.button key={i} onClick={() => send(s)} disabled={thinking}
 initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.06 }}
 whileTap={{ scale:0.95 }}
 className="flex items-center gap-2.5 px-3 py-2.5 rounded-[14px] text-right"
 style={{ background: chipBg, border: `1px solid ${chipBdr}`, opacity: thinking ? 0.5 : 1 }}>
 <span className="text-[18px] shrink-0">{s.icon}</span>
 <p className="text-[10px] font-semibold leading-snug" style={{ color: chipTxt }}>{s.text}</p>
 </motion.button>
 ))}
 </div>
 </>
 ) : (
 <motion.button onClick={() => { setMsgs([]); setDone(false); }}
 initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
 whileTap={{ scale:0.95 }}
 className="w-full py-3.5 rounded-[16px] text-[13px] font-black text-white"
 style={{ background: resetBtnBg }}>
 جرّب أعراضاً أخرى ↻
 </motion.button>
 )}
 </div>
 </div>
 );
}
