'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Etapa20Page() {
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
              Que Tipo De <span className="text-green-400">Pessoa</span> Você É?
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-xl sm:text-2xl text-white text-center">
              Ou você pode <span className="font-bold text-red-400">economizar esses R$97...</span>
            </p>
            
            <div className="bg-black/30 py-3 px-4 rounded-lg border-l-2 border-red-500 text-center">
                <p className="text-lg sm:text-xl text-white/80">
                  E continuar na mesma vida pelos próximos 6 meses.<br/>
                  Vendo outros progredindo.<br/>
                  Se lamentando por não ter agido.
                </p>
            </div>

            <p className="text-xl sm:text-2xl font-bold text-white text-center pt-3">
              A que investe R$97 numa <span className="text-green-400">possibilidade real...</span><br/>
              Ou a que economiza R$97 e fica <span className="text-red-400">na reclamação?</span>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 