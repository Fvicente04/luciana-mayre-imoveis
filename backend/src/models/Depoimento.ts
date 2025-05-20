import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './index';

interface DepoimentoAttributes {
  id: number;
  nomeCliente: string;
  texto: string;
  nota: number;
  ativo: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

type DepoimentoCreationAttributes = Optional<DepoimentoAttributes, 'id' | 'ativo'>;

export class Depoimento extends Model<DepoimentoAttributes, DepoimentoCreationAttributes> implements DepoimentoAttributes {
  declare id: number;
  declare nomeCliente: string;
  declare texto: string;
  declare nota: number;
  declare ativo: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Depoimento.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nomeCliente: { type: DataTypes.STRING, allowNull: false },
    texto: { type: DataTypes.TEXT, allowNull: false },
    nota: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
    ativo: { type: DataTypes.BOOLEAN, defaultValue: true }
  },
  {
    sequelize,
    modelName: 'Depoimento',
    tableName: 'depoimentos',
    timestamps: true
  }
);
