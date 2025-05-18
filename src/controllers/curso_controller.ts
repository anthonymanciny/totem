import { Request, Response } from 'express';
import { CursoService } from '../services/curso_service';

export class CursoController {
  private cursoService: CursoService;

  constructor() {
    this.cursoService = new CursoService();
  }

  // public async criar(req: Request, res: Response): Promise<void> {
  //   if (Object.keys(req.body).length === 0) {
  //     res.status(400).json({ message: 'O corpo da requisição está vazio' });
  //     return;
  //   }

  //   try {
  //     await this.cursoService.criar(req.body);
  //     res.status(201).json({ message: 'Curso criado com sucesso' });
  //   } catch (erro: any) {
  //     res.status(500).json({ message: erro.message });
  //   }
  // }

  public async criar(req: Request, res: Response): Promise<void> {
  const dados = req.body;

  if (!dados || (Array.isArray(dados) && dados.length === 0)) {
    res.status(400).json({ message: 'O corpo da requisição está vazio' });
    return;
  }

  try {
    if (Array.isArray(dados)) {
      // Criação de múltiplos cursos
      await Promise.all(dados.map((curso) => this.cursoService.criar(curso)));
      res.status(201).json({ message: 'Cursos criados com sucesso' });
    } else {
      // Criação de um único curso
      await this.cursoService.criar(dados);
      res.status(201).json({ message: 'Curso criado com sucesso' });
    }
  } catch (erro: any) {
    res.status(500).json({ message: erro.message });
  }
}



  public async listar(req: Request, res: Response): Promise<void> {
    try {
      const cursos = await this.cursoService.listar();
      res.status(200).json(cursos);
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
      const curso = await this.cursoService.buscar(id);
      res.status(200).json(curso);
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
      await this.cursoService.alterar(id, req.body);
      res.status(200).json({ message: 'Curso alterado com sucesso' });
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
      await this.cursoService.delete(id);
      res.status(200).json({ message: 'Curso excluído com sucesso' });
    } catch (erro: any) {
      res.status(500).json({ message: erro.message });
    }
  }
}
