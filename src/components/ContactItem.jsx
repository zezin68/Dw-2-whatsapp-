import { Trash2 } from "lucide-react"; // Ícone de lixeira para o botão de excluir
import styles from "./ContactItem.module.css";

const ContactItem = ({ contact, onEdit, onDelete, onMessage }) => {
  return (
    // Container principal do item de contato
    <div className={styles["contactItem"]}>
      {/* Seção com as informações do contato */}
      <div className={styles["contactInfo"]}>
        <h3 className={styles["contactName"]}>{contact.nome}</h3>
        <p className={styles["contactPhone"]}>{contact.telefone}</p>
      </div>

      <div className={styles["contactActions"]}>
        {/* Botão para enviar mensagem, dispara função onMessage passando o contato */}
        <button
          onClick={() => onMessage(contact)}
          className={`${styles["actionButton"]} ${styles["messageButton"]}`}
        >
          Mensagem
        </button>

        {/* Botão para editar contato, dispara função onEdit com o contato */}
        <button
          onClick={() => onEdit(contact)}
          className={`${styles["actionButton"]} ${styles["editButton"]}`}
        >
          Editar
        </button>

        {/* Botão para excluir contato, dispara função onDelete com o ID do contato */}
        <button
          onClick={() => onDelete(contact.id)}
          className={`${styles["actionButton"]} ${styles["deleteButton"]}`}
          // Quando você deixa o scroll parado em cima do ícone, aparece "excluir"
          title="Excluir"
        >
          {/* Ícone de lixeira */}
          <Trash2 className={styles["deleteIcon"]} />
        </button>
      </div>
    </div>
  );
};

export default ContactItem;
