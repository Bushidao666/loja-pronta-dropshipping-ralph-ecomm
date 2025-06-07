'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, GraduationCap, HeadphonesIcon, CheckCircle, DollarSign, Euro } from 'lucide-react';

export default function Etapa24Page() {
  const components = [
    {
      icon: <Globe className="h-6 w-6 text-green-400" />,
      title: "Loja Dropshipping Global",
      value: "R$2.997",
      desc: "Site profissional otimizado para vendas internacionais",
      highlight: "Conversão 300% maior"
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-blue-400" />,
      title: "Academia Drop360° Global",
      value: "R$1.500", 
      desc: "Curso completo com estratégias para EUA, Canadá e Europa",
      highlight: "5 módulos exclusivos"
    },
    {
      icon: <HeadphonesIcon className="h-6 w-6 text-purple-400" />,
      title: "Suporte VIP 90 Dias",
      value: "R$1.000",
      desc: "Mentoria direta com especialistas em mercado internacional",
      highlight: "Acompanhamento 1:1"
    }
  ];

  const totalValue = components.reduce((sum, component) => 
    sum + parseInt(component.value.replace(/\D/g, '')), 0
  );

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background com efeitos visuais */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col px-4 sm:px-6 lg:px-8 py-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
          className="flex-shrink-0 text-center mb-6"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Sistema <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Drop360° Global</span>
            </h1>
          </div>
          
          <div className="flex items-center justify-center gap-4 text-lg font-semibold">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30">
              <DollarSign className="h-5 w-5 text-green-400" />
              <span className="text-green-400">USD</span>
            </div>
            <span className="text-white/60">+</span>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30">
              <Euro className="h-5 w-5 text-blue-400" />
              <span className="text-blue-400">EUR</span>
            </div>
          </div>
        </motion.div>

        {/* Grid de componentes */}
        <div className="flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            {components.map((component, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.2 + index * 0.1,
                  type: "spring",
                  stiffness: 150,
                  damping: 15
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500"
              >
                {/* Efeito de brilho no hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                
                {/* Ícone e valor */}
                <div className="relative flex items-start justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-white/20 to-white/10 rounded-xl border border-white/20">
                    {component.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white/60 font-medium">Valor</div>
                    <div className="text-lg font-bold text-white">{component.value}</div>
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="relative">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">
                    {component.title}
                  </h3>
                  
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30 mb-3">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-xs font-semibold text-green-400">{component.highlight}</span>
                  </div>
                  
                  <p className="text-sm text-white/80 leading-relaxed">
                    {component.desc}
                  </p>
                </div>

                {/* Reflexo de vidro */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-2xl" />
              </motion.div>
            ))}
          </div>

          {/* Seção de preço final */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8, type: "spring", stiffness: 150 }}
            className="relative overflow-hidden bg-gradient-to-r from-green-500/30 via-emerald-500/30 to-green-600/30 backdrop-blur-xl rounded-3xl p-8 border-2 border-green-400/40 shadow-2xl"
          >
            {/* Efeitos de fundo */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-emerald-500/10" />
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-3xl" />
            
            <div className="relative text-center">
              <div className="mb-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-full border border-red-500/30 mb-2">
                  <span className="text-sm font-bold text-red-400">Valor Total:</span>
                  <span className="text-lg font-bold text-red-400 line-through">R${totalValue.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2">
                  Seu Investimento:
                </h2>
                <div className="text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  R$97
                </div>
              </div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-lg text-white/90 font-medium leading-relaxed max-w-2xl mx-auto"
              >
                Comece <span className="text-emerald-400 font-bold">hoje mesmo</span> a construir seu império digital global. 
                Fature em <span className="text-green-400 font-bold">moeda forte</span> e proteja-se da instabilidade econômica.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 