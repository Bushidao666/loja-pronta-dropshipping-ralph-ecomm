'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Etapa13() {
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
              As Barreiras <span className="text-green-400">Imaginárias</span> Que Você Criou
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/30 p-4 rounded-lg border-l-4 border-green-500">
                <p className="text-lg sm:text-xl text-white">
                  ✅ Você <span className="font-bold">não precisa</span> ser especialista pra começar
                </p>
              </div>
              <div className="bg-black/30 p-4 rounded-lg border-l-4 border-green-500">
                <p className="text-lg sm:text-xl text-white">
                  ✅ Você <span className="font-bold">não precisa</span> de capital alto
                </p>
              </div>
              <div className="bg-black/30 p-4 rounded-lg border-l-4 border-green-500">
                <p className="text-lg sm:text-xl text-white">
                  ✅ Você <span className="font-bold">não precisa</span> dominar tudo antes
                </p>
              </div>
              <div className="bg-black/30 p-4 rounded-lg border-l-4 border-green-500">
                <p className="text-lg sm:text-xl text-white">
                  ✅ Você só precisa de uma <span className="font-bold text-green-400">loja que FUNCIONA</span>
                </p>
              </div>
            </div>

            <p className="text-xl sm:text-2xl font-bold text-white text-center pt-4">
              Pare de usar &ldquo;preparação&rdquo; como <span className="text-red-400">desculpa.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 