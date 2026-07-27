import { useCallback, useEffect } from 'react';
import { Router, Switch, Route } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SplashScreen, { useSplash } from './components/SplashScreen';

import HomePage       from './pages/HomePage';
import ServicesPage   from './pages/ServicesPage';
import WalletPage     from './pages/WalletPage';
import BookingsPage   from './pages/BookingsPage';
import AiPage         from './pages/AiPage';
import ClinicPage     from './pages/ClinicPage';
import PricingPage    from './pages/PricingPage';
import ProjectsPage   from './pages/ProjectsPage';
import AboutPage      from './pages/AboutPage';
import FaqPage        from './pages/FaqPage';

// Sector pages
import CafesPage        from './pages/sectors/CafesPage';
import RestaurantsPage  from './pages/sectors/RestaurantsPage';
import ClinicsPage      from './pages/sectors/ClinicsPage';
import BeautyPage       from './pages/sectors/BeautyPage';
import GymsPage         from './pages/sectors/GymsPage';
import HotelsPage       from './pages/sectors/HotelsPage';
import PharmaciesPage   from './pages/sectors/PharmaciesPage';
import EducationPage    from './pages/sectors/EducationPage';
import StoresPage       from './pages/sectors/StoresPage';
import CarsPage         from './pages/sectors/CarsPage';
import CarePage         from './pages/sectors/CarePage';
import TrainingPage     from './pages/sectors/TrainingPage';
import WellnessPage     from './pages/sectors/WellnessPage';
import StudiosPage      from './pages/sectors/StudiosPage';
import OfficesPage      from './pages/sectors/OfficesPage';
import PetsPage         from './pages/sectors/PetsPage';

import CustomCursor from './components/CustomCursor';

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
      </Router>
    </QueryClientProvider>
  );
}
