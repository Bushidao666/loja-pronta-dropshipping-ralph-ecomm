'use client';

import { useFunnel } from '@/contexts/FunnelContext';
import { motion } from 'framer-motion';

export default function Etapa4Page() {
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
              O Medo Que <span className="text-green-400">Te Paralisa</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-xl sm:text-2xl font-bold text-white text-center">
              Agora fica nessa:
            </p>

            <div className="flex flex-col space-y-4 py-4">
              <div className="bg-black/30 py-3 px-4 rounded-lg border-l-2 border-green-500">
                <p className="text-lg sm:text-xl italic text-white">
                  <span className="bg-white/10 px-2 py-1 rounded mr-2">"Vou estudar mais um pouco..."</span>
                </p>
              </div>
              <div className="bg-black/30 py-3 px-4 rounded-lg border-l-2 border-green-500">
                <p className="text-lg sm:text-xl italic text-white">
                  <span className="bg-white/10 px-2 py-1 rounded mr-2">"Preciso me preparar melhor..."</span>
                </p>
              </div>
              <div className="bg-black/30 py-3 px-4 rounded-lg border-l-2 border-green-500">
                <p className="text-lg sm:text-xl italic text-white">
                  <span className="bg-white/10 px-2 py-1 rounded mr-2">"Ainda não é a hora certa..."</span>
                </p>
              </div>
            </div>

            <p className="text-2xl sm:text-3xl font-bold text-green-400 text-center pt-2">
              Mentira.
            </p>

            <p className="text-xl sm:text-2xl font-medium text-white text-center">
              Você só está com medo de ser feito de trouxa novamente.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 