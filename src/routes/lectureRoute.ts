import express from 'express';
import { lectureController } from '../controllers/index';

const route = express.Router();

route.post('/addLecture', lectureController.addLecture);

export default route;