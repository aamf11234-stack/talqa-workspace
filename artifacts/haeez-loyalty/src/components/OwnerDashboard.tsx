import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const logoImg = `${import.meta.env.BASE_URL}browndose-logo.svg`;

/* ── Animated counter ─────────────────────────────────────────── */
function useCounter(target: number, duration = 1200, delay = 0) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const start = Date.now();
      const tick = () => {
        const p = Math.min((Date.now() - start) / duration, 1);
        setV(Math.round((1 - Math.pow(1 - p, 4)) * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [target, duration, delay]);
  return v;
}

/* ── Sparkline ────────────────────────────────────────────────── */
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
  const W = 56, H = 20;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * W},${H - ((v - min) / range) * (H - 4) - 2}`);
  const last = pts[pts.length - 1].split(',');
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
      <defs>
        <linearGradient id={`sg${color.replace(/[^a-zA-Z0-9]/g,'')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${H} ${pts.join(' ')} ${W},${H}`}
        fill={`url(#sg${color.replace(/[^a-zA-Z0-9]/g,'')})`} />
      <polyline points={pts.join(' ')} fill="none" stroke={color}
        strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={last[0]} cy={last[1]} r="2.5" fill={color} />
    </svg>
  );
}

/* ── Bar chart ────────────────────────────────────────────────── */
function BarChart({ data, labels }: { data: number[]; labels: string[] }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-[5px] w-full" style={{ height: 72 }}>
      {data.map((v, i) => {
        const isLast = i === data.length - 1;
        const h = Math.max(4, Math.round((v / max) * 64));
        return (
          <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1">
            <motion.div className="w-full rounded-t-[4px]"
              style={{
                height: h,
                background: isLast
                  ? 'linear-gradient(180deg,#C9956A 0%,#C4783A 100%)'
                  : 'rgba(160,82,45,0.15)',
                boxShadow: isLast ? '0 -3px 10px rgba(201,149,106,0.4)' : 'none',
              }}
              initial={{ height: 0 }}
              animate={{ height: h }}
              transition={{ delay: 0.05 * i, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            />
            <span className={`text-[7px] font-inter ${isLast ? 'text-[#C4783A] font-bold' : 'text-[#C4B5A8]'}`}>
              {labels[i]}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ── Donut ────────────────────────────────────────────────────── */
function Donut({ segs }: { segs: { pct: number; color: string; label: string }[] }) {
  const r = 28, cx = 34, cy = 34, circ = 2 * Math.PI * r;
  let off = 0;
  return (
    <div className="flex items-center gap-3">
      <svg width={68} height={68} viewBox="0 0 68 68" className="shrink-0">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F0EBE3" strokeWidth={8} />
        {segs.map((s, i) => {
          const dash = (s.pct / 100) * circ;
          const rot = (off / 100) * 360 - 90;
          off += s.pct;
          return (
            <motion.circle key={i} cx={cx} cy={cy} r={r} fill="none"
              stroke={s.color} strokeWidth={8} strokeLinecap="round"
              strokeDasharray={`${dash} ${circ}`}
              style={{ rotate: `${rot}deg`, transformOrigin: `${cx}px ${cy}px` }}
              initial={{ strokeDasharray: `0 ${circ}` }}
              animate={{ strokeDasharray: `${dash} ${circ}` }}
              transition={{ duration: 0.7, delay: 0.12 * i }} />
          );
        })}
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize={8} fontWeight="800" fill="#111">١,٥٣٨</text>
        <text x={cx} y={cx + 5} textAnchor="middle" fontSize={6} fill="#B0A9A0">عضو</text>
      </svg>
      <div className="space-y-1.5 flex-1">
        {segs.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
            <span className="text-[9px] text-[#888] flex-1">{s.label}</span>
            <span className="text-[9px] font-bold text-[#111] font-inter">{s.pct}٪</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── KPI Card ─────────────────────────────────────────────────── */
function KpiCard({ icon, label, target, suffix = '', change, up, color, spark, delay = 0 }: {
  icon: string; label: string; target: number; suffix?: string;
  change: string; up: boolean; color: string; spark: number[]; delay?: number;
}) {
  const val = useCounter(target, 1100, delay * 1000 + 350);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="bg-white rounded-[14px] p-3 border border-black/[0.04]"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="w-8 h-8 rounded-[10px] flex items-center justify-center text-[15px]"
          style={{ background: `${color}12` }}>{icon}</div>
        <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[7px] font-bold ${up ? 'bg-[#30D158]/10 text-[#30D158]' : 'bg-[#FF453A]/10 text-[#FF453A]'}`}>
          {change}
        </div>
      </div>
      <div className="flex items-baseline gap-1 mb-0.5">
        <span className="text-[20px] font-black text-[#111] font-inter leading-none tabular-nums">
          {val.toLocaleString()}
        </span>
        {suffix && <span className="text-[10px] text-[#C4B5A8]">{suffix}</span>}
      </div>
      <p className="text-[8px] text-[#B0A9A0] font-medium mb-2">{label}</p>
      <Sparkline data={spark} color={color} />
    </motion.div>
  );
}

/* ── Sidebar nav items ────────────────────────────────────────── */
const navItems = [
  { icon: '⬡', label: 'لوحة البيانات' },
  { icon: '◫', label: 'الأعضاء'       },
  { icon: '◉', label: 'المنيو'         },
  { icon: '◈', label: 'العروض'        },
  { icon: '▦', label: 'الحجوزات'      },
  { icon: '◌', label: 'الإعدادات'     },
];

const weekLabels = ['أح', 'إث', 'ث', 'أر', 'خ', 'ج', 'س'];
const revData    = [820, 1040, 760, 1180, 940, 1380, 1620];

const members = [
  { name: 'عبدالإله علي',   level: 'كلاسيك', pts: 480,  lc: '#C4783A', time: 'الآن'        },
  { name: 'سارة الغامدي',   level: 'فضي',    pts: 920,  lc: '#6B7A8D', time: '٩:٤٥ص'       },
  { name: 'محمد العمري',    level: 'ذهبي',   pts: 1840, lc: '#C9956A', time: 'أمس، ٤م'     },
  { name: 'نورة الزهراني',  level: 'كلاسيك', pts: 260,  lc: '#C4783A', time: 'أمس، ١م'     },
  { name: 'خالد الدوسري',   level: 'فضي',    pts: 780,  lc: '#6B7A8D', time: 'أمس، ١٠ص'   },
];

const topItems = [
  { name: 'لاتيه إثيوبي', n: 284, pct: 100, c: '#C4783A' },
  { name: 'قهوة مطعمك',     n: 197, pct: 69,  c: '#C9956A' },
  { name: 'كرواسون',      n: 163, pct: 57,  c: '#B5651D' },
  { name: 'مقطرة يمني',   n: 118, pct: 42,  c: '#6B7A8D' },
  { name: 'ماتشا',        n:  96, pct: 34,  c: '#2D7D46' },
];

/* ══════════════════════════════════════════════════════════════
   MAIN DASHBOARD
══════════════════════════════════════════════════════════════ */
export function OwnerDashboard() {
  const [active, setActive] = useState('لوحة البيانات');
  const liveCount = useCounter(23, 900, 600);

  return (
    <div className="flex h-full overflow-hidden font-sans" dir="rtl"
      style={{ background: '#F0EDE8', fontSize: '12px' }}>

      {/* ══ SIDEBAR ══ */}
      <aside className="w-[120px] shrink-0 flex flex-col py-3 border-l border-white/5"
        style={{ background: 'linear-gradient(175deg,#0A0002 0%,#1E0508 60%,#0D0205 100%)' }}>

        {/* Brand */}
        <div className="flex items-center gap-2 px-3 mb-5">
          <img src={logoImg} className="w-7 h-7 rounded-[8px] object-cover ring-1 ring-white/10 shrink-0" alt="" />
          <div className="min-w-0">
            <p className="text-[#C9956A] text-[13px] font-black leading-none truncate">مطعمك</p>
            <p className="text-white/25 text-[7px] font-inter mt-0.5">ADMIN</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 space-y-0.5">
          {navItems.map(item => {
            const isActive = active === item.label;
            return (
              <button key={item.label} onClick={() => setActive(item.label)}
                className="w-full flex items-center gap-2 px-2.5 py-[7px] rounded-[8px] text-right transition-all duration-150"
                style={isActive
                  ? { background: 'rgba(201,149,106,0.15)', borderRight: '2px solid #C9956A' }
                  : { background: 'transparent' }
                }>
                <span className={`text-[10px] shrink-0 transition-colors ${isActive ? 'text-[#C9956A]' : 'text-white/20'}`}>
                  {item.icon}
                </span>
                <span className={`text-[9px] font-semibold truncate transition-colors ${isActive ? 'text-white' : 'text-white/30'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Live indicator */}
        <div className="mx-2 mt-3 rounded-[10px] p-2.5 border border-[#30D158]/20"
          style={{ background: 'rgba(48,209,88,0.07)' }}>
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-1.5 h-1.5 bg-[#30D158] rounded-full animate-pulse" />
            <span className="text-[7px] text-[#30D158] font-bold tracking-widest">LIVE</span>
          </div>
          <p className="text-white text-[22px] font-black font-inter leading-none">{liveCount}</p>
          <p className="text-white/25 text-[7px] mt-0.5">متصل الآن</p>
        </div>
      </aside>

      {/* ══ CONTENT ══ */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">

        {/* ── Topbar ── */}
        <div className="shrink-0 flex items-center justify-between px-4 py-2.5 border-b border-black/[0.06]"
          style={{ background: 'rgba(240,237,232,0.96)', backdropFilter: 'blur(8px)' }}>
          <div>
            <p className="text-[11px] font-black text-[#111]">لوحة تحكم المالك</p>
            <p className="text-[8px] text-[#B0A9A0] mt-0.5 font-inter">الجمعة، ١٧ يوليو ٢٠٢٦</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Notification bell */}
            <div className="relative">
              <div className="w-7 h-7 rounded-full bg-white border border-black/[0.07] flex items-center justify-center shadow-sm">
                <span className="text-[11px]">🔔</span>
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#FF3B30] rounded-full border border-[#F0EDE8]" />
            </div>
            {/* Avatar */}
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-black"
              style={{ background: 'linear-gradient(135deg,#C4783A,#6B3A1F)' }}>م</div>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto scrollbar-none p-3 space-y-3">

          {/* ── KPIs — 2 × 2 grid ── */}
          <div className="grid grid-cols-2 gap-2.5">
            <KpiCard icon="👥" label="إجمالي الأعضاء" target={1538} suffix=""  change="+٣١ هذا الأسبوع" up color="#C4783A" spark={[820,960,880,1100,1280,1420,1538]} delay={0}    />
            <KpiCard icon="💰" label="إيراد اليوم"    target={1620} suffix="ر" change="↑ ٢٣٪ عن أمس"    up color="#30D158" spark={revData}                          delay={0.07} />
            <KpiCard icon="☕" label="أكواب اليوم"    target={89}   suffix=""  change="+١٢ عن أمس"       up color="#C9956A" spark={[52,61,47,74,63,81,89]}          delay={0.14} />
            <KpiCard icon="⭐" label="نقاط مُصرفة"   target={4260} suffix="ن" change="↑ ٨٪ هذا الشهر"  up color="#6C3483" spark={[2100,2800,2300,3100,3400,3900,4260]} delay={0.21} />
          </div>

          {/* ── Revenue bar + Donut ── */}
          <div className="grid grid-cols-5 gap-2.5">

            {/* Revenue bar chart — 3 cols */}
            <motion.div className="col-span-3 bg-white rounded-[14px] p-3.5 border border-black/[0.04]"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[10px] font-black text-[#111]">الإيراد الأسبوعي</p>
                  <p className="text-[8px] text-[#B0A9A0] mt-0.5">ريال سعودي · آخر ٧ أيام</p>
                </div>
                <div className="flex items-center gap-1 bg-[#30D158]/10 px-2 py-1 rounded-full">
                  <span className="text-[8px] text-[#30D158] font-bold">↑ ٢١٪</span>
                </div>
              </div>
              <BarChart data={revData} labels={weekLabels} />
              {/* Peak label */}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/[0.04]">
                <span className="text-[7px] text-[#B0A9A0]">ذروة: السبت</span>
                <span className="text-[8px] font-bold text-[#C4783A] font-inter">١,٦٢٠ ر</span>
              </div>
            </motion.div>

            {/* Donut — 2 cols */}
            <motion.div className="col-span-2 bg-white rounded-[14px] p-3.5 border border-black/[0.04]"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <p className="text-[10px] font-black text-[#111] mb-0.5">توزيع المستويات</p>
              <p className="text-[7px] text-[#B0A9A0] mb-3">من ١,٥٣٨ عضو</p>
              <Donut segs={[
                { pct: 58, color: '#C4783A', label: 'كلاسيك' },
                { pct: 30, color: '#6B7A8D', label: 'فضي'    },
                { pct: 12, color: '#C9956A', label: 'ذهبي'   },
              ]} />
            </motion.div>
          </div>

          {/* ── Members + Top items ── */}
          <div className="grid grid-cols-5 gap-2.5">

            {/* Members — 3 cols */}
            <motion.div className="col-span-3 bg-white rounded-[14px] p-3.5 border border-black/[0.04]"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-black text-[#111]">آخر الأعضاء</p>
                <button className="text-[8px] text-[#C4783A] font-bold">عرض الكل ←</button>
              </div>
              <div className="space-y-2">
                {members.map((m, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.04 }}
                    className="flex items-center gap-2.5 py-1.5 border-b border-black/[0.04] last:border-0">
                    {/* Avatar */}
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0"
                      style={{ background: `${m.lc}18`, color: m.lc }}>
                      {m.name[0]}
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] font-semibold text-[#111] truncate">{m.name}</p>
                      <p className="text-[7px] text-[#C4B5A8] font-inter">{m.time}</p>
                    </div>
                    {/* Level badge */}
                    <span className="text-[6.5px] font-black text-white px-1.5 py-0.5 rounded-full shrink-0"
                      style={{ background: m.lc }}>
                      {m.level}
                    </span>
                    {/* Points */}
                    <span className="text-[9px] font-black text-[#111] font-inter shrink-0 tabular-nums">
                      {m.pts.toLocaleString()}
                      <span className="text-[7px] text-[#C4B5A8] font-normal">ن</span>
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Top items — 2 cols */}
            <motion.div className="col-span-2 bg-white rounded-[14px] p-3.5 border border-black/[0.04]"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-black text-[#111]">الأكثر طلباً</p>
                <span className="text-[7px] text-[#B0A9A0]">هذا الأسبوع</span>
              </div>
              <div className="space-y-2.5">
                {topItems.map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.05 }}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[8.5px] font-semibold text-[#111]">{item.name}</span>
                      <span className="text-[8px] font-black text-[#111] font-inter">{item.n}</span>
                    </div>
                    <div className="h-[5px] rounded-full overflow-hidden" style={{ background: '#F0EBE3' }}>
                      <motion.div className="h-full rounded-full"
                        style={{ background: item.c }}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.pct}%` }}
                        transition={{ delay: 0.35 + i * 0.06, duration: 0.55 }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Bottom row: Challenges + Quick actions + Day summary ── */}
          <div className="grid grid-cols-3 gap-2.5">

            {/* Challenges */}
            <motion.div className="bg-white rounded-[14px] p-3.5 border border-black/[0.04]"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-black text-[#111]">التحديات</p>
                <button className="text-[7px] text-white font-bold px-2 py-0.5 rounded-full"
                  style={{ background: 'linear-gradient(135deg,#C4783A,#6B3A1F)' }}>+ جديد</button>
              </div>
              <div className="space-y-2">
                {[
                  { t: 'تحدي ٥ أكواب',     p: 67, c: '#C4783A', e: '٣ أيام' },
                  { t: 'الزيارة الصباحية',  p: 43, c: '#C9956A', e: '٦ أيام' },
                  { t: 'جرّب الفلتر',      p: 28, c: '#2D7D46', e: '٤ أيام' },
                ].map((ch, i) => (
                  <div key={i} className="rounded-[9px] px-2.5 py-2 border"
                    style={{ borderColor: `${ch.c}20`, background: `${ch.c}07` }}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[8px] font-bold" style={{ color: ch.c }}>{ch.t}</span>
                      <span className="text-[6.5px] text-[#C4B5A8]">{ch.p} عضو · {ch.e}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-[4px] rounded-full overflow-hidden" style={{ background: `${ch.c}18` }}>
                        <motion.div className="h-full rounded-full" style={{ background: ch.c }}
                          initial={{ width: 0 }} animate={{ width: `${ch.p}%` }}
                          transition={{ delay: 0.4 + 0.1 * i, duration: 0.55 }} />
                      </div>
                      <span className="text-[7px] font-black font-inter" style={{ color: ch.c }}>{ch.p}٪</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick actions */}
            <motion.div className="bg-white rounded-[14px] p-3.5 border border-black/[0.04]"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <p className="text-[10px] font-black text-[#111] mb-3">إجراءات سريعة</p>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { ic: '📣', l: 'إشعار جماعي', c: '#C4783A' },
                  { ic: '🎁', l: 'عرض جديد',    c: '#C9956A' },
                  { ic: '👥', l: 'إضافة عضو',   c: '#2D7D46' },
                  { ic: '☕', l: 'تحديث منيو',  c: '#1A5276' },
                  { ic: '📅', l: 'الحجوزات',    c: '#6C3483' },
                  { ic: '📊', l: 'تصدير تقرير', c: '#B5651D' },
                ].map((a, i) => (
                  <motion.button key={i} whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.38 + i * 0.04 }}
                    className="flex flex-col items-center gap-1 py-2.5 rounded-[9px] border"
                    style={{ borderColor: `${a.c}20`, background: `${a.c}08` }}>
                    <span className="text-[14px]">{a.ic}</span>
                    <span className="text-[6.5px] font-bold text-center leading-tight" style={{ color: a.c }}>{a.l}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Day summary */}
            <motion.div className="bg-white rounded-[14px] p-3.5 border border-black/[0.04] flex flex-col"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <p className="text-[10px] font-black text-[#111] mb-3">ملخص اليوم</p>
              <div className="space-y-2 flex-1">
                {[
                  { l: 'أعضاء جدد',    v: '٣١',    ic: '🆕', c: '#C4783A' },
                  { l: 'حجوزات',       v: '١٢',    ic: '📅', c: '#2D7D46' },
                  { l: 'تقييمات',      v: '٢٨',    ic: '⭐', c: '#D4AC0D' },
                  { l: 'عروض فعّالة',  v: '٤',     ic: '🎁', c: '#C9956A' },
                  { l: 'نقاط مكتسبة', v: '٤,٢٦٠', ic: '💎', c: '#6C3483' },
                ].map((s, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.42 + i * 0.04 }}
                    className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-[6px] flex items-center justify-center text-[10px] shrink-0"
                      style={{ background: `${s.c}12` }}>{s.ic}</div>
                    <span className="text-[8px] text-[#888] flex-1">{s.l}</span>
                    <span className="text-[9px] font-black text-[#111] font-inter">{s.v}</span>
                  </motion.div>
                ))}
              </div>

              {/* Revenue total */}
              <div className="mt-3 rounded-[11px] p-2.5 text-center"
                style={{ background: 'linear-gradient(135deg,#0D0205,#3D0809)' }}>
                <p className="text-white/35 text-[7px] mb-0.5">إيراد اليوم</p>
                <p className="text-[#C9956A] text-[18px] font-black font-inter leading-none">١,٦٢٠</p>
                <p className="text-white/25 text-[7px] mt-0.5">ريال سعودي</p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MOBILE SUMMARY (iPhone mockup — removed per user request)
══════════════════════════════════════════════════════════════ */
export function MobileOwnerSummary() {
  const members = useCounter(1538, 1100, 500);
  const revenue = useCounter(1620, 1100, 600);
  const cups    = useCounter(89,   1100, 700);

  return (
    <div className="flex flex-col h-full overflow-hidden font-sans" dir="rtl"
      style={{ background: '#F6F4F1' }}>
      <div className="px-4 pt-4 pb-3 flex items-center justify-between"
        style={{ background: 'linear-gradient(180deg,#0D0205,#1E0507)' }}>
        <div className="flex items-center gap-2">
          <img src={logoImg} className="w-6 h-6 rounded-[7px] object-cover" alt="" />
          <div>
            <p className="text-[#C9956A] text-[11px] font-extrabold leading-none">مطعمك</p>
            <p className="text-white/30 text-[7px] font-inter">Admin Panel</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-[#30D158] rounded-full animate-pulse" />
          <span className="text-[#30D158] text-[8px] font-bold">٢٣ Live</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none px-3 py-3 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {[
            { ic: '👥', l: 'الأعضاء', v: members, c: '#C4783A', s: '' },
            { ic: '💰', l: 'الإيراد', v: revenue, c: '#30D158', s: 'ر' },
            { ic: '☕', l: 'أكواب',  v: cups,    c: '#C9956A', s: '' },
            { ic: '⭐', l: 'نقاط',  v: 4260,    c: '#6C3483', s: 'ن' },
          ].map((k, i) => (
            <div key={i} className="bg-white rounded-[12px] p-3 border border-black/[0.04]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[12px]">{k.ic}</span>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: k.c }} />
              </div>
              <p className="text-[16px] font-extrabold text-[#111] font-inter leading-none tabular-nums">
                {k.v.toLocaleString()}<span className="text-[9px] text-[#C8BDB4] font-normal">{k.s}</span>
              </p>
              <p className="text-[8px] text-[#B0A9A0] mt-0.5">{k.l}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[12px] p-3 border border-black/[0.04]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[9px] font-bold text-[#111]">الإيراد الأسبوعي</p>
            <span className="text-[8px] text-[#30D158] font-bold bg-[#30D158]/10 px-1.5 py-0.5 rounded-full">↑٢١٪</span>
          </div>
          <div className="flex items-end gap-1" style={{ height: 48 }}>
            {[820,1040,760,1180,940,1380,1620].map((v,i) => (
              <div key={i} className="flex-1 rounded-t-[3px]"
                style={{
                  background: i === 6 ? 'linear-gradient(180deg,#C9956A,#C4783A)' : 'rgba(160,82,45,0.15)',
                  height: `${Math.round((v/1620)*44)}px`,
                }} />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[12px] p-3 border border-black/[0.04]">
          <p className="text-[9px] font-bold text-[#111] mb-2">آخر الأعضاء</p>
          {[
            { n: 'عبدالإله علي',  l: 'كلاسيك', p: 480,  c: '#C4783A' },
            { n: 'سارة الغامدي', l: 'فضي',    p: 920,  c: '#6B7A8D' },
            { n: 'محمد العمري',  l: 'ذهبي',   p: 1840, c: '#C9956A' },
          ].map((m,i) => (
            <div key={i} className="flex items-center gap-2 py-1.5 border-b last:border-0 border-black/[0.04]">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0"
                style={{ background: `${m.c}18`, color: m.c }}>{m.n[0]}</div>
              <span className="text-[9px] font-medium text-[#111] flex-1 truncate">{m.n}</span>
              <span className="text-[7px] text-white font-bold px-1.5 py-0.5 rounded-full shrink-0"
                style={{ background: m.c }}>{m.l}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {[
            { ic: '📣', l: 'إشعار', c: '#C4783A' },
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
