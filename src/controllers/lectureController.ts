import { Request, Response, NextFunction } from 'express';
import Lecture from '../models/lectureModel';
import responseHandle from '../middleware/responseHandle';

const addLecture = async (req: Request ,res: Response, next: NextFunction) => {
  try{
    const data = await Lecture.create(req.body);
    return responseHandle.SUCCESS(res, data);
  }
  catch (err) {
    return next(err);
  }
};

export default {
  addLecture
};