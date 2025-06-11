// src/service.ts
import { TokenData,tokens,users } from '../utils/storage';
import { sendEmail } from '../utils/send';
import { generateToken } from '../utils/tokengenerator';

export const generateAndSendToken = async (cpf: string): Promise<{ success: boolean; message?: string }> => {
  const user = users[cpf];
  if (!user) return { success: false, message: 'CPF não encontrado.' };

  const token = generateToken();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutos

  tokens[cpf] = { token, expiresAt };

  const emailContent = `
    <p>Olá,</p>
    <p>Seu código de verificação para login é: <strong>${token}</strong></p>
    <p>Este código é válido por 5 minutos.</p>
  `;

  const emailSent = await sendEmail(user.email, 'Seu Código de Verificação de Login', emailContent);

  return emailSent ? { success: true } : { success: false, message: 'Erro ao enviar o e-mail.' };
};

export const verifyToken = (cpf: string, token: string): { success: boolean; message?: string } => {
  const storedTokenData: TokenData | undefined = tokens[cpf];

  if (!storedTokenData) {
    return { success: false, message: 'Token não solicitado ou expirado para este CPF.' };
  }

  if (storedTokenData.token === token && storedTokenData.expiresAt > new Date()) {
    delete tokens[cpf];
    return { success: true };
  } else if (storedTokenData.expiresAt <= new Date()) {
    delete tokens[cpf];
    return { success: false, message: 'Token expirado. Por favor, solicite um novo código.' };
  } else {
    return { success: false, message: 'Código de verificação inválido.' };
  }
};
