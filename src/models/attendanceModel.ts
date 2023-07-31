import { DataTypes } from 'sequelize';
import db from '../config/db';
import User from './userModel';
// import { appError } from '../utils/errorHelper';
// import errorType from '../utils/errorType';

const Attendance = db.define('Attendance',{
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  studentID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    references: {
      model: User,
      key: 'id'
    }
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});

User.hasOne(Attendance, { foreignKey: 'studentID' });

export default Attendance;