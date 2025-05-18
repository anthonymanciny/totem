import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authenticateJWT(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'Token não fornecido' });
    return;
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET || 'seu_segredo', (err, decoded: any) => {
    if (err) {
      res.status(403).json({ message: 'Token inválido' });
      return;
    }

    // Adiciona o ID do usuário no objeto `req`
    (req as any).usuarioId = decoded.idUsuario;
    next(); // passa para o próximo middleware ou rota
  });
}
