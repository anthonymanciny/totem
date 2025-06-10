import crypto from "crypto";

// Armazenamento temporário em memória (substitua por Redis em produção)
const tokenStore = new Map<string, { token: string; expiresAt: number }>();

export function generateTokenForAluno(cpf: string): string {
  const token = crypto.randomInt(100000, 999999).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutos

  tokenStore.set(cpf, { token, expiresAt });

  return token;
}

export function validateTokenForAluno(cpf: string, inputToken: string): boolean {
  const entry = tokenStore.get(cpf);
  if (!entry) return false;

  const { token, expiresAt } = entry;

  if (Date.now() > expiresAt) {
    tokenStore.delete(cpf);
    return false;
  }

  const isValid = token === inputToken;
  if (isValid) tokenStore.delete(cpf);

  return isValid;
}
