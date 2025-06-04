'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Globe, BarChart3, HeadphonesIcon } from 'lucide-react';

export default function Etapa5Page() {
  const [activeSlideNao, setActiveSlideNao] = useState(0);
  const [activeSlideE, setActiveSlideE] = useState(0);
  const totalSlidesNao = 3;
  const totalSlidesE = 3;
  
  // Autoplay effect for "Não é" carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlideNao((prev) => (prev + 1) % totalSlidesNao);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Autoplay effect for "É a combinação" carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlideE((prev) => (prev + 1) % totalSlidesE);
    }, 3500); // Slightly different timing to create visual interest
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1 flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-4xl space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center leading-tight">
              O Que Separa Quem Fatura <span className="text-green-400">€10K/Mês</span> de Quem Não Vende
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3"
          >
            <p className="text-lg sm:text-xl font-bold text-white text-center">
              Não é o que você imagina:
            </p>

            <div className="relative flex justify-center">
              <div className="overflow-hidden pb-2 w-full max-w-[240px]">
                <div 
                  className="flex transition-transform duration-500 ease-in-out" 
                  style={{ transform: `translateX(-${activeSlideNao * 100}%)` }}
                >
                  {/* Card 1 */}
                  <div className="bg-black/30 rounded-lg border-l-4 border-red-500 p-3 w-full flex-shrink-0 flex flex-col justify-between min-h-[160px]">
                    <div className="flex items-center justify-center">
                      <div className="bg-red-500/20 rounded-full p-2">
                        <X className="h-6 w-6 text-red-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-center flex-grow">
                      <p className="text-white text-sm sm:text-base font-medium text-center px-1">
                        Não é dominar idiomas estrangeiros
                      </p>
                    </div>
                    <div className="h-2"></div> {/* Espaçador inferior */}
                  </div>
                  
                  {/* Card 2 */}
                  <div className="bg-black/30 rounded-lg border-l-4 border-red-500 p-3 w-full flex-shrink-0 flex flex-col justify-between min-h-[160px]">
                    <div className="flex items-center justify-center">
                      <div className="bg-red-500/20 rounded-full p-2">
                        <X className="h-6 w-6 text-red-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-center flex-grow">
                      <p className="text-white text-sm sm:text-base font-medium text-center px-1">
                        Não é gastar fortunas em anúncios internacionais
                      </p>
                    </div>
                    <div className="h-2"></div> {/* Espaçador inferior */}
                  </div>
                  
                  {/* Card 3 */}
                  <div className="bg-black/30 rounded-lg border-l-4 border-red-500 p-3 w-full flex-shrink-0 flex flex-col justify-between min-h-[160px]">
                    <div className="flex items-center justify-center">
                      <div className="bg-red-500/20 rounded-full p-2">
                        <X className="h-6 w-6 text-red-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-center flex-grow">
                      <p className="text-white text-sm sm:text-base font-medium text-center px-1">
                        Não é escolher nichos obscuros
                      </p>
                    </div>
                    <div className="h-2"></div> {/* Espaçador inferior */}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Dots de navegação para carrossel "Não é" */}
            <div className="flex justify-center gap-2">
              {Array.from({ length: totalSlidesNao }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlideNao(index)}
                  className={`h-2 w-2 rounded-full ${
                    activeSlideNao === index ? 'bg-red-500' : 'bg-gray-500'
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-green-400 text-center pt-2">
              É a combinação exata de:
            </h2>

            <div className="relative flex justify-center">
              <div className="overflow-hidden pb-2 w-full max-w-[240px]">
                <div 
                  className="flex transition-transform duration-500 ease-in-out" 
                  style={{ transform: `translateX(-${activeSlideE * 100}%)` }}
                >
                  {/* Card 1 */}
                  <div className="bg-black/30 rounded-lg border-l-4 border-green-500 p-3 w-full flex-shrink-0 flex flex-col justify-between min-h-[160px]">
                    <div className="flex items-center justify-center">
                      <div className="bg-green-500/20 rounded-full p-2">
                        <Globe className="h-6 w-6 text-green-400" />
                      </div>
                    </div>
                    <div className="flex items-center justify-center flex-grow">
                      <p className="text-white text-sm sm:text-base font-bold text-center px-1">
                        Fundação técnica global
                      </p>
                    </div>
                    <div className="h-2"></div> {/* Espaçador inferior */}
                  </div>
                  
                  {/* Card 2 */}
                  <div className="bg-black/30 rounded-lg border-l-4 border-green-500 p-3 w-full flex-shrink-0 flex flex-col justify-between min-h-[160px]">
                    <div className="flex items-center justify-center">
                      <div className="bg-green-500/20 rounded-full p-2">
                        <BarChart3 className="h-6 w-6 text-green-400" />
                      </div>
                    </div>
                    <div className="flex items-center justify-center flex-grow">
                      <p className="text-white text-sm sm:text-base font-bold text-center px-1">
                        Metodologia validada em múltiplos países
                      </p>
                    </div>
                    <div className="h-2"></div> {/* Espaçador inferior */}
                  </div>
                  
                  {/* Card 3 */}
                  <div className="bg-black/30 rounded-lg border-l-4 border-green-500 p-3 w-full flex-shrink-0 flex flex-col justify-between min-h-[160px]">
                    <div className="flex items-center justify-center">
                      <div className="bg-green-500/20 rounded-full p-2">
                        <HeadphonesIcon className="h-6 w-6 text-green-400" />
                      </div>
                    </div>
                    <div className="flex items-center justify-center flex-grow">
                      <p className="text-white text-sm sm:text-base font-bold text-center px-1">
                        Suporte especializado em mercados internacionais
                      </p>
                    </div>
                    <div className="h-2"></div> {/* Espaçador inferior */}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Dots de navegação para carrossel "É a combinação" */}
            <div className="flex justify-center gap-2">
              {Array.from({ length: totalSlidesE }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlideE(index)}
                  className={`h-2 w-2 rounded-full ${
                    activeSlideE === index ? 'bg-green-400' : 'bg-gray-500'
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 