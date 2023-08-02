import express from 'express';
import { studentController } from '../controllers/index';

const route = express.Router();

route.post('/addStudents', studentController.addStudents);
route.get('/show/:id', studentController.show);
route.delete('/deleteStudent/:id', studentController.deleteStudent);

export default route;