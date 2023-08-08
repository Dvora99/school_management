import { DataTypes, Model } from 'sequelize';
import { notFoundmessage } from '../middleware/responseHandle';
import db from '../config/db';
import User from './userModel';
import { appError } from '../utils/errorHelper';
import errorType from '../utils/errorType';
import { ROLES } from '../constant/role';

interface classAttributes extends Model {
  name: string;
  grade: string;
  classTeacher: number;
}

const Class = db.define<classAttributes>('Class',{
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
    unique: {
      name: '',
      msg: 'Teacher already assigned....'
    },
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

Class.beforeValidate(async value => {
  const data = await User.findByPk(value.classTeacher);
  if(!data) throw new appError(errorType.bad_request, notFoundmessage('Data'));
  if(data.roles === ROLES.TEACHER) return;
  throw new appError(errorType.bad_request, 'Please select teachers...');
});

export default Class;