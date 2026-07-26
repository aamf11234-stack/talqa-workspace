import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import CustomCursor       from './components/CustomCursor';
import Navbar             from './components/Navbar';
import Hero               from './components/Hero';
import Marquee            from './components/Marquee';
import HorizontalServices from './components/HorizontalServices';
import LiveDemo           from './components/LiveDemo';
import ClinicSection      from './components/ClinicSection';
import PhoneShowcase      from './components/PhoneShowcase';
import WalletCustomizer   from './components/WalletCustomizer';
import Process            from './components/Process';
import Calculator         from './components/Calculator';
import ProjectsGallery    from './components/ProjectsGallery';
import Testimonials       from './components/Testimonials';
import FAQ                from './components/FAQ';
import TrustBar           from './components/TrustBar';
import Footer             from './components/Footer';
import WhatsAppFloat      from './components/WhatsAppFloat';

const qc = new QueryClient();

export default function App() {
  useEffect(() => {
    document.documentElement.dir  = 'rtl';
    document.documentElement.lang = 'ar';
    document.body.style.background = '#080808';
    document.title = 'تلقا تك | نحوّل أفكارك التجارية إلى حلول رقمية تدر الأرباح';

    // Scroll progress bar
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
      <CustomCursor />
      <div style={{ minHeight: '100vh', overflowX: 'hidden', background: '#080808' }}>
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <HorizontalServices />
          <LiveDemo />
          <ClinicSection />
          <PhoneShowcase />
          <WalletCustomizer />
          <Process />
          <Calculator />
          <ProjectsGallery />
          <Testimonials />
          <FAQ />
          <TrustBar />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </QueryClientProvider>
  );
}
