import { DataTypes } from 'sequelize';
import db from '../config/db';
import User from './userModel';

const Class = db.define('Class',{
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  grade: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  classTeacher: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    references: {
      model: User,
      key: 'id'
    }
  }
});

User.hasMany(Class, { foreignKey: 'classTeacher' });

Class.beforeCreate(async (value:any) => {
  const data:any = await User.findByPk(value.classTeacher);
  if(data.roles !== 'Principal') throw new Error('Not valid');
  value.save();
});

export default Class;