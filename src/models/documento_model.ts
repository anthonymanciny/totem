// models/Document.ts
import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize';

const Document = sequelize.define('Document', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  deliveryType: { 
    type: DataTypes.ENUM('automatic', 'manual'), 
    allowNull: false 
  }
});

export default Document;
