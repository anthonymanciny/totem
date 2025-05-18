import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize';

export class MensalidadeModel extends Model {
  private _idMensalidade!: number;
  private _idUsuario!: number;
  private _idCurso!: number;
  private _mesReferencia!: Date;
  private _valorMensalidade!: number;
  private _statusPagamento!: 'pendente' | 'pago' | 'atrasado';
  private _vencimento!: Date;
  private _dataPagamento?: Date | null;
  private _boletoUrl?: string | null;
  private _pixQrCode?: string | null;

  get idMensalidade(): number {
    return this._idMensalidade;
  }
  set idMensalidade(value: number) {
    this._idMensalidade = value;
  }

  get idUsuario(): number {
    return this._idUsuario;
  }
  set idUsuario(value: number) {
    this._idUsuario = value;
  }

  get idCurso(): number {
    return this._idCurso;
  }
  set idCurso(value: number) {
    this._idCurso = value;
  }

  get mesReferencia(): Date {
    return this._mesReferencia;
  }
  set mesReferencia(value: Date) {
    this._mesReferencia = value;
  }

  get valorMensalidade(): number {
    return this._valorMensalidade;
  }
  set valorMensalidade(value: number) {
    this._valorMensalidade = value;
  }

  get statusPagamento(): 'pendente' | 'pago' | 'atrasado' {
    return this._statusPagamento;
  }
  set statusPagamento(value: 'pendente' | 'pago' | 'atrasado') {
    this._statusPagamento = value;
  }

  get vencimento(): Date {
    return this._vencimento;
  }
  set vencimento(value: Date) {
    this._vencimento = value;
  }

  get dataPagamento(): Date | null | undefined {
    return this._dataPagamento;
  }
  set dataPagamento(value: Date | null | undefined) {
    this._dataPagamento = value;
  }

  get boletoUrl(): string | null | undefined {
    return this._boletoUrl;
  }
  set boletoUrl(value: string | null | undefined) {
    this._boletoUrl = value;
  }

  get pixQrCode(): string | null | undefined {
    return this._pixQrCode;
  }
  set pixQrCode(value: string | null | undefined) {
    this._pixQrCode = value;
  }
}

MensalidadeModel.init(
  {
    idMensalidade: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      comment: 'Identificador da mensalidade',
    },
    idUsuario: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: 'Referência ao estudante',
    },
    idCurso: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: 'Referência ao curso',
    },
    mesReferencia: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: 'Mês de referência da mensalidade',
    },
    valorMensalidade: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: 'Valor da mensalidade',
    },
    statusPagamento: {
      type: DataTypes.ENUM('pendente', 'pago', 'atrasado'),
      allowNull: false,
      defaultValue: 'pendente',
      comment: 'Status de pagamento',
    },
    vencimento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: 'Data de vencimento',
    },
    dataPagamento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: 'Data do pagamento, se houver',
    },
    boletoUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'URL para o boleto gerado',
    },
    pixQrCode: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'QR Code Pix para pagamento',
    },
  },
  {
    sequelize,
    modelName: 'MensalidadeModel',
    tableName: 'tbl_mensalidade',
    timestamps: false,
    comment: 'Tabela de mensalidades por usuário e curso',
  }
);
