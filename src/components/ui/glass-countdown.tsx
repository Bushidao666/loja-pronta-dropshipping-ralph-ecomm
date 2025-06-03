'use client';

import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface GlassCountdownProps {
  initialMinutes?: number;
  initialSeconds?: number;
  onTimerEnd?: () => void;
  className?: string;
}

export function GlassCountdown({
  initialMinutes = 14,
  initialSeconds = 0,
  onTimerEnd,
  className,
}: GlassCountdownProps) {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  const tick = useCallback(() => {
    if (seconds > 0) {
      setSeconds(seconds - 1);
    } else if (minutes > 0) {
      setMinutes(minutes - 1);
      setSeconds(59);
    } else {
      if (onTimerEnd) {
        onTimerEnd();
      }
    }
  }, [minutes, seconds, onTimerEnd]);

  useEffect(() => {
    const timer = setInterval(() => tick(), 1000);
    return () => clearInterval(timer);
  }, [tick]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'flex items-center justify-center gap-2 p-2 rounded-lg bg-black/10 backdrop-blur-md border border-white/10 text-white shadow-lg',
        className
      )}
    >
      <TimeUnit value={minutes} label="min" />
      <div className="text-2xl font-bold">:</div>
      <TimeUnit value={seconds} label="seg" />
    </motion.div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl font-bold min-w-14 text-center">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-xs text-white/70">{label}</div>
    </div>
  );
} 