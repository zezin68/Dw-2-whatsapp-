import { createContext, useContext, useEffect, useState } from "react";
import supabase from "./supabaseClient";

const ContatosContext = createContext();

export function ContatosProvider({ children }) {
  const [contatos, setContatos] = useState([]);

  async function carregarContatos() {
    const { data, error } = await supabase
      .from("Contatos")
      .select("*")
      .order("nome", { ascending: true });
    if (error) console.error(error);
    else {
      setContatos(data);
      console.log("Contatos", data);
    }
  }

  async function adicionarContatos(novoContato) {
    const { data, error } = await supabase
      .from("Contatos")
      .insert([novoContato])
      .select("*");
    if (error) console.error(error);
    else {
      console.log("Novo contato adicionado: ", data);
      setContatos((prev) => [...prev, ...data]);
    }
  }

  async function atualizarContatos(id, contatoAtualizado) {
    const { data, error } = await supabase
      .from("Contatos")
      .update(contatoAtualizado)
      .eq("id", id)
      .select();
    if (error) console.error(error);
    else {
      setContatos((prev) =>
        prev.map((dado) => (dado.id === id ? data[0] : dado))
      );
      console.log("Contato atualizado: ", data);
    }
  }

  async function removerContatos(id) {
    const { data, error } = await supabase
      .from("Contatos")
      .delete()
      .eq("id", id)
      .select();
    if (error) console.error(error);
    else {
      setContatos((prev) => prev.filter((dado) => dado.id !== id));
      console.log("Contato removido: ", data);
    }
  }

  useEffect(() => {
    carregarContatos();
  }, []);

  return (
    <ContatosContext.Provider
      value={{
        contatos,
        carregarContatos,
        adicionarContatos,
        atualizarContatos,
        removerContatos,
      }}
    >
      {children}
    </ContatosContext.Provider>
  );
}

export function useContatos() {
  return useContext(ContatosContext);
}
