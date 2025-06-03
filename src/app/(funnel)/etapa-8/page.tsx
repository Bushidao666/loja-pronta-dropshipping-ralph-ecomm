'use client';

import { useFunnel } from '@/contexts/FunnelContext';
import { motion } from 'framer-motion';

export default function Etapa8Page() {
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
              A Dor <span className="text-green-400">Surda</span> No Peito
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-xl sm:text-2xl text-white text-center">
              <span className="font-bold text-green-400">Essa angústia quando vê outros progredindo?</span><br/>É porque você sabe que deveria ser você ali.
            </p>
            
            <p className="text-xl sm:text-2xl text-white text-center">
              <span className="font-bold text-green-400">Esse vazio quando chega domingo à noite?</span><br/>É a certeza de que segunda-feira será igual.
            </p>

            <p className="text-2xl sm:text-3xl font-bold text-white text-center pt-4">
              Cansou de se sentir assim?
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 