import React from 'react';
import useFunnelState from '@/hooks/useFunnelState'; // Assuming alias @/ is configured for src
import { motion } from 'framer-motion';

interface ProfitCounterProps {
  // Props for styling or specific display variations, if any
  className?: string;
}

const ProfitCounter: React.FC<ProfitCounterProps> = ({ className }) => {
  const currentRevenue = useFunnelState((state) => state.totalRevenue);

  // Format profit to BRL currency string
  const formattedRevenue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(currentRevenue);

  return (
    <div 
      className={`profit-counter text-left p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-sm ${className || ''}`}
    >
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5 leading-tight">Total em Vendas:</p>
      <motion.p
        key={currentRevenue} // Animate when profit changes
        initial={{ opacity: 0.8, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="text-lg sm:text-xl font-bold text-green-600 dark:text-green-500 tracking-tight leading-tight"
      >
        {formattedRevenue}
      </motion.p>
    </div>
  );
};

export default ProfitCounter; 