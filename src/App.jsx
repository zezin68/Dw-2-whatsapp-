import Header from './components/Header'
import LinkGenerator from './components/LinkGenerator'
import ContactBook from './components/ContactBook'
import './App.css';

const App = () => {
  return (
    <div className="app">
      <div className="app-container">
        <Header />
        
        <div className="app-content">
          <LinkGenerator />
          <ContactBook />
        </div>
        
        <footer className="app-footer">

            <p>
  WhatsHub - Simplifique suas conversas no WhatsApp <button className="musica" onClick={() => window.open("https://youtu.be/YBez2FYTubg?si=ZX8YqlcdkRxUZY63", "_blank")}>☺️</button></p>
        </footer>
      </div>
    </div>
  );
};

export default App;