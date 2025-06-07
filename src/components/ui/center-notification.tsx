'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Clock, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { CurrencyType } from '@/store/funnelStore';

interface CenterNotificationProps {
  buyerName: string;
  product: string;
  price: string;
  timeAgo: string;
  currency: CurrencyType;
  className?: string;
  onClose?: () => void;
}

export function CenterNotification({
  buyerName,
  product,
  price,
  timeAgo,
  currency,
  className,
  onClose,
}: CenterNotificationProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  // Tocar o som quando a notificação aparecer
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Ajuste o volume para 50%
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.log('Erro ao tocar áudio:', err));
    }
  }, []);

  // Auto-close após 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ 
        duration: 0.4,
        type: "spring",
        stiffness: 120,
        damping: 14,
        exit: { 
          duration: 0.3,
          type: "tween",
          ease: "easeIn" 
        }
      }}
      className={cn(
        'fixed left-0 right-0 mx-auto top-4 w-64 z-50 rounded-xl border border-green-500/20 bg-black/80 p-2 text-white backdrop-blur-lg shadow-lg flex flex-col overflow-hidden',
        className
      )}
    >
      {/* Elemento de áudio para o som de venda */}
      <audio ref={audioRef} src="/sounds/shopify_sale_sound.mp3" preload="auto" />

      {/* Layout compacto estilo mobile */}
      <div className="flex items-center gap-2">
        {/* Ícone do Shopify */}
        <div className="flex-shrink-0">
          <Image 
            src="/icons/shopify-icon.svg" 
            alt="Shopify" 
            className="h-6 w-6 text-green-500" 
            width={24}
            height={24}
          />
        </div>
        
        {/* Conteúdo principal */}
        <div className="flex-1 min-w-0">
          {/* Cabeçalho com nome do produto */}
          <div className="flex items-center justify-between mb-0.5">
            <div className="flex items-center gap-1">
              <div className="flex h-3 w-3 items-center justify-center rounded-full bg-green-500">
                <span className="text-[8px] font-bold text-white">
                  {currency === 'USD' ? '$' : '€'}
                </span>
              </div>
              <span className="text-[10px] font-semibold text-green-400 truncate">New sale!</span>
            </div>
            
            {/* Botão de fechar */}
            {onClose && (
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white"
                aria-label="Fechar notificação"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            )}
          </div>
          
          {/* Informações da compra */}
          <p className="text-xs font-medium truncate">
            {buyerName} <span className="opacity-70">bought</span> <span className="text-green-400">{product}</span>
          </p>
          
          {/* Preço e tempo */}
          <div className="flex items-center justify-between text-[10px]">
            <p className="font-bold text-white">
              {price}
            </p>
            <div className="flex items-center gap-1 text-white/60">
              <Clock className="h-2 w-2" />
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Barra de progresso Shopify que funciona como timer */}
      <div className="mt-1.5 w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: '100%' }}
          animate={{ width: 0 }}
          transition={{ duration: 3, ease: "linear" }}
          className="h-full bg-green-500"
        />
      </div>
    </motion.div>
  );
} 