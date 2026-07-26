import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import CustomCursor       from './components/CustomCursor';
import Navbar             from './components/Navbar';
import Hero               from './components/Hero';
import Marquee            from './components/Marquee';
import HorizontalServices from './components/HorizontalServices';
import LiveDemo           from './components/LiveDemo';
import WalletCustomizer   from './components/WalletCustomizer';
import BookingsSection    from './components/BookingsSection';
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
      <div style={{ minHeight: '100vh', overflowX: 'hidden', background: 'var(--bg)' }}>
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <HorizontalServices />
          <LiveDemo />
          <WalletCustomizer />
          <BookingsSection />
          <ClinicSection />
          <WhyUs />
          <Process />
          <Calculator />
          <ProjectsGallery />
          <Testimonials />
          <FAQ />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </QueryClientProvider>
  );
}
