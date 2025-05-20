import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './index';

interface ImovelAttributes {
  id: number;
  titulo: string;
  slug: string;
  tipo: 'apartamento' | 'casa' | 'studio' | 'comercial' | 'terreno';
  finalidade: 'venda' | 'aluguel';
  preco: number;
  condominio: number | null;
  iptu: number | null;
  area: number;
  quartos: number;
  banheiros: number;
  suites: number;
  vagas: number;
  andar: number | null;
  descricao: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  latitude: number | null;
  longitude: number | null;
  destaque: boolean;
  ativo: boolean;
  fotos: string[];
  fotoPrincipal: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

type ImovelCreationAttributes = Optional<ImovelAttributes, 'id' | 'condominio' | 'iptu' | 'andar' | 'latitude' | 'longitude' | 'destaque' | 'ativo'>;

export class Imovel extends Model<ImovelAttributes, ImovelCreationAttributes> implements ImovelAttributes {
  declare id: number;
  declare titulo: string;
  declare slug: string;
  declare tipo: 'apartamento' | 'casa' | 'studio' | 'comercial' | 'terreno';
  declare finalidade: 'venda' | 'aluguel';
  declare preco: number;
  declare condominio: number | null;
  declare iptu: number | null;
  declare area: number;
  declare quartos: number;
  declare banheiros: number;
  declare suites: number;
  declare vagas: number;
  declare andar: number | null;
  declare descricao: string;
  declare endereco: string;
  declare bairro: string;
  declare cidade: string;
  declare estado: string;
  declare cep: string;
  declare latitude: number | null;
  declare longitude: number | null;
  declare destaque: boolean;
  declare ativo: boolean;
  declare fotos: string[];
  declare fotoPrincipal: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;
}

Imovel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    titulo: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    tipo: {
      type: DataTypes.ENUM('apartamento', 'casa', 'studio', 'comercial', 'terreno'),
      allowNull: false
    },
    finalidade: {
      type: DataTypes.ENUM('venda', 'aluguel'),
      allowNull: false
    },
    preco: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    condominio: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    iptu: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    area: { type: DataTypes.DECIMAL(8, 2), allowNull: false },
    quartos: { type: DataTypes.INTEGER, allowNull: false },
    banheiros: { type: DataTypes.INTEGER, allowNull: false },
    suites: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    vagas: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    andar: { type: DataTypes.INTEGER, allowNull: true },
    descricao: { type: DataTypes.TEXT, allowNull: false },
    endereco: { type: DataTypes.STRING, allowNull: false },
    bairro: { type: DataTypes.STRING, allowNull: false },
    cidade: { type: DataTypes.STRING, allowNull: false },
    estado: { type: DataTypes.STRING(2), allowNull: false },
    cep: { type: DataTypes.STRING(9), allowNull: false },
    latitude: { type: DataTypes.DECIMAL(10, 8), allowNull: true },
    longitude: { type: DataTypes.DECIMAL(11, 8), allowNull: true },
    destaque: { type: DataTypes.BOOLEAN, defaultValue: false },
    ativo: { type: DataTypes.BOOLEAN, defaultValue: true },
    fotos: { type: DataTypes.ARRAY(DataTypes.TEXT), defaultValue: [] },
    fotoPrincipal: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' }
  },
  {
    sequelize,
    modelName: 'Imovel',
    tableName: 'imoveis',
    paranoid: true,
    timestamps: true
  }
);
