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
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
      className={cn(
        'flex w-full flex-col gap-5',
        className
      )}
    >
      {/* Progress Bar - Glassmorphism Refinado */}
      <div className="relative w-full">
        <div className="flex justify-between items-center mb-3">
          <motion.span 
            className="text-sm text-white/80 font-semibold tracking-wide"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            Progresso
          </motion.span>
          <motion.div 
            className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-sm text-white font-bold">{Math.round(progressPercentage)}%</span>
          </motion.div>
        </div>
        
        <div className="relative w-full h-3 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-full overflow-hidden backdrop-blur-xl border border-white/20 shadow-lg">
          {/* Efeito de brilho interno */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full" />
          
          {/* Barra de progresso com múltiplos gradientes */}
          <motion.div
            className="relative h-full rounded-full overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Gradiente principal */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-400 to-green-500" />
            
            {/* Overlay com brilho */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/30 to-white/20" />
            
            {/* Efeito de movimento/shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: "loop",
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          </motion.div>
          
          {/* Reflexo de vidro no topo */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-full" />
        </div>
      </div>

      {/* Botões com Glassmorphism Refinado */}
      <motion.div 
        className="flex flex-col items-center gap-3 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {/* Botão Principal - Avançar */}
        <motion.button
          onClick={handleNext}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className={cn(
            'group relative w-full overflow-hidden rounded-xl py-2 px-6 font-bold text-white shadow-xl transition-all duration-300',
            'bg-gradient-to-r from-green-500/90 via-emerald-500/90 to-green-600/90',
            'backdrop-blur-md border border-green-400/30',
            'hover:shadow-2xl hover:shadow-green-500/25',
            'before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:via-white/10 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100',
            buttonClassName
          )}
        >
          {/* Efeito de brilho no hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
          
          {/* Gradiente de sobreposição */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          
          {/* Conteúdo do botão */}
          <div className="relative flex items-center justify-center gap-2 text-sm">
            <span className="tracking-wide">{nextButtonText}</span>
            <motion.div
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <ArrowRight className="h-4 w-4" />
            </motion.div>
          </div>
          
          {/* Reflexo de vidro */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
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
      </motion.div>
    </motion.div>
  );
} 