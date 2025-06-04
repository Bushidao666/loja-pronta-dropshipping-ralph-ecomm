'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, CreditCard } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';
import useFunnelStore from '@/store/funnelStore';
import { config } from '@/lib/config';
import { fbPixelTrack } from '@/components/analytics/facebook-pixel';

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
  const hasTriggeredInitiateCheckout = useRef(false);

  // Carregar dados do store quando o modal abrir
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: userName || '',
        email: userEmail || '',
        phone: userPhone || '',
      });
      
      // Reset do flag quando o modal abrir
      hasTriggeredInitiateCheckout.current = false;
    }
  }, [isOpen, userName, userEmail, userPhone]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Salvar no store em tempo real
    switch (field) {
      case 'name':
        setUserName(value);
        break;
      case 'email':
        setUserEmail(value);
        break;
      case 'phone':
        setUserPhone(value);
        break;
    }
  };

  const formatPhone = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara (XX) XXXXX-XXXX
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
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

  // Disparar InitiateCheckout apenas quando o formulário ficar válido pela primeira vez
  useEffect(() => {
    if (isOpen && isFormValid() && !hasTriggeredInitiateCheckout.current) {
      console.log('Disparando InitiateCheckout - formulário válido');
      fbPixelTrack.initiateCheckout(97);
      hasTriggeredInitiateCheckout.current = true;
    }
  }, [isOpen, isFormValid]);

  const handleSubmit = () => {
    if (!isFormValid()) return;
    
    setIsSubmitting(true);
    
    // Disparar evento Lead quando o formulário é enviado
    fbPixelTrack.lead('Checkout Form Submitted');
    
    // Preparar dados para a URL da Kiwify
    const params = new URLSearchParams({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.replace(/\D/g, ''), // Enviar só números
      region: 'br'
    });
    
    // Usar a URL da variável de ambiente
    const checkoutUrl = `${config.checkoutUrl}?${params.toString()}`;
    
    // Pequeno delay para animação antes de redirecionar
    setTimeout(() => {
      window.location.href = checkoutUrl;
    }, 500);
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