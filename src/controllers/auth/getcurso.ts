import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { MatriculaModel } from '../../models/matriculas_model';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

// Função para obter informações do usuário
export const getCursoInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header('Token')?.replace('Bearer ', '');
  
  if (!token) {
    res.status(403).json({ message: 'Token de autenticação não fornecido.' });
    return; // Interrompe a execução sem retornar explicitamente o Response
  }

  try {
    // Verifica o token
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    const idAluno = decoded.idAluno;  // Corrigido: agora estamos pegando o `idAluno` de `decoded`

    // Busca o usuário no banco de dados
    const Cursos = await MatriculaModel.findAll({ where: { idAluno } });
    if (!Cursos) {
    res.status(400).json({ message: 'Usuário não encontrado.' });
    }

    // Retorna as informações do usuário
    res.status(200).json({ Cursos });
  } catch (err) {
    res.status(403).json({ message: 'Token inválido.' });
  }
};
