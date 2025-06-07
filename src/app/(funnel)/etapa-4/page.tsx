'use client';

import React, { useState, useEffect } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { ClipboardCheck, DollarSign, Brain } from 'lucide-react';

export default function Etapa4() {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 3;
  
  // Autoplay effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      setActiveSlide((prev) => Math.min(prev + 1, totalSlides - 1));
    } else if (info.offset.x > swipeThreshold) {
      setActiveSlide((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1 flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-4xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center leading-tight">
              Vou ser direto: Dropshipping <span className="text-green-400">NÃO</span> é dinheiro fácil.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            <div className="bg-black/30 py-4 px-5 rounded-lg border-l-4 border-green-500">
              <p className="text-lg sm:text-xl font-medium text-white text-center">
                Depois de faturar <span className="font-bold text-green-400">20 milhões</span>, posso garantir que é um negócio legítimo que exige:
            </p>
            </div>

            <div className="relative flex justify-center">
              <div className="overflow-hidden pb-2 w-full max-w-sm cursor-grab">
                <motion.div 
                  className="flex"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={onDragEnd}
                  animate={{ x: `-${activeSlide * 100}%` }}
                  transition={{ ease: "easeInOut", duration: 0.5 }}
                >
                  {/* Card 1: Estrutura profissional */}
                  <div className="bg-black/30 rounded-lg p-4 w-full flex-shrink-0 flex flex-col items-center text-center min-h-[150px] justify-center">
                    <ClipboardCheck className="h-10 w-10 text-green-400 mb-3" />
                    <p className="text-lg text-white font-bold">
                      Estrutura profissional
                </p>
              </div>
                  
                  {/* Card 2: Processos validados */}
                  <div className="bg-black/30 rounded-lg p-4 w-full flex-shrink-0 flex flex-col items-center text-center min-h-[150px] justify-center">
                    <DollarSign className="h-10 w-10 text-green-400 mb-3" />
                    <p className="text-lg text-white font-bold">
                      Processos validados
                </p>
              </div>
                  
                  {/* Card 3: Conhecimento aplicado */}
                  <div className="bg-black/30 rounded-lg p-4 w-full flex-shrink-0 flex flex-col items-center text-center min-h-[150px] justify-center">
                    <Brain className="h-10 w-10 text-green-400 mb-3" />
                    <p className="text-lg text-white font-bold">
                      Conhecimento aplicado
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Dots de navegação */}
            <div className="flex justify-center gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`h-2 w-2 rounded-full ${
                    activeSlide === index ? 'bg-green-400' : 'bg-gray-500'
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
            
            <p className="text-xl sm:text-2xl font-bold text-white text-center pt-2">
              Quem promete riqueza em 30 dias está mentindo. A questão é: <span className="text-green-400">você quer um experimento ou um negócio real?</span>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 