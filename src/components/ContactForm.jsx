import './ContactForm.css';

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
  return (
    <div className="contact-form">
      <h3 className="form-title">
        {editingContact ? 'Editar Contato' : 'Novo Contato'}
      </h3>
      <div className="form-inputs">
        <div className="input-group">
          <label className="input-label">Nome</label>
          <input
            type="text"
            value={newContact.nome}
            onChange={(e) => setNewContact(prev => ({ ...prev, nome: e.target.value }))}
            placeholder="Nome do contato"
            className="form-input"
          />
        </div>
        <div className="input-group">
          <label className="input-label">Número</label>
          <input
            type="text"
            value={newContact.telefone}
            onChange={(e) => handleChange(e) }
            placeholder="Número"
            className="form-input"
          />
        </div>
      </div>
      <div className="form-buttons">
        <button
          onClick={onSave}
          className="form-button save-button"
        >
          {editingContact ? 'Atualizar' : 'Salvar'}
        </button>
        <button
          onClick={onCancel}
          className="form-button cancel-button"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ContactForm;