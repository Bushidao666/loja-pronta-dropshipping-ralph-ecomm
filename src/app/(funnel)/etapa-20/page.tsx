'use client';

import React, { useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { Users, Lightbulb, Truck, BarChart } from 'lucide-react';

export default function Etapa20Page() {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 4;
  
  const specialists = [
    {
      icon: <Users className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-green-400" />,
      title: "Especialistas em Mercados Internacionais",
      desc: "Profissionais com experiência em EUA, Europa e Canadá"
    },
    {
      icon: <Lightbulb className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-green-400" />,
      title: "Estrategistas de Produto Global",
      desc: "Experts que identificaram produtos que vendem em múltiplos países"
    },
    {
      icon: <Truck className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-green-400" />,
      title: "Consultores de Logística Internacional",
      desc: "Otimizaram entregas para mais de 30 países"
    },
    {
      icon: <BarChart className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-green-400" />,
      title: "Mentores de Tráfego Global",
      desc: "Gerenciam campanhas em inglês, espanhol e outros idiomas com alto ROI"
    }
  ];

  const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      setActiveSlide((prev) => Math.min(prev + 1, totalSlides - 1));
    } else if (info.offset.x > swipeThreshold) {
      setActiveSlide((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <div className="flex-1 flex flex-col justify-center items-center px-2 sm:px-4 py-2 min-h-0">
        <div className="w-full max-w-5xl h-full flex flex-col justify-center space-y-4 sm:space-y-5 md:space-y-6 min-h-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center leading-tight">
              Minha <span className="text-green-400">Equipe Especializada</span> em Mercados Globais
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 flex flex-col justify-center space-y-4 sm:space-y-5 min-h-0"
          >
            <div className="relative overflow-hidden rounded-xl flex-1 flex items-center shadow-2xl cursor-grab">
              <motion.div 
                className="flex w-full h-full"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={onDragEnd}
                animate={{ x: `-${activeSlide * 100}%` }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
              >
                {specialists.map((specialist, index) => (
                  <div 
                    key={index} 
                    className="w-full flex-shrink-0 bg-black/60 py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 rounded-xl border-l-4 border-green-500 h-full flex flex-col justify-center items-center shadow-xl"
                  >
                    <div className="bg-green-500/20 rounded-full p-4 sm:p-5 md:p-6 mb-4 sm:mb-6">
                      {specialist.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-400 text-center mb-3 sm:mb-4 md:mb-5 leading-tight">{specialist.title}</h3>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white text-center leading-relaxed font-medium">{specialist.desc}</p>
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Dots de navegação */}
            <div className="flex justify-center gap-3 sm:gap-4 flex-shrink-0">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`h-4 w-4 sm:h-5 sm:w-5 rounded-full transition-all duration-300 ${
                    activeSlide === index 
                      ? 'bg-green-400 scale-110 shadow-lg' 
                      : 'bg-gray-500 hover:bg-gray-400'
                  }`}
                  aria-label={`Especialista ${index + 1}`}
                />
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-black/60 py-4 sm:py-5 md:py-6 px-4 sm:px-5 md:px-6 rounded-xl border-l-4 border-green-500 shadow-xl flex-shrink-0"
            >
              <p className="text-base sm:text-lg md:text-xl text-white text-center font-bold leading-relaxed">
                Essa equipe estará ao seu lado para <span className="text-green-400">conquistar o mercado internacional.</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 