import express, { Router, Request, Response, NextFunction } from 'express';
import { requestTokenController,validateTokenController } from '../controllers/_token_controller';

export class TokenRouter {
  public readonly router: Router;

  constructor() {
    this.router = express.Router();

    this.router.post('/request-token', (req: Request, res: Response, next: NextFunction) => {
      requestTokenController(req, res).catch(next); // tratando erro async
    });

    this.router.post('/validate-token', (req: Request, res: Response, next: NextFunction) => {
      try {
        validateTokenController(req, res);
      } catch (error) {
        next(error);
      }
    });
  }
}
