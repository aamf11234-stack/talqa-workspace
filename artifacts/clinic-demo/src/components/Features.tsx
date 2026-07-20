import React from 'react';
import { motion } from 'framer-motion';
import { Bell, ShieldCheck, Activity, CalendarCheck } from 'lucide-react';

export const Features = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const } }
  };

  const features = [
    {
      icon: <CalendarCheck size={28} />,
      title: "نظام حجوزات ذكي",
      desc: "يدير المواعيد تلقائياً، يمنع التعارض، ويذكّر المرضى بمواعيدهم.",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: <Bell size={28} />,
      title: "إشعارات اللحظة",
      desc: "تنبيهات للمرضى بجاهزية نتائج التحاليل، مواعيد الأدوية، والمراجعات.",
      color: "from-primary to-yellow-600"
    },
    {
      icon: <Activity size={28} />,
      title: "الملف الطبي الرقمي",
      desc: "وصفات طبية، تقارير، وتاريخ مرضي — كله في جيب المريض بضغطة زر.",
      color: "from-emerald-500 to-teal-400"
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "لوحة تحكم للمدير",
      desc: "إحصائيات الإيرادات، أداء الأطباء، ومعدل عودة المرضى بدقة متناهية.",
      color: "from-purple-500 to-indigo-500"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#020611]">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white mb-6"
          >
            ليس مجرد تطبيق.. <br className="md:hidden" />
            <span className="text-gradient-cyan">عيادة تعمل عنك 24/7</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            منظومة تلقا تك مصممة خصيصاً لتخفيف العبء عن موظفي الاستقبال، زيادة إيرادات العيادة، وبناء ولاء غير مسبوق مع المريض.
          </motion.p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feat, idx) => (
            <motion.div 
              key={idx}
              variants={item}
              className="glass-panel p-8 rounded-2xl hover:glass-panel-glow transition-all duration-300 group border border-white/5 hover:border-white/10"
            >
              <div className={`w-14 h-14 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br ${feat.color} text-white shadow-lg`}>
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                {feat.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
