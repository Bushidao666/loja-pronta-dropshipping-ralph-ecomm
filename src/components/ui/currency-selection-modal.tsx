'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, Euro } from 'lucide-react';
import useFunnelStore, { CurrencyType } from '@/store/funnelStore';

interface CurrencySelectionModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

export function CurrencySelectionModal({ 
  isOpen, 
  onClose 
}: CurrencySelectionModalProps) {
  const { setSelectedCurrency, setCurrencyModalShown } = useFunnelStore();

  const handleCurrencySelect = (currency: CurrencyType) => {
    setSelectedCurrency(currency);
    setCurrencyModalShown(true);
    if (onClose) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-full max-w-md mx-4 bg-gradient-to-br from-zinc-900/95 to-black/95 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl"
        >
          <div className="text-center mb-8">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl font-bold text-white mb-2"
            >
              Você prefere vender em?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-gray-400"
            >
              Escolha a moeda para suas vendas internacionais
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCurrencySelect('USD')}
              className="group relative overflow-hidden bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-xl p-6 text-left transition-all duration-300 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 border border-green-500/30 group-hover:bg-green-500/30 transition-colors duration-300">
                    <DollarSign className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">DÓLAR</h3>
                    <p className="text-sm text-green-400 font-medium">USD - Estados Unidos</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-400">$</div>
                  <div className="text-xs text-gray-400">Moeda forte</div>
                </div>
              </div>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCurrencySelect('EUR')}
              className="group relative overflow-hidden bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-xl p-6 text-left transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20 border border-blue-500/30 group-hover:bg-blue-500/30 transition-colors duration-300">
                    <Euro className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">EURO</h3>
                    <p className="text-sm text-blue-400 font-medium">EUR - União Europeia</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-400">€</div>
                  <div className="text-xs text-gray-400">Moeda forte</div>
                </div>
              </div>
            </motion.button>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 