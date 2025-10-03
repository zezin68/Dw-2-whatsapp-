import { useState } from "react";
import supabase from "../supabaseClient";

export default function ChatBot() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);

    //  Salva a mensagem do usuário no Supabase
    const { data: userMessage, error: userMessageError } = await supabase
      .from("messages") // Tabela onde as mensagens serão armazenadas
      .insert([{ content: input }])
      .single();

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
<<<<<<< Updated upstream
          Authorization: `Bearer ${import.meta.env.IA_KEY}`, // Cabeçalho de autenticação correto
=======
          Authorization: `Bearer 10b257b6-be44-47db-8a7c-47b0e654d070`, // Cabeçalho de autenticação correto
>>>>>>> Stashed changes
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
        setResponse(botResponse);

        //  Salva a resposta no Supabase
        const { error: responseMessageError } = await supabase
          .from("messages")
          .update([{ response: botResponse }])
          .eq("id", userMessage.id); // Usa o ID da mensagem para atualizar

        if (responseMessageError) {
          setResponse("Erro ao salvar a resposta.");
        }
      } else {
        setResponse("Erro na resposta.");
      }
    } catch (error) {
      setResponse(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>ChatBot</h2>

      <textarea
        rows={4}
        style={{ width: "100%" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Digite sua pergunta aqui"
      />

      <button onClick={handleSend} style={{ marginTop: 10 }} disabled={loading}>
        {loading ? "Carregando..." : "Enviar"}
      </button>

      <pre style={{ marginTop: 20, background: "#eee", padding: 10 }}>
        {response}
      </pre>
    </div>
  );
}
