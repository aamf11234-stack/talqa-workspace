import React from 'react';
import { motion } from 'framer-motion';
import { Server, Lock, CheckCircle2 } from 'lucide-react';
import { TalqaShield } from './TalqaShield';

export const TrustSection = () => {
  return (
    <section className="py-24 relative bg-[#020611] border-t border-white/5">
      <div className="container mx-auto px-6">
        
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <TalqaShield size={40} />
            <span className="text-2xl font-black text-white tracking-widest uppercase">
              TALQA <span style={{ color: '#00B4D8' }}>TECH</span>
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            شريكك التقني الموثوق
          </h2>
          <p className="text-gray-400 text-lg">
            نحن لا نبيع لك برنامجاً ونختفي. نحن نبني بنية تحتية رقمية لعيادتك، مدعومة بصيانة دورية، خوادم محلية، وحماية صارمة لبيانات مرضاك.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center hover:bg-white/10 transition-colors"
          >
            <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 mb-6">
              <Server size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">استضافة محلية 100%</h3>
            <p className="text-sm text-gray-400">
              بياناتك وبيانات مرضاك مخزنة على خوادم داخل المملكة العربية السعودية، متوافقة مع اشتراطات الأمن السيبراني.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center hover:bg-white/10 transition-colors relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-primary/5" />
            <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center text-primary mb-6 relative z-10">
              <Shield size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 relative z-10">ضمان 3 أشهر مجاني</h3>
            <p className="text-sm text-gray-400 relative z-10">
              نضمن لك عمل المنظومة بكفاءة 100%. أي تعديلات أو إصلاحات برمجية خلال أول 90 يوماً مشمولة بالكامل.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center hover:bg-white/10 transition-colors"
          >
            <div className="w-16 h-16 mx-auto bg-cyan-500/10 rounded-full flex items-center justify-center text-cyan-400 mb-6">
              <Lock size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">تشفير طبي معتمد</h3>
            <p className="text-sm text-gray-400">
              الملفات الطبية، الوصفات، والنتائج مشفرة من طرف إلى طرف (End-to-End Encryption) لضمان الخصوصية التامة.
            </p>
          </motion.div>

        </div>

        {/* Stats Strip */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap justify-center gap-16">
          <div className="text-center">
            <div className="text-4xl font-black text-white mb-2">50+</div>
            <div className="text-sm text-gray-500 uppercase tracking-wide">عيادة ومركز طبي</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-white mb-2">98%</div>
            <div className="text-sm text-gray-500 uppercase tracking-wide">نسبة الرضا</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-white mb-2">24/7</div>
            <div className="text-sm text-gray-500 uppercase tracking-wide">دعم فني مستمر</div>
          </div>
        </div>

      </div>
    </section>
  );
};
