import styles from "./ContactForm.module.css"; 

// Componente de formulário para editar um contato existente
const ContactForm = ({ newContact, setNewContact, onSave, onCancel }) => {
  // Lógica de formatação do número de telefone conforme o usuário digita
  const handleChange = (event) => {
    const value = event.target.value;
    const onlyNumbers = value.replace(/\D/g, "").slice(0, 11); // Limita a 11 dígitos numéricos

    let formatado = onlyNumbers;

    if (formatado.length > 2) {
      // Adiciona DDD com parênteses
      formatado = `(${formatado.slice(0, 2)}) ${formatado.slice(2)}`;
    }
    if (formatado.length > 9) {
      // Adiciona hífen para separar os últimos dígitos
      formatado = `${formatado.slice(0, 9)}-${formatado.slice(9)}`;
    }

    // Atualiza apenas o campo telefone no estado
    setNewContact((prev) => ({ ...prev, telefone: formatado }));
  };

  return (
    // Container principal do formulário
    <div className={styles["contactForm"]}>
      {/* Título do formulário */}
      <h3 className={styles["formTitle"]}>Editar Contato</h3>

      <div className={["formInputs"]}>
        {/* Campo para editar o nome do contato */}
        <div className={["inputGroup"]}>
          <label className={["inputLabel"]}>Nome</label>
          <input
            type="text"
            value={newContact.nome}
            onChange={(e) =>
              setNewContact((prev) => ({ ...prev, nome: e.target.value }))
            }
            placeholder="Nome do contato"
            className={["formInput"]}
          />
        </div>

        {/* Campo para editar o número de telefone com formatação automática */}
        <div className={["inputGroup"]}>
          <label className={["inputLabel"]}>Número</label>
          <input
            type="text"
            value={newContact.telefone}
            onChange={(e) => handleChange(e)}
            placeholder="Número"
            className="formInput"
          />
        </div>
      </div>

      {/* Botões de ação do formulário */}
      <div className={["formButtons"]}>
        {/* Botão para salvar alterações (aciona função onSave) */}
        <button onClick={onSave} className={["formButton saveButton"]}>
          Atualizar
        </button>

        {/* Botão para cancelar a edição (aciona função onCancel) */}
        <button onClick={onCancel} className={["formButton cancelButton"]}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ContactForm;

