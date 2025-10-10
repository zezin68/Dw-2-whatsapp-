import { useState } from "react";
import { useContatos } from "../Context";
import styles from "./ContactForm.module.css";

function ContactFormAdd({ onCancel }) {
    const [novoContato, setNovoContato] = useState({nome:"", telefone: ""});
    const { adicionarContatos } = useContatos();

    const formatPhoneNumber = (value) => {
    const onlyNumbers = value.replace(/\D/g, "").slice(0, 11);

    let formatado = onlyNumbers;

    if (formatado.length > 2) {
      formatado = `(${formatado.slice(0, 2)}) ${formatado.slice(2)}`;
    }
    if (formatado.length > 9) {
      formatado = `${formatado.slice(0, 9)}-${formatado.slice(9)}`;
    }

    setNovoContato(prev => ({...prev, telefone: formatado}));
  };

    const onSave = async () => {
      if(!novoContato.nome && !novoContato.telefone){
        alert("Todos os campos devem estar preenchido!");
      }else if(novoContato.telefone < 10){
        alert("Número de telefone muito curto!");
        return;
      }
      await adicionarContatos(novoContato);
      alert("Contato criado!")
      onCancel();
    }

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
            onChange={(e) => setNovoContato(prev => ({ ...prev, nome: e.target.value }))}
            placeholder="Nome do contato"
            className={["formInput"]}/>
        </div>
        <div className={["inputGroup"]}>
          <label className={["inputLabel"]}>Número</label>
          <input
            type="text"
            value={novoContato.telefone}
            onChange={(e) => formatPhoneNumber(e.target.value)}
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