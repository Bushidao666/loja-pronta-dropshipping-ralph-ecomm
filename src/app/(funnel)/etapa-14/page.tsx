'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Etapa14Page() {
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
              A Verdade Brutal Sobre <span className="text-green-400">Suas Skills</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-xl sm:text-2xl text-white text-center">
              Vou ser honesto:
            </p>
            
            <div className="bg-black/40 py-4 px-5 rounded-lg border-2 border-red-500/50 shadow-lg">
                <p className="text-xl sm:text-2xl text-red-400 text-center font-bold">
                  Você <span className="underline">não tem skill</span> pra fazer uma loja profissional.
                </p>
            </div>

            <div className="flex flex-col space-y-3 text-center">
                <p className="text-lg sm:text-xl text-white/80">
                  Não tem conhecimento de UX.
                </p>
                <p className="text-lg sm:text-xl text-white/80">
                  Não sabe quais produtos convertem.
                </p>
                <p className="text-lg sm:text-xl text-white/80">
                  Não entende de otimização de checkout.
                </p>
            </div>

            <p className="text-xl sm:text-2xl font-bold text-green-400 text-center pt-3">
              E tudo bem. Ninguém nasce sabendo.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 