import Header from "./components/Header";
import LinkGenerator from "./components/LinkGenerator";
import ContactBook from "./components/ContactBook";
import Chatbot from "./components/ChatBot";
import { ContatosProvider } from "./Context";
import styles from "./App.module.css";
import "./components/global.css";

const App = () => {
  return (
    <ContatosProvider>
      <div className={styles["app"]}>
        <div className={styles["appContainer"]}>
          <Header />
          <div className={styles["appContent"]}>
            <LinkGenerator />
            <ContactBook />
          </div>

          <footer className={styles["appFooter"]}>
            <p>
              WhatsHub - Simplifique suas conversas no WhatsApp
              <button
                className={styles["musica"]}
                onClick={() =>
                  // Uma pequena brincadeirinha que quisemos fazer
                  window.open(
                    "https://youtu.be/YBez2FYTubg?si=ZX8YqlcdkRxUZY63",
                    "_blank"
                  )
                }
              >
                ☺️
              </button>
            </p>
          </footer>
        </div>
        <Chatbot />
      </div>
    </ContatosProvider>
  );
};

export default App;
