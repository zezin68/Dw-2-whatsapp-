import { Trash2 } from "lucide-react";
import "./ContactItem.module.css";

const ContactItem = ({ contact, onEdit, onDelete, onMessage }) => {
  return (
    <div className={["contactItem"]}>
      <div className={["contactInfo"]}>
        <h3 className={["contactName"]}>{contact.nome}</h3>
      <p className={["contactPhone"]}>{contact.telefone}</p>
      </div>
      <div className={["contactActions"]}>
        <button
          onClick={() => onMessage(contact)}
          className={["actionButton messageButton"]}
        >
          Mensagem
        </button>
        <button
          onClick={() => onEdit(contact)}
          className={["actionButton editButton"]}
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(contact.id)}
          className={["actionButton deleteButton"]}
          title="Excluir"
        >
          <Trash2 className={["deleteIcon"]} />
        </button>
      </div>
    </div>
  );
};

export default ContactItem;
