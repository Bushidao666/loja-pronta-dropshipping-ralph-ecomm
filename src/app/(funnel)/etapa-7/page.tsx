'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Clock, TrendingDown, AlertTriangle } from 'lucide-react';

export default function Etapa7() {
  const costItems = [
    {
      icon: <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-red-400" />,
      text: "R$3.000+ em produtos que nunca vendem"
    },
    {
      icon: <TrendingDown className="h-5 w-5 sm:h-6 sm:w-6 text-red-400" />,
      text: "R$4.000+ em tráfego mal otimizado"
    },
    {
      icon: <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-red-400" />,
      text: "6+ meses de tentativa e erro"
    },
    {
      icon: <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-400" />,
      text: "Estresse e frustração constantes"
    }
  ];

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <div className="flex-1 flex flex-col justify-center items-center px-2 sm:px-4 py-2 min-h-0">
        <div className="w-full max-w-5xl h-full flex flex-col justify-center space-y-3 sm:space-y-4 md:space-y-5 min-h-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center leading-tight">
              O Custo Real de <span className="text-red-400">Aprender Sozinho</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 flex flex-col justify-center space-y-3 sm:space-y-4 min-h-0"
          >
            <p className="text-base sm:text-lg md:text-xl text-white text-center font-medium flex-shrink-0">
              O que as pessoas realmente gastam tentando aprender sozinhas:
            </p>

            <div className="flex flex-col space-y-2 sm:space-y-3 flex-1 justify-center">
              {costItems.map((item, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="bg-black/40 py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-5 rounded-lg border-l-3 border-red-400 flex items-center shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="bg-red-400/20 rounded-full p-2 sm:p-2.5 mr-3 sm:mr-4 flex-shrink-0">
                    {item.icon}
                  </div>
                  <p className="text-sm sm:text-base md:text-lg text-white font-medium">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-black/60 py-3 sm:py-4 md:py-5 px-4 sm:px-5 md:px-6 rounded-xl border-l-3 border-red-400 shadow-xl flex-shrink-0"
            >
              <p className="text-base sm:text-lg md:text-xl text-white text-center font-medium">
                Eu mesmo queimei <span className="font-bold text-red-400 text-lg sm:text-xl md:text-2xl">R$30.000</span> nos primeiros meses.
              </p>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white text-center flex-shrink-0"
            >
              Existe um caminho <span className="text-green-400">mais inteligente</span>.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 