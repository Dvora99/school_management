import { Request, Response, NextFunction } from 'express';
import responseHandle from '../middleware/responseHandle';
import Report from '../models/reportModel';
import { appError } from '../utils/errorHelper';
import errorType from '../utils/errorType';

const addReport = async (req: Request ,res: Response, next: NextFunction) => {
  try {
    req.body.teacher_id = req.user.id;
    const data = await Report.create(req.body);
    return responseHandle.SUCCESS(res, data);
  }
  catch (err) {
    return next(err);
  }
};

const showReport = async (req: Request ,res: Response, next: NextFunction) => {
  try {
    const data = await Report.findAll({});
    return responseHandle.SUCCESS(res, data);
  }
  catch (err) {
    return next(err);
  }
};

const deleteReport = async (req: Request ,res: Response, next: NextFunction) => {
  try{
    const id = req.params.id;
    const checkData = await Report.findByPk(id);

    if(!checkData) throw new appError(errorType.not_found, 'Data not found... Please check one more time');
    const data = await Report.destroy({ where: { id }});
    return responseHandle.SUCCESS(res, data);
  }
  catch (err) {
    return next(err);
  }
};

const updateReport = async (req: Request ,res: Response, next: NextFunction) => {
  try{
    const id = req.params.id;
    const checkData = await Report.findByPk(id);

    if(!checkData) throw new appError(errorType.not_found, 'Data not found... Please check one more time');
    const data = await Report.update(req.body, { where: { id }, returning: true });
    return responseHandle.SUCCESS(res, data[1]);
  }
  catch (err) {
    return next(err);
  }
};

export default {
  addReport,
  showReport,
  deleteReport,
  updateReport
};