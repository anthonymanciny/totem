export interface IMatricula {
  idMatricula: number;      // Opcional, pois será gerado automaticamente
  idUsuario: number;         // ID do usuário que está se matriculando
  idCurso: number;           // ID do curso no qual o usuário está se matriculando
  dataMatricula: Date;      // Opcional, pode ser atribuída automaticamente
}
