export interface IBoleto {
  idBoleto: number;
  idAluno: number;
  idCurso: number;
  valorBoleto: number;
  vencimentoBoleto: Date;
  statusBoleto: 'Pago' | 'Em aberto' | 'Atrasado';
  linkBoletoPDF: string | null;
}
