'use client';

import React, { useState, useEffect } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { AlertTriangle, PieChart, Package } from 'lucide-react';

export default function Etapa3Page() {
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center leading-tight">
              Por Que <span className="text-green-400">83% das Lojas</span> Falham em 90 Dias
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-xl sm:text-2xl font-bold text-white text-center">
              A verdade que ninguém fala:
            </p>

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
                  {/* Card 1: Barreira técnica */}
                  <div className="bg-black/30 rounded-lg border-l-4 border-green-500 p-4 w-full flex-shrink-0 flex flex-col items-center text-center min-h-[180px] justify-center">
                    <AlertTriangle className="h-8 w-8 text-green-400 mb-2" />
                    <p className="font-bold text-green-400 text-lg mb-2">Barreira técnica</p>
                    <p className="text-white text-sm">
                      Criar uma loja que converte exige expertise que a maioria não tem
                    </p>
                  </div>
                  
                  {/* Card 2: Validação ineficiente */}
                  <div className="bg-black/30 rounded-lg border-l-4 border-green-500 p-4 w-full flex-shrink-0 flex flex-col items-center text-center min-h-[180px] justify-center">
                    <PieChart className="h-8 w-8 text-green-400 mb-2" />
                    <p className="font-bold text-green-400 text-lg mb-2">Validação ineficiente</p>
                    <p className="text-white text-sm">
                      Escolher produtos baseado em &quot;achismos&quot; é queimar dinheiro
                    </p>
                  </div>
                  
                  {/* Card 3: Complexidade operacional */}
                  <div className="bg-black/30 rounded-lg border-l-4 border-green-500 p-4 w-full flex-shrink-0 flex flex-col items-center text-center min-h-[180px] justify-center">
                    <Package className="h-8 w-8 text-green-400 mb-2" />
                    <p className="font-bold text-green-400 text-lg mb-2">Complexidade operacional</p>
                    <p className="text-white text-sm">
                      Logística, fornecedores e suporte sobrecarregam iniciantes
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

            <div className="bg-black/30 py-3 px-4 rounded-lg border-l-4 border-green-500 text-center">
              <p className="text-lg sm:text-xl font-bold text-white">
                Eu já queimei mais de <span className="bg-white/10 px-2 py-1 rounded text-green-400">R$50.000</span> aprendendo isso da maneira difícil.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 