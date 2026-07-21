import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BarChart3, Users, TrendingUp } from 'lucide-react';

export const DashboardShowcase = () => {
 const { scrollYProgress } = useScroll();
 const y = useTransform(scrollYProgress, [0.4, 0.8], [100, -50]);

 return (
 <section className="py-24 relative overflow-hidden bg-[#050D1A]">
 <div className="container mx-auto px-6">
 
 <div className="text-center max-w-3xl mx-auto mb-20 relative z-10">
 <motion.h2 
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="text-3xl md:text-5xl font-black text-white mb-6"
 >
 السيطرة الكاملة في <span className="text-gradient-cyan">لوحة تحكم واحدة</span>
 </motion.h2>
 <p className="text-muted-foreground text-lg">
 لا داعي لسؤال المحاسب أو موظف الاستقبال. كل أرقام عيادتك، أداء الأطباء، ومعدلات الحجز أمامك مباشرة في لوحة تحكم ذكية وصلاحيات مخصصة.
 </p>
 </div>

 <div className="relative max-w-6xl mx-auto">
 {/* MacBook Frame */}
 <motion.div 
 style={{ y }}
 className="relative z-10 bg-[#1A1A1A] p-2 rounded-t-3xl rounded-b-lg border-t-[8px] border-x-[8px] border-b-[24px] border-[#2A2A2A] shadow-2xl"
 >
 {/* Camera */}
 <div className="absolute top-[-14px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black border border-[#444]" />
 
 {/* Dashboard Screen */}
 <div className="bg-[#0A0A0A] rounded-xl overflow-hidden h-[500px] border border-white/5 flex flex-col">
 {/* Dashboard Header */}
 <div className="h-14 border-b border-white/5 bg-[#111] flex items-center justify-between px-6">
 <div className="flex items-center gap-4">
 <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">ط.تك</div>
 <div className="text-white text-sm font-semibold">لوحة الإدارة | عيادات النخبة</div>
 </div>
 <div className="flex items-center gap-4 text-gray-400">
 <span className="text-xs">د. محمد القحطاني (مدير النظام)</span>
 <div className="w-8 h-8 rounded-full bg-gray-800" />
 </div>
 </div>

 {/* Dashboard Body */}
 <div className="flex flex-1 overflow-hidden">
 {/* Sidebar */}
 <div className="w-48 border-l border-white/5 bg-[#111]/50 p-4 flex flex-col gap-2">
 <div className="bg-primary/10 text-primary px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2">
 <BarChart3 size={14} /> نظرة عامة
 </div>
 <div className="text-gray-400 hover:bg-white/5 px-3 py-2 rounded-lg text-xs flex items-center gap-2 cursor-pointer transition-colors">
 <Users size={14} /> المرضى
 </div>
 <div className="text-gray-400 hover:bg-white/5 px-3 py-2 rounded-lg text-xs flex items-center gap-2 cursor-pointer transition-colors">
 <TrendingUp size={14} /> التقارير المالية
 </div>
 </div>

 {/* Main Content Area */}
 <div className="flex-1 p-6 bg-[#050D1A] overflow-y-auto">
 <div className="grid grid-cols-3 gap-6 mb-8">
 <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
 <div className="text-gray-400 text-xs mb-1">مرضى اليوم</div>
 <div className="text-2xl font-bold text-white mb-2">42</div>
 <div className="text-[10px] text-green-400 flex items-center gap-1"><TrendingUp size={10}/> +12% عن الأمس</div>
 </div>
 <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
 <div className="text-gray-400 text-xs mb-1">إيرادات اليوم</div>
 <div className="text-2xl font-bold text-cyan-400 mb-2">12,450 <span className="text-xs font-normal">ريال</span></div>
 <div className="text-[10px] text-green-400 flex items-center gap-1"><TrendingUp size={10}/> +5% عن الأمس</div>
 </div>
 <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl">
 <div className="text-primary/80 text-xs mb-1">نسبة العودة (Retention)</div>
 <div className="text-2xl font-bold text-primary mb-2">68%</div>
 <div className="text-[10px] text-primary/60">من خلال تطبيق المرضى</div>
 </div>
 </div>

 <div className="grid grid-cols-2 gap-6">
 <div className="bg-white/5 border border-white/5 p-4 rounded-2xl h-64 flex flex-col">
 <div className="text-sm font-bold text-white mb-4">المواعيد القادمة (مباشر)</div>
 <div className="flex-1 space-y-3">
 {[
 {n: "أحمد العتيبي", t: "10:30 ص", d: "د. سارة", s: "مؤكد من التطبيق"},
 {n: "نورة الدوسري", t: "11:00 ص", d: "د. فهد", s: "في الانتظار"},
 {n: "خالد السالم", t: "11:30 ص", d: "د. سارة", s: "مؤكد من التطبيق"},
 ].map((appt, i) => (
 <div key={i} className="flex justify-between items-center bg-black/20 p-3 rounded-xl border border-white/5">
 <div>
 <div className="text-xs text-white font-bold">{appt.n}</div>
 <div className="text-[10px] text-gray-500">{appt.d}</div>
 </div>
 <div className="text-left">
 <div className="text-xs text-cyan-400">{appt.t}</div>
 <div className="text-[9px] text-gray-400">{appt.s}</div>
 </div>
 </div>
 ))}
 </div>
 </div>
 <div className="bg-white/5 border border-white/5 p-4 rounded-2xl h-64 relative overflow-hidden flex flex-col">
 <div className="text-sm font-bold text-white mb-4">أداء العيادات هذا الأسبوع</div>
 {/* Mock Chart */}
 <div className="flex-1 flex items-end gap-4 px-4 pt-8">
 {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
 <div key={i} className="flex-1 bg-gradient-to-t from-cyan-900/50 to-cyan-500/50 rounded-t-sm relative group" style={{ height: `${h}%` }}>
 <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] text-white opacity-0 group-hover:opacity-100 transition-opacity">{h * 10}</div>
 </div>
 ))}
 </div>
 <div className="flex justify-between mt-2 px-4 text-[9px] text-gray-500">
 <span>السبت</span><span>الأحد</span><span>الإثنين</span><span>الثلاثاء</span><span>الأربعاء</span><span>الخميس</span><span>الجمعة</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 {/* MacBook Bottom Lip */}
 <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[120%] h-6 bg-gradient-to-b from-[#2A2A2A] to-[#111] rounded-b-[40px] -z-10 shadow-2xl" />
 </motion.div>
 
 {/* Floor glow for depth */}
 <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-cyan-500/20 blur-[60px] rounded-[100%]" />
 </div>

 </div>
 </section>
 );
};
