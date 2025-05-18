import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UsuarioModel } from '../../models/usuario_model';

// Variáveis de ambiente
const JWT_SECRET = process.env.JWT_SECRET;  // Certifique-se de definir esta variável no .env

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET não está definido');
}

// Função para login
export const login = async (req: Request, res: Response) => {
  try {
    const { emailUsuario, senhaUsuario } = req.body;

    // Verificar se o usuário existe
    const user = await UsuarioModel.findOne({ where: { emailUsuario } });
    if (!user) {
      return res.status(400).json({ message: 'Email inválidos.' });
    }

    // Verificar se a senha está correta
    const isPasswordValid = await bcrypt.compare(senhaUsuario, user.senhaUsuario);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'senha inválidos.' });
    }

    // Gerar token JWT
    const token = jwt.sign({ idUsuario: user.idUsuario }, JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login realizado com sucesso.', token });
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao fazer login.', error: err });
  }
};
