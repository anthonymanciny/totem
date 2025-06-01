export interface IDocumentoMatricula {
  idDocumentoMatricula: number;
  idMatricula: number;
  idDocumentoCurso: number;
  statusEntrega: 'Entregue' | 'Pendente';
  dataEntrega: Date;
}
