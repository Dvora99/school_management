import { NextFunction, Request, Response } from 'express';
import Attendance from '../models/attendanceModel';
import { SUCCESS, notFoundmessage } from '../middleware/responseHandle';
import Student from '../models/studentModel';
import { appError } from '../utils/errorHelper';
import errorType from '../utils/errorType';
import Class from '../models/classModel';

class attendanceController {
  addAttendance = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { studentID } = req.body;
      const { id } = req.user;
      const data = await Student.findAll({
        where: { student_id: studentID },
      });
      if (!data.length) throw new appError(errorType.not_found, notFoundmessage('Student'));
      if (data[0]?.teacher_id !== id) throw new appError(errorType.not_found, 'You are not assign for this class');
      const assign = await Attendance.create(req.body);
      return SUCCESS(res, assign);
    }
    catch (err) {
      return next(err);
    }
  };

  getAttendance = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.user;
      const data = await Attendance.findAll({ where: { studentID: id }});
      if (!data.length) throw new appError(errorType.not_found, notFoundmessage('Student'));
      return SUCCESS(res, data);
    } catch (err) {
      return next(err);
    }
  };

  allAttendance = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Class.findAll({
        include: [
          {
            model: Student,
            include: [Attendance]
          }
        ]
      });
      return SUCCESS(res, data);
    }
    catch (err) {
      return next(err);
    }
  };

  deleteAttendance = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const checkdata = await Attendance.findByPk(id);
      if (!checkdata) throw new appError(errorType.not_found, notFoundmessage('Student'));

      const data = await Attendance.destroy({ where: { id }});
      return SUCCESS(res, data);
    }
    catch (err) {
      return next(err);
    }
  };

  teacherClassVise = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.user;
      const data = await Student.findAll({
        where: { teacher_id: id },
        include: [
          { model: Attendance }
        ]
      });
      if (!data.length) throw new appError(errorType.not_found, notFoundmessage('Data'));
      return SUCCESS(res, data);
    }
    catch (err) {
      return next(err);
    }
  };
}

export default attendanceController;