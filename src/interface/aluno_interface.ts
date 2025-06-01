export interface IAluno {
  idAluno: number;
  nomeAluno: string;
  cpfAluno: string;
  emailAluno: string;
  senhaAluno: string;
  biometriaID?: string;
  statusAtivo: 'Ativo' | 'Inativo';
}
