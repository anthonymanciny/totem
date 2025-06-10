import { Request, Response } from 'express';
import { getUserByToken } from '../services/getuser_service';

export const getUserInfo = async (req: Request, res: Response) => {
  const rawToken = req.header('Token');

  if (!rawToken) {
    return res.status(403).json({ message: 'Token de autenticação não fornecido.' });
  }

  // Se vier como "Bearer xxx", remove o "Bearer "
  const token = rawToken.startsWith('Bearer ') ? rawToken.replace('Bearer ', '') : rawToken;

  try {
    const user = await getUserByToken(token);
    return res.status(200).json({ user });
  } catch (error: any) {
    return res.status(403).json({ message: error.message });
  }
};
