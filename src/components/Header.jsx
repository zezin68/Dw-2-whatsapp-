import { MessageCircle } from 'lucide-react';
import './Header.module.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-title">
        <MessageCircle className="header-icon" />
        <h1>WhatsHub</h1>
      </div>
      <p className="header-description">
        O jeito mais rápido de iniciar conversas no WhatsApp. Gere links instantâneos e 
        mantenha seus contatos organizados.
      </p>
    </header>
  );
};

export default Header;