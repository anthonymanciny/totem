import { Request, Response } from 'express';
import { LoginService } from '../services/login_service';

export const login = async (req: Request, res: Response) => {
  const { cpfAluno, senhaAluno } = req.body;

  try {
    const result = await LoginService.login(cpfAluno, senhaAluno);
    return res.status(200).json(result);
  } catch (error: any) {
    const status = error.message.includes('inválido') ? 400 : 500;
    return res.status(status).json({ message: error.message });
  }
};
