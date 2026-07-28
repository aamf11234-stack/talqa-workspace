import { useState } from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[#1A1208] mb-4">تسعير شفاف</h2>
          <p className="text-[#5C524E] text-xl mb-10">خطط تناسب كل مشروع</p>

          <div className="inline-flex items-center bg-[#EAE3D2] rounded-full p-1 relative mx-auto">
            {/* Active Pill Background */}
            <div 
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm transition-transform duration-300 ease-out ${
                isAnnual ? "-translate-x-full right-[calc(50%+3px)]" : "translate-x-0 right-1"
              }`} 
            />
            
            <button
              onClick={() => setIsAnnual(false)}
              className={`relative z-10 px-8 py-2.5 rounded-full text-base font-semibold transition-colors duration-200 ${
                !isAnnual ? "text-[#1A1208]" : "text-[#5C524E] hover:text-[#1A1208]"
              }`}
            >
              شهري
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`relative z-10 px-8 py-2.5 rounded-full text-base font-semibold transition-colors duration-200 flex items-center gap-2 ${
                isAnnual ? "text-[#1A1208]" : "text-[#5C524E] hover:text-[#1A1208]"
              }`}
            >
              سنوي
              <span className="bg-[#2C221E] text-[#FAF8F5] text-[10px] px-2 py-0.5 rounded-full">
                وفّر ٢٠٪
              </span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Plan 1 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-3xl p-8 border border-[#EAE3D2] flex flex-col"
          >
            <h3 className="text-[#1A1208] text-2xl font-bold mb-4">الأساسية</h3>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-[800] text-[#1A1208]">
                {isAnnual ? Math.floor(99 * 0.8) : 99}
              </span>
              <span className="text-[#9C8F85] text-base font-medium">ريال/شهر</span>
            </div>
            
            <ul className="flex flex-col gap-4 mb-10 flex-1">
              {["قالب واحد", "SSL مجاني", "دعم واتساب"].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-[#5C524E] text-lg">
                  <Check size={20} className="text-[#2C221E] shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <a
              href="https://wa.me/966551378531"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 rounded-full border border-[#2C221E] text-[#2C221E] font-bold text-center hover:bg-[#F5F2EB] transition-colors"
            >
              اشترك الآن
            </a>
          </motion.div>

          {/* Plan 2: Featured */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-3xl p-8 border-2 border-[#2C221E] shadow-[0_24px_64px_rgba(44,34,30,0.12)] flex flex-col relative lg:-my-4 lg:py-12 z-10"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#2C221E] text-[#FAF8F5] rounded-full px-4 py-1.5 text-xs font-bold whitespace-nowrap">
              الأكثر طلباً
            </div>
            <h3 className="text-[#1A1208] text-2xl font-bold mb-4">الأعمال</h3>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-[800] text-[#1A1208]">
                {isAnnual ? Math.floor(249 * 0.8) : 249}
              </span>
              <span className="text-[#9C8F85] text-base font-medium">ريال/شهر</span>
            </div>
            
            <ul className="flex flex-col gap-4 mb-10 flex-1">
              {["٣ قوالب", "تطبيق جوال", "دومين مجاني", "دعم أولوية"].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-[#1A1208] font-medium text-lg">
                  <Check size={20} className="text-[#2C221E] shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <a
              href="https://wa.me/966551378531"
              target="_blank"
              rel="noreferrer"
              className="w-full py-4 rounded-full bg-[#2C221E] text-[#FAF8F5] font-bold text-center hover:bg-[#3D2E28] transition-colors text-lg"
            >
              ابدأ الآن
            </a>
          </motion.div>

          {/* Plan 3 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-3xl p-8 border border-[#EAE3D2] flex flex-col"
          >
            <h3 className="text-[#1A1208] text-2xl font-bold mb-4">المتقدمة</h3>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-[800] text-[#1A1208]">
                {isAnnual ? Math.floor(499 * 0.8) : 499}
              </span>
              <span className="text-[#9C8F85] text-base font-medium">ريال/شهر</span>
            </div>
            
            <ul className="flex flex-col gap-4 mb-10 flex-1">
              {["قوالب غير محدودة", "ربط API مخصص", "مدير حساب شخصي"].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-[#5C524E] text-lg">
                  <Check size={20} className="text-[#2C221E] shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <a
              href="https://wa.me/966551378531"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 rounded-full border border-[#2C221E] text-[#2C221E] font-bold text-center hover:bg-[#F5F2EB] transition-colors"
            >
              تواصل معنا
            </a>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
