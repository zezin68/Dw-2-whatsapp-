import { useState } from "react";
import { Users, Plus } from "lucide-react";
import ContactItem from "./ContactItem";
import ContactForm from "./ContactForm";
import "./ContactBook.css";
import { useContatos } from "../Context";

const ContactBook = () => {
  const { contatos, setContatos } = useContatos();

  const [newContact, setNewContact] = useState({ name: "", phone: "" });
  const [editingContact, setEditingContact] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSaveContact = () => {
    if (!newContact.name || !newContact.phone) return;
    if (newContact.phone.length < 11) {
      alert("Insira 11 números");
      return;
    }

    if (editingContact) {
      setContatos((prev) =>
        prev.map((contact) =>
          contact.id === editingContact.id
            ? { ...editingContact, ...newContact }
            : contact
        )
      );
      setEditingContact(null);
    } else {
      const contact = {
        id: Date.now(),
        name: newContact.name,
        phone: newContact.phone,
      };
      setContatos((prev) => [...prev, contact]);
    }

    setNewContact({ name: "", phone: "" });
    setShowForm(false);
  };

  const handleEditContact = (contact) => {
    setNewContact({ name: contact.name, phone: contact.phone });
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleDeleteContact = (id) => {
    setContatos((prev) => prev.filter((contact) => contact.id !== id));
  };

  const handleMessageContact = (contact) => {
    const cleanPhone = contact.phone.replace(/\D/g, "");
    const link = `https://wa.me/55${cleanPhone}`;
    window.open(link, "_blank");
  };

  const cancelEdit = () => {
    setNewContact({ name: "", phone: "" });
    setEditingContact(null);
    setShowForm(false);
  };

  return (
    <div className="contact-book">
      <div className="contact-book-header">
        <div className="header-title">
          <Users className="header-icon" />
          <h2>Agenda de Contatos</h2>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="add-button">
          <Plus className="add-icon" />
          Adicionar
        </button>
      </div>

      {showForm && (
        <ContactForm
          newContact={newContact}
          setNewContact={setNewContact}
          editingContact={editingContact}
          onSave={handleSaveContact}
          onCancel={cancelEdit}
        />
      )}

      <div className="contacts-section">
        <p className="contacts-count">Seus Contatos </p>
        <div className="contacts-list">
          {/* {contatos.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              onEdit={handleEditContact}
              onDelete={handleDeleteContact}
              onMessage={handleMessageContact}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default ContactBook;
