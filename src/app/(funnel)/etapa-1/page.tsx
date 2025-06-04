'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Etapa1() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1 flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-4xl space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center leading-tight">
              E aí! Aqui é o Ralph.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <div className="w-24 h-24 md:w-32 md:h-32 relative rounded-full overflow-hidden border-4 border-green-500/30">
                <Image 
                  src="/imgs/ralph-foto.jpg" 
                  alt="Ralph" 
                  fill 
                  className="object-cover"
                  priority
                />
              </div>
              <div>
                <p className="text-xl text-white text-center md:text-left">Você já passou por esse ciclo frustante tentando vender na gringa?</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="bg-black/30 py-2 px-3 rounded-lg border-l-4 border-green-500">
                <p className="text-sm sm:text-base font-medium text-white">
                  <span className="bg-white/10 px-1 py-0.5 rounded mr-1">•</span> Comprou cursos prometendo &quot;ganhos em dólar&quot;
                </p>
              </div>
              <div className="bg-black/30 py-2 px-3 rounded-lg border-l-4 border-green-500">
                <p className="text-sm sm:text-base font-medium text-white">
                  <span className="bg-white/10 px-1 py-0.5 rounded mr-1">•</span> Montou uma loja para o mercado internacional
                </p>
              </div>
              <div className="bg-black/30 py-2 px-3 rounded-lg border-l-4 border-green-500">
                <p className="text-sm sm:text-base font-medium text-white">
                  <span className="bg-white/10 px-1 py-0.5 rounded mr-1">•</span> Escolheu produtos que &quot;pareciam&quot; populares lá fora
                </p>
              </div>
              <div className="bg-black/30 py-2 px-3 rounded-lg border-l-4 border-green-500">
                <p className="text-sm sm:text-base font-medium text-white">
                  <span className="bg-white/10 px-1 py-0.5 rounded mr-1">•</span> Investiu em tráfego... sem converter em euros ou dólares
                </p>
              </div>
            </div>

            <p className="text-lg sm:text-xl font-bold text-white text-center pt-2">
              Isso não é falta de sorte. É um problema estrutural que 89% dos brasileiros enfrentam ao tentar vender internacionalmente.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 