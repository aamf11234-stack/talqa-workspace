import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, Users, CalendarCheck, Clock, ChevronLeft,
  ShieldCheck, BarChart3, UserCheck, AlertCircle, CheckCircle2,
  Banknote, Activity, ArrowUpRight, Star
} from 'lucide-react';

/* ── animated counter ───────────────────────────────────────── */
function useCounter(target: number, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let v = 0;
    const step = Math.max(1, Math.ceil(target / (duration / 16)));
    const t = setInterval(() => { v = Math.min(v + step, target); setVal(v); if (v >= target) clearInterval(t); }, 16);
    return () => clearInterval(t);
  }, [target, duration]);
  return val;
}

/* ── data ───────────────────────────────────────────────────── */
const queue = [
  { name: 'محمد العمري',   time: '٩:٠٠',  doc: 'د. سارة',   status: 'داخل',    color: '#10B981', bg: '#ECFDF5' },
  { name: 'فاطمة الزهراني', time: '٩:٣٠',  doc: 'د. خالد',   status: 'انتظار',  color: '#F59E0B', bg: '#FFFBEB' },
  { name: 'علي الشهري',    time: '١٠:٠٠', doc: 'د. سارة',   status: 'قادم',    color: '#00B4D8', bg: '#E0F9FF' },
  { name: 'نورة السالم',   time: '١٠:٣٠', doc: 'د. أحمد',   status: 'قادم',    color: '#00B4D8', bg: '#E0F9FF' },
  { name: 'عبدالله القحطاني', time: '١١:٠٠', doc: 'د. خالد', status: 'تأكيد',   color: '#8B5CF6', bg: '#F5F3FF' },
];

const staff = [
  { name: 'د. سارة المطيري',  role: 'طب عام',       patients: 8,  status: 'نشط', color: '#10B981', av: 'س' },
  { name: 'د. خالد الدوسري',  role: 'أسنان',        patients: 5,  status: 'نشط', color: '#10B981', av: 'خ' },
  { name: 'د. أحمد الغامدي',  role: 'جلدية',        patients: 6,  status: 'نشط', color: '#10B981', av: 'أ' },
  { name: 'ريم الشمري',       role: 'استقبال',      patients: 22, status: 'نشط', color: '#10B981', av: 'ر' },
  { name: 'سلطان العنزي',     role: 'محاسبة',       patients: 0,  status: 'مغادر', color: '#EF4444', av: 'ص' },
];

/* ── Revenue mini chart ─────────────────────────────────────── */
const weekRevenue = [6200, 8400, 5900, 9100, 7600, 11200, 9800];
const weekDays    = ['أح','إث','ثل','أر','خم','جم','سب'];
const maxRev = Math.max(...weekRevenue);

function RevenueBar({ value, day, isToday }: { value: number; day: string; isToday: boolean }) {
  const pct = (value / maxRev) * 100;
  return (
    <div className="flex flex-col items-center gap-1" style={{ flex: 1 }}>
      <div className="w-full flex items-end justify-center" style={{ height: 44 }}>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${pct}%` }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="w-full rounded-t-[4px]"
          style={{
            background: isToday
              ? 'linear-gradient(180deg,#00B4D8,#0B4A6F)'
              : 'rgba(11,74,111,0.12)',
            minHeight: 4,
          }}
        />
      </div>
      <p className="text-[8px] font-semibold" style={{ color: isToday ? '#0B4A6F' : '#BBB' }}>{day}</p>
    </div>
  );
}

/* ── component ──────────────────────────────────────────────── */
export function ScreenOwner() {
  const [view, setView] = useState<'owner' | 'staff'>('owner');
  const revenue   = useCounter(9800);
  const patients  = useCounter(38);
  const appts     = useCounter(22);

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-none" style={{ background: '#F2F6FB', fontFamily: 'Tajawal,sans-serif' }}>

      {/* ── Header ────────────────────────────────────────── */}
      <div className="relative overflow-hidden shrink-0"
        style={{ background: 'linear-gradient(160deg,#06101E 0%,#0B3A5A 55%,#06101E 100%)', paddingBottom: 20 }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 65% 35%, rgba(0,180,216,0.22) 0%, transparent 65%)' }} />

        <div className="relative z-10 flex items-center justify-between px-5 pt-4 pb-3">
          <div>
            <p className="text-white/40 text-[10px] mb-0.5">لوحة التحكم</p>
            <p className="text-white text-[17px] font-bold">عيادة الشفاء</p>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-[#22C55E]" />
            <span className="text-[#22C55E] text-[10px] font-bold">آمن ومشفر</span>
          </div>
        </div>

        {/* Toggle */}
        <div className="relative z-10 mx-5 mt-1">
          <div className="flex rounded-[14px] p-1" style={{ background: 'rgba(255,255,255,0.08)' }}>
            {(['owner','staff'] as const).map((v) => (
              <button key={v} onClick={() => setView(v)}
                className="flex-1 py-2 rounded-[11px] text-[12px] font-bold transition-all duration-200 relative"
                style={{ color: view === v ? '#0B4A6F' : 'rgba(255,255,255,0.45)' }}>
                {view === v && (
                  <motion.div layoutId="owner-pill" className="absolute inset-0 rounded-[11px] bg-white"
                    transition={{ type: 'spring', bounce: 0.18, duration: 0.4 }} />
                )}
                <span className="relative z-10">{v === 'owner' ? '👔 المالك' : '🩺 الموظفون'}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === 'owner' ? (
          <motion.div key="owner" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>

            {/* ── KPI Row ─────────────────────────────────── */}
            <div className="px-4 mt-4 mb-3">
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { label: 'إيراد اليوم', value: revenue.toLocaleString('ar'), unit: 'ريال', icon: Banknote,   color: '#10B981', bg: '#ECFDF5', trend: '+١٢٪' },
                  { label: 'المرضى',      value: patients,                      unit: 'مريض',  icon: Users,      color: '#0B4A6F', bg: '#EBF5FF', trend: '+٥' },
                  { label: 'المواعيد',    value: appts,                         unit: 'موعد',  icon: CalendarCheck, color: '#8B5CF6', bg: '#F5F3FF', trend: '٤ متبقية' },
                ].map((k, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * i, type: 'spring', damping: 22 }}
                    className="rounded-[20px] p-3.5" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2" style={{ background: k.bg }}>
                      <k.icon size={15} style={{ color: k.color }} />
                    </div>
                    <p className="text-[9px] text-[#BBB] leading-none mb-0.5">{k.label}</p>
                    <p className="text-[17px] font-bold text-[#111] leading-none">{k.value}</p>
                    <p className="text-[8px] text-[#CCC]">{k.unit}</p>
                    <div className="flex items-center gap-0.5 mt-1.5">
                      <ArrowUpRight size={10} style={{ color: k.color }} />
                      <span className="text-[9px] font-semibold" style={{ color: k.color }}>{k.trend}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Revenue chart ────────────────────────────── */}
            <div className="px-4 mb-3">
              <div className="rounded-[22px] p-4" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[13px] font-bold text-[#111]">الإيرادات — هذا الأسبوع</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp size={12} className="text-[#10B981]" />
                    <span className="text-[10px] font-semibold text-[#10B981]">+١٨٪</span>
                  </div>
                </div>
                <div className="flex items-end gap-1.5" style={{ height: 60 }}>
                  {weekRevenue.map((v, i) => (
                    <RevenueBar key={i} value={v} day={weekDays[i]} isToday={i === 6} />
                  ))}
                </div>
                <p className="text-[9px] text-[#BBB] mt-2 text-center">السبت ← الأحد · هذا الأسبوع</p>
              </div>
            </div>

            {/* ── Today's queue ────────────────────────────── */}
            <div className="px-4 mb-4">
              <div className="flex items-center justify-between mb-2.5">
                <p className="text-[13px] font-bold text-[#111]">طابور اليوم</p>
                <span className="text-[10px] text-[#00B4D8] font-semibold">{queue.length} مواعيد</span>
              </div>
              <div className="rounded-[22px] overflow-hidden" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                {queue.map((p, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3"
                    style={{ borderBottom: i < queue.length - 1 ? '1px solid #F5F7FA' : 'none' }}>
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-[11px] font-bold shrink-0"
                      style={{ background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)' }}>
                      {p.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-[#111] truncate">{p.name}</p>
                      <p className="text-[10px] text-[#BBB]">{p.time} · {p.doc}</p>
                    </div>
                    <span className="text-[9px] font-bold px-2.5 py-1 rounded-full shrink-0"
                      style={{ background: p.bg, color: p.color }}>
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Quick stats row ──────────────────────────── */}
            <div className="px-4 mb-4">
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { label: 'متوسط الانتظار',  value: '١٢ دقيقة', icon: Clock,        color: '#F59E0B', bg: '#FFFBEB' },
                  { label: 'رضا المرضى',      value: '٤.٨ / ٥',  icon: Star,         color: '#EF4444', bg: '#FEF2F2' },
                  { label: 'الطاقة الاستيعابية', value: '٧٨٪',   icon: BarChart3,    color: '#8B5CF6', bg: '#F5F3FF' },
                  { label: 'إلغاءات اليوم',   value: '٢ مواعيد', icon: AlertCircle,  color: '#EF4444', bg: '#FEF2F2' },
                ].map((s, i) => (
                  <div key={i} className="rounded-[18px] p-3.5 flex items-center gap-3"
                    style={{ background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: s.bg }}>
                      <s.icon size={16} style={{ color: s.color }} />
                    </div>
                    <div>
                      <p className="text-[9px] text-[#BBB] leading-none">{s.label}</p>
                      <p className="text-[14px] font-bold text-[#111]">{s.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        ) : (
          /* ── STAFF VIEW ───────────────────────────────────── */
          <motion.div key="staff" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>

            {/* Staff on-duty row */}
            <div className="px-4 mt-4 mb-3">
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { label: 'نشط الآن',   value: '٤',  icon: UserCheck,  color: '#10B981', bg: '#ECFDF5' },
                  { label: 'الأطباء',    value: '٣',  icon: Activity,   color: '#0B4A6F', bg: '#EBF5FF' },
                  { label: 'المواعيد المتبقية', value: '١٤', icon: CalendarCheck, color: '#8B5CF6', bg: '#F5F3FF' },
                ].map((k, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * i }}
                    className="rounded-[20px] p-3.5" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2" style={{ background: k.bg }}>
                      <k.icon size={15} style={{ color: k.color }} />
                    </div>
                    <p className="text-[9px] text-[#BBB] leading-none mb-0.5">{k.label}</p>
                    <p className="text-[20px] font-bold text-[#111] leading-none">{k.value}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Staff list */}
            <div className="px-4 mb-4">
              <div className="flex items-center justify-between mb-2.5">
                <p className="text-[13px] font-bold text-[#111]">الفريق الطبي اليوم</p>
                <span className="text-[10px] text-[#00B4D8] font-semibold">٥ موظفين</span>
              </div>
              <div className="rounded-[22px] overflow-hidden" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                {staff.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3"
                    style={{ borderBottom: i < staff.length - 1 ? '1px solid #F5F7FA' : 'none' }}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[13px] font-bold shrink-0"
                      style={{ background: s.status === 'نشط' ? 'linear-gradient(135deg,#0B4A6F,#00B4D8)' : 'linear-gradient(135deg,#999,#BBB)' }}>
                      {s.av}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-[#111] truncate">{s.name}</p>
                      <p className="text-[10px] text-[#BBB]">{s.role}{s.patients > 0 ? ` · ${s.patients} مريض` : ''}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                      <span className="text-[10px] font-semibold" style={{ color: s.color }}>{s.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tasks */}
            <div className="px-4 mb-4">
              <p className="text-[13px] font-bold text-[#111] mb-2.5">مهام الاستقبال</p>
              <div className="space-y-2.5">
                {[
                  { task: 'تأكيد مواعيد الغد بواتساب',   done: true  },
                  { task: 'استلام تقرير التحاليل — د.أحمد', done: true  },
                  { task: 'تحديث بيانات ٣ مرضى جدد',     done: false },
                  { task: 'إرسال تذكيرات الجلسة القادمة', done: false },
                  { task: 'مراجعة فواتير التأمين المعلقة', done: false },
                ].map((t, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}
                    className="flex items-center gap-3 rounded-[16px] px-4 py-3"
                    style={{ background: '#fff', boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
                    {t.done
                      ? <CheckCircle2 size={18} className="text-[#10B981] shrink-0" />
                      : <div className="w-[18px] h-[18px] rounded-full border-2 border-[#DDD] shrink-0" />
                    }
                    <p className="text-[12px] font-medium flex-1" style={{ color: t.done ? '#BBB' : '#333', textDecoration: t.done ? 'line-through' : 'none' }}>
                      {t.task}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Security badge ────────────────────────────────── */}
      <div className="px-4 pb-24">
        <div className="rounded-[18px] px-4 py-3 flex items-center gap-3"
          style={{ background: 'linear-gradient(135deg,#022c22,#065f46)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <ShieldCheck size={20} className="text-[#10B981] shrink-0" />
          <div className="flex-1">
            <p className="text-[#10B981] font-bold text-[12px] leading-none mb-0.5">بيانات محمية بتشفير AES-256</p>
            <p className="text-[#10B981]/50 text-[9px]">HIPAA · ISO 27001 · معايير NDMO السعودية</p>
          </div>
          <div className="shrink-0 text-center">
            <p className="text-[#10B981] text-[18px] font-bold leading-none">١٠٠٪</p>
            <p className="text-[#10B981]/50 text-[8px]">آمن</p>
          </div>
        </div>
      </div>

    </div>
  );
}
