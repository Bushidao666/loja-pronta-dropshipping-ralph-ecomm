'use client';

import { useFunnel } from '@/contexts/FunnelContext';
import { motion } from 'framer-motion';

export default function Etapa15Page() {
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
              O Problema De <span className="text-green-400">Aprender Sozinho</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-2xl sm:text-3xl text-white text-center">
              Aprender tudo isso vai levar <span className="font-bold text-red-400">2 anos.</span>
            </p>
            
            <p className="text-xl sm:text-2xl font-bold text-white text-center">
              E você tem 2 anos pra esperar?
            </p>

            <div className="bg-black/30 py-4 px-5 rounded-lg border-l-4 border-green-500">
                <p className="text-lg sm:text-xl text-white text-center">
                  Enquanto você "aprende"...<br/>
                  <span className="font-bold text-green-400">Outros estão vendendo com lojas profissionais.</span>
                </p>
            </div>

            <p className="text-xl sm:text-2xl font-bold text-green-400 text-center pt-3">
              Que tal pular essa parte?
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 