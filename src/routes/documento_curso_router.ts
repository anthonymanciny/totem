import express, { Router, Request, Response, NextFunction } from 'express';
import { DocumentoCursoController } from '../controllers/documento_curso_controller';
import { authenticateJWT } from '../middleware/auth';

export class DocumentoCursoRouter {
  public readonly router!: Router;
  private documentoController: DocumentoCursoController;

  constructor() {
    this.router = express.Router();
    this.documentoController = new DocumentoCursoController();

    // Rota para criar documento(s) do curso
    this.router.post('/criar', (req: Request, res: Response) => {
      this.documentoController.criar(req, res);
    });

    // Rota para buscar documento por ID
    this.router.get('/buscar/:id', (req: Request, res: Response) => {
      this.documentoController.buscar(req, res);
    });

    // Rota para listar todos os documentos
    this.router.get('/listar', (req: Request, res: Response) => {
      this.documentoController.listar(req, res);
    });

    // Rota para alterar documento por ID
    this.router.put('/alterar/:id', (req: Request, res: Response) => {
      this.documentoController.alterar(req, res);
    });

    // Rota para excluir documento por ID (com autenticação)
    this.router.delete('/excluir/:id', authenticateJWT, (req: Request, res: Response) => {
      this.documentoController.excluir(req, res);
    });
  }
}
