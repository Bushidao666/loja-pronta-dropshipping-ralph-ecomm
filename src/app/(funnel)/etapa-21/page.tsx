'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { sendViewContentCAPIEvent } from '@/lib/fb-capi-service';

export default function Etapa21() {
  useEffect(() => {
    const productDetails = {
      content_name: "Garantia Dupla de Satisfação",
      content_category: "Garantia",
      content_ids: ['garantia-dupla-etapa21'],
      content_type: "product" as const,
      value: 97,
      currency: "BRL",
      contents: [
        {
          id: 'garantia-dupla-etapa21',
          quantity: 1,
          item_price: 97
        }
      ],
      num_items: 1
    };

    sendViewContentCAPIEvent(productDetails)
      .then(response => {
        if (response.success) {
          console.log('[ETAPA 21] ViewContent CAPI event sent successfully. Event ID:', response.eventId);
        } else {
          console.error('[ETAPA 21] Failed to send ViewContent CAPI event. Error:', response.error);
        }
      })
      .catch(error => {
        console.error('[ETAPA 21] Error during sendViewContentCAPIEvent:', error);
      });
  }, []);

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
              <span className="text-green-400">Garantia Dupla</span> de Satisfação
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 flex flex-col justify-center space-y-4 sm:space-y-5 md:space-y-6 min-h-0"
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-black/60 py-6 sm:py-7 md:py-8 px-5 sm:px-6 md:px-8 rounded-xl border-l-4 border-green-500 flex items-start shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="bg-green-500/20 rounded-full p-3 sm:p-4 mr-4 sm:mr-5 md:mr-6 flex-shrink-0">
                <ShieldCheck className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-400 mb-2 sm:mb-3 md:mb-4 leading-tight">Garantia de Qualidade (7 dias):</h3>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white leading-relaxed font-medium">
                  Se a fundação técnica e o material não forem como prometi, <span className="text-green-400 font-bold">devolvo seu dinheiro integralmente.</span>
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-black/60 py-6 sm:py-7 md:py-8 px-5 sm:px-6 md:px-8 rounded-xl border-l-4 border-green-500 flex items-start shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="bg-green-500/20 rounded-full p-3 sm:p-4 mr-4 sm:mr-5 md:mr-6 flex-shrink-0">
                <ShieldCheck className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-400 mb-2 sm:mb-3 md:mb-4 leading-tight">Garantia de Implementação (30 dias):</h3>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white leading-relaxed font-medium">
                  Implemente as etapas recomendadas e, se não conseguir configurar sua operação, <span className="text-green-400 font-bold">devolvo seu investimento.</span>
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-gradient-to-r from-green-500/20 to-green-400/20 py-5 sm:py-6 md:py-7 px-5 sm:px-6 md:px-8 rounded-xl border-l-4 border-green-500 shadow-xl flex-shrink-0"
            >
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white text-center font-bold leading-relaxed">
                O risco é <span className="text-red-400">todo meu</span>. A oportunidade é <span className="text-green-400">toda sua.</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 