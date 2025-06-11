// routes/documentRoutes.ts
import express, { Router, Request, Response, NextFunction } from 'express';
import { DocumentoController } from '../controllers/documento_controller';

export class DocumentRouter {
  public readonly router!: Router;
  private documentoController: DocumentoController;

  constructor() {
    this.router = express.Router();
    this.documentoController = new DocumentoController();

    // RF-006: Catálogo de documentos disponíveis
    this.router.get('/catalog', (req: Request, res: Response, next: NextFunction) => {
      this.documentoController.getDocuments(req, res);
    });

    // RF-007: Solicitação de documento automático
    this.router.post('/request/automatic', (req: Request, res: Response, next: NextFunction) => {
      this.documentoController.requestAutomatic(req, res);
    });

    // RF-008: Solicitação de documento para retirada ou análise
    this.router.post('/request/manual', (req: Request, res: Response, next: NextFunction) => {
      this.documentoController.requestManual(req, res);
    });

    // RF-009: Acompanhamento do status das solicitações
    this.router.get('/status/:studentId', (req: Request, res: Response, next: NextFunction) => {
      this.documentoController.getStatus(req, res);
    });
  }
}
