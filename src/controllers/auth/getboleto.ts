import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { BoletoModel } from '../../models/boletos_model';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

export const getBoletosPorCurso = async (req: Request, res: Response, next: unknown): Promise<void> => {
  const token = req.header('Token')?.replace('Bearer ', '');
  const idCurso = parseInt(req.params.idCurso); // o curso vem como parâmetro da URL

  if (!token) {
    res.status(403).json({ message: 'Token de autenticação não fornecido.' });
    return;
  }

  if (isNaN(idCurso)) {
    res.status(400).json({ message: 'ID do curso inválido.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    const idAluno = decoded.idAluno;

    const boletos = await BoletoModel.findAll({
      where: {
        idAluno,
        idCurso,
      },
    });

    if (!boletos || boletos.length === 0) {
      res.status(404).json({ message: 'Nenhum boleto encontrado para esse curso.' });
      return;
    }

    res.status(200).json({ boletos });
  } catch (err) {
    res.status(403).json({ message: 'Token inválido.' });
  }
};
