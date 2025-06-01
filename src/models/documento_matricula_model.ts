import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize';
import { MatriculaModel } from './matriculas_model';
import { DocumentoCursoModel } from './documento_curso_model';

export class DocumentoMatriculaModel extends Model {
  private _idDocumentoMatricula!: number;
  private _idMatricula!: number;
  private _idDocumentoCurso!: number;
  private _statusEntrega!: 'Entregue' | 'Pendente';
  private _dataEntrega!: Date | null;

  get idDocumentoMatricula(): number {
    return this._idDocumentoMatricula;
  }

  set idDocumentoMatricula(value: number) {
    this._idDocumentoMatricula = value;
  }

  get idMatricula(): number {
    return this._idMatricula;
  }

  set idMatricula(value: number) {
    this._idMatricula = value;
  }

  get idDocumentoCurso(): number {
    return this._idDocumentoCurso;
  }

  set idDocumentoCurso(value: number) {
    this._idDocumentoCurso = value;
  }

  get statusEntrega(): 'Entregue' | 'Pendente' {
    return this._statusEntrega;
  }

  set statusEntrega(value: 'Entregue' | 'Pendente') {
    this._statusEntrega = value;
  }

  get dataEntrega(): Date | null {
    return this._dataEntrega;
  }

  set dataEntrega(value: Date | null) {
    this._dataEntrega = value;
  }
}

DocumentoMatriculaModel.init(
  {
    idDocumentoMatricula: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      comment: 'Identificador do documento entregue na matrícula',
    },
    idMatricula: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: 'Referência à matrícula do aluno',
    },
    idDocumentoCurso: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: 'Referência ao documento exigido pelo curso',
    },
    statusEntrega: {
      type: DataTypes.ENUM('Entregue', 'Pendente'),
      allowNull: false,
      defaultValue: 'Pendente',
      comment: 'Status da entrega do documento',
    },
    dataEntrega: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: 'Data em que o documento foi entregue',
    },
  },
  {
    sequelize,
    modelName: 'DocumentoMatriculaModel',
    tableName: 'tbl_documento_matricula',
    timestamps: false,
    comment: 'Tabela de documentos entregues no ato da matrícula',
  }
);

// Associações (opcionais)
DocumentoMatriculaModel.belongsTo(MatriculaModel, { foreignKey: 'idMatricula' });
DocumentoMatriculaModel.belongsTo(DocumentoCursoModel, { foreignKey: 'idDocumentoCurso' });
