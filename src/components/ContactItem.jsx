import { Trash2 } from "lucide-react";
import "./ContactItem.module.css";

const ContactItem = ({ contact, onEdit, onDelete, onMessage }) => {
  return (
    <div className="contact-item">
      <div className="contact-info">
        <h3 className="contact-name">{contact.nome}</h3>
        <p className="contact-phone">{contact.telefone}</p>
      </div>
      <div className="contact-actions">
        <button
          onClick={() => onMessage(contact)}
          className="action-button message-button"
        >
          Mensagem
        </button>
        <button
          onClick={() => onEdit(contact)}
          className="action-button edit-button"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(contact.id)}
          className="action-button delete-button"
          title="Excluir"
        >
          <Trash2 className="delete-icon" />
        </button>
      </div>
    </div>
  );
};

export default ContactItem;
