'use client';

import React, { useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import Image from 'next/image';

export default function Etapa19Page() {
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Array com os caminhos das imagens de prova social
  const socialProofImages = [
    '/social proof/depo2.webp',
    '/social proof/depo7.webp',
    '/social proof/IMG_1655.webp',
    '/social proof/IMG_1867.webp',
    '/social proof/IMG_2054.webp',
    '/social proof/IMG_2135.webp',
    '/social proof/IMG_3126.webp',
    '/social proof/IMG_8342.webp',
    '/social proof/IMG_8985.webp',
    '/social proof/_IMG_0493.webp',
    '/social proof/_IMG_0884.webp',
    '/social proof/_IMG_0885.webp',
    '/social proof/_IMG_1183.webp',
    '/social proof/_IMG_1559.webp',
  ];

  const totalSlides = socialProofImages.length;

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      nextSlide();
    } else if (info.offset.x > swipeThreshold) {
      prevSlide();
    }
  };

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <div className="flex-1 flex flex-col justify-center items-center px-2 sm:px-4 py-2 min-h-0">
        <div className="w-full max-w-6xl h-full flex flex-col justify-center space-y-4 sm:space-y-5 md:space-y-6 min-h-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white text-center leading-tight">
              Brasileiros Faturando em <span className="text-green-400">Dólar e Euro</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 flex flex-col justify-center space-y-4 sm:space-y-5 min-h-0"
          >
            <div className="relative overflow-hidden rounded-xl flex-1 flex items-center shadow-2xl cursor-grab">
              {/* Botões de navegação */}
              <button 
                onClick={prevSlide} 
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 p-3 sm:p-4 rounded-full transition-all duration-300 shadow-xl"
                aria-label="Slide anterior"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Slider de imagens */}
              <motion.div 
                className="flex w-full h-full" 
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={onDragEnd}
                animate={{ x: `-${activeSlide * 100}%` }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
              >
                {socialProofImages.map((imagePath, index) => (
                  <div key={index} className="w-full flex-shrink-0 h-full">
                    <div className="relative w-full h-full min-h-[50vh] max-h-[70vh]">
                      <Image
                        src={imagePath}
                        alt={`Prova social ${index + 1}`}
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority={index === activeSlide}
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Dots de navegação */}
            <div className="flex justify-center gap-2 sm:gap-3 flex-wrap flex-shrink-0">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`h-3 w-3 sm:h-4 sm:w-4 rounded-full transition-all duration-300 ${
                    activeSlide === index 
                      ? 'bg-green-400 scale-110 shadow-lg' 
                      : 'bg-gray-500 hover:bg-gray-400'
                  }`}
                  aria-label={`Imagem ${index + 1}`}
                />
              ))}
            </div>

            {/* Indicador de slide */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-black/60 py-2 sm:py-3 px-3 sm:px-4 rounded-xl border-l-4 border-green-500 shadow-xl flex-shrink-0"
            >
              <p className="text-sm sm:text-base md:text-lg text-white text-center font-medium leading-relaxed">
                <span className="text-green-400 font-bold">{activeSlide + 1}</span> de <span className="text-green-400 font-bold">{totalSlides}</span> - Resultados Reais dos Alunos
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 