// src/controllers/curso.controller.ts
import { Request, Response, NextFunction } from 'express';
import { getCursosByToken } from '../services/getcurso_service';

export const getCursoInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.header('Token')?.replace('Bearer ', '');
    const cursos = await getCursosByToken(token);

    res.status(200).json({ Cursos: cursos });
  } catch (error: any) {
    if (error.message === 'Token de autenticação não fornecido.') {
      res.status(403).json({ message: error.message });
    } else if (error.message === 'Usuário não encontrado.') {
      res.status(400).json({ message: error.message });
    } else if (error.message === 'Token inválido.') {
      res.status(403).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Erro interno no servidor.' });
    }
  }
};
