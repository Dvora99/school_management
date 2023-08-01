import responseHandle from '../middleware/responseHandle';
import Report from '../models/reportModel';

const addReport = async (req,res,next) => {
  try {
    req.body.teacher_id = req.user.id;
    const data = await Report.create(req.body);
    return responseHandle.SUCCESS(res, data);
  }
  catch (err) {
    return next(err);
  }
};

export default {
  addReport
};