# 🚀 Projeto DW-2 WhatsApp

**Link da aplicação:** [👉 Acesse aqui](https://whatshub-0ioy.onrender.com/)

---

## 📖 Sobre o Projeto

O **DW-2 WhatsApp** é uma aplicação que simula funcionalidades básicas do WhatsApp, desenvolvida como parte da disciplina **Desenvolvimento Web II**.  
O projeto foi construído com foco em **aprendizado prático de integração entre frontend e backend**, uso de **APIs modernas**, e **configuração de ambiente seguro** com variáveis de ambiente.

---

## 🛠️ Tecnologias Utilizadas

**Frontend:**

- React.js
- Vite
- CSS
- **Lucide-react** (biblioteca de ícones do react)

**Backend:**

- Node.js
- Express
- Dotenv
- Groq SDK (para integração com IA)
- Supabase

---

## ⚙️ Como Executar Localmente

### Clonar o repositório

```bash
git clone https://github.com/seu-usuario/Dw-2-whatsapp-.git
cd Dw-2-whatsapp-
```

### Instalar as dependências

#### Backend:

```bash
cd backend
npm install
```

#### Frontend:

```bash
cd ..
npm install
```

### Configurar as variáveis de ambiente

Crie um arquivo `.env` dentro da pasta `backend` com o seguinte conteúdo:

```env
GROQ_API_KEY=sua_chave_aqui
```

> 🔑 A variável `GROQ_API_KEY` é usada pelo SDK do Groq para acessar o modelo de IA.  
> Você pode gerar uma chave em: [https://console.groq.com/keys](https://console.groq.com/keys)

---

## Executar o projeto

#### Rodar o backend:

Primeiro dê um `npm i` na pasta `backend`

```bash
npm i
```

Após isso, rode o servidor ( na mesma pasta )

```bash
node server.js
```

#### Rodar o frontend (em outro terminal):

Na pasta do whatshub, rode o servidor local

```bash
npm run dev
```

A aplicação estará disponível em:  
👉 **http://localhost:5173** (ou a porta indicada no terminal)
Ou em nosso site online : [👉 Acesse aqui](https://whatshub-0ioy.onrender.com/)

---

## 📦 Como usar o Supabase

O **Supabase** funciona como o banco de dados da aplicação, armazenando informações de usuários, mensagens e histórico de conversas.

### 🧩 Passos para configurar:

1. **Crie uma conta no Supabase**  
   Acesse [https://supabase.com](https://supabase.com) e crie uma conta gratuita.

2. **Crie um novo projeto**  
   Dê um nome ao projeto e defina uma senha para o banco.

3. **Obtenha as credenciais**  
   Vá em **Project Settings → API** e copie:

   - `Project URL` → será sua `SUPABASE_URL`
   - `anon public key` → será sua `SUPABASE_KEY`

4. **Configure o banco de dados**  
   No painel do Supabase, vá em **Table Editor → New Table** e crie tabelas conforme necessário, por exemplo:

   - **users**  
     | id | nome | email |
     |----|------|--------|
     | int | text | text |

   - **messages**  
     | id | remetente | conteudo | criado_em |
     |----|------------|-----------|-----------|
     | int | text | text | timestamp |

5. **Conecte o backend**  
   No arquivo `server.js` ou `app.js`, importe e inicialize o cliente Supabase:

   ```js
   import { createClient } from "@supabase/supabase-js";
   import dotenv from "dotenv";
   dotenv.config();

   const supabase = createClient(
     process.env.SUPABASE_URL,
     process.env.SUPABASE_KEY
   );
   ```

6. **Use o Supabase nas rotas**  
   Exemplo de inserção de mensagem:

   ```js
   app.post("/mensagem", async (req, res) => {
     const { remetente, conteudo } = req.body;

     const { data, error } = await supabase
       .from("messages")
       .insert([{ remetente, conteudo }]);

     if (error) return res.status(400).json({ error });
     res.json(data);
   });
   ```

---

## 🤖 Como implementar o chatbot

Ao utilizarmos a API do Groq, é necessário criar um servidor para intermediar o envio da mensagem, pois a biblioteaca utilizada só aceita requisições que venham de um backend.

Assim, com o backend criado, e com uma chave da api Groq ( após criar uma conta no Groq, será disponibilizada uma chave de API, copie essa chave e coloque no .env ), podemos realizar um `Fetch` para o servidor da Groq, conseguindo assim acessso a um `chatbot`

---

## 💡 Funcionalidade Extra

### 🔍 Funcionalidade Implementada

**Integração com o modelo de IA Groq** — permite que o sistema analise mensagens e gere respostas automáticas inteligentes, simulando um chatbot real.

### 💭 Por que foi implementada?

Essa funcionalidade foi criada para **explorar o uso de IA generativa** dentro de uma aplicação web moderna, unindo práticas de backend com APIs externas e reforçando conceitos de segurança (como uso de variáveis de ambiente).
Assim fornecendo ao nosso usuário um chatbot confiável, seguro e rápido. Capaz de gerar opções de mensagens criativas e formais para nosso cliente!

---

## 🧑‍💻 Autores

- **Eduardo Cheliga** — 📧 cheligaedu@gmail.com
- **Andrei Abner** — 📧 andreiabners@gmail.com
- **Marcelo** — 📧 marcelo.2007@alunos.utfpr.edu.br

---
