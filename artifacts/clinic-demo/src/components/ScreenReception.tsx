import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle2, Clock, UserCheck } from 'lucide-react';

const appts = [
  { time:'٨:٣٠ ص', name:'أحمد الشمري',  doctor:'د. سارة المطيري', status:'arrived',  room:'١' },
  { time:'٩:٠٠ ص', name:'منيرة القحطاني',doctor:'د. خالد العتيبي', status:'waiting',  room:'٢' },
  { time:'٩:٣٠ ص', name:'سعد العنزي',    doctor:'د. نورة السبيعي', status:'waiting',  room:'٣' },
  { time:'١٠:٠٠ ص',name:'هند المطيري',   doctor:'د. سارة المطيري', status:'upcoming', room:'١' },
  { time:'١٠:٣٠ ص',name:'فيصل الدوسري', doctor:'د. خالد العتيبي', status:'upcoming', room:'٢' },
  { time:'١١:٠٠ ص',name:'ريم الزهراني', doctor:'د. نورة السبيعي', status:'upcoming', room:'٣' },
];

const statusCfg = {
  arrived: { label:'حضر',    color:'#34C759', bg:'rgba(52,199,89,0.15)'   },
  waiting: { label:'انتظار', color:'#FF9F0A', bg:'rgba(255,159,10,0.15)'  },
  upcoming:{ label:'قادم',   color:'#00B4D8', bg:'rgba(0,180,216,0.12)'   },
};

export function ScreenReception() {
  const [checked, setChecked] = useState<number[]>([0]);

  return (
    <div className="flex flex-col h-full bg-[#0A0F1A] text-white">
      {/* Header */}
      <div className="px-4 pt-4 pb-3" style={{ background:'linear-gradient(170deg,#0A1020,#0D1E10)' }}>
        <p className="text-[10px] text-white/40 mb-0.5">الإثنين، ٢١ يوليو</p>
        <h2 className="text-[16px] font-black">لوحة الاستقبال</h2>
        <div className="flex items-center gap-2 mt-2">
          {[['٤٧','إجمالي'],['٣١','قادم'],['١٢','انتظار'],['٤','حضر']].map(([v,l]) => (
            <div key={l} className="flex-1 rounded-[10px] py-1.5 text-center" style={{ background:'rgba(255,255,255,0.05)' }}>
              <p className="text-[12px] font-black text-white">{v}</p>
              <p className="text-[7px] text-white/35">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="px-3 py-2">
        <div className="flex items-center gap-2 rounded-[12px] px-3 py-2" style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.08)' }}>
          <Search size={11} className="text-white/30 shrink-0"/>
          <p className="text-[10px] text-white/25">ابحث عن مريض أو رقم ملف…</p>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto scrollbar-none px-3 space-y-2 pb-4">
        {appts.map((a, i) => {
          const cfg = statusCfg[a.status as keyof typeof statusCfg];
          const done = checked.includes(i);
          return (
            <motion.div key={i}
              initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.05 }}
              className="rounded-[14px] px-3 py-2.5 flex items-center gap-2.5"
              style={{ background: done ? 'rgba(52,199,89,0.07)' : 'rgba(255,255,255,0.04)', border:`1px solid ${done ? 'rgba(52,199,89,0.2)' : 'rgba(255,255,255,0.07)'}` }}>
              {/* Time */}
              <div className="text-center shrink-0 w-10">
                <p className="text-[9px] font-black text-white/50">{a.time}</p>
                <Clock size={8} className="text-white/25 mx-auto mt-0.5"/>
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold truncate">{a.name}</p>
                <p className="text-[8px] text-white/35 truncate">{a.doctor} · غرفة {a.room}</p>
              </div>
              {/* Status + action */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full" style={{ color:cfg.color, background:cfg.bg }}>{cfg.label}</span>
                {!done && a.status === 'waiting' && (
                  <button onClick={() => setChecked(p => [...p, i])}
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background:'rgba(52,199,89,0.15)', border:'1px solid rgba(52,199,89,0.3)' }}>
                    <UserCheck size={10} style={{ color:'#34C759' }}/>
                  </button>
                )}
                {done && <CheckCircle2 size={14} style={{ color:'#34C759' }}/>}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
