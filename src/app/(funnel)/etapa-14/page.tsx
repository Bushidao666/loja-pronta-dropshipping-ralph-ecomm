'use client';

import React, { useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { WrenchIcon, BookOpenCheck, Cpu, Users, Wrench } from 'lucide-react';

export default function Etapa14Page() {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 5;
  
  const supportTypes = [
    {
      icon: <WrenchIcon className="h-8 w-8 sm:h-10 sm:w-10 text-green-400" />,
      title: "Suporte Técnico",
      desc: "Ajuda com configurações e integrações técnicas"
    },
    {
      icon: <BookOpenCheck className="h-8 w-8 sm:h-10 sm:w-10 text-green-400" />,
      title: "Suporte Estratégico",
      desc: "Orientação pessoal nas decisões críticas de produto e mercado"
    },
    {
      icon: <Wrench className="h-8 w-8 sm:h-10 sm:w-10 text-green-400" />,
      title: "Suporte Operacional",
      desc: "Soluções para desafios logísticos e de fornecedores"
    },
    {
      icon: <Users className="h-8 w-8 sm:h-10 sm:w-10 text-green-400" />,
      title: "Comunidade Ativa",
      desc: "Rede exclusiva de empreendedores em diferentes estágios"
    },
    {
      icon: <Cpu className="h-8 w-8 sm:h-10 sm:w-10 text-green-400" />,
      title: "Mentorias Periódicas",
      desc: "Acompanhamento para ajustar estratégias quando necessário"
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
              Componente <span className="text-green-400">#3:</span> Suporte Multi-Nível
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 flex flex-col justify-center space-y-4 sm:space-y-5 min-h-0"
          >
            <div className="relative overflow-hidden rounded-xl flex-1 flex items-center cursor-grab">
              <motion.div 
                className="flex w-full h-full"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={onDragEnd}
                animate={{ x: `-${activeSlide * 100}%` }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
              >
                {supportTypes.map((support, index) => (
                  <div 
                    key={index} 
                    className="w-full flex-shrink-0 bg-black/50 py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 rounded-xl border-l-4 border-green-500 flex flex-col items-center justify-center h-full shadow-xl"
                  >
                    <div className="bg-green-500/20 rounded-full p-4 sm:p-5 mb-4 sm:mb-6">
                      {support.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-400 text-center mb-3 sm:mb-4">{support.title}</h3>
                    <p className="text-base sm:text-lg md:text-xl text-white text-center leading-relaxed max-w-md">{support.desc}</p>
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
                    activeSlide === index ? 'bg-green-400 scale-110' : 'bg-gray-500 hover:bg-gray-400'
                  }`}
                  aria-label={`Suporte ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Indicador de slide atual */}
            <div className="text-center flex-shrink-0">
              <span className="text-base sm:text-lg text-gray-300 font-medium">
                {activeSlide + 1}/{totalSlides}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 