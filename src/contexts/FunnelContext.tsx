'use client';

import React, { createContext, useContext, useCallback, useRef } from 'react';
import useFunnelStore, { NicheType, CurrencyType, Notification } from '@/store/funnelStore';
import useNotifications from '@/hooks/useNotifications';

interface FunnelContextType {
  // Navegação
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  
  // Notificações
  notifications: Notification[];
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  pauseNotifications: () => void;
  resumeNotifications: () => void;
  addNewNotification: () => void;
  
  // Seleção de nicho
  selectedNiche: NicheType | null;
  setSelectedNiche: (niche: NicheType) => void;
  
  // Seleção de moeda
  selectedCurrency: CurrencyType | null;
  setSelectedCurrency: (currency: CurrencyType) => void;
  currencyModalShown: boolean;
  setCurrencyModalShown: (shown: boolean) => void;
  
  // Timer
  timerExpired: boolean;
  setTimerExpired: (expired: boolean) => void;
  
  // Dados do usuário
  setUserEmail: (email: string) => void;
  setUserName: (name: string) => void;
  
  // Dados financeiros
  simulatedProfit: number;
  totalRevenue: number;
  updateProfit: (amount: number) => void;
  updateRevenue: (amount: number) => void;
}

const FunnelContext = createContext<FunnelContextType | null>(null);

export function FunnelProvider({ children }: { children: React.ReactNode }) {
  const {
    currentStep,
    totalSteps,
    nextStep: storeNextStep,
    previousStep: storePreviousStep,
    setStep,
    selectedNiche,
    setSelectedNiche,
    selectedCurrency,
    setSelectedCurrency,
    currencyModalShown,
    setCurrencyModalShown,
    timerExpired,
    setTimerExpired,
    setUserEmail,
    setUserName,
    simulatedProfit,
    totalRevenue,
    updateProfit,
    updateRevenue,
  } = useFunnelStore();

  const {
    notifications,
    removeNotification,
    clearNotifications,
    pauseNotifications,
    resumeNotifications,
    generateRandomNotification,
  } = useNotifications();

  // Ref para controlar debounce de notificações
  const lastNotificationTime = useRef<number>(0);
  const NOTIFICATION_DEBOUNCE = 1000; // 1 segundo entre notificações

  // Função para gerar uma notificação instantânea com debounce
  const addNewNotification = useCallback(() => {
    const now = Date.now();
    
    // Verificar se passou tempo suficiente desde a última notificação
    if (now - lastNotificationTime.current < NOTIFICATION_DEBOUNCE) {
      console.log('Notificação bloqueada por debounce');
      return;
    }
    
    lastNotificationTime.current = now;
    generateRandomNotification();
  }, [generateRandomNotification]);

  // Navegação pura SPA - sem router.push, apenas mudança de estado
  const nextStep = useCallback(() => {
    storeNextStep();
  }, [storeNextStep]);

  const previousStep = useCallback(() => {
    storePreviousStep();
  }, [storePreviousStep]);

  const goToStep = useCallback(
    (step: number) => {
      setStep(step);
    },
    [setStep]
  );

  return (
    <FunnelContext.Provider
      value={{
        currentStep,
        totalSteps,
        nextStep,
        previousStep,
        goToStep,
        notifications,
        removeNotification,
        clearNotifications,
        pauseNotifications,
        resumeNotifications,
        addNewNotification,
        selectedNiche,
        setSelectedNiche,
        selectedCurrency,
        setSelectedCurrency,
        currencyModalShown,
        setCurrencyModalShown,
        timerExpired,
        setTimerExpired,
        setUserEmail,
        setUserName,
        simulatedProfit,
        totalRevenue,
        updateProfit,
        updateRevenue,
      }}
    >
      {children}
    </FunnelContext.Provider>
  );
}

// Hook personalizado para usar o contexto
export function useFunnel() {
  const context = useContext(FunnelContext);
  
  if (!context) {
    throw new Error('useFunnel deve ser usado dentro de um FunnelProvider');
  }
  
  return context;
} 