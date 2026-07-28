import { lazy, Suspense } from 'react';
import PageLayout from './PageLayout';
import Hero from '../components/Hero';
import LandingSectors from '../components/LandingSectors';
import LandingPricing from '../components/LandingPricing';

// Lazy-load below-the-fold sections
const Marquee            = lazy(() => import('../components/Marquee'));
const SectorsSection     = lazy(() => import('../components/SectorsSection'));
const HorizontalServices = lazy(() => import('../components/HorizontalServices'));
const AppsSection        = lazy(() => import('../components/AppsSection'));
const WalletShowcase     = lazy(() => import('../components/WalletShowcase'));
const WhyUs              = lazy(() => import('../components/WhyUs'));
const Testimonials       = lazy(() => import('../components/Testimonials'));
const FAQ                = lazy(() => import('../components/FAQ'));

const S = () => <div className="section-divider" />;

export default function HomePage() {
  return (
    <PageLayout>
      {/* 1 — Hero */}
      <Hero />

      {/* 2 — شريط الشركاء */}
      <S />
      <Suspense fallback={null}><Marquee /></Suspense>

      {/* 3 — خدماتنا */}
      <S />
      <Suspense fallback={null}><HorizontalServices /></Suspense>

      {/* 4 — قطاعات نخدمها (grid عام) */}
      <S />
      <LandingSectors />

      {/* 5 — قطاعات تفاعلية مع روابط لصفحات كل قطاع */}
      <S />
      <Suspense fallback={null}><SectorsSection /></Suspense>

      {/* 5 — تطبيقات جوال */}
      <S />
      <Suspense fallback={null}><AppsSection /></Suspense>

      {/* 6 — Apple & Google Wallet */}
      <S />
      <Suspense fallback={null}><WalletShowcase /></Suspense>

      {/* 7 — لماذا تلقا تك */}
      <S />
      <Suspense fallback={null}><WhyUs /></Suspense>

      {/* 8 — باقات الأسعار */}
      <S />
      <LandingPricing />

      {/* 9 — آراء العملاء */}
      <S />
      <Suspense fallback={null}><Testimonials /></Suspense>

      {/* 10 — أسئلة شائعة */}
      <S />
      <Suspense fallback={null}><FAQ /></Suspense>
    </PageLayout>
  );
}
