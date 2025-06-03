'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassmorphismCardProps {
  children: ReactNode;
  className?: string;
  blurIntensity?: string;
  borderColor?: string;
  backgroundOpacity?: string;
}

export function GlassmorphismCard({
  children,
  className,
  blurIntensity = 'backdrop-blur-lg',
  borderColor = 'border-white/10',
  backgroundOpacity = 'bg-white/10 dark:bg-black/10',
}: GlassmorphismCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'rounded-xl border shadow-sm',
        blurIntensity,
        borderColor,
        backgroundOpacity,
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function GlassmorphismContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('p-6', className)}>
      {children}
    </div>
  );
} 