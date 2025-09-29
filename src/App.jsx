import Header from "./components/Header";
import LinkGenerator from "./components/LinkGenerator";
import ContactBook from "./components/ContactBook";
import supabase from "./supabaseCLient";
import ChatBot from "./components/ChatBot";
import { useState } from "react";
import "./App.css";


const App = () => {

  console.log(supabase)

  async function select(){
    const {data, error} = await supabase.from("Contatos").select("*")
    if (error){
      console.log(error)
    }else{console.log("Contatos",data)}
  }
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
            <button onClick={select}>Clique aqui</button>
          </p>
          {/* <div>{tarefas.map((item) => item)}</div>
          <button onClick={consultaTarefas}>OK</button> */}
        </footer>
      </div>
      <ChatBot />
    </div>
  );
};

export default App;
