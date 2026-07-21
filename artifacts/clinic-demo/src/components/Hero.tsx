import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Monitor, Smartphone, Activity } from 'lucide-react';
import { AppModal } from './AppModal';

export const Hero = () => {
 const { scrollY } = useScroll();
 const y1 = useTransform(scrollY, [0, 500], [0, -50]);
 const y2 = useTransform(scrollY, [0, 500], [0, 50]);
 const [modalOpen, setModalOpen] = useState(false);

 return (
 <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
 {/* Background Effects */}
 <div className="absolute inset-0 z-0">
 <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-secondary/10 rounded-full blur-[100px] opacity-50" />
 <div className="absolute bottom-[-10%] left-[-5%] w-[30rem] h-[30rem] bg-primary/10 rounded-full blur-[100px] opacity-40" />
 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
 </div>

 <div className="container mx-auto px-6 z-10 relative">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
 
 {/* Content */}
 <motion.div 
 initial={{ opacity: 0, x: 50 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.8, ease: "easeOut" }}
 className="flex flex-col gap-6"
 >
 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 w-fit">
 <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
 <span className="text-primary text-sm font-semibold tracking-wide">المنظومة الرقمية الأقوى للعيادات والمراكز الطبية</span>
 </div>
 
 <h1 className="text-5xl md:text-7xl font-black leading-tight text-white">
 لا تكن مجرد <br />
 <span className="text-transparent bg-clip-text bg-gradient-to-l from-secondary to-blue-400">عيادة تقليدية</span>
 </h1>
 
 <p className="text-lg md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-xl">
 احصل على <span className="text-white">موقع إلكتروني</span> احترافي، و<span className="text-white">تطبيق ذكي</span> لمرضاك، و<span className="text-white">لوحة تحكم</span> متكاملة. كل ذلك بقيمة استثمارية <span className="text-primary font-bold text-3xl">18,000 ريال</span> فقط.
 </p>

 <div className="flex flex-col sm:flex-row gap-4 mt-4">
 <motion.button 
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all"
 >
 احجز نسختك الآن
 </motion.button>
 <motion.button 
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 onClick={() => setModalOpen(true)}
 className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all"
 >
 <Smartphone size={20} />
 شاهد التطبيق
 </motion.button>
 </div>
 
 <div className="flex items-center gap-6 mt-8 opacity-60 text-sm">
 <div className="flex items-center gap-2">
 <Monitor size={18} /> موقع متجاوب
 </div>
 <div className="flex items-center gap-2">
 <Smartphone size={18} /> تطبيق iOS & Android
 </div>
 <div className="flex items-center gap-2">
 <Activity size={18} /> لوحة تحكم ذكية
 </div>
 </div>
 </motion.div>

 {/* Visual Mockups */}
 <div className="relative h-[600px] flex justify-center items-center">
 {/* Desktop Mockup */}
 <motion.div 
 style={{ y: y2 }}
 initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
 animate={{ opacity: 1, scale: 1, rotateY: 0 }}
 transition={{ duration: 1, delay: 0.2 }}
 className="absolute right-0 md:right-10 w-[80%] md:w-[600px] z-10 glass-panel rounded-xl overflow-hidden shadow-2xl border border-white/10"
 >
 {/* Browser Header */}
 <div className="bg-[#1A1A1A] px-4 py-3 flex items-center gap-2 border-b border-white/5">
 <div className="flex gap-1.5">
 <div className="w-3 h-3 rounded-full bg-red-500/80" />
 <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
 <div className="w-3 h-3 rounded-full bg-green-500/80" />
 </div>
 <div className="mx-auto bg-black/40 rounded-md px-32 py-1 text-[10px] text-white/40 font-mono text-center w-1/2">
 clinic.com
 </div>
 </div>
 {/* Browser Content */}
 <div className="bg-white p-6 h-[350px] relative">
 <div className="flex justify-between items-center mb-8 border-b pb-4">
 <div className="font-bold text-[#050D1A] text-xl flex items-center gap-2">
 <div className="w-8 h-8 bg-[#0EA5E9] rounded-lg" />
 عيادات النخبة
 </div>
 <div className="flex gap-6 text-sm text-gray-500 font-medium">
 <span className="text-[#0EA5E9]">الرئيسية</span>
 <span>أطبائنا</span>
 <span>خدماتنا</span>
 </div>
 <button className="bg-[#050D1A] text-white px-4 py-2 rounded-md text-sm font-semibold">
 احجز موعدك
 </button>
 </div>
 
 <div className="grid grid-cols-2 gap-8 items-center h-full pb-10">
 <div>
 <h2 className="text-3xl font-bold text-[#050D1A] mb-4">الرعاية الصحية<br/>بمفهوم جديد</h2>
 <p className="text-gray-500 text-sm mb-6">نقدم لك أحدث التقنيات الطبية مع نخبة من الاستشاريين في مختلف التخصصات.</p>
 <button className="bg-[#0EA5E9] text-white px-6 py-2 rounded-md text-sm shadow-lg shadow-cyan-500/30">
 تصفح العيادات
 </button>
 </div>
 <div className="relative">
 <div className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden relative">
 <img src="https://images.unsplash.com/photo-1551076805-e1869043e560?auto=format&fit=crop&w=600&q=80" alt="Clinic" className="w-full h-full object-cover opacity-80 mix-blend-luminosity" />
 <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent" />
 </div>
 <div className="absolute -bottom-6 -right-6 bg-white p-3 rounded-lg shadow-xl border border-gray-100 flex items-center gap-3 w-48">
 <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
 <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=100&q=80" alt="Doctor" className="w-full h-full object-cover" />
 </div>
 <div>
 <div className="text-xs font-bold text-gray-900">د. أحمد محمد</div>
 <div className="text-[10px] text-gray-500">استشاري قلب</div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </motion.div>

 {/* Mobile App Mockup — static preview, click opens modal */}
 <motion.div 
 style={{ y: y1 }}
 initial={{ opacity: 0, y: 100 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 100 }}
 onClick={() => setModalOpen(true)}
 className="absolute left-0 md:left-20 z-20 w-[200px] h-[420px] bg-[#0A0A0A] rounded-[2rem] border-[5px] border-gray-800 p-1.5 shadow-2xl overflow-hidden cursor-pointer group"
 >
 {/* Notch */}
 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-gray-800 rounded-b-2xl z-30" />
 
 {/* App Screen preview */}
 <div className="bg-[#0B1929] w-full h-full rounded-[1.6rem] overflow-hidden relative text-white">
 {/* Header */}
 <div className="p-4 pt-8 flex justify-between items-center border-b border-white/5">
 <div>
 <div className="text-[9px] text-gray-400">مرحباً بك </div>
 <div className="font-bold text-xs">أحمد الشمري</div>
 </div>
 <div className="w-7 h-7 rounded-full bg-[#0B4A6F] flex items-center justify-center text-xs font-bold">أ</div>
 </div>

 {/* Health Ring placeholder */}
 <div className="flex justify-center py-4">
 <div className="relative w-20 h-20">
 <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
 <circle cx="40" cy="40" r="30" fill="none" stroke="#1a2a3a" strokeWidth="8"/>
 <circle cx="40" cy="40" r="30" fill="none" stroke="#00B4D8" strokeWidth="8"
 strokeDasharray="188" strokeDashoffset="38" strokeLinecap="round"/>
 </svg>
 <div className="absolute inset-0 flex flex-col items-center justify-center">
 <span className="text-xl font-black text-white">82</span>
 <span className="text-[7px] text-gray-400">صحة</span>
 </div>
 </div>
 </div>

 {/* Stats row */}
 <div className="grid grid-cols-3 gap-1.5 px-3 mb-3">
 {[['النبض','72','bpm'],['السكر','95','mg'],['الضغط','120','mmHg']].map(([l,v,u]) => (
 <div key={l} className="bg-white/5 rounded-lg p-1.5 text-center">
 <div className="text-[7px] text-[#00B4D8]">{l}</div>
 <div className="font-bold text-[10px]">{v}</div>
 <div className="text-[6px] text-gray-500">{u}</div>
 </div>
 ))}
 </div>

 {/* Next appointment */}
 <div className="mx-3 bg-gradient-to-r from-[#0B4A6F]/60 to-[#00B4D8]/20 rounded-xl p-2.5 border border-[#00B4D8]/20">
 <div className="text-[7px] text-gray-400 mb-1">موعدك القادم</div>
 <div className="font-bold text-[9px]">د. سارة المطيري</div>
 <div className="text-[7px] text-[#00B4D8]">الجمعة · ١٠:٣٠ ص</div>
 </div>

 {/* Tap to explore overlay */}
 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
 <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-[#050D1A] text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
 <Smartphone size={10} />
 جرّب التطبيق
 </div>
 </div>

 {/* Bottom bar */}
 <div className="absolute bottom-0 inset-x-0 h-10 bg-[#0A1220]/90 border-t border-white/5 flex justify-around items-center px-2">
 {['','','','‍',''].map((icon, i) => (
 <span key={i} className={`text-sm ${i === 0 ? 'opacity-100' : 'opacity-40'}`}>{icon}</span>
 ))}
 </div>
 </div>
 </motion.div>
 </div>

 </div>
 </div>

 {/* Scroll indicator */}
 <motion.div 
 animate={{ y: [0, 10, 0] }}
 transition={{ repeat: Infinity, duration: 2 }}
 className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center"
 >
 <span className="text-xs mb-2">استكشف المزيد</span>
 <ChevronDown size={20} />
 </motion.div>

 <AppModal open={modalOpen} onClose={() => setModalOpen(false)} />
 </section>
 );
};
