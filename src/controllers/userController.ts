import { Request, Response, response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/userModel';
import Token from '../models/tokenModel';
import responseHandle from '../middleware/responseHandle';
import { appError } from '../utils/errorHelper';
import errorType from '../utils/errorType';

dotenv.config();

const userInsert = async (req: Request, res: Response, next) => {
  try {
    const data = await User.create(req.body);
    return responseHandle.SUCCESS(res, data);
  }
  catch (err) {
    return next(err);
  }
};

const userLogin = async (req: Request, res: Response, next) => {
  try {
    const { userName, password } = req.body;
    const data: any = await User.findOne({ where: { userName }});
    if(!data) throw new appError(errorType.not_found, 'Data not found !! Please check one more time');

    const passCheck = await bcrypt.compare(password, data.password);
    if(!passCheck) throw new appError(errorType.bad_request, 'Password Not match... Please enter correct password !!!');

    const tokenInfo = {
      userId: data.id,
      userName: data.userName,
      roles: data.roles
    };

    const token = await jwt.sign(tokenInfo, process.env.SECRET_KEY, { expiresIn: '30m' });

    let tokenData:any = await Token.findOne({ where: { UserId: data.id }});
    if(!tokenData) {
      tokenData = await Token.create({ token, UserId: data.id });
    }
    tokenData.token = token;
    await tokenData.save();
    return responseHandle.SUCCESS(res, tokenData);
  }
  catch (err) {
    return next(err);
  }
};

export default {
  userInsert,
  userLogin
};