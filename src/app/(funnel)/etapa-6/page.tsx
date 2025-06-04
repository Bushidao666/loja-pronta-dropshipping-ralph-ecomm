'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Etapa6() {
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
              Enquanto Você <span className="text-green-400">&ldquo;Estuda&rdquo;</span>, Eles Faturam
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            <div className="bg-black/30 py-4 px-5 rounded-lg border-l-4 border-green-500">
              <div className="space-y-3">
                <p className="text-lg sm:text-xl text-white">
                  <span className="font-bold text-green-400">Aquela menina do Instagram</span> que você seguia quando ela era &ldquo;iniciante&rdquo;?
                </p>
                <p className="text-xl sm:text-2xl font-bold text-white">
                  <span className="bg-white/10 px-3 py-2 rounded">Já largou o emprego.</span>
                </p>
              </div>
            </div>

            <div className="bg-black/30 py-4 px-5 rounded-lg border-l-4 border-green-500">
              <div className="space-y-3">
                <p className="text-lg sm:text-xl text-white">
                  <span className="font-bold text-green-400">Aquele cara do YouTube</span> que começou &ldquo;do zero&rdquo; igual você?
                </p>
                <p className="text-xl sm:text-2xl font-bold text-white">
                  <span className="bg-white/10 px-3 py-2 rounded">Já comprou um carro novo.</span>
                </p>
              </div>
            </div>

            <p className="text-2xl sm:text-3xl font-bold text-white text-center pt-4">
              E você?
            </p>
            
            <p className="text-xl sm:text-2xl text-white text-center">
              Ainda assistindo vídeo de &ldquo;motivação&rdquo;.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 