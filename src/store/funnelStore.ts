import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type NicheType = 'home' | 'electronics' | 'fashion' | 'pets' | 'beauty' | 'fitness';

export interface Notification {
  id: string;
  buyerName: string;
  product: string;
  price: string;
  timeAgo: string;
  timestamp: number;
}

interface FunnelState {
  // Navegação
  currentStep: number;
  totalSteps: number;
  
  // Dados financeiros simulados
  simulatedProfit: number;
  totalRevenue: number;
  
  // Notificações
  notifications: Notification[];
  
  // Configurações do usuário
  selectedNiche: NicheType | null;
  userEmail: string;
  userName: string;
  userPhone: string;
  
  // Estado do temporizador
  timerExpired: boolean;
}

interface FunnelActions {
  // Navegação
  nextStep: () => void;
  previousStep: () => void;
  setStep: (step: number) => void;
  
  // Dados financeiros
  updateProfit: (amount: number) => void;
  updateRevenue: (amount: number) => void;
  
  // Notificações
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  
  // Configurações do usuário
  setSelectedNiche: (niche: NicheType) => void;
  setUserEmail: (email: string) => void;
  setUserName: (name: string) => void;
  setUserPhone: (phone: string) => void;
  
  // Timer
  setTimerExpired: (expired: boolean) => void;
  
  // Reset
  resetFunnel: () => void;
}

// Create the store
const useFunnelStore = create<FunnelState & FunnelActions>()(
  persist(
    (set, get) => ({
      // Estado inicial
      currentStep: 1,
      totalSteps: 24,
      simulatedProfit: 0,
      totalRevenue: 0,
      notifications: [],
      selectedNiche: null,
      userEmail: '',
      userName: '',
      userPhone: '',
      timerExpired: false,

      // Ações
      nextStep: () => {
        const { currentStep, totalSteps } = get();
        if (currentStep < totalSteps) {
          set({ currentStep: currentStep + 1 });
        }
      },
      
      previousStep: () => {
        const { currentStep } = get();
        if (currentStep > 1) {
          set({ currentStep: currentStep - 1 });
        }
      },
      
      setStep: (step: number) => {
        const { totalSteps } = get();
        if (step >= 1 && step <= totalSteps) {
          set({ currentStep: step });
        }
      },
      
      updateProfit: (amount: number) => {
        set((state) => ({ simulatedProfit: state.simulatedProfit + amount }));
      },
      
      updateRevenue: (amount: number) => {
        set((state) => ({ totalRevenue: state.totalRevenue + amount }));
      },
      
      addNotification: (notification) => {
        const id = Math.random().toString(36).substr(2, 9);
        set((state) => ({
          notifications: [
            ...state.notifications,
            { ...notification, id, timestamp: Date.now() },
          ],
        }));
      },
      
      removeNotification: (id: string) => {
        set((state) => ({
          notifications: state.notifications.filter(
            (notification) => notification.id !== id
          ),
        }));
      },
      
      clearNotifications: () => {
        set({ notifications: [] });
      },
      
      setSelectedNiche: (niche: NicheType) => {
        set({ selectedNiche: niche });
      },
      
      setUserEmail: (email: string) => {
        set({ userEmail: email });
      },
      
      setUserName: (name: string) => {
        set({ userName: name });
      },
      
      setUserPhone: (phone: string) => {
        set({ userPhone: phone });
      },
      
      setTimerExpired: (expired: boolean) => {
        set({ timerExpired: expired });
      },
      
      resetFunnel: () => {
        set({
          currentStep: 1,
          simulatedProfit: 0,
          totalRevenue: 0,
          notifications: [],
          selectedNiche: null,
          userEmail: '',
          userName: '',
          userPhone: '',
          timerExpired: false,
        });
      },
    }),
    {
      name: 'funnel-store',
    }
  )
);

export default useFunnelStore; 