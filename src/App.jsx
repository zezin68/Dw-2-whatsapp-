import Header from "./components/Header";
import LinkGenerator from "./components/LinkGenerator";
import ContactBook from "./components/ContactBook";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import "./App.css";

const App = () => {
  const [tarefas, setTarefas] = useState([]);
  const URL = "https://qmvnxspxwipsdmblydmg.supabase.co";
  const KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtdm54c3B4d2lwc2RtYmx5ZG1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1Mzk4NjgsImV4cCI6MjA3NDExNTg2OH0.wCWJbb2F64MhoKg7vvKZ_s2aa-EKPVmyjVKzSyHntu4";
  const supabase = createClient(URL, KEY);

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
