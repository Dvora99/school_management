import Attendance from '../models/attendanceModel';
import responseHandle from '../middleware/responseHandle';

const addAttendance = async (req,res,next) => {
  try {
    const data = await Attendance.create(req.body);
    return responseHandle.SUCCESS(res, data);
  }
  catch (err) {
    return next(err);
  }
};

export default {
  addAttendance
};