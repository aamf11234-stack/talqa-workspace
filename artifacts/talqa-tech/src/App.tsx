import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import CustomCursor       from './components/CustomCursor';
import Navbar             from './components/Navbar';
import Hero               from './components/Hero';
import Marquee            from './components/Marquee';
import HorizontalServices from './components/HorizontalServices';
import PhoneShowcase      from './components/PhoneShowcase';
import WalletCustomizer   from './components/WalletCustomizer';
import LiveDemo           from './components/LiveDemo';
import ClinicSection      from './components/ClinicSection';
import SpotlightSection   from './components/SpotlightSection';
import Terminal           from './components/Terminal';
import TechStack          from './components/TechStack';
import Process            from './components/Process';
import Calculator         from './components/Calculator';
import ProjectsGallery    from './components/ProjectsGallery';
import Testimonials       from './components/Testimonials';
import AppleSection       from './components/AppleSection';
import FAQ                from './components/FAQ';
import TrustBar           from './components/TrustBar';
import Footer             from './components/Footer';
import WhatsAppFloat      from './components/WhatsAppFloat';

const qc = new QueryClient();

export default function App() {
  useEffect(() => {
    document.documentElement.dir  = 'rtl';
    document.documentElement.lang = 'ar';
    document.body.style.background = '#060608';
    document.title = 'تلقا تك | نحوّل أفكارك التجارية إلى حلول برمجية تدر الأرباح';
  }, []);

  return (
    <QueryClientProvider client={qc}>
      <CustomCursor />
      <div style={{ minHeight: '100vh', overflowX: 'hidden', background: '#060608' }}>
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <HorizontalServices />
          <LiveDemo />
          <ClinicSection />
          <PhoneShowcase />
          <WalletCustomizer />
          <SpotlightSection />
          <Terminal />
          <TechStack />
          <Process />
          <Calculator />
          <ProjectsGallery />
          <Testimonials />
          <AppleSection />
          <FAQ />
          <TrustBar />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </QueryClientProvider>
  );
}
