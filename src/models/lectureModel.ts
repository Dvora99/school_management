import { DataTypes } from 'sequelize';
import db from '../config/db';
import User from './userModel';
import Class from './classModel';

const Lecture = db.define('Lectures',{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  weekDay: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
  }
}, {
  timestamps: false
});

Class.hasMany(Lecture, { foreignKey: 'class_id' });

export default Lecture;