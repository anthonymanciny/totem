// import { Request, Response } from 'express';
// import bcrypt from 'bcryptjs';
// import { AlunoModel } from '../../models/aluno_model';

// export const register = async (req: Request, res: Response) => {
//   try {
//     const alunos = Array.isArray(req.body) ? req.body : [req.body];
//     const results = [];

//     for (const aluno of alunos) {
//       const { nomeAluno, emailAluno, senhaAluno, cpfAluno, statusAtivo, biometriaID = null } = aluno;

//       // Verificar se o e-mail já está registrado
//       const userExists = await AlunoModel.findOne({ where: { emailAluno } });
//       if (userExists) {
//         results.push({ emailAluno, status: 'failed', message: 'Email já está em uso.' });
//         continue; // Pula para o próximo usuário
//       }

//       // Criptografando a senha
//       const hashedPassword = await bcrypt.hash(senhaAluno, 10);

//       // Criando o usuário no banco de dados
//       await AlunoModel.create({
//         nomeAluno,
//         emailAluno,
//         senhaAluno: hashedPassword,
//         cpfAluno,
//         statusAtivo,
//         biometriaID
//       });

//       results.push({ emailAluno, status: 'success', message: 'Usuário registrado com sucesso.' });
//     }

//     return res.status(201).json(results);
//   } catch (err) {
//     return res.status(500).json({ message: 'Erro ao registrar os usuários.', error: err });
//   }
// };
