'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, CreditCard } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';
import useFunnelStore from '@/store/funnelStore';
import { config } from '@/lib/config';
// import { fbPixelTrack } from '@/components/analytics/facebook-pixel'; // fbPixelTrack.lead not used directly with eventID
import {
  sendInitiateCheckoutCAPIEvent,
  sendLeadCAPIEvent, // Added import
  type InitiateCheckoutPII,
  type LeadPII, // Added import
  generateUUID, // Added import for generating event IDs
  getUrlParameters // Added import for getting URL parameters
} from '@/lib/fb-capi-service';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { userName, userEmail, userPhone, setUserName, setUserEmail, setUserPhone } = useFunnelStore();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const hasTriggeredPixelInitiateCheckout = useRef(false); // No longer needed

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: userName || '',
        email: userEmail || '',
        phone: userPhone || '',
      });
      // hasTriggeredPixelInitiateCheckout.current = false; // No longer needed
    }
  }, [isOpen, userName, userEmail, userPhone]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    switch (field) {
      case 'name': setUserName(value); break;
      case 'email': setUserEmail(value); break;
      case 'phone': setUserPhone(value); break;
    }
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    if (numbers.length > 11) { 
        return numbers.slice(0, 11).replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    handleInputChange('phone', formatted);
  };

  const isFormValid = useCallback(() => {
    return formData.name.trim() && 
           formData.email.trim().includes('@') && 
           formData.phone.replace(/\D/g, '').length >= 10;
  }, [formData.name, formData.email, formData.phone]);

  // useEffect for PIXEL InitiateCheckout on form valid REMOVED
  // It will now be triggered on submit

  const handleSubmit = async () => {
    if (!isFormValid() || isSubmitting) return;
    
    setIsSubmitting(true);
    
    const nameParts = formData.name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || firstName;

    const piiPayload: LeadPII = { // Can be used for both Lead and InitiateCheckout PII
      em: [formData.email.trim()],
      fn: [firstName],
      ln: [lastName],
      ph: [formData.phone.replace(/\D/g, '')],
    };

    // --- InitiateCheckout Event (Pixel & CAPI) --- 
    const initiateCheckoutEventId = generateUUID();
    const productDetailsForPixelAndCAPI = {
      content_name: "Sistema Drop360° Global",
      content_ids: ['sistema-drop360-global-97'],
      content_type: "product" as const,
      value: 97,
      currency: "BRL",
      num_items: 1,
      contents: [{ id: 'sistema-drop360-global-97', quantity: 1, item_price: 97 }]
    };

    // Pixel InitiateCheckout
    if (typeof window !== 'undefined' && window.fbq) {
      console.log('[MODAL] Sending InitiateCheckout (PIXEL) on submit. Event ID:', initiateCheckoutEventId);
      window.fbq('track', 'InitiateCheckout', productDetailsForPixelAndCAPI, { eventID: initiateCheckoutEventId });
    }

    // CAPI InitiateCheckout
    try {
      console.log('[MODAL] Sending InitiateCheckout (CAPI) on submit. Event ID:', initiateCheckoutEventId);
      const capiInitiateCheckoutResponse = await sendInitiateCheckoutCAPIEvent(productDetailsForPixelAndCAPI, piiPayload, initiateCheckoutEventId);
      if (capiInitiateCheckoutResponse.success) {
        console.log('[MODAL] InitiateCheckout (CAPI) event sent successfully. FB Trace ID:', capiInitiateCheckoutResponse.fbtrace_id);
      } else {
        console.error('[MODAL] Failed to send InitiateCheckout (CAPI) event. Error:', capiInitiateCheckoutResponse.error);
      }
    } catch (error) {
      console.error('[MODAL] Error during CAPI InitiateCheckout dispatch:', error);
    }

    // --- Lead Event (Pixel & CAPI) ---
    const leadEventId = generateUUID();
    const leadContentName = 'Checkout Form Submitted';
    
    // Pixel Lead
    if (typeof window !== 'undefined' && window.fbq) {
      console.log('[MODAL] Sending Lead (PIXEL) on submit. Event ID:', leadEventId);
      window.fbq('track', 'Lead', { content_name: leadContentName }, { eventID: leadEventId });
    }

    // CAPI Lead
    const leadCustomDataCAPI = {
      content_name: leadContentName,
      content_category: "Form Submission", // Optional: add category for CAPI lead
      value: 0, // Leads typically have no immediate monetary value
      currency: "BRL"
    };
    try {
      console.log('[MODAL] Sending Lead (CAPI) on submit. Event ID:', leadEventId);
      const capiLeadResponse = await sendLeadCAPIEvent(leadCustomDataCAPI, piiPayload, leadEventId);
      if (capiLeadResponse.success) {
        console.log('[MODAL] Lead (CAPI) event sent successfully. FB Trace ID:', capiLeadResponse.fbtrace_id);
      } else {
        console.error('[MODAL] Failed to send Lead (CAPI) event. Error:', capiLeadResponse.error);
      }
    } catch (error) {
      console.error('[MODAL] Error during CAPI Lead dispatch:', error);
    }
    
    // --- Construct Kiwify Redirect URL with UTMs --- 
    const kiwifyParams = new URLSearchParams({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.replace(/\D/g, ''),
      region: 'br'
    });

    // Get current page UTMs and append them
    const currentPageParams = getUrlParameters();
    for (const key in currentPageParams) {
      if (key.startsWith('utm_')) {
        kiwifyParams.append(key, currentPageParams[key]);
      }
    }
    // Also append fbclid if present, as some platforms might use it as a general click ID
    if (currentPageParams.fbclid) {
        kiwifyParams.append('fbclid', currentPageParams.fbclid);
    }
    
    const checkoutUrl = `${config.checkoutUrl}?${kiwifyParams.toString()}`;
    console.log('[MODAL] Redirecting to Kiwify URL:', checkoutUrl);
    
    setTimeout(() => {
      window.location.href = checkoutUrl;
      // setIsSubmitting(false); // Consider if modal can be re-opened and re-submitted before redirect
    }, 1000); 
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-md bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão de fechar */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full mb-4">
                <CreditCard className="h-8 w-8 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Quase lá! 🎉
              </h2>
              <p className="text-white/70 text-sm">
                Preencha seus dados para finalizar a compra com segurança
              </p>
            </div>

            {/* Formulário */}
            <div className="space-y-4">
              {/* Nome */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Nome completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Seu nome completo"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
                  />
                </div>
              </div>

              {/* E-mail */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Telefone */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Telefone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Botão de finalizar */}
            <div className="mt-6">
              <Button
                onClick={handleSubmit}
                disabled={!isFormValid() || isSubmitting}
                className={cn(
                  "w-full py-3 text-white font-semibold rounded-lg transition-all",
                  isFormValid() && !isSubmitting
                    ? "bg-gradient-to-r from-green-500 to-emerald-400 hover:opacity-90 shadow-lg hover:shadow-green-500/25"
                    : "bg-white/10 cursor-not-allowed opacity-50"
                )}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Redirecionando...
                  </div>
                ) : (
                  "FINALIZAR COMPRA POR R$97 →"
                )}
              </Button>
            </div>

            {/* Segurança */}
            <div className="mt-4 text-center">
              <p className="text-xs text-white/50">
                🔒 Seus dados estão protegidos e seguros
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 