import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize';
import { MatriculaModel } from './matricula_model';

export class UsuarioModel extends Model {
  private _idUsuario!: number;
  private _nomeUsuario!: string;
  private _emailUsuario!: string;
  private _senhaUsuario!: string;

  get idUsuario(): number {
    return this._idUsuario;
  }

  set idUsuario(value: number) {
    this._idUsuario = value;
  }

  get nomeUsuario(): string {
    return this._nomeUsuario;
  }

  set nomeUsuario(value: string) {
    this._nomeUsuario = value;
  }

  get emailUsuario(): string {
    return this._emailUsuario;
  }

  set emailUsuario(value: string) {
    this._emailUsuario = value;
  }

  get senhaUsuario(): string {
    return this._senhaUsuario;
  }

  set senhaUsuario(value: string) {
    this._senhaUsuario = value;
  }
}

UsuarioModel.init(
  {
    idUsuario: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      comment: 'Identificador numérico',
    },
    nomeUsuario: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: 'Nome do usuário',
    },
    emailUsuario: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      comment: 'Nome do usuário para acessar o sistema',
    },
    senhaUsuario: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: 'banco1234',
      comment: 'Senha do usuário para acessar o sistema',
    },
  },
  {
    sequelize,
    modelName: 'UsuarioModel',
    tableName: 'tbl_usuario',
    timestamps: false,
    comment: 'Define as pessoas que poderão utilizar o sistema',
  }
);

