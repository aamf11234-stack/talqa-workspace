import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const logoImg = `${import.meta.env.BASE_URL}hyz-logo.jpeg`;

/* ── Animated counter ─────────────────────────────────────────────── */
function useCounter(target: number, duration = 1400, delay = 0) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const start = Date.now();
      const tick = () => {
        const p = Math.min((Date.now() - start) / duration, 1);
        const e = 1 - Math.pow(1 - p, 4);
        setV(Math.round(e * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [target, duration, delay]);
  return v;
}

/* ── Sparkline ────────────────────────────────────────────────────── */
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
  const W = 72, H = 24;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * W},${H - ((v - min) / range) * (H - 4) - 2}`);
  const last = pts[pts.length - 1].split(',');
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="overflow-visible shrink-0">
      <defs>
        <linearGradient id={`sp${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${H} ${pts.join(' ')} ${W},${H}`} fill={`url(#sp${color.replace('#','')})`} />
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={last[0]} cy={last[1]} r="2.5" fill={color} />
    </svg>
  );
}

/* ── Bar chart (gradient bars) ────────────────────────────────────── */
function BarChart({ data, labels }: { data: number[]; labels: string[] }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-[5px] h-[88px] w-full">
      {data.map((v, i) => {
        const isLast = i === data.length - 1;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-[5px]">
            <motion.div
              className="w-full rounded-[4px]"
              style={{
                background: isLast
                  ? 'linear-gradient(180deg,#C9956A,#7B1618)'
                  : 'rgba(123,22,24,0.22)',
                boxShadow: isLast ? '0 4px 12px rgba(123,22,24,0.35)' : 'none',
              }}
              initial={{ height: 0 }}
              animate={{ height: `${(v / max) * 72}px` }}
              transition={{ delay: 0.05 * i, duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            />
            <span className={`text-[7px] font-inter ${isLast ? 'text-[#7B1618] font-bold' : 'text-[#C8BDB4]'}`}>{labels[i]}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ── Donut ────────────────────────────────────────────────────────── */
function Donut({ segs }: { segs: { pct: number; color: string; label: string }[] }) {
  const r = 30, cx = 38, cy = 38, circ = 2 * Math.PI * r;
  let off = 0;
  return (
    <div className="flex items-center gap-4">
      <svg width="76" height="76" viewBox="0 0 76 76" className="shrink-0">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F0EBE3" strokeWidth="9" />
        {segs.map((s, i) => {
          const dash = (s.pct / 100) * circ;
          const rot = (off / 100) * 360 - 90;
          off += s.pct;
          return (
            <motion.circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circ - dash}`}
              style={{ rotate: `${rot}deg`, transformOrigin: `${cx}px ${cy}px` }}
              initial={{ strokeDasharray: `0 ${circ}` }}
              animate={{ strokeDasharray: `${dash} ${circ - dash}` }}
              transition={{ duration: 0.8, delay: 0.1 * i }} />
          );
        })}
        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize="9" fontWeight="800" fill="#111">١٠٠٪</text>
      </svg>
      <div className="space-y-1.5 flex-1">
        {segs.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
            <span className="text-[9px] text-[#888] flex-1 leading-none">{s.label}</span>
            <span className="text-[10px] font-bold text-[#111] font-inter">{s.pct}٪</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── KPI Card ─────────────────────────────────────────────────────── */
function KpiCard({ icon, label, target, suffix = '', change, up, color, spark, delay = 0 }:
  { icon: string; label: string; target: number; suffix?: string; change: string; up: boolean; color: string; spark: number[]; delay?: number }) {
  const v = useCounter(target, 1200, delay * 1000 + 400);
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.32 }}
      className="bg-white rounded-[14px] p-3.5 flex flex-col gap-2.5 border border-[rgba(0,0,0,0.042)]"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.055)' }}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-[9px] text-[#B0A9A0] font-semibold tracking-wide mb-1.5 uppercase">{label}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-[22px] font-extrabold text-[#111] font-inter leading-none tabular-nums">{v.toLocaleString()}</span>
            {suffix && <span className="text-[10px] text-[#C8BDB4] font-medium">{suffix}</span>}
          </div>
        </div>
        <div className="w-8 h-8 rounded-[10px] flex items-center justify-center text-[15px] shrink-0"
          style={{ background: `${color}14` }}>{icon}</div>
      </div>
      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full ${up ? 'bg-[#30D158]/10 text-[#30D158]' : 'bg-[#FF453A]/10 text-[#FF453A]'}`}>
          <span>{up ? '↑' : '↓'}</span><span>{change}</span>
        </div>
        <Sparkline data={spark} color={color} />
      </div>
    </motion.div>
  );
}

/* ── Sidebar nav ──────────────────────────────────────────────────── */
const sideNav = [
  { icon: '◈', label: 'لوحة البيانات', active: true  },
  { icon: '⊞', label: 'الأعضاء',       active: false },
  { icon: '◉', label: 'المنيو',         active: false },
  { icon: '◎', label: 'العروض',        active: false },
  { icon: '▦', label: 'الحجوزات',      active: false },
  { icon: '◌', label: 'الإعدادات',     active: false },
];

/* ── Static data ──────────────────────────────────────────────────── */
const weekLabels = ['أح', 'إث', 'ث', 'أر', 'خ', 'ج', 'س'];
const revData    = [820, 1040, 760, 1180, 940, 1380, 1620];

const members = [
  { name: 'عبد الإله المالكي', level: 'كلاسيك', pts: 480,  time: 'الآن'         , lc: '#7B1618' },
  { name: 'سارة الغامدي',      level: 'فضي',    pts: 920,  time: '٩:٤٥ص'        , lc: '#8E9BAF' },
  { name: 'محمد العمري',       level: 'ذهبي',   pts: 1840, time: 'أمس، ٤:٢٠م'  , lc: '#C9956A' },
  { name: 'نورة الزهراني',     level: 'كلاسيك', pts: 260,  time: 'أمس، ١:٠٠م'  , lc: '#7B1618' },
  { name: 'خالد الدوسري',      level: 'فضي',    pts: 780,  time: 'أمس، ١٠:١٥ص' , lc: '#8E9BAF' },
];

const topItems = [
  { name: 'لاتيه إثيوبي', n: 284, pct: 100 },
  { name: 'قهوة حيز',     n: 197, pct: 69  },
  { name: 'كرواسون',      n: 163, pct: 57  },
  { name: 'مقطرة يمني',   n: 118, pct: 42  },
  { name: 'ماتشا',        n:  96, pct: 34  },
];

/* ── Main dashboard ───────────────────────────────────────────────── */
export function OwnerDashboard() {
  const [active, setActive] = useState('لوحة البيانات');
  const live = useCounter(23, 900, 700);

  return (
    <div className="flex h-full overflow-hidden font-sans" dir="rtl" style={{ background: '#F6F4F1' }}>

      {/* ── Sidebar ── */}
      <aside className="w-[136px] shrink-0 flex flex-col py-4 px-2.5 border-l border-white/5"
        style={{ background: 'linear-gradient(175deg,#0D0205 0%,#1E0507 100%)' }}>
        {/* Brand */}
        <div className="flex items-center gap-2 px-2 mb-6">
          <img src={logoImg} className="w-6 h-6 rounded-[7px] object-cover ring-1 ring-white/10" alt="" />
          <div>
            <p className="text-[#C9956A] text-[12px] font-extrabold leading-none tracking-tight">حيز</p>
            <p className="text-white/20 text-[7px] font-inter leading-none mt-0.5">ADMIN</p>
          </div>
        </div>

        <nav className="flex-1 space-y-0.5">
          {sideNav.map(item => (
            <button key={item.label} onClick={() => setActive(item.label)}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[9px] text-right transition-all duration-200"
              style={active === item.label
                ? { background: 'rgba(201,149,106,0.14)', borderLeft: '2px solid #C9956A' }
                : { background: 'transparent' }}>
              <span className={`text-[11px] transition-colors ${active === item.label ? 'text-[#C9956A]' : 'text-white/25'}`}>{item.icon}</span>
              <span className={`text-[9px] font-semibold transition-colors truncate ${active === item.label ? 'text-white' : 'text-white/35'}`}>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Live chip */}
        <div className="mx-1 mt-3 rounded-[11px] p-2.5 border border-[#30D158]/20" style={{ background: 'rgba(48,209,88,0.06)' }}>
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-1.5 h-1.5 bg-[#30D158] rounded-full animate-pulse" />
            <span className="text-[#30D158] text-[7px] font-bold tracking-wider">LIVE</span>
          </div>
          <p className="text-white text-[18px] font-extrabold font-inter leading-none">{live}</p>
          <p className="text-white/30 text-[7px] mt-0.5">متصل الآن</p>
        </div>
      </aside>

      {/* ── Content ── */}
      <div className="flex-1 min-w-0 overflow-y-auto scrollbar-none">

        {/* Topbar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-2.5 border-b border-black/[0.05]"
          style={{ background: 'rgba(246,244,241,0.92)', backdropFilter: 'blur(12px)' }}>
          <div>
            <p className="text-[11px] font-bold text-[#111]">لوحة تحكم المالك</p>
            <p className="text-[8px] text-[#B0A9A0]">الجمعة، ١٧ يوليو ٢٠٢٦</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-7 h-7 rounded-full bg-white border border-black/[0.06] flex items-center justify-center shadow-sm">
                <span className="text-[11px]">🔔</span>
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#FF3B30] rounded-full border border-[#F6F4F1]" />
            </div>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-extrabold shadow-sm"
              style={{ background: 'linear-gradient(135deg,#7B1618,#4A0D0F)' }}>م</div>
          </div>
        </div>

        <div className="p-4 space-y-4">

          {/* KPI row */}
          <div className="grid grid-cols-4 gap-2.5">
            <KpiCard icon="👥" label="إجمالي الأعضاء"  target={1538}  change="٣١ جديد" up color="#7B1618" spark={[820,960,880,1100,1280,1420,1538]} delay={0}    />
            <KpiCard icon="💰" label="إيراد اليوم"     target={1620}  suffix="ر" change="↑٢٣٪"    up color="#30D158" spark={revData}                          delay={0.06} />
            <KpiCard icon="☕" label="أكواب اليوم"     target={89}    change="↑١٢"      up color="#C9956A" spark={[52,61,47,74,63,81,89]}               delay={0.12} />
            <KpiCard icon="⭐" label="نقاط مُصرفة"    target={4260}  suffix="ن" change="↑٨٪"     up color="#6C3483" spark={[2100,2800,2300,3100,3400,3900,4260]} delay={0.18} />
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-3 gap-2.5">
            {/* Revenue */}
            <div className="col-span-2 bg-white rounded-[14px] p-4 border border-black/[0.04]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.055)' }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[10px] font-bold text-[#111]">الإيراد الأسبوعي</p>
                  <p className="text-[8px] text-[#B0A9A0] mt-0.5">ريال سعودي · آخر ٧ أيام</p>
                </div>
                <div className="flex items-center gap-1.5 bg-[#30D158]/10 px-2.5 py-1 rounded-full">
                  <span className="text-[#30D158] text-[9px] font-bold">↑ ٢١٪</span>
                </div>
              </div>
              <BarChart data={revData} labels={weekLabels} />
            </div>
            {/* Levels donut */}
            <div className="bg-white rounded-[14px] p-4 border border-black/[0.04]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.055)' }}>
              <p className="text-[10px] font-bold text-[#111] mb-0.5">توزيع المستويات</p>
              <p className="text-[8px] text-[#B0A9A0] mb-3.5">من ١,٥٣٨ عضو</p>
              <Donut segs={[
                { pct: 58, color: '#7B1618', label: 'كلاسيك' },
                { pct: 30, color: '#8E9BAF', label: 'فضي'    },
                { pct: 12, color: '#C9956A', label: 'ذهبي'   },
              ]} />
            </div>
          </div>

          {/* Members + Top items */}
          <div className="grid grid-cols-5 gap-2.5">
            {/* Members */}
            <div className="col-span-3 bg-white rounded-[14px] p-4 border border-black/[0.04]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.055)' }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold text-[#111]">آخر الأعضاء</p>
                <button className="text-[8px] text-[#7B1618] font-bold">عرض الكل ←</button>
              </div>
              <div className="space-y-2.5">
                {members.map((m, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}
                    className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                      style={{ background: `${m.lc}22`, color: m.lc }}>
                      {m.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] font-semibold text-[#111] truncate">{m.name}</p>
                      <p className="text-[7px] text-[#C8BDB4]">{m.time}</p>
                    </div>
                    <span className="text-[7px] font-bold px-2 py-0.5 rounded-full text-white shrink-0" style={{ background: m.lc }}>{m.level}</span>
                    <span className="text-[9px] font-extrabold text-[#111] font-inter shrink-0">{m.pts.toLocaleString()}<span className="text-[7px] text-[#C8BDB4] font-normal">ن</span></span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Top items */}
            <div className="col-span-2 bg-white rounded-[14px] p-4 border border-black/[0.04]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.055)' }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold text-[#111]">الأكثر طلباً</p>
                <span className="text-[7px] text-[#B0A9A0]">هذا الأسبوع</span>
              </div>
              <div className="space-y-2.5">
                {topItems.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 * i }}
                    className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-medium text-[#111]">{item.name}</span>
                      <span className="text-[8px] font-bold text-[#111] font-inter">{item.n}</span>
                    </div>
                    <div className="h-[5px] rounded-full overflow-hidden" style={{ background: '#F0EBE3' }}>
                      <motion.div className="h-full rounded-full"
                        style={{ background: i === 0 ? 'linear-gradient(90deg,#7B1618,#C9956A)' : i === 1 ? '#C9956A' : '#C8BDB4' }}
                        initial={{ width: 0 }} animate={{ width: `${item.pct}%` }}
                        transition={{ delay: 0.15 + 0.05 * i, duration: 0.65 }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick actions + Summary */}
          <div className="grid grid-cols-3 gap-2.5">
            {/* Challenges */}
            <div className="bg-white rounded-[14px] p-4 border border-black/[0.04]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.055)' }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold text-[#111]">التحديات</p>
                <button className="text-[7px] text-white font-bold px-2 py-0.5 rounded-full"
                  style={{ background: 'linear-gradient(135deg,#7B1618,#4A0D0F)' }}>+ جديد</button>
              </div>
              {[
                { t: 'تحدي ٥ أكواب',    p: 67, c: '#7B1618', e: '٣ أيام' },
                { t: 'الزيارة الصباحية', p: 43, c: '#C9956A', e: '٦ أيام' },
                { t: 'جرّب الفلتر',     p: 28, c: '#2D7D46', e: '٤ أيام' },
              ].map((ch, i) => (
                <div key={i} className="mb-2.5 last:mb-0 rounded-[9px] px-2.5 py-2 border"
                  style={{ borderColor: `${ch.c}20`, background: `${ch.c}07` }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[8px] font-bold" style={{ color: ch.c }}>{ch.t}</span>
                    <span className="text-[7px] text-[#C8BDB4]">{ch.e} · {ch.p} عضو</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: `${ch.c}18` }}>
                    <motion.div className="h-full rounded-full" style={{ background: ch.c }}
                      initial={{ width: 0 }} animate={{ width: `${ch.p}%` }} transition={{ delay: 0.4 + 0.1 * i, duration: 0.6 }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="bg-white rounded-[14px] p-4 border border-black/[0.04]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.055)' }}>
              <p className="text-[10px] font-bold text-[#111] mb-3">إجراءات سريعة</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { ic: '📣', l: 'إشعار جماعي',  c: '#7B1618' },
                  { ic: '🎁', l: 'عرض جديد',      c: '#C9956A' },
                  { ic: '👥', l: 'إضافة عضو',     c: '#2D7D46' },
                  { ic: '☕', l: 'تحديث المنيو',  c: '#1A5276' },
                  { ic: '📅', l: 'حجوزات اليوم', c: '#6C3483' },
                  { ic: '📊', l: 'تصدير تقرير',  c: '#B5651D' },
                ].map((a, i) => (
                  <motion.button key={i} whileTap={{ scale: 0.91 }}
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.04 * i }}
                    className="flex flex-col items-center gap-1.5 py-3 rounded-[10px] border transition-all active:brightness-95"
                    style={{ borderColor: `${a.c}22`, background: `${a.c}08` }}>
                    <span className="text-[15px]">{a.ic}</span>
                    <span className="text-[7px] font-bold text-center leading-tight" style={{ color: a.c }}>{a.l}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Day summary */}
            <div className="bg-white rounded-[14px] p-4 flex flex-col border border-black/[0.04]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.055)' }}>
              <p className="text-[10px] font-bold text-[#111] mb-3">ملخص اليوم</p>
              <div className="space-y-2 flex-1">
                {[
                  { l: 'أعضاء جدد',    v: '٣١',    ic: '🆕', c: '#7B1618' },
                  { l: 'حجوزات مؤكدة', v: '١٢',    ic: '📅', c: '#2D7D46' },
                  { l: 'تقييمات',      v: '٢٨',    ic: '⭐', c: '#D4AC0D' },
                  { l: 'عروض فعّالة',  v: '٤',     ic: '🎁', c: '#C9956A' },
                  { l: 'نقاط مكتسبة', v: '٤,٢٦٠', ic: '💎', c: '#6C3483' },
                ].map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}
                    className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-[6px] flex items-center justify-center text-[10px] shrink-0" style={{ background: `${s.c}12` }}>{s.ic}</div>
                    <span className="text-[8px] text-[#888] flex-1">{s.l}</span>
                    <span className="text-[9px] font-extrabold text-[#111] font-inter">{s.v}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-3 rounded-[11px] p-3 text-center"
                style={{ background: 'linear-gradient(135deg,#0D0205,#3D0809)' }}>
                <p className="text-white/40 text-[7px] mb-0.5">إيراد اليوم</p>
                <p className="text-[#C9956A] text-[20px] font-extrabold font-inter leading-none">١,٦٢٠</p>
                <p className="text-white/25 text-[7px]">ريال سعودي</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ── Mobile summary (for iPhone mockup) ──────────────────────────── */
export function MobileOwnerSummary() {
  const members = useCounter(1538, 1100, 500);
  const revenue = useCounter(1620, 1100, 600);
  const cups    = useCounter(89,   1100, 700);

  return (
    <div className="flex flex-col h-full overflow-hidden font-sans" dir="rtl" style={{ background: '#F6F4F1' }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center justify-between"
        style={{ background: 'linear-gradient(180deg,#0D0205,#1E0507)' }}>
        <div className="flex items-center gap-2">
          <img src={logoImg} className="w-6 h-6 rounded-[7px] object-cover" alt="" />
          <div>
            <p className="text-[#C9956A] text-[11px] font-extrabold leading-none">حيز</p>
            <p className="text-white/30 text-[7px] font-inter">Admin Panel</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-[#30D158] rounded-full animate-pulse" />
          <span className="text-[#30D158] text-[8px] font-bold">٢٣ Live</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none px-3 py-3 space-y-3">
        {/* KPI 2x2 */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { ic: '👥', l: 'الأعضاء', v: members, c: '#7B1618', s: '' },
            { ic: '💰', l: 'الإيراد',  v: revenue, c: '#30D158', s: 'ر' },
            { ic: '☕', l: 'أكواب',   v: cups,    c: '#C9956A', s: '' },
            { ic: '⭐', l: 'نقاط',   v: 4260,    c: '#6C3483', s: 'ن' },
          ].map((k, i) => (
            <div key={i} className="bg-white rounded-[12px] p-3 border border-black/[0.04]"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[12px]">{k.ic}</span>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: k.c }} />
              </div>
              <p className="text-[16px] font-extrabold text-[#111] font-inter leading-none">
                {k.v.toLocaleString()}<span className="text-[9px] text-[#C8BDB4] font-normal ml-0.5">{k.s}</span>
              </p>
              <p className="text-[8px] text-[#B0A9A0] mt-0.5">{k.l}</p>
            </div>
          ))}
        </div>

        {/* Mini bar chart */}
        <div className="bg-white rounded-[12px] p-3 border border-black/[0.04]" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[9px] font-bold text-[#111]">الإيراد الأسبوعي</p>
            <span className="text-[8px] text-[#30D158] font-bold bg-[#30D158]/10 px-1.5 py-0.5 rounded-full">↑٢١٪</span>
          </div>
          <div className="flex items-end gap-1 h-14">
            {[820,1040,760,1180,940,1380,1620].map((v,i) => (
              <div key={i} className="flex-1 rounded-t-[3px]"
                style={{
                  background: i === 6 ? 'linear-gradient(180deg,#C9956A,#7B1618)' : 'rgba(123,22,24,0.18)',
                  height: `${(v/1620)*48}px`,
                }} />
            ))}
          </div>
        </div>

        {/* Recent members */}
        <div className="bg-white rounded-[12px] p-3 border border-black/[0.04]" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <p className="text-[9px] font-bold text-[#111] mb-2">آخر الأعضاء</p>
          {[
            { n: 'عبد الإله المالكي', l: 'كلاسيك', p: 480,  c: '#7B1618' },
            { n: 'سارة الغامدي',      l: 'فضي',    p: 920,  c: '#8E9BAF' },
            { n: 'محمد العمري',       l: 'ذهبي',   p: 1840, c: '#C9956A' },
          ].map((m,i) => (
            <div key={i} className="flex items-center gap-2 py-1.5 border-b last:border-0 border-black/[0.04]">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0"
                style={{ background: `${m.c}18`, color: m.c }}>{m.n[0]}</div>
              <span className="text-[9px] font-medium text-[#111] flex-1 truncate">{m.n}</span>
              <span className="text-[7px] text-white font-bold px-1.5 py-0.5 rounded-full shrink-0" style={{ background: m.c }}>{m.l}</span>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { ic: '📣', l: 'إشعار', c: '#7B1618' },
            { ic: '🎁', l: 'عرض',   c: '#C9956A' },
            { ic: '📊', l: 'تقرير', c: '#2D7D46' },
          ].map((a,i) => (
            <button key={i} className="flex flex-col items-center gap-1 py-2.5 rounded-[10px] border"
              style={{ borderColor: `${a.c}25`, background: `${a.c}08` }}>
              <span className="text-[14px]">{a.ic}</span>
              <span className="text-[7px] font-bold" style={{ color: a.c }}>{a.l}</span>
            </button>
          ))}
        </div>

        {/* Revenue total */}
        <div className="rounded-[14px] p-3.5 text-center"
          style={{ background: 'linear-gradient(135deg,#0D0205,#3D0809)' }}>
          <p className="text-white/40 text-[8px] mb-1">إيراد اليوم</p>
          <p className="text-[#C9956A] text-[28px] font-extrabold font-inter leading-none">١,٦٢٠</p>
          <p className="text-white/30 text-[9px] mt-0.5">ريال سعودي</p>
        </div>
      </div>
    </div>
  );
}
