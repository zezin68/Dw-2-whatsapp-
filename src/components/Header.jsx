import { MessageCircle } from 'lucide-react';
import './Header.module.css';

const Header = () => {
  return (
    <header className="header">
      <div className="headerTitle">
        <MessageCircle className="headerIcon" />
        <h1>WhatsHub</h1>
      </div>
      <p className="headerDescription">
        O jeito mais rápido de iniciar conversas no WhatsApp. Gere links instantâneos e 
        mantenha seus contatos organizados.
      </p>
    </header>
  );
};

export default Header;