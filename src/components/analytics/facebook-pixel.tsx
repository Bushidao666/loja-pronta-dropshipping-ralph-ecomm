'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import Image from 'next/image';
import { config } from '@/lib/config';

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

interface FacebookPixelProps {
  pixelId?: string;
}

export function FacebookPixel({ pixelId = config.facebookPixelId }: FacebookPixelProps) {
  useEffect(() => {
    // Verificar se fbq já existe para evitar inicialização dupla
    if (typeof window !== 'undefined' && !window.fbq) {
      // Initialize Facebook Pixel usando o código original
      const initScript = () => {
        (window as any).fbq = (window as any).fbq || function(...args: any[]) {
          ((window as any).fbq.q = (window as any).fbq.q || []).push(args);
        };
        (window as any).fbq.loaded = true;
        (window as any).fbq.version = '2.0';
        (window as any).fbq.queue = [];
        
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://connect.facebook.net/en_US/fbevents.js';
        const firstScript = document.getElementsByTagName('script')[0];
        if (firstScript && firstScript.parentNode) {
          firstScript.parentNode.insertBefore(script, firstScript);
        }
      };

      initScript();
      (window as any).fbq('init', pixelId);
      (window as any).fbq('track', 'PageView');
    }
  }, [pixelId]);

  return (
    <>
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `,
        }}
      />
      
      {/* Noscript fallback */}
      <noscript>
        <Image 
          height={1} 
          width={1} 
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

// Funções utilitárias para eventos do Facebook Pixel
export const fbPixelTrack = {
  // Evento ViewContent - disparado na etapa 21
  viewContent: (contentName?: string, value?: number) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'ViewContent', {
        content_name: contentName || 'Loja Pronta Dropshipping',
        content_type: 'product',
        value: value || 97,
        currency: 'BRL'
      });
    }
  },

  // Evento InitiateCheckout - quando abre o modal de checkout
  initiateCheckout: (value?: number) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        value: value || 97,
        currency: 'BRL',
        content_name: 'Loja Pronta Dropshipping'
      });
    }
  },

  // Evento Lead - quando preenche o formulário
  lead: (contentName?: string) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: contentName || 'Checkout Form Loja Pronta'
      });
    }
  },

  // Evento customizado
  trackCustom: (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', eventName, parameters);
    }
  }
};
/* eslint-enable @typescript-eslint/no-explicit-any */ 