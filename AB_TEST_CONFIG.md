# 🧪 Sistema de Teste A/B de Checkout - INVISÍVEL PARA USUÁRIO

**⚠️ IMPORTANTE: Este sistema é 100% invisível para o usuário final!**  
O usuário nunca saberá que está sendo testado. Apenas você, como desenvolvedor, tem acesso e controle.

## 🎯 Como Configurar o Teste A/B

### 1. Variáveis de Ambiente

Adicione essas variáveis no seu arquivo `.env.local`:

```env
# Ativar/Desativar teste A/B
NEXT_PUBLIC_AB_TEST_ENABLED=true

# URLs dos checkouts para teste
NEXT_PUBLIC_CHECKOUT_URL_A=https://pay.kiwify.com.br/FHihMEs
NEXT_PUBLIC_CHECKOUT_URL_B=https://pay.kiwify.com.br/checkout-variante-b
NEXT_PUBLIC_CHECKOUT_URL_C=https://pay.kiwify.com.br/checkout-variante-c

# Pesos de distribuição (devem somar 100%)
NEXT_PUBLIC_AB_WEIGHT_A=60
NEXT_PUBLIC_AB_WEIGHT_B=40
NEXT_PUBLIC_AB_WEIGHT_C=0

# Ativar/Desativar variantes individualmente
NEXT_PUBLIC_AB_ACTIVE_A=true
NEXT_PUBLIC_AB_ACTIVE_B=true
NEXT_PUBLIC_AB_ACTIVE_C=false
```

**💡 Dica:** Se os pesos não somarem 100%, o sistema normaliza automaticamente!  
Exemplo: Se configurar A=60, B=30, C=10 → Sistema ajusta para A=60%, B=30%, C=10%

### 2. Configuração Automática

**Agora tudo é configurado via variáveis de ambiente!** 🎉  
Não precisa mais editar código - apenas configure no `.env.local` e reinicie o servidor.

### 3. Como Funciona

#### ✅ Invisível para o Usuário
- O usuário nunca sabe que está sendo testado
- Redirecionamento automático baseado em algoritmos
- Mesma experiência visual para todos

#### ✅ Distribuição Inteligente
- Baseada em pesos configuráveis (deve somar 100%)
- Usuário sempre vê a mesma variante durante a sessão
- Distribuição consistente usando hash da sessão

#### ✅ Rastreamento Automático
- Métricas enviadas para Facebook Pixel automaticamente
- Console logs para debug (apenas no desenvolvimento)
- Eventos: `assigned`, `checkout_initiated`, `checkout_completed`

### 4. Monitoramento

#### No Console do Navegador (apenas desenvolvimento):
```
[AB TEST METRICS] {
  variantId: 'checkout_a',
  event: 'checkout_initiated',
  sessionId: 'abt_1234567890_abc123',
  timestamp: 1703123456789
}
```

#### No Facebook Pixel:
- Evento customizado `ABTest` é enviado automaticamente
- Dados incluem: variant_id, event_type, session_id

### 5. Comandos Úteis

#### Para testar diferentes variantes localmente:
```javascript
// No console do navegador
abTestService.forceNewVariant()
```

#### Para ver qual variante o usuário está vendo:
```javascript
// No console do navegador  
abTestService.getVariantInfo()
```

### 6. Estados do Sistema

#### ❌ Teste Desabilitado
- `NEXT_PUBLIC_AB_TEST_ENABLED=false` ou não definido
- Usa sempre o primeiro checkout configurado

#### ⚡ Teste Ativo
- `NEXT_PUBLIC_AB_TEST_ENABLED=true`
- Distribui tráfego automaticamente conforme configurado

### 7. Exemplos de Configuração

#### 🎯 Teste Simples A/B (50/50):
```env
NEXT_PUBLIC_AB_TEST_ENABLED=true
NEXT_PUBLIC_CHECKOUT_URL_A=https://pay.kiwify.com.br/FHihMEs
NEXT_PUBLIC_CHECKOUT_URL_B=https://pay.hotmart.com/checkout-b
NEXT_PUBLIC_AB_WEIGHT_A=50
NEXT_PUBLIC_AB_WEIGHT_B=50
NEXT_PUBLIC_AB_ACTIVE_A=true
NEXT_PUBLIC_AB_ACTIVE_B=true
```

#### 🎯 Teste A/B/C com Pesos Diferentes:
```env
NEXT_PUBLIC_AB_TEST_ENABLED=true
NEXT_PUBLIC_CHECKOUT_URL_A=https://pay.kiwify.com.br/FHihMEs
NEXT_PUBLIC_CHECKOUT_URL_B=https://pay.hotmart.com/checkout-b
NEXT_PUBLIC_CHECKOUT_URL_C=https://checkout.monetizze.com.br/pagamento
NEXT_PUBLIC_AB_WEIGHT_A=60
NEXT_PUBLIC_AB_WEIGHT_B=30
NEXT_PUBLIC_AB_WEIGHT_C=10
NEXT_PUBLIC_AB_ACTIVE_A=true
NEXT_PUBLIC_AB_ACTIVE_B=true
NEXT_PUBLIC_AB_ACTIVE_C=true
```

#### 🎯 Testes Graduais (Começar com 10% tráfego novo):
```env
NEXT_PUBLIC_AB_TEST_ENABLED=true
NEXT_PUBLIC_CHECKOUT_URL_A=https://pay.kiwify.com.br/FHihMEs
NEXT_PUBLIC_CHECKOUT_URL_B=https://pay.hotmart.com/checkout-novo
NEXT_PUBLIC_AB_WEIGHT_A=90
NEXT_PUBLIC_AB_WEIGHT_B=10
NEXT_PUBLIC_AB_ACTIVE_A=true
NEXT_PUBLIC_AB_ACTIVE_B=true
```

### 8. IMPORTANTE - Segurança

- ❌ **NUNCA** exponha esse sistema para o usuário final
- ❌ **NUNCA** crie interfaces administrativas acessíveis
- ✅ Configuração apenas via código/ambiente
- ✅ Sistema completamente invisível na interface

### 9. Analytics Integradas

O sistema já integra automaticamente com:
- ✅ Facebook Pixel (eventos customizados)
- ✅ Console logs (desenvolvimento)
- ⚠️ Para Google Analytics, adicione código em `sendMetricsToAnalytics()`

### 10. Troubleshooting

#### Teste não está funcionando:
1. Verifique se `NEXT_PUBLIC_AB_TEST_ENABLED=true`
2. Confirme que os pesos somam 100%
3. Verifique no console se há erros de configuração

#### Usuário sempre vê a mesma variante:
✅ **Isso é o comportamento correto!** O sistema persiste a variante por sessão para consistência.

#### Para forçar nova variante:
```javascript
localStorage.removeItem('_abt_variant');
sessionStorage.clear();
location.reload();
```

#### Para alterar configurações rapidamente:
```javascript
// 🔥 ATENÇÃO: Alterar .env.local requer restart do servidor Next.js
// Para testes rápidos, você pode alterar temporariamente no console:

// Ver configuração atual
console.log(abTestConfig.variants);

// Forçar distribuição específica (temporário - apenas para teste)
// NUNCA fazer isso em produção!
```

#### Restart do servidor após mudanças:
```bash
# Pare o servidor (Ctrl+C) e rode novamente:
npm run dev
```

### 11. Sistema de Analytics Integrado

#### Métricas Coletadas Automaticamente:
- ✅ **Atribuição de variante** - quando o usuário é designado para uma variante
- ✅ **Checkout iniciado** - quando o modal de checkout é aberto
- ✅ **Checkout completado** - quando a compra é finalizada (necessita implementação manual)

#### Comandos para Ver Métricas (Console do Dev):
```javascript
// Ver relatório completo
getABTestReport()

// Ver estatísticas por variante
getABTestStats()

// Ver informações da variante atual do usuário
abTestService.getVariantInfo()
```

#### Exemplo de Saída do Relatório:
```
=== RELATÓRIO A/B TEST ===
Total de métricas: 247

📊 Variante: checkout_a
   Atribuições: 125
   Checkouts iniciados: 89
   Checkouts completados: 12
   Taxa de iniciação: 71.20%
   Taxa de conversão: 9.60%

📊 Variante: checkout_b
   Atribuições: 122
   Checkouts iniciados: 95
   Checkouts completados: 18
   Taxa de iniciação: 77.87%
   Taxa de conversão: 14.75%
```

### 12. Integração com Sistemas Externos

#### Facebook Pixel (automático):
- Eventos enviados como `ABTestMetric`
- Dados incluem: variant_id, event_type, session_id, timestamp

#### Webhook Personalizado (opcional):
```env
# Adicionar no .env.local
NEXT_PUBLIC_AB_TEST_WEBHOOK_URL=https://sua-api.com/webhook/abtest
```

#### Google Analytics (manual):
Descomente as linhas no arquivo `src/lib/abTestAnalytics.ts`:
```typescript
if (typeof window !== 'undefined' && window.gtag) {
  window.gtag('event', 'ab_test_metric', {
    variant_id: metric.variantId,
    event_type: metric.event,
    session_id: metric.sessionId
  });
}
```

## 📁 Arquivos do Sistema A/B

### Arquivos Principais:
- `src/lib/abTestConfig.ts` - Configuração das variantes e pesos
- `src/lib/abTestService.ts` - Serviço principal que gerencia tudo
- `src/lib/abTestAnalytics.ts` - Sistema de métricas e analytics
- `src/hooks/useABTest.ts` - Hook para usar nos componentes
- `src/components/ui/checkout-modal.tsx` - Integração com o modal (já atualizado)

### Arquivos de Apoio:
- `AB_TEST_CONFIG.md` - Esta documentação
- `test-ab.js` - Arquivo de teste para desenvolvedores

### Como Funciona:
1. **Configuração**: Define variantes em `abTestConfig.ts`
2. **Distribuição**: `abTestService.ts` seleciona variante baseada em pesos
3. **Persistência**: Usuário vê sempre a mesma variante na sessão
4. **Rastreamento**: Métricas coletadas automaticamente em `abTestAnalytics.ts`
5. **Redirecionamento**: Modal usa URL da variante selecionada

## 🚀 Status da Implementação

### ✅ Implementado:
- [x] Sistema de distribuição por pesos configuráveis
- [x] Persistência de variante por usuário/sessão
- [x] Integração invisível com modal de checkout
- [x] Sistema de métricas e analytics
- [x] Integração com Facebook Pixel
- [x] Comandos de debug para desenvolvimento
- [x] Configuração via variáveis de ambiente
- [x] Documentação completa

### 🎯 Próximos Passos (opcional):
- [ ] Dashboard para visualizar métricas (apenas para admin)
- [ ] Integração com Google Analytics
- [ ] Webhook para sistemas externos
- [ ] Teste de significância estatística automático
- [ ] A/B test de elementos visuais (além de URLs)

## 🔒 Segurança e Privacidade

### ✅ Garantias:
- **Zero impacto visual** - Interface idêntica para todos
- **Dados locais** - Métricas armazenadas no navegador
- **Sem APIs expostas** - Nenhum endpoint público
- **Configuração isolada** - Apenas via código/ambiente
- **Logs apenas em dev** - Console limpo em produção

### ❌ O que NÃO foi exposto:
- Interfaces administrativas
- APIs públicas para métricas
- Botões ou controles visíveis
- Informações sobre o teste na UI
- Dados sensíveis nos logs de produção

---

**✨ Sistema completamente implementado e pronto para uso!**  
Configure as variáveis de ambiente e comece a testar diferentes checkouts de forma invisível. 