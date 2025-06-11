import { Request, Response } from 'express';
import { AuthService } from '../services/logintoken_service';

export class AuthController {
  static async solicitarToken(req: Request, res: Response) {
    const { cpf } = req.body;

    try {
      await AuthService.solicitarToken(cpf);
      return res.status(200).json({ message: 'Token enviado com sucesso.' });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  static async validarLogin(req: Request, res: Response) {
    const { cpf, token } = req.body;

    try {
      const aluno = await AuthService.validarLogin(cpf, token);
      return res.status(200).json({ message: 'Login realizado com sucesso.', aluno });
    } catch (err: any) {
      return res.status(401).json({ error: err.message });
    }
  }

  static async reenviarToken(req: Request, res: Response) {
    const { cpf } = req.body;

    try {
      await AuthService.reenviarToken(cpf);
      return res.status(200).json({ message: 'Token reenviado com sucesso.' });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
