import React, { useState } from "react";
import styles from "./Chatbot.module.css";

const Chatbot = () => {
  // Estados controlados para o prompt do usuário, resposta do bot, status de carregamento, erro e visibilidade do chat
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Função responsável por enviar o prompt para a API backend e lidar com a resposta
  const handleSend = async () => {
    if (!prompt.trim()) return; // Evita requisições com prompt vazio
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("https://dw-2-whatsapp.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }), // Envia o prompt como JSON
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Erro desconhecido"); // Lida com erros HTTP e da API

      setAnswer(data.answer); // Atualiza a resposta exibida
    } catch (e) {
      setError(e.message); // Captura qualquer erro da requisição
    } finally {
      setLoading(false); // Finaliza o estado de carregamento
    }
  };

  return (
    <>
      {/* Botão flutuante para abrir/fechar o chat */}
      <button
        className={styles["chatbotToggle"]}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir chat" // Acessibilidade
      >
        {/* Ícone de balão de chat (SVG) */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <circle cx="9" cy="10" r="1" fill="currentColor" />
          <circle cx="15" cy="10" r="1" fill="currentColor" />
          <path d="M9 14s1 1 3 1 3-1 3-1" />
        </svg>
      </button>

      {/* Interface do ChatBot, exibida apenas quando o chat está aberto */}
      {isOpen && (
        <div className={styles["chatbotContainer"]}>
          <div className={styles["chatbotHeader"]}>
            <h3 className={styles["chatbotTitle"]}>ChatBot</h3>
            {/* Botão para fechar o chat */}
            <button
              className={styles["chatbotClose"]}
              onClick={() => setIsOpen(false)}
              aria-label="Fechar chat"
            >
              ✕
            </button>
          </div>

          {/* Campo de entrada do usuário */}
          <textarea
            className={styles["chatbotTextarea"]}
            rows={3}
            placeholder="Digite sua pergunta..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          {/* Botão de envio, desabilitado quando carregando ou o prompt está vazio */}
          <button
            className={styles["chatbotButton"]}
            onClick={handleSend}
            disabled={loading || !prompt.trim()}
          >
            {loading ? "Carregando..." : "Enviar"}
          </button>

          {/* Exibição de erro, se houver */}
          {error && (
            <div className={styles["chatbotError"]}>
              <strong>Erro:</strong> {error}
            </div>
          )}

          {/* Exibição da resposta da API, se houver */}
          {answer && (
            <div className={styles["chatbotAnswer"]}>
              <strong>Resposta:</strong>
              <p>{answer}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;
