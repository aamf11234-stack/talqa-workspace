import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Volume2 } from 'lucide-react';

function fmt(s: number) {
 return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

export function ScreenTelemedicine() {
 const [secs, setSecs] = useState(0);
 const [mic, setMic] = useState(true);
 const [cam, setCam] = useState(true);
 const [ended, setEnded] = useState(false);
 const [chat, setChat] = useState(false);

 useEffect(() => {
 if (ended) return;
 const id = setInterval(() => setSecs(s => s + 1), 1000);
 return () => clearInterval(id);
 }, [ended]);

 if (ended) return (
 <div className="flex flex-col items-center justify-center h-full"
 style={{ background: 'linear-gradient(160deg,#050E1A,#0B3A5A)', fontFamily: 'Tajawal,sans-serif' }}>
 <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5 }}
 className="w-20 h-20 rounded-full flex items-center justify-center text-[36px] mb-5"
 style={{ background: 'rgba(16,185,129,0.15)', border: '2px solid rgba(16,185,129,0.3)' }}></motion.div>
 <p className="text-white text-[20px] font-black mb-2">انتهت الاستشارة</p>
 <p className="text-white/40 text-[13px] mb-1">مدة المكالمة: {fmt(secs)}</p>
 <p className="text-[#10B981] text-[11px] font-semibold mb-8">تم إرسال ملخص الاستشارة على التطبيق</p>
 <div className="w-56 space-y-3">
 <button onClick={() => { setEnded(false); setSecs(0); }}
 className="w-full py-3 rounded-2xl text-[13px] font-black text-white"
 style={{ background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)' }}>
 استشارة جديدة
 </button>
 <button className="w-full py-3 rounded-2xl text-[13px] font-bold border"
 style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }}>
 تقييم الطبيب ⭐
 </button>
 </div>
 </div>
 );

 return (
 <div className="flex flex-col h-full relative overflow-hidden" style={{ fontFamily: 'Tajawal,sans-serif' }}>
 {/* doctor video bg */}
 <div className="flex-1 relative">
 <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg,#0B1A2E 0%,#0B3A5A 50%,#06101E 100%)' }} />
 <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 35%,rgba(0,180,216,0.2) 0%,transparent 65%)' }} />
 {/* subtle scan lines for realism */}
 <div className="absolute inset-0 opacity-[0.04]"
 style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.15) 3px,rgba(255,255,255,0.15) 4px)' }} />

 {/* doctor */}
 <div className="absolute inset-0 flex flex-col items-center justify-center">
 <motion.div
 animate={{ scale: [1, 1.015, 1] }}
 transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
 className="relative">
 <div className="w-28 h-28 rounded-full flex items-center justify-center text-[56px]"
 style={{ background: 'linear-gradient(135deg,#0B4A6F,#007FAF)', boxShadow: '0 0 60px rgba(0,180,216,0.35)' }}>
 ‍
 </div>
 {/* voice rings */}
 {mic && [1,2,3].map(n => (
 <motion.div key={n} className="absolute inset-0 rounded-full border"
 style={{ borderColor: 'rgba(0,180,216,0.3)' }}
 animate={{ scale: [1, 1 + n * 0.25], opacity: [0.5, 0] }}
 transition={{ duration: 2, repeat: Infinity, delay: n * 0.5 }} />
 ))}
 </motion.div>
 <div className="mt-4 text-center">
 <p className="text-white text-[18px] font-black mb-0.5">د. سارة المطيري</p>
 <p className="text-white/50 text-[11px]">استشارية طب عام · عيادة الشفاء</p>
 </div>
 {/* live timer */}
 <motion.div animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.5, repeat: Infinity }}
 className="mt-3 flex items-center gap-2 px-4 py-1.5 rounded-full"
 style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.3)' }}>
 <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
 <p className="text-red-300 text-[12px] font-black">{fmt(secs)}</p>
 </motion.div>
 </div>

 {/* top bar */}
 <div className="absolute top-0 left-0 right-0 px-4 pt-4 flex items-center justify-between">
 <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
 style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(12px)' }}>
 <div className="flex gap-0.5 items-end">
 {[3, 5, 7, 9, 7].map((h, i) => (
 <div key={i} className="w-1 rounded-sm bg-green-400" style={{ height: h }} />
 ))}
 </div>
 <span className="text-white text-[9px] font-bold ml-1">HD · مشفّر</span>
 </div>
 <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
 style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(12px)' }}>
 <span className="text-[10px]"></span>
 <span className="text-white/70 text-[9px]">AES-256</span>
 </div>
 </div>

 {/* patient camera */}
 <div className="absolute top-14 right-4 w-20 h-28 rounded-[16px] overflow-hidden"
 style={{ border: '2px solid rgba(255,255,255,0.18)', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
 <div className="w-full h-full flex items-center justify-center text-[28px]"
 style={{ background: 'linear-gradient(145deg,#1C1C1E,#2C2C2E)' }}>
 
 </div>
 {!cam && (
 <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
 <VideoOff size={18} className="text-white/50" />
 </div>
 )}
 <div className="absolute bottom-0 left-0 right-0 text-center py-1"
 style={{ background: 'rgba(0,0,0,0.5)' }}>
 <p className="text-white text-[7px]">أنت</p>
 </div>
 </div>

 {/* sound visualizer */}
 {mic && (
 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 items-end">
 {[2,5,9,13,10,7,4,8,12,9,5,3].map((h, i) => (
 <motion.div key={i} className="w-1 rounded-full"
 style={{ background: 'rgba(0,180,216,0.7)' }}
 animate={{ height: [h, h * 1.6, h] }}
 transition={{ duration: 0.45, repeat: Infinity, delay: i * 0.04, ease: 'easeInOut' }} />
 ))}
 </div>
 )}
 </div>

 {/* controls bar */}
 <div className="shrink-0 px-5 py-4 pb-28"
 style={{ background: 'rgba(5,14,26,0.92)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
 <div className="flex items-center justify-around">
 {/* mic */}
 <button onClick={() => setMic(m => !m)} className="flex flex-col items-center gap-1.5">
 <motion.div whileTap={{ scale: 0.88 }}
 className="w-13 h-13 w-[52px] h-[52px] rounded-full flex items-center justify-center"
 style={{ background: mic ? 'rgba(255,255,255,0.1)' : 'rgba(239,68,68,0.25)', border: '1px solid rgba(255,255,255,0.1)' }}>
 {mic ? <Mic size={21} className="text-white" /> : <MicOff size={21} className="text-red-400" />}
 </motion.div>
 <span className="text-[9px]" style={{ color: mic ? 'rgba(255,255,255,0.4)' : '#F87171' }}>{mic ? 'كتم' : 'مكتوم'}</span>
 </button>

 {/* end call */}
 <button onClick={() => setEnded(true)} className="flex flex-col items-center gap-1.5">
 <motion.div whileTap={{ scale: 0.88 }}
 className="w-16 h-16 rounded-full flex items-center justify-center"
 style={{ background: '#EF4444', boxShadow: '0 8px 24px rgba(239,68,68,0.45)' }}>
 <PhoneOff size={26} className="text-white" />
 </motion.div>
 <span className="text-red-400 text-[9px] font-black">إنهاء</span>
 </button>

 {/* cam */}
 <button onClick={() => setCam(c => !c)} className="flex flex-col items-center gap-1.5">
 <motion.div whileTap={{ scale: 0.88 }}
 className="w-[52px] h-[52px] rounded-full flex items-center justify-center"
 style={{ background: cam ? 'rgba(255,255,255,0.1)' : 'rgba(239,68,68,0.25)', border: '1px solid rgba(255,255,255,0.1)' }}>
 {cam ? <Video size={21} className="text-white" /> : <VideoOff size={21} className="text-red-400" />}
 </motion.div>
 <span className="text-[9px]" style={{ color: cam ? 'rgba(255,255,255,0.4)' : '#F87171' }}>{cam ? 'الكاميرا' : 'مقفلة'}</span>
 </button>
 </div>
 </div>
 </div>
 );
}
