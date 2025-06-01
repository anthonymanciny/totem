import { Request, Response } from 'express';
import { DocumentoCursoService } from '../services/documento_curso_service';

export class DocumentoCursoController {
  private documentoService: DocumentoCursoService;

  constructor() {
    this.documentoService = new DocumentoCursoService();
  }

  public async criar(req: Request, res: Response): Promise<void> {
    const dados = req.body;

    if (!dados || (Array.isArray(dados) && dados.length === 0)) {
      res.status(400).json({ message: 'O corpo da requisição está vazio' });
      return;
    }

    try {
      if (Array.isArray(dados)) {
        await Promise.all(dados.map((doc) => this.documentoService.criar(doc)));
        res.status(201).json({ message: 'Documentos do curso criados com sucesso' });
      } else {
        await this.documentoService.criar(dados);
        res.status(201).json({ message: 'Documento do curso criado com sucesso' });
      }
    } catch (erro: any) {
      res.status(500).json({ message: erro.message });
    }
  }

  public async listar(req: Request, res: Response): Promise<void> {
    try {
      const documentos = await this.documentoService.listar();
      res.status(200).json(documentos);
    } catch (erro: any) {
      res.status(500).json({ message: erro.message });
    }
  }

  public async buscar(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ message: 'Parâmetro de ID inválido' });
      return;
    }

    try {
      const documento = await this.documentoService.buscar(id);
      res.status(200).json(documento);
    } catch (erro: any) {
      res.status(404).json({ message: erro.message });
    }
  }

  public async alterar(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ message: 'Parâmetro de ID inválido' });
      return;
    }

    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: 'O corpo da requisição está vazio' });
      return;
    }

    try {
      await this.documentoService.alterar(id, req.body);
      res.status(200).json({ message: 'Documento do curso alterado com sucesso' });
    } catch (erro: any) {
      res.status(500).json({ message: erro.message });
    }
  }

  public async excluir(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ message: 'Parâmetro de ID inválido' });
      return;
    }

    try {
      await this.documentoService.delete(id);
      res.status(200).json({ message: 'Documento do curso excluído com sucesso' });
    } catch (erro: any) {
      res.status(500).json({ message: erro.message });
    }
  }
}
