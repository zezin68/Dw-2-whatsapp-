import Header from "./components/Header";
import LinkGenerator from "./components/LinkGenerator";
import ContactBook from "./components/ContactBook";
import { useState } from "react";
import { supabase } from "./supabaseCLient";
import "./App.css";

const App = () => {
  const consultaTarefas = async () => {
    const [data, error] = await supabase.from("tarefas").select("*");
    setTarefas(data);
  };

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
            WhatsHub - Simplifique suas conversas no WhatsApp
            <button
              className="musica"
              onClick={() =>
                window.open(
                  "https://youtu.be/YBez2FYTubg?si=ZX8YqlcdkRxUZY63",
                  "_blank"
                )
              }
            >
              ☺️
            </button>
          </p>
          <div>{tarefas.map((item) => item)}</div>
          <button onClick={consultaTarefas}>OK</button>
        </footer>
      </div>
    </div>
  );
};

export default App;
