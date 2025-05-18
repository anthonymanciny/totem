// utils/mailer.ts

import nodemailer from 'nodemailer';
import { IUsuario } from '../interface/usuario_interface';

// Gera um código de 6 dígitos
const gerarCodigoAutenticacao = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Envia o código de autenticação por e-mail
export const enviarCodigoPorEmail = async (usuario: IUsuario): Promise<string | null> => {
  const codigo = gerarCodigoAutenticacao();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'seu-email@gmail.com', // seu e-mail
      pass: 'sua-senha-ou-token-de-app', // senha ou token de app
    },
  });

  const mailOptions = {
    from: 'seu-email@gmail.com',
    to: usuario.emailUsuario,
    subject: 'Seu Código de Autenticação',
    html: `
      <h2>Olá, ${usuario.nomeUsuario}!</h2>
      <p>Seu código de autenticação é:</p>
      <h1>${codigo}</h1>
      <p>Este código expira em alguns minutos.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Código enviado para ${usuario.emailUsuario}`);
    return codigo; // Retorna o código para armazenar/verificar depois
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return null;
  }
};
