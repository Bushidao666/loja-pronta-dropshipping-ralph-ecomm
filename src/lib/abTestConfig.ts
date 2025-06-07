// Configuração de teste A/B para checkouts - APENAS PARA DESENVOLVEDOR
// O usuário final nunca verá essa configuração

export interface CheckoutVariant {
  id: string;
  name: string; // Nome interno para identificação
  url: string;
  weight: number; // Peso da distribuição (0-100)
  active: boolean;
}

export interface ABTestConfig {
  enabled: boolean;
  variants: CheckoutVariant[];
  // Configurações de tracking
  trackingEnabled: boolean;
  // Persistir variante por sessão do usuário
  persistVariant: boolean;
}

// Função para obter peso de variável de ambiente ou valor padrão
const getVariantWeight = (envKey: string, defaultWeight: number): number => {
  const envValue = process.env[envKey];
  if (!envValue) return defaultWeight;
  
  const weight = parseInt(envValue, 10);
  return isNaN(weight) ? defaultWeight : Math.max(0, Math.min(100, weight));
};

// Função para verificar se variante está ativa via ENV
const isVariantActive = (envKey: string, defaultActive: boolean): boolean => {
  const envValue = process.env[envKey];
  if (!envValue) return defaultActive;
  
  return envValue.toLowerCase() === 'true';
};

// Configuração principal do teste A/B
export const abTestConfig: ABTestConfig = {
  enabled: process.env.NEXT_PUBLIC_AB_TEST_ENABLED === 'true',
  trackingEnabled: true,
  persistVariant: true, // Usuário verá sempre a mesma variante durante a sessão
  
  variants: [
    {
      id: 'checkout_a',
      name: 'Checkout Original',
      url: process.env.NEXT_PUBLIC_CHECKOUT_URL_A || 'https://pay.kiwify.com.br/FHihMEs',
      weight: getVariantWeight('NEXT_PUBLIC_AB_WEIGHT_A', 50),
      active: isVariantActive('NEXT_PUBLIC_AB_ACTIVE_A', true)
    },
    {
      id: 'checkout_b', 
      name: 'Checkout Variante B',
      url: process.env.NEXT_PUBLIC_CHECKOUT_URL_B || 'https://pay.kiwify.com.br/checkout-b',
      weight: getVariantWeight('NEXT_PUBLIC_AB_WEIGHT_B', 50),
      active: isVariantActive('NEXT_PUBLIC_AB_ACTIVE_B', true)
    },
    {
      id: 'checkout_c',
      name: 'Checkout Variante C', 
      url: process.env.NEXT_PUBLIC_CHECKOUT_URL_C || 'https://pay.kiwify.com.br/checkout-c',
      weight: getVariantWeight('NEXT_PUBLIC_AB_WEIGHT_C', 0),
      active: isVariantActive('NEXT_PUBLIC_AB_ACTIVE_C', false)
    }
    // Adicione mais variantes conforme necessário seguindo o padrão:
    // NEXT_PUBLIC_CHECKOUT_URL_D, NEXT_PUBLIC_AB_WEIGHT_D, NEXT_PUBLIC_AB_ACTIVE_D
  ]
};

// Função para normalizar pesos automaticamente
const normalizeWeights = (variants: CheckoutVariant[]): CheckoutVariant[] => {
  const activeVariants = variants.filter(v => v.active);
  
  if (activeVariants.length === 0) return variants;
  
  const totalWeight = activeVariants.reduce((sum, variant) => sum + variant.weight, 0);
  
  // Se total é 0, distribuir igualmente
  if (totalWeight === 0) {
    const equalWeight = Math.floor(100 / activeVariants.length);
    let remainder = 100 - (equalWeight * activeVariants.length);
    
    return variants.map(variant => {
      if (!variant.active) return variant;
      
      const weight = equalWeight + (remainder > 0 ? 1 : 0);
      if (remainder > 0) remainder--;
      
      return { ...variant, weight };
    });
  }
  
  // Se total não é 100, normalizar proporcionalmente
  if (totalWeight !== 100) {
    console.warn(`[AB TEST] Normalizando pesos. Total atual: ${totalWeight}% -> 100%`);
    
    return variants.map(variant => {
      if (!variant.active) return variant;
      
      const normalizedWeight = Math.round((variant.weight / totalWeight) * 100);
      return { ...variant, weight: normalizedWeight };
    });
  }
  
  return variants;
};

// Aplicar normalização na configuração
abTestConfig.variants = normalizeWeights(abTestConfig.variants);

// Função para validar a configuração
export const validateABTestConfig = (): boolean => {
  if (!abTestConfig.enabled) return true;
  
  const activeVariants = abTestConfig.variants.filter(v => v.active);
  const totalWeight = activeVariants.reduce((sum, variant) => sum + variant.weight, 0);
  
  if (totalWeight !== 100) {
    console.warn('[AB TEST] Aviso: Pesos das variantes não somam 100%. Total:', totalWeight);
    return false;
  }
  
  return true;
}; 