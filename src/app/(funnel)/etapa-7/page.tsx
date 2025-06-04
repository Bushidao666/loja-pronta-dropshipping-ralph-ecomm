'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Etapa7() {
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
              O Pesadelo <span className="text-green-400">Silencioso</span> Que Você Vive
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            <div className="flex flex-col space-y-4">
              <div className="bg-black/30 py-3 px-4 rounded-lg border-l-2 border-green-500">
                <p className="text-lg sm:text-xl text-white">
                  <span className="font-bold text-green-400">5h30 da manhã:</span> Alarme toca. &ldquo;Mais um dia igual&rdquo;.
                </p>
              </div>
              
              <div className="bg-black/30 py-3 px-4 rounded-lg border-l-2 border-green-500">
                <p className="text-lg sm:text-xl text-white">
                  <span className="font-bold text-green-400">No trânsito:</span> Vê story de alguém &ldquo;trabalhando da praia&rdquo;.
                </p>
              </div>
              
              <div className="bg-black/30 py-3 px-4 rounded-lg border-l-2 border-green-500">
                <p className="text-lg sm:text-xl text-white">
                  <span className="font-bold text-green-400">No almoço:</span> Amigo conta que está ganhando online.
                </p>
              </div>
              
              <div className="bg-black/30 py-3 px-4 rounded-lg border-l-2 border-green-500">
                <p className="text-lg sm:text-xl text-white">
                  <span className="font-bold text-green-400">À noite:</span> Promete que &ldquo;amanhã vai começar&rdquo;.
                </p>
              </div>
            </div>

            <p className="text-2xl sm:text-3xl font-bold text-white text-center pt-4">
              E repete tudo de novo.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 