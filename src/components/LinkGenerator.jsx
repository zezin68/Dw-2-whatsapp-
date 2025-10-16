import { useState } from "react";
import { MessageCircle } from "lucide-react"; // Ícone para cabeçalho e botão
import CopyLink from "./CopyLink"; 
import styles from "./LinkGenerator.module.css"; 

const LinkGenerator = () => {
  // Estado para armazenar o número limpo (apenas números)
  const [phoneNumber, setPhoneNumber] = useState("");
  // Estado para armazenar o número formatado para exibição
  const [displayPhone, setDisplayPhone] = useState("");
  // Mensagem opcional para enviar junto com o link
  const [message, setMessage] = useState("");
  // Link gerado para WhatsApp
  const [linkDois, setLinkDois] = useState("");
  // Controla se o link gerado deve ser exibido
  const [mostarLink, setMostarLink] = useState(false);

  // Função para formatar o número enquanto o usuário digita
  const formatPhoneNumber = (value) => {
    const onlyNumbers = value.replace(/\D/g, "").slice(0, 11); // Remove não dígitos e limita a 11 números
    setPhoneNumber(onlyNumbers);

    let formatado = onlyNumbers;

    // Adiciona parênteses e espaço após o DDD
    if (formatado.length > 2) {
      formatado = `(${formatado.slice(0, 2)}) ${formatado.slice(2)}`;
    }
    // Adiciona hífen antes dos últimos 4 dígitos
    if (formatado.length > 9) {
      formatado = `${formatado.slice(0, 9)}-${formatado.slice(9)}`;
    }

    setDisplayPhone(formatado); // Atualiza o estado para exibir o telefone formatado
  };

  // Função para gerar o link do WhatsApp com número e mensagem opcionais
  const generateWhatsAppLink = () => {
    if (phoneNumber.length < 11) {
      alert("Insira 11 números"); // Validação mínima do número
      return;
    }
    const encodedMessage = encodeURIComponent(message); // Codifica mensagem para URL
    setLinkDois(
      `https://wa.me/55${phoneNumber}${
        message ? `?text=${encodedMessage}` : ""
      }`
    );
    setMostarLink(true); // Exibe o componente CopyLink com o link gerado
  };

  return (
    // Container principal do gerador de links
    <div className={styles["linkGenerator"]}>
      
      {/* Cabeçalho com ícone e título */}
      <div className={styles["linkGeneratorHeader"]}>
        <MessageCircle className={styles["linkGeneratorIcon"]} />
        <h2>Gerador de Links</h2>
      </div>

      {/* Formulário para entrada do número e mensagem */}
      <div className={styles["linkGeneratorForm"]}>
        
        {/* Campo para o número do WhatsApp */}
        <div className={styles["formGroup"]}>
          <label className={styles["formLabel"]}>Número do WhatsApp</label>
          <input
            type="text"
            value={displayPhone} // Exibe o telefone formatado
            onChange={(e) => formatPhoneNumber(e.target.value)} // Atualiza e formata ao digitar
            placeholder="(XX) XXXXX-XXXX"
            className={styles["formInput"]}
          />
        </div>

        {/* Campo para mensagem opcional */}
        <div className={styles["formGroup"]}>
          <label className={styles["formLabel"]}>Mensagem (opcional)</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)} // Atualiza mensagem
            placeholder="Digite sua mensagem aqui..."
            rows={4}
            className={styles["formTextarea"]}
          />
        </div>

        {/* Botão para gerar o link */}
        <button onClick={generateWhatsAppLink} className={styles["generateButton"]}>
          <MessageCircle className={styles["buttonIcon"]} />
          Preparar Mensagem
        </button>
      </div>

      {/* Exibe o componente CopyLink somente se o link foi gerado */}
      {mostarLink && <CopyLink linkDois={linkDois} />}
    </div>
  );
};

export default LinkGenerator;
