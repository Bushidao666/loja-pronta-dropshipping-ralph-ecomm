import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image'; // Import Next.js Image component

interface NotificationProps {
  message: string; // e.g., "Maria S. de São Paulo, Brazil"
  productName: string;
  price: string; // Formatted price, e.g., "89,90"
  timestamp: string; // e.g., "há 2 min"
  isVisible: boolean;
  // onDismiss?: () => void; // Optional, if manual dismissal is needed later
}

const Notification: React.FC<NotificationProps> = ({
  message,
  productName,
  price,
  timestamp,
  isVisible,
}) => {
  if (!isVisible) return null; // Though AnimatePresence handles this, good for clarity

  const variants = {
    hidden: { opacity: 0, x: 100, transition: { duration: 0.3, ease: "easeIn" } },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: 100, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      layout // Ensures smooth re-ordering if multiple notifications appear/disappear
      className="notification-shopify flex items-center w-full max-w-xs p-3 text-gray-700 bg-white rounded-lg shadow-xl dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
      role="alert"
    >
      <div className="flex-shrink-0 mr-3">
        <Image 
          src="/icons/shopify-icon.svg" 
          alt="Shopify bag icon"
          width={40} 
          height={40} 
          className="rounded-full" // Shopify uses a circular bag icon
        />
      </div>
      <div className="flex-grow text-sm">
        <p className="font-medium text-gray-900 dark:text-white">{message}</p>
        <p className="text-gray-600 dark:text-gray-400">
          comprou <span className="font-semibold text-gray-800 dark:text-gray-100">{productName}</span>
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{timestamp}</p>
      </div>
      <div className="ml-3 text-right flex-shrink-0">
        <p className="text-sm font-semibold text-green-600 dark:text-green-500">R$ {price}</p>
      </div>
    </motion.div>
  );
};

export default Notification; 