import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize';
import { AlunoModel } from './aluno_model';
import { CursoModel } from './curso_model';

export class MatriculaModel extends Model {
  private _idMatricula!: number;
  private _idAluno!: number;
  private _idCurso!: number;
  private _statusMatricula!: 'Ativo' | 'Inativo' | 'Cancelado';

  get idMatricula(): number {
    return this._idMatricula;
  }

  set idMatricula(value: number) {
    this._idMatricula = value;
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

  get statusMatricula(): 'Ativo' | 'Inativo' | 'Cancelado' {
    return this._statusMatricula;
  }

  set statusMatricula(value: 'Ativo' | 'Inativo' | 'Cancelado') {
    this._statusMatricula = value;
  }
}

MatriculaModel.init(
  {
    idMatricula: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      comment: 'Identificador numérico da matrícula',
    },
    idAluno: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: 'Referência ao aluno matriculado',
    },
    idCurso: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: 'Referência ao curso matriculado',
    },
    statusMatricula: {
      type: DataTypes.ENUM('Ativo', 'Inativo', 'Cancelado'),
      allowNull: false,
      comment: 'Status da matrícula',
    },
  },
  {
    sequelize,
    modelName: 'MatriculaModel',
    tableName: 'tbl_matricula',
    timestamps: false,
    comment: 'Tabela de matrículas dos alunos nos cursos',
  }
);

// Associações
MatriculaModel.belongsTo(AlunoModel, { foreignKey: 'idAluno' });
MatriculaModel.belongsTo(CursoModel, { foreignKey: 'idCurso' });
