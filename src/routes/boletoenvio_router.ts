import express, { Router, Request, Response, NextFunction } from 'express';
import { BoletoController } from '../controllers/boleto_controller';

export class BoletoEnvioRouter {
  public readonly router: Router;
  private boletoController: BoletoController;

  constructor() {
    this.router = express.Router();
    this.boletoController = new BoletoController();

    // Rota para enviar boleto por e-mail
    this.router.post(
      '/:id/enviar-email',
      (req: Request, res: Response, next: NextFunction) => {
        try {
          this.boletoController.enviarEmail(req, res);
        } catch (error) {
          next(error);
        }
      }
    );
  }
}
