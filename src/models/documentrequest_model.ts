// models/DocumentRequest.ts
import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize';

const DocumentRequest = sequelize.define('DocumentRequest', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  documentId: { type: DataTypes.INTEGER, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  additionalInfo: { type: DataTypes.TEXT },
  status: {
    type: DataTypes.ENUM(
      'Em Análise pela Secretaria',
      'Gerado',
      'Enviado por E-mail',
      'Pronto para Retirada',
      'Concluído',
      'Recusado'
    ),
    defaultValue: 'Em Análise pela Secretaria'
  }
});

export default DocumentRequest;
