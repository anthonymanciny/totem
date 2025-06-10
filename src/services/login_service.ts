import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AlunoModel } from '../models/aluno_model';

const JWT_SECRET = process.env.JWT_SECRET!;


if (!JWT_SECRET) {
  throw new Error('JWT_SECRET não está definido');
}

export class LoginService {
  static async login(cpfAluno: string, senhaAluno: string) {
    const user = await AlunoModel.findOne({ where: { cpfAluno } });
    if (!user) {
      throw new Error('CPF inválido.');
    }

    const isPasswordValid = await bcrypt.compare(senhaAluno, user.senhaAluno);
    if (!isPasswordValid) {
      throw new Error('Senha inválida.');
    }

    const token = jwt.sign({ idAluno: user.idAluno }, JWT_SECRET, { expiresIn: '1h' });

    return { message: 'Login realizado com sucesso.', token };
  }
}
