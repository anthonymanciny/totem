// controllers/documento_controller.ts
import { Request, Response } from 'express';
import { DocumentoService } from '../services/document_service';

export class DocumentoController {
  private documentoService: DocumentoService;

  constructor() {
    this.documentoService = new DocumentoService();
  }

  public async getDocuments(req: Request, res: Response): Promise<void> {
    try {
      const docs = await this.documentoService.listAvailableDocuments();
      res.status(200).json(docs);
    } catch (error: any) {
      res.status(500).json({ message: error.message || 'Erro ao listar documentos' });
    }
  }

  public async requestAutomatic(req: Request, res: Response): Promise<void> {
    const dados = req.body;

    if (!dados || Object.keys(dados).length === 0) {
      res.status(400).json({ message: 'O corpo da requisição está vazio' });
      return;
    }

    try {
      const request = await this.documentoService.requestDocumentAutomatic(dados);
      res.status(201).json(request);
    } catch (error: any) {
      res.status(500).json({ message: error.message || 'Erro ao solicitar documento automático' });
    }
  }

  public async requestManual(req: Request, res: Response): Promise<void> {
    const dados = req.body;

    if (!dados || Object.keys(dados).length === 0) {
      res.status(400).json({ message: 'O corpo da requisição está vazio' });
      return;
    }

    try {
      const request = await this.documentoService.requestDocumentManual(dados);
      res.status(201).json(request);
    } catch (error: any) {
      res.status(500).json({ message: error.message || 'Erro ao solicitar documento manual' });
    }
  }

  public async getStatus(req: Request, res: Response): Promise<void> {
    const studentId = parseInt(req.params.studentId);

    if (isNaN(studentId)) {
      res.status(400).json({ message: 'Parâmetro studentId inválido' });
      return;
    }

    try {
      const statuses = await this.documentoService.getRequestStatus(studentId);
      res.status(200).json(statuses);
    } catch (error: any) {
      res.status(500).json({ message: error.message || 'Erro ao buscar status das solicitações' });
    }
  }
}
