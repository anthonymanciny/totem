import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Interface do payload do token
interface JwtPayload {
  id: number;
}

export const autenticarToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensagem: "Token não fornecido." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    (req as any).usuarioId = decoded.id;
    next();
  } catch (error) {
    return res.status(403).json({ mensagem: "Token inválido." });
  }
};
