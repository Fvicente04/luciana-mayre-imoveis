import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './index';

interface LeadAttributes {
  id: number;
  nomeContato: string;
  telefone: string;
  mensagem: string;
  imovelId: number | null;
  imovelTitulo: string | null;
  canal: 'formulario' | 'whatsapp';
  createdAt?: Date;
  updatedAt?: Date;
}

type LeadCreationAttributes = Optional<LeadAttributes, 'id' | 'imovelId' | 'imovelTitulo'>;

export class Lead extends Model<LeadAttributes, LeadCreationAttributes> implements LeadAttributes {
  declare id: number;
  declare nomeContato: string;
  declare telefone: string;
  declare mensagem: string;
  declare imovelId: number | null;
  declare imovelTitulo: string | null;
  declare canal: 'formulario' | 'whatsapp';
  declare createdAt: Date;
  declare updatedAt: Date;
}

Lead.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nomeContato: { type: DataTypes.STRING, allowNull: false },
    telefone: { type: DataTypes.STRING, allowNull: false },
    mensagem: { type: DataTypes.TEXT, allowNull: false },
    imovelId: { type: DataTypes.INTEGER, allowNull: true },
    imovelTitulo: { type: DataTypes.STRING, allowNull: true },
    canal: {
      type: DataTypes.ENUM('formulario', 'whatsapp'),
      allowNull: false,
      defaultValue: 'formulario'
    }
  },
  {
    sequelize,
    modelName: 'Lead',
    tableName: 'leads',
    timestamps: true
  }
);
