'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Etapa9Page() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1 flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-4xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center leading-tight">
              Imagina Ter <span className="text-green-400">R$3.000 Extras</span> Por Mês
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-xl sm:text-2xl text-white text-center">
              <span className="font-bold text-green-400">Para e imagina por 30 segundos...</span>
            </p>
            
            <p className="text-xl sm:text-2xl text-white text-center">
              R$3.000 a mais todo mês.<br/>
              Sem patrão. Sem horário.<br/>
              Vendendo online.
            </p>

            <p className="text-2xl sm:text-3xl font-bold text-white text-center pt-4">
              Você pagaria aquela conta que <span className="text-red-400">vive no vermelho...</span>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 