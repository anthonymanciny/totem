import { Request, Response } from 'express';
import { MatriculaService } from '../services/matriculas_service';

export class MatriculaController {
  private matriculaService: MatriculaService;

  constructor() {
    this.matriculaService = new MatriculaService();
  }

  public async criar(req: Request, res: Response): Promise<void> {
    const dados = req.body;

    if (!dados || (Array.isArray(dados) && dados.length === 0)) {
      res.status(400).json({ message: 'O corpo da requisição está vazio' });
      return;
    }

    try {
      if (Array.isArray(dados)) {
        await Promise.all(dados.map((item) => this.matriculaService.criar(item)));
        res.status(201).json({ message: 'Matrículas criadas com sucesso' });
      } else {
        await this.matriculaService.criar(dados);
        res.status(201).json({ message: 'Matrícula criada com sucesso' });
      }
    } catch (erro: any) {
      res.status(500).json({ message: erro.message });
    }
  }

  public async listar(req: Request, res: Response): Promise<void> {
    try {
      const matriculas = await this.matriculaService.listar();
      res.status(200).json(matriculas);
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
      const matricula = await this.matriculaService.buscar(id);
      res.status(200).json(matricula);
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
      await this.matriculaService.alterar(id, req.body);
      res.status(200).json({ message: 'Matrícula alterada com sucesso' });
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
      await this.matriculaService.delete(id);
      res.status(200).json({ message: 'Matrícula excluída com sucesso' });
    } catch (erro: any) {
      res.status(500).json({ message: erro.message });
    }
  }
}
