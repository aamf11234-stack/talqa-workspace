import React from 'react';
import { motion } from 'framer-motion';

export const NotificationsShowcase = () => {
  const notifications = [
    { title: "نتيجة التحليل جاهزة", desc: "نتيجة فحص فيتامين د جاهزة الآن في ملفك الطبي.", time: "الآن", icon: "🔬" },
    { title: "تذكير بالدواء", desc: "حان موعد دواء (Panadol Advance) حبتين.", time: "منذ 5 د", icon: "💊" },
    { title: "موعدك غداً", desc: "نذكرك بموعدك مع د. سارة غداً الساعة 10:30 صباحاً.", time: "منذ 2 س", icon: "📅" },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#050D1A]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              كن مع مريضك <br/>
              <span className="text-gradient-cyan">في كل لحظة</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              الإشعارات المباشرة (Push Notifications) هي أقوى أداة تسويقية وتمريضية. اجعل عيادتك جزءاً من روتين مريضك اليومي.
            </p>
            <button className="text-primary font-bold hover:underline flex gap-2 items-center">
              اكتشف ميزات التطبيق ←
            </button>
          </div>

          <div className="md:w-1/2 relative h-[400px] w-full flex items-center justify-center">
            <div className="w-[300px] h-[600px] bg-gradient-to-b from-[#111] to-[#000] rounded-[2.5rem] border-[8px] border-[#222] shadow-2xl relative overflow-hidden rotate-6">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#222] rounded-b-2xl z-30" />
              
              {/* Wallpaper bg */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80')] bg-cover bg-center opacity-40 blur-sm" />
              
              <div className="absolute top-20 w-full text-center text-white z-10">
                 <div className="text-5xl font-extralight tracking-wider">10:30</div>
                 <div className="text-sm font-medium mt-2">الثلاثاء, 15 أغسطس</div>
              </div>

              <div className="absolute bottom-20 w-full px-4 flex flex-col gap-3 z-10">
                {notifications.map((notif, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.3 }}
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-3 flex gap-3 shadow-lg"
                  >
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shrink-0 shadow-sm">
                      {notif.icon}
                    </div>
                    <div className="flex-1 text-right">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="text-xs text-gray-500 font-medium">{notif.time}</span>
                        <span className="text-sm font-bold text-gray-900">{notif.title}</span>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{notif.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
