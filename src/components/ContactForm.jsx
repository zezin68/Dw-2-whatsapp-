import './ContactForm.css';

const ContactForm = ({ 
  newContact, 
  setNewContact, 
  editingContact, 
  onSave, 
  onCancel 
}) => {
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
            value={newContact.name}
            onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Nome do contato"
            className="form-input"
          />
        </div>
        <div className="input-group">
          <label className="input-label">Número</label>
          <input
            type="text"
            value={newContact.phone}
            onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
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