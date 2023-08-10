import { Response } from 'express';
import statusCode from '../constant/statusCode';

export const SUCCESS = (res: Response, data?:any) => {
  res.status(statusCode.SUCCESS).json({ statusCode: statusCode.SUCCESS, message: 'Operation done successfully', data: data });
};

export const notFoundmessage = (msg: string) => {
  return `${msg} not found please check one more time....`;
};

export const emptyMessage = (msg: string) => {
  return `Please enter your ${msg}`;
};