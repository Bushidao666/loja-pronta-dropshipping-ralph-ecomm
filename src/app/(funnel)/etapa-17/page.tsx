'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';

export default function Etapa17Page() {
  const listItems = [
    "Assistindo vídeos de \"renda extra\"",
    "Prometendo que \"vai começar segunda\"",
    "Vendo outros progredindo",
    "Se sentindo um fracassado",
    "Com a mesma vida de sempre"
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-400 text-center leading-tight">
              CENÁRIO 1: <span className="text-white"><br></br>Você Não Age</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-xl sm:text-2xl text-white text-center">
              6 meses depois você ainda vai estar:
            </p>
            
            <ul className="space-y-3">
              {listItems.map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="flex items-start bg-black/30 p-3 rounded-lg border-l-2 border-red-500"
                >
                  <XCircle className="h-6 w-6 text-red-400 mr-3 flex-shrink-0" />
                  <span className="text-lg sm:text-xl text-white">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 