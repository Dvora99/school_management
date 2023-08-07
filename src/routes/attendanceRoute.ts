import express from 'express';
import { attendanceController } from '../controllers/index';
import Roles from '../middleware/passportStretagy';

const route = express.Router();

route.post('/addAttendance', Roles.authorization(['Teacher']) , attendanceController.addAttendance);
route.get('/getAttendance', Roles.authorization([ 'Student', 'Teacher' ]) , attendanceController.getAttendance);
route.get('/allAttendance', Roles.authorization(['Principal']) , attendanceController.allAttendance);
route.get('/teacherClassVise', Roles.authorization(['Teacher']), attendanceController.teacherClassVise);

route.delete('/deleteAttendance/:id', Roles.authorization(['Teacher']) , attendanceController.deleteAttendance);

export default route;