import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import CustomCursor       from './components/CustomCursor';
import Navbar             from './components/Navbar';
import Hero               from './components/Hero';
import Marquee            from './components/Marquee';
import HorizontalServices from './components/HorizontalServices';
import Terminal           from './components/Terminal';
import SpotlightSection   from './components/SpotlightSection';
import Process            from './components/Process';
import Calculator         from './components/Calculator';
import AppleSection       from './components/AppleSection';
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
          <SpotlightSection />
          <Terminal />
          <Process />
          <Calculator />
          <AppleSection />
          <TrustBar />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </QueryClientProvider>
  );
}
