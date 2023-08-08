import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import User from '../models/userModel';
import Token from '../models/tokenModel';
import { SUCCESS, notFoundmessage } from '../middleware/responseHandle';
import { appError } from '../utils/errorHelper';
import errorType from '../utils/errorType';

config();

class userController {

  userInsert = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await User.create(req.body);
      return SUCCESS(res, data);
    } catch (err) {
      return next(err);
    }
  };

  userDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = await User.destroy({ where: { id }});
      if(!data) throw new appError(errorType.not_found, notFoundmessage('Data'));
      return SUCCESS(res, data);
    }
    catch (err) {
      return next(err);
    }
  };

  userUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const checkData = await User.findByPk(id);
      if(!checkData) throw new appError(errorType.not_found, notFoundmessage('Data'));
      const data = await User.update(req.body, { where: { id }, returning: true });
      return SUCCESS(res, data);
    }
    catch (err) {
      return next(err);
    }
  };

  userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userName, password } = req.body;
      const data = await User.findOne({ where: { userName }});
      if(!data) throw new appError(errorType.not_found, notFoundmessage('Data'));

      const passCheck = await bcrypt.compare(password, data.password);
      if(!passCheck) throw new appError(errorType.bad_request, 'Password Not match... Please enter correct password !!!');

      const tokenInfo = {
        id: data.id,
        userName: data.userName,
        roles: data.roles
      };

      const token = await jwt.sign(tokenInfo, process.env.SECRET_KEY || '', { expiresIn: '30m' });

      let tokenData = await Token.findOne({ where: { UserId: data.id }});
      if(!tokenData) {
        tokenData = await Token.create({ token, UserId: data.id });
      }
      tokenData.token = token;
      await tokenData.save();
      return SUCCESS(res, tokenData);
    }
    catch (err) {
      return next(err);
    }
  };
}

export default userController;