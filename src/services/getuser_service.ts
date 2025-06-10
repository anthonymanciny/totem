import jwt from 'jsonwebtoken';
import { AlunoModel } from '../models/aluno_model';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

export const getUserByToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

    const idAluno = decoded.idAluno;
    if (!idAluno) {
      throw new Error('Token inválido: idAluno não encontrado.');
    }

    const user = await AlunoModel.findOne({ where: { idAluno } });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    return user;
  } catch (err) {
    throw new Error('Token inválido ou erro ao buscar usuário.');
  }
};
