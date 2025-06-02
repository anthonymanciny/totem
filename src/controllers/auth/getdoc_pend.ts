import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { DocumentoMatriculaModel } from '../../models/documento_matricula_model';
import { MatriculaModel } from '../../models/matriculas_model';
import { DocumentoCursoModel } from '../../models/documento_curso_model';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

export const getDocPend = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header('Token')?.replace('Bearer ', '');

  if (!token) {
    res.status(403).json({ message: 'Token de autenticação não fornecido.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    const idAluno = decoded.idAluno;

    // Buscar documentos pendentes apenas para esse aluno, incluindo nome do documento
    const documentosPendentes = await DocumentoMatriculaModel.findAll({
      where: { statusEntrega: 'Pendente' },
      include: [
        {
          model: MatriculaModel,
          where: { idAluno }, // filtra matrícula do aluno
          attributes: []      // não traz dados da matrícula no resultado
        },
        {
          model: DocumentoCursoModel,
          attributes: ['nomeDocumento'] // traz só o nome do documento
        }
      ],
      attributes: ['idDocumentoMatricula', 'statusEntrega', 'dataEntrega'] // campos que quer da tabela DocumentoMatricula
    });

    if (documentosPendentes.length === 0) {
      res.status(404).json({ message: 'Nenhum documento pendente encontrado para o aluno.' });
      return;
    }

    res.status(200).json({ documentosPendentes });
  } catch (err) {
    res.status(403).json({ message: 'Token inválido.' });
  }
};
