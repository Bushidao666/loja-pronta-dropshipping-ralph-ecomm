'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, GraduationCap, HeadphonesIcon, CheckCircle } from 'lucide-react';

export default function Etapa24Page() {
  const components = [
    {
      icon: <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />,
      title: "Fundação Técnica Internacional",
      value: "R$2.997",
      desc: "Loja otimizada para converter clientes estrangeiros"
    },
    {
      icon: <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />,
      title: "Academia Drop360° Global",
      value: "R$1.500",
      desc: "5 módulos focados em vendas para EUA, Canadá e Europa"
    },
    {
      icon: <HeadphonesIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />,
      title: "Suporte Internacional 90 Dias",
      value: "R$1.000",
      desc: "Equipe especializada em mercados internacionais"
    }
  ];

  const totalValue = components.reduce((sum, component) => 
    sum + parseInt(component.value.replace(/\D/g, '')), 0
  );

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <div className="flex-1 flex flex-col justify-center items-center px-2 sm:px-4 py-1 min-h-0">
        <div className="w-full max-w-5xl h-full flex flex-col justify-center space-y-2 sm:space-y-3 min-h-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white text-center leading-tight">
              Sistema <span className="text-green-400">Drop360° Global:</span> Fature em Dólar e Euro
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 flex flex-col justify-center space-y-2 min-h-0"
          >
            <div className="space-y-2">
              {components.map((component, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="bg-black/60 py-2 sm:py-3 px-3 sm:px-4 rounded-xl border-l-4 border-green-500 flex items-center shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="bg-green-500/20 rounded-full p-1.5 sm:p-2 mr-3 flex-shrink-0">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm sm:text-base md:text-lg font-bold text-green-400 mb-1 leading-tight">
                      {component.title}
                    </div>
                    <div className="text-xs sm:text-sm text-white font-medium mb-1">
                      (Valor: <span className="text-green-400 font-bold">{component.value}</span>)
                    </div>
                    <div className="text-xs sm:text-sm text-white/90 leading-relaxed">
                      {component.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-gradient-to-r from-green-500/20 to-green-400/20 py-2 sm:py-3 px-3 sm:px-4 rounded-xl border-l-4 border-green-500 shadow-xl flex-shrink-0"
            >
              <div className="flex flex-col items-center space-y-1">
                <p className="text-xs sm:text-sm md:text-base text-white text-center font-medium">
                  <span className="font-bold">Valor total:</span> <span className="line-through text-red-400">R${totalValue.toLocaleString()}</span>
                </p>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white text-center leading-tight">
                  Seu investimento: <span className="text-green-400">apenas R$97</span>
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="bg-black/60 py-2 sm:py-3 px-3 sm:px-4 rounded-xl border-l-4 border-blue-500 shadow-xl flex-shrink-0"
            >
              <p className="text-xs sm:text-sm md:text-base text-white text-center font-medium leading-relaxed">
                Comece hoje a construir seu <span className="text-blue-400 font-bold">negócio global</span> e fature em <span className="text-green-400 font-bold">moeda forte</span>, 
                protegido da instabilidade econômica brasileira.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 