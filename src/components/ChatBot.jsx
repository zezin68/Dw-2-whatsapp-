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
      .from("messages")
      .insert([{ content: input }])
      .single();

    if (userMessageError) {
      setResponse("Erro ao salvar a mensagem.");
      setLoading(false);
      return;
    }

    try {
      //  Chama a API do Groq
      const res = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.IA_KEY}`,
          },
          body: JSON.stringify({
            model: "llama-3.1-70b-versatile", // ou outro modelo
            messages: [{ role: "user", content: input }],
            temperature: 0.7,
            max_tokens: 150,
          }),
        }
      );

      const data = await res.json();

      if (data.choices && data.choices.length > 0) {
        const botResponse = data.choices[0].message.content;
        setResponse(botResponse);

        //  Salva a resposta no Supabase
        const { error: responseMessageError } = await supabase
          .from("messages")
          .update({ response: botResponse })
          .eq("id", userMessage.id);

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
