import { useState } from "react";
import { Users, Plus } from "lucide-react";
import ContactItem from "./ContactItem";
import ContactForm from "./ContactForm";
import ContactFormAdd from "./ContactFormAdd";
import styles from "./ContactBook.module.css";
import { useContatos } from "../Context";

const ContactBook = () => {
  const { contatos, removerContatos, atualizarContatos } = useContatos();

  const [contatoEditado, setContatoEditado] = useState({
    nome: "",
    telefone: "",
    id: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [showFormAdd, setShowFormAdd] = useState(false);

  const handleSaveContact = async () => {
    if (!contatoEditado.nome || !contatoEditado.telefone) return;
    if (contatoEditado.telefone.length < 11) {
      alert("Insira 11 números");
      return;
    }
    const contact = {
      nome: contatoEditado.nome,
      telefone: contatoEditado.telefone,
    };
    atualizarContatos(Number(contatoEditado.id), contact);

    setContatoEditado({ nome: "", telefone: "" });
    setShowForm(false);
  };

  const handleEditContact = async (contact) => {
    setContatoEditado({
      nome: contact.nome,
      telefone: contact.telefone,
      id: contact.id,
    });
    setShowForm(true);
  };

  const handleDeleteContact = async (id) => {
    const contatoRemovido = contatos.find((contato) => contato.id === id);
    await removerContatos(id);
    alert(
      `Contato removido com sucesso! Contato removido: ${contatoRemovido.nome}`
    );
  };

  const handleMessageContact = (contact) => {
    const cleanPhone = contact.telefone.replace(/\D/g, "");
    const link = `https://wa.me/55${cleanPhone}`;
    window.open(link, "_blank");
  };

  const cancelEdit = () => {
    setShowForm(false);
  };

  const cancelSave = () => {
    setShowFormAdd(false);
  };

  return (
    <div className={styles["contactBook"]}>
      <div className={styles["contactBookHeader"]}>
        <div className={styles["headerTitle"]}>
          <Users className={styles["headerIcon"]} />
          <h2>Agenda de Contatos</h2>
        </div>
        <button
          onClick={() => setShowFormAdd(!showFormAdd)}
          className={styles["addButton"]}
        >
          <Plus className={styles["addIcon"]} />
          Adicionar
        </button>
      </div>

      {showFormAdd && <ContactFormAdd onCancel={cancelSave} />}

      {showForm && (
        <ContactForm
          newContact={contatoEditado}
          setNewContact={setContatoEditado}
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
