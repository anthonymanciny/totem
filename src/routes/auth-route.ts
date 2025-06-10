import express, { Router, Request, Response } from 'express';
import { registro } from '../controllers/registro_controller';

import { login } from '../controllers/login_controller';
// import { login } from '../controllers/auth/login-controller';
import {authenticateJWT}  from '../middleware/auth';

export class AuthRouter {
    public readonly router!: Router;

    constructor() {
        this.router = express.Router();

        // Rota de registro
        this.router.post('/registro', (req, res) => {
            registro(req, res);
        });

        // Rota de login
        this.router.post('/login', (req, res) => {
            login(req, res);
        });

        // Rota de dashboard com autenticação
        this.router.get('/dashboard', (req: Request, res: Response) => {
            res.send('Bem-vindo ao Dashboard');
        });
    }
}
