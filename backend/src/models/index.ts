import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL!;

const isProduction = process.env.NODE_ENV === 'production';

export const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false,
  ...(isProduction && {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  })
});
