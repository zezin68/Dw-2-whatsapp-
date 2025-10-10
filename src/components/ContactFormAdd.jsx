import { useState } from "react";
import styles from "./ContactForm.module.css";

function ContactFormAdd({onSave, onCancel}) {
    const [novoContato, setNovoContato] = useState([{id: "", nome:"", telefone: ""}])
    return ( <div className={styles["contactForm"]}>
      <h3 className={styles["formTitle"]}>
        Novo Contato
      </h3>
      <div className={["formInputs"]}>
        <div className={["inputGroup"]}>
          <label className={["inputLabel"]}>Nome</label>
          <input
            type="text"
            value={novoContato.nome}
            onChange={(e) => setNewContact(prev => ({ ...prev, nome: e.target.value }))}
            placeholder="Nome do contato"
            className={["formInput"]}/>
        </div>
        <div className={["inputGroup"]}>
          <label className={["inputLabel"]}>Número</label>
          <input
            type="text"
            value={novoContato.telefone}
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
          Salvar
        </button>
        <button
          onClick={onCancel}
          className={["form-button cancel-button"]}>
          Cancelar
        </button>
      </div>
    </div> );
}

export default ContactFormAdd;