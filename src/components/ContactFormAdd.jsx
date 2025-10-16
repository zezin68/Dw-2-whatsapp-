import { useState } from "react";
import { useContatos } from "../Context";
import styles from "./ContactFormAdd.module.css";

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
      if(!novoContato.nome || !novoContato.telefone){
        alert("Todos os campos devem estar preenchidos!");
        return;
      }
      
      const onlyNumbers = novoContato.telefone.replace(/\D/g, "");
      if(onlyNumbers.length < 10){
        alert("Número de telefone muito curto!");
        return;
      }
      
      await adicionarContatos(novoContato);
      alert("Contato criado!")
      onCancel();
    }

    return ( 
      <div className={styles["contactForm"]}>
        <h3 className={styles["formTitle"]}>
          Novo Contato
        </h3>
        <div className={styles["formInputs"]}>
          <div className={styles["inputGroup"]}>
            <label className={styles["inputLabel"]}>Nome</label>
            <input
              type="text"
              value={novoContato.nome}
              onChange={(e) => setNovoContato(prev => ({ ...prev, nome: e.target.value }))}
              placeholder="Nome do contato"
              className={styles["formInput"]}
            />
          </div>
          <div className={styles["inputGroup"]}>
            <label className={styles["inputLabel"]}>Número</label>
            <input
              type="text"
              value={novoContato.telefone}
              onChange={(e) => formatPhoneNumber(e.target.value)}
              placeholder="(XX) XXXXX-XXXX"
              className={styles["formInput"]}
            />
          </div>
        </div>
        <div className={styles["formButtons"]}>
          <button
            onClick={onSave}
            className={`${styles["formButton"]} ${styles["saveButton"]}`}>
            Salvar
          </button>
          <button
            onClick={onCancel}
            className={`${styles["formButton"]} ${styles["cancelButton"]}`}>
            Cancelar
          </button>
        </div>
      </div> 
    );
}

export default ContactFormAdd;