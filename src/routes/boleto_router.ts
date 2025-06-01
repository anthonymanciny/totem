import express, { Router, Request, Response, NextFunction } from 'express';
import { BoletoController } from '../controllers/boleto_controller';
import { authenticateJWT } from '../middleware/auth';

export class BoletoRouter {
  public readonly router!: Router;
  private boletoController: BoletoController;

  constructor() {
    this.router = express.Router();
    this.boletoController = new BoletoController();

    // Rota para criar boleto (ou vários)
    this.router.post('/criar', (req: Request, res: Response) => {
      this.boletoController.criar(req, res);
    });

    // Rota para buscar boleto por ID
    this.router.get('/buscar/:id', (req: Request, res: Response) => {
      this.boletoController.buscar(req, res);
    });

    // Rota para listar todos os boletos
    this.router.get('/listar', (req: Request, res: Response) => {
      this.boletoController.listar(req, res);
    });

    // Rota para alterar boleto por ID
    this.router.put('/alterar/:id', (req: Request, res: Response) => {
      this.boletoController.alterar(req, res);
    });

    // Rota para excluir boleto por ID (com autenticação)
    this.router.delete('/excluir/:id', authenticateJWT, (req: Request, res: Response) => {
      this.boletoController.excluir(req, res);
    });
  }
}
