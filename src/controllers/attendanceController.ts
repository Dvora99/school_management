import { NextFunction, Request, Response } from 'express';
import Attendance from '../models/attendanceModel';
import responseHandle from '../middleware/responseHandle';
import Student from '../models/studentModel';
import { appError } from '../utils/errorHelper';
import errorType from '../utils/errorType';

const addAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentID } = req.body;
    const { id } = req.user;
    const data = await Student.findAll({
      where: { student_id: studentID },
    });
    if(data[0].teacher_id !== id) throw new appError(errorType.not_found, 'You are not assign for this class');
    const assign = await Attendance.create(req.body);
    return responseHandle.SUCCESS(res, assign);
  }
  catch (err) {
    return next(err);
  }
};

const getAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user;
    const data = await Attendance.findAll({ where: { studentID: id }});
    return responseHandle.SUCCESS(res, data);
  } catch (err) {
    return next(err);
  }
};

export default {
  addAttendance,
  getAttendance
};