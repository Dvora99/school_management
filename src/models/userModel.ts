import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
import db from '../config/db';

interface userAttributes extends Model {
  id: number;
  userName: string;
  password: string;
  roles: 'Principal' | 'Teacher' | 'Student';
}

const User = db.define<userAttributes>('Users',{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      name: '',
      msg: 'Username already registred !!'
    },
    validate: {
      notEmpty: {
        msg: 'Please enter your username'
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Please enter your password'
      },
      len: {
        args: [ 5, 10 ],
        msg: 'Password length must be from 5 to 10 !!!!'
      }
    }
  },
  roles: {
    type: DataTypes.ENUM,
    values: [ 'Principal', 'Teacher', 'Student' ],
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Please enter your role'
      }
    }
  }
});

User.afterValidate(async user => {
  user.password = await bcrypt.hashSync(user.password, 10);
});

export default User;