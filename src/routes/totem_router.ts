import { Router } from 'express';
import { UsuarioRouter } from './usuario_router';
import { CursoRouter } from './curso_router';
import { MatriculaRouter } from './matricula_router';
import { AuthRouter } from './auth-route';

// import { UploadRouter } from './upload-routes';

const router = Router();

// Instanciando os routers
const usuarioRouter = new UsuarioRouter();
const cursoRouter = new CursoRouter();
const matriculaRouter = new MatriculaRouter();
const authRouter = new AuthRouter();


// Registrando as rotas
router.use('/usuarios', usuarioRouter.router);
router.use('/cursos', cursoRouter.router);
router.use('/matriculas', matriculaRouter.router);
router.use('/auth', authRouter.router);





export default router;
