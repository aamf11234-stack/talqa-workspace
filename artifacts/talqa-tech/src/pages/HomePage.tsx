import { lazy, Suspense } from 'react';
import PageLayout from './PageLayout';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import SectorsSection from '../components/SectorsSection';
import HorizontalServices from '../components/HorizontalServices';

// Lazy-load everything below the fold — massive first-load win
const WebsitesSection  = lazy(() => import('../components/WebsitesSection'));
const AppsSection      = lazy(() => import('../components/AppsSection'));
const PlatformShowcase = lazy(() => import('../components/PlatformShowcase'));
const LiveDemo         = lazy(() => import('../components/LiveDemo'));
const BookingsSection  = lazy(() => import('../components/BookingsSection'));
const AiChat           = lazy(() => import('../components/AiChat'));
const WalletShowcase   = lazy(() => import('../components/WalletShowcase'));
const ClinicSection    = lazy(() => import('../components/ClinicSection'));
const WhyUs            = lazy(() => import('../components/WhyUs'));
const Process          = lazy(() => import('../components/Process'));
const RestaurantOffer  = lazy(() => import('../components/RestaurantOffer'));
const Calculator       = lazy(() => import('../components/Calculator'));
const ProjectsGallery  = lazy(() => import('../components/ProjectsGallery'));
const Testimonials     = lazy(() => import('../components/Testimonials'));
const FAQ              = lazy(() => import('../components/FAQ'));

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
      <Suspense fallback={null}><WebsitesSection /></Suspense>
      <div className="section-divider" />
      <Suspense fallback={null}><AppsSection /></Suspense>
      <div className="section-divider" />
      <Suspense fallback={null}><PlatformShowcase /></Suspense>
      <div className="section-divider" />
      <Suspense fallback={null}><LiveDemo /></Suspense>
      <div className="section-divider" />
      <Suspense fallback={null}><BookingsSection /></Suspense>
      <div className="section-divider" />
      <Suspense fallback={null}><AiChat /></Suspense>
      <div className="section-divider" />
      <Suspense fallback={null}><WalletShowcase /></Suspense>
      <div className="section-divider" />
      <Suspense fallback={null}><ClinicSection /></Suspense>
      <div className="section-divider" />
      <Suspense fallback={null}><WhyUs /></Suspense>
      <div className="section-divider" />
      <Suspense fallback={null}><Process /></Suspense>
      <div className="section-divider" />
      <Suspense fallback={null}><RestaurantOffer /></Suspense>
      <div className="section-divider" />
      <Suspense fallback={null}><Calculator /></Suspense>
      <div className="section-divider" />
      <Suspense fallback={null}><ProjectsGallery /></Suspense>
      <div className="section-divider" />
      <Suspense fallback={null}><Testimonials /></Suspense>
      <div className="section-divider" />
      <Suspense fallback={null}><FAQ /></Suspense>
    </PageLayout>
  );
}
