import { Request, Response } from 'express';
import { UsuarioService } from '../services/aluno_service';

export class UsuarioController {
  private usuarioService: UsuarioService;

  constructor() {
    this.usuarioService = new UsuarioService();
  }

  // public async criar(req: Request, res: Response): Promise<void> {
  //   if (Object.keys(req.body).length === 0) {
  //     res.status(400).json({ message: 'O corpo da requisição está vazio' });
  //     return;
  //   }

  //   try {
  //     await this.usuarioService.criar(req.body);
  //     res.status(201).json({ message: 'Usuário criado com sucesso' });
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
      await Promise.all(dados.map((curso) => this.usuarioService.criar(curso)));
      res.status(201).json({ message: 'Cursos criados com sucesso' });
    } else {
      // Criação de um único curso
      await this.usuarioService.criar(dados);
      res.status(201).json({ message: 'Curso criado com sucesso' });
    }
  } catch (erro: any) {
    res.status(500).json({ message: erro.message });
  }
}




  public async listar(req: Request, res: Response): Promise<void> {
    try {
      const usuarios = await this.usuarioService.listar();
      res.status(200).json(usuarios);
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
      const usuario = await this.usuarioService.buscar(id);
      res.status(200).json(usuario);
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
      await this.usuarioService.alterar(id, req.body);
      res.status(200).json({ message: 'Usuário alterado com sucesso' });
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
      await this.usuarioService.delete(id);
      res.status(200).json({ message: 'Usuário excluído com sucesso' });
    } catch (erro: any) {
      res.status(500).json({ message: erro.message });
    }
  }
}
