import express from 'express';
import { attendanceController } from '../controllers';

const route = express.Router();

route.post('/addAttendance', attendanceController.addAttendance);

export default route;