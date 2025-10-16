import { Trash2 } from "lucide-react";
import styles from "./ContactItem.module.css";

const ContactItem = ({ contact, onEdit, onDelete, onMessage }) => {
  return (
    <div className={styles["contactItem"]}>
      <div className={styles["contactInfo"]}>
        <h3 className={styles["contactName"]}>{contact.nome}</h3>
        <p className={styles["contactPhone"]}>{contact.telefone}</p>
      </div>
      <div className={styles["contactActions"]}>
        <button
          onClick={() => onMessage(contact)}
          className={`${styles["actionButton"]} ${styles["messageButton"]}`}
        >
          Mensagem
        </button>
        <button
          onClick={() => onEdit(contact)}
          className={`${styles["actionButton"]} ${styles["editButton"]}`}
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(contact.id)}
          className={`${styles["actionButton"]} ${styles["deleteButton"]}`}
          title="Excluir"
        >
          <Trash2 className={styles["deleteIcon"]} />
        </button>
      </div>
    </div>
  );
};

export default ContactItem;