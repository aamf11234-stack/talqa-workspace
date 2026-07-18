import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight } from 'lucide-react';

export const ROICalculator = () => {
  const [patients, setPatients] = useState<number>(200);
  const [avgBill, setAvgBill] = useState<number>(300);

  // Assumptions
  const retentionIncrease = 0.15; // 15% more returning patients due to app
  const newPatientsFromWeb = 0.05; // 5% more new patients from SEO web
  
  const weeklyRevenue = patients * avgBill;
  const monthlyRevenue = weeklyRevenue * 4;
  
  // Calculate added value
  const addedMonthlyRevenue = (monthlyRevenue * retentionIncrease) + (monthlyRevenue * newPatientsFromWeb);
  const investment = 18000;
  
  const paybackWeeks = Math.ceil(investment / (addedMonthlyRevenue / 4));

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-2">
              <Calculator size={28} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              لا تنظر للتكلفة..<br/>
              <span className="text-gradient-gold">احسب العائد على الاستثمار</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              التطبيق ليس مصروفاً، بل مندوب مبيعات يعمل 24 ساعة. عندما يتذكر المريض موعده بسهولة، وتصله نتائجه بسلاسة، ستزيد نسبة عودته لعيادتك بنسبة لا تقل عن 15٪.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
            
            <h3 className="text-2xl font-bold text-white mb-8 relative z-10">حاسبة الإيرادات المتوقعة</h3>
            
            <div className="space-y-8 relative z-10">
              
              {/* Slider 1 */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-gray-300 font-medium text-sm">متوسط عدد المرضى أسبوعياً</label>
                  <span className="text-white font-bold bg-white/5 px-3 py-1 rounded-lg border border-white/10">{patients} مريض</span>
                </div>
                <input 
                  type="range" 
                  min="50" max="1000" step="10"
                  value={patients}
                  onChange={(e) => setPatients(Number(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Slider 2 */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-gray-300 font-medium text-sm">متوسط فاتورة المريض (ريال)</label>
                  <span className="text-white font-bold bg-white/5 px-3 py-1 rounded-lg border border-white/10">{avgBill} ريال</span>
                </div>
                <input 
                  type="range" 
                  min="100" max="2000" step="50"
                  value={avgBill}
                  onChange={(e) => setAvgBill(Number(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div className="w-full h-px bg-white/10 my-6" />

              {/* Results */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                  <div className="text-gray-400 text-xs mb-2">زيادة الإيرادات المتوقعة (شهرياً)</div>
                  <div className="text-2xl font-black text-cyan-400">
                    +{addedMonthlyRevenue.toLocaleString()} <span className="text-sm font-normal">ريال</span>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">بناءً على 20% زيادة في الولاء والاكتشاف</div>
                </div>
                
                <div className="bg-primary/10 p-4 rounded-2xl border border-primary/20 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
                  <div className="text-primary/80 text-xs mb-2 relative z-10">مدة استرداد قيمة المنظومة</div>
                  <div className="text-2xl font-black text-primary relative z-10">
                    {paybackWeeks} <span className="text-sm font-normal">أسابيع</span>
                  </div>
                  <div className="text-[10px] text-primary/60 mt-1 relative z-10">قيمة الاستثمار 18,000 ريال</div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
