'use client';

import React, { useState, useEffect } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { Globe, GraduationCap, HeadphonesIcon, CheckCircle, DollarSign, Euro, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Etapa24Page() {
  const components = [
    {
      icon: <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />,
      title: "Loja Dropshipping Global",
      value: "R$2.997",
      desc: "Site profissional otimizado para vendas internacionais",
      highlight: "Conversão 300% maior"
    },
    {
      icon: <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />,
      title: "Academia Drop360° Global",
      value: "R$1.500", 
      desc: "Curso completo com estratégias para EUA, Canadá e Europa",
      highlight: "5 módulos exclusivos"
    },
    {
      icon: <HeadphonesIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />,
      title: "Suporte VIP 90 Dias",
      value: "R$1.000",
      desc: "Mentoria direta com especialistas em mercado internacional",
      highlight: "Acompanhamento 1:1"
    }
  ];

  const totalValue = components.reduce((sum, component) => 
    sum + parseInt(component.value.replace(/\D/g, '')), 0
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);



  // Autoplay do carrossel (pausa quando está arrastando)
  useEffect(() => {
    if (isDragging) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === components.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [components.length, isDragging]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    
    const threshold = 50;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (Math.abs(velocity) > 300 || Math.abs(offset) > threshold) {
      if (velocity > 0 || offset > 0) {
        // Arrastar para a direita - voltar
        setCurrentIndex((prevIndex) => 
          prevIndex === 0 ? components.length - 1 : prevIndex - 1
        );
      } else {
        // Arrastar para a esquerda - avançar
        setCurrentIndex((prevIndex) => 
          prevIndex === components.length - 1 ? 0 : prevIndex + 1
        );
      }
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === components.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? components.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background com efeitos visuais */}
      <div className="absolute inset-0">
        <div className="absolute top-4 sm:top-8 left-4 sm:left-8 w-20 h-20 sm:w-28 sm:h-28 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 w-24 h-24 sm:w-32 sm:h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 w-full min-h-screen px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-6 sm:mb-8"
          >
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                Sistema <span className="text-green-400">Drop360° Global</span>
              </h1>
            </div>
            
            <div className="flex items-center justify-center gap-3 sm:gap-4 text-sm sm:text-base font-medium">
              <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-green-500/20 rounded-lg border border-green-500/30">
                <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
                <span className="text-green-400">USD</span>
              </div>
              <span className="text-white/60">+</span>
              <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
                <Euro className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
                <span className="text-blue-400">EUR</span>
              </div>
            </div>
          </motion.div>

          {/* Seção de preço */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-black/80 backdrop-blur-md rounded-xl p-5 sm:p-6 lg:p-8 border border-green-500/20 shadow-xl mb-8 sm:mb-12"
          >
            <div className="text-center">
              <div className="mb-4 sm:mb-6">
                <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 bg-red-500/20 rounded-full border border-red-500/30 mb-3 sm:mb-4">
                  <span className="text-sm sm:text-base font-bold text-red-400">Valor Total:</span>
                  <span className="text-lg sm:text-xl font-bold text-red-400 line-through">R${totalValue.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">
                  Seu Investimento:
                </h2>
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-green-400 mb-2">
                  R$97
                </div>
              </div>
              
              <p className="text-sm sm:text-base lg:text-lg text-white/90 font-medium leading-relaxed max-w-2xl mx-auto">
                Comece <span className="text-green-400 font-bold">hoje mesmo</span> a construir seu império digital global. 
                Fature em <span className="text-green-400 font-bold">moeda forte</span> e proteja-se da instabilidade econômica.
              </p>
            </div>
          </motion.div>

          {/* Carrossel de componentes */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              {/* Botões de navegação - Desktop */}
              <button
                onClick={prevSlide}
                className="hidden sm:block absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 lg:-translate-x-16 z-10 p-2 lg:p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              >
                <ChevronLeft className="h-4 w-4 lg:h-5 lg:w-5" />
              </button>

              <button
                onClick={nextSlide} 
                className="hidden sm:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 lg:translate-x-16 z-10 p-2 lg:p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              >
                <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5" />
              </button>

              {/* Container do carrossel */}
              <div className="relative overflow-hidden rounded-xl">
                <motion.div
                  className="flex"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={handleDragEnd}
                  animate={{ x: `${-currentIndex * 100}%` }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 300,
                    damping: 30
                  }}
                >
                  {components.map((component, index) => (
                    <div
                      key={index}
                      className="w-full flex-shrink-0"
                      style={{ minWidth: '100%' }}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: 0.4 + index * 0.1
                        }}
                        className="bg-black/80 backdrop-blur-md rounded-xl p-5 sm:p-6 lg:p-8 border border-white/20 shadow-xl mx-2 sm:mx-3"
                      >
                        {/* Ícone e valor */}
                        <div className="flex items-start justify-between mb-5 sm:mb-6">
                          <div className="p-3 sm:p-4 bg-white/10 rounded-xl border border-white/20">
                            {component.icon}
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-white/60 font-medium mb-1">Valor</div>
                            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{component.value}</div>
                          </div>
                        </div>

                        {/* Conteúdo */}
                        <div>
                          <h3 className="text-xl sm:text-2xl lg:text-2xl font-bold text-white mb-4 sm:mb-5">
                            {component.title}
                          </h3>
                          
                          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-green-500/20 rounded-full border border-green-500/30 mb-4 sm:mb-5">
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
                            <span className="text-xs sm:text-sm font-semibold text-green-400">{component.highlight}</span>
                          </div>
                          
                          <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                            {component.desc}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Botões de navegação - Mobile */}
              <button
                onClick={prevSlide}
                className="sm:hidden absolute -left-3 top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 text-white/70 hover:bg-black/60 hover:text-white active:bg-white/20 transition-all duration-300 shadow-md"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                onClick={nextSlide}
                className="sm:hidden absolute -right-3 top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 text-white/70 hover:bg-black/60 hover:text-white active:bg-white/20 transition-all duration-300 shadow-md"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* Indicadores de posição */}
              <div className="flex justify-center gap-3 mt-6 sm:mt-8">
                {components.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2.5 rounded-full transition-all duration-500 shadow-sm ${
                      index === currentIndex
                        ? 'bg-green-400 w-8 sm:w-12 shadow-green-400/30'
                        : 'bg-white/40 hover:bg-white/60 w-2.5 hover:w-4'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 