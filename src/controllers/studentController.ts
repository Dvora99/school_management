import responseHandle from '../middleware/responseHandle';
import Class from '../models/classModel';
import Student from '../models/studentModel';
import User from '../models/userModel';

const addStudents = async (req,res,next) => {
  try{
    req.body.teacher_id = req.user.id;
    const data = await Student.create(req.body);
    return responseHandle.SUCCESS(res, data);
  }
  catch(err) {
    return next(err);
  }
};

const show = async (req,res,next) => {
  try {
    const data = await Student.findAll({
      include: [
        {
          model: User,
          as: 'Student'
        },
        {
          model: Class,
          as: 'Class'
        }
      ]
    });
    return responseHandle.SUCCESS(res, data);
  }
  catch (err){
    return next(err);
  }
};

export default {
  addStudents,
  show
};
