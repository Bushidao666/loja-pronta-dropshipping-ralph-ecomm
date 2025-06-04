'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Etapa2() {
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
              A Diferença Brutal Entre <span className="text-green-400">Você E Quem Vende</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-xl sm:text-2xl font-bold text-green-400 text-center">
              Eles pararam de &ldquo;se preparar&rdquo; e começaram.
            </p>

            <div className="flex flex-col space-y-4">
              <div className="flex items-start">
                <div className="w-1.5 self-stretch bg-green-500 mr-4 rounded-full min-h-[60px]"></div>
                <div className="flex-1">
                  <p className="text-base text-white/70 mb-2">Enquanto você pesquisa o &ldquo;método perfeito&rdquo;...</p>
                  <div className="bg-black/30 py-3 px-4 rounded-lg border-l-2 border-green-500">
                    <p className="text-lg sm:text-xl font-medium text-white">
                      <span className="bg-white/10 px-2 py-1 rounded">Eles estão recebendo notificação de venda no celular.</span>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-1.5 self-stretch bg-green-500 mr-4 rounded-full min-h-[60px]"></div>
                <div className="flex-1">
                  <p className="text-base text-white/70 mb-2">Enquanto você &ldquo;estuda&rdquo; dropshipping...</p>
                  <div className="bg-black/30 py-3 px-4 rounded-lg border-l-2 border-green-500">
                    <p className="text-lg sm:text-xl font-medium text-white">
                      <span className="bg-white/10 px-2 py-1 rounded">Eles estão contando o dinheiro que ganhou hoje.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-2xl sm:text-3xl font-bold text-white text-center pt-3">
              Doloroso, né?
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 