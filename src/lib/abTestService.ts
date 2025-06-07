// Serviço de A/B Test invisível para checkout
// O usuário nunca saberá que está sendo testado

import { abTestConfig, validateABTestConfig, type CheckoutVariant } from './abTestConfig';
import { addABTestMetric } from './abTestAnalytics';

const AB_TEST_STORAGE_KEY = '_abt_variant';
const AB_TEST_SESSION_KEY = '_abt_session';

interface ABTestResult {
  variantId: string;
  checkoutUrl: string;
  isTest: boolean;
}

interface ABTestMetrics {
  variantId: string;
  timestamp: number;
  event: 'assigned' | 'checkout_initiated' | 'checkout_completed';
  sessionId: string;
  userAgent?: string;
  referrer?: string;
}

class ABTestService {
  private sessionId: string;

  constructor() {
    this.sessionId = this.getOrCreateSessionId();
    
    // Validar configuração na inicialização
    if (abTestConfig.enabled && !validateABTestConfig()) {
      console.error('[AB TEST] Configuração inválida! Desabilitando testes A/B.');
    }
  }

  /**
   * Obtém a URL de checkout apropriada para o usuário
   * Se A/B test estiver desabilitado, retorna a URL padrão
   */
  public getCheckoutUrl(): ABTestResult {
    if (!abTestConfig.enabled) {
      return {
        variantId: 'default',
        checkoutUrl: abTestConfig.variants[0]?.url || 'https://pay.kiwify.com.br/FHihMEs',
        isTest: false
      };
    }

    const variant = this.getUserVariant();
    
    // Registrar métrica de assignment (apenas uma vez por sessão)
    if (!this.hasAssignmentBeenTracked()) {
      this.trackEvent('assigned', variant.id);
      this.markAssignmentAsTracked();
    }

    return {
      variantId: variant.id,
      checkoutUrl: variant.url,
      isTest: true
    };
  }

  /**
   * Rastreia quando o checkout é iniciado
   */
  public trackCheckoutInitiated(): void {
    if (!abTestConfig.enabled || !abTestConfig.trackingEnabled) return;
    
    const variant = this.getUserVariant();
    this.trackEvent('checkout_initiated', variant.id);
  }

  /**
   * Rastreia quando o checkout é completado
   * Esta função deve ser chamada quando há confirmação de compra
   */
  public trackCheckoutCompleted(): void {
    if (!abTestConfig.enabled || !abTestConfig.trackingEnabled) return;
    
    const variant = this.getUserVariant();
    this.trackEvent('checkout_completed', variant.id);
  }

  /**
   * Obtém ou seleciona a variante para o usuário atual
   */
  private getUserVariant(): CheckoutVariant {
    // Se persistência está habilitada, tentar recuperar variante salva
    if (abTestConfig.persistVariant) {
      const savedVariantId = this.getSavedVariantId();
      if (savedVariantId) {
        const savedVariant = abTestConfig.variants.find(v => v.id === savedVariantId && v.active);
        if (savedVariant) {
          return savedVariant;
        }
      }
    }

    // Selecionar nova variante baseada nos pesos
    const selectedVariant = this.selectVariantByWeight();
    
    // Salvar para sessões futuras se persistência estiver habilitada
    if (abTestConfig.persistVariant) {
      this.saveVariantId(selectedVariant.id);
    }

    return selectedVariant;
  }

  /**
   * Seleciona uma variante baseada nos pesos configurados
   */
  private selectVariantByWeight(): CheckoutVariant {
    const activeVariants = abTestConfig.variants.filter(v => v.active);
    
    if (activeVariants.length === 0) {
      // Fallback para primeira variante se nenhuma estiver ativa
      return abTestConfig.variants[0];
    }

    if (activeVariants.length === 1) {
      return activeVariants[0];
    }

    // Usar hash do sessionId para garantir distribuição consistente
    const hash = this.hashCode(this.sessionId);
    const random = Math.abs(hash) % 100;
    
    let cumulativeWeight = 0;
    for (const variant of activeVariants) {
      cumulativeWeight += variant.weight;
      if (random < cumulativeWeight) {
        return variant;
      }
    }

    // Fallback
    return activeVariants[0];
  }

  /**
   * Gera um hash simples de uma string
   */
  private hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }

  /**
   * Obtém ou cria um ID de sessão único
   */
  private getOrCreateSessionId(): string {
    if (typeof window === 'undefined') return 'server';
    
    let sessionId = sessionStorage.getItem(AB_TEST_SESSION_KEY);
    if (!sessionId) {
      sessionId = 'abt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem(AB_TEST_SESSION_KEY, sessionId);
    }
    return sessionId;
  }

  /**
   * Salva o ID da variante selecionada
   */
  private saveVariantId(variantId: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(AB_TEST_STORAGE_KEY, variantId);
  }

  /**
   * Recupera o ID da variante salva
   */
  private getSavedVariantId(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(AB_TEST_STORAGE_KEY);
  }

  /**
   * Verifica se o assignment já foi rastreado nesta sessão
   */
  private hasAssignmentBeenTracked(): boolean {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(`${AB_TEST_SESSION_KEY}_assigned`) === 'true';
  }

  /**
   * Marca o assignment como rastreado
   */
  private markAssignmentAsTracked(): void {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(`${AB_TEST_SESSION_KEY}_assigned`, 'true');
  }

  /**
   * Registra eventos de métricas
   */
  private trackEvent(event: ABTestMetrics['event'], variantId: string): void {
    if (!abTestConfig.trackingEnabled) return;

    const metrics: ABTestMetrics = {
      variantId,
      timestamp: Date.now(),
      event,
      sessionId: this.sessionId,
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
      referrer: typeof window !== 'undefined' ? document.referrer || undefined : undefined
    };

    // Enviar métricas para console (apenas desenvolvimento)
    console.log('[AB TEST METRICS]', metrics);

    // Integrar com sistema de analytics
    addABTestMetric(metrics);
    
    // Integração adicional com Facebook Pixel
    this.sendMetricsToAnalytics(metrics);
  }

  /**
   * Envia métricas para sistemas de analytics
   */
  private sendMetricsToAnalytics(metrics: ABTestMetrics): void {
    // Integração com Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'ABTest', {
        variant_id: metrics.variantId,
        event_type: metrics.event,
        session_id: metrics.sessionId
      });
    }

    // Você pode adicionar outras integrações aqui:
    // Google Analytics, etc.
  }

  /**
   * Força uma nova seleção de variante (usado apenas para desenvolvimento/debug)
   */
  public forceNewVariant(): ABTestResult {
    if (typeof window === 'undefined') return this.getCheckoutUrl();
    
    // Limpar dados salvos
    localStorage.removeItem(AB_TEST_STORAGE_KEY);
    sessionStorage.removeItem(`${AB_TEST_SESSION_KEY}_assigned`);
    
    return this.getCheckoutUrl();
  }

  /**
   * Obtém informações da variante atual (para debug)
   */
  public getVariantInfo(): { variantId: string; variantName: string } | null {
    if (!abTestConfig.enabled) return null;
    
    const variant = this.getUserVariant();
    return {
      variantId: variant.id,
      variantName: variant.name
    };
  }
}

// Instância singleton
export const abTestService = new ABTestService(); 