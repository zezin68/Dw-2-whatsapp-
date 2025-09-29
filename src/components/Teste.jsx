import { useState } from "react";

export default function ChatBot() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      console.log("Enviando:", input); // Log para verificar o que está sendo enviado

      const res = await fetch("https://api.scaleway.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": "10b257b6-be44-47db-8a7c-47b0e654d070", // Substitua pela sua chave
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instruct",
          messages: [{ role: "user", content: input }],
          temperature: 0.7,
          max_tokens: 150,
        }),
      });

      if (!res.ok) {
        throw new Error(`Erro na solicitação: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("Resposta da API:", data); // Log para verificar a estrutura da resposta

      // Verificar a estrutura da resposta e acessar o conteúdo corretamente
      if (data.choices && data.choices.length > 0) {
        setResponse(data.choices[0].message.content); // Se a estrutura for correta
      } else {
        setResponse("Erro na resposta.");
      }
    } catch (error) {
      setResponse(`Erro: ${error.message}`);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <textarea
        rows={4}
        style={{ width: "100%" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Digite sua pergunta aqui"
      />
      <button onClick={handleSend} style={{ marginTop: 10 }}>
        Enviar
      </button>
      <pre style={{ marginTop: 20, background: "#eee", padding: 10 }}>
        {response}
      </pre>
    </div>
  );
}
