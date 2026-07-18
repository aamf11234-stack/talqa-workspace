import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, ChevronLeft, ChevronRight, Activity, Droplets, Heart, CalendarCheck, FileText, BookOpen, Phone } from 'lucide-react';

/* ─── animated counter ─────────────────────────────────────── */
function useCounter(target: number, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let v = 0;
    const step = Math.max(1, Math.ceil(target / (duration / 16)));
    const t = setInterval(() => { v = Math.min(v + step, target); setVal(v); if (v >= target) clearInterval(t); }, 16);
    return () => clearInterval(t);
  }, [target, duration]);
  return val;
}

/* ─── health ring ──────────────────────────────────────────── */
function HealthRing({ score }: { score: number }) {
  const r = 54, circ = 2 * Math.PI * r;
  return (
    <svg width="140" height="140" viewBox="0 0 140 140" className="mx-auto">
      <defs>
        <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00B4D8" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Track */}
      <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
      {/* Fill */}
      <motion.circle cx="70" cy="70" r={r} fill="none" strokeWidth="10" strokeLinecap="round"
        stroke="url(#rg)" filter="url(#glow)"
        strokeDasharray={circ} strokeDashoffset={circ}
        animate={{ strokeDashoffset: circ * (1 - score / 100) }}
        transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
        transform="rotate(-90 70 70)" />
      {/* Score */}
      <motion.text x="70" y="64" textAnchor="middle" fill="white" fontSize="30" fontWeight="800"
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}>
        {score}
      </motion.text>
      <text x="70" y="80" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="Tajawal,sans-serif">درجة الصحة</text>
    </svg>
  );
}

/* ─── apple watch face ─────────────────────────────────────── */
function WatchFace() {
  return (
    <div className="relative shrink-0" style={{ width: 68, height: 80 }}>
      {/* Watch body */}
      <div className="absolute inset-0 rounded-[18px] border-[3px] border-[#3a3a3c] shadow-[0_0_20px_rgba(0,0,0,0.6)]"
        style={{ background: 'linear-gradient(145deg,#1c1c1e,#2c2c2e)' }}>
        {/* Crown */}
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-7 rounded-l-sm bg-[#3a3a3c]" />
        {/* Screen */}
        <div className="absolute inset-[5px] rounded-[14px] overflow-hidden flex flex-col items-center justify-center gap-1"
          style={{ background: 'linear-gradient(160deg,#0a0a0a,#141416)' }}>
          <p className="text-white/40 text-[7px] leading-none font-light">9:41</p>
          {/* Activity rings */}
          <div className="relative" style={{ width: 36, height: 36 }}>
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              {/* Move */}
              <circle cx="18" cy="18" r="15" fill="none" stroke="#FF2D55" strokeWidth="3.5" opacity="0.2"/>
              <motion.circle cx="18" cy="18" r="15" fill="none" stroke="#FF2D55" strokeWidth="3.5" strokeLinecap="round"
                strokeDasharray="94" strokeDashoffset={94 * 0.28}
                initial={{ strokeDashoffset: 94 }} animate={{ strokeDashoffset: 94 * 0.28 }}
                transition={{ duration: 1.2, delay: 0.4 }} />
              {/* Exercise */}
              <circle cx="18" cy="18" r="10.5" fill="none" stroke="#22C55E" strokeWidth="3.5" opacity="0.2"/>
              <motion.circle cx="18" cy="18" r="10.5" fill="none" stroke="#22C55E" strokeWidth="3.5" strokeLinecap="round"
                strokeDasharray="66" strokeDashoffset={66 * 0.35}
                initial={{ strokeDashoffset: 66 }} animate={{ strokeDashoffset: 66 * 0.35 }}
                transition={{ duration: 1.2, delay: 0.55 }} />
              {/* Stand */}
              <circle cx="18" cy="18" r="6" fill="none" stroke="#00B4D8" strokeWidth="3.5" opacity="0.2"/>
              <motion.circle cx="18" cy="18" r="6" fill="none" stroke="#00B4D8" strokeWidth="3.5" strokeLinecap="round"
                strokeDasharray="38" strokeDashoffset={38 * 0.42}
                initial={{ strokeDashoffset: 38 }} animate={{ strokeDashoffset: 38 * 0.42 }}
                transition={{ duration: 1.2, delay: 0.7 }} />
            </svg>
          </div>
          <p className="text-[#FF2D55] text-[7px] font-bold leading-none">72 BPM</p>
        </div>
      </div>
    </div>
  );
}

/* ─── data ─────────────────────────────────────────────────── */
const quickActions = [
  { icon: CalendarCheck, label: 'احجز',   color: '#0B4A6F', bg: '#EBF5FF' },
  { icon: FileText,      label: 'نتائجي', color: '#0077A8', bg: '#E0F4FB' },
  { icon: BookOpen,      label: 'وصفتي',  color: '#059669', bg: '#ECFDF5' },
  { icon: Phone,         label: 'اتصل',   color: '#D97706', bg: '#FFFBEB' },
];

const vitals = [
  { icon: Heart,    label: 'ضغط الدم', value: '120/80', unit: 'mmHg', color: '#EF4444', bg: '#FEF2F2' },
  { icon: Droplets, label: 'السكر',    value: '95',     unit: 'mg/dL', color: '#3B82F6', bg: '#EFF6FF' },
  { icon: Activity, label: 'النبض',   value: '72',     unit: 'bpm',   color: '#10B981', bg: '#ECFDF5' },
];

const meds = [
  { name: 'ميتفورمين ٥٠٠mg', time: '٨:٠٠ ص',  taken: true,  color: '#10B981' },
  { name: 'فيتامين د',        time: '١:٠٠ م',  taken: false, color: '#F59E0B' },
  { name: 'أوميبرازول',       time: '٨:٠٠ م',  taken: false, color: '#00B4D8' },
];

const family = [
  { name: 'سارة',  rel: 'الزوجة', health: 91, color: '#EC4899', av: 'س' },
  { name: 'فيصل', rel: 'الابن',  health: 78, color: '#3B82F6', av: 'ف' },
  { name: 'منيرة', rel: 'الأم',   health: 65, color: '#F59E0B', av: 'م' },
];

const progress = [
  { label: 'الدواء', pct: 86, color: '#10B981' },
  { label: 'المشي',  pct: 60, color: '#00B4D8' },
  { label: 'الماء',  pct: 72, color: '#3B82F6' },
];

/* ─── component ────────────────────────────────────────────── */
export function ScreenHome() {
  const visits = useCounter(24);

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-none" style={{ background: '#F2F6FB', fontFamily: 'Tajawal,sans-serif' }}>

      {/* ── Hero ────────────────────────────────────────── */}
      <div className="relative overflow-hidden shrink-0"
        style={{ background: 'linear-gradient(160deg,#06101E 0%,#0B3A5A 55%,#06101E 100%)', paddingBottom: 36 }}>

        {/* ambient */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 65% 35%, rgba(0,180,216,0.25) 0%, transparent 65%)' }} />
        {/* dot grid */}
        <div className="absolute bottom-0 inset-x-0 h-24 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '14px 14px' }} />

        {/* top bar */}
        <div className="relative z-10 flex items-center justify-between px-5 pt-4 pb-3">
          <div>
            <p className="text-white/40 text-[10px] mb-0.5">مرحباً بك 👋</p>
            <p className="text-white text-[17px] font-bold">أحمد الشمري</p>
          </div>
          <div className="flex items-center gap-2.5">
            <motion.button whileTap={{ scale: 0.88 }}
              className="relative w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Bell size={15} className="text-white/70" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full border border-[#06101E]" />
            </motion.button>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[14px] font-bold"
              style={{ background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)', border: '2px solid rgba(255,255,255,0.15)' }}>
              أ
            </div>
          </div>
        </div>

        {/* ring + stats */}
        <div className="relative z-10 px-5">
          <HealthRing score={82} />
          <motion.div className="flex justify-around mt-3"
            initial="h" animate="s" variants={{ h:{}, s:{ transition:{ staggerChildren:0.07 } } }}>
            {[{ v: visits, l: 'زيارة', e: '🏥' }, { v: 3, l: 'دواء نشط', e: '💊' }, { v: 7, l: 'تحليل', e: '🧪' }].map((s, i) => (
              <motion.div key={i} variants={{ h:{opacity:0,y:10}, s:{opacity:1,y:0,transition:{type:'spring',damping:22}} }} className="text-center">
                <p className="text-white text-[22px] font-bold leading-none">{s.v}</p>
                <p className="text-white/35 text-[10px] mt-1">{s.e} {s.l}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Apple Health ────────────────────────────────── */}
      <div className="px-4 mt-4 mb-3">
        <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
          className="rounded-[18px] px-4 py-3 flex items-center gap-3"
          style={{ background: 'linear-gradient(135deg,#FF2D55 0%,#FF6B8A 100%)', boxShadow: '0 6px 20px rgba(255,45,85,0.22)' }}>
          <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
            <span className="text-[18px]">❤️</span>
          </div>
          <div className="flex-1">
            <p className="text-white font-bold text-[13px] leading-none mb-0.5">Apple Health</p>
            <p className="text-white/65 text-[10px]">مزامنة تلقائية · آخر تحديث ٥ دقائق</p>
          </div>
          <div className="flex items-center gap-1.5 bg-white/15 px-2.5 py-1 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" style={{ boxShadow:'0 0 4px #22C55E' }} />
            <span className="text-white text-[10px] font-semibold">نشط</span>
          </div>
        </motion.div>
      </div>

      {/* ── Next appointment ────────────────────────────── */}
      <div className="px-4 mb-3">
        <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.18, type:'spring', damping:22 }}>
          <div className="rounded-[22px] overflow-hidden" style={{ background:'#fff', boxShadow:'0 4px 24px rgba(11,74,111,0.10)' }}>
            <div className="px-4 py-3 flex items-center justify-between"
              style={{ background:'linear-gradient(135deg,#0B4A6F,#0077A8)' }}>
              <p className="text-white/80 text-[10px] font-semibold tracking-wide uppercase">موعدك القادم</p>
              <span className="text-[9px] bg-white/20 text-white font-bold px-2.5 py-0.5 rounded-full">مؤكد ✓</span>
            </div>
            <div className="px-4 py-3.5 flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold text-[16px] shrink-0"
                style={{ background:'linear-gradient(135deg,#0B4A6F,#00B4D8)' }}>س</div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-bold text-[#111]">د. سارة المطيري</p>
                <p className="text-[11px] text-[#AAA] mt-0.5">طب عام · الجمعة ٢٠ يوليو · ١٠:٣٠ ص</p>
              </div>
              <ChevronLeft size={15} className="text-[#CCC] shrink-0" />
            </div>
            {/* Apple Wallet */}
            <div className="px-4 pb-3.5">
              <div className="inline-flex items-center gap-2 bg-black rounded-[10px] px-3 py-1.5">
                <span className="text-[12px]">🎫</span>
                <span className="text-white text-[10px] font-semibold">محفوظ في Apple Wallet</span>
                <span className="text-white/40 text-[8px] font-mono">PKG</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Quick actions ────────────────────────────────── */}
      <div className="px-4 mb-4">
        <motion.div className="grid grid-cols-4 gap-2.5"
          initial="h" animate="s" variants={{ h:{}, s:{ transition:{ staggerChildren:0.06, delayChildren:0.25 } } }}>
          {quickActions.map((a, i) => (
            <motion.button key={i}
              variants={{ h:{opacity:0,y:12}, s:{opacity:1,y:0,transition:{type:'spring',damping:20}} }}
              whileTap={{ scale:0.88 }}
              className="flex flex-col items-center gap-2 py-3.5 rounded-[20px]"
              style={{ background:'#fff', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: a.bg }}>
                <a.icon size={18} style={{ color: a.color }} />
              </div>
              <p className="text-[10px] font-semibold text-[#444]">{a.label}</p>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* ── Apple Watch ─────────────────────────────────── */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-[13px] font-bold text-[#111]">Apple Watch</p>
          <p className="text-[10px] text-[#00B4D8] font-semibold">حلقات النشاط</p>
        </div>
        <div className="rounded-[22px] p-4 flex items-center gap-4"
          style={{ background: 'linear-gradient(135deg,#1C1C1E,#2C2C2E)', boxShadow:'0 8px 28px rgba(0,0,0,0.20)' }}>
          <WatchFace />
          <div className="flex-1 space-y-2.5">
            {[
              { e:'🔴', l:'حركة',    v:'380',   u:'كالوري', pct: 72, c:'#FF2D55' },
              { e:'🟢', l:'تمرين',   v:'28',    u:'دقيقة',  pct: 56, c:'#22C55E' },
              { e:'🔵', l:'النبض',   v:'72',    u:'bpm',    pct: 82, c:'#00B4D8' },
            ].map((r, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px]">{r.e}</span>
                    <span className="text-white/50 text-[10px]">{r.l}</span>
                  </div>
                  <span className="text-[10px] font-bold" style={{ color: r.c }}>{r.v} <span className="text-white/30 font-normal">{r.u}</span></span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background:'rgba(255,255,255,0.08)' }}>
                  <motion.div className="h-full rounded-full" style={{ background: r.c }}
                    initial={{ width:0 }} animate={{ width:`${r.pct}%` }}
                    transition={{ duration:1, delay:0.5+i*0.12 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Vitals ──────────────────────────────────────── */}
      <div className="px-4 mb-4">
        <p className="text-[13px] font-bold text-[#111] mb-2.5">المؤشرات الحيوية</p>
        <div className="grid grid-cols-3 gap-2.5">
          {vitals.map((v, i) => (
            <motion.div key={i}
              initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
              transition={{ delay:0.3+i*0.08, type:'spring', damping:20 }}
              className="rounded-[20px] p-3.5" style={{ background:'#fff', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2" style={{ background: v.bg }}>
                <v.icon size={15} style={{ color: v.color }} />
              </div>
              <p className="text-[9px] text-[#BBB] mb-0.5 leading-none">{v.label}</p>
              <p className="text-[16px] font-bold text-[#111] leading-none">{v.value}</p>
              <p className="text-[8px] text-[#CCC] mt-0.5">{v.unit}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Medication reminders ────────────────────────── */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-[13px] font-bold text-[#111]">تذكير الأدوية 💊</p>
          <span className="text-[10px] text-[#00B4D8] font-semibold">اليوم</span>
        </div>
        <div className="rounded-[22px] overflow-hidden" style={{ background:'#fff', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
          {meds.map((m, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3.5"
              style={{ borderBottom: i < meds.length-1 ? '1px solid #F5F7FA' : 'none' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background:`${m.color}18` }}>
                <span className="text-[16px]">💊</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-bold text-[#111]">{m.name}</p>
                <p className="text-[10px] text-[#AAA] mt-0.5">{m.time}</p>
              </div>
              {m.taken
                ? <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background:'#ECFDF5' }}>
                    <span className="text-[9px] font-bold text-[#10B981]">تم ✓</span>
                  </div>
                : <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background:'#FFFBEB' }}>
                    <span className="text-[9px] font-bold text-[#F59E0B]">لاحقاً</span>
                  </div>
              }
            </div>
          ))}
        </div>
      </div>

      {/* ── Family ──────────────────────────────────────── */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-[13px] font-bold text-[#111]">التابعون 👨‍👩‍👧</p>
          <span className="text-[10px] text-[#00B4D8] font-semibold">+ إضافة</span>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
          {family.map((f, i) => (
            <motion.div key={i} whileTap={{ scale:0.93 }}
              initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }}
              transition={{ delay:0.2+i*0.08, type:'spring', damping:22 }}
              className="flex flex-col items-center gap-2 p-3 rounded-[22px] shrink-0 w-[86px]"
              style={{ background:'#fff', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
              {/* Avatar with health ring */}
              <div className="relative" style={{ width:44, height:44 }}>
                <svg viewBox="0 0 44 44" className="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="22" cy="22" r="19" fill="none" stroke={`${f.color}25`} strokeWidth="3" />
                  <motion.circle cx="22" cy="22" r="19" fill="none" stroke={f.color} strokeWidth="3" strokeLinecap="round"
                    strokeDasharray={`${2*Math.PI*19}`} strokeDashoffset={`${2*Math.PI*19*(1-f.health/100)}`}
                    initial={{ strokeDashoffset:`${2*Math.PI*19}` }}
                    animate={{ strokeDashoffset:`${2*Math.PI*19*(1-f.health/100)}` }}
                    transition={{ duration:1, delay:0.4+i*0.1 }} />
                </svg>
                <div className="absolute inset-[5px] rounded-full flex items-center justify-center text-white text-[14px] font-bold"
                  style={{ background:`linear-gradient(135deg,${f.color},${f.color}BB)` }}>{f.av}</div>
              </div>
              <div className="text-center">
                <p className="text-[11px] font-bold text-[#111]">{f.name}</p>
                <p className="text-[9px] text-[#AAA]">{f.rel}</p>
              </div>
              <p className="text-[11px] font-bold" style={{ color: f.health >= 80 ? '#10B981' : f.health >= 65 ? '#F59E0B' : '#EF4444' }}>
                {f.health}%
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Weekly progress ─────────────────────────────── */}
      <div className="px-4 mb-4">
        <p className="text-[13px] font-bold text-[#111] mb-2.5">الالتزام الأسبوعي</p>
        <div className="rounded-[22px] p-4 space-y-3.5" style={{ background:'#fff', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
          {progress.map((p, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] text-[#666] font-medium">{p.label}</span>
                <span className="text-[12px] font-bold" style={{ color: p.color }}>{p.pct}%</span>
              </div>
              <div className="h-2.5 rounded-full overflow-hidden" style={{ background:'#F0F4F8' }}>
                <motion.div className="h-full rounded-full" style={{ background:`linear-gradient(90deg,${p.color}BB,${p.color})` }}
                  initial={{ width:0 }} animate={{ width:`${p.pct}%` }}
                  transition={{ duration:1.1, delay:0.5+i*0.14, ease:[0.4,0,0.2,1] }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tip ─────────────────────────────────────────── */}
      <div className="px-4 mb-28">
        <div className="rounded-[18px] p-4 flex gap-3"
          style={{ background:'linear-gradient(135deg,#EBF8FF,#E0F4FA)', border:'1px solid rgba(0,180,216,0.15)' }}>
          <span className="text-[22px] shrink-0 mt-0.5">💡</span>
          <div>
            <p className="text-[12px] font-bold text-[#0B4A6F] mb-1">نصيحة اليوم</p>
            <p className="text-[11px] text-[#555] leading-relaxed">
              اشرب ٨ أكواب من الماء يومياً للحفاظ على صحة جهازك الهضمي وتنظيم ضغط الدم.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
