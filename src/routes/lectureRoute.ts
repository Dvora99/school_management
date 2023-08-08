import { Router } from 'express';
import { lectureController } from '../controllers/index';
import Roles from '../middleware/passportStretagy';

export default function initRoutes(router: Router) {
  const route = router;
  const lecture = new lectureController();

  route.post('/addLecture', Roles.authorization(['Teacher']), lecture.addLecture);
  route.get('/showLecture', Roles.authorization(['Principal']), lecture.showLecture);
  route.get('/showLectureToTeacher', Roles.authorization(['Teacher']), lecture.showLectureToTeacher);
  route.delete('/deleteLecture/:id', Roles.authorization(['Teacher']), lecture.deleteLecture);
  route.put('/updateLecture/:id', Roles.authorization(['Teacher']), lecture.updateLecture);

  return route;
}