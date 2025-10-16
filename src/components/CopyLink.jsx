import { MessageCircle, Copy } from "lucide-react"; // Ícones para botão de mensagem e cópia
import { useState } from "react";
import styles from "./CopyLink.module.css"; 

function CopyLink({ linkDois }) {
  // Estado para controlar feedback visual de link copiado
  const [linkCopiado, setLinkCopiado] = useState(false);

  // Função para copiar o link para a área de transferência
  const copiarLink = () => {
    navigator.clipboard.writeText(linkDois); // Copia o link
    setLinkCopiado(true); // Ativa mensagem de sucesso

    // Desativa a mensagem após 1 segundo
    setTimeout(() => {
      console.log("Link copiado");
      setLinkCopiado(false);
    }, 1000);
  };

  return (
    // Container geral do componente
    <div className={styles["link-container"]}>
      
      {/* Label explicativa do link gerado */}
      <label className={styles["formLabel"]}>Link gerado:</label>

      {/* Caixa que mostra o link e botão para copiar */}
      <div className={styles["link-box"]}>
        
        <span className={styles["link-input"]}>{linkDois} </span>

        {/* Botão que copia o link ao ser clicado */}
        <button
          title="Copiar link"
          className={styles["copy-button"]}
          onClick={copiarLink}
        >
          {/* Mensagem visual temporária de confirmação */}
          {linkCopiado && (
            <p className={styles["link-copiado"]}>Link copiado!</p>
          )}

          {/* Ícone de copiar */}
          <Copy />
        </button>
      </div>

      {/* Botão para abrir o link no WhatsApp em nova aba */}
      <button
        onClick={() => window.open(linkDois, "_blank")}
        className={styles["whatsapp-button"]}
      >
        {/* Ícone de mensagem */}
        <MessageCircle className={styles["button-icon"]} />
        Abrir WhatsApp
      </button>
    </div>
  );
}

export default CopyLink;

