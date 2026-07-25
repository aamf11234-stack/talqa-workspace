import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, ChevronLeft, MapPin, Gift, Star, Zap, Coffee, Crown, Calendar } from 'lucide-react';
const logoImg = `${import.meta.env.BASE_URL}browndose-logo.svg`;

interface Notif {
  id: number;
  type: 'gift' | 'points' | 'geo' | 'level' | 'event' | 'challenge' | 'birthday';
  title: string;
  body: string;
  time: string;
  unread: boolean;
  actionLabel?: string;
  badge?: string;
  badgeColor?: string;
}

const notifications: Notif[] = [
  {
    id: 1,
    type: 'gift',
    title: 'كوبك المجاني جاهز! 🎁',
    body: 'وصلت لـ ٧ أكواب — مشروبك المجاني بانتظارك في الزيارة القادمة. أبرز الإشعار عند الصندوق.',
    time: 'الآن',
    unread: true,
    actionLabel: 'استخدم الآن',
    badge: 'جديد',
    badgeColor: '#30D158',
  },
  {
    id: 2,
    type: 'geo',
    title: 'أنت قريب رسمي 📍',
    body: 'مسافتك من الفرع الآن ٢٨٠م — سنحجز لك الطاولة المفضلة إن أردت',
    time: 'منذ ٣ دقائق',
    unread: true,
    actionLabel: 'احجز الآن',
    badge: 'قريب',
    badgeColor: '#1A6B3A',
  },
  {
    id: 3,
    type: 'level',
    title: 'قريب من المستوى الفضي ✨',
    body: 'كوبان فقط يفصلانك عن عضوية فضي — مزايا أكثر وأولوية في الحجوزات وعروض حصرية',
    time: 'منذ ساعة',
    unread: true,
    actionLabel: 'شوف مزاياي',
    badge: '٢ أكواب',
    badgeColor: '#7A3B18',
  },
  {
    id: 4,
    type: 'event',
    title: 'دعوة حصرية للأعضاء ☕',
    body: 'تذوق محصول إثيوبي يرقاشيفي نادر — الجمعة ٤–٦م، أماكن محدودة. لأعضاء الكلاسيك فما فوق.',
    time: 'منذ ساعتين',
    unread: true,
    actionLabel: 'احجز مكانك',
    badge: 'محدود',
    badgeColor: '#2980B9',
  },
  {
    id: 5,
    type: 'challenge',
    title: 'تحدي الأسبوع: ٤ من ٥ ⚡',
    body: 'كوب واحد فقط لإكمال التحدي وكسب ٥٠ نقطة إضافية — ينتهي الجمعة منتصف الليل',
    time: 'أمس',
    unread: false,
    actionLabel: 'اكمل التحدي',
    badge: 'يتسع الوقت',
    badgeColor: '#8E44AD',
  },
  {
    id: 6,
    type: 'birthday',
    title: 'عيد ميلاد سعيد يا عبدالإله 🎂',
    body: 'من فريق مطعمك — مشروبك الأول اليوم مجاني، وهدية مفاجئة بانتظارك عند الصندوق!',
    time: 'أمس',
    unread: false,
  },
  {
    id: 7,
    type: 'points',
    title: '+١٥ نقطة أُضيفت لحسابك',
    body: 'لاتيه إثيوبي — فلتر · زيارة الثلاثاء. رصيدك الآن ٤٨٠ نقطة 🎯',
    time: 'منذ يومين',
    unread: false,
  },
];

const typeIcon: Record<Notif['type'], React.ReactNode> = {
  gift:      <Gift size={16} className="text-[#30D158]" />,
  points:    <Star size={16} className="text-[#7A3B18]" fill="#7A3B18" />,
  geo:       <MapPin size={16} className="text-[#2980B9]" />,
  level:     <Crown size={16} className="text-[#7A3B18]" />,
  event:     <Coffee size={16} className="text-[#6B3210]" />,
  challenge: <Zap size={16} className="text-[#8E44AD]" />,
  birthday:  <Bell size={16} className="text-[#FF6B81]" />,
};

const typeBg: Record<Notif['type'], string> = {
  gift:      'rgba(48,209,88,0.1)',
  points:    'rgba(201,149,106,0.1)',
  geo:       'rgba(41,128,185,0.1)',
  level:     'rgba(201,149,106,0.12)',
  event:     'rgba(160,82,45,0.08)',
  challenge: 'rgba(142,68,173,0.1)',
  birthday:  'rgba(255,107,129,0.1)',
};

export function ScreenNotifications() {
  const [dismissed, setDismissed] = useState<number[]>([]);
  const [readIds, setReadIds]     = useState<number[]>([]);
  const [allRead, setAllRead]     = useState(false);

  const visible      = notifications.filter(n => !dismissed.includes(n.id));
  const unreadCount  = visible.filter(n => n.unread && !readIds.includes(n.id) && !allRead).length;

  const markRead = (id: number) => setReadIds(p => p.includes(id) ? p : [...p, id]);

  return (
    <div className="flex flex-col h-full" style={{ background: '#FDFBF7' }}>

      {/* ── Header ── */}
      <div className="shrink-0 px-5 pt-5 pb-4 border-b border-[rgba(196,181,159,0.18)]">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[20px] font-black text-[#111]">الإشعارات</h1>
              {unreadCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg,#6B3210,#C44)' }}>
                  <span className="text-white text-[9px] font-black">{unreadCount}</span>
                </motion.div>
              )}
            </div>
            <p className="text-[10px] text-[#C4B59F] font-light mt-0.5">
              {unreadCount > 0 ? `${unreadCount} إشعار غير مقروء` : 'كل شيء مقروء ✓'}
            </p>
          </div>
          {unreadCount > 0 && (
            <motion.button whileTap={{ scale: 0.92 }}
              onClick={() => setAllRead(true)}
              className="px-3 py-1.5 rounded-full text-[10px] font-bold"
              style={{ background: 'rgba(160,82,45,0.07)', color: '#6B3210', border: '1px solid rgba(160,82,45,0.12)' }}>
              قراءة الكل
            </motion.button>
          )}
        </div>
      </div>

      {/* ── List ── */}
      <div className="flex-1 overflow-y-auto scrollbar-none pb-24">

        {/* Unread group */}
        {visible.filter(n => n.unread && !readIds.includes(n.id) && !allRead).length > 0 && (
          <div className="px-5 pt-4 pb-1">
            <p className="text-[9px] font-black tracking-[0.22em] text-[#7A3B18]"
              style={{ fontFamily: 'ui-monospace,monospace' }}>UNREAD</p>
          </div>
        )}

        <AnimatePresence initial={false}>
          {visible.map((n, i) => {
            const isUnread = n.unread && !readIds.includes(n.id) && !allRead;
            const IconEl = typeIcon[n.type];
            return (
              <motion.div
                key={n.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 60, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.28, delay: i * 0.04 }}
                className="px-4 py-1"
              >
                <motion.div
                  whileTap={{ scale: 0.985 }}
                  onClick={() => markRead(n.id)}
                  className="relative rounded-[20px] p-4 overflow-hidden"
                  style={{
                    background: isUnread
                      ? `linear-gradient(135deg,${typeBg[n.type]},rgba(255,255,255,0.7))`
                      : '#fff',
                    border: isUnread
                      ? `1px solid rgba(160,82,45,0.1)`
                      : '1px solid rgba(196,181,159,0.14)',
                    boxShadow: isUnread
                      ? '0 4px 20px rgba(0,0,0,0.07)'
                      : '0 2px 8px rgba(0,0,0,0.03)',
                    marginBottom: 8,
                  }}
                >
                  {/* Unread glow line */}
                  {isUnread && (
                    <div className="absolute right-0 top-4 bottom-4 w-[3px] rounded-l-full"
                      style={{ background: 'linear-gradient(180deg,#6B3210,#7A3B18)' }} />
                  )}

                  <div className="flex gap-3">
                    {/* Icon badge */}
                    <div className="w-10 h-10 rounded-[14px] flex items-center justify-center shrink-0"
                      style={{ background: typeBg[n.type], border: `1px solid rgba(0,0,0,0.06)` }}>
                      {IconEl}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <p className="text-[12.5px] font-bold text-[#111] leading-snug">{n.title}</p>
                          {n.badge && (
                            <span className="text-[7px] font-black px-1.5 py-0.5 rounded-full text-white"
                              style={{ background: n.badgeColor ?? '#6B3210' }}>
                              {n.badge}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col items-end shrink-0 gap-1">
                          <span className="text-[9px] text-[#C4B5A8] whitespace-nowrap font-inter">{n.time}</span>
                          {isUnread && (
                            <div className="w-2 h-2 rounded-full bg-[#6B3210]" />
                          )}
                        </div>
                      </div>

                      <p className="text-[10.5px] text-[#888] font-light leading-relaxed mb-2">{n.body}</p>

                      {n.actionLabel && (
                        <motion.button
                          whileTap={{ scale: 0.92 }}
                          className="flex items-center gap-1 text-[10px] font-bold"
                          style={{ color: '#6B3210' }}>
                          {n.actionLabel}
                          <ChevronLeft size={10} />
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Dismiss button */}
                  <motion.button
                    whileTap={{ scale: 0.88 }}
                    onClick={e => { e.stopPropagation(); setDismissed(p => [...p, n.id]); }}
                    className="absolute top-3 left-3 w-5 h-5 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                    style={{ background: 'rgba(196,181,159,0.2)' }}>
                    <span className="text-[#AAA] text-[9px] font-bold leading-none">✕</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Already read section label */}
        {visible.filter(n => !n.unread || readIds.includes(n.id) || allRead).length > 0 &&
         visible.filter(n => n.unread && !readIds.includes(n.id) && !allRead).length > 0 && (
          <div className="px-5 pt-2 pb-1">
            <p className="text-[9px] font-black tracking-[0.22em] text-[#C4B5A8]"
              style={{ fontFamily: 'ui-monospace,monospace' }}>EARLIER</p>
          </div>
        )}

        {/* Empty state */}
        {visible.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 gap-3 opacity-60">
            <div className="w-14 h-14 rounded-[18px] flex items-center justify-center"
              style={{ background: 'rgba(160,82,45,0.06)' }}>
              <Check size={24} className="text-[#6B3210]" />
            </div>
            <p className="text-[13px] font-semibold text-[#AAA]">لا إشعارات جديدة</p>
          </div>
        )}

        {/* Haiz notification footer */}
        <div className="mx-5 mt-2 mb-4 p-4 rounded-[18px] flex items-center gap-3"
          style={{ background: 'linear-gradient(135deg,rgba(160,82,45,0.05),rgba(201,149,106,0.05))', border: '1px solid rgba(201,149,106,0.12)' }}>
          <div className="shrink-0">
            <img src={logoImg} alt="مطعمك" className="w-9 h-9 rounded-[11px] object-cover"
              style={{ border: '1px solid rgba(201,149,106,0.2)' }} />
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-bold text-[#111]">إشعارات مطعمك</p>
            <p className="text-[9px] text-[#AAA] font-light mt-0.5">مخصصة لك بناءً على تاريخ زياراتك وتفضيلاتك</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-[#30D158] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
