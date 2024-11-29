import axios from 'axios';

type WhatsAppMessage = {
  phone: string;
  userType: 'contador' | 'cliente' | 'funcionario';
  name: string;
};

export const sendWelcomeWhatsApp = async ({ phone, userType, name }: WhatsAppMessage) => {
  // Skip WhatsApp sending in development environment
  if (process.env.NODE_ENV === 'development') {
    console.log('WhatsApp message would be sent in production:', {
      phone,
      userType,
      name
    });
    return true;
  }

  try {
    // Remove caracteres não numéricos do telefone
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Adiciona 55 se não começar com ele
    const formattedPhone = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;

    if (formattedPhone.length < 12 || formattedPhone.length > 13) {
      console.warn('Invalid phone number:', phone);
      return false;
    }

    const message = `Olá ${name}! Seja bem-vindo ao Sistema de Ponto Eletrônico como ${userType}. Em breve você receberá um email com suas credenciais de acesso.`;

    const response = await axios.post(
      'https://apievolution.arllo.io/message/sendText/556196942713',
      {
        number: formattedPhone,
        text: message
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'apikey': '8bb01f121c871ad392c360f39fc509d7'
        },
        timeout: 10000 // 10 segundos de timeout
      }
    );

    return response.status === 200;
  } catch (error) {
    // Log error but don't throw
    console.warn('WhatsApp message sending failed:', error);
    return false;
  }
};