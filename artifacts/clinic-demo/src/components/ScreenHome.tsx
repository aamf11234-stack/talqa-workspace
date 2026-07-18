import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, ChevronLeft, Activity, Droplets, Heart, CalendarCheck, FileText, BookOpen, Phone } from 'lucide-react';

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

function HealthRing({ score }: { score: number }) {
  const r = 52, circ = 2 * Math.PI * r, dash = circ * (1 - score / 100);
  return (
    <svg width="136" height="136" viewBox="0 0 136 136" className="mx-auto drop-shadow-lg">
      <circle cx="68" cy="68" r={r} fill="none" stroke="rgba(0,180,216,0.10)" strokeWidth="11" />
      <motion.circle cx="68" cy="68" r={r} fill="none" strokeWidth="11" strokeLinecap="round"
        stroke="url(#ring-g)" strokeDasharray={circ} strokeDashoffset={circ}
        animate={{ strokeDashoffset: dash }} transition={{ duration: 1.5, ease: [0.4,0,0.2,1], delay: 0.2 }}
        transform="rotate(-90 68 68)" />
      <defs>
        <linearGradient id="ring-g" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00B4D8" /><stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
      </defs>
      <motion.text x="68" y="62" textAnchor="middle" fill="white" fontSize="28" fontWeight="700"
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}>{score}</motion.text>
      <text x="68" y="78" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="10" fontFamily="Tajawal,sans-serif">درجة الصحة</text>
    </svg>
  );
}

const quickActions = [
  { icon: CalendarCheck, label: 'احجز',   color: '#0B4A6F' },
  { icon: FileText,      label: 'نتائجي', color: '#00B4D8' },
  { icon: BookOpen,      label: 'وصفتي',  color: '#22C55E' },
  { icon: Phone,         label: 'اتصل',   color: '#F59E0B' },
];

const vitals = [
  { icon: Heart,    label: 'ضغط الدم', value: '120/80', unit: 'mmHg', color: '#EF4444' },
  { icon: Droplets, label: 'السكر',    value: '95',      unit: 'mg/dL', color: '#3B82F6' },
  { icon: Activity, label: 'النبض',    value: '72',      unit: 'bpm',   color: '#22C55E' },
];

const meds = [
  { name: 'ميتفورمين ٥٠٠mg', time: '٨:٠٠ ص', taken: true,  color: '#22C55E' },
  { name: 'فيتامين د',        time: '١:٠٠ م', taken: false, color: '#F59E0B' },
  { name: 'أوميبرازول',       time: '٨:٠٠ م', taken: false, color: '#00B4D8' },
];

const family = [
  { name: 'سارة',   rel: 'الزوجة',  health: 91, color: '#EC4899', avatar: 'س' },
  { name: 'فيصل',   rel: 'الابن',   health: 78, color: '#3B82F6', avatar: 'ف' },
  { name: 'منيرة',  rel: 'الأم',    health: 65, color: '#F59E0B', avatar: 'م' },
];

export function ScreenHome() {
  const visits = useCounter(24);

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-none" style={{ background: '#F0F8FF' }}>

      {/* ── Dark hero ─────────────────────────────────── */}
      <div className="relative overflow-hidden shrink-0 pb-8"
        style={{ background: 'linear-gradient(160deg,#050E1A 0%,#0B3A5A 45%,#050E1A 80%)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 72% 38%,rgba(0,180,216,0.22) 0%,transparent 62%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-20 opacity-[0.055]"
          style={{ backgroundImage: 'radial-gradient(circle,#00B4D8 1px,transparent 1px)', backgroundSize: '13px 13px' }} />

        <div className="relative z-10 flex items-center justify-between px-5 pt-3 pb-2">
          <div>
            <p className="text-white/35 text-[10px]">مرحباً بك 👋</p>
            <p className="text-white text-[16px] font-bold leading-tight">أحمد الشمري</p>
          </div>
          <div className="flex items-center gap-2">
            <motion.button whileTap={{ scale: 0.88 }}
              className="relative w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.08)' }}>
              <Bell size={14} className="text-white/60" />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#EF4444] rounded-full" />
            </motion.button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[13px] font-bold"
              style={{ background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)' }}>أ</div>
          </div>
        </div>

        <div className="relative z-10 pt-1 pb-2"><HealthRing score={82} /></div>

        <motion.div className="relative z-10 flex justify-around px-5"
          initial="hidden" animate="show" variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.07 } } }}>
          {[{ label:'زيارة', value:visits, emoji:'🏥' },{ label:'دواء نشط', value:3, emoji:'💊' },{ label:'تحليل', value:7, emoji:'🧪' }].map((s,i) => (
            <motion.div key={i} variants={{ hidden:{opacity:0,y:12}, show:{opacity:1,y:0,transition:{type:'spring',damping:22,stiffness:200}} }} className="text-center">
              <p className="text-white text-[20px] font-bold leading-none">{s.value}</p>
              <p className="text-white/35 text-[10px] mt-0.5">{s.emoji} {s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Apple Health banner ───────────────────────── */}
      <motion.div className="px-4 mt-3 mb-3" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.15 }}>
        <div className="rounded-[16px] px-4 py-3 flex items-center gap-3"
          style={{ background: 'linear-gradient(135deg,#FF2D55,#FF6B8A)', boxShadow:'0 4px 16px rgba(255,45,85,0.2)' }}>
          <span className="text-2xl shrink-0">❤️</span>
          <div className="flex-1">
            <p className="text-white text-[12px] font-bold leading-none mb-0.5">Apple Health</p>
            <p className="text-white/70 text-[10px]">متزامن · آخر تحديث منذ ٥ دقائق</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />
            <p className="text-white text-[10px] font-semibold">نشط</p>
          </div>
        </div>
      </motion.div>

      {/* ── Next appointment ──────────────────────────── */}
      <motion.div className="px-4 mb-3 relative z-10"
        initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.25, type:'spring', damping:22 }}>
        <div className="bg-white rounded-[20px] overflow-hidden border border-[rgba(11,74,111,0.1)] shadow-[0_6px_24px_rgba(11,74,111,0.10)]">
          <div className="px-4 pt-3.5 pb-2 flex items-center justify-between border-b border-[#F4F8FF]">
            <p className="text-[10px] font-bold text-[#0B4A6F] tracking-wider uppercase">موعدك القادم</p>
            <span className="text-[9px] bg-[#22C55E]/10 text-[#22C55E] font-bold px-2.5 py-0.5 rounded-full">مؤكد ✓</span>
          </div>
          <div className="px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-[15px] shrink-0"
              style={{ background: 'linear-gradient(135deg,#0B4A6F,#00B4D8)' }}>س</div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold text-[#111]">د. سارة المطيري</p>
              <p className="text-[10px] text-[#AAA]">طب عام · الجمعة ٢٠ يوليو · ١٠:٣٠ ص</p>
            </div>
            <ChevronLeft size={14} className="text-[#DDD] shrink-0" />
          </div>
          {/* Apple Wallet badge */}
          <div className="px-4 pb-3">
            <div className="flex items-center gap-2 bg-black rounded-[10px] px-3 py-2 w-fit">
              <span className="text-[14px]">🎫</span>
              <span className="text-white text-[10px] font-semibold">محفوظ في Apple Wallet</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Quick actions ─────────────────────────────── */}
      <div className="px-4 mb-3">
        <motion.div className="grid grid-cols-4 gap-2"
          initial="hidden" animate="show"
          variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.055, delayChildren:0.3 } } }}>
          {quickActions.map((a, i) => (
            <motion.button key={i}
              variants={{ hidden:{opacity:0,y:10}, show:{opacity:1,y:0,transition:{type:'spring',damping:20}} }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-1.5 bg-white rounded-[16px] py-3 border border-[rgba(11,74,111,0.07)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background:`${a.color}14` }}>
                <a.icon size={16} style={{ color: a.color }} />
              </div>
              <p className="text-[10px] font-semibold text-[#555]">{a.label}</p>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* ── Apple Watch ───────────────────────────────── */}
      <div className="px-4 mb-3">
        <p className="text-[12px] font-bold text-[#0B4A6F] mb-2">Apple Watch</p>
        <div className="bg-black rounded-[20px] p-4 flex items-center gap-4"
          style={{ boxShadow:'0 4px 20px rgba(0,0,0,0.15)' }}>
          {/* Watch face */}
          <div className="w-16 h-20 rounded-[16px] border-[3px] border-[#333] flex flex-col items-center justify-center gap-1 shrink-0"
            style={{ background: 'linear-gradient(160deg,#111,#1a1a1a)' }}>
            <p className="text-white text-[8px] font-light opacity-50">9:41</p>
            <div className="relative w-10 h-10">
              <svg viewBox="0 0 40 40" className="w-full h-full -rotate-90">
                <circle cx="20" cy="20" r="16" fill="none" stroke="#FF2D55" strokeWidth="3" opacity="0.3"/>
                <circle cx="20" cy="20" r="16" fill="none" stroke="#FF2D55" strokeWidth="3"
                  strokeDasharray="100" strokeDashoffset="28" strokeLinecap="round"/>
                <circle cx="20" cy="20" r="11" fill="none" stroke="#22C55E" strokeWidth="3" opacity="0.3"/>
                <circle cx="20" cy="20" r="11" fill="none" stroke="#22C55E" strokeWidth="3"
                  strokeDasharray="70" strokeDashoffset="14" strokeLinecap="round"/>
                <circle cx="20" cy="20" r="6" fill="none" stroke="#00B4D8" strokeWidth="3" opacity="0.3"/>
                <circle cx="20" cy="20" r="6" fill="none" stroke="#00B4D8" strokeWidth="3"
                  strokeDasharray="38" strokeDashoffset="10" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-[#22C55E] text-[7px] font-bold">72 BPM</p>
          </div>
          <div className="flex-1">
            <p className="text-white text-[12px] font-bold mb-2">مقاييس اليوم</p>
            <div className="space-y-1.5">
              {[['❤️','النبض','72 bpm','#FF2D55'],['🔥','السعرات','380 kcal','#F97316'],['🚶','الخطوات','4,218','#22C55E']].map(([e,l,v,c]) => (
                <div key={l} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px]">{e}</span>
                    <span className="text-[10px]" style={{ color:'rgba(255,255,255,0.5)' }}>{l}</span>
                  </div>
                  <span className="text-[10px] font-bold" style={{ color: c as string }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Vitals ────────────────────────────────────── */}
      <div className="px-4 mb-3">
        <p className="text-[12px] font-bold text-[#0B4A6F] mb-2">المؤشرات الحيوية</p>
        <motion.div className="grid grid-cols-3 gap-2"
          initial="hidden" animate="show"
          variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.07, delayChildren:0.4 } } }}>
          {vitals.map((v, i) => (
            <motion.div key={i}
              variants={{ hidden:{opacity:0,scale:0.93}, show:{opacity:1,scale:1,transition:{type:'spring',damping:20}} }}
              className="bg-white rounded-[16px] p-3 border border-[rgba(11,74,111,0.07)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <v.icon size={13} style={{ color: v.color }} className="mb-1.5" />
              <p className="text-[9.5px] text-[#BBB] mb-0.5">{v.label}</p>
              <p className="text-[15px] font-bold text-[#111] leading-none">{v.value}</p>
              <p className="text-[8px] text-[#CCC] mt-0.5">{v.unit}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Medication reminders ──────────────────────── */}
      <div className="px-4 mb-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[12px] font-bold text-[#0B4A6F]">تذكير الأدوية</p>
          <span className="text-[9px] text-[#00B4D8] font-semibold">اليوم</span>
        </div>
        <div className="bg-white rounded-[18px] overflow-hidden border border-[rgba(11,74,111,0.07)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          {meds.map((m, i) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3 ${i < meds.length-1 ? 'border-b border-[#F5F5F5]' : ''}`}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[14px] shrink-0"
                style={{ background:`${m.color}15` }}>💊</div>
              <div className="flex-1">
                <p className="text-[12px] font-semibold text-[#111]">{m.name}</p>
                <p className="text-[10px] text-[#AAA]">{m.time}</p>
              </div>
              {m.taken
                ? <span className="text-[9px] bg-[#22C55E]/10 text-[#22C55E] font-bold px-2 py-0.5 rounded-full">تم أخذه ✓</span>
                : <span className="text-[9px] bg-[#F59E0B]/10 text-[#F59E0B] font-bold px-2 py-0.5 rounded-full">لم يُؤخذ</span>
              }
            </div>
          ))}
        </div>
      </div>

      {/* ── Family / dependents ───────────────────────── */}
      <div className="px-4 mb-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[12px] font-bold text-[#0B4A6F]">التابعون</p>
          <span className="text-[9px] text-[#00B4D8] font-semibold">+ إضافة فرد</span>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
          {family.map((f, i) => (
            <motion.div key={i} whileTap={{ scale:0.95 }}
              className="bg-white rounded-[18px] p-3 border border-[rgba(11,74,111,0.07)] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col items-center gap-1.5 shrink-0 w-[88px]">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[14px] font-bold"
                style={{ background:`linear-gradient(135deg,${f.color},${f.color}99)` }}>{f.avatar}</div>
              <p className="text-[11px] font-semibold text-[#111]">{f.name}</p>
              <p className="text-[9px] text-[#AAA]">{f.rel}</p>
              {/* Mini health bar */}
              <div className="w-full h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ background: f.health >= 80 ? '#22C55E' : f.health >= 65 ? '#F59E0B' : '#EF4444' }}
                  initial={{ width:0 }} animate={{ width:`${f.health}%` }} transition={{ duration:1, delay:0.5+i*0.1 }} />
              </div>
              <p className="text-[9px] font-bold text-[#555]">{f.health}%</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Weekly progress ───────────────────────────── */}
      <div className="px-4 mb-3">
        <p className="text-[12px] font-bold text-[#0B4A6F] mb-2">الالتزام الأسبوعي</p>
        <div className="bg-white rounded-[18px] p-4 border border-[rgba(11,74,111,0.07)] shadow-[0_2px_8px_rgba(0,0,0,0.04)] space-y-3">
          {[{label:'الدواء',pct:86,color:'#22C55E'},{label:'المشي ٣٠ دقيقة',pct:60,color:'#00B4D8'},{label:'الماء ٨ أكواب',pct:72,color:'#3B82F6'}].map((p,i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-[#777]">{p.label}</span>
                <span className="text-[11px] font-bold text-[#111]">{p.pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-[#F0F0F0] overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ background:p.color }}
                  initial={{ width:0 }} animate={{ width:`${p.pct}%` }}
                  transition={{ duration:1, delay:0.5+i*0.12, ease:[0.4,0,0.2,1] }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Health tip ────────────────────────────────── */}
      <div className="px-4 mb-28">
        <motion.div initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.7 }}
          className="rounded-[18px] p-4 flex gap-3"
          style={{ background:'linear-gradient(135deg,#0B4A6F09,#00B4D808)', border:'1px solid rgba(0,180,216,0.12)' }}>
          <span className="text-2xl shrink-0">💡</span>
          <div>
            <p className="text-[11px] font-bold text-[#0B4A6F] mb-0.5">نصيحة اليوم</p>
            <p className="text-[11px] text-[#666] font-light leading-snug">
              اشرب ٨ أكواب من الماء يومياً للحفاظ على صحة جهازك الهضمي وتنظيم ضغط الدم.
            </p>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
