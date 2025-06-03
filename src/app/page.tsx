'use client';

import React, { useState, useEffect } from 'react';
import { useFunnel } from '@/contexts/FunnelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassNotification } from '@/components/ui/glass-notification';
import { CenterNotification } from '@/components/ui/center-notification';
import { CheckoutModal } from '@/components/ui/checkout-modal';
import { GlassStepNavigation } from '@/components/ui/glass-step-navigation';
import { fbPixelTrack } from '@/components/analytics/facebook-pixel';
import { Users, LineChart, ShoppingCart } from 'lucide-react';

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
            onClose={() => removeNotification(notification.id)}
          />
        ) : (
          <GlassNotification
            key={notification.id}
            buyerName={notification.buyerName}
            product={notification.product}
            price={notification.price}
            timeAgo={notification.timeAgo}
            onClose={() => removeNotification(notification.id)}
          />
        )
      ))}
    </AnimatePresence>
  );
}

// Componente para o indicador "Live" pulsante
function LiveIndicator() {
  return (
    <div className="flex items-center">
      <motion.div
        animate={{ 
          boxShadow: ['0 0 3px 0 #3b82f6', '0 0 7px 2px #3b82f6', '0 0 3px 0 #3b82f6'],
          backgroundColor: ['#3b82f6', '#60a5fa', '#3b82f6']
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2,
          ease: "easeInOut"
        }}
        className="h-2 w-2 bg-blue-500 rounded-full mr-1"
      />
      <span className="text-[10px] sm:text-xs text-blue-400 font-medium">LIVE</span>
    </div>
  );
}

// Header sticky com dashboard estilo Shopify
function StickyHeader() {
  const { totalRevenue, simulatedProfit } = useFunnel();
  const [visitors, setVisitors] = useState(0);
  const [growthRevenue, setGrowthRevenue] = useState(8.4);
  const [growthProfit, setGrowthProfit] = useState(12.7);
  
  // Simular acessos na loja
  useEffect(() => {
    const initialVisitors = Math.floor(Math.random() * 30) + 15; // 15-45 visitantes iniciais
    setVisitors(initialVisitors);
    
    const interval = setInterval(() => {
      setVisitors(prev => {
        // Adiciona 1-3 visitantes a cada 30 segundos
        const newVisitors = prev + Math.floor(Math.random() * 3) + 1;
        return newVisitors;
      });
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Simular alterações nas % de crescimento quando os valores mudam
  useEffect(() => {
    if (totalRevenue > 0) {
      const newGrowth = 8.4 + (Math.random() * 3);
      setGrowthRevenue(parseFloat(newGrowth.toFixed(1)));
    }
    
    if (simulatedProfit > 0) {
      const newGrowth = 12.7 + (Math.random() * 4);
      setGrowthProfit(parseFloat(newGrowth.toFixed(1)));
    }
  }, [totalRevenue, simulatedProfit]);
  
  // Formatar valor monetário
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="container mx-auto px-2 py-3 sm:px-4 sm:py-4 md:py-5">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-3xl mx-auto">
          {/* Visitantes online com indicador LIVE */}
          <motion.div 
            whileHover={{ scale: 1.03, y: -2 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            className="flex flex-col justify-between h-16 sm:h-18 bg-gradient-to-br from-blue-500/20 to-blue-600/5 px-2 py-2 sm:p-3 rounded-md border border-blue-500/20 shadow-sm hover:shadow-blue-500/10"
          >
            <div className="flex items-center justify-between">
              <LiveIndicator />
            </div>
            <div className="flex items-center justify-center">
              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
              <motion.span 
                key={visitors}
                initial={{ opacity: 0.5, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs sm:text-sm text-white ml-1"
              >
                <span className="font-medium text-blue-400">{visitors}</span> online
              </motion.span>
            </div>
          </motion.div>
          
          {/* Total de vendas */}
          <motion.div 
            whileHover={{ scale: 1.03, y: -2 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            className="flex flex-col justify-between h-16 sm:h-18 bg-gradient-to-br from-green-500/20 to-green-600/5 px-2 py-2 sm:p-3 rounded-md border border-green-500/20 shadow-sm hover:shadow-green-500/10"
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] sm:text-[10px] text-green-400 font-medium leading-none">FATURAMENTO</span>
              {totalRevenue > 0 && (
                <span className="text-[9px] sm:text-[10px] text-green-400 font-medium leading-none ml-1">
                  +{growthRevenue}%
                </span>
              )}
            </div>
            <div className="flex items-center justify-center">
              <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
              <motion.span 
                key={totalRevenue}
                initial={{ opacity: 0.5, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs sm:text-sm text-white font-medium ml-1"
              >
                {formatCurrency(totalRevenue || 0)}
              </motion.span>
            </div>
          </motion.div>
          
          {/* Lucro */}
          <motion.div 
            whileHover={{ scale: 1.03, y: -2 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            className="flex flex-col justify-between h-16 sm:h-18 bg-gradient-to-br from-purple-500/20 to-purple-600/5 px-2 py-2 sm:p-3 rounded-md border border-purple-500/20 shadow-sm hover:shadow-purple-500/10"
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] sm:text-[10px] text-purple-400 font-medium leading-none">LUCRO</span>
              {simulatedProfit > 0 && (
                <span className="text-[9px] sm:text-[10px] text-purple-400 font-medium leading-none ml-1">
                  +{growthProfit}%
                </span>
              )}
            </div>
            <div className="flex items-center justify-center">
              <LineChart className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
              <motion.span 
                key={simulatedProfit}
                initial={{ opacity: 0.5, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs sm:text-sm text-white font-medium ml-1"
              >
                {formatCurrency(simulatedProfit || 0)}
              </motion.span>
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
        return "QUERO SABER A DIFERENÇA →";
      case 2:
        return "PARA DE SER TEORIA, QUERO PRÁTICA →";
      case 3:
        return "QUERO SUPERAR ESSE MEDO →";
      case 4:
        return "CHEGA DE MEDO, QUERO AGIR →";
      case 5:
        return "QUERO PARAR DE FICAR PARA TRÁS →";
      case 6:
        return "CHEGA, QUERO SAIR DO LUGAR →";
      case 7:
        return "CANSEI DESSE CICLO →";
      case 8:
        return "SIM, CANSEI DESSA ANGÚSTIA →";
      case 9:
        return "QUERO ESSA REALIDADE →";
      case 10:
        return "QUERO ESSA LIBERDADE →";
      case 11:
        return "QUERO ESSA SENSAÇÃO →";
      case 12:
        return "PARA DE ENROLAR →";
      case 13:
        return "QUERO COMEÇAR DE VERDADE →";
      case 14:
        return "ACEITO, E AGORA? →";
      case 15:
        return "QUERO PULAR A CURVA DE APRENDIZADO →";
      case 16:
        return "QUERO VER OS CENÁRIOS →";
      case 17:
        return "NÃO QUERO ESSE CENÁRIO →";
      case 18:
        return "ESCOLHO CENÁRIO 2 →";
      case 19:
        return "VALE A PENA O RISCO →";
      case 20:
        return "SOU DO TIPO QUE AGE →";
      case 21:
        return "NÃO QUERO ME ARREPENDER →";
      case 22:
        return "NÃO QUERO ESSA DOR →";
      case 23:
        return "QUERO A OPÇÃO 2 →";
      case 24:
        return "QUERO MINHA LOJA POR R$97 →";
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
  const { currentStep } = useFunnel();
  
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
    </div>
  );
} 