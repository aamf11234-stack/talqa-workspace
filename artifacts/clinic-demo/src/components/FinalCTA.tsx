import React from 'react';
import { motion } from 'framer-motion';

export const FinalCTA = () => {
 return (
 <section className="py-32 relative bg-[#050D1A] overflow-hidden border-t border-white/5">
 {/* Decorative */}
 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-primary/10 rounded-[100%] blur-[120px] pointer-events-none" />
 
 <div className="container mx-auto px-6 relative z-10 text-center">
 
 <motion.div 
 initial={{ opacity: 0, scale: 0.9 }}
 whileInView={{ opacity: 1, scale: 1 }}
 viewport={{ once: true }}
 className="max-w-3xl mx-auto glass-panel p-10 md:p-16 rounded-[2.5rem] border border-primary/20 relative overflow-hidden"
 >
 {/* Shine effect */}
 <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-45deg] animate-[shine_4s_infinite]" />

 <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
 حان الوقت لتصبح <br/>
 <span className="text-gradient-gold">عيادة رقمية بالكامل</span>
 </h2>
 
 <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto">
 احصل على الموقع الإلكتروني، تطبيق المريض، ولوحة التحكم بسعر استثماري لمرة واحدة وتأسيس فوري.
 </p>

 <div className="bg-black/40 rounded-2xl p-6 mb-10 inline-block border border-white/5">
 <div className="text-sm text-gray-400 mb-2">استثمار العيادة الرقمية الكاملة</div>
 <div className="text-5xl font-black text-white">18,000 <span className="text-2xl text-primary font-bold">ريال</span></div>
 <div className="text-xs text-primary/60 mt-3">+ ضمان دعم فني لمدة 3 أشهر</div>
 </div>

 <div className="flex flex-col sm:flex-row justify-center gap-4">
 <a 
 href="#"
 className="bg-[#25D366] hover:bg-[#128C7E] text-white px-10 py-5 rounded-xl font-bold text-xl flex items-center justify-center gap-3 transition-colors shadow-lg shadow-[#25D366]/20"
 >
 تواصل معنا عبر واتساب
 </a>
 </div>

 </motion.div>

 {/* Footer */}
 <div className="mt-24 text-center border-t border-white/5 pt-8">
 <div className="text-xl font-black text-white tracking-widest uppercase mb-4">
 TALQA <span className="text-primary">TECH</span>
 </div>
 <p className="text-gray-500 text-sm">
 © 2024 شركة تلقا تك لتقنية المعلومات. جميع الحقوق محفوظة للعيادات الطبية في المملكة العربية السعودية.
 </p>
 </div>
 </div>

 <style>{`
 @keyframes shine {
 0% { left: -100%; }
 20% { left: 200%; }
 100% { left: 200%; }
 }
 `}</style>
 </section>
 );
};
