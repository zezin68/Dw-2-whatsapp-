import './ContactForm.module.css';

const ContactForm = ({ 
  newContact, 
  setNewContact, 
  editingContact, 
  onSave, 
  onCancel 
}) => {
  const handleChange = (event) => {
    const value = event.target.value;
    // Remover qualquer coisa que não seja número (conjunto específico)
    const onlyNumbers = value.replace(/\D/g, '');
  
    // Limitar a 11 números
    if (onlyNumbers.length <= 11) {
      setNewContact(prev => ({ ...prev, telefone: onlyNumbers }))
    }
  };
  return ( //={styles["contactBook"]}
    <div className={styles["contactForm"]}>
      <h3 className={styles["formTitle"]}>
        {editingContact ? 'Editar Contato' : 'Novo Contato'}
      </h3>
      <div className={["formInputs"]}>
        <div className={["inputGroup"]}>
          <label className={["inputLabel"]}>Nome</label>
          <input
            type="text"
            value={newContact.nome}
            onChange={(e) => setNewContact(prev => ({ ...prev, nome: e.target.value }))}
            placeholder="Nome do contato"
            className={["formInput"]}/>
        </div>
        <div className={["inputGroup"]}>
          <label className={["inputLabel"]}>Número</label>
          <input
            type="text"
            value={newContact.telefone}
            onChange={(e) => handleChange(e) }
            placeholder="Número"
            className="form-input"
          />
        </div>
      </div>
      <div className={["formButtons"]}>
        <button
          onClick={onSave}
          className={["formButton saveButton"]}>
          {editingContact ? 'Atualizar' : 'Salvar'}
        </button>
        <button
          onClick={onCancel}
          className={["form-button cancel-button"]}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ContactForm;