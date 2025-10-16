import { useState } from "react"; 
import { Users, Plus } from "lucide-react"; // Ícones importados da biblioteca Lucide
import ContactItem from "./ContactItem"; 
import ContactForm from "./ContactForm"; 
import ContactFormAdd from "./ContactFormAdd"; 
import styles from "./ContactBook.module.css"; 
import { useContatos } from "../Context"; 

const ContactBook = () => {
  // Obtém dados e funções do contexto global de contatos
  const { contatos, removerContatos, atualizarContatos } = useContatos();

  // Estado para armazenar o contato que está sendo editado
  const [contatoEditado, setContatoEditado] = useState({
    nome: "",
    telefone: "",
    id: "",
  });

  // Estados para controlar exibição dos formulários (edição e adição)
  const [showForm, setShowForm] = useState(false);
  const [showFormAdd, setShowFormAdd] = useState(false);

  // Salva as alterações feitas em um contato existente
  const handleSaveContact = async () => {
    if (!contatoEditado.nome || !contatoEditado.telefone) return; // Validação básica
    if (contatoEditado.telefone.length < 11) {
      alert("Insira 11 números");
      return;
    }

    const contact = {
      nome: contatoEditado.nome,
      telefone: contatoEditado.telefone,
    };

    // Atualiza o contato com base no ID
    atualizarContatos(Number(contatoEditado.id), contact);

    // Reseta os estados relacionados à edição
    setContatoEditado({ nome: "", telefone: "" });
    setShowForm(false);
  };

  // Preenche o formulário com dados do contato selecionado para edição
  const handleEditContact = async (contact) => {
    setContatoEditado({
      nome: contact.nome,
      telefone: contact.telefone,
      id: contact.id,
    });
    setShowForm(true); // Mostra o formulário de edição
  };

  // Remove um contato e exibe uma confirmação
  const handleDeleteContact = async (id) => {
    const contatoRemovido = contatos.find((contato) => contato.id === id);
    await removerContatos(id);
    alert(
      `Contato removido com sucesso! Contato removido: ${contatoRemovido.nome}`
    );
  };

  // Abre link do WhatsApp para enviar mensagem ao contato
  const handleMessageContact = (contact) => {
    const cleanPhone = contact.telefone.replace(/\D/g, ""); // Remove caracteres não numéricos
    const link = `https://wa.me/55${cleanPhone}`;
    window.open(link, "_blank"); // Abre o WhatsApp em nova aba
  };

  // Fecha formulário de edição sem salvar
  const cancelEdit = () => {
    setShowForm(false);
  };

  // Fecha formulário de adição sem salvar
  const cancelSave = () => {
    setShowFormAdd(false);
  };

  return (
    <div className={styles["contactBook"]}>
      <div className={styles["contactBookHeader"]}>
        {/* Cabeçalho com ícone e título */}
        <div className={styles["headerTitle"]}>
          <Users className={styles["headerIcon"]} />
          <h2>Agenda de Contatos</h2>
        </div>

        {/* Botão para exibir formulário de adicionar novo contato */}
        <button
          onClick={() => setShowFormAdd(!showFormAdd)}
          className={styles["addButton"]}
        >
          <Plus className={styles["addIcon"]} />
          Adicionar
        </button>
      </div>

      {/* Formulário de adição de novo contato */}
      {showFormAdd && <ContactFormAdd onCancel={cancelSave} />}

      {/* Formulário de edição de contato existente */}
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
          {/* Lista de contatos renderizada dinamicamente */}
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
