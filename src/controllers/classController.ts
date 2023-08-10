import { NextFunction, Request, Response } from 'express';
import Class from '../models/classModel';
import { SUCCESS, notFoundmessage } from '../middleware/responseHandle';
import { appError } from '../utils/errorHelper';
import errorType from '../utils/errorType';

class classController {

  addClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Class.create(req.body);
      return SUCCESS(res, data);
    }
    catch (err) {
      return next(err);
    }
  };

  viewClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Class.findAll({});
      if(!data) throw new appError(errorType.not_found, notFoundmessage('Class'));
      return SUCCESS(res, data);
    }
    catch (err) {
      return next(err);
    }
  };

  deleteClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const checkData = await Class.findByPk(id);

      if(!checkData) throw new appError(errorType.not_found, notFoundmessage('Data'));
      const data = await Class.destroy({ where: { id }});
      return SUCCESS(res, data);
    }
    catch (err) {
      return next(err);
    }
  };

  updateClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const checkData = await Class.findByPk(id);
      if(!checkData) throw new appError(errorType.not_found, notFoundmessage('Data'));
      const data = await Class.update(req.body, { where: { id }, returning: true });
      return SUCCESS(res, data);

    }
    catch (err) {
      return next(err);
    }
  };
}

export default classController;