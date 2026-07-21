import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import {
 CalendarCheck, Clock, UserCheck, Search, Bell, Menu, X,
 ArrowUpRight, CheckCircle2, AlertCircle, Home, ClipboardList,
 Users, Phone, ArrowLeft, ChevronLeft
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

const appts = [
 { time:'٨:٠٠ ص', name:'أحمد الشمري', doctor:'د. سارة المطيري', spec:'طب عام', status:'حضر', sColor:'#10B981', sBg:'#ECFDF5', id:'#PT-001' },
 { time:'٨:٣٠ ص', name:'منيرة القحطاني', doctor:'د. خالد الدوسري', spec:'أسنان', status:'انتظار', sColor:'#F59E0B', sBg:'#FFFBEB', id:'#PT-002' },
 { time:'٩:٠٠ ص', name:'سعد العنزي', doctor:'د. نورة السبيعي', spec:'جلدية', status:'انتظار', sColor:'#F59E0B', sBg:'#FFFBEB', id:'#PT-003' },
 { time:'٩:٣٠ ص', name:'هند المطيري', doctor:'د. سارة المطيري', spec:'طب عام', status:'قادم', sColor:'#00B4D8', sBg:'#E0F9FF', id:'#PT-004' },
 { time:'١٠:٠٠ ص',name:'فيصل الدوسري', doctor:'د. خالد الدوسري', spec:'أسنان', status:'قادم', sColor:'#00B4D8', sBg:'#E0F9FF', id:'#PT-005' },
 { time:'١٠:٣٠ ص',name:'ريم الزهراني', doctor:'د. نورة السبيعي', spec:'جلدية', status:'مؤكد', sColor:'#8B5CF6', sBg:'#F5F3FF', id:'#PT-006' },
 { time:'١١:٠٠ ص',name:'عمر الحربي', doctor:'د. سارة المطيري', spec:'طب عام', status:'مؤكد', sColor:'#8B5CF6', sBg:'#F5F3FF', id:'#PT-007' },
 { time:'١١:٣٠ ص',name:'نوف العتيبي', doctor:'د. خالد الدوسري', spec:'أسنان', status:'قادم', sColor:'#00B4D8', sBg:'#E0F9FF', id:'#PT-008' },
];

const notifications = [
 { msg: 'أحمد الشمري وصل للعيادة', time: 'منذ ٣ دقائق', type: 'arrived' },
 { msg: 'تذكير: موعد منيرة القحطاني ٨:٣٠', time: 'منذ ٨ دقائق', type: 'reminder' },
 { msg: 'موعد جديد — ريم الزهراني ١٠:٣٠', time: 'منذ ١٥ دقيقة', type: 'new' },
 { msg: 'تم تأكيد ٣ مواعيد اليوم تلقائياً', time: 'منذ ٣٠ دقيقة', type: 'info' },
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

export default function ReceptionDashboard() {
 const [, navigate] = useLocation();
 const [sideOpen, setSideOpen] = useState(false);
 const [search, setSearch] = useState('');
 const [checked, setChecked] = useState<number[]>([0]);
 const total = useCounter(47);
 const waiting = useCounter(12);
 const arrived = useCounter(4);
 const newPts = useCounter(7);

 useEffect(() => {
 document.documentElement.dir = 'rtl';
 document.documentElement.lang = 'ar';
 }, []);

 const filtered = appts.filter(a =>
 a.name.includes(search) || a.doctor.includes(search) || a.spec.includes(search)
 );

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
 <p className="text-white/30 text-[9px]">لوحة الاستقبال</p>
 </div>
 </div>
 <button onClick={() => setSideOpen(false)} className="lg:hidden text-white/40 hover:text-white/70"><X size={18} /></button>
 </div>

 <div className="px-4 py-4 border-b border-white/8">
 <div className="flex items-center gap-3 bg-white/6 rounded-[14px] px-3 py-2.5">
 <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-[14px] shrink-0"
 style={{ background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)' }}>ر</div>
 <div className="min-w-0">
 <p className="text-white text-[12px] font-bold truncate">ريم الشمري</p>
 <p className="text-white/30 text-[9px]">موظفة استقبال</p>
 </div>
 </div>
 </div>

 <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
 <SideLink icon={Home} label="الرئيسية" active />
 <SideLink icon={CalendarCheck} label="المواعيد" badge="٤٧" />
 <SideLink icon={Users} label="المرضى" />
 <SideLink icon={Bell} label="الإشعارات" badge="٣" />
 <SideLink icon={ClipboardList} label="التقارير" />
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
 {/* Topbar */}
 <header className="bg-white border-b border-[rgba(11,74,111,0.07)] px-5 py-4 flex items-center gap-4 sticky top-0 z-30">
 <button className="lg:hidden text-[#555]" onClick={() => setSideOpen(true)}><Menu size={22} /></button>
 <div className="flex-1">
 <h1 className="text-[16px] font-bold text-[#111]">لوحة الاستقبال</h1>
 <p className="text-[11px] text-[#AAA]">الإثنين، ٢١ يوليو ٢٠٢٦</p>
 </div>
 <div className="flex items-center gap-3">
 <div className="relative hidden md:block">
 <Search size={14} className="absolute top-1/2 -translate-y-1/2 right-3 text-[#CCC]" />
 <input value={search} onChange={e => setSearch(e.target.value)}
 placeholder="ابحث عن مريض أو طبيب…"
 className="pr-9 pl-4 py-2 rounded-[12px] text-[13px] outline-none border border-[rgba(11,74,111,0.12)] bg-[#F8FAFC] text-[#333]"
 style={{ width: 220 }} />
 </div>
 <button className="relative w-9 h-9 rounded-full flex items-center justify-center bg-[#F0F4F8] hover:bg-[#E5ECF3]">
 <Bell size={17} className="text-[#555]" />
 <span className="absolute top-1 left-1 w-2 h-2 bg-[#EF4444] rounded-full" />
 </button>
 </div>
 </header>

 <div className="flex-1 p-5 md:p-7 space-y-6">

 {/* KPIs */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 <KpiCard label="إجمالي المواعيد" value={total} unit="موعد اليوم" icon={CalendarCheck} color="#00B4D8" bg="#E0F9FF" trend="+٨%" />
 <KpiCard label="في الانتظار" value={waiting} unit="مريض الآن" icon={Clock} color="#F59E0B" bg="#FFFBEB" trend="+٣" />
 <KpiCard label="تم الاستقبال" value={arrived} unit="مكتمل" icon={UserCheck} color="#10B981" bg="#ECFDF5" trend="" />
 <KpiCard label="مرضى جدد" value={newPts} unit="زيارة أولى" icon={Users} color="#8B5CF6" bg="#F5F3FF" trend="+٢" />
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

 {/* Appointments table */}
 <div className="lg:col-span-2 bg-white rounded-[22px] shadow-[0_2px_16px_rgba(0,0,0,0.05)] border border-[rgba(11,74,111,0.06)] overflow-hidden">
 <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(11,74,111,0.06)]">
 <div>
 <h2 className="text-[15px] font-bold text-[#111]">مواعيد اليوم</h2>
 <p className="text-[11px] text-[#AAA]">اضغط لتسجيل الحضور</p>
 </div>
 <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#E0F9FF] text-[#00B4D8]">{filtered.length} موعد</span>
 </div>
 <div className="divide-y divide-[rgba(11,74,111,0.05)]">
 {filtered.map((a, i) => (
 <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
 className="flex items-center gap-4 px-6 py-3.5 hover:bg-[#F8FAFC] transition-colors">
 <div className="text-center shrink-0 w-14">
 <p className="text-[11px] font-bold text-[#555]">{a.time}</p>
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-[13px] font-semibold text-[#111] truncate">{a.name}</p>
 <p className="text-[11px] text-[#AAA] truncate">{a.doctor} · {a.spec}</p>
 </div>
 <div className="flex items-center gap-2 shrink-0">
 <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ color: a.sColor, background: a.sBg }}>{a.status}</span>
 {checked.includes(i) ? (
 <CheckCircle2 size={18} className="text-[#10B981]" />
 ) : a.status === 'انتظار' ? (
 <button onClick={() => setChecked(p => [...p, i])}
 className="w-7 h-7 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
 style={{ background: '#ECFDF5', border: '1px solid #10B981' }}>
 <UserCheck size={12} className="text-[#10B981]" />
 </button>
 ) : (
 <div className="w-7 h-7 rounded-full border border-[rgba(11,74,111,0.1)]" />
 )}
 </div>
 </motion.div>
 ))}
 </div>
 </div>

 {/* Right column */}
 <div className="space-y-5">
 {/* Notifications */}
 <div className="bg-white rounded-[22px] shadow-[0_2px_16px_rgba(0,0,0,0.05)] border border-[rgba(11,74,111,0.06)] overflow-hidden">
 <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(11,74,111,0.06)]">
 <h2 className="text-[14px] font-bold text-[#111]">الإشعارات</h2>
 <Bell size={15} className="text-[#CCC]" />
 </div>
 <div className="divide-y divide-[rgba(11,74,111,0.05)]">
 {notifications.map((n, i) => (
 <div key={i} className="flex items-start gap-3 px-5 py-3">
 <div className="w-2 h-2 rounded-full mt-1.5 shrink-0"
 style={{ background: n.type === 'arrived' ? '#10B981' : n.type === 'reminder' ? '#F59E0B' : n.type === 'new' ? '#8B5CF6' : '#00B4D8' }} />
 <div className="flex-1 min-w-0">
 <p className="text-[12px] text-[#333] leading-snug">{n.msg}</p>
 <p className="text-[10px] text-[#CCC] mt-0.5">{n.time}</p>
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* Quick actions */}
 <div className="bg-white rounded-[22px] shadow-[0_2px_16px_rgba(0,0,0,0.05)] border border-[rgba(11,74,111,0.06)] p-5">
 <h2 className="text-[14px] font-bold text-[#111] mb-3">إجراءات سريعة</h2>
 <div className="space-y-2">
 {[
 ['','حجز موعد جديد','#E0F9FF','#00B4D8'],
 ['','تسجيل مريض جديد','#ECFDF5','#10B981'],
 ['','تأكيد المواعيد الهاتفية','#FFFBEB','#F59E0B'],
 ['','طباعة قائمة اليوم','#F5F3FF','#8B5CF6'],
 ].map(([emoji,label,bg,color]) => (
 <button key={label} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[12px] hover:scale-[1.01] transition-all text-right"
 style={{ background: bg }}>
 <span>{emoji}</span>
 <span className="text-[12px] font-semibold flex-1" style={{ color }}>{label}</span>
 <ChevronLeft size={13} style={{ color }} />
 </button>
 ))}
 </div>
 </div>
 </div>
 </div>
 </div>
 </main>
 </div>
 );
}
