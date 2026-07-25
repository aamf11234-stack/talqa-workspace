import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

interface BookingModalProps { isOpen: boolean; onClose: () => void; }

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 rounded-[48px]"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="absolute bottom-0 left-0 right-0 h-[68%] bg-[#FDFBF7] rounded-t-[28px] z-50 flex flex-col items-center px-6 pb-6 pt-3"
          >
            <div className="w-8 h-1 bg-[#C4B59F] opacity-35 rounded-full mb-8" />

            {/* Success icon with brand color */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', damping: 14, stiffness: 220 }}
              className="w-20 h-20 rounded-full flex items-center justify-center mb-5 shadow-[0_12px_32px_rgba(160,82,45,0.35)]"
              style={{ background: 'linear-gradient(135deg, #7B1618, #4A0D0F)' }}
            >
              <Check className="text-white" size={38} strokeWidth={3} />
            </motion.div>

            <div className="text-center mb-5">
              <h3 className="text-[22px] font-bold text-[#111] leading-snug">
                تم حجز طاولتك المفضلة
              </h3>
              <h3 className="text-[22px] font-bold leading-snug">
                في <span className="text-[#7B1618]">مطعمك</span>{' '}
                <span className="text-[#C9956A]">بنجاح!</span>
              </h3>
              <p className="text-[13px] text-[#888] font-light mt-3">
                سنرسل لك تأكيداً على واتساب خلال دقيقة
              </p>
            </div>

            <div className="border border-[#E5DDD4] rounded-full py-2 px-5 mb-auto">
              <span className="text-[13px] text-[#111]">
                رقم الحجز:{' '}
                <span className="font-inter text-[#7B1618] font-semibold">#H2024-441</span>
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-full rounded-[18px] py-4 text-[15px] font-semibold active:scale-95 transition-transform text-white shadow-[0_8px_24px_rgba(160,82,45,0.3)]"
              style={{ background: 'linear-gradient(135deg, #7B1618, #4A0D0F)' }}
            >
              رائع، شكراً! 🎉
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
