import { useCallback, useEffect, useState } from 'react';
import useFunnelStore from '@/store/funnelStore';

// Dados simulados para as notificações
const buyerNames = [
  'Maria S.',
  'João P.',
  'Ana L.',
  'Carlos R.',
  'Juliana M.',
  'Pedro H.',
  'Fernanda C.',
  'Lucas G.',
  'Amanda T.',
  'Roberto V.',
];

const products = {
  home: ['Luminária LED', 'Organizador Magnético', 'Purificador de Ar', 'Cadeira Ergonômica', 'Tapete Antiderrapante'],
  electronics: ['Fone Bluetooth', 'Carregador Portátil', 'Smartwatch', 'Mini Câmera', 'Adaptador Universal'],
  fashion: ['Bolsa Crossbody', 'Óculos Vintage', 'Relógio Minimalista', 'Colar Ajustável', 'Pulseira Magnética'],
  pets: ['Escova Automática', 'Comedouro Inteligente', 'Brinquedo Interativo', 'Cama Ortopédica', 'Coleira GPS'],
  beauty: ['Massageador Facial', 'Sérum Vitamina C', 'Escova Alisadora', 'Máscara LED', 'Depilador Portátil'],
  fitness: ['Elástico Resistência', 'Rolo Abdominal', 'Garrafa Inteligente', 'Monitor Cardíaco', 'Meia Compressão'],
};

const prices = [59.90, 89.90, 129.90, 79.90, 149.90, 99.90, 199.90];
const timeAgo = ['há 2 min', 'há 5 min', 'há 1 min', 'há 4 min', 'há 3 min', 'agora mesmo', 'há 6 min'];

interface UseNotificationsOptions {
  maxNotifications?: number;
}

export default function useNotifications({
  maxNotifications = 15,
}: UseNotificationsOptions = {}) {
  const { notifications, addNotification, removeNotification, clearNotifications, selectedNiche, updateRevenue, updateProfit } = useFunnelStore();
  const [isPaused, setIsPaused] = useState(true); // Sempre pausado

  const generateRandomNotification = useCallback(() => {
    const randomBuyerName = buyerNames[Math.floor(Math.random() * buyerNames.length)];
    
    // Se um nicho foi selecionado, use produtos desse nicho, senão escolha aleatoriamente
    const productCategory = selectedNiche || Object.keys(products)[Math.floor(Math.random() * Object.keys(products).length)] as keyof typeof products;
    const productList = products[productCategory];
    const randomProduct = productList[Math.floor(Math.random() * productList.length)];
    
    const randomPriceIndex = Math.floor(Math.random() * prices.length);
    const randomPrice = prices[randomPriceIndex];
    const formattedPrice = `R$ ${randomPrice.toFixed(2).replace('.', ',')}`;
    const randomTimeAgo = timeAgo[Math.floor(Math.random() * timeAgo.length)];

    // Atualizar o total de vendas e o lucro simulado
    updateRevenue(randomPrice);
    const profit = randomPrice * 0.4; // 40% de margem de lucro
    updateProfit(profit);

    addNotification({
      buyerName: randomBuyerName,
      product: randomProduct,
      price: formattedPrice,
      timeAgo: randomTimeAgo,
    });
  }, [addNotification, selectedNiche, updateRevenue, updateProfit]);

  const pauseNotifications = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeNotifications = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Limitar o número de notificações mantidas no estado
  useEffect(() => {
    if (notifications.length > maxNotifications) {
      // Remover a notificação mais antiga
      const oldestNotification = [...notifications].sort((a, b) => a.timestamp - b.timestamp)[0];
      if (oldestNotification) {
        removeNotification(oldestNotification.id);
      }
    }
    
    // Remover notificações automaticamente após um tempo
    if (notifications.length > 0) {
      const latestNotification = notifications[notifications.length - 1];
      const timeout = setTimeout(() => {
        removeNotification(latestNotification.id);
      }, 5000); // Remover após 5 segundos
      
      return () => clearTimeout(timeout);
    }
  }, [notifications, maxNotifications, removeNotification]);

  // NOTIFICAÇÕES AUTOMÁTICAS REMOVIDAS - apenas notificações manuais via botão
  // O useEffect que gerava notificações automáticas foi removido completamente

  return {
    notifications,
    removeNotification,
    clearNotifications,
    pauseNotifications,
    resumeNotifications,
    generateRandomNotification,
    isPaused,
  };
} 