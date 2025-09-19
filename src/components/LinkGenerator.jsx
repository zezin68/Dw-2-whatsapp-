import { useState } from "react";
import { MessageCircle } from "lucide-react";
import CopyLink from "./CopyLink";
import "./LinkGenerator.css";

const LinkGenerator = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [linkDois, setLinkDois] = useState("");
  const [mostarLink, setMostarLink] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    // Remover qualquer coisa que não seja número (conjunto específico)
    const onlyNumbers = value.replace(/\D/g, "");

    // Limitar a 11 números
    if (onlyNumbers.length <= 11) {
      setPhoneNumber(onlyNumbers);
    }
  };

  const generateWhatsAppLink = () => {
    if (phoneNumber.length < 11) {
      alert("Insira 11 caracteres");
      return;
    }
    const cleanPhone = phoneNumber.replace(/\D/g, "");
    const encodedMessage = encodeURIComponent(message);
    setLinkDois(
      `https://wa.me/55${cleanPhone}${message ? `?text=${encodedMessage}` : ""}`
    );
    setMostarLink(true);
  };

  return (
    <div className="link-generator">
      <div className="link-generator-header">
        <MessageCircle className="link-generator-icon" />
        <h2>Gerador de Links</h2>
      </div>

      <div className="link-generator-form">
        <div className="form-group">
          <label className="form-label">Número do WhatsApp</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => handleChange(e)}
            placeholder="Insira um número"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Mensagem (opcional)</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite sua mensagem aqui..."
            rows={4}
            className="form-textarea"
          />
        </div>

        <button onClick={generateWhatsAppLink} className="generate-button">
          <MessageCircle className="button-icon" />
          Preparar Mensagem
        </button>
      </div>

      {mostarLink && <CopyLink linkDois={linkDois} />}
    </div>
  );
};

export default LinkGenerator;
