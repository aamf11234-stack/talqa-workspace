import { Link } from "wouter";
import { motion } from "framer-motion";
import { UtensilsCrossed, Stethoscope, Dumbbell, ShoppingBag } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-32 pb-24 px-6 overflow-hidden bg-bg">
        {/* Warm radial glow */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none" 
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(216,203,181,0.35) 0%, transparent 65%)" }} 
        />
        
        <div className="relative z-10 flex flex-col items-center text-center w-full max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#EAE3D2] border border-[#D4C9B5] text-[#5C524E] rounded-full px-4 py-1.5 text-sm font-medium mb-8"
          >
            ✦ منصة القوالب العربية الأولى
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 flex flex-col gap-2"
          >
            <span className="text-[#5C524E] font-normal tracking-normal text-[clamp(2.2rem,4vw,3.5rem)] leading-tight">
              قوالب جاهزة لكل
            </span>
            <span className="text-[#1A1208] font-[800]">
              مطعم، عيادة، نادي، متجر
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#5C524E] max-w-[520px] mx-auto text-lg md:text-xl mb-10 leading-[1.8]"
          >
            اختر قالبك، خصّصه، وأطلق مشروعك في دقائق — بدون خبرة تقنية
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link 
              href="/templates"
              className="bg-[#2C221E] text-[#FAF8F5] rounded-full px-7 py-3.5 font-semibold text-lg hover:scale-105 hover:bg-[#3D2E28] transition-all duration-250 flex-1 sm:flex-none text-center"
            >
              تصفح القوالب
            </Link>
            <a 
              href="https://wa.me/966551378531"
              target="_blank"
              rel="noreferrer"
              className="border border-[#2C221E] text-[#2C221E] bg-transparent rounded-full px-7 py-3.5 font-semibold text-lg hover:scale-105 transition-all duration-250 flex-1 sm:flex-none text-center"
            >
              شاهد كيف يعمل
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-4 mt-8 text-[#9C8F85] text-xs font-medium tracking-wide"
          >
            <span>١٢+ قالب جاهز</span>
            <span className="w-1 h-1 rounded-full bg-[#D4C9B5]" />
            <span>٤ قطاعات</span>
            <span className="w-1 h-1 rounded-full bg-[#D4C9B5]" />
            <span>دعم فوري</span>
          </motion.div>
        </div>

        {/* MOCKUP SHOWCASE */}
        <div className="relative z-10 mt-20 md:mt-32 w-full max-w-4xl mx-auto flex justify-center items-center h-[320px] md:h-[400px]">
          
          {/* Card 2 (Left/Behind) */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[5%] md:left-[10%] w-[220px] md:w-[260px] h-[300px] md:h-[340px] bg-white rounded-3xl border border-[#EAE3D2] shadow-xl rotate-[-8deg] z-0 overflow-hidden flex flex-col pointer-events-none"
          >
            <div className="h-8 border-b border-[#EAE3D2] flex items-center px-4 gap-1.5 bg-[#F5F2EB]/50">
               <div className="w-2 h-2 rounded-full bg-[#EAE3D2]" />
               <div className="w-2 h-2 rounded-full bg-[#EAE3D2]" />
            </div>
            <div className="p-4 flex-1 flex flex-col gap-3">
              <div className="w-full h-24 bg-[#EAE3D2] rounded-xl" />
              <div className="w-3/4 h-4 bg-[#F5F2EB] rounded-md" />
              <div className="w-1/2 h-4 bg-[#F5F2EB] rounded-md" />
              <div className="grid grid-cols-2 gap-2 mt-auto">
                <div className="h-16 bg-[#F5F2EB] rounded-lg" />
                <div className="h-16 bg-[#F5F2EB] rounded-lg" />
              </div>
            </div>
          </motion.div>

          {/* Card 3 (Right/Behind) */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute right-[5%] md:right-[10%] w-[200px] md:w-[240px] h-[280px] md:h-[320px] bg-white rounded-3xl border border-[#EAE3D2] shadow-xl rotate-[6deg] z-0 overflow-hidden flex flex-col pointer-events-none"
          >
            <div className="h-8 border-b border-[#EAE3D2] flex items-center px-4 gap-1.5 bg-[#F5F2EB]/50 justify-end">
               <div className="w-2 h-2 rounded-full bg-[#EAE3D2]" />
               <div className="w-2 h-2 rounded-full bg-[#EAE3D2]" />
            </div>
            <div className="p-4 flex-1 flex flex-col gap-3">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full bg-[#EAE3D2]" />
                <div className="flex-1 flex flex-col justify-center gap-2">
                   <div className="w-full h-3 bg-[#F5F2EB] rounded-md" />
                   <div className="w-2/3 h-3 bg-[#F5F2EB] rounded-md" />
                </div>
              </div>
              <div className="w-full h-32 bg-[#F5F2EB] rounded-xl mt-2" />
            </div>
          </motion.div>

          {/* Card 1 (Main/Front) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-[280px] md:w-[400px] bg-white rounded-3xl shadow-[0_32px_80px_rgba(44,34,30,0.12)] border border-[#EAE3D2] overflow-hidden flex flex-col pointer-events-none"
          >
            {/* Chrome bar */}
            <div className="h-10 border-b border-[#EAE3D2] flex items-center px-4 justify-between bg-white">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
                <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                <div className="w-2 h-2 rounded-full bg-[#10B981]" />
              </div>
              <div className="w-24 md:w-32 h-2 bg-[#F5F2EB] rounded-full mx-auto" />
              <div className="w-6" /> {/* Spacer */}
            </div>
            
            {/* App Layout */}
            <div className="flex flex-col pb-4">
              <div className="h-8 md:h-10 bg-[#EAE3D2] w-full" />
              <div className="h-20 md:h-28 mx-4 mt-3 rounded-2xl bg-gradient-to-br from-[#EAE3D2] to-[#D8CBB5]" />
              
              <div className="grid grid-cols-2 gap-3 px-4 mt-4">
                {[1, 2].map(i => (
                  <div key={i} className="bg-white rounded-xl border border-[#EAE3D2] p-2 md:p-3 flex flex-col gap-2 shadow-sm">
                    <div className="h-10 md:h-12 bg-[#F0EBE3] rounded-lg w-full" />
                    <div className="w-3/4 h-2 bg-[#EAE3D2] rounded-full" />
                    <div className="w-1/2 h-2 bg-[#F5F2EB] rounded-full" />
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-4 mt-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#EAE3D2]" />
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* SECTORS SECTION */}
      <section className="bg-[#F5F2EB] py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-[#9C8F85] text-sm font-bold uppercase tracking-wide mb-3">
              القطاعات المدعومة
            </h3>
            <h2 className="text-[#1A1208]">
              قالب لكل نوع أعمال
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "المطاعم والكافيهات",
                desc: "قائمة QR، طلبات أونلاين، ولاء، حجوزات",
                icon: UtensilsCrossed,
              },
              {
                title: "العيادات والصحة",
                desc: "حجز مواعيد، ملف مريض، Apple Wallet",
                icon: Stethoscope,
              },
              {
                title: "النوادي الرياضية",
                desc: "اشتراكات، جداول، بطاقات عضوية رقمية",
                icon: Dumbbell,
              },
              {
                title: "المتاجر والمكاتب",
                desc: "متجر كامل، دفع إلكتروني، تقارير مبيعات",
                icon: ShoppingBag,
              }
            ].map((sector, i) => (
              <motion.div
                key={i}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 24 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-2xl p-8 border border-[#EAE3D2] hover:border-[#2C221E] hover:shadow-[0_16px_48px_rgba(44,34,30,0.10)] hover:-translate-y-1.5 transition-all duration-300 cursor-default"
              >
                <div className="w-12 h-12 bg-[#F5F2EB] rounded-2xl flex items-center justify-center mb-6">
                  <sector.icon size={22} className="text-[#2C221E]" />
                </div>
                <h3 className="text-xl font-bold text-[#1A1208] mb-2">{sector.title}</h3>
                <p className="text-[#5C524E] text-lg">{sector.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="bg-[#FAF8F5] py-28 px-6 text-center flex flex-col items-center justify-center">
        <h2 className="text-[#1A1208] mb-4">جاهز تطلق مشروعك؟</h2>
        <p className="text-[#5C524E] text-xl mb-10 max-w-md mx-auto">
          اختر قالبك واشتغل من اليوم الأول
        </p>
        <a
          href="https://wa.me/966551378531"
          target="_blank"
          rel="noreferrer"
          className="bg-[#2C221E] text-[#FAF8F5] rounded-full px-10 py-4 text-xl font-bold hover:bg-[#3D2E28] hover:scale-105 transition-all shadow-lg shadow-[#2C221E]/10"
        >
          ابدأ مجاناً
        </a>
      </section>
    </div>
  );
}
