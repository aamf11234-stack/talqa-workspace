import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Calculator from './components/Calculator';
import AppleSection from './components/AppleSection';
import TrustBar from './components/TrustBar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';

const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
    // Remove any dark-class that previous version may have set
    document.documentElement.classList.remove('dark');
    document.title = 'تلقا تك | نحوّل أفكارك التجارية إلى حلول برمجية تدر الأرباح';
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className="min-h-screen overflow-x-hidden"
        style={{ background: '#FBF9F5', color: '#1A1A18' }}
      >
        <Navbar />
        <main>
          <Hero />
          <Services />
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
