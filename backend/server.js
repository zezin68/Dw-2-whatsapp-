import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Groq from "groq-sdk";

dotenv.config(); // lê variáveis do painel Render

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173", // dev local
      "https://whatshub-0ioy.onrender.com", // deploy frontend
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(express.json());

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt?.trim())
    return res.status(400).json({ error: "Prompt é obrigatório" });

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "Você é um assistente útil." },
        { role: "user", content: prompt },
      ],
      model: "openai/gpt-oss-20b",
    });

    const answer =
      completion.choices[0]?.message?.content ||
      "Não consegui gerar uma resposta.";
    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao processar a requisição" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
