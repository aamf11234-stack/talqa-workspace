import { lazy, Suspense, useCallback, useEffect } from 'react';
import { Router, Switch, Route, useLocation } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SplashScreen, { useSplash } from './components/SplashScreen';

import HomePage from './pages/HomePage';
import CustomCursor from './components/CustomCursor';

/* ── Per-route SEO meta ── */
const BASE_URL = 'https://tlgaads.com/talqa-tech';
const SEO: Record<string, { title: string; desc: string }> = {
  '/':                    { title: 'تلقا تك | نحوّل أفكارك التجارية إلى حلول رقمية', desc: 'شريكك التقني في المملكة — تطبيقات جوال، Apple Wallet، مواقع سريعة، وأنظمة مخصصة. جازان: صبيا وضمد.' },
  '/services':            { title: 'الخدمات | تلقا تك', desc: 'تطوير تطبيقات iOS وAndroid، مواقع إلكترونية، بطاقات Apple Wallet، وأنظمة حجوزات متكاملة.' },
  '/pricing':             { title: 'الأسعار | تلقا تك', desc: 'خطط تسعير شفافة تبدأ من ٩٩ ريال — اختر الباقة المناسبة لمشروعك.' },
  '/projects':            { title: 'مشاريعنا | تلقا تك', desc: 'أعمالنا المنجزة: تطبيقات، مواقع، وحلول رقمية لعملاء في المملكة.' },
  '/about':               { title: 'من نحن | تلقا تك', desc: 'تلقا تك — شركة تقنية سعودية متخصصة في بناء المنتجات الرقمية لكل القطاعات.' },
  '/bookings':            { title: 'نظام الحجوزات | تلقا تك', desc: 'نظام حجز متكامل للمطاعم والعيادات والفنادق — قابل للتخصيص الكامل.' },
  '/wallet':              { title: 'Digital Wallet | تلقا تك', desc: 'بطاقات Apple Wallet وGoogle Wallet مع نظام نقاط ولاء متكامل لعملك.' },
  '/ai':                  { title: 'الذكاء الاصطناعي | تلقا تك', desc: 'حلول ذكاء اصطناعي مخصصة: شاتبوت، تحليل بيانات، وأتمتة العمليات.' },
  '/clinic':              { title: 'نظام العيادات | تلقا تك', desc: 'حل رقمي متكامل للعيادات الطبية: ملفات مرضى، مواعيد، ولوحة تحكم.' },
  '/faq':                 { title: 'الأسئلة الشائعة | تلقا تك', desc: 'إجابات على أكثر الأسئلة شيوعاً حول خدمات ومنتجات تلقا تك.' },
  '/food':                { title: 'تطبيق المطاعم والكافيهات | تلقا تك — ٤٩٩ ريال', desc: 'تطبيق جوال كامل للمطاعم والكافيهات: Apple Wallet، قائمة QR، طلب وتوصيل، نقاط ولاء — بـ٤٩٩ ريال دفعة واحدة.' },
  '/sectors/restaurants': { title: 'مواقع المطاعم | تلقا تك', desc: 'حلول رقمية متكاملة للمطاعم: قائمة QR، حجوزات، طلبات أونلاين، ونظام ولاء.' },
  '/sectors/cafes':       { title: 'مواقع الكافيهات | تلقا تك', desc: 'تطبيقات وبطاقات ولاء مخصصة للكافيهات — احجز طاولتك وتتبّع نقاطك.' },
  '/sectors/clinics':     { title: 'مواقع العيادات | تلقا تك', desc: 'مواقع احترافية للعيادات والمستشفيات مع نظام مواعيد وملفات مرضى رقمية.' },
  '/sectors/gyms':        { title: 'مواقع النوادي الرياضية | تلقا تك', desc: 'إدارة اشتراكات الجيم وجداول الحصص وبطاقات العضوية الرقمية.' },
  '/sectors/stores':      { title: 'المتاجر الإلكترونية | تلقا تك', desc: 'بناء متجر إلكتروني احترافي مع لوحة تحكم ومدفوعات ودعم كامل.' },
  '/sectors/beauty':      { title: 'مواقع صالونات التجميل | تلقا تك', desc: 'حجوزات وعروض لصالونات التجميل وسبا بتصميم عصري يجذب العملاء.' },
  '/sectors/hotels':      { title: 'مواقع الفنادق | تلقا تك', desc: 'مواقع حجز فنادق وشقق مفروشة مع نظام غرف وإدارة حجوزات.' },
  '/sectors/pharmacies':  { title: 'مواقع الصيدليات | تلقا تك', desc: 'طلبات أدوية أونلاين وإدارة مخزون الصيدليات بكل سهولة.' },
  '/sectors/education':   { title: 'مواقع المدارس والأكاديميات | تلقا تك', desc: 'منصات تعليمية وجداول حصص لمدارس وأكاديميات ومراكز تدريب.' },
  '/sectors/offices':     { title: 'مواقع المكاتب المهنية | تلقا تك', desc: 'مواقع لمكاتب المحاماة والاستشارات والخدمات المهنية مع حجز استشارة.' },
  '/sectors/cars':        { title: 'مواقع معارض السيارات | تلقا تك', desc: 'عرض السيارات وإدارة الطلبات لمعارض ووكالات السيارات.' },
  '/sectors/training':    { title: 'مواقع مراكز التدريب | تلقا تك', desc: 'جداول دورات تدريبية وتسجيل متدربين وشهادات رقمية.' },
  '/sectors/wellness':    { title: 'مواقع مراكز العافية | تلقا تك', desc: 'حجوزات وبرامج لمراكز العافية واليوغا والتأمل.' },
  '/sectors/studios':     { title: 'مواقع الاستوديوهات | تلقا تك', desc: 'مواقع لاستوديوهات التصوير والموسيقى والفنون مع حجز جلسات.' },
  '/sectors/care':        { title: 'خدمات الرعاية | تلقا تك', desc: 'حلول رقمية لخدمات الرعاية الصحية والمنزلية.' },
  '/sectors/pets':        { title: 'مواقع عيادات الحيوانات | تلقا تك', desc: 'مواقع لعيادات الحيوانات الأليفة ومراكز الرعاية البيطرية.' },
};

function SeoManager() {
  const [path] = useLocation();
  useEffect(() => {
    const meta = SEO[path] ?? SEO['/'];
    document.title = meta.title;
    const url = `${BASE_URL}${path === '/' ? '/' : path}`;
    const set = (sel: string, attr: string, val: string) => {
      const el = document.querySelector<HTMLMetaElement | HTMLLinkElement>(sel);
      if (el) (el as any)[attr] = val;
    };
    set('meta[name="description"]',       'content', meta.desc);
    set('meta[property="og:title"]',      'content', meta.title);
    set('meta[property="og:description"]','content', meta.desc);
    set('meta[property="og:url"]',        'content', url);
    set('meta[name="twitter:title"]',     'content', meta.title);
    set('meta[name="twitter:description"]','content', meta.desc);
    set('link[rel="canonical"]',          'href',    url);
  }, [path]);
  return null;
}

// Main pages — lazy loaded
const ServicesPage  = lazy(() => import('./pages/ServicesPage'));
const WalletPage    = lazy(() => import('./pages/WalletPage'));
const BookingsPage  = lazy(() => import('./pages/BookingsPage'));
const AiPage        = lazy(() => import('./pages/AiPage'));
const ClinicPage    = lazy(() => import('./pages/ClinicPage'));
const PricingPage   = lazy(() => import('./pages/PricingPage'));
const ProjectsPage  = lazy(() => import('./pages/ProjectsPage'));
const AboutPage     = lazy(() => import('./pages/AboutPage'));
const FaqPage       = lazy(() => import('./pages/FaqPage'));

// Sector pages — all lazy loaded (16 pages, heavy bundle)
const FoodPage        = lazy(() => import('./pages/FoodPage'));
const CafesPage       = lazy(() => import('./pages/sectors/CafesPage'));
const RestaurantsPage = lazy(() => import('./pages/sectors/RestaurantsPage'));
const ClinicsPage     = lazy(() => import('./pages/sectors/ClinicsPage'));
const BeautyPage      = lazy(() => import('./pages/sectors/BeautyPage'));
const GymsPage        = lazy(() => import('./pages/sectors/GymsPage'));
const HotelsPage      = lazy(() => import('./pages/sectors/HotelsPage'));
const PharmaciesPage  = lazy(() => import('./pages/sectors/PharmaciesPage'));
const EducationPage   = lazy(() => import('./pages/sectors/EducationPage'));
const StoresPage      = lazy(() => import('./pages/sectors/StoresPage'));
const CarsPage        = lazy(() => import('./pages/sectors/CarsPage'));
const CarePage        = lazy(() => import('./pages/sectors/CarePage'));
const TrainingPage    = lazy(() => import('./pages/sectors/TrainingPage'));
const WellnessPage    = lazy(() => import('./pages/sectors/WellnessPage'));
const StudiosPage     = lazy(() => import('./pages/sectors/StudiosPage'));
const OfficesPage     = lazy(() => import('./pages/sectors/OfficesPage'));
const PetsPage        = lazy(() => import('./pages/sectors/PetsPage'));

const qc = new QueryClient();
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export default function App() {
  const { visible, dismiss } = useSplash();
  const onDone = useCallback(() => dismiss(), [dismiss]);

  useEffect(() => {
    document.documentElement.dir  = 'rtl';
    document.documentElement.lang = 'ar';
    document.body.style.background = '#07070f';
    document.title = 'تلقا تك | نحوّل أفكارك التجارية إلى حلول رقمية';
  }, []);

  return (
    <QueryClientProvider client={qc}>
      {visible && <SplashScreen onDone={onDone} />}
      <Router base={BASE}>
        <SeoManager />
        <CustomCursor />
        <div id="app-ambient"><span /><span /><span /></div>
        <Suspense fallback={null}>
          <Switch>
            {/* Main pages */}
            <Route path="/services"  component={ServicesPage}  />
            <Route path="/wallet"    component={WalletPage}    />
            <Route path="/bookings"  component={BookingsPage}  />
            <Route path="/ai"        component={AiPage}        />
            <Route path="/clinic"    component={ClinicPage}    />
            <Route path="/pricing"   component={PricingPage}   />
            <Route path="/projects"  component={ProjectsPage}  />
            <Route path="/about"     component={AboutPage}     />
            <Route path="/faq"       component={FaqPage}       />

            {/* Food landing */}
            <Route path="/food"            component={FoodPage}          />

            {/* Sector pages */}
            <Route path="/sectors/cafes"       component={CafesPage}       />
            <Route path="/sectors/restaurants" component={RestaurantsPage}  />
            <Route path="/sectors/clinics"     component={ClinicsPage}      />
            <Route path="/sectors/beauty"      component={BeautyPage}       />
            <Route path="/sectors/gyms"        component={GymsPage}         />
            <Route path="/sectors/hotels"      component={HotelsPage}       />
            <Route path="/sectors/pharmacies"  component={PharmaciesPage}   />
            <Route path="/sectors/education"   component={EducationPage}    />
            <Route path="/sectors/stores"      component={StoresPage}       />
            <Route path="/sectors/cars"        component={CarsPage}         />
            <Route path="/sectors/care"        component={CarePage}         />
            <Route path="/sectors/training"    component={TrainingPage}     />
            <Route path="/sectors/wellness"    component={WellnessPage}     />
            <Route path="/sectors/studios"     component={StudiosPage}      />
            <Route path="/sectors/offices"     component={OfficesPage}      />
            <Route path="/sectors/pets"        component={PetsPage}         />

            <Route component={HomePage} />
          </Switch>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
}
