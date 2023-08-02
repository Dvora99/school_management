import { DataTypes, Model } from 'sequelize';
import db from '../config/db';
import User from './userModel';

interface tokenAttributes extends Model {
  id: number;
  token: string | null;
  roles: string
}

const Token = db.define<tokenAttributes>('Tokens',{
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