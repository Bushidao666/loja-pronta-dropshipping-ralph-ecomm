'use client';

import { useCallback } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface GlassStepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  onPrevious?: () => void;
  nextButtonText?: string;
  showBackButton?: boolean;
  className?: string;
  buttonClassName?: string;
}

export function GlassStepNavigation({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  nextButtonText = 'AVANÇAR',
  showBackButton = true,
  className,
  buttonClassName,
}: GlassStepNavigationProps) {
  const handleNext = useCallback(() => {
    if (onNext) onNext();
  }, [onNext]);

  const handlePrevious = useCallback(() => {
    if (onPrevious) onPrevious();
  }, [onPrevious]);

  // Calcular porcentagem de progresso com uma curva suave de "ease-out"
  const calculateProgress = (currentStep: number, totalSteps: number): number => {
    const step = currentStep - 1; // Ajustar para base 0 (0-23)
    const total = totalSteps - 1; // 23
    
    if (step === 0) return 3; // Etapa 1 = 3%
    
    // Usar uma função de easing suave que acelera no início e desacelera no final
    // Combinação de funções para criar progressão natural
    const t = step / total; // normalizar para 0-1
    
    // Função personalizada que cria aceleração inicial e desaceleração gradual
    const easedProgress = Math.pow(t, 0.7) * 0.6 + Math.pow(t, 2) * 0.4;
    
    // Mapear para 3% - 100%
    return 3 + (easedProgress * 97);
  };

  const progressPercentage = calculateProgress(currentStep, totalSteps);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'flex w-full flex-col gap-4',
        className
      )}
    >
      {/* Progress Bar - Glassmorphism Refinado */}
      <div className="relative w-full">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-white/80 font-medium">Progresso</span>
          <span className="text-sm text-white font-semibold">{Math.round(progressPercentage)}%</span>
        </div>
        
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-green-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Botões */}
      <div className="flex flex-col items-center gap-3 w-full">
        {/* Botão Principal - Avançar */}
        <motion.button
          onClick={handleNext}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'w-full py-2 px-6 font-bold text-white rounded-lg border border-green-500/20 bg-green-500 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-green-600',
            buttonClassName
          )}
        >
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="tracking-wide">{nextButtonText}</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </motion.button>

        {/* Botão Secundário - Voltar (Oculto) */}
        {showBackButton && false && (
          <motion.button
            onClick={handlePrevious}
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={cn(
              'group relative w-full overflow-hidden rounded-xl py-2 px-6 font-semibold text-white/90 shadow-lg transition-all duration-300',
              'bg-white/10 backdrop-blur-xl border border-white/20',
              'hover:bg-white/15 hover:border-white/30 hover:shadow-xl hover:shadow-white/10',
              'before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:via-white/5 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100',
              buttonClassName
            )}
          >
            {/* Efeito de brilho sutil no hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out" />
            
            {/* Conteúdo do botão */}
            <div className="relative flex items-center justify-center gap-2 text-sm">
              <motion.div
                whileHover={{ x: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowLeft className="h-4 w-4" />
              </motion.div>
              <span className="tracking-wide">VOLTAR</span>
            </div>
            
            {/* Reflexo de vidro sutil */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
} 