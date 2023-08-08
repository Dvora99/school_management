import { Request, Response, NextFunction } from 'express';
import { SUCCESS, notFoundmessage } from '../middleware/responseHandle';
import Report from '../models/reportModel';
import { appError } from '../utils/errorHelper';
import errorType from '../utils/errorType';

class reportController {

  addReport = async (req: Request ,res: Response, next: NextFunction) => {
    try {
      req.body.teacher_id = req.user.id;
      const data = await Report.create(req.body);
      return SUCCESS(res, data);
    }
    catch (err) {
      return next(err);
    }
  };

  showReport = async (req: Request ,res: Response, next: NextFunction) => {
    try {
      const data = await Report.findAll({});
      return SUCCESS(res, data);
    }
    catch (err) {
      return next(err);
    }
  };

  deleteReport = async (req: Request ,res: Response, next: NextFunction) => {
    try{
      const id = req.params.id;
      const checkData = await Report.findByPk(id);

      if(!checkData) throw new appError(errorType.not_found, notFoundmessage('Data'));
      const data = await Report.destroy({ where: { id }});
      return SUCCESS(res, data);
    }
    catch (err) {
      return next(err);
    }
  };

  updateReport = async (req: Request ,res: Response, next: NextFunction) => {
    try{
      const id = req.params.id;
      const checkData = await Report.findByPk(id);

      if(!checkData) throw new appError(errorType.not_found, notFoundmessage('Data'));
      const data = await Report.update(req.body, { where: { id }, returning: true });
      return SUCCESS(res, data[1]);
    }
    catch (err) {
      return next(err);
    }
  };
}

export default reportController;