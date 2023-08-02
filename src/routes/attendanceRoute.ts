import express from 'express';
import { attendanceController } from '../controllers/index';
import Roles from '../middleware/passportStretagy';

const route = express.Router();

route.post('/addAttendance', attendanceController.addAttendance);
route.get('/getAttendance', Roles.studentAuth, attendanceController.getAttendance);

export default route;