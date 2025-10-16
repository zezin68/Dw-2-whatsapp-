import { MessageCircle } from 'lucide-react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles["header"]}>
      <div className={styles["headerTitle"]}>
        <MessageCircle className={styles["headerIcon"]} />
        <h1>WhatsHub</h1>
      </div>
      <p className={styles["headerDescription"]}>
        O jeito mais rápido de iniciar conversas no WhatsApp. Gere links instantâneos e 
        mantenha seus contatos organizados.
      </p>
    </header>
  );
};

export default Header;