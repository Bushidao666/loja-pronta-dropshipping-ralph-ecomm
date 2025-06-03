'use client';

import { useFunnel } from '@/contexts/FunnelContext';
import { motion } from 'framer-motion';

export default function Etapa1Page() {
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
              Por Que Você Ainda Está <span className="text-green-400">"Se Preparando"</span> Para Começar
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-lg sm:text-xl text-white text-center">Deixa eu acertar na mosca...</p>

            <div className="flex flex-col space-y-4">
              <div className="bg-black/30 py-3 px-4 rounded-lg border-l-4 border-green-500">
                <p className="text-base sm:text-lg font-medium text-white">
                  <span className="bg-white/10 px-2 py-1 rounded mr-2">Você salvou 47 vídeos</span> de "como ganhar dinheiro online".
                </p>
              </div>
              <div className="bg-black/30 py-3 px-4 rounded-lg border-l-4 border-green-500">
                <p className="text-base sm:text-lg font-medium text-white">
                  <span className="bg-white/10 px-2 py-1 rounded mr-2">Seguiu 23 "gurus"</span> no Instagram.
                </p>
              </div>
              <div className="bg-black/30 py-3 px-4 rounded-lg border-l-4 border-green-500">
                <p className="text-base sm:text-lg font-medium text-white">
                  <span className="bg-white/10 px-2 py-1 rounded mr-2">E ainda está na estaca zero.</span>
                </p>
              </div>
            </div>

            <p className="text-xl sm:text-2xl font-bold text-white text-center pt-3">
              Sabe qual é a diferença entre você e quem já está vendendo?
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 