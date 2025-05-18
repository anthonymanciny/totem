import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize';
import { CursoModel } from './curso_model';

export class MatriculaModel extends Model {
  private _idMatricula!: number;
  private _idUsuario!: number;
  private _idCurso!: number;
  private _dataMatricula?: Date;

  get idMatricula(): number {
    return this._idMatricula;
  }
  set idMatricula(value: number) {
    this._idMatricula = value;
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

  get dataMatricula(): Date | undefined {
    return this._dataMatricula;
  }
  set dataMatricula(value: Date | undefined) {
    this._dataMatricula = value;
  }
}

MatriculaModel.init(
  {
    idMatricula: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      comment: 'Identificador da matrícula',
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
    dataMatricula: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
      comment: 'Data da matrícula',
    },
  },
  {
    sequelize,
    modelName: 'MatriculaModel',
    tableName: 'tbl_matricula',
    timestamps: false,
    comment: 'Registra as matrículas dos usuários nos cursos',
    indexes: [
      {
        unique: true,
        name: 'UN_usuario_curso',
        fields: ['idUsuario', 'idCurso'],
      },
    ],
  }
);

