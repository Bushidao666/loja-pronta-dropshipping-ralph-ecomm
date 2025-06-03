'use client';

import { useFunnel } from '@/contexts/FunnelContext';
import { motion } from 'framer-motion';

export default function Etapa12Page() {
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
              Por Que Você <span className="text-green-400">Nunca Vai Começar</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-xl sm:text-2xl text-white text-center">
              Aposto que você já pensou:
            </p>
            
            <div className="flex flex-col space-y-4">
              <div className="bg-black/30 py-3 px-4 rounded-lg border-l-2 border-green-500">
                <p className="text-lg sm:text-xl italic text-white">
                  "Vou aprender HTML primeiro"
                </p>
              </div>
              <div className="bg-black/30 py-3 px-4 rounded-lg border-l-2 border-green-500">
                <p className="text-lg sm:text-xl italic text-white">
                  "Preciso fazer curso de marketing"
                </p>
              </div>
              <div className="bg-black/30 py-3 px-4 rounded-lg border-l-2 border-green-500">
                <p className="text-lg sm:text-xl italic text-white">
                  "Vou economizar mais R$5.000 antes"
                </p>
              </div>
            </div>

            <div className="bg-black/40 py-4 px-5 rounded-lg border-2 border-red-500/50 shadow-lg">
                <p className="text-xl sm:text-2xl text-white text-center">
                    <span className="font-bold text-red-400">Resultado:</span><br/>
                    6 meses depois você ainda vai estar "se preparando".
                </p>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
} 