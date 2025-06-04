'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Languages, Banknote, ScrollText, Truck } from 'lucide-react';

export default function Etapa22Page() {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 4;
  
  const questions = [
    {
      icon: <Languages className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-green-400" />,
      question: "Preciso falar inglês fluente?",
      answer: "Não! Tenho alunos com inglês básico vendendo para EUA e Europa. O sistema inclui templates traduzidos e ferramentas de comunicação."
    },
    {
      icon: <Banknote className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-green-400" />,
      question: "Como recebo pagamentos em dólar/euro?",
      answer: "Te ensino a configurar contas em plataformas como Payoneer e Wise para receber e transferir para sua conta brasileira."
    },
    {
      icon: <ScrollText className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-green-400" />,
      question: "Os impostos não comem todo o lucro?",
      answer: "Não com a estrutura correta. Te mostro como operar legalmente maximizando sua margem com planejamento tributário adequado."
    },
    {
      icon: <Truck className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-green-400" />,
      question: "Os produtos demoram muito para chegar?",
      answer: "Te ensino a trabalhar com fornecedores que enviam diretamente para seus clientes em 7-14 dias, com rastreamento completo."
    }
  ];

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <div className="flex-1 flex flex-col justify-center items-center px-2 sm:px-4 py-2 min-h-0">
        <div className="w-full max-w-5xl h-full flex flex-col justify-center space-y-4 sm:space-y-5 md:space-y-6 min-h-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center leading-tight">
              Perguntas Frequentes Sobre <span className="text-green-400">Vendas Internacionais</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 flex flex-col justify-center space-y-4 sm:space-y-5 min-h-0"
          >
            <div className="relative overflow-hidden rounded-xl flex-1 flex items-center shadow-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out w-full h-full" 
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {questions.map((item, index) => (
                  <div 
                    key={index} 
                    className="w-full flex-shrink-0 bg-black/60 py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 rounded-xl border-l-4 border-green-500 h-full flex flex-col justify-center shadow-xl"
                  >
                    <div className="flex items-center mb-4 sm:mb-6 md:mb-8">
                      <div className="bg-green-500/20 rounded-full p-3 sm:p-4 md:p-5 mr-4 sm:mr-5 md:mr-6 flex-shrink-0">
                        {item.icon}
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-400 leading-tight">{item.question}</h3>
                    </div>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white leading-relaxed font-medium">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Dots de navegação */}
            <div className="flex justify-center gap-3 sm:gap-4 flex-shrink-0">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`h-4 w-4 sm:h-5 sm:w-5 rounded-full transition-all duration-300 ${
                    activeSlide === index 
                      ? 'bg-green-400 scale-110 shadow-lg' 
                      : 'bg-gray-500 hover:bg-gray-400'
                  }`}
                  aria-label={`Pergunta ${index + 1}`}
                />
              ))}
            </div>

            {/* Indicador de slide */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-black/60 py-3 sm:py-4 px-4 sm:px-5 rounded-xl border-l-4 border-green-500 shadow-xl flex-shrink-0"
            >
              <p className="text-sm sm:text-base md:text-lg text-white text-center font-medium leading-relaxed">
                <span className="text-green-400 font-bold">{activeSlide + 1}</span> de <span className="text-green-400 font-bold">{totalSlides}</span> - Suas Dúvidas Respondidas
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 