import { MessageCircle, Clipboard, FastForward } from "lucide-react";
import { useState } from "react";
import styles from "./CopyLink.module.css";

function CopyLink({ linkDois }) {
  const [linkCopiado, setLinkCopiado] = useState(false);

  const copiarLink = () => {
    navigator.clipboard.writeText(linkDois);
    setLinkCopiado(true);
    setTimeout(() => {
      console.log("Link copiado");
      setLinkCopiado(false);
    }, 1000);
  };
  return (
    <div className={styles["link-container"]}>
      <label className={styles["formLabel"]}>Link gerado:</label>
      <div className={styles["link-box"]}>
        <input
          type="text"
          value={linkDois}
          readOnly
          className={styles["link-input"]}
        />
        <button className={styles["copy-button"]} onClick={copiarLink}>
          {linkCopiado && (
            <p className={styles["link-copiado"]}>Link copiado!</p>
          )}
          <Clipboard />
        </button>
      </div>

      <button
        onClick={() => window.open(linkDois, "_blank")}
        className={styles["whatsapp-button"]}
      >
        <MessageCircle className={styles["button-icon"]} />
        Abrir WhatsApp
      </button>
    </div>
  );
}

export default CopyLink;
