import { Request, Response } from 'express';
import Class from '../models/classModel';

const addClass = async (req: Request, res: Response) => {
  const data = await Class.create(req.body);
};

export default {
  addClass
};