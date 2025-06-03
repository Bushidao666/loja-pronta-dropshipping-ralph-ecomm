'use client';

import React, { useState, useEffect } from 'react';
import { GlassNotification } from '@/components/ui/glass-notification';
import { CenterNotification } from '@/components/ui/center-notification';
import { CheckoutModal } from '@/components/ui/checkout-modal';
import { AnimatePresence } from 'framer-motion';
import { useFunnel } from '@/contexts/FunnelContext';
import { GlassProfitCounter } from '@/components/ui/glass-profit-counter';
import { GlassStepNavigation } from '@/components/ui/glass-step-navigation';
import { fbPixelTrack } from '@/components/analytics/facebook-pixel';
import { Users, LineChart, ShoppingCart } from 'lucide-react';

// Definir o tipo de notificação
type NotificationType = 'corner' | 'center';

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

// Header sticky com dashboard estilo Shopify
function StickyHeader() {
  const { totalRevenue, simulatedProfit } = useFunnel();
  const [visitors, setVisitors] = useState(0);
  
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
  
  // Formatar valor monetário
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center gap-2">
          <img src="/icons/shopify-icon.svg" alt="Logo" className="h-6 w-6 sm:h-8 sm:w-8" />
        </div>
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Visitantes online */}
          <div className="flex items-center gap-1 sm:gap-2 bg-blue-500/10 px-2 py-1 rounded-md">
            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
            <span className="text-xs sm:text-sm text-white">
              <span className="font-medium text-blue-400">{visitors}</span> online
            </span>
          </div>
          
          {/* Total de vendas */}
          <div className="flex items-center gap-1 sm:gap-2 bg-green-500/10 px-2 py-1 rounded-md">
            <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
            <span className="text-xs sm:text-sm text-white">
              <span className="font-medium text-green-400">{formatCurrency(totalRevenue || 0)}</span>
            </span>
          </div>
          
          {/* Lucro */}
          <div className="flex items-center gap-1 sm:gap-2 bg-purple-500/10 px-2 py-1 rounded-md">
            <LineChart className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
            <span className="text-xs sm:text-sm text-white">
              <span className="font-medium text-purple-400">{formatCurrency(simulatedProfit || 0)}</span>
            </span>
          </div>
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
    
    // Pequeno delay antes de avançar para garantir que a notificação seja exibida
    setTimeout(() => {
      // Avançar para a próxima etapa
      nextStep();
    }, 300);
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

export default function FunnelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      <div className="container mx-auto flex flex-1 flex-col px-4 py-8 pb-24 sm:px-6 sm:py-12 lg:max-w-6xl">
        {children}
      </div>
      
      {/* Notificações e footer */}
      <NotificationsDisplay />
      <StickyFooter />
    </div>
  );
} 