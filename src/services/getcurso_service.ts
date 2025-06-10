// src/services/curso.service.ts
import jwt from 'jsonwebtoken';
import { MatriculaModel } from '../models/matriculas_model';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

export const getCursosByToken = async (token?: string) => {
  if (!token) {
    throw new Error('Token de autenticação não fornecido.');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    const idAluno = decoded.idAluno;

    const cursos = await MatriculaModel.findAll({ where: { idAluno } });

    if (!cursos) {
      throw new Error('Usuário não encontrado.');
    }

    return cursos;
  } catch (err) {
    throw new Error('Token inválido.');
  }
};
