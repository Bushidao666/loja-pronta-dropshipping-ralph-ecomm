'use client';

import React, { useState, useEffect } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { Ban, Truck, TrendingDown, Target, HeadphonesIcon } from 'lucide-react';

export default function Etapa6() {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 5;
  
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center leading-tight">
              <span className="text-green-400">5 Verdades</span> Inconvenientes do Dropshipping
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3"
          >
            <div className="relative">
              <div className="overflow-hidden pb-2 cursor-grab">
                <motion.div 
                  className="flex"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={onDragEnd}
                  animate={{ x: `-${activeSlide * 100}%` }}
                  transition={{ ease: "easeInOut", duration: 0.5 }}
                >
                  {/* Slide 1 */}
                  <div className="bg-black/30 rounded-lg border-l-4 border-green-500 p-4 w-full flex-shrink-0 flex flex-col justify-between min-h-[180px]">
                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className="bg-green-500/20 rounded-full p-2">
                        <Ban className="h-6 w-6 text-green-400 flex-shrink-0" />
                      </div>
                      <h3 className="text-lg font-bold text-green-400">Bloqueios de anúncios</h3>
                    </div>
                    <div className="flex items-center justify-center flex-grow my-2">
                      <p className="text-sm sm:text-base text-white text-center">
                        Acontecem com TODOS. Tenho protocolos específicos após 14 contas bloqueadas.
                      </p>
                    </div>
                  </div>
                  
                  {/* Slide 2 */}
                  <div className="bg-black/30 rounded-lg border-l-4 border-green-500 p-4 w-full flex-shrink-0 flex flex-col justify-between min-h-[180px]">
                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className="bg-green-500/20 rounded-full p-2">
                        <Truck className="h-6 w-6 text-green-400 flex-shrink-0" />
                      </div>
                      <h3 className="text-lg font-bold text-green-400">Logística internacional</h3>
                    </div>
                    <div className="flex items-center justify-center flex-grow my-2">
                      <p className="text-sm sm:text-base text-white text-center">
                        Atrasos, devoluções e taxas surpresa são comuns. Precisamos de sistemas para lidar com isso.
                      </p>
                    </div>
                  </div>
                  
                  {/* Slide 3 */}
                  <div className="bg-black/30 rounded-lg border-l-4 border-green-500 p-4 w-full flex-shrink-0 flex flex-col justify-between min-h-[180px]">
                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className="bg-green-500/20 rounded-full p-2">
                        <TrendingDown className="h-6 w-6 text-green-400 flex-shrink-0" />
                      </div>
                      <h3 className="text-lg font-bold text-green-400">Erosão de margens</h3>
                    </div>
                    <div className="flex items-center justify-center flex-grow my-2">
                      <p className="text-sm sm:text-base text-white text-center">
                        Sem branding forte, suas margens caem drasticamente com a concorrência.
                      </p>
                    </div>
                  </div>
                  
                  {/* Slide 4 */}
                  <div className="bg-black/30 rounded-lg border-l-4 border-green-500 p-4 w-full flex-shrink-0 flex flex-col justify-between min-h-[180px]">
                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className="bg-green-500/20 rounded-full p-2">
                        <Target className="h-6 w-6 text-green-400 flex-shrink-0" />
                      </div>
                      <h3 className="text-lg font-bold text-green-400">Tráfego real</h3>
                    </div>
                    <div className="flex items-center justify-center flex-grow my-2">
                      <p className="text-sm sm:text-base text-white text-center">
                        Não é &quot;invista R$100, receba R$300&quot;. Exige testes e otimização constante.
                      </p>
                    </div>
                  </div>
                  
                  {/* Slide 5 */}
                  <div className="bg-black/30 rounded-lg border-l-4 border-green-500 p-4 w-full flex-shrink-0 flex flex-col justify-between min-h-[180px]">
                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className="bg-green-500/20 rounded-full p-2">
                        <HeadphonesIcon className="h-6 w-6 text-green-400 flex-shrink-0" />
                      </div>
                      <h3 className="text-lg font-bold text-green-400">Suporte contínuo</h3>
                    </div>
                    <div className="flex items-center justify-center flex-grow my-2">
                      <p className="text-sm sm:text-base text-white text-center">
                        Você precisa de ajuda além do início. Cada fase traz novos desafios.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Indicator - Current slide / Total */}
              <div className="flex justify-center items-center gap-2 mt-2">
                <div className="flex gap-2">
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
                <span className="text-xs text-gray-400">
                  {activeSlide + 1}/{totalSlides}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 