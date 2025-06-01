import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize';
import { AlunoModel } from './aluno_model';
import { CursoModel } from './curso_model';

export class BoletoModel extends Model {
  private _idBoleto!: number;
  private _idAluno!: number;
  private _idCurso!: number;
  private _valorBoleto!: number;
  private _vencimentoBoleto!: Date;
  private _statusBoleto!: 'Pago' | 'Em aberto' | 'Atrasado';
  private _linkBoletoPDF!: string | null;

  get idBoleto(): number {
    return this._idBoleto;
  }

  set idBoleto(value: number) {
    this._idBoleto = value;
  }

  get idAluno(): number {
    return this._idAluno;
  }

  set idAluno(value: number) {
    this._idAluno = value;
  }

  get idCurso(): number {
    return this._idCurso;
  }

  set idCurso(value: number) {
    this._idCurso = value;
  }

  get valorBoleto(): number {
    return this._valorBoleto;
  }

  set valorBoleto(value: number) {
    this._valorBoleto = value;
  }

  get vencimentoBoleto(): Date {
    return this._vencimentoBoleto;
  }

  set vencimentoBoleto(value: Date) {
    this._vencimentoBoleto = value;
  }

  get statusBoleto(): 'Pago' | 'Em aberto' | 'Atrasado' {
    return this._statusBoleto;
  }

  set statusBoleto(value: 'Pago' | 'Em aberto' | 'Atrasado') {
    this._statusBoleto = value;
  }

  get linkBoletoPDF(): string | null {
    return this._linkBoletoPDF;
  }

  set linkBoletoPDF(value: string | null) {
    this._linkBoletoPDF = value;
  }
}

BoletoModel.init(
  {
    idBoleto: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      comment: 'Identificador numérico do boleto',
    },
    idAluno: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: 'Referência ao aluno que deve pagar o boleto',
    },
    idCurso: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: 'Referência ao curso relacionado ao boleto',
    },
    valorBoleto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: 'Valor do boleto',
    },
    vencimentoBoleto: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: 'Data de vencimento do boleto',
    },
    statusBoleto: {
      type: DataTypes.ENUM('Pago', 'Em aberto', 'Atrasado'),
      allowNull: false,
      comment: 'Status de pagamento do boleto',
    },
    linkBoletoPDF: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: 'Link para download do boleto em PDF',
    },
  },
  {
    sequelize,
    modelName: 'BoletoModel',
    tableName: 'tbl_boleto',
    timestamps: false,
    comment: 'Tabela de boletos gerados para os alunos',
  }
);

// Associações (opcional, se estiver utilizando relacionamentos no Sequelize)
BoletoModel.belongsTo(AlunoModel, { foreignKey: 'idAluno' });
BoletoModel.belongsTo(CursoModel, { foreignKey: 'idCurso' });
