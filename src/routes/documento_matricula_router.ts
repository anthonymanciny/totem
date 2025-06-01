import express, { Router, Request, Response } from 'express';
import { DocumentoMatriculaController } from '../controllers/documento_matricula_controller';
import { authenticateJWT } from '../middleware/auth';

export class DocumentoMatriculaRouter {
  public readonly router!: Router;
  private documentoController: DocumentoMatriculaController;

  constructor() {
    this.router = express.Router();
    this.documentoController = new DocumentoMatriculaController();

    // Criar um ou mais documentos da matrícula
    this.router.post('/criar', (req: Request, res: Response) => {
      this.documentoController.criar(req, res);
    });

    // Buscar documento da matrícula por ID
    this.router.get('/buscar/:id', (req: Request, res: Response) => {
      this.documentoController.buscar(req, res);
    });

    // Listar todos os documentos da matrícula
    this.router.get('/listar', (req: Request, res: Response) => {
      this.documentoController.listar(req, res);
    });

    // Alterar um documento da matrícula por ID
    this.router.put('/alterar/:id', (req: Request, res: Response) => {
      this.documentoController.alterar(req, res);
    });

    // Excluir documento da matrícula por ID (protegido com autenticação)
    this.router.delete('/excluir/:id', authenticateJWT, (req: Request, res: Response) => {
      this.documentoController.excluir(req, res);
    });
  }
}
