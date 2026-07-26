import React, { useState, useEffect } from 'react';
import { AppProvider, useAppContext } from './context/AppProvider';
import { PhoneFrame } from './components/PhoneFrame';
import { BottomNav } from './components/BottomNav';
import { OrderFlow } from './components/OrderFlow';
import { HomeScreen } from './screens/Home';
import { MenuScreen } from './screens/Menu';
import { OrdersScreen } from './screens/Orders';
import { CardScreen } from './screens/Card';
import { AdminScreen } from './screens/Admin';
import { AnimatePresence, motion } from 'framer-motion';
import { Coffee, Smartphone, CreditCard, Store, Bell, BarChart3, ShieldCheck, CheckCircle2, Navigation, MessageCircle, ArrowLeft } from 'lucide-react';

function MainApp() {
  const { activeTab } = useAppContext();

  return (
    <PhoneFrame>
      <AnimatePresence mode="wait">
        {activeTab === 'home' && <HomeScreen key="home" />}
        {activeTab === 'menu' && <MenuScreen key="menu" />}
        {activeTab === 'orders' && <OrdersScreen key="orders" />}
        {activeTab === 'card' && <CardScreen key="card" />}
      </AnimatePresence>
      <BottomNav />
      <OrderFlow />
    </PhoneFrame>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#1A0510] text-white selection:bg-primary/30 selection:text-white font-sans overflow-x-hidden">
      
      {/* 1. Header / Navbar */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#1A0510]/80 backdrop-blur-xl border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-wider text-white">BROWN DOSE</span>
              <span className="text-xs text-primary font-medium">نظام الولاء والطلب</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/70 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-medium text-white/70">متاح الآن · جيزان</span>
            </div>
            <a 
              href="#contact"
              className="bg-primary/20 hover:bg-primary/30 transition-colors text-primary-foreground text-sm font-medium px-5 py-2.5 rounded-full"
            >
              تواصل معنا
            </a>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-gradient-to-b from-[#2E0D22] to-[#1A0510]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.03%22/%3E%3C/svg%3E')] opacity-50 mix-blend-overlay"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8"
            >
              <span>✦</span>
              <span>حصري لكافيهات جيزان</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold leading-tight mb-6"
            >
              زبائنك يستحقون<br />
              تجربة <span className="text-primary">أذكى</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-white/60 leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              نظام ولاء وطلب متكامل — نقاط وتوصيل واستلام ومحفظة رقمية. لا تطبيق خارجي. كل شيء لـ براون دوز.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a 
                href="#demo"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2"
              >
                جرّب الديمو
                <ArrowLeft size={20} className="-rotate-90" />
              </a>
              <div className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg border border-primary/30 text-white/90 bg-primary/5 backdrop-blur-sm text-center">
                ٢,٠٠٠ ريال فقط
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Features Grid */}
      <section className="py-24 bg-[#1E0814] relative border-t border-primary/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">كل شيء يحتاجه كافيهك</h2>
            <p className="text-white/50 text-lg">ميزات صُممت خصيصاً لقطاع القهوة المختصة</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Coffee, title: "طلب من المنيو", desc: "حار، بارد، مقطرة — كل شيء في يد الزبون" },
              { icon: Navigation, title: "توصيل وطلب استلام", desc: "الزبون يختار كيف يستلم" },
              { icon: CheckCircle2, title: "نقاط ولاء", desc: "كل طلب يكسب نقاط، النقاط تُبدّل مكافآت" },
              { icon: CreditCard, title: "Apple Pay & STC Pay", desc: "دفع في ثانية — بدون كاش" },
              { icon: Store, title: "فروع متعددة", desc: "صبيا وضمد في نظام واحد" },
              { icon: Bell, title: "إشعارات فورية", desc: "خصومات وعروض بزر واحد" },
              { icon: BarChart3, title: "إحصائيات المبيعات", desc: "اعرف أكثر صنف وأكثر ساعة" },
              { icon: ShieldCheck, title: "هوية براون دوز كاملة", desc: "ألوانك، اسمك، منيوك" },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-primary/5 border border-primary/20 rounded-3xl p-6 hover:bg-primary/10 transition-colors"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-6">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Phone Demo Section */}
      <section id="demo" className="py-24 md:py-32 relative bg-[#240A1A]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E0814] to-[#240A1A] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-0 md:px-6 relative z-10">
          <div className="text-center mb-12 md:mb-20 px-6">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">جرّب التطبيق الحين</h2>
            <p className="text-primary text-lg font-medium">كل زر شغّال — اطلب، ادفع، اكسب نقاط</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
            
            {/* Desktop Highlights (Hidden on mobile) */}
            <div className="hidden md:flex flex-col gap-8 max-w-sm">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-primary/5 border border-primary/20 rounded-2xl p-6"
              >
                <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center text-secondary mb-4">
                  <Coffee size={20} />
                </div>
                <h3 className="text-lg font-bold mb-2">تصفح المنيو</h3>
                <p className="text-white/60 text-sm">جرب إضافة "افقاتو براون" للسلة وتغيير الكمية.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-primary/5 border border-primary/20 rounded-2xl p-6"
              >
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary mb-4">
                  <Smartphone size={20} />
                </div>
                <h3 className="text-lg font-bold mb-2">إتمام الطلب</h3>
                <p className="text-white/60 text-sm">اختر استلام أو توصيل، وجرب تدفق الدفع السلس.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-primary/5 border border-primary/20 rounded-2xl p-6"
              >
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center text-green-400 mb-4">
                  <CheckCircle2 size={20} />
                </div>
                <h3 className="text-lg font-bold mb-2">نقاط الولاء</h3>
                <p className="text-white/60 text-sm">شاهد كيف تزيد النقاط بعد كل طلب في الرئيسية.</p>
              </motion.div>
            </div>
            
            {/* Interactive Demo */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-auto flex justify-center"
            >
              <AppProvider>
                <MainApp />
              </AppProvider>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* 5. How It Works */}
      <section className="py-24 bg-[#1E0814] border-t border-primary/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">كيف يشتغل؟</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2" />
            
            {[
              { emoji: "🛠️", title: "إعداد النظام", desc: "نربط هويتك وقائمتك خلال ٧ أيام" },
              { emoji: "📲", title: "يطلق الزبون التطبيق", desc: "يطلب، يدفع، ويكسب نقاط تلقائياً" },
              { emoji: "📈", title: "أنت تكسب زبائن راجعين", desc: "نقاط = عودة مضمونة" }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-[#1A0510] border border-primary/20 rounded-3xl p-8 text-center z-10"
              >
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-xl border border-primary/20">
                  {step.emoji}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-white/60">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Pricing Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex justify-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full max-w-lg bg-[#2E0D22] rounded-[40px] p-8 md:p-12 border border-primary/30 shadow-2xl shadow-primary/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full pointer-events-none"></div>
            
            <div className="text-center mb-8 relative z-10">
              <div className="inline-block bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-6">
                باقة براون دوز الحصرية
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-6xl font-bold tracking-tighter">٢,٠٠٠</span>
                <span className="text-2xl text-white/60 font-medium mt-4">ريال</span>
              </div>
              <p className="text-white/60 font-medium">دفعة واحدة · لا رسوم شهرية</p>
            </div>
            
            <div className="space-y-4 mb-10 relative z-10">
              {[
                "تطبيق ويب كامل بهويتك",
                "طلب توصيل واستلام",
                "نظام نقاط ولاء",
                "Apple Pay & STC Pay",
                "فروع صبيا وضمد",
                "إحصائيات المبيعات",
                "دعم مباشر على واتساب"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                    <CheckCircle2 size={14} strokeWidth={3} />
                  </div>
                  <span className="text-white/80 font-medium">{feature}</span>
                </div>
              ))}
            </div>
            
            <a 
              href="#contact"
              className="block w-full bg-primary hover:bg-primary/90 text-white text-center py-4 rounded-2xl font-bold text-lg transition-all relative z-10 shadow-xl shadow-primary/25"
            >
              احجز الآن
            </a>
          </motion.div>
          
        </div>
      </section>

      {/* 7. Contact / CTA Section */}
      <section id="contact" className="py-24 bg-[#1A0510] border-t border-primary/10 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">جاهز تطلق براون دوز؟</h2>
          
          <a 
            href="https://wa.me/966500000000" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-5 rounded-full font-bold text-xl transition-all shadow-xl shadow-[#25D366]/20 mb-6"
          >
            <MessageCircle size={28} />
            تواصل على واتساب
          </a>
          
          <div className="flex items-center justify-center gap-4 text-white/50 text-sm font-medium">
            <span>رد خلال ساعة</span>
            <span className="w-1 h-1 rounded-full bg-primary/50"></span>
            <span>جيزان</span>
            <span className="w-1 h-1 rounded-full bg-primary/50"></span>
            <span>صبيا وضمد</span>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="py-8 bg-[#13030A] border-t border-primary/10 text-center">
        <p className="text-white/40 text-sm font-medium tracking-wide">
          BROWN DOSE × تلقا تك · ٢٠٢٥ · جيزان
        </p>
        <button
          onClick={() => (window as any).__bdAdmin?.()}
          className="mt-3 text-white/10 hover:text-white/25 text-xs transition-colors select-none"
        >
          ⚙
        </button>
      </footer>
      
    </div>
  );
}

function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const isAppMode = new URLSearchParams(window.location.search).get('mode') === 'app';

  useEffect(() => {
    (window as any).__bdAdmin = () => setShowAdmin(true);
    return () => { delete (window as any).__bdAdmin; };
  }, []);

  // ?mode=app → show the interactive app directly, no landing page
  if (isAppMode) {
    return (
      <div dir="rtl" style={{ width: '100%', height: '100dvh', background: 'hsl(var(--background))', overflow: 'hidden' }}>
        <AppProvider>
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
            <AnimatePresence mode="wait">
              {/* re-use useAppContext inside a child */}
            </AnimatePresence>
            <AppModeInner />
          </div>
        </AppProvider>
      </div>
    );
  }

  return (
    <div dir="rtl">
      {showAdmin
        ? <AdminScreen onClose={() => setShowAdmin(false)} />
        : <LandingPage />}
    </div>
  );
}

function AppModeInner() {
  const { activeTab } = useAppContext();
  return (
    <>
      <AnimatePresence mode="wait">
        {activeTab === 'home'   && <HomeScreen   key="home" />}
        {activeTab === 'menu'   && <MenuScreen   key="menu" />}
        {activeTab === 'orders' && <OrdersScreen key="orders" />}
        {activeTab === 'card'   && <CardScreen   key="card" />}
      </AnimatePresence>
      <BottomNav />
      <OrderFlow />
    </>
  );
}

export default App;
