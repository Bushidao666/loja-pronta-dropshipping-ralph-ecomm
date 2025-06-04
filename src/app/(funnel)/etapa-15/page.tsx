'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, DollarSign } from 'lucide-react';

export default function Etapa15() {
  const expectations = [
    {
      icon: <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />,
      title: "Primeiras vendas:",
      desc: "Entre 14-30 dias (implementação correta)"
    },
    {
      icon: <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />,
      title: "ROI inicial:",
      desc: "60-90 dias para a maioria dos alunos dedicados"
    },
    {
      icon: <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />,
      title: "Escala consistente:",
      desc: "4-6 meses para processos previsíveis"
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
              Expectativas <span className="text-green-400">Realistas:</span> O Que Você Pode Alcançar
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
                Sendo <span className="text-green-400">100% transparente</span> sobre resultados:
              </p>
            </motion.div>
            
            <div className="space-y-3 sm:space-y-4 flex-1 flex flex-col justify-center">
              {expectations.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-start bg-black/40 py-3 sm:py-4 md:py-5 px-4 sm:px-5 md:px-6 rounded-lg border-l-3 border-green-500 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="bg-green-500/20 rounded-full p-2 sm:p-2.5 mr-3 sm:mr-4 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-green-400 block mb-1 sm:mb-2">{item.title}</span>
                    <span className="text-sm sm:text-base md:text-lg text-white leading-relaxed">{item.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-black/60 py-4 sm:py-5 md:py-6 px-4 sm:px-5 md:px-6 rounded-xl border-l-4 border-green-500 shadow-xl flex-shrink-0"
            >
              <p className="text-base sm:text-lg md:text-xl text-white text-center font-medium leading-relaxed">
                Meu compromisso é com <span className="font-bold text-green-400 text-lg sm:text-xl md:text-2xl">resultados sustentáveis</span>, não promessas irreais.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 