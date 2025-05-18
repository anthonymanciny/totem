import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize';
import { MatriculaModel } from './matricula_model';

export class CursoModel extends Model {
  private _idCurso!: number;
  private _nomeCurso!: string;
  private _descricaoCurso?: string;

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

  get descricaoCurso(): string | undefined {
    return this._descricaoCurso;
  }

  set descricaoCurso(value: string | undefined) {
    this._descricaoCurso = value;
  }
}

CursoModel.init(
  {
    idCurso: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      comment: 'Identificador do curso',
    },
    nomeCurso: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: 'Nome do curso',
    },
    descricaoCurso: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Descrição do curso',
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

