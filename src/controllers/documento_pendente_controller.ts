import { Request, Response } from 'express';
import { buscarDocumentosPendentes } from '../services/documento_pendente_service';

export const getDocPend = async (req: Request, res: Response): Promise<void> => {
  const rawToken = req.header('Token');
  const token = rawToken?.startsWith('Bearer ') ? rawToken.replace('Bearer ', '') : rawToken;

  try {
    const documentosPendentes = await buscarDocumentosPendentes(token || '');

    if (documentosPendentes.length === 0) {
      res.status(404).json({ message: 'Nenhum documento pendente encontrado para o aluno.' });
      return;
    }

    res.status(200).json({ documentosPendentes });
  } catch (error: any) {
    res.status(403).json({ message: error.message || 'Token inválido.' });
  }
};
