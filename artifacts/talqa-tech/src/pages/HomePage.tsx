import PageLayout from './PageLayout';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import SectorsSection from '../components/SectorsSection';
import HorizontalServices from '../components/HorizontalServices';
import LiveDemo from '../components/LiveDemo';
import BookingsSection from '../components/BookingsSection';
import AiChat from '../components/AiChat';
import WalletShowcase from '../components/WalletShowcase';
import ClinicSection from '../components/ClinicSection';
import WhyUs from '../components/WhyUs';
import Process from '../components/Process';
import RestaurantOffer from '../components/RestaurantOffer';
import Calculator from '../components/Calculator';
import ProjectsGallery from '../components/ProjectsGallery';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import PlatformShowcase from '../components/PlatformShowcase';

export default function HomePage() {
  return (
    <PageLayout>
      <Hero />
      <Marquee />
      <div className="section-divider" />
      <SectorsSection />
      <div className="section-divider" />
      <HorizontalServices />
      <div className="section-divider" />
      <PlatformShowcase />
      <div className="section-divider" />
      <LiveDemo />
      <div className="section-divider" />
      <BookingsSection />
      <div className="section-divider" />
      <AiChat />
      <div className="section-divider" />
      <WalletShowcase />
      <div className="section-divider" />
      <ClinicSection />
      <div className="section-divider" />
      <WhyUs />
      <div className="section-divider" />
      <Process />
      <div className="section-divider" />
      <RestaurantOffer />
      <div className="section-divider" />
      <Calculator />
      <div className="section-divider" />
      <ProjectsGallery />
      <div className="section-divider" />
      <Testimonials />
      <div className="section-divider" />
      <FAQ />
    </PageLayout>
  );
}
