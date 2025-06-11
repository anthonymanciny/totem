import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendEmail } from './send';

// Configura variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Tipos para os dados
type TokenData = {
  token: string;
  expiresAt: Date;
};

type User = {
  email: string;
};

// Armazenamento temporário de tokens e usuários
const tokens: Record<string, TokenData> = {};

const users: Record<string, User> = {
  '123.456.789-00': { email: 'solange.gs@gmail.com' },
  '987.654.321-99': { email: 'sol.gsfogas@gmail.com' },
};

// Gera um token de 5 dígitos
const generateToken = (): string => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

// Rota: Solicitar código de verificação
app.post('/request-token', async (req: Request, res: Response) => {
  const { cpf } = req.body;

  if (!cpf) {
    return res.status(400).json({ message: 'CPF é obrigatório.' });
  }

  const user = users[cpf];
  if (!user) {
    return res.status(404).json({ message: 'CPF não encontrado.' });
  }

  const token = generateToken();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  tokens[cpf] = { token, expiresAt };

  const emailContent = `
    <p>Olá,</p>
    <p>Seu código de verificação para login é: <strong>${token}</strong></p>
    <p>Este código é válido por 5 minutos.</p>
    <p>Se você não solicitou este código, por favor, ignore este e-mail.</p>
  `;

  const emailSent = await sendEmail(user.email, 'Seu Código de Verificação de Login', emailContent);

  if (emailSent) {
    res.status(200).json({ message: 'Código de verificação enviado para o seu e-mail.' });
  } else {
    res.status(500).json({ message: 'Erro ao enviar o código de verificação. Tente novamente mais tarde.' });
  }
});

// Rota: Validar token
app.post('/validate-token', (req: Request, res: Response) => {
  const { cpf, token } = req.body;

  if (!cpf || !token) {
    return res.status(400).json({ message: 'CPF e Token são obrigatórios.' });
  }

  const storedTokenData = tokens[cpf];

  if (!storedTokenData) {
    return res.status(401).json({ message: 'Token não solicitado ou expirado para este CPF.' });
  }

  if (storedTokenData.token === token && storedTokenData.expiresAt > new Date()) {
    delete tokens[cpf];
    return res.status(200).json({ message: 'Login bem-sucedido!', authenticated: true });
  } else if (storedTokenData.expiresAt <= new Date()) {
    delete tokens[cpf];
    return res.status(401).json({ message: 'Token expirado. Por favor, solicite um novo código.' });
  } else {
    return res.status(401).json({ message: 'Código de verificação inválido.' });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});
