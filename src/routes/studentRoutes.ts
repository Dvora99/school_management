import { Router } from 'express';
import { studentController } from '../controllers/index';
import Roles from '../middleware/passportStretagy';

export default function initRoutes(router: Router) {
  const route = router;
  const student = new studentController();

  route.post('/addStudents', Roles.authorization(['Teacher']), student.addStudents);
  route.get('/show/:id', Roles.authorization([ 'Teacher','Principal' ]), student.show);
  route.delete('/deleteStudent/:id', Roles.authorization(['Teacher']), student.deleteStudent);

  return route;
}