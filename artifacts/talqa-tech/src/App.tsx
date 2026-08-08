import { lazy, Suspense, useCallback, useEffect } from 'react';
import { Router, Switch, Route, useLocation } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SplashScreen, { useSplash } from './components/SplashScreen';

import HomePage from './pages/HomePage';
import CustomCursor from './components/CustomCursor';

/* ── Per-route SEO meta ── */
const BASE_URL = 'https://tech.tlgaa.com';
const SEO: Record<string, { title: string; desc: string }> = {
  '/':                    { title: 'تلقا تك', desc: 'تطبيقك الجوال بـ 499 ريال — iOS وAndroid وApple Wallet. نصمم، نبرمج، ونسلّم في 3 أسابيع. الكود ملكك، لا رسوم شهرية، ضمان رضا كامل. ابدأ اليوم.' },
  '/services':            { title: 'خدمات تطوير التطبيقات والمواقع | تلقا تك', desc: 'تطوير تطبيقات iOS وAndroid بـ 499 ريال، بطاقات Apple Wallet، مواقع إلكترونية سريعة، وأنظمة حجوزات متكاملة — كل ما يحتاجه مشروعك بسعر واضح.' },
  '/pricing':             { title: 'أسعار تطوير التطبيقات | تلقا تك — يبدأ من 499 ريال', desc: 'تطبيق جوال كامل iOS وAndroid بـ 499 ريال دفعة واحدة. لا رسوم شهرية، لا عمولات. كود ملكك بالكامل. اختر الباقة المناسبة لمشروعك.' },
  '/projects':            { title: 'أعمالنا المنجزة | تلقا تك', desc: 'مشاريع تطبيقات ومواقع نفّذناها لعملاء في المملكة العربية السعودية — مطاعم، عيادات، كافيهات، ومتاجر.' },
  '/about':               { title: 'من نحن | تلقا تك — شركة برمجة سعودية', desc: 'تلقا تك شركة تقنية سعودية متخصصة في بناء المنتجات الرقمية. فريق من المطورين المحترفين يخدم كل القطاعات.' },
  '/bookings':            { title: 'نظام حجوزات للمطاعم والعيادات | تلقا تك', desc: 'نظام حجز إلكتروني متكامل للمطاعم، العيادات، والفنادق — مع إشعارات واتساب وإدارة كاملة عبر لوحة تحكم.' },
  '/wallet':              { title: 'بطاقات Apple Wallet الرقمية | تلقا تك', desc: 'اصنع بطاقة Apple Wallet لعملائك: ولاء، عضوية، كوبونات — تُضاف بثلاث لمسات بدون App Store. نخدم المملكة العربية السعودية.' },
  '/ai':                  { title: 'حلول الذكاء الاصطناعي للأعمال | تلقا تك', desc: 'شاتبوت ذكي، تحليل بيانات، وأتمتة عمليات بالذكاء الاصطناعي — مخصصة لمشروعك في المملكة.' },
  '/clinic':              { title: 'نظام إدارة عيادات طبية | تلقا تك', desc: 'منظومة رقمية للعيادات: ملفات مرضى إلكترونية، حجز مواعيد، تذكير تلقائي، ولوحة تحكم طبية متكاملة.' },
  '/faq':                 { title: 'الأسئلة الشائعة عن تطوير التطبيقات | تلقا تك', desc: 'إجابات واضحة: كم يستغرق المشروع؟ ما الأسعار؟ هل الكود ملكي؟ كيف يعمل Apple Wallet؟ — كل ما تريد معرفته.' },
  '/food':                { title: 'تطبيق مطعم أو كافيه iOS وAndroid | تلقا تك — 499 ريال', desc: 'تطبيق iOS وAndroid كامل للمطاعم والكافيهات: Apple Wallet، قائمة QR، طلب وتوصيل، نقاط ولاء — بـ 499 ريال دفعة واحدة. كود ملكك، بدون رسوم شهرية.' },
  '/sectors/restaurants': { title: 'تطبيق ونظام للمطاعم | تلقا تك', desc: 'حلول رقمية متكاملة للمطاعم: تطبيق جوال، قائمة QR، حجوزات أونلاين، نقاط ولاء، وتوصيل — نبني لمطعمك في أسابيع.' },
  '/sectors/cafes':       { title: 'تطبيق وموقع الكافيه | تلقا تك', desc: 'تطبيق كافيه احترافي مع Apple Wallet وبطاقات ولاء — يزيد من العملاء المتكررين ويرفع متوسط الفاتورة.' },
  '/sectors/clinics':     { title: 'موقع وتطبيق للعيادات الطبية | تلقا تك', desc: 'موقع احترافي للعيادة مع نظام حجز مواعيد أونلاين، ملفات مرضى، وتذكير تلقائي — متوافق مع معايير الأمان الصحي.' },
  '/sectors/gyms':        { title: 'نظام إدارة الجيم والنادي الرياضي | تلقا تك', desc: 'تطبيق إدارة جيم: اشتراكات، جداول، بطاقات عضوية Apple Wallet، وتجديد تلقائي — لنوادي رياضية في السعودية.' },
  '/sectors/stores':      { title: 'موقع متجر إلكتروني احترافي | تلقا تك', desc: 'بناء متجر إلكتروني سعودي مع لوحة تحكم، مدفوعات، وإدارة مخزون — بكود ملكك الكامل بدون عمولات شهرية.' },
  '/sectors/beauty':      { title: 'تطبيق وموقع صالون تجميل | تلقا تك', desc: 'احجز موعد صالون أونلاين، نقاط ولاء، وعروض خاصة — تطبيق يجذب العميلات ويجعلهن يعدن دائماً.' },
  '/sectors/hotels':      { title: 'موقع حجوزات الفنادق والشقق | تلقا تك', desc: 'موقع فندقي احترافي مع نظام حجز غرف أونلاين، إدارة الحجوزات، وتجربة نزيل متميزة.' },
  '/sectors/pharmacies':  { title: 'تطبيق صيدلية أونلاين | تلقا تك', desc: 'تطبيق صيدلية: طلب أدوية، وصفات طبية، إشعارات، وإدارة مخزون — خدمة صحية رقمية متكاملة.' },
  '/sectors/education':   { title: 'منصة تعليمية وموقع أكاديمية | تلقا تك', desc: 'موقع مدرسة أو أكاديمية مع جداول حصص، تسجيل طلاب، ومحتوى تعليمي — نبني منصتك التعليمية.' },
  '/sectors/offices':     { title: 'موقع مكتب قانوني أو استشاري | تلقا تك', desc: 'موقع احترافي لمكاتب المحاماة والاستشارات مع حجز موعد، عرض الخدمات، وواجهة تعكس مكانتك.' },
  '/sectors/cars':        { title: 'موقع معرض سيارات | تلقا تك', desc: 'عرض السيارات بتصميم فاخر مع فلتر بحث، طلب تجربة قيادة، وإدارة كاملة لمخزون المعرض.' },
  '/sectors/training':    { title: 'موقع مركز تدريب وتطوير | تلقا تك', desc: 'منصة مركز تدريب: جداول دورات، تسجيل متدربين، شهادات رقمية، ودفع أونلاين.' },
  '/sectors/wellness':    { title: 'موقع مركز عافية وسبا | تلقا تك', desc: 'موقع مركز عافية مع حجز جلسات، باقات، وبطاقات عضوية Apple Wallet — تجربة عافية رقمية فاخرة.' },
  '/sectors/studios':     { title: 'موقع استوديو تصوير أو موسيقى | تلقا تك', desc: 'موقع استوديو احترافي مع معرض أعمال، حجز جلسات، وعرض باقات — يُبرز إبداعك ويجذب العملاء.' },
  '/sectors/care':        { title: 'تطبيق خدمات رعاية منزلية | تلقا تك', desc: 'منصة رعاية صحية ومنزلية: حجز مزودي الخدمة، متابعة الطلبات، وتقييمات — رقمنة خدمة الرعاية.' },
  '/sectors/pets':        { title: 'موقع عيادة حيوانات وبيطري | تلقا تك', desc: 'موقع عيادة بيطرية مع حجز مواعيد، سجل صحي للحيوانات الأليفة، وإشعارات تذكير بالتطعيمات.' },
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
