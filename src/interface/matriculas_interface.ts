export interface IMatricula {
  idMatricula: number;
  idAluno: number;
  idCurso: number;
  statusMatricula: 'Ativo' | 'Inativo' | 'Cancelado';
}
