import express, { Router, Request, Response } from 'express';
import { AuthController } from '../controllers/logintoken_controller';

export class LoginTokenRouter {
  public readonly router!: Router;
  private authController: typeof AuthController;

  constructor() {
    this.router = express.Router();
    this.authController = AuthController;

    // Solicitar token por CPF
    this.router.post('/request-token', (req: Request, res: Response) => {
      this.authController.solicitarToken(req, res);
    });

    // Validar login com CPF e token
    this.router.post('/validate-token', (req: Request, res: Response) => {
      this.authController.validarLogin(req, res);
    });

    // Reenviar token
    this.router.post('/resend-token', (req: Request, res: Response) => {
      this.authController.reenviarToken(req, res);
    });
  }
}
