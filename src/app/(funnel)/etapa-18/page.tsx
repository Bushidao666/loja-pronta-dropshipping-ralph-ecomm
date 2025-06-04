'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

export default function Etapa18Page() {
  const idealProfile = [
    {
      icon: <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />,
      text: "Busca um negócio real, não um \"experimento\""
    },
    {
      icon: <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />,
      text: "Tem 15-20h semanais para implementar"
    },
    {
      icon: <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />,
      text: "Valoriza resultados sustentáveis"
    },
    {
      icon: <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />,
      text: "Está disposto a seguir processos comprovados"
    }
  ];

  const notIdealProfile = [
    {
      icon: <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-400" />,
      text: "Busca \"dinheiro fácil\" imediato"
    },
    {
      icon: <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-400" />,
      text: "Não tem disciplina para seguir o método"
    },
    {
      icon: <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-400" />,
      text: "Quer resultados expressivos em poucos dias"
    }
  ];

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <div className="flex-1 flex flex-col justify-center items-center px-2 sm:px-4 py-2 min-h-0">
        <div className="w-full max-w-5xl h-full flex flex-col justify-center space-y-3 sm:space-y-4 md:space-y-5 min-h-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center leading-tight">
              Para Quem é o <span className="text-green-400">Sistema Drop360°</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 flex flex-col justify-center space-y-3 sm:space-y-4 min-h-0"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-black/60 py-3 sm:py-4 md:py-5 px-4 sm:px-5 md:px-6 rounded-xl border-l-4 border-green-500 shadow-xl flex-shrink-0"
            >
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white text-center font-bold leading-relaxed">
                <span className="text-green-400">IDEAL PARA VOCÊ SE:</span>
              </p>
            </motion.div>
            
            <div className="space-y-2 sm:space-y-3 flex-shrink-0">
              {idealProfile.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="flex items-center bg-black/50 py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-5 rounded-xl border-l-4 border-green-500 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="bg-green-500/20 rounded-full p-2 sm:p-2.5 mr-3 sm:mr-4 flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-sm sm:text-base md:text-lg text-white font-medium leading-relaxed">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-black/60 py-3 sm:py-4 md:py-5 px-4 sm:px-5 md:px-6 rounded-xl border-l-4 border-red-400 shadow-xl flex-shrink-0"
            >
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white text-center font-bold leading-relaxed">
                <span className="text-red-400">NÃO É PARA VOCÊ SE:</span>
              </p>
            </motion.div>
            
            <div className="space-y-2 sm:space-y-3 flex-shrink-0">
              {notIdealProfile.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                  className="flex items-center bg-black/50 py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-5 rounded-xl border-l-4 border-red-400 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="bg-red-400/20 rounded-full p-2 sm:p-2.5 mr-3 sm:mr-4 flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-sm sm:text-base md:text-lg text-white font-medium leading-relaxed">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="bg-black/60 py-3 sm:py-4 md:py-5 px-4 sm:px-5 md:px-6 rounded-xl border-l-4 border-yellow-500 shadow-xl flex-shrink-0"
            >
              <p className="text-sm sm:text-base md:text-lg text-white text-center font-medium leading-relaxed italic">
                Prefiro ser <span className="text-yellow-400 font-bold">honesto agora</span> do que ter um aluno frustrado depois.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 