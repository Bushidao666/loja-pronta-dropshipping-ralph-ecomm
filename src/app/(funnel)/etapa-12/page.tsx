'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, BarChart, Link2, BadgePercent, Search } from 'lucide-react';

export default function Etapa12() {
  const features = [
    {
      icon: <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />,
      text: "Arquitetura de conversão testada com +50.000 visitantes"
    },
    {
      icon: <BarChart className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />,
      text: "Checkout otimizado com abandono 32% menor"
    },
    {
      icon: <Link2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />,
      text: "Integrações essenciais pré-configuradas"
    },
    {
      icon: <BadgePercent className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />,
      text: "Elementos de credibilidade que aumentam vendas em até 27%"
    },
    {
      icon: <Search className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />,
      text: "SEO técnico para tráfego orgânico a médio prazo"
    }
  ];
  
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
              <span className="text-green-400"></span> Fundação Técnica Avançada
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 flex flex-col justify-center space-y-4 sm:space-y-5 min-h-0"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-black/60 py-4 sm:py-5 md:py-6 px-4 sm:px-5 md:px-6 rounded-xl border-l-4 border-green-500 shadow-xl flex-shrink-0"
            >
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white text-center font-bold leading-relaxed">
                A Loja Drop360° <span className="text-green-400">não é apenas um template:</span>
              </p>
            </motion.div>
            
            <div className="space-y-3 sm:space-y-4 flex-1 flex flex-col justify-center">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-start bg-black/40 py-3 sm:py-4 md:py-5 px-4 sm:px-5 md:px-6 rounded-lg border-l-3 border-green-500 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="bg-green-500/20 rounded-full p-2 sm:p-2.5 mr-3 sm:mr-4 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <span className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-medium leading-relaxed">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white text-center font-bold flex-shrink-0"
            >
              Tudo construído com base na minha <span className="text-green-400">experiência real de mercado</span>.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 