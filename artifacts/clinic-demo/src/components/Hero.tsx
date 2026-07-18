import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Monitor, Smartphone, Activity } from 'lucide-react';

export const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -50]);
  const y2 = useTransform(scrollY, [0, 500], [0, 50]);

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
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all"
              >
                شاهد العرض التفصيلي
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
              {/* Browser Content (White, Clean Medical) */}
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
                    {/* Floating Doctor Card */}
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

            {/* Mobile App Mockup */}
            <motion.div 
              style={{ y: y1 }}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 100 }}
              className="absolute left-0 md:left-20 z-20 w-[260px] h-[540px] bg-[#0A0A0A] rounded-[2.5rem] border-[6px] border-gray-800 p-2 shadow-2xl overflow-hidden"
            >
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-30" />
              
              {/* App Screen */}
              <div className="bg-[#050D1A] w-full h-full rounded-[2rem] overflow-hidden relative text-white">
                <div className="p-5 pt-10">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <div className="text-xs text-gray-400">مرحباً بك</div>
                      <div className="font-bold text-sm">أحمد خالد</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-800 overflow-hidden border border-gray-700">
                      <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" alt="User" />
                    </div>
                  </div>

                  {/* Vitals */}
                  <div className="flex justify-between mb-6">
                    <div className="bg-[#0f1b2e] p-3 rounded-xl w-[30%] text-center border border-white/5">
                      <div className="text-[10px] text-cyan-400 mb-1">النبض</div>
                      <div className="font-bold text-sm">72</div>
                      <div className="text-[8px] text-gray-500">bpm</div>
                    </div>
                    <div className="bg-[#0f1b2e] p-3 rounded-xl w-[30%] text-center border border-white/5">
                      <div className="text-[10px] text-rose-400 mb-1">الضغط</div>
                      <div className="font-bold text-sm">120/80</div>
                      <div className="text-[8px] text-gray-500">mmHg</div>
                    </div>
                    <div className="bg-[#0f1b2e] p-3 rounded-xl w-[30%] text-center border border-white/5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-primary/10" />
                      <div className="text-[10px] text-primary mb-1">السكر</div>
                      <div className="font-bold text-sm">95</div>
                      <div className="text-[8px] text-gray-500">mg/dL</div>
                    </div>
                  </div>

                  {/* Next Appointment */}
                  <div className="mb-4">
                    <div className="text-xs font-bold mb-3 flex items-center justify-between">
                      <span>موعدك القادم</span>
                      <span className="text-cyan-400 text-[10px]">عرض الكل</span>
                    </div>
                    <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 p-4 rounded-xl border border-cyan-500/20 relative overflow-hidden">
                      <div className="absolute -right-4 -top-4 w-16 h-16 bg-cyan-500/20 rounded-full blur-xl" />
                      <div className="flex gap-3 items-center relative z-10">
                        <div className="bg-white/10 p-2 rounded-lg text-center min-w-12">
                          <div className="text-[10px] font-medium text-cyan-200">12 مايو</div>
                          <div className="font-bold text-sm">10:30</div>
                        </div>
                        <div>
                          <div className="font-bold text-sm text-white">عيادة الباطنة</div>
                          <div className="text-[10px] text-cyan-100/70">د. سارة الأحمد</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                     <div className="bg-[#0f1b2e] py-3 rounded-xl text-center border border-white/5 flex flex-col items-center gap-2">
                       <Activity size={16} className="text-primary" />
                       <span className="text-[10px] font-medium">نتائج التحاليل</span>
                     </div>
                     <div className="bg-[#0f1b2e] py-3 rounded-xl text-center border border-white/5 flex flex-col items-center gap-2">
                       <Monitor size={16} className="text-cyan-400" />
                       <span className="text-[10px] font-medium">وصفات طبية</span>
                     </div>
                  </div>

                </div>

                {/* Bottom Tab Bar */}
                <div className="absolute bottom-0 inset-x-0 h-16 bg-[#0A1220]/90 backdrop-blur-md border-t border-white/5 flex justify-around items-center px-4 pb-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary"><Activity size={14} /></div>
                  <div className="w-8 h-8 flex items-center justify-center text-gray-500"><Monitor size={14} /></div>
                  <div className="w-10 h-10 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/30 flex items-center justify-center text-white -mt-4"><Activity size={18} /></div>
                  <div className="w-8 h-8 flex items-center justify-center text-gray-500"><Monitor size={14} /></div>
                  <div className="w-8 h-8 flex items-center justify-center text-gray-500"><Smartphone size={14} /></div>
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
    </section>
  );
};
