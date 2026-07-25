import { Home, Coffee, ReceiptText, QrCode } from 'lucide-react';
import { useAppContext, TabType } from '../context/AppProvider';
import { motion } from 'framer-motion';

export function BottomNav() {
  const { activeTab, setActiveTab } = useAppContext();

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: 'home', label: 'الرئيسية', icon: Home },
    { id: 'menu', label: 'المنيو', icon: Coffee },
    { id: 'orders', label: 'طلباتي', icon: ReceiptText },
    { id: 'card', label: 'بطاقتي', icon: QrCode },
  ];

  return (
    <div className="absolute bottom-0 inset-x-0 h-24 bg-card/95 backdrop-blur-md border-t border-card-border px-6 pb-6 pt-4 flex justify-between items-center z-40">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            whileTap={{ scale: 0.9 }}
            className={`flex flex-col items-center gap-1.5 transition-colors relative ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
          >
            {isActive && (
              <motion.div 
                layoutId="nav-pill" 
                className="absolute -top-4 w-1 h-1 bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
