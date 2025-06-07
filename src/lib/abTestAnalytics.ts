// Sistema de Analytics para A/B Test - INTERNO APENAS
// Coleta e analisa métricas dos testes de forma invisível

interface ABTestMetrics {
  variantId: string;
  timestamp: number;
  event: 'assigned' | 'checkout_initiated' | 'checkout_completed';
  sessionId: string;
  userAgent?: string;
  referrer?: string;
}

interface VariantStats {
  variantId: string;
  assignments: number;
  checkoutInitiated: number;
  checkoutCompleted: number;
  conversionRate: number;
  initiationRate: number;
}

class ABTestAnalytics {
  private metrics: ABTestMetrics[] = [];
  private readonly STORAGE_KEY = '_abt_metrics';
  private readonly MAX_STORED_METRICS = 1000; // Limite para evitar storage overflow

  constructor() {
    this.loadStoredMetrics();
  }

  /**
   * Adiciona uma nova métrica
   */
  public addMetric(metric: ABTestMetrics): void {
    this.metrics.push(metric);
    
    // Manter apenas as métricas mais recentes
    if (this.metrics.length > this.MAX_STORED_METRICS) {
      this.metrics = this.metrics.slice(-this.MAX_STORED_METRICS);
    }
    
    this.saveMetrics();
    this.sendToExternalAnalytics(metric);
  }

  /**
   * Obtém estatísticas por variante
   */
  public getVariantStats(): VariantStats[] {
    const variantGroups = this.groupMetricsByVariant();
    
    return Object.entries(variantGroups).map(([variantId, metrics]) => {
      const assignments = metrics.filter(m => m.event === 'assigned').length;
      const checkoutInitiated = metrics.filter(m => m.event === 'checkout_initiated').length;
      const checkoutCompleted = metrics.filter(m => m.event === 'checkout_completed').length;
      
      return {
        variantId,
        assignments,
        checkoutInitiated,
        checkoutCompleted,
        conversionRate: assignments > 0 ? (checkoutCompleted / assignments) * 100 : 0,
        initiationRate: assignments > 0 ? (checkoutInitiated / assignments) * 100 : 0,
      };
    });
  }

  /**
   * Obtém métricas dos últimos N dias
   */
  public getMetricsFromLastDays(days: number): ABTestMetrics[] {
    const cutoffTime = Date.now() - (days * 24 * 60 * 60 * 1000);
    return this.metrics.filter(metric => metric.timestamp >= cutoffTime);
  }

  /**
   * Gera relatório simples (apenas para desenvolvimento)
   */
  public generateReport(): string {
    const stats = this.getVariantStats();
    const totalMetrics = this.metrics.length;
    
    let report = `\n=== RELATÓRIO A/B TEST ===\n`;
    report += `Total de métricas: ${totalMetrics}\n\n`;
    
    stats.forEach(stat => {
      report += `📊 Variante: ${stat.variantId}\n`;
      report += `   Atribuições: ${stat.assignments}\n`;
      report += `   Checkouts iniciados: ${stat.checkoutInitiated}\n`;
      report += `   Checkouts completados: ${stat.checkoutCompleted}\n`;
      report += `   Taxa de iniciação: ${stat.initiationRate.toFixed(2)}%\n`;
      report += `   Taxa de conversão: ${stat.conversionRate.toFixed(2)}%\n\n`;
    });
    
    return report;
  }

  /**
   * Limpa todas as métricas (usar com cuidado)
   */
  public clearMetrics(): void {
    this.metrics = [];
    this.saveMetrics();
  }

  /**
   * Agrupa métricas por variante
   */
  private groupMetricsByVariant(): Record<string, ABTestMetrics[]> {
    return this.metrics.reduce((groups, metric) => {
      if (!groups[metric.variantId]) {
        groups[metric.variantId] = [];
      }
      groups[metric.variantId].push(metric);
      return groups;
    }, {} as Record<string, ABTestMetrics[]>);
  }

  /**
   * Salva métricas no localStorage
   */
  private saveMetrics(): void {
    if (typeof window === 'undefined') return;
    
    try {
      const data = {
        metrics: this.metrics,
        lastUpdated: Date.now()
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.warn('[AB TEST ANALYTICS] Erro ao salvar métricas:', error);
    }
  }

  /**
   * Carrega métricas do localStorage
   */
  private loadStoredMetrics(): void {
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        this.metrics = data.metrics || [];
      }
    } catch (error) {
      console.warn('[AB TEST ANALYTICS] Erro ao carregar métricas:', error);
      this.metrics = [];
    }
  }

  /**
   * Envia métricas para sistemas externos
   */
  private sendToExternalAnalytics(metric: ABTestMetrics): void {
    // Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'ABTestMetric', {
        variant_id: metric.variantId,
        event_type: metric.event,
        session_id: metric.sessionId,
        timestamp: metric.timestamp
      });
    }

    // Google Analytics (exemplo - descomente e configure se usar)
    // if (typeof window !== 'undefined' && window.gtag) {
    //   window.gtag('event', 'ab_test_metric', {
    //     variant_id: metric.variantId,
    //     event_type: metric.event,
    //     session_id: metric.sessionId
    //   });
    // }

    // Webhook personalizado (exemplo)
    // this.sendToWebhook(metric);
  }

  /**
   * Envia para webhook personalizado (opcional)
   */
  private async sendToWebhook(metric: ABTestMetrics): Promise<void> {
    const webhookUrl = process.env.NEXT_PUBLIC_AB_TEST_WEBHOOK_URL;
    if (!webhookUrl) return;

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metric),
      });
    } catch (error) {
      console.warn('[AB TEST ANALYTICS] Erro ao enviar para webhook:', error);
    }
  }
}

// Instância singleton
export const abTestAnalytics = new ABTestAnalytics();

// Função para uso interno/debug (não expor para usuários)
export const getABTestReport = (): string => {
  return abTestAnalytics.generateReport();
};

// Função para adicionar métrica (usada pelo serviço principal)
export const addABTestMetric = (metric: ABTestMetrics): void => {
  abTestAnalytics.addMetric(metric);
};

// Função para obter estatísticas (uso interno)
export const getABTestStats = (): VariantStats[] => {
  return abTestAnalytics.getVariantStats();
}; 