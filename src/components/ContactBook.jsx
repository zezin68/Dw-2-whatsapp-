import { useState } from "react";
import { Users, Plus } from "lucide-react";
import ContactItem from "./ContactItem";
import ContactForm from "./ContactForm";
import ContactFormAdd from "./ContactFormAdd";
import styles from "./ContactBook.module.css";
import { useContatos } from "../Context";

const ContactBook = () => {
  const { contatos, setContatos } = useContatos();
  const { atualizarContatos } = useContatos();

  const [newContact, setNewContact] = useState({
    nome: "",
    telefone: "",
    id: "",
  });
  const [editingContact, setEditingContact] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showFormAdd, setShowFormAdd] = useState(false);

  const handleSaveContact = async () => {
    if (!newContact.nome || !newContact.telefone) return;
    if (newContact.telefone.length < 11) {
      alert("Insira 11 números");
      return;
    }

    if (editingContact) {
      await atualizarContatos(contact.id, {
        nome: newContact.nome,
        telefone: newContact.telefone,
      });
      setEditingContact(null);
    } else {
      const contact = {
        id: Date.now(),
        nome: newContact.nome,
        telefone: newContact.telefone,
      };
      setContatos((prev) => [...prev, contact]);
    }

    setNewContact({ nome: "", telefone: "" });
    setShowForm(false);
  };

  const handleEditContact = async (contact) => {
    setNewContact({
      nome: contact.nome,
      telefone: contact.telefone,
      id: contact.id,
    });
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleDeleteContact = (id) => {
    setContatos((prev) => prev.filter((contact) => contact.id !== id));
  };

  const handleMessageContact = (contact) => {
    const cleanPhone = contact.telefone.replace(/\D/g, "");
    const link = `https://wa.me/55${cleanPhone}`;
    window.open(link, "_blank");
  };

  const cancelEdit = () => {
    setNewContact({ nome: "", telefone: "", id: "" });
    setEditingContact(null);
    setShowForm(false);
  };

  const cancelSave = () => {
    setShowFormAdd(false)
  }
  return (
    <div className={styles["contactBook"]}>
      <div className={styles["contactBookHeader"]}>
        <div className={styles["headerTitle"]}>
          <Users className={styles["headerIcon"]} />
          <h2>Agenda de Contatos</h2>
        </div>
        <button onClick={() => setShowFormAdd(!showFormAdd)} className={styles["addButton"]}>
          <Plus className={styles["addIcon"]} />
          Adicionar
        </button>
      </div>

      {showFormAdd && <ContactFormAdd onSave={handleSaveContact} onCancel={cancelSave}/>}

      {showForm && (
        <ContactForm
          newContact={newContact}
          setNewContact={setNewContact}
          editingContact={editingContact}
          onSave={handleSaveContact}
          onCancel={cancelEdit}
        />
      )}

      <div className={styles["contactsSection"]}>
        <p className={styles["contactsCount"]}>Seus Contatos </p>
        <div className={styles["contactsList"]}>
          {contatos.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              onEdit={handleEditContact}
              onDelete={handleDeleteContact}
              onMessage={handleMessageContact}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactBook;
