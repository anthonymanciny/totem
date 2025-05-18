import express, { Router } from 'express';
import { CursoController } from '../controllers/curso_controller';
import { authenticateJWT } from '../middleware/auth';

export class CursoRouter {
  public readonly router!: Router;
  private cursoController: CursoController;

  constructor() {
    this.router = express.Router();
    this.cursoController = new CursoController();

    // Rota para criar curso
    this.router.post('/criar', (req, res) => {
      this.cursoController.criar(req, res);
    });

    // Rota para buscar curso por ID
    this.router.get('/buscar/:id', (req, res) => {
      this.cursoController.buscar(req, res);
    });

    // Rota para listar todos os cursos
    this.router.get('/listar', (req, res) => {
      this.cursoController.listar(req, res);
    });

    // Rota para alterar curso
    this.router.put('/alterar/:id',  (req, res) => {
      this.cursoController.alterar(req, res);
    });

    // Rota para excluir curso
    this.router.delete('/excluir/:id',  (req, res) => {
      this.cursoController.excluir(req, res);
    });
  }
}
