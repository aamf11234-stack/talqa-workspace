import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock, ChevronLeft, X, CheckCircle } from 'lucide-react';

const SPECS = ['الكل','طب عام','قلب','عيون','عظام','جلدية','أطفال','نساء'];

const doctors = [
  { name:'د. سارة المطيري',  spec:'طب عام',     rating:4.9, reviews:312, exp:12, next:'اليوم ٢:٣٠ م',    fee:150, av:'س', color:'#0B4A6F', avail:true,  bio:'استشارية طب الأسرة والأمراض المزمنة وصحة المرأة.', langs:['العربية','الإنجليزية'] },
  { name:'د. فهد الحربي',    spec:'قلب',         rating:4.8, reviews:198, exp:18, next:'الجمعة ١٠:٠٠ ص', fee:350, av:'ف', color:'#00B4D8', avail:true,  bio:'استشاري أمراض القلب والقسطرة · زمالة أوروبية.', langs:['العربية','الإنجليزية','الفرنسية'] },
  { name:'د. منى القحطاني',  spec:'جلدية',       rating:4.7, reviews:275, exp:9,  next:'السبت ١١:٠٠ ص',  fee:200, av:'م', color:'#10B981', avail:true,  bio:'متخصصة في الجلدية التجميلية وعلاج الحالات المزمنة.', langs:['العربية'] },
  { name:'د. خالد العتيبي',  spec:'عيون',        rating:4.6, reviews:154, exp:14, next:'الأحد ٩:٠٠ ص',   fee:250, av:'خ', color:'#F59E0B', avail:false, bio:'جراح عيون · متخصص في الليزك والمياه البيضاء.', langs:['العربية','الإنجليزية'] },
  { name:'د. ريم الغامدي',   spec:'أطفال',       rating:4.9, reviews:421, exp:11, next:'الأحد ١٢:٠٠ م',  fee:180, av:'ر', color:'#EC4899', avail:true,  bio:'استشارية طب الأطفال · متخصصة في التطوير والتغذية.', langs:['العربية','الإنجليزية'] },
  { name:'د. عمر الشهراني',  spec:'عظام',        rating:4.7, reviews:89,  exp:16, next:'الثلاثاء ٣:٠٠ م',fee:300, av:'ع', color:'#8B5CF6', avail:true,  bio:'جراح عظام ومفاصل · خبرة في المنظار والعمليات الدقيقة.', langs:['العربية'] },
];

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="10" height="10" viewBox="0 0 10 10" fill={i <= Math.round(n) ? '#F59E0B' : '#E5E7EB'}>
          <path d="M5 1l1.1 2.3 2.5.4-1.8 1.7.4 2.5L5 6.8l-2.2 1.1.4-2.5L1.4 3.7l2.5-.4z"/>
        </svg>
      ))}
    </span>
  );
}

function BookModal({ doc, onClose }: { doc: typeof doctors[0]; onClose: () => void }) {
  const [done, setDone] = useState(false);
  const [sel, setSel] = useState<string|null>(null);
  const times = ['٩:٠٠ ص','٩:٣٠ ص','١٠:٠٠ ص','١١:٣٠ ص','٢:٠٠ م','٢:٣٠ م','٣:٠٠ م'];

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      className="absolute inset-0 z-50 flex items-end"
      style={{ background:'rgba(0,0,0,0.5)', backdropFilter:'blur(4px)' }} onClick={onClose}>
      <motion.div initial={{ y:340 }} animate={{ y:0 }} exit={{ y:340 }}
        transition={{ type:'spring', damping:28, stiffness:220 }}
        className="w-full rounded-t-[32px] overflow-hidden"
        style={{ background:'#fff', boxShadow:'0 -8px 40px rgba(0,0,0,0.15)' }}
        onClick={e => e.stopPropagation()}>

        {done ? (
          <div className="flex flex-col items-center py-10 px-6">
            <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:'spring', damping:14, delay:0.05 }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ background:'linear-gradient(135deg,#ECFDF5,#D1FAE5)' }}>
                <CheckCircle size={36} style={{ color:'#10B981' }} />
              </div>
            </motion.div>
            <motion.div initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2 }} className="text-center">
              <p className="text-[18px] font-bold text-[#111] mb-1">تم تسجيل موعدك!</p>
              <p className="text-[12px] text-[#999] leading-relaxed mb-6">{doc.name} · {sel}<br/>ستصلك رسالة على الواتساب</p>
              <motion.div initial={{ opacity:0,y:6 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.4 }}>
                <button className="w-full flex items-center justify-center gap-2 bg-black py-3.5 rounded-[16px] text-white font-bold text-[13px]">
                  <span className="text-[16px]">🎫</span> أضف إلى Apple Wallet
                </button>
              </motion.div>
            </motion.div>
          </div>
        ) : (
          <>
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1"><div className="w-8 h-1 rounded-full bg-[#E5E5E5]" /></div>
            <div className="flex items-center justify-between px-5 pb-3 border-b border-[#F5F7FA]">
              <div>
                <p className="text-[15px] font-bold text-[#111]">{doc.name}</p>
                <p className="text-[11px] text-[#BBB]">{doc.spec} · الكشف {doc.fee} ر.س</p>
              </div>
              <motion.button whileTap={{ scale:0.88 }} onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background:'#F2F6FB' }}>
                <X size={14} className="text-[#999]" />
              </motion.button>
            </div>
            <div className="px-5 pt-4 pb-2 overflow-y-auto max-h-[50vh] scrollbar-none">
              <p className="text-[11px] font-bold text-[#0B4A6F] mb-3">اختر الوقت المناسب</p>
              <div className="grid grid-cols-3 gap-2 mb-5">
                {times.map(t => (
                  <motion.button key={t} whileTap={{ scale:0.93 }} onClick={() => setSel(t)}
                    className="py-2.5 rounded-[14px] text-[11px] font-bold transition-all"
                    style={sel===t
                      ? { background:`linear-gradient(135deg,${doc.color},${doc.color}CC)`, color:'#fff', boxShadow:`0 4px 12px ${doc.color}40` }
                      : { background:'#F2F6FB', color:'#555' }}>
                    {t}
                  </motion.button>
                ))}
              </div>
              <div className="rounded-[18px] p-3.5 mb-4 flex items-center gap-3"
                style={{ background:'#F8FBFF', border:'1px solid rgba(11,74,111,0.08)' }}>
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white text-[15px] font-bold shrink-0"
                  style={{ background:`linear-gradient(135deg,${doc.color},${doc.color}BB)` }}>{doc.av}</div>
                <div>
                  <p className="text-[12px] font-bold text-[#111]">{doc.name}</p>
                  <p className="text-[10px] text-[#BBB]">{doc.spec} · {doc.exp} سنوات خبرة</p>
                </div>
              </div>
            </div>
            <div className="px-5 pb-6 pt-2">
              <motion.button whileTap={{ scale:0.97 }} onClick={() => sel && setDone(true)} disabled={!sel}
                className="w-full py-4 rounded-[18px] text-white font-bold text-[14px] transition-all"
                style={{ background:sel ? `linear-gradient(135deg,${doc.color},${doc.color}CC)` : '#E5E7EB', color:sel?'#fff':'#CCC', boxShadow:sel?`0 8px 24px ${doc.color}35`:'none' }}>
                تأكيد الحجز · {doc.fee} ر.س
              </motion.button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export function ScreenDoctors() {
  const [spec, setSpec]   = useState('الكل');
  const [query, setQuery] = useState('');
  const [open, setOpen]   = useState<string|null>(null);
  const [book, setBook]   = useState<typeof doctors[0]|null>(null);

  const filtered = doctors.filter(d =>
    (spec==='الكل' || d.spec===spec || (spec==='قلب' && d.spec==='قلب')) &&
    (query==='' || d.name.includes(query) || d.spec.includes(query))
  );

  return (
    <div className="flex flex-col h-full" style={{ background:'#F2F6FB', fontFamily:'Tajawal,sans-serif' }}>

      {/* Header */}
      <div className="shrink-0 px-5 pt-5 pb-4 relative overflow-hidden"
        style={{ background:'linear-gradient(160deg,#06101E 0%,#0B3A5A 60%,#06101E 100%)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:'radial-gradient(ellipse at 70% 30%,rgba(0,180,216,0.18) 0%,transparent 60%)' }} />
        <div className="relative z-10">
          <p className="text-white/40 text-[10px] mb-1">{doctors.length} طبيب وطبيبة</p>
          <p className="text-white text-[20px] font-bold mb-3">فريقنا الطبي</p>
          <div className="flex items-center gap-2.5 bg-white/8 rounded-[14px] px-3.5 py-2.5"
            style={{ border:'1px solid rgba(255,255,255,0.08)' }}>
            <Search size={13} className="text-white/35 shrink-0" />
            <input value={query} onChange={e => setQuery(e.target.value)}
              placeholder="ابحث عن طبيب أو تخصص..."
              className="bg-transparent text-white text-[12px] outline-none placeholder:text-white/25 w-full text-right"
              style={{ fontFamily:'Tajawal,sans-serif' }} />
          </div>
        </div>
      </div>

      {/* Spec pills */}
      <div className="shrink-0 px-4 py-3 border-b border-[rgba(11,74,111,0.06)]" style={{ background:'rgba(255,255,255,0.8)', backdropFilter:'blur(8px)' }}>
        <div className="flex gap-2 overflow-x-auto scrollbar-none">
          {SPECS.map(s => (
            <motion.button key={s} whileTap={{ scale:0.93 }} onClick={() => setSpec(s)}
              className="shrink-0 px-3.5 py-1.5 rounded-full text-[10px] font-bold transition-all"
              style={spec===s
                ? { background:'linear-gradient(135deg,#0B4A6F,#00B4D8)', color:'#fff', boxShadow:'0 3px 10px rgba(11,74,111,0.25)' }
                : { background:'#fff', color:'#888', border:'1px solid rgba(11,74,111,0.10)' }}>
              {s}
            </motion.button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto scrollbar-none px-4 py-4 pb-28 space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((d, i) => (
            <motion.div key={d.name} layout
              initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, scale:0.95 }}
              transition={{ delay:i*0.06 }}
              className="rounded-[22px] overflow-hidden"
              style={{ background:'#fff', boxShadow:'0 2px 14px rgba(0,0,0,0.06)' }}>

              {/* Top accent */}
              <div className="h-[3px]" style={{ background:`linear-gradient(90deg,${d.color}80,${d.color}20,transparent)` }} />

              <button className="w-full px-4 pt-3.5 pb-3 flex items-center gap-3.5 text-right"
                onClick={() => setOpen(open===d.name ? null : d.name)}>
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-[17px]"
                    style={{ background:`linear-gradient(135deg,${d.color},${d.color}BB)` }}>{d.av}</div>
                  {d.avail && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#10B981] border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0 text-right">
                  <p className="text-[13px] font-bold text-[#111]">{d.name}</p>
                  <p className="text-[10px] text-[#BBB] mb-1.5">{d.spec} · {d.exp} سنوات خبرة</p>
                  <div className="flex items-center gap-1.5">
                    <Stars n={d.rating} />
                    <span className="text-[10px] font-bold text-[#333]">{d.rating}</span>
                    <span className="text-[9px] text-[#CCC]">({d.reviews})</span>
                  </div>
                </div>
                <motion.div animate={{ rotate: open===d.name ? 90 : 0 }} transition={{ duration:0.2 }}>
                  <ChevronLeft size={15} className="text-[#CCC] shrink-0" />
                </motion.div>
              </button>

              {/* Expanded */}
              <AnimatePresence>
                {open === d.name && (
                  <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }}
                    exit={{ height:0, opacity:0 }} transition={{ duration:0.22 }} className="overflow-hidden">
                    <div className="px-4 pb-4 pt-1 border-t border-[#F5F7FA]">
                      <p className="text-[11px] text-[#888] leading-relaxed mb-3 mt-2">{d.bio}</p>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-1.5 flex-1">
                          <Clock size={11} style={{ color:d.color }} />
                          <span className="text-[10px] text-[#666]">أقرب: <span className="font-bold">{d.next}</span></span>
                        </div>
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                          style={{ background:`${d.color}12`, color:d.color }}>
                          {d.fee} ر.س
                        </span>
                      </div>
                      <div className="flex gap-1.5 flex-wrap mb-3">
                        {d.langs.map(l => (
                          <span key={l} className="text-[9px] px-2 py-0.5 rounded-full font-medium"
                            style={{ background:'#F2F6FB', color:'#0B4A6F', border:'1px solid rgba(11,74,111,0.1)' }}>{l}</span>
                        ))}
                      </div>
                      <motion.button whileTap={{ scale:0.97 }} onClick={() => setBook(d)}
                        className="w-full py-3 rounded-[16px] text-white font-bold text-[12px]"
                        style={{ background:`linear-gradient(135deg,${d.color},${d.color}CC)`, boxShadow:`0 6px 20px ${d.color}30` }}>
                        احجز موعداً مع {d.name.replace('د. ','')} 🗓
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center py-12">
            <div className="w-14 h-14 rounded-3xl flex items-center justify-center mb-3" style={{ background:'#F2F6FB' }}>
              <Search size={24} className="text-[#CCC]" />
            </div>
            <p className="text-[13px] font-bold text-[#CCC]">لا نتائج</p>
            <p className="text-[11px] text-[#DDD] mt-1">جرّب تخصصاً آخر</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {book && <BookModal doc={book} onClose={() => setBook(null)} />}
      </AnimatePresence>
    </div>
  );
}
