import React from 'react';
import { motion } from 'framer-motion';

export const WebShowcase = () => {
  return (
    <section className="py-24 relative bg-[#020611] overflow-hidden">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white mb-6"
          >
            موقع إلكتروني يعكس <br className="md:hidden"/>
            <span className="text-gradient-cyan">احترافية عيادتك</span>
          </motion.h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            واجهة بيضاء نقية ومريحة لمرضاك على الويب. متجاوب بالكامل مع جميع الشاشات ومُحسّن لمحركات البحث (SEO) لزيادة اكتشاف عيادتك.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Outer glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-primary rounded-2xl blur opacity-20" />
          
          <div className="relative rounded-xl overflow-hidden bg-[#E2E8F0] shadow-2xl border border-white/10">
            {/* Safari Header */}
            <div className="bg-[#f1f5f9] h-12 flex items-center px-4 border-b border-gray-300 gap-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                <div className="w-3 h-3 rounded-full bg-[#eab308]" />
                <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
              </div>
              <div className="bg-white px-32 py-1 rounded text-xs text-gray-400 font-mono shadow-sm flex-1 text-center max-w-xl mx-auto">
                <span className="text-gray-300">https://</span>
                <span className="text-gray-600">clinic-name.com</span>
              </div>
            </div>

            {/* Website Content (Clean, White, Medical) */}
            <div className="bg-white w-full h-[500px] overflow-hidden flex flex-col relative">
              {/* Navbar */}
              <header className="flex justify-between items-center px-10 py-5 border-b border-gray-100 bg-white/80 backdrop-blur-md absolute top-0 w-full z-10">
                <div className="font-bold text-[#050D1A] text-xl flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#0EA5E9] rounded-lg" />
                  المركز التخصصي
                </div>
                <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
                  <span className="text-[#0EA5E9]">الرئيسية</span>
                  <span className="hover:text-[#0EA5E9] cursor-pointer">من نحن</span>
                  <span className="hover:text-[#0EA5E9] cursor-pointer">التخصصات</span>
                  <span className="hover:text-[#0EA5E9] cursor-pointer">أطبائنا</span>
                  <span className="hover:text-[#0EA5E9] cursor-pointer">تواصل معنا</span>
                </nav>
                <button className="bg-[#050D1A] text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-black/10 hover:bg-black transition-colors">
                  احجز موعدك الآن
                </button>
              </header>

              {/* Hero Section of the Mocked Website */}
              <div className="pt-32 px-10 flex-1 grid grid-cols-2 gap-10 bg-slate-50 relative">
                 <div className="flex flex-col justify-center z-10">
                   <div className="inline-block bg-cyan-100 text-cyan-800 text-xs font-bold px-3 py-1 rounded-full mb-4 w-fit">
                     الرعاية التي تستحقها
                   </div>
                   <h1 className="text-4xl font-black text-[#050D1A] leading-tight mb-4">
                     صحتك بين أيدي <br />
                     <span className="text-[#0EA5E9]">نخبة من الاستشاريين</span>
                   </h1>
                   <p className="text-gray-500 mb-8 max-w-md">
                     نقدم خدمات طبية متكاملة وفق أعلى معايير الجودة العالمية، مع التركيز على راحة المريض وتقديم تجربة علاجية استثنائية.
                   </p>
                   <div className="flex gap-4">
                     <button className="bg-[#0EA5E9] text-white px-6 py-3 rounded-lg text-sm font-bold shadow-lg shadow-cyan-500/30">
                       احجز موعدك
                     </button>
                     <button className="bg-white text-[#050D1A] border border-gray-200 px-6 py-3 rounded-lg text-sm font-bold hover:bg-gray-50">
                       تعرف على أطبائنا
                     </button>
                   </div>
                   
                   <div className="mt-12 flex gap-8">
                     <div>
                       <div className="text-2xl font-black text-[#050D1A]">15+</div>
                       <div className="text-xs text-gray-500">تخصص طبي</div>
                     </div>
                     <div>
                       <div className="text-2xl font-black text-[#050D1A]">40+</div>
                       <div className="text-xs text-gray-500">طبيب استشاري</div>
                     </div>
                     <div>
                       <div className="text-2xl font-black text-[#050D1A]">98%</div>
                       <div className="text-xs text-gray-500">رضا المرضى</div>
                     </div>
                   </div>
                 </div>
                 
                 <div className="relative flex items-end justify-center pb-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.1)_0%,transparent_70%)]" />
                    <img 
                      src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&w=500&q=80" 
                      alt="Doctor Professional" 
                      className="relative z-10 w-3/4 object-cover object-top mask-image-[linear-gradient(to_bottom,black_60%,transparent_100%)] h-[400px]"
                      style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }}
                    />
                    
                    {/* Floating elements inside mockup */}
                    <div className="absolute top-20 right-10 bg-white p-3 rounded-xl shadow-xl z-20 flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</div>
                      <div>
                        <div className="text-xs font-bold text-gray-800">حجز مؤكد</div>
                        <div className="text-[10px] text-gray-500">تم تأكيد موعدك بنجاح</div>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
