'use client';

import { useCallback } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from './button';

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

  // Calcular porcentagem de progresso
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'flex w-full flex-col gap-3',
        className
      )}
    >
      {/* Progress Bar */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-white/70 font-medium">Progresso</span>
          <span className="text-xs text-white/70 font-medium">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className={cn(
        "flex flex-col items-center gap-3 w-full",
      )}>
        <Button
          size="lg"
          onClick={handleNext}
          className={cn(
            'w-full gap-2 bg-gradient-to-r from-green-500 to-emerald-400 text-white hover:opacity-90',
            buttonClassName
          )}
        >
          {nextButtonText}
          <ArrowRight className="h-4 w-4" />
        </Button>
        {showBackButton && (
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrevious}
            className={cn(
              'w-full gap-2 border-white/10 bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm',
              buttonClassName
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            VOLTAR
          </Button>
        )}
      </div>
    </motion.div>
  );
} 