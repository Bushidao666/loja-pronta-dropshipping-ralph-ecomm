import { useCallback, useEffect, useState } from 'react';
import useFunnelStore from '@/store/funnelStore';

// Dados simulados para as notificações - nomes de gringos
const buyerNames = [
  'John M.',
  'Sarah K.',
  'Michael R.',
  'Emily S.',
  'David W.',
  'Jessica L.',
  'Robert H.',
  'Amanda T.',
  'Christopher B.',
  'Jennifer C.',
  'Daniel P.',
  'Laura F.',
  'Matthew G.',
  'Ashley N.',
  'James D.',
  'Nicole V.',
  'Andrew Z.',
  'Michelle A.',
  'Ryan J.',
  'Stephanie M.',
];

const products = {
  home: ['LED Lamp', 'Magnetic Organizer', 'Air Purifier', 'Ergonomic Chair', 'Non-Slip Mat'],
  electronics: ['Bluetooth Headphones', 'Portable Charger', 'Smartwatch', 'Mini Camera', 'Universal Adapter'],
  fashion: ['Crossbody Bag', 'Vintage Sunglasses', 'Minimalist Watch', 'Adjustable Necklace', 'Magnetic Bracelet'],
  pets: ['Auto Brush', 'Smart Feeder', 'Interactive Toy', 'Orthopedic Bed', 'GPS Collar'],
  beauty: ['Facial Massager', 'Vitamin C Serum', 'Hair Straightener', 'LED Mask', 'Portable Epilator'],
  fitness: ['Resistance Band', 'Ab Roller', 'Smart Bottle', 'Heart Monitor', 'Compression Socks'],
};

const prices = {
  USD: [39.90, 59.90, 79.90, 49.90, 89.90, 69.90, 129.90],
  EUR: [36.90, 54.90, 73.90, 45.90, 82.90, 63.90, 119.90]
};

const timeAgo = ['2 min ago', '5 min ago', '1 min ago', '4 min ago', '3 min ago', 'just now', '6 min ago'];

interface UseNotificationsOptions {
  maxNotifications?: number;
}

export default function useNotifications({
  maxNotifications = 15,
}: UseNotificationsOptions = {}) {
  const { notifications, addNotification, removeNotification, clearNotifications, selectedNiche, selectedCurrency, updateRevenue, updateProfit } = useFunnelStore();
  const [isPaused, setIsPaused] = useState(true); // Sempre pausado

  const generateRandomNotification = useCallback(() => {
    const randomBuyerName = buyerNames[Math.floor(Math.random() * buyerNames.length)];
    
    // Se um nicho foi selecionado, use produtos desse nicho, senão escolha aleatoriamente
    const productCategory = selectedNiche || Object.keys(products)[Math.floor(Math.random() * Object.keys(products).length)] as keyof typeof products;
    const productList = products[productCategory];
    const randomProduct = productList[Math.floor(Math.random() * productList.length)];
    
    // Usar moeda selecionada ou USD como padrão
    const currency = selectedCurrency || 'USD';
    const currencyPrices = prices[currency];
    const randomPriceIndex = Math.floor(Math.random() * currencyPrices.length);
    const randomPrice = currencyPrices[randomPriceIndex];
    
    // Formatar preço baseado na moeda
    const currencySymbol = currency === 'USD' ? '$' : '€';
    const formattedPrice = `${currencySymbol}${randomPrice.toFixed(2)}`;
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
      currency: currency,
    });
  }, [addNotification, selectedNiche, selectedCurrency, updateRevenue, updateProfit]);

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
      }, 3000); // Remover após 3 segundos
      
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