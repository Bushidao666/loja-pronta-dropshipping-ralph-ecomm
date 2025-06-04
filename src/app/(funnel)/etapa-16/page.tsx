'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Etapa16Page() {
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
              Dois Cenários Para <span className="text-green-400">Sua Vida</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-xl sm:text-2xl text-white text-center">
              Daqui <span className="font-bold text-green-400">6 meses</span>, você vai estar <span className="font-bold text-red-400">exatamente onde está hoje.</span>
            </p>
            
            <p className="text-xl sm:text-2xl text-white text-center">
              A não ser que tome uma <span className="font-bold text-green-400">decisão HOJE.</span>
            </p>

            <p className="text-2xl sm:text-3xl font-bold text-white text-center pt-3">
              Vou te mostrar 2 cenários possíveis...
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 