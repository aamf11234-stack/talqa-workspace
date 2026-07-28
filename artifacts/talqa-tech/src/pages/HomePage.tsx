import { lazy, Suspense } from 'react';
import PageLayout from './PageLayout';
import Hero from '../components/Hero';
import LandingSectors from '../components/LandingSectors';
import LandingPricing from '../components/LandingPricing';

// Lazy-load everything below the fold
const Marquee            = lazy(() => import('../components/Marquee'));
const SectorsSection     = lazy(() => import('../components/SectorsSection'));
const HorizontalServices = lazy(() => import('../components/HorizontalServices'));
const WebsitesSection    = lazy(() => import('../components/WebsitesSection'));
const AppsSection        = lazy(() => import('../components/AppsSection'));
const PlatformShowcase   = lazy(() => import('../components/PlatformShowcase'));
const LiveDemo           = lazy(() => import('../components/LiveDemo'));
const BookingsSection    = lazy(() => import('../components/BookingsSection'));
const AiChat             = lazy(() => import('../components/AiChat'));
const WalletShowcase     = lazy(() => import('../components/WalletShowcase'));
const ClinicSection      = lazy(() => import('../components/ClinicSection'));
const WhyUs              = lazy(() => import('../components/WhyUs'));
const Process            = lazy(() => import('../components/Process'));
const RestaurantOffer    = lazy(() => import('../components/RestaurantOffer'));
const Calculator         = lazy(() => import('../components/Calculator'));
const ProjectsGallery    = lazy(() => import('../components/ProjectsGallery'));
const Testimonials       = lazy(() => import('../components/Testimonials'));
const FAQ                = lazy(() => import('../components/FAQ'));

export default function HomePage() {
  return (
    <PageLayout>
      <Hero />
      <LandingSectors />
      <div className="section-divider" />
      <Suspense fallback={null}><Marquee /></Suspense>
      <div className="section-divider" />
      <Suspense fallback={null}><SectorsSection /></Suspense>
      <div className="section-divider" />
      <Suspense fallback={null}><HorizontalServices /></Suspense>
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
      <LandingPricing />
      <div className="section-divider" />
      <Suspense fallback={null}><ProjectsGallery /></Suspense>
      <div className="section-divider" />
      <Suspense fallback={null}><Testimonials /></Suspense>
      <div className="section-divider" />
      <Suspense fallback={null}><FAQ /></Suspense>
    </PageLayout>
  );
}