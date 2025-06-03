'use client';

import { useFunnel } from '@/contexts/FunnelContext';
import { motion } from 'framer-motion';

export default function Etapa3Page() {
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
              A Verdade Que <span className="text-green-400">Ninguém Te Conta</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-xl sm:text-2xl font-bold text-white text-center">
              Você sabe por que ainda não começou de verdade?
            </p>

            <p className="text-lg sm:text-xl text-white text-center">
              Porque no fundo, você tem <span className="font-bold text-green-400">medo de fracassar de novo</span>.
            </p>

            <div className="flex flex-col space-y-4 py-4">
              <div className="flex items-center">
                <div className="w-1.5 h-6 bg-green-500 mr-4 rounded-full"></div>
                <p className="text-lg text-white">
                  Você já tentou antes.
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-1.5 h-6 bg-green-500 mr-4 rounded-full"></div>
                <p className="text-lg text-white">
                  Gastou dinheiro.
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-1.5 h-6 bg-green-500 mr-4 rounded-full"></div>
                <p className="text-lg text-white">
                  Perdeu tempo.
                </p>
              </div>
              <div className="bg-black/30 py-3 px-4 rounded-lg border-l-4 border-green-500">
                <p className="text-lg sm:text-xl font-bold text-white">
                  <span className="bg-white/10 px-2 py-1 rounded mr-2">E se sentiu um idiota.</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 