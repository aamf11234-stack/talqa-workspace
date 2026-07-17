import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Zap, Trophy, Users } from 'lucide-react';

const logoImg = `${import.meta.env.BASE_URL}hyz-logo.jpeg`;

const feed = [
  {
    type: 'checkin',
    user: 'م. العتيبي',
    avatar: 'م',
    time: 'الآن',
    content: 'وصلت حيز للتو ☕ بدأت أسبوعي بكوب الإثيوبي المعتاد. جو مثالي للعمل!',
    likes: 12,
    comments: 3,
    tag: 'تسجيل وصول',
    tagColor: '#7B1618',
  },
  {
    type: 'tip',
    user: 'حيز',
    avatar: null,
    isOfficial: true,
    time: 'منذ ٢ ساعة',
    content: '💡 نصيحة الأسبوع: جرّب محصول إثيوبيا يرقاشيفي — حموضة ناعمة ورائحة زهرية لا تُقاوم. متاح محدود!',
    likes: 48,
    comments: 9,
    tag: 'نصيحة',
    tagColor: '#C9956A',
  },
  {
    type: 'challenge',
    user: 'تحدي الأسبوع',
    avatar: null,
    isChallenge: true,
    time: 'منذ ٥ ساعات',
    content: 'تحدي المجتمع: ٥ أكواب هذا الأسبوع وانضم لقائمة المتحديين! الفائز يحصل على كوب مجاني + كيس بن ١٥٠ جرام. 🏆',
    likes: 94,
    comments: 22,
    tag: 'تحدي',
    tagColor: '#111',
    participants: 67,
  },
  {
    type: 'review',
    user: 'ع. الشهري',
    avatar: 'ع',
    time: 'أمس',
    content: 'تجربة الكرواسون مع اللاتيه لا تُوصف. المكان دائماً هادئ ومثالي للعمل والاستمتاع. شكراً حيز 🙏',
    likes: 31,
    comments: 5,
    tag: 'تقييم',
    tagColor: '#30D158',
    stars: 5,
  },
];

export function ScreenCommunity() {
  const [liked, setLiked] = useState<number[]>([]);

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-none pb-24">
      {/* Header */}
      <div className="px-5 pt-4 pb-4">
        <h1 className="text-[22px] font-bold text-[#111]">مجتمع حيز</h1>
        <p className="text-[12px] text-[#888] font-light mt-0.5">أكثر من ١,٥٠٠ عضو · أبها</p>
      </div>

      {/* Stats row */}
      <div className="px-5 mb-4 grid grid-cols-3 gap-2.5">
        {[
          { icon: Users, value: '١,٥٠٠+', label: 'عضو نشط', color: '#7B1618' },
          { icon: Zap, value: '٢٣', label: 'متصل الآن', color: '#30D158' },
          { icon: Trophy, value: '٤٨', label: 'تحدٍ مكتمل', color: '#C9956A' },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-white rounded-2xl p-3 border border-[rgba(196,181,159,0.18)] text-center shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
          >
            <s.icon size={16} style={{ color: s.color }} className="mx-auto mb-1" />
            <p className="text-[15px] font-bold text-[#111] font-inter">{s.value}</p>
            <p className="text-[9px] text-[#888]">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Active challenge banner */}
      <div className="px-5 mb-4">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-l from-[#7B1618] to-[#9B2020] rounded-2xl p-4 relative overflow-hidden"
        >
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#C9956A] rounded-r-full" />
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <Trophy size={12} className="text-[#C9956A]" />
                <span className="text-[10px] text-[#C9956A] font-semibold tracking-wide">التحدي الأسبوعي</span>
              </div>
              <p className="text-white text-[13px] font-semibold">٥ أكواب في ٧ أيام</p>
              <p className="text-white/60 text-[10px] font-light mt-0.5">٦٧ مشارك · ٤ أيام متبقية</p>
            </div>
            <div className="text-left">
              <p className="text-[#C9956A] text-[22px] font-bold font-inter leading-tight">٤</p>
              <p className="text-white/50 text-[9px]">من ٥</p>
              <div className="w-12 h-1.5 bg-white/20 rounded-full mt-1.5 overflow-hidden">
                <div className="h-full w-4/5 bg-[#C9956A] rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Feed */}
      <div className="px-5 space-y-3">
        {feed.map((post, i) => {
          const isLiked = liked.includes(i);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="bg-white rounded-2xl p-4 border border-[rgba(196,181,159,0.15)] shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
            >
              {/* Post header */}
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2.5">
                  {post.isOfficial ? (
                    <img src={logoImg} alt="حيز" className="w-8 h-8 rounded-full object-cover" />
                  ) : post.isChallenge ? (
                    <div className="w-8 h-8 rounded-full bg-[#111] flex items-center justify-center">
                      <Trophy size={14} className="text-[#C9956A]" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#7B1618]/10 flex items-center justify-center">
                      <span className="text-[13px] font-bold text-[#7B1618]">{post.avatar}</span>
                    </div>
                  )}
                  <div>
                    <p className="text-[12px] font-semibold text-[#111] leading-tight">{post.user}</p>
                    <p className="text-[10px] text-[#AAA] font-inter">{post.time}</p>
                  </div>
                </div>
                <span
                  className="text-[9px] font-semibold px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: post.tagColor }}
                >
                  {post.tag}
                </span>
              </div>

              {/* Stars */}
              {post.stars && (
                <div className="flex gap-0.5 mb-1.5">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <svg key={si} viewBox="0 0 12 12" className="w-3 h-3 fill-[#C9956A]">
                      <path d="M6 1l1.18 2.39 2.64.38-1.91 1.86.45 2.63L6 7.02l-2.36 1.24.45-2.63L2.18 3.77l2.64-.38L6 1z" />
                    </svg>
                  ))}
                </div>
              )}

              <p className="text-[12px] text-[#444] leading-relaxed font-light mb-3">{post.content}</p>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-2 border-t border-[rgba(196,181,159,0.12)]">
                <button
                  onClick={() => setLiked(l => l.includes(i) ? l.filter(x => x !== i) : [...l, i])}
                  className="flex items-center gap-1.5 active:scale-90 transition-transform"
                >
                  <Heart
                    size={15}
                    className={isLiked ? 'fill-[#FF3B30] stroke-[#FF3B30]' : 'stroke-[#AAA]'}
                  />
                  <span className={`text-[11px] font-inter ${isLiked ? 'text-[#FF3B30]' : 'text-[#AAA]'}`}>
                    {post.likes + (isLiked ? 1 : 0)}
                  </span>
                </button>
                <button className="flex items-center gap-1.5">
                  <MessageCircle size={15} className="stroke-[#AAA]" />
                  <span className="text-[11px] text-[#AAA] font-inter">{post.comments}</span>
                </button>
                <button className="flex items-center gap-1.5 mr-auto">
                  <Share2 size={13} className="stroke-[#AAA]" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
