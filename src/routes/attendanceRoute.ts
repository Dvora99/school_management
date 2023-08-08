import { Router } from 'express';
import { attendanceController } from '../controllers/index';
import Roles from '../middleware/passportStretagy';

export default function initRoutes(router: Router) {
  const route = router;
  const attendance = new attendanceController();

  route.post('/addAttendance', Roles.authorization(['Teacher']) , attendance.addAttendance);
  route.get('/getAttendance', Roles.authorization([ 'Student', 'Teacher' ]) , attendance.getAttendance);
  route.get('/allAttendance', Roles.authorization(['Principal']) , attendance.allAttendance);
  route.get('/teacherClassVise', Roles.authorization(['Teacher']), attendance.teacherClassVise);
  route.delete('/deleteAttendance/:id', Roles.authorization(['Teacher']) , attendance.deleteAttendance);

  return route;
}