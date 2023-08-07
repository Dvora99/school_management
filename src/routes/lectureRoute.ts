import express from 'express';
import { lectureController } from '../controllers/index';
import Roles from '../middleware/passportStretagy';

const route = express.Router();

route.post('/addLecture', Roles.authorization(['Teacher']), lectureController.addLecture);
route.get('/showLecture', Roles.authorization(['Principal']), lectureController.showLecture);
route.get('/showLectureToTeacher', Roles.authorization(['Teacher']), lectureController.showLectureToTeacher);
route.delete('/deleteLecture/:id', Roles.authorization(['Teacher']), lectureController.deleteLecture);
route.put('/updateLecture/:id', Roles.authorization(['Teacher']), lectureController.updateLecture);

export default route;