import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { AlunoModel } from '../../models/aluno_model';


// Função para registrar o usuário
export const register = async (req: Request, res: Response) => {
  try {
    const { nomeAluno, emailAluno, senhaAluno,cpfAluno,statusAtivo } = req.body;

    // Verificar se o e-mail já está registrado
    const userExists = await AlunoModel.findOne({ where: { emailAluno } });
    if (userExists) {
      return res.status(400).json({ message: 'Email já está em uso.' });
    }

    // Criptografando a senha
    const hashedPassword = await bcrypt.hash(senhaAluno, 10);

    // Criando o usuário no banco de dados
    await AlunoModel.create({
      nomeAluno,
      emailAluno,
      senhaAluno: hashedPassword,
      cpfAluno,
      statusAtivo
    });

    return res.status(201).json({ message: 'Usuário registrado com sucesso.' });
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao registrar o usuário.', error: err });
  }
};
