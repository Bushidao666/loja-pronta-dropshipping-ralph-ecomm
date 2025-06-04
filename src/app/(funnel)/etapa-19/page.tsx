'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Etapa19Page() {
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
              <span className="text-green-400">R$97</span> Pode Mudar Sua Vida
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-400 text-center">
              R$97.
            </p>
            
            <div className="flex flex-col space-y-3 text-center">
                <p className="text-lg sm:text-xl text-white/80">
                  É menos que uma camiseta de marca.
                </p>
                <p className="text-lg sm:text-xl text-white/80">
                  É o que você gasta num final de semana.
                </p>
                <p className="text-lg sm:text-xl text-white/80">
                  É menos que um jantar pra dois.
                </p>
            </div>

            <p className="text-xl sm:text-2xl font-bold text-white text-center bg-black/30 p-4 rounded-lg border-2 border-green-500/50 shadow-lg">
              R$97 pode mudar sua vida financeira <span className="text-green-400">para sempre.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 