import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize';

export class AlunoModel extends Model {
  private _idAluno!: number;
  private _nomeAluno!: string;
  private _cpfAluno!: string;
  private _emailAluno!: string;
  private _senhaHash!: string;
  private _biometriaID!: string | null;
  private _statusAtivo!: 'Ativo' | 'Inativo';

  get idAluno(): number {
    return this._idAluno;
  }

  set idAluno(value: number) {
    this._idAluno = value;
  }

  get nomeAluno(): string {
    return this._nomeAluno;
  }

  set nomeAluno(value: string) {
    this._nomeAluno = value;
  }

  get cpfAluno(): string {
    return this._cpfAluno;
  }

  set cpfAluno(value: string) {
    this._cpfAluno = value;
  }

  get emailAluno(): string {
    return this._emailAluno;
  }

  set emailAluno(value: string) {
    this._emailAluno = value;
  }

  get senhaHash(): string {
    return this._senhaHash;
  }

  set senhaHash(value: string) {
    this._senhaHash = value;
  }

  get biometriaID(): string | null {
    return this._biometriaID;
  }

  set biometriaID(value: string | null) {
    this._biometriaID = value;
  }

  get statusAtivo(): 'Ativo' | 'Inativo' {
    return this._statusAtivo;
  }

  set statusAtivo(value: 'Ativo' | 'Inativo') {
    this._statusAtivo = value;
  }
}

AlunoModel.init(
  {
    idAluno: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      comment: 'Identificador numérico do aluno',
    },
    nomeAluno: {
      type: DataTypes.STRING(150),
      allowNull: false,
      comment: 'Nome completo do aluno',
    },
    cpfAluno: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: true,
      comment: 'CPF do aluno',
    },
    emailAluno: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      comment: 'E-mail do aluno',
    },
    senhaHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: 'Senha em hash do aluno',
    },
    biometriaID: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'ID de biometria do aluno (opcional)',
    },
    statusAtivo: {
      type: DataTypes.ENUM('Ativo', 'Inativo'),
      allowNull: false,
      comment: 'Status do aluno no sistema',
    },
  },
  {
    sequelize,
    modelName: 'AlunoModel',
    tableName: 'tbl_aluno',
    timestamps: false,
    comment: 'Tabela de alunos cadastrados no sistema',
  }
);
