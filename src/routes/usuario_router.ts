import express, { Router, Request, Response, NextFunction } from 'express';
import { UsuarioController } from '../controllers/usuario_controller';
import { authenticateJWT } from '../middleware/auth';
import { getUserInfo } from '../controllers/auth/getuser';
import { getCursoInfo } from '../controllers/auth/getcurso';

export class UsuarioRouter {
  public readonly router!: Router;
  private usuarioController: UsuarioController;

  constructor() {
    this.router = express.Router();
    this.usuarioController = new UsuarioController();

    // Rota para criar usuário
    // this.router.post('/criar', authenticateJWT, (req, res) => {
    this.router.post('/criar', (req, res) => {
      this.usuarioController.criar(req, res);
    });

    // Rota para buscar usuário por ID
    this.router.get('/buscar/:id', (req, res) => {
      this.usuarioController.buscar(req, res);
    });

    // Rota para listar todos os usuários
    this.router.get('/listar', (req, res) => {
      this.usuarioController.listar(req, res);
    });

    // Rota para alterar usuário
    this.router.put('/alterar/:id',  (req, res) => {
      this.usuarioController.alterar(req, res);
    });

    // Rota para excluir usuário
    this.router.delete('/excluir/:id', authenticateJWT, (req, res) => {
      this.usuarioController.excluir(req, res);
    });

    this.router.get('/user', (req: Request, res: Response, next:NextFunction) => {
      getUserInfo(req, res, next);
    });
    this.router.get('/curso', (req: Request, res: Response, next:NextFunction) => {
      getCursoInfo(req, res, next);
    });

  }
}
