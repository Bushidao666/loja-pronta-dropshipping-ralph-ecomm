'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Etapa5Page() {
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
              <span className="text-green-400">PARE.</span> Respire. E Aceite a Realidade Brutal.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-xl sm:text-2xl font-bold text-white text-center">
              Vou falar uma verdade que vai doer:
            </p>

            <p className="text-3xl sm:text-4xl font-bold text-green-400 text-center py-4">
              Você está ficando para trás.
            </p>

            <div className="bg-black/30 py-4 px-5 rounded-lg border-l-4 border-green-500">
              <div className="space-y-3">
                <p className="text-lg sm:text-xl text-white">
                  Aquele seu colega que começou dropshipping 3 meses atrás?
                </p>
                <p className="text-xl sm:text-2xl font-medium text-white">
                  <span className="bg-white/10 px-3 py-2 rounded">Já faturou mais que seu salário.</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 