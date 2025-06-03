'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Clock, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface GlassNotificationProps {
  buyerName: string;
  product: string;
  price: string;
  timeAgo: string;
  className?: string;
  onClose?: () => void;
}

export function GlassNotification({
  buyerName,
  product,
  price,
  timeAgo,
  className,
  onClose,
}: GlassNotificationProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  // Tocar o som quando a notificação aparecer
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Ajuste o volume para 50%
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.log('Erro ao tocar áudio:', err));
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: 0 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, type: 'spring', stiffness: 200, damping: 20 }}
      className={cn(
        'fixed top-20 right-4 z-50 max-w-xs rounded-lg border border-green-500/20 bg-green-900/10 p-3 text-white backdrop-blur-md shadow-lg',
        className
      )}
    >
      {/* Elemento de áudio para o som de venda */}
      <audio ref={audioRef} src="/sounds/shopify_sale_sound.mp3" preload="auto" />

      {/* Header da notificação */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500">
            <span className="text-[10px] font-bold text-white">$</span>
          </div>
          <span className="text-[10px] font-semibold text-green-400">Nova venda!</span>
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white rounded-full p-0.5"
            aria-label="Fechar notificação"
          >
            <X className="h-2.5 w-2.5" />
          </button>
        )}
      </div>
      
      {/* Conteúdo da notificação */}
      <div className="flex items-start gap-2">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded bg-white/10">
          <img src="/icons/shopify-icon.svg" alt="Shopify" className="h-5 w-5" />
        </div>
        
        <div className="flex-1">
          <p className="text-xs font-medium mb-0.5">
            {buyerName} acabou de comprar
          </p>
          <p className="text-xs font-semibold text-green-400 mb-0.5">
            {product}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-white">
              {price}
            </p>
            <div className="flex items-center gap-1 text-[10px] text-white/60">
              <Clock className="h-2.5 w-2.5" />
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Barra de progresso Shopify */}
      <div className="mt-2 w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 4 }}
          className="h-full bg-green-500"
        />
      </div>
    </motion.div>
  );
} 