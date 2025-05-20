import { DataTypes, Model, Optional } from 'sequelize';
import bcrypt from 'bcryptjs';
import { sequelize } from './index';

interface AdminAttributes {
  id: number;
  email: string;
  senhaHash: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type AdminCreationAttributes = Optional<AdminAttributes, 'id'>;

export class Admin extends Model<AdminAttributes, AdminCreationAttributes> implements AdminAttributes {
  declare id: number;
  declare email: string;
  declare senhaHash: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  verificarSenha(senha: string): Promise<boolean> {
    return bcrypt.compare(senha, this.senhaHash);
  }
}

Admin.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    senhaHash: { type: DataTypes.STRING, allowNull: false }
  },
  {
    sequelize,
    modelName: 'Admin',
    tableName: 'admins',
    timestamps: true
  }
);
