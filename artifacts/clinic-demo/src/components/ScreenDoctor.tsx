import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Stethoscope, FileText, Pill } from 'lucide-react';

const queue = [
 { name:'أحمد الشمري', age:42, complaint:'ضغط دم مرتفع وصداع', wait:'٥ دقائق', urgent:true },
 { name:'منيرة القحطاني',age:35, complaint:'كشف دوري وتجديد وصفة', wait:'١٢ دقيقة', urgent:false },
 { name:'سعد العنزي', age:58, complaint:'آلام في المفاصل والظهر', wait:'١٨ دقيقة', urgent:false },
 { name:'هند المطيري', age:29, complaint:'سعال واحتقان منذ ٣ أيام', wait:'٢٥ دقيقة', urgent:false },
];

export function ScreenDoctor() {
 const [active, setActive] = useState<number | null>(null);
 const [notes, setNotes] = useState('');

 if (active !== null) {
 const p = queue[active];
 return (
 <div className="flex flex-col h-full bg-[#0A0F1A] text-white">
 <div className="px-4 pt-4 pb-3" style={{ background:'linear-gradient(170deg,#0D1428,#0A2040)' }}>
 <button onClick={() => setActive(null)} className="flex items-center gap-1 text-[#00B4D8] text-[11px] mb-2">
 <ChevronLeft size={12}/> طابور المرضى
 </button>
 <div className="flex items-center gap-2.5">
 <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
 style={{ background:'rgba(0,180,216,0.15)', border:'1px solid rgba(0,180,216,0.2)' }}></div>
 <div>
 <p className="text-[14px] font-black">{p.name}</p>
 <p className="text-[9px] text-white/40">{p.age} سنة · {p.complaint}</p>
 </div>
 </div>
 </div>
 <div className="flex-1 overflow-y-auto scrollbar-none px-3 py-3 space-y-3">
 {/* Vitals */}
 <div className="rounded-[14px] p-3" style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}>
 <p className="text-[9px] font-bold text-white/50 mb-2 flex items-center gap-1"><Stethoscope size={9}/> القياسات الحيوية</p>
 <div className="grid grid-cols-3 gap-2">
 {[['٩٠/١٤٠','الضغط','#FF6B6B'],['٨٨','النبض','#FF9F0A'],['٣٧.١','الحرارة','#34C759']].map(([v,l,c]) => (
 <div key={l} className="rounded-[10px] py-2 text-center" style={{ background:`${c}14` }}>
 <p className="text-[12px] font-black" style={{ color:c }}>{v}</p>
 <p className="text-[7px] text-white/35">{l}</p>
 </div>
 ))}
 </div>
 </div>
 {/* Last visit */}
 <div className="rounded-[14px] p-3" style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}>
 <p className="text-[9px] font-bold text-white/50 mb-1.5 flex items-center gap-1"><FileText size={9}/> آخر زيارة — ١٥ يونيو</p>
 <p className="text-[10px] text-white/60 leading-relaxed">تشخيص: ارتفاع ضغط الدم. وُصف له أملوديبين ٥ ملغ. طُلب تحليل كلوي للمتابعة.</p>
 </div>
 {/* Medications */}
 <div className="rounded-[14px] p-3" style={{ background:'rgba(175,82,222,0.08)', border:'1px solid rgba(175,82,222,0.2)' }}>
 <p className="text-[9px] font-bold mb-1.5 flex items-center gap-1" style={{ color:'#AF52DE' }}><Pill size={9}/> الأدوية الحالية</p>
 {['أملوديبين ٥ ملغ · مرة صباحاً','أوميبرازول ٢٠ ملغ · قبل الفطور'].map((m,i) => (
 <p key={i} className="text-[9px] text-white/50 leading-6">{m}</p>
 ))}
 </div>
 {/* Notes */}
 <div className="rounded-[14px] overflow-hidden" style={{ border:'1px solid rgba(0,180,216,0.2)' }}>
 <div className="px-3 py-2" style={{ background:'rgba(0,180,216,0.08)' }}>
 <p className="text-[9px] font-bold text-[#00B4D8]">ملاحظات الطبيب</p>
 </div>
 <div className="px-3 py-2" style={{ background:'rgba(255,255,255,0.03)' }}>
 <p className="text-[9px] text-white/30 leading-relaxed">{notes || 'اكتب ملاحظاتك هنا…'}</p>
 </div>
 </div>
 <motion.button whileTap={{ scale:0.97 }} onClick={() => setActive(null)}
 className="w-full py-3 rounded-[14px] text-white font-bold text-[12px]"
 style={{ background:'linear-gradient(135deg,#0B4A6F,#00B4D8)' }}>
 إنهاء الكشف → التالي
 </motion.button>
 </div>
 </div>
 );
 }

 return (
 <div className="flex flex-col h-full bg-[#0A0F1A] text-white">
 <div className="px-4 pt-4 pb-3" style={{ background:'linear-gradient(170deg,#0D1428,#0A2040)' }}>
 <p className="text-[10px] text-white/40 mb-0.5">الإثنين، ٢١ يوليو</p>
 <h2 className="text-[16px] font-black">لوحة الطبيب</h2>
 <p className="text-[10px] text-white/45 mt-0.5">د. سارة المطيري · طب عام</p>
 <div className="flex gap-2 mt-2">
 {[['١٨','مريض اليوم'],['٣','منتهي'],['١٥','متبقي']].map(([v,l]) => (
 <div key={l} className="flex-1 rounded-[10px] py-1.5 text-center" style={{ background:'rgba(255,255,255,0.05)' }}>
 <p className="text-[12px] font-black text-[#00B4D8]">{v}</p>
 <p className="text-[7px] text-white/35">{l}</p>
 </div>
 ))}
 </div>
 </div>

 <div className="flex-1 overflow-y-auto scrollbar-none px-3 py-3 space-y-2">
 <p className="text-[9px] font-bold text-white/40 px-1">طابور الانتظار — اضغط لبدء الكشف</p>
 {queue.map((p, i) => (
 <motion.button key={i} onClick={() => setActive(i)}
 initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.07 }}
 className="w-full rounded-[14px] px-3 py-2.5 flex items-center gap-2.5 text-right"
 style={{ background: i===0 ? 'rgba(0,180,216,0.1)' : 'rgba(255,255,255,0.04)', border:`1px solid ${i===0 ? 'rgba(0,180,216,0.3)' : 'rgba(255,255,255,0.07)'}` }}>
 <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0"
 style={{ background: i===0 ? 'rgba(0,180,216,0.2)' : 'rgba(255,255,255,0.06)' }}>
 {i+1}
 </div>
 <div className="flex-1 min-w-0 text-right">
 <div className="flex items-center gap-1.5">
 <p className="text-[11px] font-bold">{p.name}</p>
 {p.urgent && <span className="text-[7px] px-1.5 py-0.5 rounded-full font-bold" style={{ background:'rgba(239,68,68,0.2)', color:'#FF6B6B' }}>عاجل</span>}
 </div>
 <p className="text-[8px] text-white/35 truncate">{p.complaint}</p>
 </div>
 <div className="text-left shrink-0">
 <p className="text-[8px] text-white/30">{p.wait}</p>
 <ChevronLeft size={10} className="text-white/25 mr-auto mt-0.5"/>
 </div>
 </motion.button>
 ))}
 </div>
 </div>
 );
}
