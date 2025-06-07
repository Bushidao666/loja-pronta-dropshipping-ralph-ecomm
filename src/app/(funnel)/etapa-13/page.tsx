'use client';

import React, { useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import Image from 'next/image';

export default function Etapa13() {
  const [activeSlide, setActiveSlide] = useState(0);
  
  const modules = [
    "/modules/Modulo-1..webp",
    "/modules/Modulo-1.1.webp",
    "/modules/Modulo-1.2.webp",
    "/modules/Modulo-2.webp",
    "/modules/Modulo-3.webp",
    "/modules/Modulo-4.webp",
    "/modules/Modulo-5.webp",
    "/modules/Modulo-6.webp"
  ];
  
  const totalSlides = modules.length;

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
      <div className="flex-1 flex flex-col justify-center items-center px-2 sm:px-4 py-3">
        <div className="w-full max-w-7xl h-full flex flex-col justify-center space-y-4 sm:space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center leading-tight">
              Academia <span className="text-green-400">Drop360°:</span> Dominando o Mercado Internacional
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 flex flex-col justify-center space-y-4 sm:space-y-6"
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
                {modules.map((module, index) => (
                  <div 
                    key={index} 
                    className="w-full flex-shrink-0 flex justify-center items-center h-full px-2"
                  >
                    <div className="relative w-full max-w-4xl h-[50vh] sm:h-[60vh] md:h-[65vh] lg:h-[70vh] xl:h-[75vh]">
                      <Image 
                        src={module}
                        alt={`Módulo ${index + 1}`}
                        fill
                        className="object-contain rounded-xl drop-shadow-2xl"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Dots de navegação */}
            <div className="flex justify-center gap-3 flex-shrink-0">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`h-4 w-4 rounded-full transition-all duration-300 ${
                    activeSlide === index ? 'bg-green-400 scale-110' : 'bg-gray-500 hover:bg-gray-400'
                  }`}
                  aria-label={`Módulo ${index + 1}`}
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