'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useFunnel } from '@/contexts/FunnelContext';

export default function EtapaDinamica() {
  const router = useRouter();
  const params = useParams();
  const { goToStep } = useFunnel();

  useEffect(() => {
    // Extrair o número da etapa do parâmetro da URL
    const etapaParam = params.etapa as string;
    if (etapaParam) {
      const match = etapaParam.match(/etapa-(\d+)/);
      if (match && match[1]) {
        const etapaNumero = parseInt(match[1], 10);
        
        // Redirecionar para a página específica da etapa
        if (etapaNumero >= 1 && etapaNumero <= 24) {
          router.replace(`/etapa-${etapaNumero}`);
          goToStep(etapaNumero);
        } else {
          // Redirecionar para a etapa 1 se a etapa não for válida
          router.replace('/etapa-1');
        }
      } else {
        // Redirecionar para a etapa 1 se o formato não for válido
        router.replace('/etapa-1');
      }
    }
  }, [params, router, goToStep]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse text-white text-xl">
          Carregando etapa...
        </div>
      </div>
    </div>
  );
} 