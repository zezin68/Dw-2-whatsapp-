import { MessageCircle, Clipboard } from "lucide-react";
import styles from "./CopyLink.module.css";

function CopyLink({ linkDois }) {
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
        <button
          className={styles["copy-button"]}
          onClick={() => navigator.clipboard.writeText(linkDois)}
        >
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
