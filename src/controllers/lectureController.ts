import { Request, Response, NextFunction } from 'express';
import Lecture from '../models/lectureModel';
import responseHandle from '../middleware/responseHandle';
import { appError } from '../utils/errorHelper';
import errorType from '../utils/errorType';
import Class from '../models/classModel';

const addLecture = async (req: Request ,res: Response, next: NextFunction) => {
  try{
    const data = await Lecture.create(req.body);
    return responseHandle.SUCCESS(res, data);
  }
  catch (err) {
    return next(err);
  }
};

const showLecture = async (req: Request ,res: Response, next: NextFunction) => {
  try{
    const data = await Lecture.findAll({
      include: {
        model: Class,
      }
    });
    return responseHandle.SUCCESS(res, data);
  }
  catch (err) {
    return next(err);
  }
};

const deleteLecture = async (req: Request ,res: Response, next: NextFunction) => {
  try{
    const id = req.params.id;
    const checkData = await Lecture.findByPk(id);

    if(!checkData) throw new appError(errorType.not_found, 'Data not found... Please check one more time');
    const data = await Lecture.destroy({ where: { id }});
    return responseHandle.SUCCESS(res, data);
  }
  catch (err) {
    return next(err);
  }
};

const updateLecture = async (req: Request ,res: Response, next: NextFunction) => {
  try{
    const id = req.params.id;
    const checkData = await Lecture.findByPk(id);

    if(!checkData) throw new appError(errorType.not_found, 'Data not found... Please check one more time');
    const data = await Lecture.update(req.body, { where: { id }, returning: true });
    return responseHandle.SUCCESS(res, data[1]);
  }
  catch (err) {
    return next(err);
  }
};

const showLectureToTeacher = async (req: Request ,res: Response, next: NextFunction) => {
  try{
    const { id } = req.user;
    const data = await Lecture.findAll({
      include: [
        {
          model: Class,
          where: {
            classTeacher: id
          }
        }
      ]
    });
    if(!data.length) throw new appError(errorType.not_found, 'Today, no lecture scheduled for you...');
    return responseHandle.SUCCESS(res, data);
  }
  catch (err) {
    return next(err);
  }
};

export default {
  addLecture,
  showLecture,
  showLectureToTeacher,
  deleteLecture,
  updateLecture
};