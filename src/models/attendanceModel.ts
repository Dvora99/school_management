import { DataTypes } from 'sequelize';
import db from '../config/db';
import User from './userModel';
import * as dateFormate from '../utils/dateFormate';

const Attendance = db.define('Attendance',{
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
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
    type: DataTypes.ENUM,
    allowNull: false,
    values: [ 'absent','present' ]
  }
}, {
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: [ 'studentID', 'date' ]
    }
  ]
});

User.hasOne(Attendance, { foreignKey: 'studentID' });

Attendance.beforeValidate((value:any) => {
  value.date = dateFormate.DATE;
});

export default Attendance;