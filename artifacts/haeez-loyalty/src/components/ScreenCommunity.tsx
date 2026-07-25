import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, Trophy, MapPin, X, Send, Camera, Plus, Check } from 'lucide-react';

const logoImg = `${import.meta.env.BASE_URL}browndose-logo.svg`;

/* ─── Social platform icons ─────────────────────────────────────── */
const platforms = [
  { id: 'instagram', label: 'Instagram', bg: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', icon: '📸' },
  { id: 'snapchat',  label: 'Snapchat',  bg: '#FFFC00',                                                         icon: '👻', dark: true },
  { id: 'x',         label: 'X',         bg: '#000',                                                             icon: '✕'  },
  { id: 'tiktok',    label: 'TikTok',    bg: 'linear-gradient(135deg,#010101,#69C9D0)',                          icon: '♪'  },
  { id: 'whatsapp',  label: 'WhatsApp',  bg: '#25D366',                                                          icon: '💬' },
];

/* ─── Stories data ──────────────────────────────────────────────── */
const stories = [
  {
    id: 0, user: 'قصتي', isMe: true, seen: false,
    gradient: 'linear-gradient(145deg,#B06070,#C9956A)',
  },
  {
    id: 1, user: 'مطعمك', isOfficial: true, seen: false,
    gradient: 'linear-gradient(145deg,#0D0205,#B06070)',
    content: '☕ محصول اليوم: إثيوبيا يرقاشيفي — حموضة ناعمة ورائحة زهرية',
    type: 'official',
  },
  {
    id: 2, user: 'م. العتيبي', avatar: 'م', seen: false,
    gradient: 'linear-gradient(145deg,#1A3A4A,#2D7D7A)',
    content: 'صباح على كوب الفلتر ☀️',
    type: 'checkin',
  },
  {
    id: 3, user: 'س. الغامدي', avatar: 'س', seen: true,
    gradient: 'linear-gradient(145deg,#2D7D46,#1a4a2e)',
    content: 'كرواسون اللوز + قهوة مطعمك 🥐',
    type: 'food',
  },
  {
    id: 4, user: 'خ. الدوسري', avatar: 'خ', seen: true,
    gradient: 'linear-gradient(145deg,#1A1A3A,#3D1B7B)',
    content: 'جلسة عمل هادئة 💻',
    type: 'vibe',
  },
  {
    id: 5, user: 'ن. الزهراني', avatar: 'ن', seen: true,
    gradient: 'linear-gradient(145deg,#4A1A1A,#B06070)',
    content: 'أجواء الشتاء المميزة ❄️',
    type: 'vibe',
  },
];

/* ─── Feed posts ────────────────────────────────────────────────── */
const feedPosts = [
  {
    id: 0,
    user: 'م. العتيبي', avatar: 'م', avatarColor: '#B06070',
    time: 'الآن', tag: 'تسجيل وصول', tagColor: '#B06070',
    content: 'وصلت للتو ☕ بدأت أسبوعي بكوب الإثيوبي المعتاد. جو مثالي للعمل!',
    postGradient: 'linear-gradient(145deg,#0D0205,#3D0809)',
    postEmoji: '☕', likes: 12, comments: 3,
    sharedTo: ['instagram', 'snapchat'],
    location: 'مطعمك',
  },
  {
    id: 1,
    user: 'مطعمك', isOfficial: true,
    time: 'منذ ٢ ساعة', tag: 'رسمي', tagColor: '#C9956A',
    content: '💡 نصيحة الأسبوع: جرّب محصول إثيوبيا يرقاشيفي — حموضة ناعمة ورائحة زهرية لا تُقاوم. متاح بكميات محدودة!',
    postGradient: 'linear-gradient(145deg,#0A0800,#2E1800)',
    postEmoji: '🌸', likes: 48, comments: 9,
    sharedTo: ['instagram', 'x', 'snapchat'],
  },
  {
    id: 2,
    user: 'تحدي الأسبوع', isChallenge: true,
    time: 'منذ ٥ ساعات', tag: 'تحدي', tagColor: '#111',
    content: '🏆 تحدي المجتمع: ٥ أكواب هذا الأسبوع وانضم لقائمة المتحديين! الفائز يحصل على كوب مجاني + كيس بن ١٥٠ جرام.',
    postGradient: 'linear-gradient(145deg,#111,#333)',
    postEmoji: '🏆', likes: 94, comments: 22,
    participants: 67, maxPart: 100,
    sharedTo: ['tiktok', 'instagram'],
  },
  {
    id: 3,
    user: 'ع. الشهري', avatar: 'ع', avatarColor: '#2D7D46',
    time: 'أمس', tag: 'تقييم ⭐⭐⭐⭐⭐', tagColor: '#30D158',
    content: 'تجربة الكرواسون مع اللاتيه لا تُوصف 🥐 المكان دائماً هادئ ومثالي للعمل والاستمتاع. شكراً مطعمنا 🙏',
    postGradient: 'linear-gradient(145deg,#0D2010,#1A4A2A)',
    postEmoji: '🥐', likes: 31, comments: 5,
    sharedTo: ['instagram'],
  },
  {
    id: 4,
    user: 'ن. الزهراني', avatar: 'ن', avatarColor: '#6C3483',
    time: 'أمس', tag: 'تسجيل وصول', tagColor: '#B06070',
    content: 'جلسة شتائية رائعة ❄️ الشوكولاتة الساخنة المشتركة مع صديقتي — أفضل قرار اليوم!',
    postGradient: 'linear-gradient(145deg,#1A0A3A,#3D1B7B)',
    postEmoji: '❄️', likes: 19, comments: 2,
    sharedTo: ['snapchat', 'whatsapp'],
  },
];

/* ─── Story Viewer ──────────────────────────────────────────────── */
function StoryViewer({ stories: storyList, startIndex, onClose }: {
  stories: typeof stories; startIndex: number; onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const story = storyList[current];

  useEffect(() => {
    setProgress(0);
    timerRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          if (current < storyList.length - 1) setCurrent(c => c + 1);
          else onClose();
          return 0;
        }
        return p + 1.2;
      });
    }, 50);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [current]);

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const x = e.clientX;
    const w = (e.currentTarget as HTMLDivElement).offsetWidth;
    if (x < w / 2) {
      if (current > 0) setCurrent(c => c - 1);
      else onClose();
    } else {
      if (current < storyList.length - 1) setCurrent(c => c + 1);
      else onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.18 }}
      className="absolute inset-0 z-50 flex flex-col rounded-[48px] overflow-hidden"
      onClick={handleTap}
      style={{ background: story.gradient }}
    >
      {/* Cinematic ambient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 60% 30%,rgba(255,255,255,0.07) 0%,transparent 65%)' }} />

      {/* Progress bars */}
      <div className="absolute top-3 left-4 right-4 flex gap-1 z-10">
        {storyList.map((_, i) => (
          <div key={i} className="flex-1 h-0.5 rounded-full bg-white/25 overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              style={{ width: i < current ? '100%' : i === current ? `${progress}%` : '0%' }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-7 left-4 right-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          {story.isOfficial ? (
            <img src={logoImg} alt="مطعمك" className="w-7 h-7 rounded-full object-cover border border-white/30" />
          ) : (
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
              <span className="text-white text-[11px] font-bold">{story.avatar ?? '+'}</span>
            </div>
          )}
          <div>
            <p className="text-white text-[12px] font-semibold">{story.user}</p>
            <p className="text-white/50 text-[9px]">الآن</p>
          </div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center"
        >
          <X size={13} className="text-white" />
        </button>
      </div>

      {/* Content area */}
      <div className="absolute inset-0 flex items-center justify-center flex-col gap-3 px-8 pointer-events-none">
        {story.isMe ? (
          <div className="flex flex-col items-center gap-3 opacity-50">
            <Camera size={36} className="text-white" />
            <p className="text-white text-[13px] font-light">اضغط لإضافة قصة</p>
          </div>
        ) : (
          <>
            {/* Animated emoji/visual */}
            <motion.div
              key={current}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="text-[72px] mb-2"
            >
              {story.type === 'official' ? '☕' :
               story.type === 'checkin' ? '📍' :
               story.type === 'food'    ? '🥐' : '✨'}
            </motion.div>

            {/* Floating particles */}
            {[...Array(4)].map((_, i) => (
              <motion.div key={i}
                className="absolute text-[18px] pointer-events-none"
                style={{ left: `${20 + i * 20}%`, top: `${30 + (i % 2) * 20}%` }}
                animate={{ y: [-8, 8, -8], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
              >
                {['✦', '·', '✧', '◦'][i]}
              </motion.div>
            ))}
          </>
        )}
      </div>

      {/* Bottom text */}
      {story.content && !story.isMe && (
        <div className="absolute bottom-10 left-5 right-5">
          <div className="bg-black/30 backdrop-blur-sm rounded-[16px] px-4 py-3">
            <p className="text-white text-[13px] font-light leading-snug text-center">{story.content}</p>
          </div>
        </div>
      )}

      {/* Reply bar */}
      {!story.isMe && (
        <div
          className="absolute bottom-3 left-4 right-4 flex items-center gap-2"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex-1 bg-white/15 border border-white/25 rounded-full px-4 py-2">
            <p className="text-white/50 text-[11px]">أرسل رد...</p>
          </div>
          <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Send size={13} className="text-white" />
          </button>
        </div>
      )}
    </motion.div>
  );
}

/* ─── Check-in Sheet ────────────────────────────────────────────── */
function CheckInSheet({ onClose, onPosted }: { onClose: () => void; onPosted: () => void }) {
  const [step, setStep] = useState<'form' | 'done'>('form');
  const [caption, setCaption] = useState('');
  const [selected, setSelected] = useState<string[]>(['instagram', 'whatsapp']);

  const toggle = (id: string) =>
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const handlePost = () => {
    setStep('done');
    setTimeout(() => { onClose(); onPosted(); }, 1600);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 rounded-[48px]"
        onClick={onClose}
      />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 32, stiffness: 340 }}
        className="absolute bottom-0 left-0 right-0 z-50 rounded-t-[32px] overflow-hidden"
        style={{ background: '#FDFBF7' }}
        onClick={e => e.stopPropagation()}
      >
        {step === 'done' ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="w-14 h-14 rounded-full bg-[#30D158] flex items-center justify-center"
            >
              <Check size={24} strokeWidth={3} className="text-white" />
            </motion.div>
            <p className="text-[16px] font-bold text-[#111]">تم تسجيل وصولك! 🎉</p>
            <p className="text-[12px] text-[#AAA]">+١٥ نقطة أُضيفت لرصيدك</p>
          </div>
        ) : (
          <div className="px-5 pt-4 pb-8">
            <div className="w-10 h-1 bg-[rgba(196,181,159,0.35)] rounded-full mb-4 mx-auto" />

            {/* Location */}
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(123,22,24,0.08)' }}
                >
                  <MapPin size={18} className="text-[#B06070]" />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border border-[#B06070]/30"
                />
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#111]">مطعمك</p>
                <p className="text-[10px] text-[#30D158] font-medium">شارع لبنان · تم التحديد تلقائياً</p>
              </div>
              <div className="mr-auto flex items-center gap-1 bg-[#C9956A]/10 px-2.5 py-1 rounded-full">
                <span className="text-[10px] text-[#C9956A] font-bold">+١٥</span>
                <span className="text-[9px] text-[#C9956A]">نقطة</span>
              </div>
            </div>

            {/* Caption */}
            <div className="bg-white rounded-[16px] border border-[rgba(196,181,159,0.2)] px-4 py-3 mb-4">
              <textarea
                value={caption}
                onChange={e => setCaption(e.target.value)}
                placeholder="شاركنا لحظتك..."
                className="w-full text-[13px] text-[#333] bg-transparent resize-none outline-none leading-relaxed placeholder:text-[#CCC]"
                rows={2}
              />
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[rgba(196,181,159,0.1)]">
                <button className="flex items-center gap-1.5 text-[10px] text-[#AAA]">
                  <Camera size={13} /> أضف صورة
                </button>
                <span className="text-[#E0D8D0]">·</span>
                <span className="text-[9px] text-[#CCC]">{caption.length}/١٥٠</span>
              </div>
            </div>

            {/* Share to platforms */}
            <p className="text-[10px] font-bold text-[#888] mb-2.5 tracking-wide">شارك على</p>
            <div className="flex gap-2 mb-5 flex-wrap">
              {platforms.map(p => {
                const on = selected.includes(p.id);
                return (
                  <motion.button
                    key={p.id}
                    whileTap={{ scale: 0.88 }}
                    onClick={() => toggle(p.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all"
                    style={on
                      ? { background: p.bg, borderColor: 'transparent' }
                      : { background: 'rgba(196,181,159,0.1)', borderColor: 'rgba(196,181,159,0.2)' }
                    }
                  >
                    <span className="text-[11px]">{p.icon}</span>
                    <span className={`text-[10px] font-semibold ${on ? (p.dark ? 'text-black' : 'text-white') : 'text-[#888]'}`}>
                      {p.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Post button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handlePost}
              className="w-full py-3.5 rounded-[16px] font-bold text-[14px] text-white flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg,#B06070,#7A3050)', boxShadow: '0 6px 20px rgba(123,22,24,0.35)' }}
            >
              <MapPin size={15} className="opacity-80" />
              سجّل وصولك الآن
            </motion.button>
          </div>
        )}
      </motion.div>
    </>
  );
}

/* ─── Post Card ─────────────────────────────────────────────────── */
function PostCard({ post, index }: { post: typeof feedPosts[0]; index: number }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [joined, setJoined] = useState(false);

  const handleLike = () => {
    setLiked(l => !l);
    setLikes(n => liked ? n - 1 : n + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * index, duration: 0.28 }}
      className="bg-white rounded-[20px] overflow-hidden border border-[rgba(196,181,159,0.12)] shadow-[0_2px_14px_rgba(0,0,0,0.05)]"
    >
      {/* Post visual header */}
      <div className="relative h-28 overflow-hidden" style={{ background: post.postGradient }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 30%,rgba(255,255,255,0.06) 0%,transparent 65%)' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[52px] opacity-25">{post.postEmoji}</span>
        </div>
        {/* Location badge */}
        {post.location && (
          <div className="absolute bottom-2.5 right-3 flex items-center gap-1 bg-black/35 backdrop-blur-sm rounded-full px-2.5 py-1">
            <MapPin size={9} className="text-white" />
            <span className="text-white text-[9px] font-medium">{post.location}</span>
          </div>
        )}
        {/* Official badge */}
        {post.isOfficial && (
          <div className="absolute top-2.5 left-3 flex items-center gap-1 bg-[#C9956A]/90 backdrop-blur-sm rounded-full px-2.5 py-1">
            <span className="text-white text-[9px] font-bold">✦ مطعمك</span>
          </div>
        )}
      </div>

      <div className="px-4 py-3">
        {/* Header row */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2.5">
            {post.isOfficial ? (
              <img src={logoImg} alt="مطعمك" className="w-7 h-7 rounded-full object-cover border border-[rgba(201,149,106,0.3)]" />
            ) : post.isChallenge ? (
              <div className="w-7 h-7 rounded-full bg-[#111] flex items-center justify-center">
                <Trophy size={12} className="text-[#C9956A]" />
              </div>
            ) : (
              <div className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: `${post.avatarColor}18` }}>
                <span className="text-[12px] font-bold" style={{ color: post.avatarColor }}>{post.avatar}</span>
              </div>
            )}
            <div>
              <p className="text-[12px] font-semibold text-[#111] leading-tight">{post.user}</p>
              <p className="text-[9px] text-[#BBB] font-inter">{post.time}</p>
            </div>
          </div>
          <span className="text-[8px] font-bold text-white px-2 py-0.5 rounded-full"
            style={{ background: post.tagColor }}>{post.tag}</span>
        </div>

        {/* Content */}
        <p className="text-[12px] text-[#444] leading-relaxed font-light mb-3">{post.content}</p>

        {/* Challenge progress */}
        {'participants' in post && post.participants !== undefined && (
          <div className="mb-3 bg-[#F5EFE8] rounded-[12px] px-3 py-2.5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-semibold text-[#111]">المشاركون</span>
              <span className="text-[10px] font-bold text-[#B06070] font-inter">{post.participants}/{post.maxPart}</span>
            </div>
            <div className="h-1.5 bg-white rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-[#B06070] to-[#C9956A]"
                initial={{ width: 0 }} animate={{ width: `${(post.participants! / post.maxPart!) * 100}%` }}
                transition={{ delay: 0.3 + 0.08 * index, duration: 0.7 }} />
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setJoined(j => !j)}
              className="mt-2 w-full py-1.5 rounded-[10px] text-[11px] font-bold transition-all"
              style={joined
                ? { background: 'rgba(48,209,88,0.12)', color: '#30D158' }
                : { background: 'linear-gradient(135deg,#B06070,#7A3050)', color: '#fff' }
              }
            >
              {joined ? '✓ أنت مشارك' : 'انضم للتحدي 🏆'}
            </motion.button>
          </div>
        )}

        {/* Shared platforms */}
        {post.sharedTo && post.sharedTo.length > 0 && (
          <div className="flex items-center gap-1.5 mb-2.5">
            <span className="text-[8px] text-[#CCC]">نُشر على</span>
            {post.sharedTo.map(pid => {
              const pl = platforms.find(p => p.id === pid);
              return pl ? (
                <div key={pid} className="w-4 h-4 rounded-full flex items-center justify-center text-[8px]"
                  style={{ background: pl.bg }}>
                  <span style={{ color: pl.dark ? '#000' : '#fff' }}>{pl.icon}</span>
                </div>
              ) : null;
            })}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4 pt-2.5 border-t border-[rgba(196,181,159,0.1)]">
          <motion.button whileTap={{ scale: 0.8 }} onClick={handleLike}
            className="flex items-center gap-1.5">
            <Heart size={15}
              className={liked ? 'fill-[#FF3B30] stroke-[#FF3B30]' : 'stroke-[#CCC]'} />
            <span className={`text-[11px] font-inter tabular-nums ${liked ? 'text-[#FF3B30]' : 'text-[#CCC]'}`}>{likes}</span>
          </motion.button>
          <button className="flex items-center gap-1.5">
            <MessageCircle size={15} className="stroke-[#CCC]" />
            <span className="text-[11px] text-[#CCC] font-inter">{post.comments}</span>
          </button>
          <button className="flex items-center gap-1.5 mr-auto">
            <Share2 size={13} className="stroke-[#CCC]" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Screen ───────────────────────────────────────────────── */
export function ScreenCommunity() {
  const [storyIndex, setStoryIndex] = useState<number | null>(null);
  const [showCheckin, setShowCheckin] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const [seenStories, setSeenStories] = useState<number[]>([]);
  const [filter, setFilter] = useState<'all' | 'friends' | 'official'>('all');

  const openStory = (i: number) => {
    setStoryIndex(i);
    setSeenStories(s => s.includes(i) ? s : [...s, i]);
  };

  const displayed = feedPosts.filter(p => {
    if (filter === 'official') return p.isOfficial || p.isChallenge;
    if (filter === 'friends') return !p.isOfficial && !p.isChallenge;
    return true;
  });

  return (
    <div className="flex flex-col h-full relative" style={{ background: '#F5EFE8' }}>

      {/* Story viewer overlay */}
      <AnimatePresence>
        {storyIndex !== null && (
          <StoryViewer
            stories={stories}
            startIndex={storyIndex}
            onClose={() => setStoryIndex(null)}
          />
        )}
      </AnimatePresence>

      {/* Check-in sheet */}
      <AnimatePresence>
        {showCheckin && (
          <CheckInSheet
            onClose={() => setShowCheckin(false)}
            onPosted={() => setCheckedIn(true)}
          />
        )}
      </AnimatePresence>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scrollbar-none pb-24">

        {/* ── Header ── */}
        <div className="px-4 pt-4 pb-3 flex items-center justify-between">
          <div>
            <h1 className="text-[20px] font-bold text-[#111] leading-tight">مجتمع مطعمك</h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 bg-[#30D158] rounded-full animate-pulse" />
              <p className="text-[10px] text-[#30D158] font-medium">٢٣ متصل الآن</p>
              <span className="text-[#DDD]">·</span>
              <p className="text-[10px] text-[#AAA]">١,٥٠٠+ عضو</p>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setShowCheckin(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-white text-[11px] font-bold shadow-[0_4px_16px_rgba(123,22,24,0.35)]"
            style={{ background: 'linear-gradient(135deg,#B06070,#7A3050)' }}
          >
            <MapPin size={12} />
            {checkedIn ? 'وصلت ✓' : 'سجّل'}
          </motion.button>
        </div>

        {/* ── Stories Row ── */}
        <div className="px-4 mb-4">
          <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
            {stories.map((story, i) => {
              const seen = seenStories.includes(i) || story.seen;
              return (
                <motion.button
                  key={story.id}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => openStory(i)}
                  className="flex flex-col items-center gap-1.5 shrink-0"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {/* Ring + avatar */}
                  <div className="relative">
                    <div
                      className="w-[58px] h-[58px] rounded-full p-[2.5px]"
                      style={{
                        background: seen
                          ? 'rgba(196,181,159,0.2)'
                          : story.isOfficial
                            ? 'linear-gradient(135deg,#C9956A,#B06070)'
                            : 'linear-gradient(135deg,#B06070,#FF6B6B,#C9956A)',
                      }}
                    >
                      <div className="w-full h-full rounded-full overflow-hidden border-2 border-white"
                        style={{ background: story.gradient }}>
                        {story.isMe ? (
                          <div className="w-full h-full flex items-center justify-center">
                            <Plus size={20} className="text-white/70" />
                          </div>
                        ) : story.isOfficial ? (
                          <img src={logoImg} alt="مطعمك" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-white text-[18px] font-bold">{story.avatar}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Live badge for official */}
                    {story.isOfficial && (
                      <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 bg-[#FF3B30] rounded-full px-1.5 py-0.5">
                        <span className="text-white text-[6px] font-bold">LIVE</span>
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-[#888] font-medium max-w-[56px] truncate text-center">
                    {story.user}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ── Challenge Banner ── */}
        <div className="px-4 mb-4">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-[18px] p-4 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg,#B06070,#9B2020)' }}
          >
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 30%,rgba(201,149,106,0.25) 0%,transparent 60%)' }} />
            <div className="relative flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <Trophy size={11} className="text-[#C9956A]" />
                  <span className="text-[9px] text-[#C9956A] font-bold tracking-widest">التحدي الأسبوعي</span>
                </div>
                <p className="text-white text-[13px] font-bold">٥ أكواب في ٧ أيام</p>
                <p className="text-white/55 text-[10px] mt-0.5">٦٧ مشارك · ٤ أيام متبقية</p>
              </div>
              <div className="text-left">
                <p className="text-[#C9956A] text-[26px] font-bold font-inter leading-tight">٤</p>
                <p className="text-white/40 text-[9px] text-center">من ٥</p>
                <div className="w-14 h-1.5 bg-white/15 rounded-full mt-1.5 overflow-hidden">
                  <motion.div className="h-full bg-[#C9956A] rounded-full"
                    initial={{ width: 0 }} animate={{ width: '80%' }} transition={{ delay: 0.5, duration: 0.8 }} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Filter Tabs ── */}
        <div className="px-4 mb-3 flex gap-2">
          {([['all', 'الكل'], ['friends', 'أصدقاء'], ['official', 'رسمي']] as const).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold transition-all"
              style={filter === id
                ? { background: 'linear-gradient(135deg,#B06070,#7A3050)', color: '#fff' }
                : { background: 'rgba(196,181,159,0.15)', color: '#888' }
              }
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Feed ── */}
        <div className="px-4 space-y-3">
          <AnimatePresence mode="popLayout">
            {displayed.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* ── Social media links ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mx-4 mt-4 bg-white rounded-[18px] p-4 border border-[rgba(196,181,159,0.12)] shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
        >
          <p className="text-[11px] font-bold text-[#111] mb-3">تابعنا على وسائل التواصل</p>
          <div className="flex gap-2.5">
            {[
              { icon: '📸', label: 'Instagram', sub: 'matar3k', bg: 'linear-gradient(45deg,#f09433,#dc2743,#bc1888)' },
              { icon: '♪',  label: 'TikTok',    sub: '@matar3k', bg: 'linear-gradient(135deg,#010101,#69C9D0)' },
              { icon: '✕',  label: 'X',          sub: '@hyzcafe', bg: '#000' },
              { icon: '👻', label: 'Snap',       sub: 'hyz.cafe', bg: '#FFFC00', dark: true },
            ].map((s, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.9 }}
                className="flex-1 flex flex-col items-center gap-1 py-2.5 rounded-[14px]"
                style={{ background: s.bg }}
              >
                <span className="text-[16px]">{s.icon}</span>
                <span className={`text-[8px] font-bold ${s.dark ? 'text-black' : 'text-white'}`}>{s.label}</span>
                <span className={`text-[7px] ${s.dark ? 'text-black/60' : 'text-white/60'}`}>{s.sub}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ── Compose button ── */}
        <div className="px-4 mt-4">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowCheckin(true)}
            className="w-full flex items-center gap-3 bg-white px-4 py-3.5 rounded-[16px] border border-[rgba(196,181,159,0.15)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
          >
            <div className="w-8 h-8 rounded-full bg-[rgba(123,22,24,0.07)] flex items-center justify-center shrink-0">
              <span className="text-[14px]">ع</span>
            </div>
            <p className="text-[12px] text-[#CCC] flex-1 text-right">شاركنا لحظتك...</p>
            <div className="flex items-center gap-1">
              <Camera size={14} className="text-[#CCC]" />
              <MapPin size={14} className="text-[#CCC]" />
            </div>
          </motion.button>
        </div>

      </div>
    </div>
  );
}
