import { Request, Response, NextFunction } from 'express';
import responseHandle from '../middleware/responseHandle';
import Class from '../models/classModel';
import Student from '../models/studentModel';
import User from '../models/userModel';
import { appError } from '../utils/errorHelper';
import errorType from '../utils/errorType';

const addStudents = async (req: Request, res: Response, next: NextFunction) => {
  try{
    req.body.teacher_id = req.user.id;
    const data = await Student.create(req.body);
    return responseHandle.SUCCESS(res, data);
  }
  catch(err) {
    return next(err);
  }
};

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await Student.findAll({
      include: [
        {
          model: User
        },
        {
          model: Class
        }
      ]
    });
    return responseHandle.SUCCESS(res, data);
  }
  catch (err){
    return next(err);
  }
};

const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const data = await Student.destroy({ where: { id }});
    if(!data) throw new appError(errorType.not_found, 'Data Not Found....!!');
    return responseHandle.SUCCESS(res, data);
  }
  catch(err) {
    return next(err);
  }
};

export default {
  addStudents,
  show,
  deleteStudent
};
