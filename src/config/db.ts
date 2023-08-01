import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config();

const db = new Sequelize('school_management', 'sarvadhi', 'password' ,{
  port: 5433,
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

db.sync({ alter: true });

export default db;