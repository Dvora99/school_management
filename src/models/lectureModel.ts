import { DataTypes, Model } from 'sequelize';
import db from '../config/db';
import Class from './classModel';
import * as dateFormate from '../utils/dateFormate';

interface lectureAttributes extends Model {
  date: string;
  weekDay: string;
  time: string;
}

const Lecture = db.define<lectureAttributes>('Lectures',{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
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

Lecture.beforeValidate(value => {
  value.date = dateFormate.DATE;
});

export default Lecture;