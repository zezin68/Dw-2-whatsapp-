import { useState } from "react";
import { MessageCircle } from "lucide-react";
import CopyLink from "./CopyLink";
import "./LinkGenerator.css";

const LinkGenerator = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [displayPhone, setDisplayPhone] = useState("");
  const [message, setMessage] = useState("");
  const [linkDois, setLinkDois] = useState("");
  const [mostarLink, setMostarLink] = useState(false);

  const formatPhoneNumber = (value) => {
    const onlyNumbers = value.replace(/\D/g, "").slice(0, 11);
    setPhoneNumber(onlyNumbers);

    let formatado = onlyNumbers;

    if (formatado.length > 2) {
      formatado = `(${formatado.slice(0, 2)}) ${formatado.slice(2)}`;
    }
    if (formatado.length > 9) {
      formatado = `${formatado.slice(0, 9)}-${formatado.slice(9)}`;
    }

    setDisplayPhone(formatado);
  };

  const generateWhatsAppLink = () => {
    if (phoneNumber.length < 11) {
      alert("Insira 11 números");
      return;
    }
    const encodedMessage = encodeURIComponent(message);
    setLinkDois(
      `https://wa.me/55${phoneNumber}${
        message ? `?text=${encodedMessage}` : ""
      }`
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
            value={displayPhone}
            onChange={(e) => formatPhoneNumber(e.target.value)}
            placeholder="(XX) XXXXX-XXXX"
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
