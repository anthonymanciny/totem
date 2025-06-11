import jwt from 'jsonwebtoken';
import { AlunoModel } from '../models/aluno_model';
import { generateToken } from '../utils/tokengenerator';
import { EmailService } from './email_service';

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET não está definido');
}

const tokenStore = new Map<string, { token: string; expires: Date }>();

export class AuthService {
  static async solicitarToken(cpfAluno: string): Promise<void> {
    const aluno = await AlunoModel.findOne({ where: { cpfAluno } });
    if (!aluno) throw new Error('CPF não encontrado');

    const token = generateToken();
    const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutos

    tokenStore.set(cpfAluno, { token, expires });

    // Enviar token por e-mail (agora real)
    await EmailService.enviarTokenEmail(aluno.emailAluno, token);
  }

  static async validarLogin(cpfAluno: string, token: string): Promise<{ message: string; token: string }> {
    const aluno = await AlunoModel.findOne({ where: { cpfAluno } });
    if (!aluno) throw new Error('CPF inválido');

    const tokenData = tokenStore.get(cpfAluno);
    if (!tokenData) throw new Error('Token não solicitado');

    if (tokenData.token !== token) throw new Error('Token inválido');

    if (tokenData.expires < new Date()) throw new Error('Token expirado');

    tokenStore.delete(cpfAluno);

    const jwtToken = jwt.sign(
      { idAluno: aluno.idAluno, cpfAluno: aluno.cpfAluno, nomeAluno: aluno.nomeAluno },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return { message: 'Login realizado com sucesso.', token: jwtToken };
  }

  static async reenviarToken(cpfAluno: string): Promise<void> {
    return this.solicitarToken(cpfAluno);
  }
}