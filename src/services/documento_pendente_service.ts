import jwt from 'jsonwebtoken';
import { MatriculaModel } from '../models/matriculas_model';
import { DocumentoCursoModel } from '../models/documento_curso_model';
import { DocumentoMatriculaModel } from '../models/documento_matricula_model';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

export const buscarDocumentosPendentes = async (token: string) => {
  if (!token) {
    throw new Error('Token de autenticação não fornecido.');
  }

  const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
  const idAluno = decoded.idAluno;

  const documentosPendentes = await DocumentoMatriculaModel.findAll({
    where: { statusEntrega: 'Pendente' },
    include: [
      {
        model: MatriculaModel,
        where: { idAluno },
        attributes: []
      },
      {
        model: DocumentoCursoModel,
        attributes: ['nomeDocumento']
      }
    ],
    attributes: ['statusEntrega']
  });

  return documentosPendentes;
};
