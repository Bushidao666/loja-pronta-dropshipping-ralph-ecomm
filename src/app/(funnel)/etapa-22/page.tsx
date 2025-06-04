'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react'; // Usando um ícone mais adequado

export default function Etapa22Page() {
  const listItems = [
    "Raiva de si mesmo?",
    "Arrependimento profundo?",
    "Vontade de voltar no tempo?",
    "Sensação de burrice?"
  ];

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
              Como Você <span className="text-red-400">Vai Se Sentir?</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-xl sm:text-2xl text-white text-center">
              Aí você lembra que viu essa mesma oferta.<br/>
              <span className="font-bold text-red-400">E não comprou.</span>
            </p>
            
            <ul className="space-y-3">
              {listItems.map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="flex items-center bg-black/30 p-3 rounded-lg border-l-2 border-red-500"
                >
                  <AlertTriangle className="h-6 w-6 text-red-400 mr-3 flex-shrink-0" />
                  <span className="text-lg sm:text-xl text-white font-medium">{item} <span className="text-xl sm:text-2xl text-green-400 font-bold">✅</span></span>
                </motion.li>
              ))}
            </ul>

            <p className="text-xl sm:text-2xl text-white text-center font-bold pt-4 bg-black/40 p-4 rounded-lg border-2 border-red-500/70 shadow-xl">
              Essa dor é <span className="text-red-400 underline">mil vezes pior</span> que investir R$97 hoje.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 