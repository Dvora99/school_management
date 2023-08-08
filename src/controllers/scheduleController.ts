import Class from '../models/classModel';
import Lecture from '../models/lectureModel';
import Student from '../models/studentModel';
import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import { appError } from '../utils/errorHelper';
import errorType from '../utils/errorType';
import * as dateFormate from '../utils/dateFormate';
import { SUCCESS } from '../middleware/responseHandle';

class scheduleController {

  getSchedule = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.user.id;
      let date = req.query.date;
      if(!date) date = dateFormate.DATE;
      const data = await Student.findAll({
        where: { student_id: id },
        include: [
          { model: Lecture, attributes: [ 'date','weekDay','time' ], where: { date }},
          { model: Class, attributes: [ 'name', 'grade' ] },
          { model: User, attributes: [ 'userName', 'roles' ] }
        ],
      });
      if(data.length) return SUCCESS(res, data);
      throw new appError(errorType.not_found, 'There Is no Lecture Scheduled Today...');
    }
    catch (err) {
      return next(err);
    }
  };
}

export default scheduleController;