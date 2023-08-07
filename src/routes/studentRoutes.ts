import express from 'express';
import { studentController } from '../controllers/index';
import Roles from '../middleware/passportStretagy';

const route = express.Router();

route.post('/addStudents', Roles.authorization(['Teacher']), studentController.addStudents);
route.get('/show/:id', Roles.authorization(['Teacher']), studentController.show);
route.delete('/deleteStudent/:id', Roles.authorization(['Teacher']), studentController.deleteStudent);

export default route;