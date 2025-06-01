import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize';

export class CursoModel extends Model {
  private _idCurso!: number;
  private _nomeCurso!: string;
  private _periodoCurso!: string;
  private _turnoCurso!: string;
  private _statusCurso!: 'Ativo' | 'Inativo';

  get idCurso(): number {
    return this._idCurso;
  }

  set idCurso(value: number) {
    this._idCurso = value;
  }

  get nomeCurso(): string {
    return this._nomeCurso;
  }

  set nomeCurso(value: string) {
    this._nomeCurso = value;
  }

  get periodoCurso(): string {
    return this._periodoCurso;
  }

  set periodoCurso(value: string) {
    this._periodoCurso = value;
  }

  get turnoCurso(): string {
    return this._turnoCurso;
  }

  set turnoCurso(value: string) {
    this._turnoCurso = value;
  }

  get statusCurso(): 'Ativo' | 'Inativo' {
    return this._statusCurso;
  }

  set statusCurso(value: 'Ativo' | 'Inativo') {
    this._statusCurso = value;
  }
}

CursoModel.init(
  {
    idCurso: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      comment: 'Identificador numérico do curso',
    },
    nomeCurso: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: 'Nome do curso',
    },
    periodoCurso: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: 'Período do curso (Ex: Semestral, Anual)',
    },
    turnoCurso: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: 'Turno em que o curso é ofertado',
    },
    statusCurso: {
      type: DataTypes.ENUM('Ativo', 'Inativo'),
      allowNull: false,
      comment: 'Status de disponibilidade do curso',
    },
  },
  {
    sequelize,
    modelName: 'CursoModel',
    tableName: 'tbl_curso',
    timestamps: false,
    comment: 'Tabela de cursos disponíveis',
  }
);
