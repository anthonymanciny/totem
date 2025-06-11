// src/controller.ts
import { Request, Response } from 'express';
import { verifyToken, generateAndSendToken } from '../services/_token_service';
import { AlunoModel } from '../models/aluno_model';

export const requestTokenController = async (req: Request, res: Response) => {
  const { cpfAluno } = req.body;

  if (!cpfAluno) {
    return res.status(400).json({ message: 'CPF é obrigatório.' });
  }

  try {
    const aluno = await AlunoModel.findOne({ where: { cpfAluno} });

    if (!aluno) {
      return res.status(404).json({ message: 'Aluno com CPF informado não encontrado ou está inativo.' });
    }


    const result = await generateAndSendToken(cpfAluno); // <- agora passando cpf + email

    if (result.success) {
      return res.status(200).json({ message: 'Código de verificação enviado para o seu e-mail.' });
    } else {
      return res.status(500).json({ message: result.message ?? 'Erro ao enviar o código de verificação.' });
    }
  } catch (error) {
    console.error('Erro ao solicitar token:', error);
    return res.status(500).json({ message: 'Erro interno ao buscar aluno.', error });
  }
};

export const validateTokenController = (req: Request, res: Response) => {
  const { cpfAluno, token } = req.body;

  if (!cpfAluno || !token) {
    return res.status(400).json({ message: 'CPF e Token são obrigatórios.' });
  }

  const result = verifyToken(cpfAluno, token);

  if (result.success) {
    return res.status(200).json({ message: 'Login bem-sucedido!', authenticated: true });
  } else {
    return res.status(401).json({ message: result.message });
  }
};
