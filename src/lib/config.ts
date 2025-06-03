// Configuration file for environment variables
export const config = {
  // Checkout Configuration
  checkoutUrl: process.env.NEXT_PUBLIC_CHECKOUT_URL || 'https://pay.kiwify.com.br/FHihMEs',
  
  // Facebook Pixel Configuration
  facebookPixelId: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '3069810703343613',
} as const; 