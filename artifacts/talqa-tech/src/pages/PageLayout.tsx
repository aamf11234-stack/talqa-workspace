import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';

interface Props {
  children: React.ReactNode;
}

export default function PageLayout({ children }: Props) {
  useEffect(() => { 
    window.scrollTo(0, 0);
    // Ensure RTL is set
    document.documentElement.dir = 'rtl';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      style={{ 
        minHeight: '100vh', 
        background: 'var(--bg)', 
        overflowX: 'hidden', 
        position: 'relative', 
        zIndex: 1,
      }}
    >
      <Navbar />
      <main style={{ paddingTop: 0 }}>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </motion.div>
  );
}