import express from 'express';
import { studentController } from '../controllers/index';
import Roles from '../middleware/passportStretagy';

const route = express.Router();

route.post('/addStudents', [ Roles.requireAuth, Roles.teacherAuth ], studentController.addStudents);
route.get('/show/:id', [ Roles.requireAuth, Roles.teacherAuth ], studentController.show);
// route.delete('/deleteClass/:id', [ Roles.requireAuth, Roles.principalAuth ], classController.deleteClass);

export default route;