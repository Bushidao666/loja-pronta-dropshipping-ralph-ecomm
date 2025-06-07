// Hook para usar o sistema de A/B test nos componentes
// USO APENAS INTERNO - NUNCA EXPOR PARA O USUÁRIO FINAL

import { useEffect, useState } from 'react';
import { abTestService } from '@/lib/abTestService';

interface UseABTestReturn {
  checkoutUrl: string;
  variantId: string;
  isTest: boolean;
  trackCheckoutInitiated: () => void;
  trackCheckoutCompleted: () => void;
}

/**
 * Hook para usar o sistema de A/B test
 * ATENÇÃO: Use apenas internamente, nunca exponha dados para o usuário
 */
export const useABTest = (): UseABTestReturn => {
  const [checkoutData, setCheckoutData] = useState(() => {
    // Obter dados iniciais do serviço
    const result = abTestService.getCheckoutUrl();
    return result;
  });

  useEffect(() => {
    // Atualizar dados se necessário (caso configuração mude dinamicamente)
    const result = abTestService.getCheckoutUrl();
    setCheckoutData(result);
  }, []);

  return {
    checkoutUrl: checkoutData.checkoutUrl,
    variantId: checkoutData.variantId,
    isTest: checkoutData.isTest,
    trackCheckoutInitiated: () => abTestService.trackCheckoutInitiated(),
    trackCheckoutCompleted: () => abTestService.trackCheckoutCompleted(),
  };
};

/**
 * Hook apenas para debug/desenvolvimento
 * Não usar em produção com usuários finais
 */
export const useABTestDebug = () => {
  const [variantInfo, setVariantInfo] = useState(() => 
    abTestService.getVariantInfo()
  );

  const forceNewVariant = () => {
    const result = abTestService.forceNewVariant();
    setVariantInfo(abTestService.getVariantInfo());
    return result;
  };

  return {
    variantInfo,
    forceNewVariant,
  };
}; 