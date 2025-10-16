import { createContext, useContext, useEffect, useState } from "react";
import supabase from "./supabaseClient"; // Utiização do Backend

const ContatosContext = createContext();

export function ContatosProvider({ children }) {
  const [contatos, setContatos] = useState([]); // Estado para armazenar lista de contatos

  // Função para carregar contatos do banco Supabase, ordenados por nome
  async function carregarContatos() {
    const { data, error } = await supabase
      .from("Contatos")
      .select("*")
      .order("nome", { ascending: true });
    if (error) console.error(error);
    else {
      setContatos(data); // Atualiza estado com dados do banco
      console.log("Contatos", data);
    }
  }

  // Função para adicionar novo contato no banco
  async function adicionarContatos(novoContato) {
    const { data, error } = await supabase
      .from("Contatos")
      .insert([novoContato])
      .select("*");
    if (error) console.error(error);
    else {
      console.log("Novo contato adicionado: ", data);
      setContatos((prev) => [...prev, ...data]); // Adiciona o novo contato ao estado
    }
  }

  // Função para atualizar contato existente pelo id
  async function atualizarContatos(id, contatoAtualizado) {
    const { data, error } = await supabase
      .from("Contatos")
      .update(contatoAtualizado)
      .eq("id", id)
      .select();
    if (error) console.error(error);
    else {
      // Atualiza o contato no estado local substituindo pelo dado retornado
      setContatos((prev) =>
        prev.map((dado) => (dado.id === id ? data[0] : dado))
      );
      console.log("Contato atualizado: ", data);
    }
  }

  // Função para remover contato pelo id
  async function removerContatos(id) {
    const { data, error } = await supabase
      .from("Contatos")
      .delete()
      .eq("id", id)
      .select();
    if (error) console.error(error);
    else {
      // Remove contato do estado local filtrando pelo id
      setContatos((prev) => prev.filter((dado) => dado.id !== id));
      console.log("Contato removido: ", data);
    }
  }

  // Carrega contatos automaticamente
  useEffect(() => {
    carregarContatos();
  }, []);

  return (
    // Contatos e funções para manipular em toda a aplicação
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

// Hook customizado para acessar o contexto de contatos de forma simples
export function useContatos() {
  return useContext(ContatosContext);
}

