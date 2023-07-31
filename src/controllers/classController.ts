import { Request, Response } from 'express';
import Class from '../models/classModel';
import responseHandle from '../middleware/responseHandle';
import { appError } from '../utils/errorHelper';
import errorType from '../utils/errorType';

const addClass = async (req: Request, res: Response, next) => {
  try {
    const data = await Class.create(req.body);
    return responseHandle.SUCCESS(res, data);
  }
  catch (err) {
    return next(err);
  }
};

const deleteClass = async (req: Request, res: Response, next) => {
  try {
    const id:any = req.params.id;
    const checkData = await Class.findByPk(id);

    if(!checkData) throw new appError(errorType.not_found, 'Data not found... Please check one more time');
    const data = await Class.destroy({ where: { id }});
    return responseHandle.SUCCESS(res, data);
  }
  catch (err) {
    return next(err);
  }
};

export default {
  addClass,
  deleteClass
};