'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';

interface GlassProfitCounterProps {
  initialValue?: number;
  targetValue?: number;
  prefix?: string;
  className?: string;
  incrementInterval?: number;
  incrementStep?: number;
}

export function GlassProfitCounter({
  initialValue = 0,
  targetValue = 50000,
  prefix = 'R$',
  className,
  incrementInterval = 5000, // milissegundos entre incrementos
  incrementStep = 500, // valor a incrementar por intervalo
}: GlassProfitCounterProps) {
  const [currentValue, setCurrentValue] = useState(initialValue);

  useEffect(() => {
    if (currentValue >= targetValue) return;

    const interval = setInterval(() => {
      setCurrentValue(prev => {
        const newValue = prev + incrementStep;
        return newValue > targetValue ? targetValue : newValue;
      });
    }, incrementInterval);

    return () => clearInterval(interval);
  }, [currentValue, incrementInterval, incrementStep, targetValue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 p-3 backdrop-blur-sm',
        className
      )}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
        <DollarSign className="h-4 w-4 text-green-500" />
      </div>
      <div className="flex flex-col">
        <p className="text-xs font-medium text-green-300">Seu lucro potencial:</p>
        <motion.p 
          key={currentValue}
          initial={{ opacity: 0.5, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg font-bold text-green-400"
        >
          {prefix} {currentValue.toLocaleString('pt-BR')}
          <span className="text-xs text-green-300">/mês</span>
        </motion.p>
      </div>
    </motion.div>
  );
} 