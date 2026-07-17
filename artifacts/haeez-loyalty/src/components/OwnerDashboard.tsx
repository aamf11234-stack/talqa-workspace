import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const logoImg = `${import.meta.env.BASE_URL}hyz-logo.jpeg`;

/* ── Animated counter ─────────────────────────────────────────────── */
function useCounter(target: number, duration = 1200, delay = 0) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const start = Date.now();
      const tick = () => {
        const p = Math.min((Date.now() - start) / duration, 1);
        const e = 1 - Math.pow(1 - p, 3);
        setV(Math.round(e * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [target, duration, delay]);
  return v;
}

/* ── Mini sparkline ───────────────────────────────────────────────── */
function Sparkline({ data, color, height = 28 }: { data: number[]; color: string; height?: number }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80;
  const h = height;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return `${x},${y}`;
  });
  const polyline = pts.join(' ');
  const lastPt = pts[pts.length - 1].split(',');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <defs>
        <linearGradient id={`sg-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${h} ${polyline} ${w},${h}`}
        fill={`url(#sg-${color.replace('#', '')})`}
      />
      <polyline points={polyline} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={lastPt[0]} cy={lastPt[1]} r="2.5" fill={color} />
    </svg>
  );
}

/* ── Bar chart ────────────────────────────────────────────────────── */
function BarChart({ data, labels, color }: { data: number[]; labels: string[]; color: string }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-1 h-20 w-full">
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <motion.div
            className="w-full rounded-t-[3px]"
            style={{ background: color, opacity: i === data.length - 1 ? 1 : 0.45 }}
            initial={{ height: 0 }}
            animate={{ height: `${(v / max) * 68}px` }}
            transition={{ delay: 0.05 * i, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          />
          <span className="text-[7px] text-[#AAA] font-inter">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Donut chart ──────────────────────────────────────────────────── */
function DonutChart({ segments }: { segments: { pct: number; color: string; label: string }[] }) {
  const r = 32;
  const cx = 40;
  const cy = 40;
  const circumference = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="flex items-center gap-4">
      <svg width={80} height={80} viewBox="0 0 80 80">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="10" />
        {segments.map((seg, i) => {
          const dash = (seg.pct / 100) * circumference;
          const gap = circumference - dash;
          const rotate = (offset / 100) * 360 - 90;
          offset += seg.pct;
          return (
            <motion.circle
              key={i}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth="10"
              strokeDasharray={`${dash} ${gap}`}
              strokeLinecap="round"
              style={{ rotate: `${rotate}deg`, transformOrigin: `${cx}px ${cy}px` }}
              initial={{ strokeDasharray: `0 ${circumference}` }}
              animate={{ strokeDasharray: `${dash} ${gap}` }}
              transition={{ duration: 0.8, delay: 0.1 * i, ease: [0.4, 0, 0.2, 1] }}
            />
          );
        })}
        <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle" fontSize="10" fontWeight="700" fill="#111">
          ١٠٠٪
        </text>
      </svg>
      <div className="space-y-1.5">
        {segments.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
            <span className="text-[9px] text-[#666]">{s.label}</span>
            <span className="text-[9px] font-bold text-[#111] font-inter mr-auto">{s.pct}٪</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Stat card ────────────────────────────────────────────────────── */
interface StatCardProps {
  icon: string;
  label: string;
  value: number | string;
  suffix?: string;
  change: string;
  up: boolean;
  color: string;
  sparkData?: number[];
  delay?: number;
}
function StatCard({ icon, label, value, suffix = '', change, up, color, sparkData, delay = 0 }: StatCardProps) {
  const num = typeof value === 'number' ? useCounter(value, 1100, delay * 1000 + 300) : null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="bg-white rounded-[14px] p-3.5 border border-[rgba(0,0,0,0.05)] shadow-[0_2px_10px_rgba(0,0,0,0.04)] flex flex-col gap-2"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[9px] text-[#999] font-medium mb-1">{label}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-[20px] font-bold text-[#111] font-inter leading-none tabular-nums">
              {num !== null ? num.toLocaleString() : value}
            </span>
            {suffix && <span className="text-[10px] text-[#999]">{suffix}</span>}
          </div>
        </div>
        <div className="w-7 h-7 rounded-[8px] flex items-center justify-center text-[14px]"
          style={{ background: `${color}18` }}>
          {icon}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-0.5 text-[9px] font-semibold ${up ? 'text-[#30D158]' : 'text-[#FF453A]'}`}>
          <span>{up ? '↑' : '↓'}</span>
          <span>{change}</span>
        </div>
        {sparkData && <Sparkline data={sparkData} color={color} />}
      </div>
    </motion.div>
  );
}

/* ── Data ─────────────────────────────────────────────────────────── */
const weekDays = ['أح', 'إث', 'ث', 'أر', 'خ', 'ج', 'س'];
const revenueData = [820, 1040, 760, 1180, 940, 1380, 1620];
const memberData  = [12, 18, 9, 22, 15, 27, 31];

const recentMembers = [
  { name: 'عبد الإله المالكي', level: 'كلاسيك', pts: 480, joined: 'اليوم، ١١:٣٠ص', avatar: '👨' },
  { name: 'سارة الغامدي',      level: 'فضي',    pts: 920, joined: 'اليوم، ٩:٤٥ص',  avatar: '👩' },
  { name: 'محمد العمري',       level: 'ذهبي',   pts: 1840,joined: 'أمس، ٤:٢٠م',   avatar: '👨' },
  { name: 'نورة الزهراني',     level: 'كلاسيك', pts: 260, joined: 'أمس، ١:٠٠م',   avatar: '👩' },
  { name: 'خالد الدوسري',      level: 'فضي',    pts: 780, joined: 'أمس، ١٠:١٥ص',  avatar: '👨' },
];

const topItems = [
  { name: 'لاتيه إثيوبي', count: 284, rev: 4828, pct: 100 },
  { name: 'قهوة حيز',     count: 197, rev: 3743, pct: 69  },
  { name: 'كرواسون',      count: 163, rev: 1630, pct: 57  },
  { name: 'مقطرة يمني',   count: 118, rev: 2124, pct: 42  },
  { name: 'ماتشا',        count:  96, rev: 1728, pct: 34  },
];

const levelColors: Record<string, string> = {
  'كلاسيك': '#7B1618',
  'فضي':    '#8E9BAF',
  'ذهبي':   '#C9956A',
};

/* ── Sidebar ──────────────────────────────────────────────────────── */
const sideItems = [
  { icon: '📊', label: 'لوحة البيانات', active: true  },
  { icon: '👥', label: 'الأعضاء',       active: false },
  { icon: '☕', label: 'المنيو',         active: false },
  { icon: '🎁', label: 'العروض',        active: false },
  { icon: '📅', label: 'الحجوزات',      active: false },
  { icon: '📣', label: 'الإشعارات',     active: false },
  { icon: '⚙️', label: 'الإعدادات',    active: false },
];

/* ── Main Dashboard ───────────────────────────────────────────────── */
export function OwnerDashboard() {
  const [activeSection, setActiveSection] = useState('لوحة البيانات');
  const liveUsers = useCounter(23, 800, 600);

  return (
    <div className="flex h-full font-sans overflow-hidden" dir="rtl" style={{ background: '#F4F6F9' }}>

      {/* ── Sidebar ── */}
      <div className="w-[140px] shrink-0 h-full flex flex-col py-4 px-2.5 border-l border-[rgba(0,0,0,0.06)]"
        style={{ background: 'linear-gradient(180deg,#0D0205 0%,#1A0406 100%)' }}>
        {/* Logo */}
        <div className="flex items-center gap-2 px-2 mb-5">
          <img src={logoImg} alt="" className="w-6 h-6 rounded-[6px] object-cover" />
          <div>
            <p className="text-[#C9956A] text-[11px] font-bold leading-tight">حيز</p>
            <p className="text-white/25 text-[7px] leading-tight font-inter">ADMIN</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-0.5">
          {sideItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveSection(item.label)}
              className="w-full flex items-center gap-2 px-2 py-2 rounded-[8px] text-right transition-all"
              style={activeSection === item.label
                ? { background: 'rgba(123,22,24,0.5)', borderLeft: '2px solid #C9956A' }
                : { background: 'transparent' }
              }
            >
              <span className="text-[12px]">{item.icon}</span>
              <span className={`text-[9px] font-medium truncate ${activeSection === item.label ? 'text-white' : 'text-white/40'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Live indicator */}
        <div className="px-2 py-2 rounded-[8px] mt-2" style={{ background: 'rgba(48,209,88,0.08)' }}>
          <div className="flex items-center gap-1.5 mb-0.5">
            <div className="w-1.5 h-1.5 bg-[#30D158] rounded-full animate-pulse" />
            <span className="text-[#30D158] text-[8px] font-semibold">مباشر</span>
          </div>
          <p className="text-white text-[14px] font-bold font-inter leading-none">{liveUsers}</p>
          <p className="text-white/30 text-[7px]">متصل الآن</p>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 overflow-y-auto scrollbar-none">

        {/* Top bar */}
        <div className="sticky top-0 z-20 bg-white border-b border-[rgba(0,0,0,0.06)] px-4 py-2.5 flex items-center justify-between shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          <div>
            <p className="text-[11px] font-bold text-[#111]">لوحة تحكم المالك</p>
            <p className="text-[8px] text-[#AAA]">الجمعة، ١٧ يوليو ٢٠٢٦</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-[#F4F6F9] px-2.5 py-1.5 rounded-full border border-[rgba(0,0,0,0.06)]">
              <span className="text-[9px]">🔔</span>
              <div className="w-1.5 h-1.5 bg-[#FF3B30] rounded-full" />
            </div>
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#7B1618] to-[#4A0D0F] flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">م</span>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">

          {/* ── KPI Cards ── */}
          <div className="grid grid-cols-4 gap-3">
            <StatCard icon="👥" label="إجمالي الأعضاء"    value={1538}  change="٣١ هذا الأسبوع" up={true}  color="#7B1618" sparkData={[820,960,880,1100,1280,1420,1538]} delay={0}    />
            <StatCard icon="💰" label="إيراد اليوم (ر)"   value={1620}  change="↑٢٣٪ عن أمس"    up={true}  color="#30D158" sparkData={revenueData}                          delay={0.06} />
            <StatCard icon="☕" label="أكواب اليوم"        value={89}    change="↑١٢ عن أمس"     up={true}  color="#C9956A" sparkData={[52,61,47,74,63,81,89]}               delay={0.12} />
            <StatCard icon="⭐" label="نقاط مُصرفة"       value={4260}  suffix="ن" change="↑٨٪ هذا الأسبوع" up={true} color="#6C3483" sparkData={[2100,2800,2300,3100,3400,3900,4260]} delay={0.18} />
          </div>

          {/* ── Charts row ── */}
          <div className="grid grid-cols-3 gap-3">

            {/* Revenue bars */}
            <div className="col-span-2 bg-white rounded-[14px] p-4 border border-[rgba(0,0,0,0.05)] shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[10px] font-bold text-[#111]">الإيراد الأسبوعي</p>
                  <p className="text-[8px] text-[#AAA]">ريال سعودي · آخر ٧ أيام</p>
                </div>
                <div className="flex items-center gap-1 bg-[#30D158]/10 px-2 py-0.5 rounded-full">
                  <span className="text-[#30D158] text-[8px] font-bold">↑ ٢١٪</span>
                </div>
              </div>
              <BarChart data={revenueData} labels={weekDays} color="#7B1618" />
            </div>

            {/* Member levels donut */}
            <div className="bg-white rounded-[14px] p-4 border border-[rgba(0,0,0,0.05)] shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
              <p className="text-[10px] font-bold text-[#111] mb-1">توزيع المستويات</p>
              <p className="text-[8px] text-[#AAA] mb-3">من إجمالي ١,٥٣٨ عضو</p>
              <DonutChart segments={[
                { pct: 58, color: '#7B1618', label: 'كلاسيك' },
                { pct: 30, color: '#8E9BAF', label: 'فضي'    },
                { pct: 12, color: '#C9956A', label: 'ذهبي'   },
              ]} />
            </div>
          </div>

          {/* ── Members + Top Items ── */}
          <div className="grid grid-cols-5 gap-3">

            {/* Recent members */}
            <div className="col-span-3 bg-white rounded-[14px] p-4 border border-[rgba(0,0,0,0.05)] shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold text-[#111]">آخر الأعضاء</p>
                <button className="text-[8px] text-[#7B1618] font-semibold">عرض الكل</button>
              </div>
              <div className="space-y-2.5">
                {recentMembers.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="flex items-center gap-2.5"
                  >
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] shrink-0"
                      style={{ background: `${levelColors[m.level]}18` }}>
                      {m.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] font-semibold text-[#111] truncate">{m.name}</p>
                      <p className="text-[7px] text-[#AAA]">{m.joined}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[7px] font-bold px-1.5 py-0.5 rounded-full text-white"
                        style={{ background: levelColors[m.level] }}>
                        {m.level}
                      </span>
                      <span className="text-[8px] font-bold text-[#111] font-inter">{m.pts.toLocaleString()}</span>
                      <span className="text-[7px] text-[#CCC]">ن</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Top items */}
            <div className="col-span-2 bg-white rounded-[14px] p-4 border border-[rgba(0,0,0,0.05)] shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold text-[#111]">الأكثر طلباً</p>
                <span className="text-[7px] text-[#AAA]">هذا الأسبوع</span>
              </div>
              <div className="space-y-2.5">
                {topItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.06 * i }}
                    className="flex flex-col gap-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-medium text-[#111]">{item.name}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[8px] font-bold font-inter text-[#111]">{item.count}</span>
                        <span className="text-[7px] text-[#CCC]">كوب</span>
                      </div>
                    </div>
                    <div className="h-1 rounded-full bg-[#F0EBE3] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: i === 0 ? '#7B1618' : i === 1 ? '#C9956A' : '#AAA' }}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.pct}%` }}
                        transition={{ delay: 0.1 + 0.05 * i, duration: 0.6 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Challenges + Quick actions ── */}
          <div className="grid grid-cols-3 gap-3">

            {/* Active challenges */}
            <div className="bg-white rounded-[14px] p-4 border border-[rgba(0,0,0,0.05)] shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold text-[#111]">التحديات الفعالة</p>
                <button className="text-[7px] font-semibold text-white px-1.5 py-0.5 rounded-full"
                  style={{ background: 'linear-gradient(135deg,#7B1618,#4A0D0F)' }}>
                  + جديد
                </button>
              </div>
              <div className="space-y-2">
                {[
                  { title: 'تحدي ٥ أكواب',      part: 67,  ends: 'ينتهي الجمعة', color: '#7B1618' },
                  { title: 'الزيارة الصباحية',   part: 43,  ends: 'ينتهي الأحد',  color: '#C9956A' },
                  { title: 'جرّب الفلتر',        part: 28,  ends: 'ينتهي السبت',  color: '#2D7D46' },
                ].map((c, i) => (
                  <div key={i} className="rounded-[8px] px-2.5 py-2 border" style={{ borderColor: `${c.color}20`, background: `${c.color}06` }}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-semibold" style={{ color: c.color }}>{c.title}</span>
                      <span className="text-[7px] font-bold font-inter" style={{ color: c.color }}>{c.part}</span>
                    </div>
                    <p className="text-[7px] text-[#BBB] mb-1.5">{c.ends} · {c.part} مشارك</p>
                    <div className="h-0.5 rounded-full bg-[#F0EBE3] overflow-hidden">
                      <motion.div className="h-full rounded-full" style={{ background: c.color }}
                        initial={{ width: 0 }} animate={{ width: `${(c.part / 100) * 100}%` }}
                        transition={{ delay: 0.3 + 0.1 * i, duration: 0.6 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-white rounded-[14px] p-4 border border-[rgba(0,0,0,0.05)] shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
              <p className="text-[10px] font-bold text-[#111] mb-3">إجراءات سريعة</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: '📣', label: 'إشعار جماعي',   color: '#7B1618' },
                  { icon: '🎁', label: 'عرض جديد',       color: '#C9956A' },
                  { icon: '👥', label: 'إضافة عضو',      color: '#2D7D46' },
                  { icon: '☕', label: 'تحديث المنيو',   color: '#1A5276' },
                  { icon: '📅', label: 'حجوزات اليوم',  color: '#6C3483' },
                  { icon: '📊', label: 'تصدير تقرير',   color: '#B5651D' },
                ].map((a, i) => (
                  <motion.button
                    key={i}
                    whileTap={{ scale: 0.92 }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * i }}
                    className="flex flex-col items-center gap-1 py-2.5 px-1 rounded-[8px] border transition-all active:brightness-95"
                    style={{ borderColor: `${a.color}20`, background: `${a.color}08` }}
                  >
                    <span className="text-[14px]">{a.icon}</span>
                    <span className="text-[7px] font-semibold text-center leading-tight" style={{ color: a.color }}>{a.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Today summary */}
            <div className="bg-white rounded-[14px] p-4 border border-[rgba(0,0,0,0.05)] shadow-[0_2px_10px_rgba(0,0,0,0.04)] flex flex-col">
              <p className="text-[10px] font-bold text-[#111] mb-3">ملخص اليوم</p>
              <div className="space-y-2 flex-1">
                {[
                  { label: 'أعضاء جدد اليوم',    val: '٣١',   icon: '🆕', color: '#7B1618' },
                  { label: 'حجوزات مؤكدة',       val: '١٢',   icon: '📅', color: '#2D7D46' },
                  { label: 'عروض مفعّلة',         val: '٤',    icon: '🎁', color: '#C9956A' },
                  { label: 'تقييمات اليوم',       val: '٢٨',   icon: '⭐', color: '#D4AC0D' },
                  { label: 'نقاط مُكتسبة',        val: '٤,٢٦٠', icon: '⭐', color: '#6C3483' },
                ].map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-[5px] flex items-center justify-center text-[10px] shrink-0"
                      style={{ background: `${s.color}12` }}>
                      {s.icon}
                    </div>
                    <span className="text-[8px] text-[#888] flex-1">{s.label}</span>
                    <span className="text-[9px] font-bold text-[#111] font-inter">{s.val}</span>
                  </motion.div>
                ))}
              </div>

              {/* Revenue mini total */}
              <div className="mt-3 rounded-[10px] p-2.5 text-center"
                style={{ background: 'linear-gradient(135deg,#0D0205,#3D0809)' }}>
                <p className="text-white/50 text-[7px] mb-0.5">إيراد اليوم</p>
                <p className="text-[#C9956A] text-[16px] font-bold font-inter leading-none">١,٦٢٠</p>
                <p className="text-white/30 text-[7px]">ريال سعودي</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
