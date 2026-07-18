import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const AppShowcase = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0.2, 0.4], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -translate-y-1/2" />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              تجربة <span className="text-gradient-gold">المريض</span> <br/>
              في راحة يده
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              تطبيق موبايل (iOS & Android) يعكس هوية عيادتك بالكامل. تصميم عصري داكن يريح العين ويشعر المريض بالفخامة والتطور.
            </p>
            
            <ul className="space-y-6">
              {[
                { title: "حجز موعد بـ 3 نقرات", desc: "لا مزيد من الانتظار على الهاتف. المريض يرى الأوقات المتاحة ويحجز فوراً." },
                { title: "نتائج التحاليل المباشرة", desc: "تصل النتيجة لتطبيق المريض بمجرد اعتمادها من المختبر، مع تنبيه فوري." },
                { title: "تذكير بالأدوية والمواعيد", desc: "إشعارات ذكية لضمان التزام المريض بالخطة العلاجية والعودة في الوقت المحدد." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 mt-1">
                    <span className="font-bold text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Three App Screens Cascading */}
          <motion.div 
            style={{ scale, opacity }}
            className="relative h-[600px] flex items-center justify-center"
          >
            {/* Screen 1 (Back) */}
            <div className="absolute right-0 top-10 w-[240px] h-[500px] bg-[#111] rounded-[2rem] border-4 border-[#222] shadow-2xl opacity-60 scale-90 -rotate-6 transition-transform hover:scale-95 hover:z-20 hover:opacity-100 hover:rotate-0 duration-500">
               <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=300&q=80" alt="Medical App Screen" className="w-full h-full object-cover rounded-[1.8rem] opacity-50 mix-blend-luminosity" />
               <div className="absolute inset-0 bg-gradient-to-b from-[#050D1A]/80 to-[#050D1A] rounded-[1.8rem] flex flex-col p-4">
                  <div className="w-full h-12 bg-white/5 rounded-xl mb-4" />
                  <div className="w-full h-32 bg-white/5 rounded-xl mb-4" />
                  <div className="w-full h-24 bg-white/5 rounded-xl mb-4" />
               </div>
            </div>

            {/* Screen 2 (Middle) */}
            <div className="absolute right-20 top-5 w-[240px] h-[500px] bg-[#111] rounded-[2rem] border-4 border-[#333] shadow-2xl opacity-80 scale-95 -rotate-3 z-10 transition-transform hover:scale-100 hover:z-30 hover:opacity-100 hover:rotate-0 duration-500">
               <div className="w-full h-full bg-[#0a101d] rounded-[1.8rem] p-4 flex flex-col relative overflow-hidden">
                 <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/20 blur-2xl rounded-full" />
                 <h3 className="text-white font-bold text-sm mb-4 mt-8 relative z-10">نتائج التحاليل</h3>
                 <div className="space-y-3 relative z-10">
                   {[1,2,3].map(i => (
                     <div key={i} className="bg-white/5 border border-white/5 p-3 rounded-xl">
                       <div className="flex justify-between items-center mb-2">
                         <span className="text-xs text-white">صورة دم كاملة (CBC)</span>
                         <span className="text-[10px] text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-full">مكتمل</span>
                       </div>
                       <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                         <div className="w-full h-full bg-cyan-500" />
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
            </div>

            {/* Screen 3 (Front Focus) */}
            <div className="absolute right-40 top-0 w-[260px] h-[540px] bg-[#000] rounded-[2.5rem] border-[6px] border-[#222] shadow-[0_0_50px_rgba(14,165,233,0.15)] z-20 transition-transform hover:scale-105 duration-500">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#222] rounded-b-xl z-30" />
              <div className="w-full h-full bg-[#050D1A] rounded-[2rem] p-5 pt-10 overflow-hidden relative">
                 <div className="flex justify-between items-center mb-6">
                   <div className="text-white font-bold">المواعيد</div>
                   <div className="text-primary text-xs">أغسطس 2023</div>
                 </div>
                 
                 {/* Calendar Strip */}
                 <div className="flex gap-2 mb-6 overflow-hidden">
                    {[12,13,14,15,16].map((day, i) => (
                      <div key={day} className={`flex flex-col items-center justify-center w-12 h-16 rounded-2xl ${i === 2 ? 'bg-primary text-[#050D1A] shadow-lg shadow-primary/20' : 'bg-white/5 text-gray-400'}`}>
                        <span className="text-[10px] mb-1">{['أحد','إثن','ثلا','أرب','خمي'][i]}</span>
                        <span className="font-bold text-sm">{day}</span>
                      </div>
                    ))}
                 </div>

                 <div className="text-xs text-gray-400 mb-3">الأطباء المتاحين</div>
                 
                 {/* Doctor List */}
                 <div className="space-y-3">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex gap-3 items-center">
                      <div className="w-12 h-12 rounded-xl bg-gray-800 overflow-hidden shrink-0">
                        <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=100&q=80" alt="Doctor" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-white mb-1">د. أحمد محمد</div>
                        <div className="text-[10px] text-cyan-400 mb-2">استشاري أمراض القلب</div>
                        <div className="flex gap-2">
                           <div className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-300">10:00 ص</div>
                           <div className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-300">11:30 ص</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex gap-3 items-center">
                      <div className="w-12 h-12 rounded-xl bg-gray-800 overflow-hidden shrink-0">
                        <img src="https://images.unsplash.com/photo-1594824461559-ea49ce9fa50c?auto=format&fit=crop&w=100&q=80" alt="Doctor" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-white mb-1">د. سارة فهد</div>
                        <div className="text-[10px] text-cyan-400 mb-2">أخصائية جلدية</div>
                        <div className="flex gap-2">
                           <div className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-300">04:00 م</div>
                           <div className="text-[10px] bg-primary text-[#050D1A] px-2 py-0.5 rounded font-bold">احجز</div>
                        </div>
                      </div>
                    </div>
                 </div>

              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
