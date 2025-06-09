'use client';

import React, { useState, useEffect } from 'react';
import { useFunnel } from '@/contexts/FunnelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassNotification } from '@/components/ui/glass-notification';
import { CenterNotification } from '@/components/ui/center-notification';
import { CheckoutModal } from '@/components/ui/checkout-modal';
import { CurrencySelectionModal } from '@/components/ui/currency-selection-modal';
import { GlassStepNavigation } from '@/components/ui/glass-step-navigation';
import { fbPixelTrack } from '@/components/analytics/facebook-pixel';

// Importações dinâmicas de cada etapa
import Etapa1 from './(funnel)/etapa-1/page';
import Etapa2 from './(funnel)/etapa-2/page';
import Etapa3 from './(funnel)/etapa-3/page';
import Etapa4 from './(funnel)/etapa-4/page';
import Etapa5 from './(funnel)/etapa-5/page';
import Etapa6 from './(funnel)/etapa-6/page';
import Etapa7 from './(funnel)/etapa-7/page';
import Etapa8 from './(funnel)/etapa-8/page';
import Etapa9 from './(funnel)/etapa-9/page';
import Etapa10 from './(funnel)/etapa-10/page';
import Etapa11 from './(funnel)/etapa-11/page';
import Etapa12 from './(funnel)/etapa-12/page';
import Etapa13 from './(funnel)/etapa-13/page';
import Etapa14 from './(funnel)/etapa-14/page';
import Etapa15 from './(funnel)/etapa-15/page';
import Etapa16 from './(funnel)/etapa-16/page';
import Etapa17 from './(funnel)/etapa-17/page';
import Etapa18 from './(funnel)/etapa-18/page';
import Etapa19 from './(funnel)/etapa-19/page';
import Etapa20 from './(funnel)/etapa-20/page';
import Etapa21 from './(funnel)/etapa-21/page';
import Etapa22 from './(funnel)/etapa-22/page';
import Etapa23 from './(funnel)/etapa-23/page';
import Etapa24 from './(funnel)/etapa-24/page';

// Componente que exibe as notificações
function NotificationsDisplay() {
  const { notifications, removeNotification } = useFunnel();
  // Tipo de notificação: true = centro da tela, false = canto superior
  const useNotificationCenter = true;

  return (
    <AnimatePresence>
      {notifications.slice(-1).map((notification) => (
        useNotificationCenter ? (
          <CenterNotification
            key={notification.id}
            buyerName={notification.buyerName}
            product={notification.product}
            price={notification.price}
            timeAgo={notification.timeAgo}
            currency={notification.currency}
            onClose={() => removeNotification(notification.id)}
          />
        ) : (
          <GlassNotification
            key={notification.id}
            buyerName={notification.buyerName}
            product={notification.product}
            price={notification.price}
            timeAgo={notification.timeAgo}
            currency={notification.currency}
            onClose={() => removeNotification(notification.id)}
          />
        )
      ))}
    </AnimatePresence>
  );
}



// Header sticky com dashboard estilo Shopify
function StickyHeader() {
  const { totalRevenue, selectedCurrency } = useFunnel();
  

  
  // Formatar valor monetário baseado na moeda selecionada
  const formatCurrency = (value: number) => {
    const currency = selectedCurrency || 'USD';
    
    if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value);
    } else {
      return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
      }).format(value);
    }
  };

  // Converter para reais (cotações aproximadas)
  const convertToReais = (value: number) => {
    const currency = selectedCurrency || 'USD';
    let valueInReais = value;
    
    if (currency === 'USD') {
      valueInReais = value * 5.2; // 1 USD ≈ 5.20 BRL
    } else if (currency === 'EUR') {
      valueInReais = value * 5.8; // 1 EUR ≈ 5.80 BRL
    }
    
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valueInReais);
  };
  
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-black/40 border-b border-white/20">
      <div className="container mx-auto px-1 py-0.5 sm:px-2 sm:py-0.5">
        <div className="grid grid-cols-2 gap-1 w-full max-w-lg mx-auto">
          
          {/* Total de vendas */}
          <motion.div 
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            animate={totalRevenue > 0 ? {
              scale: [1, 1.01, 1],
              borderColor: ["rgba(34, 197, 94, 0.4)", "rgba(34, 197, 94, 0.8)", "rgba(34, 197, 94, 0.4)"]
            } : {}}
            transition={totalRevenue > 0 ? {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            } : {}}
            className="relative overflow-hidden bg-gradient-to-br from-green-500/30 to-green-600/15 backdrop-blur-sm border border-green-500/40 rounded p-0.5 sm:p-1 shadow-md hover:shadow-green-500/25 transition-all duration-200"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            
                        <div className="relative h-full flex items-center justify-center">
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-1">
                  <span className="text-sm text-white font-medium tracking-tight">VENDAS:</span>
                  <motion.div 
                    key={totalRevenue}
                    initial={{ opacity: 0.5, x: 5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <motion.span 
                      animate={totalRevenue > 0 ? {
                        scale: [1, 1.05, 1],
                      } : {}}
                      transition={totalRevenue > 0 ? {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      } : {}}
                      className={`text-sm font-black transition-colors duration-300 ${
                        totalRevenue > 0 
                          ? 'text-green-200' 
                          : 'text-gray-400'
                      }`}
                    >
                      {formatCurrency(totalRevenue || 0)}
                    </motion.span>
                  </motion.div>
                </div>
                {totalRevenue > 0 && (
                  <div className="ml-2 px-1 py-0 bg-green-400/25 rounded text-xs text-green-200 font-bold border border-green-400/40">
                    {selectedCurrency || 'USD'}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
          
          {/* Valor em Reais */}
          <motion.div 
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            animate={totalRevenue > 0 ? {
              scale: [1, 1.01, 1],
              borderColor: ["rgba(168, 85, 247, 0.4)", "rgba(168, 85, 247, 0.8)", "rgba(168, 85, 247, 0.4)"]
            } : {}}
            transition={totalRevenue > 0 ? {
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.7
            } : {}}
            className="relative overflow-hidden bg-gradient-to-br from-purple-500/30 to-purple-600/15 backdrop-blur-sm border border-purple-500/40 rounded p-0.5 sm:p-1 shadow-md hover:shadow-purple-500/25 transition-all duration-200"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            
                        <div className="relative h-full flex items-center justify-center">
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-1">
                  <span className="text-sm text-white font-medium tracking-tight">REAIS:</span>
                  <motion.div 
                    key={totalRevenue}
                    initial={{ opacity: 0.5, x: 5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <motion.span 
                      animate={totalRevenue > 0 ? {
                        scale: [1, 1.05, 1],
                      } : {}}
                      transition={totalRevenue > 0 ? {
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.4
                      } : {}}
                      className={`text-sm font-black transition-colors duration-300 ${
                        totalRevenue > 0 
                          ? 'text-purple-200' 
                          : 'text-gray-400'
                      }`}
                    >
                      {convertToReais(totalRevenue || 0)}
                    </motion.span>
                  </motion.div>
                </div>
                {totalRevenue > 0 && (
                  <div className="ml-2 px-1 py-0 bg-purple-400/25 rounded text-xs text-purple-200 font-bold border border-purple-400/40">
                    BRL
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}

// Footer fixo para os botões de navegação
function StickyFooter() {
  const { nextStep, previousStep, currentStep, totalSteps, addNewNotification } = useFunnel();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  
  // Definir texto do botão com base na etapa atual
  const getButtonText = () => {
    switch(currentStep) {
      case 1:
        return "DESCOBRIR A SOLUÇÃO →";
      case 2:
        return "ENTENDER O MÉTODO →";
      case 3:
        return "SUPERAR ESSES DESAFIOS →";
      case 4:
        return "QUERO UM NEGÓCIO REAL →";
      case 5:
        return "CONHECER A FÓRMULA →";
      case 6:
        return "SOLUÇÃO PARA ESSES DESAFIOS →";
      case 7:
        return "CONHECER O ATALHO →";
      case 8:
        return "IMPLEMENTAR ESSE SISTEMA →";
      case 9:
        return "CONHECER A SOLUÇÃO COMPLETA →";
      case 10:
        return "VER OS DETALHES →";
      case 11:
        return "APRENDER COM QUEM JÁ CHEGOU LÁ →";
      case 12:
        return "QUERO ESSA FUNDAÇÃO →";
      case 13:
        return "ACESSAR ESSE CONHECIMENTO →";
      case 14:
        return "QUERO ESSE SUPORTE →";
      case 15:
        return "QUERO RESULTADOS REAIS →";
      case 16:
        return "QUERO O SISTEMA COMPLETO →";
      case 17:
        return "INVESTIMENTO INTELIGENTE →";
      case 18:
        return "SOU DO PERFIL IDEAL →";
      case 19:
        return "QUERO FATURAR EM MOEDA FORTE →";
      case 20:
        return "QUERO ESSA EQUIPE GLOBAL COMIGO →";
      case 21:
        return "INVESTIR COM GARANTIA →";
      case 22:
        return "MINHAS DÚVIDAS FORAM RESOLVIDAS →";
      case 23:
        return "QUERO COMEÇAR AGORA →";
      case 24:
        return "COMEÇAR A VENDER NA GRINGA - R$97 →";
      default:
        return "PRÓXIMO →";
    }
  };
  
  // Mostrar botão de voltar apenas após a primeira etapa
  const showBackButton = currentStep > 1;
  
  // Função para avançar e gerar notificação
  const handleAdvance = () => {
    // Se for a última etapa (24), abrir modal de checkout
    if (currentStep === 24) {
      setIsCheckoutModalOpen(true);
      return;
    }
    
    // Gerar notificação instantaneamente ao clicar
    addNewNotification();
    
    // Sem delay, avança imediatamente 
    nextStep();
  };
  
  return (
    <>
      <footer className="fixed bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/80 to-transparent py-4 px-4 sm:px-6">
        <div className="container mx-auto max-w-3xl">
          <GlassStepNavigation 
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={handleAdvance}
            onPrevious={previousStep}
            showBackButton={showBackButton}
            nextButtonText={getButtonText()}
          />
        </div>
      </footer>
      
      {/* Modal de Checkout */}
      <CheckoutModal 
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
      />
    </>
  );
}

// Componente que renderiza a etapa atual dinamicamente
function DynamicStep() {
  const { currentStep } = useFunnel();
  
  // Retorna o componente correspondente à etapa atual
  switch(currentStep) {
    case 1:
      return <Etapa1 />;
    case 2:
      return <Etapa2 />;
    case 3:
      return <Etapa3 />;
    case 4:
      return <Etapa4 />;
    case 5:
      return <Etapa5 />;
    case 6:
      return <Etapa6 />;
    case 7:
      return <Etapa7 />;
    case 8:
      return <Etapa8 />;
    case 9:
      return <Etapa9 />;
    case 10:
      return <Etapa10 />;
    case 11:
      return <Etapa11 />;
    case 12:
      return <Etapa12 />;
    case 13:
      return <Etapa13 />;
    case 14:
      return <Etapa14 />;
    case 15:
      return <Etapa15 />;
    case 16:
      return <Etapa16 />;
    case 17:
      return <Etapa17 />;
    case 18:
      return <Etapa18 />;
    case 19:
      return <Etapa19 />;
    case 20:
      return <Etapa20 />;
    case 21:
      return <Etapa21 />;
    case 22:
      return <Etapa22 />;
    case 23:
      return <Etapa23 />;
    case 24:
      return <Etapa24 />;
    default:
      return (
        <div className="flex flex-col w-full h-full justify-center items-center text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Etapa {currentStep}
          </h1>
          <div className="flex-grow flex flex-col justify-center py-4">
            <div className="space-y-4">
              <p className="text-2xl font-bold text-white">
                Conteúdo em construção...
              </p>
            </div>
          </div>
        </div>
      );
  }
}

export default function HomePage() {
  const { currentStep, selectedCurrency, currencyModalShown } = useFunnel();
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  
  // Mostrar modal de seleção de moeda se ainda não foi mostrado
  useEffect(() => {
    if (!selectedCurrency && !currencyModalShown) {
      setShowCurrencyModal(true);
    }
  }, [selectedCurrency, currencyModalShown]);

  // Disparar ViewContent quando chegar na etapa 21
  useEffect(() => {
    if (currentStep === 21) {
      fbPixelTrack.viewContent('Loja Pronta Dropshipping - Etapa 21', 97);
    }
  }, [currentStep]);

  return (
    <div className="flex min-h-screen flex-col">
      <StickyHeader />
      
      {/* Container principal que ocupa o espaço entre header e footer */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 pb-32">
        <div className="w-full max-w-5xl h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`step-${currentStep}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full flex items-center justify-center"
            >
              <DynamicStep />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Notificações e footer */}
      <NotificationsDisplay />
      <StickyFooter />

      {/* Modal de seleção de moeda */}
      <CurrencySelectionModal 
        isOpen={showCurrencyModal}
        onClose={() => setShowCurrencyModal(false)}
      />
    </div>
  );
} 