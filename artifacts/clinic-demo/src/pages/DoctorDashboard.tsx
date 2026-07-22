import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import {
 Stethoscope, Clock, CheckCircle2, Bell, Menu, X,
 ArrowUpRight, Users, FileText, Pill, Home, ArrowLeft,
 ChevronLeft, Activity, Star
} from 'lucide-react';

function useCounter(target: number, duration = 1400) {
 const [val, setVal] = useState(0);
 useEffect(() => {
 let v = 0;
 const step = Math.max(1, Math.ceil(target / (duration / 16)));
 const t = setInterval(() => {
 v = Math.min(v + step, target);
 setVal(v);
 if (v >= target) clearInterval(t);
 }, 16);
 return () => clearInterval(t);
 }, [target, duration]);
 return val;
}

const queue = [
 { name:'أحمد الشمري', age:42, complaint:'ضغط دم مرتفع وصداع', time:'٨:٠٠ ص', status:'داخل', sColor:'#10B981', sBg:'#ECFDF5', urgent:true, bp:'١٤٠/٩٠', pulse:'٨٨', temp:'٣٧.١', lastVisit:'١٥ يونيو', dx:'ارتفاع ضغط الدم', meds:['أملوديبين ٥ ملغ','أوميبرازول ٢٠ ملغ'] },
 { name:'منيرة القحطاني', age:35, complaint:'كشف دوري وتجديد وصفة', time:'٨:٣٠ ص', status:'انتظار', sColor:'#F59E0B', sBg:'#FFFBEB', urgent:false, bp:'١٢٠/٨٠', pulse:'٧٢', temp:'٣٦.٨', lastVisit:'١٠ يوليو', dx:'متابعة دورية', meds:['فيتامين د ٢٠٠٠'] },
 { name:'سعد العنزي', age:58, complaint:'آلام في المفاصل والظهر', time:'٩:٠٠ ص', status:'انتظار', sColor:'#F59E0B', sBg:'#FFFBEB', urgent:false, bp:'١٣٥/٨٥', pulse:'٧٩', temp:'٣٦.٩', lastVisit:'٣ يوليو', dx:'التهاب مفاصل', meds:['ايبوبروفين ٤٠٠ ملغ'] },
 { name:'هند المطيري', age:29, complaint:'سعال واحتقان منذ ٣ أيام',time:'٩:٣٠ ص', status:'قادم', sColor:'#00B4D8', sBg:'#E0F9FF', urgent:false, bp:'١١٥/٧٥', pulse:'٧٠', temp:'٣٧.٨', lastVisit:'زيارة أولى',dx:'—', meds:[] },
 { name:'فيصل الدوسري', age:51, complaint:'سكري — متابعة دورية', time:'١٠:٠٠ ص',status:'قادم', sColor:'#00B4D8', sBg:'#E0F9FF', urgent:false, bp:'١٢٨/٨٢', pulse:'٧٦', temp:'٣٦.٩', lastVisit:'٢٢ يونيو', dx:'سكري النوع ٢', meds:['ميتفورمين ٥٠٠ ملغ'] },
];

function SideLink({ icon: Icon, label, active, badge }: { icon: React.ElementType; label: string; active?: boolean; badge?: string }) {
 return (
 <div className={`flex items-center gap-3 px-4 py-2.5 rounded-[12px] cursor-pointer transition-all duration-150 ${active ? '' : 'hover:bg-white/5'}`}
 style={active ? { background: 'rgba(0,180,216,0.12)', border: '1px solid rgba(0,180,216,0.18)' } : {}}>
 <Icon size={17} style={{ color: active ? '#00B4D8' : 'rgba(255,255,255,0.4)' }} />
 <span className="text-[13px] font-medium flex-1" style={{ color: active ? '#00B4D8' : 'rgba(255,255,255,0.55)' }}>{label}</span>
 {badge && <span className="text-[10px] bg-[#EF4444] text-white font-bold px-1.5 py-0.5 rounded-full">{badge}</span>}
 </div>
 );
}

function KpiCard({ label, value, unit, icon: Icon, color, bg, trend }: {
 label: string; value: string | number; unit: string;
 icon: React.ElementType; color: string; bg: string; trend: string;
}) {
 return (
 <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
 className="bg-white rounded-[22px] p-5 border border-[rgba(11,74,111,0.06)] shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
 <div className="flex items-start justify-between mb-4">
 <div className="w-11 h-11 rounded-[14px] flex items-center justify-center" style={{ background: bg }}>
 <Icon size={20} style={{ color }} />
 </div>
 <div className="flex items-center gap-1 bg-[#ECFDF5] px-2 py-1 rounded-full">
 <ArrowUpRight size={10} className="text-[#10B981]" />
 <span className="text-[10px] font-bold text-[#10B981]">{trend}</span>
 </div>
 </div>
 <p className="text-[12px] text-[#AAA] font-light mb-0.5">{label}</p>
 <p className="text-[28px] font-bold text-[#111] leading-none">{value}</p>
 <p className="text-[12px] mt-1" style={{ color }}>{unit}</p>
 </motion.div>
 );
}

export default function DoctorDashboard() {
 const [, navigate] = useLocation();
 const [sideOpen, setSideOpen] = useState(false);
 const [selected, setSelected] = useState<number | null>(null);
 const total = useCounter(18);
 const done = useCounter(3);
 const waiting = useCounter(15);
 const rating = useCounter(49);

 useEffect(() => {
 document.documentElement.dir = 'rtl';
 document.documentElement.lang = 'ar';
 }, []);

 const patient = selected !== null ? queue[selected] : null;

 return (
 <div className="min-h-screen flex" style={{ background: '#F0F4F8', fontFamily: "'Tajawal', sans-serif" }} dir="rtl">

 {sideOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSideOpen(false)} />}

 {/* Sidebar */}
 <aside className={`fixed top-0 right-0 h-full z-50 flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 lg:z-auto ${sideOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}
 style={{ width: 240, background: 'linear-gradient(180deg,#06101E 0%,#0B2A40 100%)' }}>

 <div className="flex items-center justify-between px-5 py-5 border-b border-white/8">
 <div className="flex items-center gap-2.5">
 <div className="w-8 h-8 rounded-[10px] flex items-center justify-center shadow-[0_4px_16px_rgba(0,180,216,0.3)]"
 style={{ background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)' }}>
 <span className="text-white text-[13px] font-bold">ت</span>
 </div>
 <div>
 <p className="text-white text-[14px] font-bold leading-none">تلقا</p>
 <p className="text-white/30 text-[9px]">لوحة الطبيب</p>
 </div>
 </div>
 <button onClick={() => setSideOpen(false)} className="lg:hidden text-white/40"><X size={18} /></button>
 </div>

 <div className="px-4 py-4 border-b border-white/8">
 <div className="flex items-center gap-3 bg-white/6 rounded-[14px] px-3 py-2.5">
 <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-[14px] shrink-0"
 style={{ background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)' }}>س</div>
 <div className="min-w-0">
 <p className="text-white text-[12px] font-bold truncate">د. سارة المطيري</p>
 <p className="text-white/30 text-[9px]">طب عام</p>
 </div>
 </div>
 </div>

 <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
 <SideLink icon={Home} label="الرئيسية" active />
 <SideLink icon={Users} label="المرضى" badge="١٨" />
 <SideLink icon={FileText} label="الوصفات" />
 <SideLink icon={Activity} label="التقارير" />
 <SideLink icon={Bell} label="الإشعارات" />
 </nav>

 <div className="px-3 pb-4">
 <button onClick={() => navigate('/')}
 className="w-full flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-white/40 hover:text-white/70 hover:bg-white/5 transition-all">
 <ArrowLeft size={16} /><span className="text-[13px]">العودة للموقع</span>
 </button>
 </div>
 </aside>

 {/* Main */}
 <main className="flex-1 flex flex-col min-w-0 overflow-auto">
 <header className="bg-white border-b border-[rgba(11,74,111,0.07)] px-5 py-4 flex items-center gap-4 sticky top-0 z-30">
 <button className="lg:hidden text-[#555]" onClick={() => setSideOpen(true)}><Menu size={22} /></button>
 <div className="flex-1">
 <h1 className="text-[16px] font-bold text-[#111]">لوحة الطبيب</h1>
 <p className="text-[11px] text-[#AAA]">الإثنين، ٢١ يوليو ٢٠٢٦</p>
 </div>
 <button className="relative w-9 h-9 rounded-full flex items-center justify-center bg-[#F0F4F8] hover:bg-[#E5ECF3]">
 <Bell size={17} className="text-[#555]" />
 </button>
 </header>

 <div className="flex-1 p-5 md:p-7 space-y-6">

 {/* KPIs */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 <KpiCard label="مرضى اليوم" value={total} unit="موعد" icon={Users} color="#00B4D8" bg="#E0F9FF" trend="+٢" />
 <KpiCard label="تم الكشف" value={done} unit="مكتمل" icon={CheckCircle2} color="#10B981" bg="#ECFDF5" trend="" />
 <KpiCard label="في الانتظار" value={waiting} unit="مريض" icon={Clock} color="#F59E0B" bg="#FFFBEB" trend="⏳" />
 <KpiCard label="التقييم" value={`${(rating/10).toFixed(1)}`} unit="/ ٥ نجوم" icon={Star} color="#8B5CF6" bg="#F5F3FF" trend="+٠.١" />
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

 {/* Queue */}
 <div className="lg:col-span-1 bg-white rounded-[22px] shadow-[0_2px_16px_rgba(0,0,0,0.05)] border border-[rgba(11,74,111,0.06)] overflow-hidden flex flex-col">
 <div className="px-5 py-4 border-b border-[rgba(11,74,111,0.06)]">
 <h2 className="text-[15px] font-bold text-[#111]">طابور المرضى</h2>
 <p className="text-[11px] text-[#AAA]">اضغط على المريض لعرض ملفه</p>
 </div>
 <div className="flex-1 divide-y divide-[rgba(11,74,111,0.05)]">
 {queue.map((p, i) => (
 <button key={i} onClick={() => setSelected(i === selected ? null : i)}
 className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-[#F8FAFC] transition-colors text-right"
 style={selected === i ? { background: '#EFF9FF', borderRight: '3px solid #00B4D8' } : {}}>
 <div className="w-8 h-8 rounded-[10px] flex items-center justify-center text-white font-bold text-[12px] shrink-0"
 style={{ background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)' }}>{i+1}</div>
 <div className="flex-1 min-w-0">
 <div className="flex items-center gap-1.5">
 <p className="text-[12px] font-semibold text-[#111] truncate">{p.name}</p>
 {p.urgent && <span className="text-[8px] bg-[#FEF2F2] text-[#EF4444] font-bold px-1.5 py-0.5 rounded-full shrink-0">عاجل</span>}
 </div>
 <p className="text-[10px] text-[#AAA] truncate">{p.complaint}</p>
 </div>
 <div className="text-left shrink-0">
 <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ color: p.sColor, background: p.sBg }}>{p.status}</span>
 <p className="text-[9px] text-[#CCC] mt-0.5">{p.time}</p>
 </div>
 </button>
 ))}
 </div>
 </div>

 {/* Patient file */}
 <div className="lg:col-span-2">
 <AnimatePresence mode="wait">
 {patient ? (
 <motion.div key={selected} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
 className="bg-white rounded-[22px] shadow-[0_2px_16px_rgba(0,0,0,0.05)] border border-[rgba(11,74,111,0.06)] overflow-hidden">
 {/* Patient header */}
 <div className="px-6 py-5 border-b border-[rgba(11,74,111,0.06)] flex items-center gap-4"
 style={{ background: 'linear-gradient(135deg,#F0F8FF,#E0F9FF)' }}>
 <div className="w-14 h-14 rounded-[16px] flex items-center justify-center text-2xl bg-white shadow-sm"></div>
 <div className="flex-1">
 <h3 className="text-[17px] font-bold text-[#111]">{patient.name}</h3>
 <p className="text-[12px] text-[#AAA]">{patient.age} سنة · {patient.time}</p>
 <p className="text-[12px] text-[#555] mt-0.5">{patient.complaint}</p>
 </div>
 <span className="text-[11px] font-bold px-3 py-1.5 rounded-full" style={{ color: patient.sColor, background: patient.sBg }}>{patient.status}</span>
 </div>

 <div className="p-6 space-y-5">
 {/* Vitals */}
 <div>
 <p className="text-[11px] font-bold text-[#AAA] uppercase mb-3 flex items-center gap-1.5">
 <Activity size={12} /> القياسات الحيوية
 </p>
 <div className="grid grid-cols-3 gap-3">
 {[
 [patient.bp, 'الضغط', '#EF4444', '#FEF2F2'],
 [patient.pulse, 'النبض', '#F59E0B', '#FFFBEB'],
 [patient.temp, 'الحرارة','#10B981', '#ECFDF5'],
 ].map(([v,l,c,bg]) => (
 <div key={l} className="rounded-[16px] p-4 text-center" style={{ background: bg }}>
 <p className="text-[18px] font-bold leading-none" style={{ color: c }}>{v}</p>
 <p className="text-[10px] text-[#AAA] mt-1">{l}</p>
 </div>
 ))}
 </div>
 </div>

 {/* Last visit */}
 <div className="rounded-[16px] p-4" style={{ background: '#F8FAFC', border: '1px solid rgba(11,74,111,0.08)' }}>
 <p className="text-[11px] font-bold text-[#AAA] uppercase mb-2 flex items-center gap-1.5">
 <FileText size={12} /> آخر زيارة — {patient.lastVisit}
 </p>
 <p className="text-[13px] text-[#555]">التشخيص: <span className="font-semibold text-[#111]">{patient.dx}</span></p>
 </div>

 {/* Medications */}
 {patient.meds.length > 0 && (
 <div className="rounded-[16px] p-4" style={{ background: '#F5F3FF', border: '1px solid rgba(139,92,246,0.15)' }}>
 <p className="text-[11px] font-bold uppercase mb-2 flex items-center gap-1.5 text-[#8B5CF6]">
 <Pill size={12} /> الأدوية الحالية
 </p>
 <div className="space-y-1.5">
 {patient.meds.map((m, i) => (
 <div key={i} className="flex items-center gap-2">
 <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shrink-0" />
 <p className="text-[12px] text-[#555]">{m}</p>
 </div>
 ))}
 </div>
 </div>
 )}

 {/* Actions */}
 <div className="flex gap-3">
 <button className="flex-1 py-3 rounded-[14px] font-bold text-[13px] text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
 style={{ background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)' }}>
 كتابة وصفة طبية
 </button>
 <button className="flex-1 py-3 rounded-[14px] font-bold text-[13px] transition-all hover:scale-[1.02] active:scale-[0.98]"
 style={{ background: '#ECFDF5', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)' }}
 onClick={() => setSelected(selected !== null && selected < queue.length - 1 ? selected + 1 : null)}>
 إنهاء الكشف → التالي
 </button>
 </div>
 </div>
 </motion.div>
 ) : (
 <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
 className="bg-white rounded-[22px] shadow-[0_2px_16px_rgba(0,0,0,0.05)] border border-[rgba(11,74,111,0.06)] flex flex-col items-center justify-center py-20 text-center">
 <div className="w-16 h-16 rounded-[20px] flex items-center justify-center mb-4" style={{ background: '#E0F9FF' }}>
 <Stethoscope size={28} className="text-[#00B4D8]" />
 </div>
 <p className="text-[15px] font-bold text-[#111] mb-1">اختر مريضاً من القائمة</p>
 <p className="text-[12px] text-[#AAA]">اضغط على اسم المريض لعرض ملفه الطبي</p>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 </div>
 </div>
 </main>
 </div>
 );
}
