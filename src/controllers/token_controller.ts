import { Request, Response } from "express";
import { AlunoModel } from "../models/aluno_model";
import { generateTokenForAluno } from "../services/token_service";

import { sendEmail } from "../services/emailService"; // Você já possui

export async function enviarToken(req: Request, res: Response) {
  const { cpf } = req.body;

  try {
    const aluno = await AlunoModel.findOne({ where: { cpfAluno: cpf } });

    if (!aluno) {
      return res.status(404).json({ error: "CPF não encontrado." });
    }

    const token = generateTokenForAluno(cpf);
    await sendEmail(aluno.emailAluno, "Seu código de login", `Seu código é: ${token}`);

    return res.status(200).json({ message: "Token enviado para o e-mail cadastrado." });
  } catch (err) {
    return res.status(500).json({ error: "Erro ao enviar o token." });
  }
}
