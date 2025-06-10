import { Request, Response } from 'express';
import { RegistroService } from '../services/registro_service';

export const registro = async (req: Request, res: Response) => {
  try {
    const alunos = Array.isArray(req.body) ? req.body : [req.body];
    const result = await RegistroService.register(alunos);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao registrar os usuários.', error: err });
  }
};
