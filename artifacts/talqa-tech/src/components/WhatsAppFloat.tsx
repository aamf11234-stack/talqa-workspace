import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_LINK = "https://wa.me/966551378531?text=السلام%20عليكم%2C%20أريد%20الاستفسار%20عن%20خدمات%20تلقا%20تك";

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      aria-label="تواصل عبر واتساب"
      className="wa-pulse fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl"
      style={{ background: '#25D366' }}
    >
      <MessageCircle size={26} className="fill-current" />
    </motion.a>
  );
}
