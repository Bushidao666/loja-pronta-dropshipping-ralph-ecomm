// Configuration file for environment variables
export const config = {
  // Checkout Configuration - URL base (será substituída pelo A/B test quando ativo)
  checkoutUrl: process.env.NEXT_PUBLIC_CHECKOUT_URL || 'https://pay.kiwify.com.br/FHihMEs',
  
  // Facebook Pixel Configuration
  facebookPixelId: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '3069810703343613',
} as const; 