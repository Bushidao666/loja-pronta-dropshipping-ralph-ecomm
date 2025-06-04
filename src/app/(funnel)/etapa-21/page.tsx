'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Etapa21() {
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
              A Dor Do <span className="text-red-400">Arrependimento</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-xl sm:text-2xl text-white text-center">
              Imagina daqui <span className="font-bold text-green-400">1 ano...</span>
            </p>
            
            <div className="bg-black/30 py-4 px-5 rounded-lg border-l-4 border-green-500 space-y-3">
                <p className="text-lg sm:text-xl text-white">
                  Você encontra um amigo.<br/>
                  Ele te conta que está faturando <span className="font-bold text-green-400">R$8.000/mês</span> online.<br/>
                  Você pergunta como começou.
                </p>
                <p className="text-xl sm:text-2xl text-white font-bold text-center bg-black/20 p-3 rounded-md">
                  Ele responde:<br/>
                  <span className="text-green-400">&ldquo;Comprei uma loja pronta por R$97. Melhor investimento da minha vida.&rdquo;</span>
                </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 