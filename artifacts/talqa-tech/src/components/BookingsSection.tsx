import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle2, Bell, MessageSquare, BarChart3, X, ChevronRight, ChevronLeft } from 'lucide-react';

const WA = 'https://wa.me/966551378531?text=أريد%20نظام%20حجوزات%20لمشروعي';

const DAYS = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];
const SLOTS = ['٩:٠٠ ص', '١٠:٠٠ ص', '١١:٠٠ ص', '١٢:٠٠ م', '١:٠٠ م', '٢:٠٠ م', '٣:٠٠ م', '٤:٠٠ م', '٥:٠٠ م'];

// Preset bookings: [day, slot, name, color]
const BOOKED: [number, number, string, string][] = [
  [0, 0, 'أحمد', '#8B5CF6'], [0, 3, 'سارة', '#3B82F6'],
  [1, 1, 'محمد', '#10B981'], [1, 5, 'نورة', '#EC4899'],
  [2, 2, 'خالد', '#F59E0B'], [2, 6, 'ريم', '#06B6D4'],
  [3, 0, 'فهد', '#8B5CF6'], [3, 4, 'مها', '#3B82F6'],
  [4, 2, 'عمر', '#10B981'], [4, 7, 'هدى', '#F97316'],
];

const FEATURES = [
  { icon: Bell,         color: '#F59E0B', title: 'تذكيرات تلقائية',   desc: 'واتساب + SMS قبل الموعد بساعة' },
  { icon: X,           color: '#EF4444', title: 'إلغاء مريح',        desc: 'العميل يلغي بنفسه بدون تدخل' },
  { icon: BarChart3,   color: '#8B5CF6', title: 'تقارير لحظية',      desc: 'الإيرادات، الزيارات، والتفضيلات' },
  { icon: MessageSquare, color: '#10B981', title: 'تواصل فوري',      desc: 'تأكيد الحجز عبر واتساب مباشرة' },
];

export default function BookingsSection() {
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [confirmed, setConfirmed] = useState<[number, number] | null>(null);

  const isBooked = (d: number, s: number) => BOOKED.some(([bd, bs]) => bd === d && bs === s);
  const isSelected = (d: number, s: number) => selected?.[0] === d && selected?.[1] === s;
  const isConfirmed = (d: number, s: number) => confirmed?.[0] === d && confirmed?.[1] === s;

  const handleSelect = (d: number, s: number) => {
    if (isBooked(d, s)) return;
    setSelected([d, s]);
    setConfirmed(null);
  };

  const handleConfirm = () => {
    if (!selected) return;
    setConfirmed(selected);
    setSelected(null);
  };

  const bookedEntry = (d: number, s: number) => BOOKED.find(([bd, bs]) => bd === d && bs === s);

  return (
    <section id="bookings" style={{ padding: 'clamp(80px,10vw,130px) 0', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <div className="orb" style={{ width: 500, height: 500, top: '50%', right: '-8%', background: 'rgba(245,158,11,0.06)', animationDelay: '-1s' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-label" style={{ color: '#F59E0B', borderColor: 'rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.08)' }}>نظام الحجوزات</div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,4vw,3.2rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            حجوزات{' '}
            <span style={{ background: 'linear-gradient(135deg, #F59E0B, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>تشتغل وحدها</span>
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: 16, marginTop: 14, maxWidth: 480, margin: '14px auto 0' }}>
            عميلك يحجز، يذكّر، ويلغي — بدون ما تتدخل. أنت تشوف الكل في لوحة واحدة.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr minmax(260px,320px)', gap: 32, alignItems: 'start' }}>
          {/* Calendar */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}
            className="glass" style={{ padding: 24, overflow: 'auto' }}>
            {/* Calendar header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ fontWeight: 800, fontSize: 16 }}>مايو ٢٠٢٥</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--surface2)', border: 'none', cursor: 'pointer', color: 'var(--text2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ChevronRight size={16} />
                </button>
                <button style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--surface2)', border: 'none', cursor: 'pointer', color: 'var(--text2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ChevronLeft size={16} />
                </button>
              </div>
            </div>

            {/* Grid */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '3px', minWidth: 480 }}>
                <thead>
                  <tr>
                    <th style={{ padding: '8px 4px', fontSize: 10, fontWeight: 700, color: 'var(--text3)', textAlign: 'right', whiteSpace: 'nowrap' }}>الوقت</th>
                    {DAYS.map(d => (
                      <th key={d} style={{ padding: '8px 6px', fontSize: 11, fontWeight: 800, color: 'var(--text2)', textAlign: 'center', whiteSpace: 'nowrap' }}>{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SLOTS.map((slot, si) => (
                    <tr key={slot}>
                      <td style={{ padding: '3px 6px 3px 0', fontSize: 10, fontWeight: 700, color: 'var(--text3)', whiteSpace: 'nowrap' }}>{slot}</td>
                      {DAYS.map((_, di) => {
                        const booked = isBooked(di, si);
                        const sel = isSelected(di, si);
                        const conf = isConfirmed(di, si);
                        const entry = bookedEntry(di, si);

                        return (
                          <td key={di} style={{ padding: '2px' }}>
                            <div
                              onClick={() => handleSelect(di, si)}
                              style={{
                                height: 36, borderRadius: 8,
                                background: conf ? 'rgba(16,185,129,0.25)'
                                  : sel ? 'rgba(139,92,246,0.25)'
                                  : booked ? `${entry?.[3]}20` : 'rgba(255,255,255,0.03)',
                                border: conf ? '1px solid rgba(16,185,129,0.5)'
                                  : sel ? '1px solid rgba(139,92,246,0.6)'
                                  : booked ? `1px solid ${entry?.[3]}40` : '1px solid rgba(255,255,255,0.06)',
                                cursor: booked ? 'default' : 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'all 0.15s',
                                fontSize: 10, fontWeight: 700,
                                color: conf ? '#10B981' : sel ? '#A78BFA' : booked ? entry?.[3] : 'transparent',
                              }}
                              onMouseEnter={e => { if (!booked && !sel && !conf) (e.currentTarget as HTMLDivElement).style.background = 'rgba(139,92,246,0.1)'; }}
                              onMouseLeave={e => { if (!booked && !sel && !conf) (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)'; }}
                            >
                              {conf ? '✓' : booked ? (entry?.[2] ?? '') : sel ? '+' : ''}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: 16, marginTop: 16, flexWrap: 'wrap' }}>
              {[
                { color: 'rgba(139,92,246,0.5)', label: 'محجوز' },
                { color: 'rgba(255,255,255,0.08)', label: 'متاح', border: 'rgba(255,255,255,0.1)' },
                { color: 'rgba(16,185,129,0.3)', label: 'مؤكد' },
              ].map(({ color, label, border }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: color, border: border ? `1px solid ${border}` : 'none' }} />
                  <span style={{ fontSize: 11, color: 'var(--text3)', fontWeight: 600 }}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right panel */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Booking form */}
            <div className="glass" style={{ padding: 22 }}>
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Calendar size={16} color="#8B5CF6" />
                {selected ? 'تأكيد الحجز' : confirmed ? 'تم الحجز! 🎉' : 'اختر موعداً'}
              </div>

              {confirmed ? (
                <div style={{ padding: 16, borderRadius: 12, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', textAlign: 'center' }}>
                  <CheckCircle2 size={32} color="#10B981" style={{ margin: '0 auto 10px' }} />
                  <div style={{ fontWeight: 800, fontSize: 14, color: '#10B981', marginBottom: 4 }}>تم تأكيد الحجز</div>
                  <div style={{ fontSize: 12, color: 'var(--text2)' }}>{DAYS[confirmed[0]]} — {SLOTS[confirmed[1]]}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 8 }}>سيصلك تأكيد على الواتساب خلال ثوانٍ</div>
                </div>
              ) : selected ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ padding: '12px 14px', borderRadius: 10, background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)' }}>
                    <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 2 }}>الموعد المختار</div>
                    <div style={{ fontWeight: 800, fontSize: 14 }}>{DAYS[selected[0]]} — {SLOTS[selected[1]]}</div>
                  </div>
                  <input className="styled-input" placeholder="اسمك" style={{ marginBottom: 0 }} />
                  <input className="styled-input" placeholder="رقم الجوال" style={{ marginBottom: 0 }} />
                  <button onClick={handleConfirm} className="btn-purple" style={{ justifyContent: 'center' }}>
                    تأكيد الحجز ←
                  </button>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text3)', fontSize: 13 }}>
                  <Calendar size={28} color="var(--text3)" style={{ margin: '0 auto 10px' }} />
                  اضغط على أي خانة فاضية في التقويم
                </div>
              )}
            </div>

            {/* Today stats */}
            <div className="glass" style={{ padding: 20 }}>
              <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 14, color: 'var(--text2)' }}>إحصائيات اليوم</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { val: '٨', label: 'حجوزات اليوم', c: '#8B5CF6' },
                  { val: '٣', label: 'متبقية', c: '#F59E0B' },
                  { val: '٩٥٪', label: 'نسبة الحضور', c: '#10B981' },
                  { val: '١٢٠٠', label: 'ريال متوقع', c: '#3B82F6' },
                ].map(({ val, label, c }) => (
                  <div key={label} style={{ padding: '12px', borderRadius: 10, background: `${c}12`, border: `1px solid ${c}25`, textAlign: 'center' }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: c }}>{val}</div>
                    <div style={{ fontSize: 10, color: 'var(--text3)', fontWeight: 600, marginTop: 2 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp notification preview */}
            <div style={{ padding: 16, borderRadius: 14, background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>💬</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#25D366' }}>واتساب تلقائي</div>
                  <div style={{ fontSize: 10, color: 'var(--text3)' }}>قبل الموعد بساعة</div>
                </div>
              </div>
              <div style={{ padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>
                "تذكير: موعدك عند <b style={{ color: '#fff' }}>مشروعك</b> غداً الساعة ٣:٠٠ م ✅"
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features row */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ marginTop: 64 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 16, marginBottom: 40 }}>
            {FEATURES.map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="glass" style={{ padding: '20px 20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}15`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={18} color={color} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-purple">
              ابني نظام حجوزاتي ←
            </a>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media(max-width:900px) {
          #bookings > div > div:nth-child(3) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
