import { useState } from "react";
import supabase from "../supabaseCLient";

export default function ChatBot() {
  const [input, setInput] = useState(""); // Estado para a mensagem do usuário
  const [response, setResponse] = useState(""); // Estado para a resposta da API
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento

  // Função para enviar a mensagem e receber a resposta
  const handleSend = async () => {
    if (!input.trim()) return; // Impede envio de mensagens vazias

    setLoading(true); // Ativa o carregamento

    // Salva a mensagem do usuário no Supabase
    const { data: userMessage, error: userMessageError } = await supabase
      .from('messages') // Tabela onde as mensagens serão armazenadas
      .insert([{ content: input }])
      .single(); // Garante que apenas uma linha seja retornada

    if (userMessageError) {
      setResponse("Erro ao salvar a mensagem.");
      setLoading(false);
      return;
    }

    try {
      // Faz a requisição para a API da Scaleway
      const res = await fetch("https://api.scaleway.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": "10b257b6-be44-47db-8a7c-47b0e654d070", // Sua chave da API Scaleway
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instruct",
          messages: [{ role: "user", content: input }],
          temperature: 0.7,
          max_tokens: 150,
        }),
      });

      const data = await res.json();

      if (data.choices && data.choices.length > 0) {
        const botResponse = data.choices[0].message.content;
        setResponse(botResponse); // Exibe a resposta da API

        // Salva a resposta no Supabase, associada à mensagem do usuário
        const { error: responseMessageError } = await supabase
          .from('messages')
          .update([{ response: botResponse }])
          .eq('id', userMessage.id); // Usa o ID da mensagem para atualizar

        if (responseMessageError) {
          setResponse("Erro ao salvar a resposta.");
        }
      } else {
        setResponse("Erro na resposta.");
      }
    } catch (error) {
      setResponse(`Erro: ${error.message}`);
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>ChatBot</h2>

      {/* Campo de entrada */}
      <textarea
        rows={4}
        style={{ width: "100%" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Digite sua pergunta aqui"
      />

      {/* Botão para enviar a mensagem */}
      <button
        onClick={handleSend}
        style={{ marginTop: 10 }}
        disabled={loading} // Desabilita o botão enquanto está carregando
      >
        {loading ? "Carregando..." : "Enviar"}
      </button>

      {/* Exibe a resposta da API */}
      <pre style={{ marginTop: 20, background: "#eee", padding: 10 }}>
        {response}
      </pre>
    </div>
  );
}
