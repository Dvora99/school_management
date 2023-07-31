import { DataTypes } from 'sequelize';
import db from '../config/db';
import User from './userModel';
import { appError } from '../utils/errorHelper';
import errorType from '../utils/errorType';

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
  if(!data) throw new appError(errorType.bad_request, 'Data not found !!');
  if(data.roles !== 'Teacher') throw new appError(errorType.bad_request, 'You can not access this feild');
  value.save();
});

export default Class;