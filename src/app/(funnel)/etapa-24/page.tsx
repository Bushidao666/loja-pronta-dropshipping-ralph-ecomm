'use client';

import { useFunnel } from '@/contexts/FunnelContext';
import { motion } from 'framer-motion';
import { PackageCheck, BookOpen, RefreshCw, ShieldCheck } from 'lucide-react';

export default function Etapa24Page() {
  const deliverables = [
    { icon: PackageCheck, text: "Loja Shopify profissional configurada" },
    { icon: BookOpen, text: "+50 produtos validados do seu nicho" },
    { icon: BookOpen, text: "Curso ecomExpress completo" }, // Reutilizando ícone, pode trocar se tiver um melhor
    { icon: RefreshCw, text: "Entrega em 5 minutos" },
    { icon: ShieldCheck, text: "7 dias de garantia total" },
  ];

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1 flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-4xl space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-green-500/10 p-4 rounded-lg text-center space-y-2 border border-green-500/30">
                <h3 className="text-xl font-semibold text-white">💳 INVESTIMENTO:</h3>
                <p className="text-4xl font-bold text-green-400">R$97</p>
                <p className="text-sm text-white/70">(Valor real, sem pegadinha)</p>
              </div>
              <div className="bg-yellow-500/10 p-4 rounded-lg text-center space-y-2 border border-yellow-500/30">
                <h3 className="text-xl font-semibold text-white">🛡️ GARANTIA:</h3>
                <p className="text-4xl font-bold text-yellow-400">7 dias</p>
                <p className="text-sm text-white/70">Não gostou? Devolvemos tudo.</p>
              </div>
            </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            <div className="bg-black/30 p-6 rounded-lg border-2 border-green-500/50 shadow-xl space-y-4">
              <h2 className="text-2xl font-bold text-green-400 text-center">📦 VOCÊ RECEBE:</h2>
              <ul className="space-y-3">
                {deliverables.map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    className="flex items-center bg-black/20 p-3 rounded-md"
                  >
                    <item.icon className="h-7 w-7 text-green-400 mr-4 flex-shrink-0" />
                    <span className="text-lg sm:text-xl text-white">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 