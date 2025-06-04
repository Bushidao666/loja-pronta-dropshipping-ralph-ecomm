'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Store, GraduationCap, HeadphonesIcon } from 'lucide-react';

export default function Etapa16Page() {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 3;
  
  const components = [
    {
      icon: <Store className="h-8 w-8 sm:h-10 sm:w-10 text-green-400" />,
      title: "Fundação Técnica Avançada",
      value: "R$2.997",
      desc: [
        "Loja completa com arquitetura de conversão",
        "Sistema de checkout otimizado",
        "Estrutura pronta para vender"
      ]
    },
    {
      icon: <GraduationCap className="h-8 w-8 sm:h-10 sm:w-10 text-green-400" />,
      title: "Academia Drop360°",
      value: "R$1.500",
      desc: [
        "5 módulos estratégicos",
        "Biblioteca de recursos",
        "Atualizações contínuas"
      ]
    },
    {
      icon: <HeadphonesIcon className="h-8 w-8 sm:h-10 sm:w-10 text-green-400" />,
      title: "Suporte Multi-Nível 90 Dias",
      value: "R$1.000",
      desc: [
        "Equipe especializada",
        "Mentorias de implementação",
        "Comunidade exclusiva"
      ]
    }
  ];

  const totalValue = components.reduce((sum, component) => 
    sum + parseInt(component.value.replace(/\D/g, '')), 0
  );

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
              Tudo Incluído no <span className="text-green-400">Sistema Drop360°</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 flex flex-col justify-center space-y-4 sm:space-y-5 min-h-0"
          >
            <div className="relative overflow-hidden rounded-xl flex-1 flex items-center">
              <div 
                className="flex transition-transform duration-500 ease-in-out w-full h-full" 
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {components.map((component, index) => (
                  <div 
                    key={index} 
                    className="w-full flex-shrink-0 bg-black/50 py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 rounded-xl border-l-4 border-green-500 h-full flex flex-col justify-center shadow-xl"
                  >
                    {/* Ícone no topo centralizado */}
                    <div className="flex justify-center mb-4 sm:mb-6">
                      <div className="bg-green-500/20 rounded-full p-4 sm:p-5 md:p-6">
                        {component.icon}
                      </div>
                    </div>
                    
                    {/* Título e valor centralizados */}
                    <div className="text-center mb-4 sm:mb-6">
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-400 mb-2 sm:mb-3">✅ {component.title}</h3>
                      <p className="text-base sm:text-lg md:text-xl text-white font-medium">(Valor: <span className="text-green-400 font-bold">{component.value}</span>)</p>
                    </div>
                    
                    {/* Lista de benefícios */}
                    <ul className="space-y-2 sm:space-y-3 flex-1 flex flex-col justify-center">
                      {component.desc.map((item, idx) => (
                        <li key={idx} className="text-sm sm:text-base md:text-lg lg:text-xl text-white flex items-center justify-center leading-relaxed">
                          <span className="text-green-400 mr-2 sm:mr-3 text-lg sm:text-xl">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
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
                  aria-label={`Componente ${index + 1}`}
                />
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-black/60 py-4 sm:py-5 md:py-6 px-4 sm:px-5 md:px-6 rounded-xl border-l-4 border-green-500 shadow-xl flex-shrink-0"
            >
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white text-center font-bold leading-relaxed">
                Valor Total Real: <span className="text-green-400 text-xl sm:text-2xl md:text-3xl">R${totalValue.toLocaleString()}</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 