import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, Clock, ChevronLeft, X, CheckCircle } from 'lucide-react';

const SPECS = ['الكل','طب عام','قلب وأوعية','عيون','عظام','جلدية','أطفال','نساء'];

const doctors = [
  {
    name: 'د. سارة المطيري',   spec: 'طب عام',       rating: 4.9, reviews: 312, exp: 12,
    next: 'اليوم ٢:٣٠ م',     fee: 150,  avatar: 'س', color: '#0B4A6F',
    bio: 'استشارية طب الأسرة، خبرة واسعة في الأمراض المزمنة وصحة المرأة.',
    lang: ['العربية','الإنجليزية'], avail: true,
  },
  {
    name: 'د. فهد الحربي',     spec: 'قلب وأوعية',   rating: 4.8, reviews: 198, exp: 18,
    next: 'الجمعة ١٠:٠٠ ص',   fee: 350,  avatar: 'ف', color: '#00B4D8',
    bio: 'استشاري أمراض القلب والقسطرة، حاصل على زمالة أوروبية.',
    lang: ['العربية','الفرنسية','الإنجليزية'], avail: true,
  },
  {
    name: 'د. منى القحطاني',   spec: 'جلدية',         rating: 4.7, reviews: 275, exp: 9,
    next: 'السبت ١١:٠٠ ص',    fee: 200,  avatar: 'م', color: '#22C55E',
    bio: 'متخصصة في الجلدية التجميلية وعلاج الحالات المزمنة.',
    lang: ['العربية'], avail: true,
  },
  {
    name: 'د. خالد العتيبي',   spec: 'عيون',          rating: 4.6, reviews: 154, exp: 14,
    next: 'الأحد ٩:٠٠ ص',     fee: 250,  avatar: 'خ', color: '#F59E0B',
    bio: 'جراح عيون، متخصص في عمليات الليزك والمياه البيضاء.',
    lang: ['العربية','الإنجليزية'], avail: false,
  },
  {
    name: 'د. ريم الغامدي',    spec: 'أطفال',         rating: 4.9, reviews: 421, exp: 11,
    next: 'الأحد ١٢:٠٠ م',    fee: 180,  avatar: 'ر', color: '#EC4899',
    bio: 'استشارية طب الأطفال، متخصصة في التطوير والتغذية.',
    lang: ['العربية','الإنجليزية'], avail: true,
  },
  {
    name: 'د. عمر الشهراني',   spec: 'عظام',          rating: 4.7, reviews: 89, exp: 16,
    next: 'الثلاثاء ٣:٠٠ م',  fee: 300,  avatar: 'ع', color: '#8B5CF6',
    bio: 'جراح عظام ومفاصل، خبرة في المنظار والعمليات الدقيقة.',
    lang: ['العربية'], avail: true,
  },
];

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="9" height="9" viewBox="0 0 10 10" fill={i <= Math.round(n) ? '#F59E0B' : '#E5E7EB'}>
          <path d="M5 1l1.1 2.3 2.5.4-1.8 1.7.4 2.5L5 6.8l-2.2 1.1.4-2.5L1.4 3.7l2.5-.4z"/>
        </svg>
      ))}
    </span>
  );
}

function BookModal({ doc, onClose }: { doc: typeof doctors[0]; onClose: () => void }) {
  const [done, setDone] = useState(false);
  const times = ['٩:٠٠ ص','٩:٣٠ ص','١٠:٠٠ ص','١١:٣٠ ص','٢:٠٠ م','٢:٣٠ م','٣:٠٠ م'];
  const [sel, setSel] = useState<string|null>(null);

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      className="absolute inset-0 bg-black/55 z-50 flex items-end" onClick={onClose}>
      <motion.div initial={{ y: 320 }} animate={{ y:0 }} exit={{ y:320 }} transition={{ type:'spring', damping:28, stiffness:220 }}
        className="w-full bg-white rounded-t-[28px] overflow-hidden max-h-[85%]"
        onClick={e => e.stopPropagation()}>

        {done ? (
          <div className="flex flex-col items-center py-10 px-6">
            <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:'spring', damping:14 }}>
              <CheckCircle size={56} className="text-[#22C55E] mb-3" />
            </motion.div>
            <p className="text-[18px] font-bold text-[#111] mb-1">تم حجز موعدك!</p>
            <p className="text-[13px] text-[#888] text-center leading-snug">
              {doc.name} · {sel}<br/>ستصلك رسالة تأكيد على الواتساب
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-[#F5F5F5]">
              <div>
                <p className="text-[14px] font-bold text-[#111]">احجز مع {doc.name}</p>
                <p className="text-[11px] text-[#AAA]">{doc.spec} · رسوم {doc.fee} ر.س</p>
              </div>
              <button onClick={onClose} className="w-7 h-7 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                <X size={13} className="text-[#888]" />
              </button>
            </div>

            <div className="px-5 py-4 overflow-y-auto max-h-[50vh] scrollbar-none">
              <p className="text-[11px] font-bold text-[#0B4A6F] mb-2.5">اختر الوقت المناسب</p>
              <div className="grid grid-cols-3 gap-2 mb-5">
                {times.map(t => (
                  <button key={t} onClick={() => setSel(t)}
                    className={`py-2 rounded-[10px] text-[11px] font-semibold transition-all active:scale-95 ${sel===t ? 'text-white' : 'bg-[#F0F8FF] text-[#555]'}`}
                    style={sel===t ? { background:`linear-gradient(135deg,${doc.color},${doc.color}BB)` } : {}}>
                    {t}
                  </button>
                ))}
              </div>

              <div className="bg-[#F8FBFF] rounded-[14px] p-3.5 mb-4 border border-[rgba(11,74,111,0.08)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[13px] font-bold shrink-0"
                    style={{ background:`linear-gradient(135deg,${doc.color},${doc.color}BB)` }}>{doc.avatar}</div>
                  <div>
                    <p className="text-[12px] font-bold text-[#111]">{doc.name}</p>
                    <p className="text-[10px] text-[#AAA]">{doc.spec} · {doc.exp} سنوات خبرة</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 pb-6">
              <button onClick={() => sel && setDone(true)} disabled={!sel}
                className={`w-full py-3.5 rounded-[16px] text-white font-bold text-[14px] transition-all active:scale-95 ${!sel ? 'opacity-40' : ''}`}
                style={{ background:`linear-gradient(135deg,${doc.color},${doc.color}CC)` }}>
                تأكيد الحجز · {doc.fee} ر.س
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export function ScreenDoctors() {
  const [spec, setSpec]       = useState('الكل');
  const [query, setQuery]     = useState('');
  const [selected, setSelected] = useState<typeof doctors[0] | null>(null);
  const [booking, setBooking]   = useState<typeof doctors[0] | null>(null);

  const filtered = doctors.filter(d =>
    (spec === 'الكل' || d.spec === spec) &&
    (query === '' || d.name.includes(query) || d.spec.includes(query))
  );

  return (
    <div className="flex flex-col h-full" style={{ background: '#F0F8FF' }}>

      {/* Header */}
      <div className="shrink-0 px-5 pt-5 pb-3" style={{ background: 'linear-gradient(160deg,#050E1A,#0B3A5A)' }}>
        <p className="text-white/40 text-[10px] mb-0.5">{doctors.length} طبيب وطبيبة متاحون</p>
        <p className="text-white text-[18px] font-bold mb-3">فريقنا الطبي</p>

        {/* Search */}
        <div className="flex items-center gap-2 bg-white/8 rounded-[12px] px-3 py-2 border border-white/8">
          <Search size={13} className="text-white/30 shrink-0" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="ابحث عن طبيب أو تخصص..."
            className="bg-transparent text-white text-[12px] outline-none placeholder:text-white/25 w-full text-right" />
        </div>
      </div>

      {/* Specialty pills */}
      <div className="shrink-0 px-4 py-2.5 bg-white/60 backdrop-blur-sm border-b border-[rgba(11,74,111,0.06)]">
        <div className="flex gap-2 overflow-x-auto scrollbar-none">
          {SPECS.map(s => (
            <button key={s} onClick={() => setSpec(s)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-[10px] font-semibold transition-all ${spec===s ? 'text-white shadow-[0_2px_8px_rgba(11,74,111,0.25)]' : 'bg-white text-[#888] border border-[rgba(11,74,111,0.1)]'}`}
              style={spec===s ? { background:'linear-gradient(135deg,#0B4A6F,#00B4D8)' } : {}}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Doctor list */}
      <div className="flex-1 overflow-y-auto scrollbar-none px-4 py-3 pb-28 space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((d, i) => (
            <motion.div key={d.name}
              layout
              initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, scale:0.95 }}
              transition={{ delay: i * 0.05, duration: 0.25 }}
              className="bg-white rounded-[20px] overflow-hidden border border-[rgba(11,74,111,0.08)] shadow-[0_2px_14px_rgba(0,0,0,0.05)]">

              {/* Card header */}
              <button className="w-full p-4 flex items-start gap-3 text-right" onClick={() => setSelected(selected?.name===d.name ? null : d)}>
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-[16px]"
                    style={{ background:`linear-gradient(135deg,${d.color},${d.color}BB)` }}>{d.avatar}</div>
                  {d.avail && <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#22C55E] rounded-full border-2 border-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[13px] font-bold text-[#111]">{d.name}</p>
                      <p className="text-[10px] text-[#AAA] mb-1">{d.spec} · {d.exp} سنوات خبرة</p>
                      <div className="flex items-center gap-1.5">
                        <Stars n={d.rating} />
                        <span className="text-[10px] font-bold text-[#111] font-inter">{d.rating}</span>
                        <span className="text-[9px] text-[#CCC]">({d.reviews} تقييم)</span>
                      </div>
                    </div>
                    <ChevronLeft size={13} className={`text-[#DDD] shrink-0 mt-1 transition-transform ${selected?.name===d.name ? '-rotate-90' : ''}`} />
                  </div>
                </div>
              </button>

              {/* Expanded detail */}
              <AnimatePresence>
                {selected?.name === d.name && (
                  <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }}
                    transition={{ duration:0.22, ease:[0.4,0,0.2,1] }} className="overflow-hidden">
                    <div className="px-4 pb-4 border-t border-[#F5F5F5] pt-3">
                      <p className="text-[11px] text-[#777] font-light leading-snug mb-3">{d.bio}</p>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1.5">
                          <Clock size={10} className="text-[#00B4D8]" />
                          <span className="text-[10px] text-[#555]">أقرب موعد: <span className="font-bold">{d.next}</span></span>
                        </div>
                        <div className="flex items-center gap-1 bg-[#22C55E]/10 px-2 py-0.5 rounded-full">
                          <span className="text-[9px] font-bold text-[#22C55E]">{d.fee} ر.س</span>
                        </div>
                      </div>
                      <div className="flex gap-1.5 flex-wrap mb-3">
                        {d.lang.map(l => (
                          <span key={l} className="text-[9px] bg-[#F0F8FF] text-[#0B4A6F] border border-[rgba(11,74,111,0.12)] px-2 py-0.5 rounded-full font-medium">{l}</span>
                        ))}
                      </div>
                      <button onClick={() => setBooking(d)}
                        className="w-full py-2.5 rounded-[12px] text-white font-bold text-[12px] transition-all active:scale-95 shadow-[0_3px_12px_rgba(11,74,111,0.25)]"
                        style={{ background:`linear-gradient(135deg,${d.color},${d.color}BB)` }}>
                        احجز موعداً مع {d.name.replace('د. ','')} 🗓
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-10">
            <p className="text-3xl mb-2">🔍</p>
            <p className="text-[13px] font-bold text-[#AAA]">لا نتائج</p>
            <p className="text-[11px] text-[#CCC] mt-1">جرّب تخصصاً آخر</p>
          </div>
        )}
      </div>

      {/* Booking modal */}
      <AnimatePresence>
        {booking && <BookModal doc={booking} onClose={() => setBooking(null)} />}
      </AnimatePresence>
    </div>
  );
}
