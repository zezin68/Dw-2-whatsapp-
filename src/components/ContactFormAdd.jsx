import { useState } from "react";
import { useContatos } from "../Context"; 
import styles from "./ContactFormAdd.module.css"; 

function ContactFormAdd({ onCancel }) {
  // Estado local para armazenar os dados do novo contato
  const [novoContato, setNovoContato] = useState({ nome: "", telefone: "" });

  // Função vinda do contexto para adicionar um novo contato
  const { adicionarContatos } = useContatos();

  // Formata o número de telefone dinamicamente à medida que o usuário digita
  const formatPhoneNumber = (value) => {
    const onlyNumbers = value.replace(/\D/g, "").slice(0, 11); // Mantém apenas números e limita a 11 dígitos

    let formatado = onlyNumbers;

    // Adiciona o DDD com parênteses
    if (formatado.length > 2) {
      formatado = `(${formatado.slice(0, 2)}) ${formatado.slice(2)}`;
    }

    // Insere hífen para separar os últimos dígitos
    if (formatado.length > 9) {
      formatado = `${formatado.slice(0, 9)}-${formatado.slice(9)}`;
    }

    // Atualiza o campo de telefone no estado
    setNovoContato(prev => ({ ...prev, telefone: formatado }));
  };

  // Função chamada ao clicar em "Salvar"
  const onSave = async () => {
    // Verificação básica: campos não podem estar vazios
    if (!novoContato.nome || !novoContato.telefone) {
      alert("Todos os campos devem estar preenchidos!");
      return;
    }

    // Verifica se o telefone contém pelo menos 10 dígitos numéricos
    const onlyNumbers = novoContato.telefone.replace(/\D/g, "");
    if (onlyNumbers.length < 10) {
      alert("Número de telefone muito curto!");
      return;
    }

    // Adiciona o contato e fecha o formulário
    await adicionarContatos(novoContato);
    alert("Contato criado!");
    onCancel();
  };

  return (
    // Container principal do formulário de novo contato
    <div className={styles["contactForm"]}>
      
      <h3 className={styles["formTitle"]}>
        Novo Contato
      </h3>

      {/* Seção de campos de entrada */}
      <div className={styles["formInputs"]}>
        
        {/* Campo: Nome do contato */}
        <div className={styles["inputGroup"]}>
          <label className={styles["inputLabel"]}>Nome</label>
          <input
            type="text"
            value={novoContato.nome}
            onChange={(e) =>
              setNovoContato(prev => ({ ...prev, nome: e.target.value }))
            }
            placeholder="Nome do contato"
            className={styles["formInput"]}
          />
        </div>

        {/* Campo: Número de telefone com formatação automática */}
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

      {/* Botões de ação: Salvar e Cancelar */}
      <div className={styles["formButtons"]}>
        <button
          onClick={onSave}
          className={`${styles["formButton"]} ${styles["saveButton"]}`}
        >
          Salvar
        </button>

        <button
          onClick={onCancel}
          className={`${styles["formButton"]} ${styles["cancelButton"]}`}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default ContactFormAdd;
