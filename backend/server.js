import express from 'express';
import Groq from 'groq-sdk';

const app = express();
const port = 5173;

const groq = new Groq({ apiKey: import.meta.env.GROQ_API_KEY });

// Middleware para processar o corpo da requisição como JSON
app.use(express.json());

// Rota para processar a requisição do frontend
app.post('/chat', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ error: 'Prompt é obrigatório' });
  }

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: 'Você é um assistente útil.' },
        { role: 'user', content: prompt },
      ],
      model: 'openai/gpt-oss-20b',
    });

    const answer = completion.choices[0]?.message?.content || 'Não consegui gerar uma resposta.';
    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao processar a requisição' });
  }
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
