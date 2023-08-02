import { DataTypes, Model } from 'sequelize';
import db from '../config/db';
import User from './userModel';
import * as dateFormate from '../utils/dateFormate';
import { appError } from '../utils/errorHelper';
import errorType from '../utils/errorType';

interface reportAttributes extends Model {
  description: string;
  timestamps: string;
  student_id: number;
  teacher_id: number;
}

const Report = db.define<reportAttributes>('Reports',{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  teacher_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  timestamps: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

User.hasMany(Report, { foreignKey: 'teacher_id' });
User.hasMany(Report, { foreignKey: 'student_id' });

Report.beforeValidate(async value => {
  value.timestamps = dateFormate.TIMESTAPS;

  const data = await User.findByPk(value.student_id);
  if(!data) throw new appError(errorType.bad_request, 'Data not found !!');
  if(data.roles === 'Student') return;
  throw new appError(errorType.bad_request, 'You only can Report to students !!');
});

export default Report;