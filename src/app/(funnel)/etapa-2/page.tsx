'use client';

import React, { useState, useEffect } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { Server, CheckCircle2, BookOpen } from 'lucide-react';

export default function Etapa2() {
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
        <div className="w-full max-w-4xl space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center leading-tight">
              Em 7 anos vendendo para <span className="text-green-400">93 países</span> e faturando em dólar e euro, identifiquei o que realmente importa:
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Carrossel com autoplay */}
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
                  {/* Pilar 1 */}
                  <div className="bg-black/30 rounded-lg border-l-4 border-green-500 p-4 w-full flex-shrink-0 flex flex-col items-center text-center">
                    <Server className="h-8 w-8 text-green-400 mb-2" />
                    <p className="font-bold text-green-400 text-base mb-1">Infraestrutura técnica</p>
                    <p className="text-white text-sm">
                      que converte compradores estrangeiros
                    </p>
                  </div>

                  {/* Pilar 2 */}
                  <div className="bg-black/30 rounded-lg border-l-4 border-green-500 p-4 w-full flex-shrink-0 flex flex-col items-center text-center">
                    <CheckCircle2 className="h-8 w-8 text-green-400 mb-2" />
                    <p className="font-bold text-green-400 text-base mb-1">Validação estratégica</p>
                    <p className="text-white text-sm">
                      de produtos com apelo global
                    </p>
                  </div>

                  {/* Pilar 3 */}
                  <div className="bg-black/30 rounded-lg border-l-4 border-green-500 p-4 w-full flex-shrink-0 flex flex-col items-center text-center">
                    <BookOpen className="h-8 w-8 text-green-400 mb-2" />
                    <p className="font-bold text-green-400 text-base mb-1">Conhecimento prático</p>
                    <p className="text-white text-sm">
                      de operação internacional e escalabilidade
                    </p>
                  </div>
                </motion.div>
              </div>
              
              {/* Dots de navegação */}
              <div className="flex justify-center gap-2 mt-2">
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
            </div>

            <p className="text-lg sm:text-xl font-bold text-white text-center pt-1">
              A maioria dos cursos foca apenas no básico, ignorando o que é <span className="text-green-400">FUNDAMENTAL</span> para conquistar mercados internacionais.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 