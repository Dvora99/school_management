import { NextFunction, Request, Response } from 'express';
import Class from '../models/classModel';
import responseHandle from '../middleware/responseHandle';
import { appError } from '../utils/errorHelper';
import errorType from '../utils/errorType';

const addClass = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await Class.create(req.body);
    return responseHandle.SUCCESS(res, data);
  }
  catch (err) {
    return next(err);
  }
};

const viewClass = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await Class.findAll({});
    if(!data) throw new appError(errorType.not_found, 'There is no class created');
    return responseHandle.SUCCESS(res, data);
  }
  catch (err) {
    return next(err);
  }
};

const deleteClass = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const checkData = await Class.findByPk(id);

    if(!checkData) throw new appError(errorType.not_found, 'Data not found... Please check one more time');
    const data = await Class.destroy({ where: { id }});
    return responseHandle.SUCCESS(res, data);
  }
  catch (err) {
    return next(err);
  }
};

const updateClass = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const checkData = await Class.findByPk(id);
    if(!checkData) throw new appError(errorType.not_found, 'Data not found !! Please check one more time');
    const data = await Class.update(req.body, { where: { id }, returning: true });
    return responseHandle.SUCCESS(res, data);

  }
  catch (err) {
    return next(err);
  }
};

export default {
  addClass,
  viewClass,
  deleteClass,
  updateClass
};