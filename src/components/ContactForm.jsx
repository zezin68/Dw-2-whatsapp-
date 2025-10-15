import styles from "./ContactForm.module.css";

const ContactForm = ({ newContact, setNewContact, onSave, onCancel }) => {
  const handleChange = (event) => {
    const value = event.target.value;
    const onlyNumbers = value.replace(/\D/g, "").slice(0, 11);

    let formatado = onlyNumbers;

    if (formatado.length > 2) {
      formatado = `(${formatado.slice(0, 2)}) ${formatado.slice(2)}`;
    }
    if (formatado.length > 9) {
      formatado = `${formatado.slice(0, 9)}-${formatado.slice(9)}`;
    }

    setNewContact((prev) => ({ ...prev, telefone: formatado }));
  };
  return (
    //={styles["contactBook"]}
    <div className={styles["contactForm"]}>
      <h3 className={styles["formTitle"]}>Editar Contato</h3>
      <div className={["formInputs"]}>
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
      <div className={["formButtons"]}>
        <button onClick={onSave} className={["formButton saveButton"]}>
          Atualizar
        </button>
        <button onClick={onCancel} className={["formButton cancelButton"]}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
