'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Etapa23Page() {
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
              Sua <span className="text-green-400">Última</span> Chance
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-xl sm:text-2xl text-white text-center">
              Você chegou até aqui.<br/>
              Leu tudo.<br/>
              <span className="font-bold text-green-400">Sentiu as dores que mostrei.</span>
            </p>
            
            <p className="text-2xl sm:text-3xl text-white text-center font-bold pt-3">
              Agora só tem 2 opções:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-red-500/10 p-6 rounded-lg border-2 border-red-500/50 text-center space-y-3 shadow-xl">
                <h2 className="text-2xl font-bold text-red-400">OPÇÃO 1</h2>
                <p className="text-lg sm:text-xl text-white">
                  <span className="font-bold">Fechar essa página</span> e voltar pra vida de sempre
                </p>
              </div>
              <div className="bg-green-500/10 p-6 rounded-lg border-2 border-green-500/50 text-center space-y-3 shadow-xl">
                <h2 className="text-2xl font-bold text-green-400">OPÇÃO 2</h2>
                <p className="text-lg sm:text-xl text-white">
                  <span className="font-bold">Investir R$97</span> e ter uma chance real de mudança
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 