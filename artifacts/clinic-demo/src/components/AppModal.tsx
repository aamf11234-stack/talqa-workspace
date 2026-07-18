import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { PhoneFrame } from './PhoneFrame';
import { BottomNav } from './BottomNav';
import type { ClinicTab } from './BottomNav';
import { ScreenHome } from './ScreenHome';
import { ScreenAppointments } from './ScreenAppointments';
import { ScreenCard } from './ScreenCard';
import { ScreenDoctors } from './ScreenDoctors';
import { ScreenNotifications } from './ScreenNotifications';
import { ScreenResults } from './ScreenResults';

interface AppModalProps {
  open: boolean;
  onClose: () => void;
}

export const AppModal = ({ open, onClose }: AppModalProps) => {
  const [activeTab, setActiveTab] = useState<ClinicTab>('home');

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: 'rgba(5,13,26,0.85)', backdropFilter: 'blur(12px)' }}
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 left-6 w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          >
            <X size={18} />
          </button>

          {/* Label */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/50 text-sm font-medium">
            نموذج توضيحي · اضغط خارج الهاتف للإغلاق
          </div>

          {/* Phone */}
          <motion.div
            initial={{ scale: 0.85, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.85, y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <PhoneFrame>
              <div className="flex-1 relative overflow-hidden h-full">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.18 }}
                    className="absolute inset-0 overflow-y-auto scrollbar-none"
                  >
                    {activeTab === 'home'          && <ScreenHome />}
                    {activeTab === 'appointments'  && <ScreenAppointments />}
                    {activeTab === 'card'          && <ScreenCard />}
                    {activeTab === 'doctors'       && <ScreenDoctors />}
                    {activeTab === 'notifications' && <ScreenNotifications />}
                  </motion.div>
                </AnimatePresence>
              </div>
              <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} notifCount={2} />
            </PhoneFrame>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
