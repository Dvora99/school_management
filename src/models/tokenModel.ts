import { DataTypes } from 'sequelize';
import db from '../config/db';
import User from './userModel';

const Token = db.define('Tokens',{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

User.hasOne(Token);

export default Token;