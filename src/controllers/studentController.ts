import { Request, Response, NextFunction } from 'express';
import { SUCCESS, notFoundmessage } from '../middleware/responseHandle';
import Class from '../models/classModel';
import Student from '../models/studentModel';
import User from '../models/userModel';
import { appError } from '../utils/errorHelper';
import errorType from '../utils/errorType';

class studentController {

  addStudents = async (req: Request, res: Response, next: NextFunction) => {
    try{
      req.body.teacher_id = req.user.id;
      const data = await Student.create(req.body);
      return SUCCESS(res, data);
    }
    catch(err) {
      return next(err);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Student.findAll({
        include: [
          { model: User, attributes: ['userName'] },
          { model: Class }
        ]
      });
      return SUCCESS(res, data);
    }
    catch (err){
      return next(err);
    }
  };

  deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const data = await Student.destroy({ where: { id }});
      if(!data) throw new appError(errorType.not_found, notFoundmessage('Data'));
      return SUCCESS(res, data);
    }
    catch(err) {
      return next(err);
    }
  };
}

export default studentController;
