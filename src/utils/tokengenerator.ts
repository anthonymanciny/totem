// src/tokenGenerator.ts

export const generateToken = (): string => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};
