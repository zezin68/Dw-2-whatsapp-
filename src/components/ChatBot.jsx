import React, { useState } from 'react';

const Chatbot = () => {
  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função para enviar o prompt ao backend
  const handleSend = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Erro desconhecido');
      
      setAnswer(data.answer);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>ChatBot</h3>
      <textarea
        rows={3}
        placeholder="Digite sua pergunta..."
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        style={{ width: '100%', fontSize: '1rem', padding: '.5rem' }}
      />
      <button
        onClick={handleSend}
        disabled={loading || !prompt.trim()}
        style={{ padding: '.5rem 1rem', marginTop: '.5rem' }}
      >
        {loading ? 'Carregando...' : 'Enviar'}
      </button>

      {error && (
        <div style={{ color: 'red', marginTop: '1rem' }}>
          <strong>Erro:</strong> {error}
        </div>
      )}

      {answer && (
        <div style={{ marginTop: '1rem', background: '#f0f0f0', padding: '1rem' }}>
          <strong>Resposta:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
