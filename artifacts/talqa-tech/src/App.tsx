import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, 
  Globe, 
  LayoutDashboard, 
  Wallet, 
  Watch, 
  CalendarDays, 
  Award, 
  MessageCircle, 
  ChevronLeft,
  Store,
  MapPin,
  FileText,
  Star,
  CheckCircle2
} from 'lucide-react';
import { SiApple } from 'react-icons/si';

const queryClient = new QueryClient();

const WHATSAPP_NUMBER = "966551378531";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

function WhatsAppButton() {
  return (
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg shadow-green-500/20 hover:scale-110 transition-transform duration-300"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle size={28} className="fill-current" />
    </motion.a>
  );
}

function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 inset-x-0 z-40 glass border-b border-white/5"
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-black font-bold text-xl leading-none">ت</span>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">تلقا تك</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
          <a href="#services" className="hover:text-white transition-colors">الخدمات</a>
          <a href="#ecosystem" className="hover:text-white transition-colors">المنظومة</a>
          <a href="#contact" className="hover:text-white transition-colors">تواصل معنا</a>
        </div>

        <a 
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-100 transition-colors"
        >
          ابدأ مشروعك
        </a>
      </div>
    </motion.nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-white/80">الخيار الأول للشركات الرائدة في السعودية</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8"
        >
          نصنع المستقبل <br />
          <span className="text-gradient-gold">الرقمي لمنشأتك</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-2xl text-white/60 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
        >
          تلقا تك تمنحك منظومة تقنية متكاملة تجعل تجربة عملائك استثنائية. من تطبيقات الجوال إلى لوحات التحكم وبرامج الولاء.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-black font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
          >
            اطلب استشارتك المجانية
          </a>
          <a 
            href="#services"
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-all"
          >
            استكشف خدماتنا
          </a>
        </motion.div>
      </div>
    </section>
  );
}

const services = [
  {
    icon: Smartphone,
    title: "تطبيقات الجوال",
    desc: "تطبيقات Native فخمة لأنظمة iOS و Android بتجربة مستخدم لا تُنسى.",
    en: "Mobile Apps"
  },
  {
    icon: Globe,
    title: "مواقع احترافية",
    desc: "واجهات تسويقية ومتاجر إلكترونية تعكس هوية علامتك التجارية.",
    en: "Web Platforms"
  },
  {
    icon: LayoutDashboard,
    title: "لوحات تحكم",
    desc: "Owner Dashboards تمنحك سيطرة كاملة على منشأتك وبياناتك في مكان واحد.",
    en: "Control Panels"
  },
  {
    icon: CalendarDays,
    title: "نظام حجوزات ذكي",
    desc: "أتمتة كاملة لحجوزات العيادات، الصالونات، والمطاعم لتقليل الجهد وزيادة الأرباح.",
    en: "Smart Booking"
  },
  {
    icon: Award,
    title: "نقاط ولاء وعضوية",
    desc: "برامج ولاء متقدمة تضمن عودة عملائك وتزيد من ارتباطهم بعلامتك.",
    en: "Loyalty Programs"
  },
  {
    icon: MessageCircle,
    title: "إشعارات ذكية",
    desc: "تكامل مع WhatsApp و Google Maps لتنبيه العملاء وإرشادهم تلقائياً.",
    en: "Smart Notifications"
  }
];

function Services() {
  return (
    <section id="services" className="py-32 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">كل ما تحتاجه للريادة</h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            لا نقدم مجرد تطبيقات، بل نبني منظومات رقمية كاملة ترتقي بمنشأتك لمستوى المنافسة العالمية.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 font-mono text-4xl font-bold pointer-events-none group-hover:opacity-10 transition-opacity">
                {String(idx + 1).padStart(2, '0')}
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all">
                <service.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-white/60 leading-relaxed mb-6">{service.desc}</p>
              <div className="text-xs tracking-widest text-white/30 uppercase font-mono">{service.en}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AppleEcosystem() {
  return (
    <section id="ecosystem" className="py-32 relative overflow-hidden bg-white/[0.01] border-y border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8">
              <SiApple size={18} className="text-white" />
              <span className="text-sm font-medium">Apple Ecosystem</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              تجربة مستخدم <br/>
              <span className="text-gradient">سابقة لعصرها</span>
            </h2>
            
            <p className="text-white/60 text-lg mb-10 leading-relaxed">
              نحن نؤمن أن الفخامة تكمن في التفاصيل. لذلك دمجنا أحدث تقنيات آبل في منتجاتنا لنوفر لعملائك تجربة انسيابية لا مثيل لها.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Wallet size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">بطاقات Apple Wallet</h4>
                  <p className="text-white/50 text-sm leading-relaxed">
                    بطاقة عضوية رقمية تضاف مباشرة لمحفظة العميل. يتم تحديث نقاطه ومستواه تلقائياً بدون الحاجة لفتح التطبيق.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Watch size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">تكامل Apple Watch</h4>
                  <p className="text-white/50 text-sm leading-relaxed">
                    إشعارات الحجز، رصيد النقاط، وكود الاسترداد QR code — كلها متاحة بلمحة سريعة على معصم العميل.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-full border border-white/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none" />
            <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 glass p-8 relative overflow-hidden flex flex-col justify-center items-center gap-8">
              {/* Mockup visualization */}
              <div className="w-64 h-40 rounded-2xl bg-black/50 border border-white/10 flex flex-col justify-between p-4 shadow-2xl backdrop-blur-xl relative z-10">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/20" />
                  <SiApple className="text-white/30" size={20} />
                </div>
                <div>
                  <div className="text-white/40 text-xs mb-1">MEMBER LEVEL</div>
                  <div className="text-xl font-bold">Gold Member</div>
                  <div className="text-primary text-sm mt-1">2,450 Points</div>
                </div>
              </div>
              
              <div className="w-32 h-40 rounded-[2rem] bg-black/50 border border-white/10 shadow-2xl backdrop-blur-xl relative z-10 flex flex-col items-center justify-center p-4">
                <div className="text-center">
                  <div className="text-primary font-bold text-2xl">09:41</div>
                  <div className="text-white/50 text-xs mt-2">QR Ready</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="pt-32 pb-10 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-black font-bold text-xl leading-none">ت</span>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">تلقا تك</span>
            </div>
            <p className="text-white/50 text-sm max-w-sm leading-relaxed mb-8">
              شريكك التقني الموثوق في المملكة العربية السعودية. نحول أفكارك إلى منتجات رقمية فاخرة تضمن لك التفوق في سوقك.
            </p>
            <div className="flex gap-4">
              <a href={WHATSAPP_LINK} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:text-primary transition-colors">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">تواصل معنا</h4>
            <ul className="space-y-4">
              <li>
                <a href={WHATSAPP_LINK} className="text-white/50 hover:text-white text-sm flex items-center gap-3 transition-colors">
                  <MessageCircle size={16} />
                  <span>+966 55 137 8531</span>
                </a>
              </li>
              <li className="text-white/50 text-sm flex items-center gap-3">
                <FileText size={16} />
                <span>س.ت: 7054835322</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">فروعنا</h4>
            <ul className="space-y-4">
              <li className="text-white/50 text-sm flex items-start gap-3">
                <MapPin size={16} className="shrink-0 mt-0.5" />
                <span>المملكة العربية السعودية<br/>منطقة جازان - صبيا وضمد</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <p>© {new Date().getFullYear()} تلقا تك (Talqa Tech). جميع الحقوق محفوظة.</p>
          <div className="flex gap-6">
            <span>شروط الاستخدام</span>
            <span>سياسة الخصوصية</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.documentElement.classList.add('dark');
    document.title = "تلقا تك | نصنع المستقبل الرقمي لمنشأتك";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <Hero />
      <Services />
      <AppleEcosystem />
      
      {/* Testimonial / Trust Banner */}
      <section className="py-20 border-y border-white/5 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} className="text-primary fill-primary w-6 h-6 mx-1" />
            ))}
          </div>
          <p className="text-2xl md:text-3xl font-medium text-white max-w-4xl mx-auto leading-relaxed">
            "نحن لا نسلمك مجرد كود، نحن نسلمك منتجاً متكاملاً مصمماً بعناية ليعمل كأنه سحر."
          </p>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
