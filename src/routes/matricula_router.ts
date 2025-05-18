import express, { Router } from 'express';
import { MatriculaController } from '../controllers/matricula_controller';
import { authenticateJWT } from '../middleware/auth';

export class MatriculaRouter {
  public readonly router!: Router;
  private matriculaController: MatriculaController;

  constructor() {
    this.router = express.Router();
    this.matriculaController = new MatriculaController();

    // Criar matrícula
    this.router.post('/criar', (req, res) => {
      this.matriculaController.criar(req, res);
    });

    // Buscar matrícula por ID
    this.router.get('/buscar/:id', (req, res) => {
      this.matriculaController.buscar(req, res);
    });

    // Listar cursos do usuário logado
    // A rota '/listar' agora chama a função de listar cursos do usuário logado
    this.router.get('/listar',  (req, res) => {
      this.matriculaController.listar(req, res);
    });

    // Alterar matrícula
    this.router.put('/alterar/:id',  (req, res) => {
      this.matriculaController.alterar(req, res);
    });

    // Excluir matrícula
    this.router.delete('/excluir/:id',  (req, res) => {
      this.matriculaController.excluir(req, res);
    });
  }
}
