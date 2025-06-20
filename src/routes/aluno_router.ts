import express, { Router, Request, Response, NextFunction } from 'express';
import { AlunoController } from '../controllers/aluno_controller';
import { authenticateJWT } from '../middleware/auth';
import { getUserInfo } from '../controllers/getuser_controller';
import { getDocPend } from '../controllers/documento_pendente_controller';
import { getCursoInfo } from '../controllers/getcurso_controller';
import { getBoletosPorCurso } from '../controllers/auth/getboleto';
import { getBoletosPago } from '../controllers/auth/getboletopg';

export class AlunoRouter {
  public readonly router!: Router;
  private alunoController: AlunoController;

  constructor() {
    this.router = express.Router();
    this.alunoController = new AlunoController();

    // Rota para criar usuário
    // this.router.post('/criar', authenticateJWT, (req, res) => {
    this.router.post('/criar', (req, res) => {
      this.alunoController.criar(req, res);
    });

    // Rota para buscar usuário por ID
    this.router.get('/buscar/:id', (req, res) => {
      this.alunoController.buscar(req, res);
    });

    // Rota para listar todos os usuários
    this.router.get('/listar', (req, res) => {
      this.alunoController.listar(req, res);
    });

    // Rota para alterar usuário
    this.router.put('/alterar/:id',  (req, res) => {
      this.alunoController.alterar(req, res);
    });

    // Rota para excluir usuário
    this.router.delete('/excluir/:id', authenticateJWT, (req, res) => {
      this.alunoController.excluir(req, res);
    });

    this.router.get('/user', (req: Request, res: Response, next:NextFunction) => {
      getUserInfo(req, res);
    });
    this.router.get('/curso', (req: Request, res: Response, next:NextFunction) => {
      getCursoInfo(req, res, next);
    });

    this.router.get('/boleto/', (req: Request, res: Response, next:NextFunction) => {
      getBoletosPorCurso(req, res, next);
    });
    this.router.get('/boletopg', (req: Request, res: Response, next:NextFunction) => {
      getBoletosPago(req, res, next);
    });

    this.router.get('/documentos-pendentes', (req: Request, res: Response, next:NextFunction) => {
      getDocPend(req, res);
    });

  }
}
