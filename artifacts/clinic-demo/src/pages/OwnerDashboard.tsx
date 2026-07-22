import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import {
 TrendingUp, Users, CalendarCheck, Clock, ShieldCheck,
 BarChart3, UserCheck, AlertCircle, CheckCircle2, Banknote,
 Activity, ArrowUpRight, Star, Bell, Search, ChevronDown,
 Home, FileText, Settings, LogOut, Menu, X, Lock, Eye,
 Shield, Cpu, Database, Key, Award, ArrowLeft
} from 'lucide-react';

/* ── animated counter ───────────────────────────────────────────── */
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

/* ── data ────────────────────────────────────────────────────────── */
const weekRevenue = [6200, 8400, 5900, 9100, 7600, 11200, 9800];
const weekDays = ['أح','إث','ثل','أر','خم','جم','سب'];
const maxRev = Math.max(...weekRevenue);

const queue = [
 { name: 'محمد العمري', time: '٩:٠٠', doc: 'د. سارة المطيري', spec: 'طب عام', status: 'داخل', color: '#10B981', bg: '#ECFDF5', id: '#PT-001' },
 { name: 'فاطمة الزهراني', time: '٩:٣٠', doc: 'د. خالد الدوسري', spec: 'أسنان', status: 'انتظار', color: '#F59E0B', bg: '#FFFBEB', id: '#PT-002' },
 { name: 'علي الشهري', time: '١٠:٠٠', doc: 'د. سارة المطيري', spec: 'طب عام', status: 'قادم', color: '#00B4D8', bg: '#E0F9FF', id: '#PT-003' },
 { name: 'نورة السالم', time: '١٠:٣٠', doc: 'د. أحمد الغامدي', spec: 'جلدية', status: 'قادم', color: '#00B4D8', bg: '#E0F9FF', id: '#PT-004' },
 { name: 'عبدالله القحطاني', time: '١١:٠٠', doc: 'د. خالد الدوسري', spec: 'أسنان', status: 'مؤكد', color: '#8B5CF6', bg: '#F5F3FF', id: '#PT-005' },
 { name: 'ريم العتيبي', time: '١١:٣٠', doc: 'د. أحمد الغامدي', spec: 'جلدية', status: 'مؤكد', color: '#8B5CF6', bg: '#F5F3FF', id: '#PT-006' },
 { name: 'سلطان المالكي', time: '١٢:٠٠', doc: 'د. سارة المطيري', spec: 'طب عام', status: 'قادم', color: '#00B4D8', bg: '#E0F9FF', id: '#PT-007' },
];

const staff = [
 { name: 'د. سارة المطيري', role: 'طب عام', patients: 8, done: 3, status: 'نشط', color: '#10B981', av: 'س', rating: 4.9 },
 { name: 'د. خالد الدوسري', role: 'أسنان', patients: 5, done: 2, status: 'نشط', color: '#10B981', av: 'خ', rating: 4.8 },
 { name: 'د. أحمد الغامدي', role: 'جلدية', patients: 6, done: 4, status: 'نشط', color: '#10B981', av: 'أ', rating: 4.7 },
 { name: 'ريم الشمري', role: 'استقبال', patients: 22, done: 14, status: 'نشط', color: '#10B981', av: 'ر', rating: 4.9 },
 { name: 'سلطان العنزي', role: 'محاسبة', patients: 0, done: 0, status: 'مغادر', color: '#EF4444', av: 'ص', rating: 4.6 },
];

const monthlyData = [
 { month: 'يناير', rev: 42000, patients: 180 },
 { month: 'فبراير', rev: 51000, patients: 210 },
 { month: 'مارس', rev: 47000, patients: 195 },
 { month: 'أبريل', rev: 63000, patients: 250 },
 { month: 'مايو', rev: 58000, patients: 235 },
 { month: 'يونيو', rev: 71000, patients: 278 },
];

const securityEvents = [
 { event: 'تسجيل دخول ناجح — المالك', time: 'منذ ٢ دقيقة', type: 'success' },
 { event: 'نسخ احتياطي مشفر تلقائي', time: 'منذ ٣٠ دقيقة', type: 'info' },
 { event: 'تشفير بيانات المرضى — مكتمل', time: 'منذ ١ ساعة', type: 'success' },
 { event: 'فحص أمني دوري — لا تهديدات', time: 'منذ ٣ ساعات', type: 'success' },
];

/* ── Sidebar link ───────────────────────────────────────────────── */
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

/* ── Revenue bar chart ──────────────────────────────────────────── */
function WeekBar({ value, day, isToday }: { value: number; day: string; isToday: boolean }) {
 const pct = (value / maxRev) * 100;
 return (
 <div className="flex flex-col items-center gap-1.5 flex-1">
 <p className="text-[10px] font-bold" style={{ color: isToday ? '#00B4D8' : 'transparent' }}>
 {isToday ? (value / 1000).toFixed(1) + 'k' : ''}
 </p>
 <div className="w-full flex items-end justify-center rounded-[4px] overflow-hidden" style={{ height: 80 }}>
 <motion.div
 initial={{ height: 0 }} animate={{ height: `${pct}%` }}
 transition={{ duration: 0.8, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
 className="w-full rounded-t-[6px]"
 style={{ background: isToday ? 'linear-gradient(180deg,#00B4D8,#0B4A6F)' : 'rgba(11,74,111,0.12)', minHeight: 4 }}
 />
 </div>
 <p className="text-[10px] font-semibold" style={{ color: isToday ? '#0B4A6F' : '#CCC' }}>{day}</p>
 </div>
 );
}

/* ── KPI card ───────────────────────────────────────────────────── */
function KpiCard({ label, value, unit, icon: Icon, color, bg, trend, sub }: {
 label: string; value: string | number; unit: string;
 icon: React.ElementType; color: string; bg: string; trend: string; sub?: string;
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
 {sub && <p className="text-[10px] text-[#CCC] mt-1">{sub}</p>}
 </motion.div>
 );
}

/* ── Main component ─────────────────────────────────────────────── */
export default function OwnerDashboard() {
 const [, navigate] = useLocation();
 const [sideOpen, setSideOpen] = useState(false);
 const [activeNav, setActiveNav] = useState<'dashboard' | 'queue' | 'staff' | 'reports' | 'security'>('dashboard');
 const revenue = useCounter(58200);
 const patients = useCounter(38);
 const appts = useCounter(22);
 const rating = useCounter(48);

 useEffect(() => {
 document.documentElement.dir = 'rtl';
 document.documentElement.lang = 'ar';
 }, []);

 return (
 <div className="min-h-screen flex" style={{ background: '#F0F4F8', fontFamily: "'Tajawal', sans-serif" }} dir="rtl">

 {/* ── Sidebar overlay (mobile) ──────────────────────────── */}
 {sideOpen && (
 <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSideOpen(false)} />
 )}

 {/* ── Sidebar ──────────────────────────────────────────── */}
 <aside className={`
 fixed top-0 right-0 h-full z-50 flex flex-col
 transition-transform duration-300
 lg:static lg:translate-x-0 lg:z-auto
 ${sideOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
 `} style={{ width: 240, background: 'linear-gradient(180deg,#06101E 0%,#0B2A40 100%)' }}>

 {/* Logo */}
 <div className="flex items-center justify-between px-5 py-5 border-b border-white/8">
 <div className="flex items-center gap-2.5">
 <div className="w-8 h-8 rounded-[10px] flex items-center justify-center shadow-[0_4px_16px_rgba(0,180,216,0.3)]"
 style={{ background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)' }}>
 <span className="text-white text-[13px] font-bold">ت</span>
 </div>
 <div>
 <p className="text-white text-[14px] font-bold leading-none">تلقا</p>
 <p className="text-white/30 text-[9px]">لوحة الإدارة</p>
 </div>
 </div>
 <button onClick={() => setSideOpen(false)} className="lg:hidden text-white/40 hover:text-white/70">
 <X size={18} />
 </button>
 </div>

 {/* Clinic info */}
 <div className="px-4 py-4 border-b border-white/8">
 <div className="flex items-center gap-3 bg-white/6 rounded-[14px] px-3 py-2.5">
 <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-[14px] shrink-0"
 style={{ background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)' }}>ع</div>
 <div className="min-w-0">
 <p className="text-white text-[12px] font-bold truncate">عيادة الشفاء</p>
 <p className="text-white/30 text-[9px]">الرياض · مالك</p>
 </div>
 <ChevronDown size={13} className="text-white/30 shrink-0" />
 </div>
 </div>

 {/* Nav */}
 <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
 <p className="text-white/20 text-[10px] font-semibold uppercase px-4 mb-2">القائمة الرئيسية</p>
 <div onClick={() => setActiveNav('dashboard')}><SideLink icon={Home} label="لوحة التحكم" active={activeNav === 'dashboard'} /></div>
 <div onClick={() => setActiveNav('queue')} ><SideLink icon={CalendarCheck} label="الطابور اليوم" active={activeNav === 'queue'} badge="٧" /></div>
 <div onClick={() => setActiveNav('staff')} ><SideLink icon={Users} label="الفريق الطبي" active={activeNav === 'staff'} /></div>
 <div onClick={() => setActiveNav('reports')} ><SideLink icon={BarChart3} label="التقارير" active={activeNav === 'reports'} /></div>

 <p className="text-white/20 text-[10px] font-semibold uppercase px-4 mt-5 mb-2">النظام</p>
 <div onClick={() => setActiveNav('security')} ><SideLink icon={ShieldCheck} label="مركز الأمان" active={activeNav === 'security'} /></div>
 <div><SideLink icon={Settings} label="الإعدادات" /></div>
 </nav>

 {/* Security badge */}
 <div className="px-3 pb-4">
 <div className="rounded-[14px] px-3.5 py-3 flex items-center gap-2.5"
 style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
 <ShieldCheck size={16} className="text-[#10B981] shrink-0" />
 <div>
 <p className="text-[#10B981] text-[10px] font-bold leading-none">آمن ومشفر ١٠٠٪</p>
 <p className="text-[#10B981]/50 text-[8px] mt-0.5">AES-256 · HIPAA · ISO 27001</p>
 </div>
 </div>
 </div>
 </aside>

 {/* ── Main content ─────────────────────────────────────── */}
 <div className="flex-1 flex flex-col min-w-0">

 {/* Top bar */}
 <header className="bg-white border-b border-[rgba(11,74,111,0.07)] px-6 py-4 flex items-center gap-4 sticky top-0 z-30 shadow-[0_1px_12px_rgba(0,0,0,0.04)]">
 <button onClick={() => setSideOpen(true)} className="lg:hidden text-[#666] hover:text-[#333]">
 <Menu size={22} />
 </button>

 {/* Back to demo */}
 <button onClick={() => navigate('/')}
 className="flex items-center gap-1.5 text-[12px] font-semibold text-[#0B4A6F] hover:text-[#00B4D8] transition-colors">
 <ArrowLeft size={14} />
 رجوع للديمو
 </button>

 <div className="flex-1" />

 {/* Search */}
 <div className="hidden md:flex items-center gap-2 bg-[#F5F7FA] rounded-[12px] px-3.5 py-2 w-56">
 <Search size={14} className="text-[#CCC]" />
 <input placeholder="بحث..." className="bg-transparent text-[13px] text-[#666] placeholder-[#CCC] outline-none flex-1 text-right" />
 </div>

 {/* Date */}
 <div className="hidden sm:block text-[12px] text-[#AAA] font-light">
 السبت ١٩ يوليو ٢٠٢٥
 </div>

 {/* Bell */}
 <button className="relative w-9 h-9 bg-[#F5F7FA] rounded-[12px] flex items-center justify-center hover:bg-[#EBF5FF] transition-colors">
 <Bell size={16} className="text-[#666]" />
 <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full" />
 </button>

 {/* Avatar */}
 <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[13px] font-bold shrink-0"
 style={{ background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)' }}>م</div>
 </header>

 {/* Page content */}
 <main className="flex-1 p-6 overflow-y-auto">

 {/* ── DASHBOARD VIEW ── */}
 {activeNav === 'dashboard' && (
 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
 <div className="mb-6">
 <h1 className="text-[24px] font-bold text-[#111]">لوحة التحكم</h1>
 <p className="text-[13px] text-[#AAA] font-light mt-0.5">مرحباً بك — هذه نظرة عامة على أداء عيادتك اليوم</p>
 </div>

 {/* KPI grid */}
 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
 <KpiCard label="إيراد الشهر" value={revenue.toLocaleString('ar')} unit="ريال سعودي" icon={Banknote} color="#10B981" bg="#ECFDF5" trend="+١٨٪" sub="مقارنة بالشهر الماضي" />
 <KpiCard label="إجمالي المرضى" value={patients} unit="مريض اليوم" icon={Users} color="#0B4A6F" bg="#EBF5FF" trend="+٥" sub="٣ مرضى جدد" />
 <KpiCard label="المواعيد" value={appts} unit="موعد مجدول" icon={CalendarCheck} color="#8B5CF6" bg="#F5F3FF" trend="+٢" sub="٤ متبقية الآن" />
 <KpiCard label="رضا المرضى" value={(rating / 10).toFixed(1)} unit="من ٥ نجوم" icon={Star} color="#F59E0B" bg="#FFFBEB" trend="+٠.٢" sub="٩٨ تقييم هذا الشهر" />
 </div>

 {/* Charts row */}
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
 {/* Revenue chart */}
 <div className="lg:col-span-2 bg-white rounded-[22px] p-6 border border-[rgba(11,74,111,0.06)] shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
 <div className="flex items-center justify-between mb-5">
 <div>
 <h3 className="text-[16px] font-bold text-[#111]">إيرادات هذا الأسبوع</h3>
 <p className="text-[12px] text-[#AAA] font-light">ريال سعودي · مقارنة بالأسبوع الماضي</p>
 </div>
 <div className="flex items-center gap-1.5 bg-[#ECFDF5] px-3 py-1.5 rounded-full">
 <TrendingUp size={12} className="text-[#10B981]" />
 <span className="text-[11px] font-bold text-[#10B981]">+١٨٪</span>
 </div>
 </div>
 <div className="flex items-end gap-2" style={{ height: 120 }}>
 {weekRevenue.map((v, i) => <WeekBar key={i} value={v} day={weekDays[i]} isToday={i === 6} />)}
 </div>
 <div className="mt-4 pt-4 border-t border-[#F5F7FA] flex items-center justify-between">
 <div>
 <p className="text-[11px] text-[#AAA]">إجمالي الأسبوع</p>
 <p className="text-[20px] font-bold text-[#111]">{(weekRevenue.reduce((a,b)=>a+b,0)/1000).toFixed(1)}k <span className="text-[13px] font-light text-[#AAA]">ريال</span></p>
 </div>
 <div className="text-left">
 <p className="text-[11px] text-[#AAA]">أعلى يوم</p>
 <p className="text-[14px] font-bold text-[#0B4A6F]">الجمعة — ١١٬٢٠٠ ريال</p>
 </div>
 </div>
 </div>

 {/* Quick stats */}
 <div className="space-y-3">
 {[
 { label: 'متوسط الانتظار', value: '١٢ دقيقة', icon: Clock, color: '#F59E0B', bg: '#FFFBEB' },
 { label: 'الطاقة الاستيعابية', value: '٧٨٪', icon: Activity, color: '#8B5CF6', bg: '#F5F3FF' },
 { label: 'إلغاءات اليوم', value: '٢ مواعيد', icon: AlertCircle, color: '#EF4444', bg: '#FEF2F2' },
 { label: 'الموظفون النشطون', value: '٤ موظفين', icon: UserCheck, color: '#10B981', bg: '#ECFDF5' },
 ].map((s, i) => (
 <motion.div key={i} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 * i }}
 className="bg-white rounded-[18px] p-4 flex items-center gap-3.5 border border-[rgba(11,74,111,0.06)] shadow-[0_1px_10px_rgba(0,0,0,0.04)]">
 <div className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0" style={{ background: s.bg }}>
 <s.icon size={18} style={{ color: s.color }} />
 </div>
 <div>
 <p className="text-[11px] text-[#AAA] leading-none">{s.label}</p>
 <p className="text-[18px] font-bold text-[#111] leading-tight">{s.value}</p>
 </div>
 </motion.div>
 ))}
 </div>
 </div>

 {/* Recent queue */}
 <div className="bg-white rounded-[22px] border border-[rgba(11,74,111,0.06)] shadow-[0_2px_16px_rgba(0,0,0,0.05)] overflow-hidden">
 <div className="flex items-center justify-between px-6 py-4 border-b border-[#F5F7FA]">
 <h3 className="text-[16px] font-bold text-[#111]">أحدث المواعيد</h3>
 <button onClick={() => setActiveNav('queue')} className="text-[12px] text-[#00B4D8] font-semibold hover:text-[#0B4A6F] transition-colors">
 عرض الكل
 </button>
 </div>
 <div className="divide-y divide-[#F5F7FA]">
 {queue.slice(0,4).map((p, i) => (
 <div key={i} className="flex items-center gap-4 px-6 py-3.5 hover:bg-[#FAFBFC] transition-colors">
 <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[13px] font-bold shrink-0"
 style={{ background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)' }}>{p.name[0]}</div>
 <div className="flex-1 min-w-0">
 <p className="text-[13px] font-semibold text-[#111]">{p.name}</p>
 <p className="text-[11px] text-[#AAA]">{p.id} · {p.spec}</p>
 </div>
 <p className="text-[12px] text-[#666] hidden sm:block">{p.doc}</p>
 <p className="text-[12px] font-semibold text-[#333]">{p.time}</p>
 <span className="text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0" style={{ background: p.bg, color: p.color }}>{p.status}</span>
 </div>
 ))}
 </div>
 </div>
 </motion.div>
 )}

 {/* ── QUEUE VIEW ── */}
 {activeNav === 'queue' && (
 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
 <div className="mb-6 flex items-center justify-between">
 <div>
 <h1 className="text-[24px] font-bold text-[#111]">طابور اليوم</h1>
 <p className="text-[13px] text-[#AAA] font-light mt-0.5">السبت ١٩ يوليو · {queue.length} مواعيد مجدولة</p>
 </div>
 <div className="flex gap-2">
 {[{label:'الكل',color:'#0B4A6F'},{label:'داخل',color:'#10B981'},{label:'انتظار',color:'#F59E0B'},{label:'قادم',color:'#00B4D8'}].map(f => (
 <button key={f.label} className="text-[11px] font-semibold px-3.5 py-1.5 rounded-full border transition-colors"
 style={{ borderColor: `${f.color}30`, color: f.color, background: `${f.color}10` }}>
 {f.label}
 </button>
 ))}
 </div>
 </div>
 <div className="bg-white rounded-[22px] border border-[rgba(11,74,111,0.06)] shadow-[0_2px_16px_rgba(0,0,0,0.05)] overflow-hidden">
 <div className="grid grid-cols-6 gap-4 px-6 py-3 bg-[#FAFBFC] border-b border-[#F5F7FA]">
 {['المريض','الرقم','التخصص','الطبيب','الوقت','الحالة'].map(h => (
 <p key={h} className="text-[11px] font-bold text-[#AAA]">{h}</p>
 ))}
 </div>
 {queue.map((p, i) => (
 <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
 className="grid grid-cols-6 gap-4 px-6 py-4 items-center hover:bg-[#FAFBFC] transition-colors border-b border-[#F5F7FA] last:border-0">
 <div className="flex items-center gap-2.5 min-w-0">
 <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-bold shrink-0"
 style={{ background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)' }}>{p.name[0]}</div>
 <p className="text-[13px] font-semibold text-[#111] truncate">{p.name}</p>
 </div>
 <p className="text-[11px] text-[#AAA] font-mono">{p.id}</p>
 <p className="text-[12px] text-[#666]">{p.spec}</p>
 <p className="text-[12px] text-[#666] truncate">{p.doc}</p>
 <p className="text-[13px] font-bold text-[#333]">{p.time}</p>
 <span className="inline-flex text-[10px] font-bold px-2.5 py-1 rounded-full w-fit" style={{ background: p.bg, color: p.color }}>{p.status}</span>
 </motion.div>
 ))}
 </div>
 </motion.div>
 )}

 {/* ── STAFF VIEW ── */}
 {activeNav === 'staff' && (
 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
 <div className="mb-6">
 <h1 className="text-[24px] font-bold text-[#111]">الفريق الطبي</h1>
 <p className="text-[13px] text-[#AAA] font-light mt-0.5">إدارة الموظفين ومتابعة الأداء</p>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
 {staff.map((s, i) => (
 <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 * i }}
 className="bg-white rounded-[22px] p-5 border border-[rgba(11,74,111,0.06)] shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
 <div className="flex items-start justify-between mb-4">
 <div className="flex items-center gap-3">
 <div className="w-11 h-11 rounded-full flex items-center justify-center text-white text-[16px] font-bold"
 style={{ background: s.status === 'نشط' ? 'linear-gradient(135deg,#0B4A6F,#00B4D8)' : 'linear-gradient(135deg,#999,#BBB)' }}>{s.av}</div>
 <div>
 <p className="text-[14px] font-bold text-[#111]">{s.name}</p>
 <p className="text-[11px] text-[#AAA]">{s.role}</p>
 </div>
 </div>
 <div className="flex items-center gap-1.5">
 <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
 <span className="text-[11px] font-semibold" style={{ color: s.color }}>{s.status}</span>
 </div>
 </div>
 <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#F5F7FA]">
 <div className="text-center">
 <p className="text-[18px] font-bold text-[#111]">{s.patients}</p>
 <p className="text-[9px] text-[#AAA]">اليوم</p>
 </div>
 <div className="text-center">
 <p className="text-[18px] font-bold text-[#10B981]">{s.done}</p>
 <p className="text-[9px] text-[#AAA]">منجز</p>
 </div>
 <div className="text-center">
 <p className="text-[18px] font-bold text-[#F59E0B]">{s.rating}</p>
 <p className="text-[9px] text-[#AAA]">التقييم</p>
 </div>
 </div>
 {s.patients > 0 && (
 <div className="mt-3">
 <div className="flex justify-between text-[10px] text-[#AAA] mb-1">
 <span>المنجز</span>
 <span>{Math.round((s.done / s.patients) * 100)}٪</span>
 </div>
 <div className="h-1.5 rounded-full bg-[#F5F7FA] overflow-hidden">
 <motion.div className="h-full rounded-full"
 style={{ background: 'linear-gradient(90deg,#0B4A6F,#00B4D8)' }}
 initial={{ width: 0 }} animate={{ width: `${(s.done / s.patients) * 100}%` }}
 transition={{ duration: 0.8, delay: 0.1 * i }} />
 </div>
 </div>
 )}
 </motion.div>
 ))}
 </div>
 </motion.div>
 )}

 {/* ── REPORTS VIEW ── */}
 {activeNav === 'reports' && (
 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
 <div className="mb-6">
 <h1 className="text-[24px] font-bold text-[#111]">التقارير الشهرية</h1>
 <p className="text-[13px] text-[#AAA] font-light mt-0.5">أداء العيادة خلال الأشهر الستة الماضية</p>
 </div>
 <div className="bg-white rounded-[22px] p-6 border border-[rgba(11,74,111,0.06)] shadow-[0_2px_16px_rgba(0,0,0,0.05)] mb-4">
 <h3 className="text-[16px] font-bold text-[#111] mb-5">الإيرادات الشهرية</h3>
 <div className="space-y-3">
 {monthlyData.map((m, i) => {
 const pct = (m.rev / Math.max(...monthlyData.map(x => x.rev))) * 100;
 return (
 <div key={i} className="flex items-center gap-4">
 <p className="text-[12px] font-semibold text-[#666] w-14 shrink-0">{m.month}</p>
 <div className="flex-1 h-8 bg-[#F5F7FA] rounded-[8px] overflow-hidden">
 <motion.div className="h-full rounded-[8px] flex items-center px-3"
 style={{ background: 'linear-gradient(90deg,#0B4A6F,#00B4D8)' }}
 initial={{ width: 0 }} animate={{ width: `${pct}%` }}
 transition={{ duration: 0.7, delay: 0.07 * i }}>
 <span className="text-white text-[10px] font-bold whitespace-nowrap">
 {i === monthlyData.length - 1 ? `${(m.rev/1000).toFixed(0)}k` : ''}
 </span>
 </motion.div>
 </div>
 <p className="text-[13px] font-bold text-[#111] w-20 text-left shrink-0">{m.rev.toLocaleString()} ر</p>
 <p className="text-[11px] text-[#AAA] w-16 shrink-0 hidden sm:block">{m.patients} مريض</p>
 </div>
 );
 })}
 </div>
 </div>
 </motion.div>
 )}

 {/* ── SECURITY VIEW ── */}
 {activeNav === 'security' && (
 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
 <div className="mb-6">
 <h1 className="text-[24px] font-bold text-[#111]">مركز الأمان</h1>
 <p className="text-[13px] text-[#AAA] font-light mt-0.5">بيانات مرضاك محمية بأعلى معايير الأمان في العالم</p>
 </div>

 {/* Security score */}
 <div className="rounded-[24px] p-6 mb-5 relative overflow-hidden"
 style={{ background: 'linear-gradient(145deg,#06101E 0%,#0B3A5A 50%,#06101E 100%)' }}>
 <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%,rgba(16,185,129,0.15) 0%,transparent 60%)' }} />
 <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
 <div className="relative shrink-0">
 <svg width="120" height="120" viewBox="0 0 120 120">
 <defs>
 <linearGradient id="secGrad" x1="0%" y1="0%" x2="100%" y2="100%">
 <stop offset="0%" stopColor="#10B981" />
 <stop offset="100%" stopColor="#00B4D8" />
 </linearGradient>
 </defs>
 <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
 <motion.circle cx="60" cy="60" r="50" fill="none" stroke="url(#secGrad)" strokeWidth="8" strokeLinecap="round"
 strokeDasharray={314} strokeDashoffset={314}
 animate={{ strokeDashoffset: 314 * 0.01 }}
 transition={{ duration: 1.8, ease: [0.4,0,0.2,1] }}
 transform="rotate(-90 60 60)" />
 <text x="60" y="54" textAnchor="middle" fill="white" fontSize="26" fontWeight="800">٩٩</text>
 <text x="60" y="70" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="Tajawal,sans-serif">/ ١٠٠</text>
 </svg>
 </div>
 <div>
 <div className="flex items-center gap-2 mb-2">
 <ShieldCheck size={18} className="text-[#10B981]" />
 </div>
 <h2 className="text-white text-[22px] font-bold mb-2">منظومتك محمية بالكامل</h2>
 <p className="text-white/50 text-[13px] font-light max-w-md">
 جميع بيانات مرضاك مشفرة بتقنية AES-256 ومحمية وفق أعلى معايير الأمان الدولية لقطاع الرعاية الصحية.
 </p>
 <div className="flex flex-wrap gap-2 mt-3">
 {['HIPAA','ISO 27001','NDMO','SOC 2','PCI DSS'].map(b => (
 <span key={b} className="text-[10px] font-bold text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/20 px-2.5 py-1 rounded-full">{b}</span>
 ))}
 </div>
 </div>
 </div>
 </div>

 {/* Security pillars */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
 {[
 { icon: Key, title: 'تشفير AES-256', desc: 'نفس معيار التشفير العسكري المستخدم في حماية بيانات الدفاع الوطني', color: '#10B981', bg: '#ECFDF5' },
 { icon: Shield, title: 'معمارية Zero-Knowledge', desc: 'حتى نحن لا يمكننا الاطلاع على بيانات مرضاك — مفتاح التشفير ملكك وحدك', color: '#0B4A6F', bg: '#EBF5FF' },
 { icon: Lock, title: 'مصادقة ثنائية', desc: 'Face ID + رمز تحقق لكل دخول — لا أحد يصل لبياناتك بدون إذنك', color: '#8B5CF6', bg: '#F5F3FF' },
 { icon: Database, title: 'نسخ احتياطي مشفر', desc: 'نسخ احتياطية تلقائية كل ٦ ساعات مشفرة بالكامل في مراكز بيانات معتمدة', color: '#F59E0B', bg: '#FFFBEB' },
 { icon: Eye, title: 'مراقبة فورية ٢٤/٧', desc: 'نظام AI يرصد أي نشاط مشبوه ويبلغك فوراً قبل أي خطر', color: '#EF4444', bg: '#FEF2F2' },
 { icon: Cpu, title: 'معايير NDMO السعودية', desc: 'متوافق مع لوائح هيئة الحكومة الرقمية ونظام حماية البيانات الشخصية', color: '#00B4D8', bg: '#E0F9FF' },
 ].map((s, i) => (
 <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 * i }}
 className="bg-white rounded-[20px] p-5 border border-[rgba(11,74,111,0.06)] shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
 <div className="w-11 h-11 rounded-[14px] flex items-center justify-center mb-3" style={{ background: s.bg }}>
 <s.icon size={20} style={{ color: s.color }} />
 </div>
 <p className="text-[14px] font-bold text-[#111] mb-1.5">{s.title}</p>
 <p className="text-[12px] text-[#888] font-light leading-relaxed">{s.desc}</p>
 </motion.div>
 ))}
 </div>

 {/* Security log */}
 <div className="bg-white rounded-[22px] border border-[rgba(11,74,111,0.06)] shadow-[0_2px_16px_rgba(0,0,0,0.05)] overflow-hidden">
 <div className="px-6 py-4 border-b border-[#F5F7FA]">
 <h3 className="text-[16px] font-bold text-[#111]">سجل الأحداث الأمنية</h3>
 </div>
 {securityEvents.map((e, i) => (
 <div key={i} className="flex items-center gap-4 px-6 py-3.5 border-b border-[#F5F7FA] last:border-0">
 <div className={`w-2 h-2 rounded-full shrink-0 ${e.type === 'success' ? 'bg-[#10B981]' : 'bg-[#00B4D8]'}`} />
 <p className="text-[13px] text-[#444] flex-1">{e.event}</p>
 <p className="text-[11px] text-[#AAA]">{e.time}</p>
 <CheckCircle2 size={16} className={e.type === 'success' ? 'text-[#10B981]' : 'text-[#00B4D8]'} />
 </div>
 ))}
 </div>
 </motion.div>
 )}

 </main>
 </div>
 </div>
 );
}
