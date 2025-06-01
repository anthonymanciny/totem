import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize';
import { CursoModel } from './curso_model';

export class DocumentoCursoModel extends Model {
  private _idDocumentoCurso!: number;
  private _idCurso!: number;
  private _nomeDocumento!: string;

  get idDocumentoCurso(): number {
    return this._idDocumentoCurso;
  }

  set idDocumentoCurso(value: number) {
    this._idDocumentoCurso = value;
  }

  get idCurso(): number {
    return this._idCurso;
  }

  set idCurso(value: number) {
    this._idCurso = value;
  }

  get nomeDocumento(): string {
    return this._nomeDocumento;
  }

  set nomeDocumento(value: string) {
    this._nomeDocumento = value;
  }
}

DocumentoCursoModel.init(
  {
    idDocumentoCurso: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      comment: 'Identificador do documento vinculado ao curso',
    },
    idCurso: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: 'Referência ao curso que exige o documento',
    },
    nomeDocumento: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: 'Nome do documento exigido pelo curso',
    },
  },
  {
    sequelize,
    modelName: 'DocumentoCursoModel',
    tableName: 'tbl_documento_curso',
    timestamps: false,
    comment: 'Tabela de documentos obrigatórios por curso',
  }
);

// Associação (opcional)
DocumentoCursoModel.belongsTo(CursoModel, { foreignKey: 'idCurso' });
