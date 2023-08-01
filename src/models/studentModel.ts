import { DataTypes } from 'sequelize';
import db from '../config/db';
import User from './userModel';
import Class from './classModel';
import { appError } from '../utils/errorHelper';
import errorType from '../utils/errorType';

const Student = db.define('Students',{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  teacher_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    },
    validate: {
      notEmpty: true
    }
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: {
      name: '',
      msg: 'Student already assign !!'
    },
    references: {
      model: User,
      key: 'id'
    },
    validate: {
      notEmpty: true
    }
  },
  class_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Class,
      key: 'id'
    },
    validate: {
      notEmpty: true
    }
  }
}, {
  timestamps: false
});

Class.hasMany(Student, { foreignKey: 'class_id' });
User.hasMany(Student, { foreignKey: 'teacher_id' });
User.hasOne(Student, { foreignKey: 'student_id' });

Student.belongsTo(User, { foreignKey: 'teacher_id' });
Student.belongsTo(User, { foreignKey: 'student_id', as:'Student'});
Student.belongsTo(Class, { foreignKey: 'class_id', as: 'Class' });

Student.beforeValidate(async(values:any) => {
  const classdata = await Class.findByPk(values.class_id);
  if(!classdata) throw new appError(errorType.bad_request, 'Class not found... please enter valid class...');

  const data:any = await User.findByPk(values.student_id);
  if(data.roles === 'Student') return;
  throw new appError(errorType.bad_request, 'Student not found..Please check one more time....');
});

export default Student;