import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/910000000000?text=Hi, I would like to order from Kebab Lajawab."
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 cursor-pointer"
    >
      <MessageCircle size={32} />
      <span className="absolute -top-2 -right-2 bg-ember-red text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce">
        ONLINE
      </span>
    </motion.a>
  );
};

export default WhatsAppButton;
