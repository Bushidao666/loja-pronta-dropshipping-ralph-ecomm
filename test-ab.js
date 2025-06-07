// ARQUIVO DE TESTE - APENAS PARA DESENVOLVEDOR
// Execute no console do navegador para testar o sistema A/B
// NUNCA expor isso para usuários finais!

console.log('🧪 INICIANDO TESTE DO SISTEMA A/B');

// Simular múltiplos usuários testando o sistema
function simularUsuarios(quantidade = 10) {
  console.log(`\n📊 Simulando ${quantidade} usuários...`);
  
  const resultados = [];
  
  for (let i = 0; i < quantidade; i++) {
    // Limpar session para simular novo usuário
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('_abt_session');
      sessionStorage.removeItem('_abt_session_assigned');
    }
    
    // Obter variante para o "usuário"
    const checkout = abTestService.getCheckoutUrl();
    resultados.push(checkout);
    
    console.log(`Usuário ${i + 1}: ${checkout.variantId} -> ${checkout.checkoutUrl}`);
  }
  
  // Estatísticas da simulação
  const stats = resultados.reduce((acc, result) => {
    acc[result.variantId] = (acc[result.variantId] || 0) + 1;
    return acc;
  }, {});
  
  console.log('\n📈 Distribuição simulada:');
  Object.entries(stats).forEach(([variant, count]) => {
    const percentage = ((count / quantidade) * 100).toFixed(1);
    console.log(`${variant}: ${count} usuários (${percentage}%)`);
  });
  
  return stats;
}

// Simular funil completo
function simularFunilCompleto() {
  console.log('\n🎯 Simulando funil completo...');
  
  // 1. Usuário chega na página
  const checkout = abTestService.getCheckoutUrl();
  console.log(`1. Usuário atribuído à variante: ${checkout.variantId}`);
  
  // 2. Usuário clica no checkout
  abTestService.trackCheckoutInitiated();
  console.log(`2. Checkout iniciado para variante: ${checkout.variantId}`);
  
  // 3. Simular conversão (50% chance)
  if (Math.random() > 0.5) {
    abTestService.trackCheckoutCompleted();
    console.log(`3. ✅ Checkout completado para variante: ${checkout.variantId}`);
  } else {
    console.log(`3. ❌ Checkout abandonado para variante: ${checkout.variantId}`);
  }
  
  return checkout;
}

// Mostrar estado atual do sistema
function mostrarEstadoAtual() {
  console.log('\n📋 ESTADO ATUAL DO SISTEMA');
  console.log('================================');
  
  // Verificar se está habilitado
  const checkout = abTestService.getCheckoutUrl();
  console.log(`Sistema A/B ativo: ${checkout.isTest ? '✅ SIM' : '❌ NÃO'}`);
  console.log(`Variante atual: ${checkout.variantId}`);
  console.log(`URL atual: ${checkout.checkoutUrl}`);
  
  // Informações da variante
  const variantInfo = abTestService.getVariantInfo();
  if (variantInfo) {
    console.log(`Nome da variante: ${variantInfo.variantName}`);
  }
  
  // Mostrar configuração completa
  console.log('\n⚙️ Configuração de Variantes:');
  abTestConfig.variants.forEach(variant => {
    console.log(`${variant.id}: ${variant.weight}% (${variant.active ? 'Ativa' : 'Inativa'}) -> ${variant.url}`);
  });
  
  // Estatísticas se houver
  try {
    const stats = getABTestStats();
    if (stats.length > 0) {
      console.log('\n📊 Estatísticas:');
      stats.forEach(stat => {
        console.log(`${stat.variantId}: ${stat.assignments} atribuições, ${stat.conversionRate.toFixed(2)}% conversão`);
      });
    }
  } catch (e) {
    console.log('Nenhuma estatística disponível ainda');
  }
}

// Comandos disponíveis
console.log('\n🛠 COMANDOS DISPONÍVEIS:');
console.log('simularUsuarios(10) - Simula 10 usuários');
console.log('simularFunilCompleto() - Simula um funil completo');
console.log('mostrarEstadoAtual() - Mostra estado do sistema');
console.log('abTestService.forceNewVariant() - Força nova variante');
console.log('getABTestReport() - Relatório completo');
console.log('abTestConfig.variants - Ver configuração de variantes');
console.log('validateABTestConfig() - Validar configuração atual');

// Mostrar estado inicial
mostrarEstadoAtual(); 