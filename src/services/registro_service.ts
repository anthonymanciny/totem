import bcrypt from 'bcryptjs';
import { AlunoModel } from '../models/aluno_model';

interface AlunoData {
  nomeAluno: string;
  emailAluno: string;
  senhaAluno: string;
  cpfAluno: string;
  statusAtivo: boolean;
  biometriaID?: string | null;
}

export class RegistroService {
  static async register(alunosInput: AlunoData[]) {
    const results = [];

    for (const aluno of alunosInput) {
      const { nomeAluno, emailAluno, senhaAluno, cpfAluno, statusAtivo, biometriaID = null } = aluno;

      const userExists = await AlunoModel.findOne({ where: { emailAluno } });
      if (userExists) {
        results.push({ emailAluno, status: 'failed', message: 'Email já está em uso.' });
        continue;
      }

      const hashedPassword = await bcrypt.hash(senhaAluno, 10);

      await AlunoModel.create({
        nomeAluno,
        emailAluno,
        senhaAluno: hashedPassword,
        cpfAluno,
        statusAtivo,
        biometriaID
      });

      results.push({ emailAluno, status: 'success', message: 'Usuário registrado com sucesso.' });
    }

    return results;
  }
}
