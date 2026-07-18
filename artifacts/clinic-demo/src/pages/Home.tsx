import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { AppShowcase } from '../components/AppShowcase';
import { WebShowcase } from '../components/WebShowcase';
import { DashboardShowcase } from '../components/DashboardShowcase';
import { NotificationsShowcase } from '../components/NotificationsShowcase';
import { TrustSection } from '../components/TrustSection';
import { ROICalculator } from '../components/ROICalculator';
import { FinalCTA } from '../components/FinalCTA';

function Home() {
  return (
    <div className="bg-[#050D1A] min-h-screen text-foreground font-sans overflow-x-hidden selection:bg-primary/30 selection:text-white">
      {/* Navbar overlay */}
      <nav className="fixed top-0 inset-x-0 h-20 z-50 flex items-center justify-between px-6 md:px-12 bg-[#050D1A]/80 backdrop-blur-md border-b border-white/5">
        <div className="text-xl font-black text-white tracking-widest uppercase flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded-sm skew-x-[-10deg]" />
          TALQA <span className="text-primary font-bold">TECH</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm text-gray-300 font-medium">
          <a href="#" className="hover:text-white transition-colors">المميزات</a>
          <a href="#" className="hover:text-white transition-colors">التطبيق</a>
          <a href="#" className="hover:text-white transition-colors">لوحة التحكم</a>
          <a href="#" className="hover:text-white transition-colors">الأسعار</a>
        </div>
        <button className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-lg text-sm font-bold transition-colors border border-white/10">
          طلب استشارة
        </button>
      </nav>

      <main>
        <Hero />
        <Features />
        <AppShowcase />
        <NotificationsShowcase />
        <WebShowcase />
        <DashboardShowcase />
        <ROICalculator />
        <TrustSection />
        <FinalCTA />
      </main>
    </div>
  );
}

export default Home;
