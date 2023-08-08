import { Request, Response, NextFunction } from 'express';
import Lecture from '../models/lectureModel';
import { SUCCESS, notFoundmessage } from '../middleware/responseHandle';
import { appError } from '../utils/errorHelper';
import errorType from '../utils/errorType';
import Class from '../models/classModel';

class lectureController {
  addLecture = async (req: Request ,res: Response, next: NextFunction) => {
    try{
      const data = await Lecture.create(req.body);
      return SUCCESS(res, data);
    }
    catch (err) {
      return next(err);
    }
  };

  showLecture = async (req: Request ,res: Response, next: NextFunction) => {
    try{
      const data = await Lecture.findAll({
        include: {
          model: Class,
        }
      });
      return SUCCESS(res, data);
    }
    catch (err) {
      return next(err);
    }
  };

  deleteLecture = async (req: Request ,res: Response, next: NextFunction) => {
    try{
      const id = req.params.id;
      const checkData = await Lecture.findByPk(id);

      if(!checkData) throw new appError(errorType.not_found, notFoundmessage('Data'));
      const data = await Lecture.destroy({ where: { id }});
      return SUCCESS(res, data);
    }
    catch (err) {
      return next(err);
    }
  };

  updateLecture = async (req: Request ,res: Response, next: NextFunction) => {
    try{
      const id = req.params.id;
      const checkData = await Lecture.findByPk(id);

      if(!checkData) throw new appError(errorType.not_found, notFoundmessage('Data'));
      const data = await Lecture.update(req.body, { where: { id }, returning: true });
      return SUCCESS(res, data[1]);
    }
    catch (err) {
      return next(err);
    }
  };

  showLectureToTeacher = async (req: Request ,res: Response, next: NextFunction) => {
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
      return SUCCESS(res, data);
    }
    catch (err) {
      return next(err);
    }
  };
}

export default lectureController;