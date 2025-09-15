import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import './LinkGenerator.css';

const LinkGenerator = () => {
  const [phoneNumber, setPhoneNumber] = useState('45464');
  const [message, setMessage] = useState('');

  const generateWhatsAppLink = () => {
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    const link = `https://wa.me/55${cleanPhone}${message ? `?text=${encodedMessage}` : ''}`;
    window.open(link, '_blank');
  };

  return (
    <div className="link-generator">
      <div className="link-generator-header">
        <MessageCircle className="link-generator-icon" />
        <h2>Gerador de Links</h2>
      </div>
      
      <div className="link-generator-form">
        <div className="form-group">
          <label className="form-label">
            Número do WhatsApp
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="45464"
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">
            Mensagem (opcional)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite sua mensagem aqui..."
            rows={4}
            className="form-textarea"
          />
        </div>
        
        <button
          onClick={generateWhatsAppLink}
          className="generate-button"
        >
          <MessageCircle className="button-icon" />
          Preparar Mensagem
        </button>
      </div>
    </div>
  );
};

export default LinkGenerator;