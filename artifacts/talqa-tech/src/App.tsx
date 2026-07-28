import { lazy, Suspense, useCallback, useEffect } from 'react';
import { Router, Switch, Route } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SplashScreen, { useSplash } from './components/SplashScreen';

import HomePage from './pages/HomePage';
import CustomCursor from './components/CustomCursor';

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
