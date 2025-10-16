import { MessageCircle } from 'lucide-react'; // Ícone de mensagem para o cabeçalho
import styles from './Header.module.css'; 

const Header = () => {
  return (
    // Container do topo da aplicação
    <header className={styles["header"]}>
      
      {/* Área do título com ícone e texto */}
      <div className={styles["headerTitle"]}>
        {/* Ícone representando mensagem */}
        <MessageCircle className={styles["headerIcon"]} />
        
        {/* Título principal da aplicação */}
        <h1>WhatsHub</h1>
      </div>

      {/* Descrição resumida do propósito da aplicação */}
      <p className={styles["headerDescription"]}>
        O jeito mais rápido de iniciar conversas no WhatsApp. Gere links instantâneos e 
        mantenha seus contatos organizados.
      </p>
    </header>
  );
};

export default Header;
