'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, GraduationCap, HeadphonesIcon } from 'lucide-react';

export default function Etapa10Page() {
  const systemComponents = [
    {
      icon: <Globe className="h-5 w-5 text-green-400" />,
      title: "1. Fundação Técnica Internacional",
      desc: "Loja profissional otimizada para converter clientes estrangeiros"
    },
    {
      icon: <GraduationCap className="h-5 w-5 text-green-400" />,
      title: "2. Academia Drop360° Global",
      desc: "Treinamento prático focado em mercados que pagam em dólar e euro"
    },
    {
      icon: <HeadphonesIcon className="h-5 w-5 text-green-400" />,
      title: "3. Suporte Multi-Nível Internacional",
      desc: "Minha equipe especializada em mercados estrangeiros te apoiando"
    }
  ];

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-2">
        <div className="w-full max-w-4xl space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center leading-tight mb-2">
              Apresentando: <span className="text-green-400">Sistema Drop360°</span> para Conquista Global
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3"
          >
            <p className="text-sm sm:text-base text-white text-center">
              Após 7 anos e milhões em vendas internacionais, organizei tudo em um sistema:
            </p>

            <div className="flex flex-col space-y-2">
              {systemComponents.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="bg-black/40 p-3 rounded-lg border-l-3 border-green-500 flex items-start"
                >
                  <div className="bg-green-500/20 rounded-full p-1.5 mr-3 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-base font-bold text-green-400 block mb-1">{item.title}</span>
                    <span className="text-xs sm:text-sm text-white">{item.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-black/30 py-2.5 px-3 rounded-lg border-l-2 border-green-500 mt-2">
              <p className="text-sm sm:text-base text-white text-center font-medium">
                Não é só um curso. É um sistema <span className="text-green-400 font-bold">COMPLETO</span> para vender globalmente.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 