import express from 'express';
import { attendanceController } from '../controllers/index';
import Roles from '../middleware/passportStretagy';

const route = express.Router();

route.post('/addAttendance', [ Roles.requireAuth, Roles.teacherAuth ] , attendanceController.addAttendance);

export default route;