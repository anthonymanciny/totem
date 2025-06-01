import { Request, Response } from 'express';
import { AlunoService } from '../services/aluno_service';

export class AlunoController {
  private alunoService: AlunoService;

  constructor() {
    this.alunoService = new AlunoService();
  }

  public async criar(req: Request, res: Response): Promise<void> {
    const dados = req.body;

    if (!dados || (Array.isArray(dados) && dados.length === 0)) {
      res.status(400).json({ message: 'O corpo da requisição está vazio' });
      return;
    }

    try {
      if (Array.isArray(dados)) {
        await Promise.all(dados.map((aluno) => this.alunoService.criar(aluno)));
        res.status(201).json({ message: 'Alunos criados com sucesso' });
      } else {
        await this.alunoService.criar(dados);
        res.status(201).json({ message: 'Aluno criado com sucesso' });
      }
    } catch (erro: any) {
      res.status(500).json({ message: erro.message });
    }
  }

  public async listar(req: Request, res: Response): Promise<void> {
    try {
      const alunos = await this.alunoService.listar();
      res.status(200).json(alunos);
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
      const aluno = await this.alunoService.buscar(id);
      res.status(200).json(aluno);
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
      await this.alunoService.alterar(id, req.body);
      res.status(200).json({ message: 'Aluno alterado com sucesso' });
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
      await this.alunoService.delete(id);
      res.status(200).json({ message: 'Aluno excluído com sucesso' });
    } catch (erro: any) {
      res.status(500).json({ message: erro.message });
    }
  }
}
