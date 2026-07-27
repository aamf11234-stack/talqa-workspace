import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import CustomCursor       from './components/CustomCursor';
import Navbar             from './components/Navbar';
import Hero               from './components/Hero';
import Marquee            from './components/Marquee';
import HorizontalServices from './components/HorizontalServices';
import LiveDemo           from './components/LiveDemo';
import WalletShowcase     from './components/WalletShowcase';
import RestaurantOffer    from './components/RestaurantOffer';
import SectorsSection    from './components/SectorsSection';
import BookingsSection    from './components/BookingsSection';
import AiChat             from './components/AiChat';
import ClinicSection      from './components/ClinicSection';
import WhyUs              from './components/WhyUs';
import Process            from './components/Process';
import Calculator         from './components/Calculator';
import ProjectsGallery    from './components/ProjectsGallery';
import Testimonials       from './components/Testimonials';
import FAQ                from './components/FAQ';
import Footer             from './components/Footer';
import WhatsAppFloat      from './components/WhatsAppFloat';

const qc = new QueryClient();

export default function App() {
  useEffect(() => {
    document.documentElement.dir  = 'rtl';
    document.documentElement.lang = 'ar';
    document.body.style.background = '#07070f';
    document.title = 'تلقا تك | نحوّل أفكارك التجارية إلى حلول رقمية';

    const bar = document.getElementById('scroll-bar');
    if (!bar) return;
    const onScroll = () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      bar.style.transform = `scaleX(${pct})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <QueryClientProvider client={qc}>
      <div id="scroll-bar" />
      <CustomCursor />
      {/* Global ambient blobs */}
      <div id="app-ambient"><span /><span /><span /></div>

      <div style={{ minHeight: '100vh', overflowX: 'hidden', background: 'var(--bg)', position: 'relative', zIndex: 1 }}>
        <Navbar />
        <main>
          {/* 1 — Hook */}
          <Hero />
          <Marquee />

          {/* 2 — نحن نخدم الجميع */}
          <div className="section-divider" />
          <SectorsSection />

          {/* 3 — شوف الخدمات */}
          <div className="section-divider" />
          <HorizontalServices />

          {/* 4 — جرّب المنتج */}
          <div className="section-divider" />
          <LiveDemo />

          {/* 5 — الميزات التقنية */}
          <div className="section-divider" />
          <BookingsSection />
          <div className="section-divider" />
          <AiChat />
          <div className="section-divider" />
          <WalletShowcase />

          {/* 6 — مثال حقيقي */}
          <div className="section-divider" />
          <ClinicSection />

          {/* 7 — لماذا تلقا */}
          <div className="section-divider" />
          <WhyUs />
          <div className="section-divider" />
          <Process />

          {/* 8 — العرض التجاري */}
          <div className="section-divider" />
          <RestaurantOffer />
          <div className="section-divider" />
          <Calculator />

          {/* 9 — الإثبات الاجتماعي */}
          <div className="section-divider" />
          <ProjectsGallery />
          <div className="section-divider" />
          <Testimonials />

          {/* 10 — إزالة الشكوك */}
          <div className="section-divider" />
          <FAQ />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </QueryClientProvider>
  );
}
