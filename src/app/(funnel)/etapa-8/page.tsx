'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Target, Workflow } from 'lucide-react';

export default function Etapa8Page() {
  const systemItems = [
    {
      icon: <Layers className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />,
      title: "Fundação",
      desc: "Infraestrutura técnica otimizada para converter compradores internacionais"
    },
    {
      icon: <Target className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />,
      title: "Foco",
      desc: "Validação de produtos com forte apelo em mercados estrangeiros"
    },
    {
      icon: <Workflow className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />,
      title: "Fluxo",
      desc: "Processos e automações para escalar em múltiplos países"
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
              Sistema <span className="text-green-400">3F:</span> Milhões Vendendo na Gringa
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 flex flex-col justify-center space-y-3 sm:space-y-4 min-h-0"
          >
            <p className="text-base sm:text-lg md:text-xl text-white text-center font-medium flex-shrink-0">
              Minha metodologia comprovada para faturar em dólar e euro:
            </p>

            <div className="flex flex-col space-y-2 sm:space-y-3 flex-1 justify-center">
              {systemItems.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="bg-black/40 py-3 sm:py-4 md:py-5 px-4 sm:px-5 md:px-6 rounded-lg border-l-3 border-green-500 flex items-start shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="bg-green-500/20 rounded-full p-2 sm:p-2.5 mr-3 sm:mr-4 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <span className="text-lg sm:text-xl md:text-2xl font-bold text-green-400 block mb-1 sm:mb-2">
                      <span className="underline">F</span>{item.title.substring(1)}
                    </span>
                    <span className="text-sm sm:text-base md:text-lg text-white leading-relaxed">{item.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-black/60 py-3 sm:py-4 md:py-5 px-4 sm:px-5 md:px-6 rounded-xl border-l-3 border-green-500 shadow-xl flex-shrink-0"
            >
              <p className="text-base sm:text-lg md:text-xl text-white text-center font-medium leading-relaxed">
                Este sistema me permitiu vender para <span className="text-green-400 font-bold">EUA, Canadá, Europa</span> e outros <span className="text-green-400 font-bold">90 países</span> - tudo operando do Brasil, recebendo em moeda forte.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 