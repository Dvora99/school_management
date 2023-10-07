import { Dialect, Sequelize } from 'sequelize';
import { config } from 'dotenv';

config();

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT as Dialect,
      logging: false,
  },
);

db.sync({ alter: true });

export default db;