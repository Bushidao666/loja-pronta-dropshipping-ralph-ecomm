# Configuração de Variáveis de Ambiente

Para configurar corretamente o projeto, você precisa criar um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

## Variáveis Obrigatórias

```bash
# Configuração do Checkout da Kiwify
NEXT_PUBLIC_CHECKOUT_URL=https://pay.kiwify.com.br/FHihMEs

# Configuração do Facebook Pixel
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=3069810703343613
```

## Como criar o arquivo

1. Na raiz do projeto, crie um arquivo chamado `.env.local`
2. Copie e cole o conteúdo acima
3. Substitua os valores pelos seus próprios IDs/URLs se necessário

## O que cada variável faz

- **NEXT_PUBLIC_CHECKOUT_URL**: URL do checkout da Kiwify para onde o usuário será redirecionado
- **NEXT_PUBLIC_FACEBOOK_PIXEL_ID**: ID do seu pixel do Facebook para tracking

## Eventos do Facebook Pixel

O sistema dispara automaticamente os seguintes eventos:

- **PageView**: Quando a página carrega
- **ViewContent**: Disparado na etapa 21 do funil
- **InitiateCheckout**: Quando o modal de checkout é aberto (etapa 24)
- **Lead**: Quando o formulário de checkout é enviado

## Notas

- As variáveis com prefixo `NEXT_PUBLIC_` ficam disponíveis no client-side
- Se as variáveis não estiverem definidas, o sistema usará os valores padrão configurados em `src/lib/config.ts` 