import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, ChevronLeft, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const results = [
  {
    category: 'تحليل الدم الشامل (CBC)',
    date: '١٥ يوليو ٢٠٢٦',
    lab: 'مختبر النخبة',
    items: [
      { name: 'هيموغلوبين', value: '14.2', unit: 'g/dL', normal: '13.5–17.5', status: 'normal' },
      { name: 'خلايا الدم البيضاء', value: '9.8', unit: 'K/µL', normal: '4.5–11.0', status: 'normal' },
      { name: 'الصفائح الدموية', value: '420', unit: 'K/µL', normal: '150–400', status: 'high' },
    ],
  },
  {
    category: 'السكر والكوليسترول',
    date: '١٠ يوليو ٢٠٢٦',
    lab: 'مختبر النخبة',
    items: [
      { name: 'سكر الصيام',       value: '95',  unit: 'mg/dL', normal: '70–100',   status: 'normal' },
      { name: 'كوليسترول كلي',    value: '215', unit: 'mg/dL', normal: '< 200',    status: 'high'   },
      { name: 'HDL (كوليسترول جيد)', value: '55', unit: 'mg/dL', normal: '> 40',  status: 'normal' },
      { name: 'LDL (كوليسترول ضار)', value: '140', unit: 'mg/dL', normal: '< 130', status: 'high' },
    ],
  },
  {
    category: 'وظائف الكلى والكبد',
    date: '١ يوليو ٢٠٢٦',
    lab: 'مختبر الأمل',
    items: [
      { name: 'كرياتينين', value: '0.9', unit: 'mg/dL', normal: '0.7–1.2', status: 'normal' },
      { name: 'يوريا',     value: '18',  unit: 'mg/dL', normal: '7–25',    status: 'normal' },
      { name: 'SGPT/ALT',  value: '32',  unit: 'U/L',   normal: '< 40',    status: 'normal' },
    ],
  },
];

const statusConfig = {
  normal: { label: 'طبيعي',  color: '#22C55E', bg: '#22C55E15', icon: Minus },
  high:   { label: 'مرتفع',  color: '#EF4444', bg: '#EF444415', icon: TrendingUp },
  low:    { label: 'منخفض',  color: '#F59E0B', bg: '#F59E0B15', icon: TrendingDown },
};

export function ScreenResults() {
  const [expanded, setExpanded] = useState<number>(0);

  return (
    <div className="flex flex-col h-full" style={{ background: '#F0F8FF' }}>
      {/* Header */}
      <div className="shrink-0 px-5 pt-5 pb-4" style={{ background: 'linear-gradient(160deg,#050E1A,#0B3A5A)' }}>
        <p className="text-white/40 text-[10px] mb-0.5">آخر تحديث: اليوم</p>
        <p className="text-white text-[18px] font-bold">نتائجي الطبية</p>
        {/* Summary pills */}
        <div className="flex gap-2 mt-3">
          {[
            { label: '٣ تحاليل', color: '#00B4D8' },
            { label: '٤ طبيعية', color: '#22C55E' },
            { label: '٣ مرتفعة', color: '#EF4444' },
          ].map((p, i) => (
            <span key={i} className="text-[9px] font-bold px-2.5 py-1 rounded-full" style={{ background: `${p.color}20`, color: p.color }}>
              {p.label}
            </span>
          ))}
        </div>
      </div>

      {/* Results list */}
      <div className="flex-1 overflow-y-auto scrollbar-none px-4 py-4 pb-28 space-y-3">
        {results.map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <button
              onClick={() => setExpanded(expanded === i ? -1 : i)}
              className="w-full bg-white rounded-[18px] px-4 py-3.5 flex items-center justify-between border border-[rgba(11,74,111,0.08)] shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
            >
              <div className="text-right">
                <p className="text-[13px] font-bold text-[#111]">{r.category}</p>
                <p className="text-[10px] text-[#AAA]">{r.date} · {r.lab}</p>
              </div>
              <div className="flex items-center gap-2">
                {r.items.some(it => it.status !== 'normal') && (
                  <span className="text-[9px] bg-[#EF4444]/10 text-[#EF4444] font-bold px-2 py-0.5 rounded-full">يحتاج مراجعة</span>
                )}
                <ChevronLeft size={14} className={`text-[#CCC] transition-transform ${expanded === i ? '-rotate-90' : ''}`} />
              </div>
            </button>

            {expanded === i && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                className="bg-white mx-1 rounded-b-[18px] border border-t-0 border-[rgba(11,74,111,0.08)] shadow-[0_4px_12px_rgba(0,0,0,0.04)] overflow-hidden">
                {r.items.map((item, j) => {
                  const cfg = statusConfig[item.status as keyof typeof statusConfig];
                  const Icon = cfg.icon;
                  return (
                    <div key={j} className={`flex items-center justify-between px-4 py-3 ${j < r.items.length - 1 ? 'border-b border-[#F5F5F5]' : ''}`}>
                      <div>
                        <p className="text-[12px] font-semibold text-[#333]">{item.name}</p>
                        <p className="text-[9px] text-[#BBB] font-inter">المرجع: {item.normal}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <p className="text-[14px] font-bold text-[#111] font-inter">{item.value}</p>
                          <p className="text-[9px] text-[#BBB] font-inter">{item.unit}</p>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: cfg.bg }}>
                          <Icon size={10} style={{ color: cfg.color }} />
                          <span className="text-[9px] font-bold" style={{ color: cfg.color }}>{cfg.label}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </motion.div>
        ))}

        {/* Upload card */}
        <div className="bg-white rounded-[18px] p-4 border border-dashed border-[rgba(0,180,216,0.3)] flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(0,180,216,0.1)' }}>
            <Upload size={16} className="text-[#00B4D8]" />
          </div>
          <div>
            <p className="text-[13px] font-bold text-[#0B4A6F]">رفع تقرير طبي</p>
            <p className="text-[10px] text-[#AAA]">PDF · صورة · DICOM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
