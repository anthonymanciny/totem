// src/storage.ts

export type TokenData = {
  token: string;
  expiresAt: Date;
};

export type User = {
  email: string;
};

// Armazenamento em memória (substituir por DB em produção)
export const tokens: Record<string, TokenData> = {};

export const users: Record<string, User> = {
  '123.456.789-00': { email: 'solange.gs@gmail.com' },
  '987.654.321-99': { email: 'sol.gsfogas@gmail.com' },
};
