import { Router } from 'express';
import { AuthRouter } from './auth-route';
import { AlunoRouter } from './aluno_router';
import { BoletoRouter } from './boleto_router';
import { CursoRouter } from './curso_router';
import { DocumentoCursoRouter } from './documento_curso_router';
import { DocumentoMatriculaRouter } from './documento_matricula_router';
import { MatriculaRouter } from './matricula_router';
import { TokenRouter } from './token_router';

// import { UploadRouter } from './upload-routes';

const router = Router();

// Instanciando os routers
const authRouter = new AuthRouter();
const alunoRouter = new AlunoRouter();
const boletoRouter = new BoletoRouter();
const cursoRouter = new CursoRouter();
const documentocursoRouter = new DocumentoCursoRouter();
const documentomatriculaRouter = new DocumentoMatriculaRouter();
const matriculaRouter = new MatriculaRouter();
const tokenRouter = new TokenRouter();


// Registrando as rotas
router.use('/auth', authRouter.router);
router.use('/alunos', alunoRouter.router);
router.use('/boletos', boletoRouter.router);
router.use('/cursos', cursoRouter.router);
router.use('/doc_curso', documentocursoRouter.router);
router.use('/doc_matricula', documentomatriculaRouter.router);
router.use('/matriculas', matriculaRouter.router);
router.use('/token',tokenRouter.router);





export default router;
