import React from 'react';
import { AppProvider, useAppContext } from './context/AppProvider';
import { PhoneFrame } from './components/PhoneFrame';
import { BottomNav } from './components/BottomNav';
import { OrderFlow } from './components/OrderFlow';
import { HomeScreen } from './screens/Home';
import { MenuScreen } from './screens/Menu';
import { OrdersScreen } from './screens/Orders';
import { CardScreen } from './screens/Card';
import { AnimatePresence } from 'framer-motion';

function MainApp() {
  const { activeTab } = useAppContext();

  return (
    <PhoneFrame>
      <AnimatePresence mode="wait">
        {activeTab === 'home' && <HomeScreen key="home" />}
        {activeTab === 'menu' && <MenuScreen key="menu" />}
        {activeTab === 'orders' && <OrdersScreen key="orders" />}
        {activeTab === 'card' && <CardScreen key="card" />}
      </AnimatePresence>
      <BottomNav />
      <OrderFlow />
    </PhoneFrame>
  );
}

function App() {
  return (
    <div dir="rtl">
      <AppProvider>
        <MainApp />
      </AppProvider>
    </div>
  );
}

export default App;
