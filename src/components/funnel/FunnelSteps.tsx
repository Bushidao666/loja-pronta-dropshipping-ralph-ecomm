'use client';

import { useFunnel } from '@/contexts/FunnelContext';
import { motion, AnimatePresence } from 'framer-motion';

// Componente para cada etapa
function EtapaContent({ step }: { step: number }) {
  switch (step) {
    case 1:
      return (
        <div className="space-y-4">
          <p className="text-xl text-white">Deixa eu acertar na mosca...</p>

          <div className="space-y-3 my-4">
            <p className="text-lg font-medium bg-black/30 p-3 rounded-lg border-l-4 border-green-500 text-white">
              <span className="bg-white/10 px-2 py-1 rounded mr-2">Você salvou 47 vídeos</span> de "como ganhar dinheiro online".
            </p>
            <p className="text-lg font-medium bg-black/30 p-3 rounded-lg border-l-4 border-green-500 text-white">
              <span className="bg-white/10 px-2 py-1 rounded mr-2">Seguiu 23 "gurus"</span> no Instagram.
            </p>
            <p className="text-lg font-medium bg-black/30 p-3 rounded-lg border-l-4 border-green-500 text-white">
              <span className="bg-white/10 px-2 py-1 rounded mr-2">E ainda está na estaca zero.</span>
            </p>
          </div>

          <p className="text-2xl font-bold mt-4 text-white">
            Sabe qual é a diferença entre você e quem já está vendendo?
          </p>
        </div>
      );

    case 2:
      return (
        <div className="space-y-4">
          <p className="text-2xl font-bold text-green-400">
            Eles pararam de "se preparar" e começaram.
          </p>

          <div className="space-y-5 my-4">
            <div className="space-y-2">
              <p className="text-lg text-white/70">Enquanto você pesquisa o "método perfeito"...</p>
              <p className="text-xl font-medium bg-black/30 p-3 rounded-lg border-l-4 border-green-500 text-white">
                <span className="bg-white/10 px-2 py-1 rounded mr-2">Eles estão recebendo notificação de venda no celular.</span>
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="text-lg text-white/70">Enquanto você "estuda" dropshipping...</p>
              <p className="text-xl font-medium bg-black/30 p-3 rounded-lg border-l-4 border-green-500 text-white">
                <span className="bg-white/10 px-2 py-1 rounded mr-2">Eles estão contando o dinheiro que ganhou hoje.</span>
              </p>
            </div>
          </div>

          <p className="text-2xl font-bold mt-4 text-white">
            Doloroso, né?
          </p>
        </div>
      );

    case 3:
      return (
        <div className="space-y-4">
          <p className="text-2xl font-bold text-white">
            Você sabe por que ainda não começou de verdade?
          </p>

          <p className="text-xl text-white">
            Porque no fundo, você tem <span className="font-bold text-green-400">medo de fracassar de novo</span>.
          </p>

          <div className="space-y-3 my-4">
            <p className="text-lg text-white">
              Você já tentou antes.
            </p>
            <p className="text-lg text-white">
              Gastou dinheiro.
            </p>
            <p className="text-lg text-white">
              Perdeu tempo.
            </p>
            <p className="text-lg font-bold bg-black/30 p-3 rounded-lg border-l-4 border-green-500 text-white">
              <span className="bg-white/10 px-2 py-1 rounded mr-2">E se sentiu um idiota.</span>
            </p>
          </div>
        </div>
      );

    case 4:
      return (
        <div className="space-y-4">
          <p className="text-xl font-bold text-white">
            Agora fica nessa:
          </p>

          <div className="space-y-3 my-4">
            <p className="text-lg italic bg-black/30 p-3 rounded-lg text-white">
              <span className="bg-white/10 px-2 py-1 rounded mr-2">"Vou estudar mais um pouco..."</span>
            </p>
            <p className="text-lg italic bg-black/30 p-3 rounded-lg text-white">
              <span className="bg-white/10 px-2 py-1 rounded mr-2">"Preciso me preparar melhor..."</span>
            </p>
            <p className="text-lg italic bg-black/30 p-3 rounded-lg text-white">
              <span className="bg-white/10 px-2 py-1 rounded mr-2">"Ainda não é a hora certa..."</span>
            </p>
          </div>

          <p className="text-2xl font-bold text-green-400 my-4">
            Mentira.
          </p>

          <p className="text-xl font-medium text-white mt-4">
            Você só está com medo de ser feito de trouxa novamente.
          </p>
        </div>
      );

    case 5:
      return (
        <div className="space-y-4">
          <p className="text-2xl font-bold text-white">
            Vou falar uma verdade que vai doer:
          </p>

          <p className="text-3xl font-bold text-green-400 my-6">
            Você está ficando para trás.
          </p>

          <div className="space-y-2">
            <p className="text-xl text-white">
              Aquele seu colega que começou dropshipping 3 meses atrás?
            </p>
            <p className="text-xl font-medium bg-black/30 p-3 rounded-lg border-l-4 border-green-500 text-white">
              <span className="bg-white/10 px-2 py-1 rounded mr-2">Já faturou mais que seu salário.</span>
            </p>
          </div>
        </div>
      );

    default:
      return (
        <div className="space-y-4">
          <p className="text-2xl font-bold text-white">
            Etapa {step} em construção...
          </p>
        </div>
      );
  }
}

// Função para obter o título de cada etapa
function getStepTitle(step: number): string {
  switch (step) {
    case 1:
      return 'Por Que Você Ainda Está "Se Preparando" Para Começar';
    case 2:
      return 'A Diferença Brutal Entre Você E Quem Vende';
    case 3:
      return 'A Verdade Que Ninguém Te Conta';
    case 4:
      return 'O Medo Que Te Paralisa';
    case 5:
      return 'PARE. Respire. E Aceite a Realidade Brutal.';
    default:
      return `Etapa ${step}`;
  }
}

export default function FunnelSteps() {
  const { currentStep } = useFunnel();

  return (
    <div className="flex flex-col w-full h-[calc(100vh-180px)] justify-between py-2 max-w-4xl mx-auto px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            <span dangerouslySetInnerHTML={{ 
              __html: getStepTitle(currentStep).replace(/[""]([^""]*)[""]/, '<span class="text-green-400">"$1"</span>')
            }} />
          </h1>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={`content-${currentStep}`}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.2 }}
          className="flex-grow flex flex-col justify-center py-4"
        >
          <EtapaContent step={currentStep} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 