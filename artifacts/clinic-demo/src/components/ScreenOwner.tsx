import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, CalendarCheck, AlertCircle, Star, DollarSign } from 'lucide-react';

export function ScreenOwner() {
  const stats = [
    { label: 'إيرادات اليوم',   value: 'ر.س ١٢,٤٨٠', sub: '+٨٪ عن أمس',    icon: DollarSign, color: '#34C759', bg: 'rgba(52,199,89,0.12)'   },
    { label: 'المرضى اليوم',    value: '٤٧',          sub: '١١ في الانتظار', icon: Users,      color: '#00B4D8', bg: 'rgba(0,180,216,0.12)'   },
    { label: 'نسبة الحضور',     value: '٩٢٪',         sub: '٤ غياب',         icon: CalendarCheck, color: '#AF52DE', bg: 'rgba(175,82,222,0.12)'},
    { label: 'تقييم هذا الشهر', value: '٤.٩ ★',       sub: '٢١٣ تقييم',      icon: Star,       color: '#FF9F0A', bg: 'rgba(255,159,10,0.12)'  },
  ];

  const doctors = [
    { name: 'د. سارة المطيري', spec: 'طب عام',       patients: 18, color: '#00B4D8' },
    { name: 'د. خالد العتيبي', spec: 'قلب وأوعية',   patients: 12, color: '#AF52DE' },
    { name: 'د. نورة السبيعي', spec: 'جلدية وتجميل', patients: 9,  color: '#FF9F0A' },
  ];

  const alerts = [
    { text: 'الدكتور محمد تأخر ٢٠ دقيقة', type: 'warn' },
    { text: 'غرفة ٥ تحتاج صيانة', type: 'error' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0A0F1A] text-white">
      {/* Header */}
      <div className="px-4 pt-4 pb-3" style={{ background: 'linear-gradient(170deg,#0A1020,#101828)' }}>
        <p className="text-[10px] text-white/40 mb-0.5">الإثنين، ٢١ يوليو</p>
        <h2 className="text-[16px] font-black">لوحة المالك</h2>
        <p className="text-[10px] text-white/45 mt-0.5">تلقا العيادات — الفرع الرئيسي</p>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none px-3 py-3 space-y-3">

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay: i*0.06 }}
              className="rounded-[16px] p-3" style={{ background: s.bg, border: `1px solid ${s.color}22` }}>
              <s.icon size={13} style={{ color: s.color }} className="mb-1.5"/>
              <p className="text-[15px] font-black leading-none" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[9px] text-white/50 mt-0.5">{s.label}</p>
              <p className="text-[8px] mt-0.5" style={{ color: s.color }}>{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Revenue chart bar */}
        <div className="rounded-[16px] p-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-[10px] font-bold text-white/70 mb-2 flex items-center gap-1">
            <TrendingUp size={10} style={{ color:'#34C759' }}/> الإيرادات — آخر ٧ أيام
          </p>
          <div className="flex items-end gap-1.5 h-14">
            {[40,65,50,80,72,90,78].map((h, i) => (
              <motion.div key={i} className="flex-1 rounded-t-[4px]"
                initial={{ height:0 }} animate={{ height: `${h}%` }}
                transition={{ delay: 0.3 + i*0.05, duration:0.5, ease:'easeOut' }}
                style={{ background: i===5 ? 'linear-gradient(to top,#00B4D8,#34C759)' : 'rgba(0,180,216,0.25)' }}/>
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {['إث','ثلا','أرب','خمي','جمع','سبت','أحد'].map(d => (
              <span key={d} className="text-[7px] text-white/25 flex-1 text-center">{d}</span>
            ))}
          </div>
        </div>

        {/* Doctors performance */}
        <div className="rounded-[16px] overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-[10px] font-bold text-white/70 px-3 pt-2.5 pb-2">أداء الأطباء اليوم</p>
          {doctors.map((d, i) => (
            <div key={i} className="flex items-center gap-2.5 px-3 py-2"
              style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <div className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-[11px] font-black"
                style={{ background: `${d.color}22`, color: d.color }}>{d.name[3]}</div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold truncate">{d.name}</p>
                <p className="text-[8px] text-white/35">{d.spec}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-black" style={{ color: d.color }}>{d.patients}</p>
                <p className="text-[7px] text-white/30">مريض</p>
              </div>
            </div>
          ))}
        </div>

        {/* Alerts */}
        {alerts.map((a, i) => (
          <div key={i} className="flex items-center gap-2 rounded-[12px] px-3 py-2.5"
            style={{ background: a.type==='error' ? 'rgba(239,68,68,0.1)' : 'rgba(255,159,10,0.1)', border: `1px solid ${a.type==='error' ? 'rgba(239,68,68,0.25)' : 'rgba(255,159,10,0.25)'}` }}>
            <AlertCircle size={11} style={{ color: a.type==='error' ? '#FF6B6B' : '#FF9F0A', shrink:0 }}/>
            <p className="text-[10px]" style={{ color: a.type==='error' ? '#FF6B6B' : '#FF9F0A' }}>{a.text}</p>
          </div>
        ))}

        <div style={{ height: 16 }}/>
      </div>
    </div>
  );
}
